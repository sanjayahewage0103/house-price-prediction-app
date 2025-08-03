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

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/predictions", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPredictions(res.data);
      } catch (err) {
        setError("Failed to fetch predictions");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [user.token]);

  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm border">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Prediction</th>
                <th className="px-4 py-2 border">Lower</th>
                <th className="px-4 py-2 border">Upper</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred) => (
                <tr key={pred._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{pred.user?.email || "unknown"}</td>
                  <td className="px-4 py-2 border">${pred.prediction.toFixed(0)}</td>
                  <td className="px-4 py-2 border">${pred.interval_lower.toFixed(0)}</td>
                  <td className="px-4 py-2 border">${pred.interval_upper.toFixed(0)}</td>
                  <td className="px-4 py-2 border">{new Date(pred.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
