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
            <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-300 mb-1 capitalize">
                {details.title}
                <div className="group relative flex items-center ml-2">
                    <Info className="w-4 h-4 text-gray-500 cursor-help" />
                    <Tooltip text={details.description} />
                </div>
            </label>
            <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
        </div>
    );
};

const CheckboxField = ({ name, checked, onChange }) => {
    const details = fieldDescriptions[name] || { title: name.replace(/_/g, " "), description: "No description available." };
    return (
        <label htmlFor={name} className="flex items-center space-x-3 cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <div className={`w-5 h-5 rounded flex items-center justify-center border ${checked ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600'}`}>
                {checked && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-300 capitalize">{details.title}</span>
            <div className="group relative flex items-center">
                <Info className="w-4 h-4 text-gray-500 cursor-help" />
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
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Predict Housing Prices with Confidence
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          Fill in the property details below to get an accurate price prediction and confidence interval.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= index ? 'bg-blue-600 border-blue-500' : 'bg-gray-700 border-gray-600'
                }`}>
                  {currentStep > index ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className="font-bold">{index + 1}</span>
                  )}
                </div>
                <p className={`mt-2 text-xs text-center transition-all duration-300 ${
                  currentStep >= index ? 'text-white font-semibold' : 'text-gray-400'
                }`}>
                  {step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  currentStep > index ? 'bg-blue-500' : 'bg-gray-700'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-8">
          {currentStep === 3 ? (
            // Final step with two-column layout
            <div className="grid grid-cols-7 gap-8">
              {/* Left side - Form inputs (4/7 width) */}
              <div className="col-span-4">
                <h3 className="text-lg font-semibold text-white mb-4">Views & Surroundings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {renderStepContent()}
                </div>
              </div>
              
              {/* Right side - Prediction Result (3/7 width) */}
              <div className="col-span-3">
                {result ? (
                  <div className="bg-gray-700 rounded-xl border border-gray-600 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-center text-xl font-bold text-white mb-6">🎯 Prediction Result</h3>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Lower Price Bound</p>
                          <p className="text-xl font-bold text-green-400 mt-1">{formatCurrency(result.interval_lower)}</p>
                        </div>
                        <div className="p-4 bg-blue-600/20 rounded-lg border border-blue-500 text-center">
                          <p className="text-xs text-blue-300 uppercase tracking-wider">Estimated Price</p>
                          <p className="text-3xl font-extrabold text-white mt-1">{formatCurrency(result.prediction)}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 uppercase tracking-wider">Upper Price Bound</p>
                          <p className="text-xl font-bold text-red-400 mt-1">{formatCurrency(result.interval_upper)}</p>
                        </div>
                      </div>
                      <p className="text-center text-gray-500 mt-4 text-xs">
                        This prediction interval captures the true sale price with high confidence.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-700 rounded-xl border border-gray-600 p-6 text-center">
                    <div className="text-gray-400">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Prediction Result</h3>
                      <p className="text-sm">Complete the form and click "Get Prediction" to see the estimated house price</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Other steps with regular layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderStepContent()}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <button 
              type="button" 
              onClick={back} 
              disabled={currentStep === 0}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ⬅ Back
            </button>
            {currentStep < steps.length - 1 ? (
              <button 
                type="button" 
                onClick={next} 
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
              >
                Next ➡
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition disabled:bg-green-800"
              >
                {loading ? 'Calculating...' : 'Get Prediction'}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-10 max-w-2xl mx-auto p-4 bg-red-900/50 border border-red-700 rounded-lg text-center">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-400 mr-2" />
            <h3 className="font-bold text-red-300">Prediction Error</h3>
          </div>
          <p className="text-red-400 mt-2">{error}</p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
