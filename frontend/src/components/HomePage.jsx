import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handlePredictClick = () => {
    navigate('/predict');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Home's{' '}
            <span className="bg-gradient-to-r from-orange via-yellow to-orange-red bg-clip-text text-transparent">
              True Value.
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-light-grayish-pink">Instantly.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Leverage state-of-the-art AI to go beyond single-price estimates. Our ensemble model provides 
            accurate price ranges, giving you the confidence to make smarter real estate decisions.
          </p>
          
          <button 
            onClick={handlePredictClick}
            className="bg-gradient-to-r from-orange to-yellow hover:from-orange-red hover:to-orange text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange/25"
          >
            Start Predicting Now
          </button>
        </div>

        {/* Why Choose Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-orange">HousePrice AI</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pinpoint Accuracy */}
            <div className="bg-very-dark-gray p-8 rounded-2xl border border-dark-gray hover:border-orange/50 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-r from-orange to-yellow w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-light-grayish-pink">Pinpoint Accuracy</h3>
              <p className="text-slate-gray leading-relaxed">
                Our model is trained on vast datasets, utilizing an ensemble of advanced algorithms to ensure high precision and reliable predictions.
              </p>
            </div>

            {/* Confidence Intervals */}
            <div className="bg-very-dark-gray p-8 rounded-2xl border border-dark-gray hover:border-orange/50 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-r from-orange to-yellow w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-light-grayish-pink">Confidence Intervals</h3>
              <p className="text-slate-gray leading-relaxed">
                We provide a realistic price range (lower and upper bound), not just a single number, reflecting true market volatility.
              </p>
            </div>

            {/* Data-Driven Insights */}
            <div className="bg-very-dark-gray p-8 rounded-2xl border border-dark-gray hover:border-orange/50 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="bg-gradient-to-r from-orange to-yellow w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-light-grayish-pink">Data-Driven Insights</h3>
              <p className="text-slate-gray leading-relaxed">
                Understand the key factors driving your property's value with a system built on robust data science principles.
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default HomePage;