import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoute from "./components/ProtectedRoute";
import PredictionForm from "./components/PredictionForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<h1 className="p-4">Welcome to HousePrice Prediction App</h1>} />
        <Route path="/about" element={<h1 className="p-4">About Page</h1>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/predict"
          element={
            <ProtectedRoute>
              <PredictionForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </>
  );
}

export default App;
