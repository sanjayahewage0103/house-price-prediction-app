// AdminDashboard.jsx – Enhanced design matching login and prediction form theme

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import BackgroundImage from "../assets/background-image.png";

// Custom SVG Icons to match the design theme
const ChartIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
);

const DollarIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const UsersIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
);

const FilterIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/predict/all", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPredictions(res.data);
      } catch (err) {
        setError("Failed to fetch predictions");
        console.error("Error fetching predictions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [user.token]);

  // Filter and sort predictions
  const filteredPredictions = predictions
    .filter(pred => 
      pred.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pred.prediction.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "price":
          return b.prediction - a.prediction;
        case "user":
          return (a.user?.email || "").localeCompare(b.user?.email || "");
        default:
          return 0;
      }
    });

  const formatCurrency = (value) => new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0, 
    maximumFractionDigits: 0 
  }).format(value || 0);

  const totalPredictions = predictions.length;
  const avgPrediction = predictions.length > 0 
    ? predictions.reduce((sum, pred) => sum + pred.prediction, 0) / predictions.length 
    : 0;
  const uniqueUsers = new Set(predictions.map(p => p.user?.email)).size;

  if (user.role !== "admin") return <Navigate to="/" replace />;

  const containerStyle = {
    minHeight: '100vh',
    background: `
      linear-gradient(135deg, rgba(241, 245, 249, 0.95) 0%, rgba(226, 232, 240, 0.95) 50%, rgba(203, 213, 225, 0.95) 100%),
      url('${BackgroundImage}')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    padding: '2rem 1rem'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(251, 191, 36, 0.3)',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden'
  };

  const statCardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(15px)',
    border: '2px solid rgba(251, 191, 36, 0.4)',
    borderRadius: '1.25rem',
    padding: '1.5rem',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const iconContainerStyle = (bgColor) => ({
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '1rem',
    background: bgColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
  });

  return (
    <div style={containerStyle}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Monitor and manage all house price predictions with advanced analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Total Predictions Card */}
          <div 
            style={statCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(251, 191, 36, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="flex items-center">
              <div style={iconContainerStyle('linear-gradient(135deg, #3b82f6, #1d4ed8)')}>
                <ChartIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Total Predictions</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalPredictions.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          {/* Average Prediction Card */}
          <div 
            style={statCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="flex items-center">
              <div style={iconContainerStyle('linear-gradient(135deg, #22c55e, #16a34a)')}>
                <DollarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Average Prediction</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{formatCurrency(avgPrediction)}</p>
              </div>
            </div>
          </div>
          
          {/* Unique Users Card */}
          <div 
            style={statCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(168, 85, 247, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="flex items-center">
              <div style={iconContainerStyle('linear-gradient(135deg, #a855f7, #7c3aed)')}>
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Unique Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{uniqueUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={cardStyle} className="p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading predictions...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200/60 rounded-2xl p-6 text-center mb-8 shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xl">⚠️</span>
              </div>
            </div>
            <p className="text-red-700 font-medium text-lg">{error}</p>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <div style={cardStyle}>
            {/* Search and Filter Controls */}
            <div className="p-8 border-b-2 border-amber-500/20">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <SearchIcon className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by user email or prediction amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 shadow-sm"
                    style={{
                      fontSize: '1rem',
                      fontWeight: '500'
                    }}
                  />
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FilterIcon className="text-gray-400" />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-12 pr-8 py-3 bg-white/80 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                    style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      minWidth: '200px'
                    }}
                  >
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                    <option value="user">Sort by User</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Predictions Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm">
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-amber-500/20">User</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-amber-500/20">Prediction</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-amber-500/20">Lower Bound</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-amber-500/20">Upper Bound</th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-amber-500/20">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-500/10">
                  {filteredPredictions.map((pred, index) => (
                    <tr 
                      key={pred._id} 
                      className="hover:bg-amber-50/40 hover:backdrop-blur-sm transition-all duration-300 cursor-pointer"
                      style={{
                        background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(251, 191, 36, 0.05)'
                      }}
                    >
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg"
                            style={{
                              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                            }}
                          >
                            {(pred.user?.email || "U")[0].toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-800">
                              {pred.user?.email || "unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg font-bold text-amber-700">
                          {formatCurrency(pred.prediction)}
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(pred.interval_lower)}
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-lg font-semibold text-red-600">
                          {formatCurrency(pred.interval_upper)}
                        </div>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(pred.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(pred.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Empty State */}
              {filteredPredictions.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full flex items-center justify-center border-2 border-amber-500/30 shadow-lg">
                    <span className="text-4xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {searchTerm ? "No matching predictions found" : "No predictions yet"}
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? "Try adjusting your search criteria" : "Predictions will appear here once users start making them"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;