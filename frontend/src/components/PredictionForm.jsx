import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// --- Helper Components & Icons ---
const Home = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const AlertTriangle = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const Check = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Info = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;

const steps = ["Basic Info", "Location", "Features", "Views & Surroundings"];

const stepFields = [
  ["sqft", "beds", "bath_full", "bath_half", "bath_3qtr", "stories", "grade", "condition", "year_built"],
  ["latitude", "longitude", "land_val", "imp_val"],
  ["sqft_1", "sqft_fbsmt", "gara_sqft", "garb_sqft", "year_reno"],
  [
    "wfnt", "golf", "greenbelt", "noise_traffic",
    "view_rainier", "view_olympics", "view_cascades", "view_territorial",
    "view_skyline", "view_sound", "view_lakewash", "view_lakesamm",
    "view_otherwater", "view_other"
  ]
];

const fieldDescriptions = {
  sqft: { title: "Total Square Feet", description: "Total living space in square feet" },
  beds: { title: "Bedrooms", description: "Number of bedrooms" },
  bath_full: { title: "Full Bathrooms", description: "Full bathrooms (with tub)" },
  bath_half: { title: "Half Bathrooms", description: "Half bathrooms (toilet & sink)" },
  bath_3qtr: { title: "3/4 Bathrooms", description: "Three-quarter bathrooms (shower only)" },
  stories: { title: "Stories", description: "Total number of floors (e.g., 1, 2, or 1.5)" },
  grade: { title: "Property Grade", description: "Construction quality score from 1 (low) to 13 (high), avg is 7" },
  condition: { title: "Condition", description: "Overall condition from 1 (poor) to 5 (excellent), avg is 3" },
  year_built: { title: "Year Built", description: "Year the property was originally built" },

  latitude: { title: "Latitude", description: "Latitude coordinate of the property" },
  longitude: { title: "Longitude", description: "Longitude coordinate of the property" },
  land_val: { title: "Land Value (USD)", description: "Assessed value of the land only (USD)" },
  imp_val: { title: "Improvement Value (USD)", description: "Assessed value of building improvements (USD)" },

  sqft_1: { title: "First Floor Sqft", description: "Square feet on the first floor" },
  sqft_fbsmt: { title: "Finished Basement Sqft", description: "Finished basement square feet" },
  gara_sqft: { title: "Attached Garage Sqft", description: "Garage area in square feet" },
  garb_sqft: { title: "Detached Garage Sqft", description: "Garbage storage area in square feet" },
  year_reno: { title: "Year Renovated", description: "Year of last renovation (0 if never)" },

  wfnt: { title: "Waterfront", description: "Is the property waterfront?" },
  golf: { title: "Golf Course", description: "Near a golf course?" },
  greenbelt: { title: "Greenbelt", description: "Adjacent to greenbelt?" },
  noise_traffic: { title: "Traffic Noise", description: "Affected by traffic noise?" },
  view_rainier: { title: "View: Mount Rainier", description: "View of Mount Rainier" },
  view_olympics: { title: "View: Olympics", description: "View of Olympic Mountains" },
  view_cascades: { title: "View: Cascades", description: "View of Cascade Mountains" },
  view_territorial: { title: "View: Territorial", description: "Territorial views (neighborhood, trees)" },
  view_skyline: { title: "View: Skyline", description: "City skyline view" },
  view_sound: { title: "View: Puget Sound", description: "Puget Sound water view" },
  view_lakewash: { title: "View: Lake Washington", description: "Lake Washington view" },
  view_lakesamm: { title: "View: Lake Sammamish", description: "Lake Sammamish view" },
  view_otherwater: { title: "View: Other Water", description: "Other water body view" },
  view_other: { title: "View: Other", description: "Other types of view" }
};

// --- Reusable Components with Tooltips ---
const Tooltip = ({ text }) => (
  <div className="absolute bottom-full mb-2 w-max max-w-xs p-2 bg-gray-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 border border-gray-600">
    {text}
  </div>
);

const InputField = ({ name, type = 'text', value, onChange, placeholder, required = true }) => {
  const details = fieldDescriptions[name] || { title: name.replace(/_/g, " "), description: "No description available." };
  return (
    <div className="relative">
      <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-700 mb-2 capitalize">
        {details.title}
        <div className="group relative flex items-center ml-2">
          <Info className="w-4 h-4 text-amber-600 cursor-help hover:text-amber-700 transition-colors" />
          <Tooltip text={details.description} />
        </div>
      </label>
      <input 
        type={type} 
        id={name} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        required={required}
        className="w-full px-4 py-3 bg-white/80 border border-amber-500/60 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm shadow-sm" 
      />
    </div>
  );
};

