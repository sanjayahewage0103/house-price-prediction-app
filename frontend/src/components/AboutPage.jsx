import logo from "../assets/hometrix-logo.svg";

function AboutPage() {
  const styles = {
    container: {
      background: 'linear-gradient(115deg, rgb(15, 15, 15) 0%, rgb(0 0 0) 25%, rgb(0 0 0) 50%, rgb(26, 15, 10) 75%, rgb(0 0 0) 100%)',
      minHeight: '100vh',
      color: '#f5f5f5',
      padding: '2rem 1.5rem',
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif'
    },
    maxWidth: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    
    // Main Container
    mainContainer: {
      border: '2px solid rgba(251, 191, 36, 0.3)',
      borderRadius: '1rem',
      padding: '2rem',
      background: 'rgba(41, 37, 36, 0.2)',
      backdropFilter: 'blur(10px)'
    },

    // Header
    header: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#fbbf24',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid rgba(251, 191, 36, 0.3)'
    },

    // Top Section (Logo + Mission)
    topSection: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '2rem',
      marginBottom: '2rem',
      paddingBottom: '2rem',
      borderBottom: '1px solid rgba(120, 113, 108, 0.3)'
    },
    
    // Logo Section
    logoSection: {
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    logo: {
      height: '8rem',
      width: 'auto',
      filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.3))'
    },

    // Mission Section
    missionSection: {
      display: 'flex',
      flexDirection: 'column'
    },
    missionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#fbbf24',
      marginBottom: '1rem'
    },
    missionContent: {
      border: '1px solid rgba(120, 113, 108, 0.4)',
      borderRadius: '0.5rem',
      padding: '1rem',
      background: 'rgba(28, 25, 23, 0.3)',
      flex: 1
    },
    missionText: {
      color: '#d1d5db',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      marginBottom: '1rem'
    },
    innovationBox: {
      background: 'rgba(251, 191, 36, 0.1)',
      border: '1px solid rgba(251, 191, 36, 0.3)',
      borderRadius: '0.4rem',
      padding: '0.8rem',
      fontSize: '0.8rem',
      color: '#e5e7eb',
      lineHeight: '1.5'
    },

    // Competition Section
    competitionSection: {
      marginBottom: '2rem',
      position: 'relative'
    },
    competitionContainer: {
      background: 'rgba(41, 37, 36, 0.3)',
      backdropFilter: 'blur(15px)',
      borderRadius: '0.8rem',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    },
    competitionBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 25%, rgba(251, 191, 36, 0.05) 25%, rgba(251, 191, 36, 0.05) 50%, transparent 50%, transparent 75%, rgba(251, 191, 36, 0.05) 75%)',
      backgroundSize: '20px 20px',
      opacity: 0.3
    },
    competitionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#fbbf24',
      marginBottom: '1rem',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    },
    competitionContent: {
      position: 'relative',
      zIndex: 2
    },
    competitionText: {
      color: '#d1d5db',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
      textAlign: 'justify'
    },
    modelHighlight: {
      background: 'rgba(251, 191, 36, 0.15)',
      border: '1px solid rgba(251, 191, 36, 0.4)',
      borderRadius: '0.5rem',
      padding: '1rem',
      margin: '1rem 0',
      textAlign: 'center'
    },
    modelText: {
      color: '#fbbf24',
      fontWeight: '600',
      fontSize: '0.9rem'
    },

    // Technology Stack
    techSection: {
      border: '1px solid rgba(120, 113, 108, 0.4)',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      background: 'rgba(28, 25, 23, 0.5)'
    },
    techTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#fbbf24',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    techGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem'
    },
    techItem: {
      border: '1px solid rgba(120, 113, 108, 0.4)',
      borderRadius: '0.4rem',
      padding: '1rem',
      background: 'rgba(15, 15, 15, 0.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    techIcon: {
      width: '2.5rem',
      height: '2.5rem',
      background: 'linear-gradient(135deg, #fbbf24, #dc2626)',
      borderRadius: '0.4rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      marginBottom: '0.5rem'
    },
    techName: {
      color: '#fbbf24',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '0.3rem'
    },
    techDesc: {
      color: '#9ca3af',
      fontSize: '0.7rem',
      lineHeight: '1.4'
    },

    // Responsive
    '@media (max-width: 768px)': {
      topSection: {
        gridTemplateColumns: '1fr',
        gap: '1rem'
      },
      techGrid: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      }
    }
  };

  const techItems = [
    {
      icon: '⚛️',
      name: 'React',
      desc: 'Frontend UI'
    },
    {
      icon: '🟢',
      name: 'NodeJS',
      desc: 'Backend Runtime'
    },
    {
      icon: '🍃',
      name: 'MongoDB',
      desc: 'Database'
    },
    {
      icon: '🐍',
      name: 'Flask',
      desc: 'ML API'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.mainContainer}>
          {/* Header */}
          <div style={styles.header}>
            About Hometrix
          </div>

          {/* Top Section - Logo + Mission */}
          <div style={styles.topSection}>
            {/* Logo Section */}
            <div style={styles.logoSection}>
              <img src={logo} alt="Hometrix Logo" style={styles.logo} />
            </div>

            {/* Mission Section */}
            <div style={styles.missionSection}>
              <div style={styles.missionTitle}>Our Mission</div>
              <div style={styles.missionContent}>
                <p style={styles.missionText}>
                  🚀 Fusing computational intelligence with modern web technology to demystify real estate valuation. 
                  Empowering homeowners, buyers, and real estate professionals with powerful, transparent, and accessible property valuation tools.
                </p>
                <div style={styles.innovationBox}>
                  💡 <strong>Innovation Box:</strong> Unlike traditional single-point estimates, we deliver prediction intervals with confident lower and upper price bounds using advanced ensemble ML models.
                </div>
              </div>
            </div>
          </div>

          {/* Competition Section */}
          <div style={styles.competitionSection}>
            <div style={styles.competitionContainer}>
              <div style={styles.competitionBg}></div>
              <div style={styles.competitionTitle}>
                🏆 Kaggle Competition Background
              </div>
              <div style={styles.competitionContent}>
                <p style={styles.competitionText}>
                  This application was born out of the <strong>Prediction Interval Competition II: House Price</strong> hosted on Kaggle. 
                  The competition challenged participants to not only estimate a house's sale price, but also to provide a <strong>prediction interval</strong>—a lower and upper bound that captures the uncertainty in real estate valuations.
                </p>
                
                <div style={styles.modelHighlight}>
                  <p style={styles.modelText}>
                    🤖 Advanced Ensemble: CatBoost + LightGBM + XGBoost + CQR
                  </p>
                </div>
                
                <p style={styles.competitionText}>
                  Using advanced ensemble modeling techniques, this solution combined <strong>CatBoost, LightGBM, and XGBoost</strong> regressors with <strong>Conformalized Quantile Regression (CQR)</strong> to generate robust prediction intervals. The approach ranked competitively and was further refined into this full-stack application.
                </p>
                
                <p style={styles.competitionText}>
                  The competition served as a benchmark for developing real-world, production-ready machine learning pipelines. The models developed in that challenge now power this application's core prediction engine.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div style={styles.techSection}>
            <div style={styles.techTitle}>
              🛠️ Technology Stack
            </div>
            <div style={styles.techGrid}>
              {techItems.map((tech, index) => (
                <div 
                  key={index}
                  style={styles.techItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(120, 113, 108, 0.4)';
                  }}
                >
                  <div style={styles.techIcon}>
                    {tech.icon}
                  </div>
                  <div style={styles.techName}>{tech.name}</div>
                  <div style={styles.techDesc}>{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;