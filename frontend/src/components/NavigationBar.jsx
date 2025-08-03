import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg">🏠 HousePrice App</div>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user ? (
          <>
            <Link to="/predict">Predict</Link>
            {user.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
            <button onClick={logout} className="text-red-300">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
