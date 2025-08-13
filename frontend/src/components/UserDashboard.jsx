import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionModal from './PredictionModal';

const UserDashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;
        const res = await axios.get('/api/predict/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPredictions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch predictions:", err);
        setError('Failed to fetch predictions.');
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const handleViewDetails = (prediction) => {
    setSelectedPrediction(prediction);
  };

  const handleCloseModal = () => {
    setSelectedPrediction(null);
  };

  if (loading) {
    return <div className="bg-gray-900 min-h-screen text-white p-8 text-center">Loading predictions...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 min-h-screen text-red-500 p-8 text-center">{error}</div>;
  }

  return (
    <div style={{ backgroundImage: `url('./src/assets/background-image.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} className="min-h-screen">
      <div className="bg-black/60 min-h-screen text-white p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              My Prediction History
            </span>
          </h1>
          
          <div className="overflow-x-auto rounded-lg border border-amber-500/30 shadow-2xl shadow-amber-500/10" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)' }}>
            <table className="min-w-full">
              <thead className="border-b border-amber-500/30">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Prediction</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Lower Bound</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">Upper Bound</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/20">
                {predictions.map((prediction) => (
                  <tr key={prediction._id} onClick={() => handleViewDetails(prediction)} className="cursor-pointer hover:bg-black/40 transition">
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-300">{new Date(prediction.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-bold text-yellow-500">${prediction.prediction.toLocaleString()}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-300/80">${prediction.interval_lower.toLocaleString()}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-300/80">${prediction.interval_upper.toLocaleString()}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      <button className="font-bold text-amber-500 hover:text-amber-400 transition">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PredictionModal prediction={selectedPrediction} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default UserDashboard;