const CheckboxField = ({ name, checked, onChange }) => {
  const details = fieldDescriptions[name] || { title: name.replace(/_/g, " "), description: "No description available." };
  return (
    <label 
      htmlFor={name} 
      className="flex items-center space-x-3 cursor-pointer p-3 bg-white/70 hover:bg-white/80 rounded-lg border border-amber-500/40 hover:border-amber-500/60 transition-all duration-300 backdrop-blur-sm shadow-sm"
    >
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-300 ${
        checked 
          ? 'bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-400 shadow-lg shadow-amber-500/25' 
          : 'bg-white/90 border-amber-500/50 hover:border-amber-500/70 shadow-sm'
      }`}>
        {checked && <Check className="w-4 h-4 text-black font-bold" />}
      </div>
      <span className="text-sm text-gray-700 capitalize flex-1">{details.title}</span>
      <div className="group relative flex items-center">
        <Info className="w-4 h-4 text-amber-600/80 cursor-help hover:text-amber-700 transition-colors" />
        <Tooltip text={details.description} />
      </div>
    </label>
  );
};

function PredictionForm() {
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    sqft: 2500,
    beds: 4,
    bath_full: 2,
    bath_half: 1,
    bath_3qtr: 0,
    stories: 2,
    grade: 7,
    condition: 3,
    year_built: 2005,
    latitude: 47.5,
    longitude: -122.3,
    land_val: 200000,
    imp_val: 300000,
    sqft_1: 1250,
    sqft_fbsmt: 500,
    gara_sqft: 400,
    garb_sqft: 0,
    year_reno: 0,
    wfnt: 0,
    golf: 0,
    greenbelt: 0,
    noise_traffic: 1,
    view_rainier: 0,
    view_olympics: 0,
    view_cascades: 0,
    view_territorial: 1,
    view_skyline: 0,
    view_sound: 0,
    view_lakewash: 0,
    view_lakesamm: 0,
    view_otherwater: 0,
    view_other: 0,
    submarket: "Urban",
    sale_date: "2024-01-15",
    sale_warning: "",
    join_status: "nochg",
    join_year: 2020,
    sale_nbr: 1,
    city: "SEATTLE",
    zoning: "RS7.2",
    subdivision: "Subdivision A"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const processedValue = type === "checkbox" ? (checked ? 1 : 0) : (type === 'number' ? Number(value) : value);
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://localhost:5001/api/predict", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const back = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(value || 0);

  const renderStepContent = () => {
    const currentFields = stepFields[currentStep];
    const isCheckboxStep = currentStep === 3;

    if (isCheckboxStep) {
      return currentFields.map(field => (
        <CheckboxField 
          key={field} 
          name={field} 
          checked={formData[field] === 1} 
          onChange={handleChange} 
        />
      ));
    }

    return currentFields.map(field => (
      <InputField 
        key={field} 
        name={field} 
        type={typeof formData[field] === 'number' ? 'number' : 'text'} 
        value={formData[field]} 
        onChange={handleChange} 
      />
    ));
  };

  return (
    <div style={{
      backgroundImage: `url('./src/assets/background-image.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      color: '#f5f5f5',
      padding: '2rem 1.5rem',
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Predict Your Home's{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              True Value
            </span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgb(255 255 255 / 0.9)' }}>
            Using advanced AI ensemble models to provide accurate price predictions with confidence intervals
          </p>
        </div>
        
        {/* Main Container */}
        <div 
          style={{
            border: '2px solid rgba(251, 191, 36, 0.6)',
            borderRadius: '1rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-4">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    currentStep >= index 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-400 shadow-lg shadow-amber-500/25' 
                      : 'bg-white/80 border-amber-500/60 shadow-md'
                  }`}>
                    {currentStep > index ? (
                      <Check className="w-6 h-6 text-black font-bold" />
                    ) : (
                      <span className={`font-bold text-lg ${currentStep >= index ? 'text-black' : 'text-amber-600'}`}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 text-sm text-center transition-all duration-300 font-medium ${
                    currentStep >= index ? 'text-amber-600 font-semibold' : 'text-gray-600'
                  }`}>
                    {step}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                    currentStep > index 
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 shadow-sm shadow-amber-500/25' 
                      : 'bg-gray-300'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {currentStep === 3 ? (
              // Final step with two-column layout
              <div className="grid grid-cols-7 gap-8">
                {/* Left side - Form inputs (4/7 width) */}
                <div className="col-span-4">
                  <h3 className="text-2xl font-semibold text-amber-700 mb-6 pb-3 border-b border-amber-500/50">
                    🏞️ Views & Surroundings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderStepContent()}
                  </div>
                </div>
                
                {/* Right side - Prediction Result (3/7 width) */}
                <div className="col-span-3">
                  {result ? (
                    <div 
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(15px)',
                        border: '2px solid rgba(251, 191, 36, 0.6)',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      <div className="p-6">
                        <h3 className="text-center text-2xl font-bold text-amber-700 mb-8">🎯 Prediction Result</h3>
                        <div className="space-y-6">
                          {/* Lower Bound */}
                          <div className="text-center p-4 bg-green-100/80 border border-green-400/60 rounded-lg backdrop-blur-sm shadow-sm">
                            <p className="text-xs text-green-700 uppercase tracking-wider font-semibold">Lower Price Bound</p>
                            <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(result.interval_lower)}</p>
                          </div>
                          
                          {/* Main Prediction */}
                          <div 
                            className="p-6 rounded-lg border text-center"
                            style={{
                              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15))',
                              border: '2px solid rgba(251, 191, 36, 0.7)',
                              boxShadow: '0 8px 32px rgba(251, 191, 36, 0.2)'
                            }}
                          >
                            <p className="text-sm text-amber-800 uppercase tracking-wider font-semibold">Estimated Price</p>
                            <p className="text-4xl font-extrabold text-gray-800 mt-2">{formatCurrency(result.prediction)}</p>
                          </div>
                          
                          {/* Upper Bound */}
                          <div className="text-center p-4 bg-red-100/80 border border-red-400/60 rounded-lg backdrop-blur-sm shadow-sm">
                            <p className="text-xs text-red-700 uppercase tracking-wider font-semibold">Upper Price Bound</p>
                            <p className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(result.interval_upper)}</p>
                          </div>
                        </div>
                        
                        {/* Confidence Note */}
                        <div className="mt-6 p-4 bg-blue-50/80 border border-blue-300/60 rounded-lg backdrop-blur-sm shadow-sm">
                          <p className="text-center text-gray-700 text-sm leading-relaxed">
                            <span className="text-amber-700 font-semibold">💡 Confidence Interval:</span> This range captures the true sale price with high statistical confidence using advanced ensemble ML models.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div 
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        border: '1px solid rgba(120, 113, 108, 0.6)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        textAlign: 'center',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <div className="text-gray-600">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full flex items-center justify-center border border-amber-500/50 shadow-lg">
                          <span className="text-3xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-semibold text-amber-700 mb-3">Prediction Result</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          Complete all form steps and click "Get Prediction" to see your property's estimated value with confidence intervals
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Other steps with regular layout
              <div>
                <h3 className="text-2xl font-semibold text-amber-700 mb-6 pb-3 border-b border-amber-500/50">
                  {currentStep === 0 && '🏠 Basic Property Information'}
                  {currentStep === 1 && '📍 Location & Valuation'}
                  {currentStep === 2 && '🔧 Property Features'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {renderStepContent()}
                </div>
              </div>
            )}
            
            {/* Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-amber-500/50">
              <button 
                type="button" 
                onClick={back} 
                disabled={currentStep === 0}
                className="px-8 py-3 bg-white/80 hover:bg-white/90 border border-gray-400 hover:border-gray-500 rounded-lg text-sm font-medium text-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-sm"
              >
                ⬅ Back
              </button>
              
              {currentStep < steps.length - 1 ? (
                <button 
                  type="button" 
                  onClick={next} 
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
                >
                  Next ➡
                </button>
              ) : (
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 disabled:opacity-70 disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Calculating...
                    </span>
                  ) : '🎯 Get Prediction'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-8 max-w-2xl mx-auto p-6 bg-red-900/30 border border-red-500/50 rounded-lg text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
              <h3 className="font-bold text-red-300 text-lg">Prediction Error</h3>
            </div>
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;