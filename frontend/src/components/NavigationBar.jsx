import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Home, Info, Mail, User, LogOut, BarChart3, Menu, X } from 'lucide-react';
import logo from "../assets/hometrix-logo.svg";

function NavigationBar() {
  const { user, logout } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-300"
        style={{
          background: 'rgba(15, 15, 15, 0.95)',
          borderColor: 'rgba(251, 191, 36, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(251, 191, 36, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={logo} 
                alt="Hometrix Logo" 
                className="w-auto h-14 object-contain transition-all duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-all duration-200 group"
              >
                <Home size={18} className="group-hover:scale-110 transition-transform" />
                <span>Home</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-all duration-200 group"
              >
                <Info size={18} className="group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-all duration-200 group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
              
              {/* Show Predict Prices in main nav when logged in */}
              {user && (
                <Link 
                  to="/predict" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-all duration-200 group"
                >
                  <BarChart3 size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Predict Prices</span>
                </Link>
              )}

              {/* Profile/Account Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{
                    background: user ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))' : 'rgba(41, 37, 36, 0.6)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    color: '#d1d5db'
                  }}
                >
                  {user ? (
                    <>
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-black font-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #f97316, #fbbf24)'
                        }}
                      >
                        {user.email[0].toUpperCase()}
                      </div>
                      <span className="text-sm">{user.email.split('@')[0]}</span>
                    </>
                  ) : (
                    <>
                      <User size={18} />
                      <span>Account</span>
                    </>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 rounded-xl overflow-hidden backdrop-blur-lg border shadow-2xl"
                    style={{
                      background: 'rgba(15, 15, 15, 0.95)',
                      borderColor: 'rgba(251, 191, 36, 0.3)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(251, 191, 36, 0.2)'
                    }}
                  >
                    {user ? (
                      <>
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-700">
                          <p className="text-sm text-gray-300">Signed in as</p>
                          <p className="text-orange-400 font-semibold text-sm">{user.email}</p>
                          <p className="text-xs text-gray-500 capitalize">{user.role} Account</p>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-2">
                          {user.role === "admin" && (
                            <Link
                              to="/dashboard"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors"
                            >
                              <BarChart3 size={16} />
                              <span className="text-sm">Admin Dashboard</span>
                            </Link>
                          )}
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut size={16} />
                            <span className="text-sm">Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-2">
                        <Link
                          to="/login"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-gray-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors text-sm"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsProfileOpen(false)}
                          className="block px-4 py-2 text-gray-300 hover:bg-orange-500/10 hover:text-orange-400 transition-colors text-sm"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-200"
              style={{
                background: 'rgba(41, 37, 36, 0.6)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                color: '#d1d5db'
              }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden"
          style={{ paddingTop: '80px' }}
        >
          <div 
            className="absolute inset-0 backdrop-blur-lg"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={closeMobileMenu}
          />
          <div 
            ref={mobileMenuRef}
            className="relative h-full overflow-y-auto"
            style={{
              background: 'rgba(15, 15, 15, 0.95)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="px-6 py-8 space-y-6">
              {/* Mobile Navigation Links */}
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
              >
                <Home size={24} />
                <span>Home</span>
              </Link>
              <Link 
                to="/about" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
              >
                <Info size={24} />
                <span>About</span>
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
              >
                <Mail size={24} />
                <span>Contact</span>
              </Link>

              {/* Mobile User Section */}
              <div className="pt-6 border-t border-gray-700">
                {user ? (
                  <>
                    <div className="mb-6">
                      <p className="text-sm text-gray-400">Signed in as</p>
                      <p className="text-orange-400 font-semibold">{user.email}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role} Account</p>
                    </div>
                    
                    <div className="space-y-4">
                      <Link
                        to="/predict"
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
                      >
                        <BarChart3 size={24} />
                        <span>Predict Prices</span>
                      </Link>
                      
                      {user.role === "admin" && (
                        <Link
                          to="/dashboard"
                          onClick={closeMobileMenu}
                          className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
                        >
                          <BarChart3 size={24} />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-4 text-red-400 hover:text-red-300 transition-all duration-200 text-lg"
                      >
                        <LogOut size={24} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
                    >
                      <User size={24} />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-4 text-gray-300 hover:text-orange-400 transition-all duration-200 text-lg"
                    >
                      <User size={24} />
                      <span>Create Account</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navigation */}
      <div style={{ height: '80px' }} />
    </>
  );
}

export default NavigationBar;
