// AdminDashboard.jsx – View all predictions (admin only)

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

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

  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            📊 Admin Dashboard
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Manage and monitor all house price predictions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <span className="text-2xl">📈</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Total Predictions</p>
                <p className="text-2xl font-bold text-white">{totalPredictions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Average Prediction</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(avgPrediction)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-400">Unique Users</p>
                <p className="text-2xl font-bold text-white">
                  {new Set(predictions.map(p => p.user?.email)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading predictions...</div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-center mb-6">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            {/* Search and Filter Controls */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by user email or prediction amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prediction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lower Bound</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Upper Bound</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredPredictions.map((pred) => (
                    <tr key={pred._id} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {(pred.user?.email || "U")[0].toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-white">
                              {pred.user?.email || "unknown"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {formatCurrency(pred.prediction)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-green-400">
                          {formatCurrency(pred.interval_lower)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-400">
                          {formatCurrency(pred.interval_upper)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-400">
                          {new Date(pred.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(pred.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPredictions.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  {searchTerm ? "No predictions match your search." : "No predictions found."}
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
