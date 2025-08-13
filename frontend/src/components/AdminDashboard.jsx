
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import BackgroundImage from "../assets/background-image.png";
import PredictionModal from "./PredictionModal"; // Import PredictionModal

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
  const [selectedPrediction, setSelectedPrediction] = useState(null); // State for modal

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

  // Handle modal open/close
  const handleViewDetails = (prediction) => {
    setSelectedPrediction(prediction);
  };

  const handleCloseModal = () => {
    setSelectedPrediction(null);
  };

  return (
    <div style={{ backgroundImage: `url('${BackgroundImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} className="min-h-screen">
      <div className="bg-black/60 min-h-screen text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Monitor and manage all house price predictions with advanced analytics
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Total Predictions Card */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                  <ChartIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">Total Predictions</p>
                  <p className="text-3xl font-bold text-white mt-1">{totalPredictions.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            {/* Average Prediction Card */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-green-500 to-green-700 shadow-md">
                  <DollarIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">Average Prediction</p>
                  <p className="text-3xl font-bold text-white mt-1">{formatCurrency(avgPrediction)}</p>
                </div>
              </div>
            </div>
            
            {/* Unique Users Card */}
            <div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br from-purple-500 to-purple-700 shadow-md">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">Unique Users</p>
                  <p className="text-3xl font-bold text-white mt-1">{uniqueUsers.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center shadow-lg border border-amber-500/30">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-300 text-lg">Loading predictions...</p>
              </div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-500/20 backdrop-blur-lg border-2 border-red-500/50 rounded-2xl p-6 text-center mb-8 shadow-lg text-red-300">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-red-500/30 rounded-full flex items-center justify-center">
                  <span className="text-red-300 text-xl">⚠️</span>
                </div>
              </div>
              <p className="font-medium text-lg">{error}</p>
            </div>
          )}

          {/* Main Content */}
          {!loading && !error && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-amber-500/30">
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
                      className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 shadow-sm"
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
                      className="pl-12 pr-8 py-3 bg-white/5 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl text-white focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
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
                    <tr className="bg-amber-500/20 backdrop-blur-sm">
                      <th className="px-8 py-4 text-left text-sm font-bold text-amber-300 uppercase tracking-wider border-b-2 border-amber-500/20">User</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-amber-300 uppercase tracking-wider border-b-2 border-amber-500/20">Prediction</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-amber-300 uppercase tracking-wider border-b-2 border-amber-500/20">Lower Bound</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-amber-300 uppercase tracking-wider border-b-2 border-amber-500/20">Upper Bound</th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-amber-300 uppercase tracking-wider border-b-2 border-amber-500/20">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {filteredPredictions.map((pred, index) => (
                      <tr 
                        key={pred._id} 
                        className="hover:bg-amber-500/10 transition-all duration-300 cursor-pointer"
                        onClick={() => handleViewDetails(pred)} // Add onClick handler
                        style={{
                          background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(251, 191, 36, 0.02)'
                        }}
                      >
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="flex items-center">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md"
                              style={{
                                background: 'linear-gradient(135deg, #f97316, #fbbf24)'
                              }}
                            >
                              {(pred.user?.email || "U")[0].toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-200">
                                {pred.user?.email || "unknown"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-lg font-bold text-amber-400">
                            {formatCurrency(pred.prediction)}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-lg font-semibold text-green-400">
                            {formatCurrency(pred.interval_lower)}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-lg font-semibold text-red-400">
                            {formatCurrency(pred.interval_upper)}
                          </div>
                        </td>
                        <td className="px-8 py-6 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-300">
                            {new Date(pred.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
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
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      {searchTerm ? "No matching predictions found" : "No predictions yet"}
                    </h3>
                    <p className="text-gray-400">
                      {searchTerm ? "Try adjusting your search criteria" : "Predictions will appear here once users start making them"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <PredictionModal prediction={selectedPrediction} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default AdminDashboard;
