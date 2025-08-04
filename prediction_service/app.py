from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import json
import os
from pathlib import Path
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load model configuration - dynamic path for Docker/local
model_path = Path(os.getenv("MODEL_PATH", "../ml_model"))
with open(model_path / "model_config.json", 'r') as f:
    config = json.load(f)

q_value = config['q_value']
numerical_features = config['numerical_features']
categorical_features = config['categorical_features']
features_order = config['features_order']

# Load preprocessor and models
preprocessor = joblib.load(model_path / "preprocessor.pkl")
lgbm_lower = joblib.load(model_path / "lgbm_lower.pkl")
lgbm_upper = joblib.load(model_path / "lgbm_upper.pkl")
xgb_lower  = joblib.load(model_path / "xgb_lower.pkl")
xgb_upper  = joblib.load(model_path / "xgb_upper.pkl")
cat_lower  = joblib.load(model_path / "cat_lower.pkl")
cat_upper  = joblib.load(model_path / "cat_upper.pkl")

# Feature engineering function (same as in notebook)
def feature_engineer(df):
    df_copy = df.copy()
    # Use a flexible format and coerce errors to NaT (Not a Time)
    df_copy['sale_date'] = pd.to_datetime(df_copy['sale_date'], format='mixed', errors='coerce')

    # Handle any dates that could not be parsed
    if df_copy['sale_date'].isnull().any():
        median_date = df_copy['sale_date'].median()
        df_copy['sale_date'].fillna(median_date, inplace=True)

    df_copy['sale_year'] = df_copy['sale_date'].dt.year
    df_copy['sale_month'] = df_copy['sale_date'].dt.month
    df_copy['sale_dayofyear'] = df_copy['sale_date'].dt.dayofyear
    df_copy['house_age'] = df_copy['sale_year'] - df_copy['year_built']
    df_copy['years_since_reno'] = np.where((df_copy['year_reno'] > 0) & (df_copy['year_reno'] >= df_copy['year_built']), df_copy['sale_year'] - df_copy['year_reno'], 0)
    df_copy['was_renovated'] = (df_copy['years_since_reno'] > 0).astype(int)
    df_copy = df_copy.drop(columns=['sale_date', 'year_built', 'year_reno'])
    return df_copy

# Prediction function
def predict_interval(features: dict):
    # Create DataFrame and apply feature engineering
    df = pd.DataFrame([features])
    df = feature_engineer(df)
    
    # Fill missing categorical features
    for col in categorical_features:
        if col in df.columns:
            df[col] = df[col].fillna('missing').astype('category')
    
    # Ensure proper column order
    df = df.reindex(columns=features_order, fill_value=0)
    
    # Preprocess numerical features
    df[numerical_features] = preprocessor.transform(df[numerical_features])

    # Get predictions from all models
    lgbm_lower_pred = lgbm_lower.predict(df)[0]
    lgbm_upper_pred = lgbm_upper.predict(df)[0]
    
    # For XGBoost, convert categorical to codes
    df_xgb = df.copy()
    for col in categorical_features:
        if col in df_xgb.columns:
            df_xgb[col] = df_xgb[col].cat.codes
    
    xgb_lower_pred = xgb_lower.predict(df_xgb)[0]
    xgb_upper_pred = xgb_upper.predict(df_xgb)[0]
    
    cat_lower_pred = cat_lower.predict(df)[0]
    cat_upper_pred = cat_upper.predict(df)[0]

    # Ensemble predictions
    ensemble_lower = np.mean([lgbm_lower_pred, xgb_lower_pred, cat_lower_pred])
    ensemble_upper = np.mean([lgbm_upper_pred, xgb_upper_pred, cat_upper_pred])
    
    # Apply conformal prediction correction
    final_lower_log = ensemble_lower - q_value
    final_upper_log = ensemble_upper + q_value
    
    # Transform back to original scale
    final_lower = np.expm1(final_lower_log)
    final_upper = np.expm1(final_upper_log)
    point_pred = (final_lower + final_upper) / 2
    
    # Ensure non-negative and proper ordering
    final_lower = max(0, final_lower)
    final_upper = max(final_lower, final_upper)

    return float(point_pred), float(final_lower), float(final_upper)

# Routes
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        point, lower, upper = predict_interval(data)
        return jsonify({
            "prediction": point,
            "interval_lower": lower,
            "interval_upper": upper
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "prediction-service",
        "version": "1.0.0",
        "models_loaded": True
    }), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)
