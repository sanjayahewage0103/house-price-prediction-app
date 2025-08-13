
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react';

const categories = [
  {
    title: 'Basic Property Information',
    fields: ['sqft', 'beds', 'bath_full', 'bath_half', 'bath_3qtr', 'stories', 'grade', 'condition', 'year_built']
  },
  {
    title: 'Location & Valuation',
    fields: ['latitude', 'longitude', 'land_val', 'imp_val']
  },
  {
    title: 'Property Features',
    fields: ['sqft_1', 'sqft_fbsmt', 'gara_sqft', 'garb_sqft', 'year_reno']
  },
  {
    title: 'Views & Surroundings',
    fields: ['wfnt', 'golf', 'greenbelt', 'noise_traffic', 'view_rainier', 'view_olympics', 'view_cascades', 'view_territorial', 'view_skyline', 'view_sound', 'view_lakewash', 'view_lakesamm', 'view_otherwater', 'view_other']
  }
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

const PredictionModal = ({ prediction, onClose }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  if (!prediction) {
    return null;
  }

  const handleNextCategory = () => {
    setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const handlePrevCategory = () => {
    setCurrentCategoryIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  const currentCategory = categories[currentCategoryIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col border border-amber-500/30">
        <div className="p-4 flex justify-between items-center border-b border-amber-500/30">
          <p className="text-xs text-gray-400">{new Date(prediction.createdAt).toLocaleString()}</p>
          <h2 className="text-2xl font-bold text-amber-400">Hometrix Prediction Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 flex items-center justify-around text-center bg-black/20">
          <div className="text-center">
            <p className="text-sm text-gray-400">Lower Bound</p>
            <p className="text-2xl font-semibold text-gray-300">${prediction.interval_lower.toLocaleString()}</p>
          </div>
          <div className="text-center mx-8">
            <p className="text-lg text-amber-400">Predicted Price</p>
            <p className="text-6xl font-bold text-yellow-500">${prediction.prediction.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Upper Bound</p>
            <p className="text-2xl font-semibold text-gray-300">${prediction.interval_upper.toLocaleString()}</p>
          </div>
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevCategory} className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 transition">
              <ChevronLeft className="w-6 h-6 text-amber-300" />
            </button>
            <h3 className="text-xl font-bold text-center text-amber-400">{currentCategory.title}</h3>
            <button onClick={handleNextCategory} className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 transition">
              <ChevronRight className="w-6 h-6 text-amber-300" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentCategory.title === 'Views & Surroundings' ? (
              currentCategory.fields.map((field) => (
                <div key={field} className="bg-white/10 p-3 rounded-lg flex items-center justify-between">
                  <p className="font-bold text-gray-300">{fieldDescriptions[field]?.title || field}</p>
                  {prediction.features[field] ? <Check className="w-6 h-6 text-green-500" /> : <X className="w-6 h-6 text-red-500" />}
                </div>
              ))
            ) : (
              currentCategory.fields.map((field) => (
                <div key={field} className="bg-white/10 p-3 rounded-lg">
                  <p className="font-bold text-gray-300">{fieldDescriptions[field]?.title || field}</p>
                  <p className="text-amber-300">{prediction.features[field]}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;
