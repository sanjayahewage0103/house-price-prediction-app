import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<h1 className="p-4">Welcome to HousePrice Prediction App</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/predict" element={<h1 className="p-4">Prediction Form Page</h1>} />
        <Route path="/about" element={<h1 className="p-4">About Page</h1>} />
        <Route path="/dashboard" element={<h1 className="p-4">Admin Dashboard</h1>} />
      </Routes>
    </>
  );
}

export default App;
