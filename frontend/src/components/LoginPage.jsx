import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import HometrixLogo from "../assets/hometrix-logo.svg";
import BackgroundImage from "../assets/background-image.png";


function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });
      login(res.data);
      
      // Redirect based on user role
      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/predict");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, #d97706 0%, rgb(0 0 0 / 90%) 50%, #330303 100%), url(${BackgroundImage})
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif'
    },
    card: {
      background: '#ffffff',
      borderRadius: '1.5rem',
      width: '100%',
      maxWidth: '800px',
      maxHeight: '450px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflow: 'hidden',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    leftSection: {
      padding: '1.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2
    },
    rightSection: {
      background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f59e0b 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'white',
      padding: '1.5rem'
    },
    decorativeShape: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%'
    },
    shape1: {
      width: '120px',
      height: '120px',
      top: '-30px',
      right: '-30px'
    },
    shape2: {
      width: '80px',
      height: '80px',
      bottom: '-20px',
      left: '-20px'
    },
    shape3: {
      width: '60px',
      height: '60px',
      top: '50%',
      left: '10%',
      transform: 'translateY(-50%)'
    },
    wavyShape: {
      position: 'absolute',
      top: 0,
      left: '-2px',
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f59e0b 100%)',
      clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
      zIndex: 1
    },
    greeting: {
      fontSize: '1.6rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.3rem'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '0.85rem',
      marginBottom: '1.2rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem'
    },
    inputGroup: {
      position: 'relative'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '0.6rem 0.6rem 0.6rem 2.2rem',
      background: '#f8fafc',
      border: '2px solid #e2e8f0',
      borderRadius: '0.6rem',
      color: '#334155',
      fontSize: '0.85rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontWeight: '500',
      height: '36px'
    },
    inputIcon: {
      position: 'absolute',
      left: '0.6rem',
      color: '#94a3b8',
      zIndex: 1
    },
    eyeIcon: {
      position: 'absolute',
      right: '0.6rem',
      color: '#94a3b8',
      cursor: 'pointer',
      zIndex: 1,
      transition: 'color 0.3s ease'
    },
    rememberForgot: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.75rem',
      color: '#64748b'
    },
    checkbox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem'
    },
    forgotLink: {
      color: '#f97316',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    button: {
      background: 'linear-gradient(135deg, #f97316, #fbbf24)',
      border: 'none',
      borderRadius: '0.6rem',
      padding: '0.7rem',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4rem',
      marginTop: '0.3rem',
      height: '40px'
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: 'not-allowed'
    },
    errorAlert: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '0.6rem',
      padding: '0.7rem',
      color: '#dc2626',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.8rem',
      marginBottom: '0.8rem'
    },
    footer: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.8rem',
      color: '#64748b'
    },
    footerLink: {
      color: '#f97316',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'color 0.3s ease'
    },
    rightContent: {
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    },
    welcomeTitle: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.6rem',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    welcomeText: {
      fontSize: '0.9rem',
      opacity: 0.9,
      lineHeight: '1.4',
      maxWidth: '250px',
      margin: '0 auto'
    },
    logoContainer: {
      marginBottom: '1rem',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    spinner: {
      width: '1rem',
      height: '1rem',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    mobileCard: {
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        maxWidth: '400px'
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={{...styles.card}} className="mobile-responsive">
        {/* Left Section - Form */}
        <div style={styles.leftSection}>
          <h2 style={styles.greeting}>Hello!</h2>
          <p style={styles.subtitle}>Sign in to your account</p>

          {error && (
            <div style={styles.errorAlert}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form style={styles.form} onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <Mail size={16} style={styles.inputIcon} />
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f97316';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f8fafc';
                  }}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.inputWrapper}>
                <Lock size={16} style={styles.inputIcon} />
                <input
                  style={styles.input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f97316';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.background = '#f8fafc';
                  }}
                />
                <button
                  type="button"
                  style={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#f97316';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#94a3b8';
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={styles.rememberForgot}>
              <label style={styles.checkbox}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a 
                href="#" 
                style={styles.forgotLink}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ea580c';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#f97316';
                }}
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {})
              }}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner} />
                  SIGNING IN...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          <div style={styles.footer}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={styles.footerLink}
              onMouseEnter={(e) => {
                e.target.style.color = '#ea580c';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#f97316';
              }}
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Right Section - Welcome */}
        <div style={styles.rightSection}>
          <div style={{...styles.decorativeShape, ...styles.shape1}} />
          <div style={{...styles.decorativeShape, ...styles.shape2}} />
          <div style={{...styles.decorativeShape, ...styles.shape3}} />
          
          <div style={styles.rightContent}>
            <div style={styles.logoContainer}>
              <img src={HometrixLogo} alt="Hometrix Logo" width="auto" height="50" />
            </div>
            <h1 style={styles.welcomeTitle}>Welcome Back!</h1>
            <p style={styles.welcomeText}>
              Access your account and continue with AI-powered real estate insights.
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .mobile-responsive {
              grid-template-columns: 1fr !important;
              max-width: 350px !important;
              max-height: 450px !important;
            }
            .mobile-responsive > div:last-child {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}

export default LoginPage;