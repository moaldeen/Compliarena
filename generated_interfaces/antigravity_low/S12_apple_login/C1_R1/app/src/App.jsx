import React, { useState } from 'react';

export default function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState(null);
  const [authSuccessUser, setAuthSuccessUser] = useState(null);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setStatusMessage({ type: 'error', text: 'Please enter both email and password.' });
      return;
    }

    if (password.length < 6) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // Simulate authentication pipeline
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccessUser({
        name: email.split('@')[0],
        email: email,
        provider: 'Email & Password',
        orderCount: isSignUp ? 0 : 3
      });
      setStatusMessage({
        type: 'success',
        text: isSignUp ? 'Account created successfully! Welcome to AURA.' : 'Signed in! Synchronizing your past orders...'
      });
    }, 900);
  };

  // Social login handler
  const handleSocialLogin = (provider) => {
    setSocialProvider(provider);
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setSocialProvider(null);
      setAuthSuccessUser({
        name: provider === 'Google' ? 'Alex Jordan' : 'Alex J.',
        email: provider === 'Google' ? 'alex.jordan@gmail.com' : 'alex.j@facebook.com',
        provider: provider,
        orderCount: 4
      });
      setStatusMessage({
        type: 'success',
        text: `Connected with ${provider}! Loading orders & credentials...`
      });
    }, 850);
  };

  const handleResetSession = () => {
    setAuthSuccessUser(null);
    setStatusMessage(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div style={styles.outerContainer}>
      {/* Device Frame Simulation */}
      <div style={styles.phoneFrame}>
        {/* Dynamic Island / Speaker Notch */}
        <div style={styles.notchWrapper}>
          <div style={styles.cameraDot} />
          <div style={styles.sensorPill} />
        </div>

        {/* iOS Status Bar */}
        <div style={styles.statusBar}>
          <span style={styles.statusTime}>9:41</span>
          <div style={styles.statusIcons}>
            {/* Cellular */}
            <svg width="15" height="11" viewBox="0 0 17 11" fill="none">
              <rect x="0" y="8" width="2.5" height="3" rx="0.7" fill="#0f172a"/>
              <rect x="4.5" y="6" width="2.5" height="5" rx="0.7" fill="#0f172a"/>
              <rect x="9" y="3" width="2.5" height="8" rx="0.7" fill="#0f172a"/>
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.7" fill="#0f172a"/>
            </svg>
            {/* Wi-Fi */}
            <svg width="14" height="11" viewBox="0 0 16 12" fill="#0f172a">
              <path d="M8 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-4.24-3.18a6 6 0 0 1 8.48 0 .75.75 0 1 0 1.06-1.06 7.5 7.5 0 0 0-10.6 0 .75.75 0 0 0 1.06 1.06zm-2.83-2.83a10 10 0 0 1 14.14 0 .75.75 0 1 0 1.06-1.06 11.5 11.5 0 0 0-16.26 0 .75.75 0 1 0 1.06 1.06z"/>
            </svg>
            {/* Battery */}
            <div style={styles.batteryContainer}>
              <div style={styles.batteryFill} />
              <div style={styles.batteryTip} />
            </div>
          </div>
        </div>

        {/* Screen Content - Fixed and fully fitting within bounds */}
        <div style={styles.screenInner}>
          {authSuccessUser ? (
            /* Logged in state inside the mobile screen */
            <div style={styles.successView}>
              <div style={styles.successBadge}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h2 style={styles.successHeading}>Welcome Back!</h2>
              <p style={styles.successUserEmail}>{authSuccessUser.email}</p>
              
              <div style={styles.orderCard}>
                <div style={styles.orderCardHeader}>
                  <span style={styles.orderCardTitle}>Customer Account</span>
                  <span style={styles.badgePill}>Active</span>
                </div>
                <div style={styles.orderRow}>
                  <span style={styles.orderLabel}>Auth Method:</span>
                  <span style={styles.orderValue}>{authSuccessUser.provider}</span>
                </div>
                <div style={styles.orderRow}>
                  <span style={styles.orderLabel}>Saved Orders:</span>
                  <span style={styles.orderValue}>{authSuccessUser.orderCount} Orders Persisted</span>
                </div>
                <div style={styles.orderRow}>
                  <span style={styles.orderLabel}>Cart Token:</span>
                  <span style={styles.orderValue}>aur_sec_994x82</span>
                </div>
              </div>

              <button 
                onClick={handleResetSession}
                style={styles.switchAccountBtn}
              >
                Sign Out / Switch Mode
              </button>
            </div>
          ) : (
            /* Auth Form (Sign In / Sign Up) */
            <div style={styles.authContainer}>
              {/* Header / Brand */}
              <div style={styles.brandRow}>
                <div style={styles.logoBadge}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <div>
                  <h1 style={styles.appName}>AURA <span style={styles.brandAccent}>Retail</span></h1>
                  <p style={styles.brandSubtitle}>
                    {isSignUp ? 'Create account to save orders' : 'Sign in to access your orders'}
                  </p>
                </div>
              </div>

              {/* Tab Selector */}
              <div style={styles.tabBar}>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setStatusMessage(null); }}
                  style={{
                    ...styles.tabButton,
                    ...(isSignUp ? {} : styles.tabButtonActive)
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setStatusMessage(null); }}
                  style={{
                    ...styles.tabButton,
                    ...(isSignUp ? styles.tabButtonActive : {})
                  }}
                >
                  Create Account
                </button>
              </div>

              {/* Status Alert if any */}
              {statusMessage && (
                <div style={{
                  ...styles.alertBanner,
                  backgroundColor: statusMessage.type === 'error' ? '#fef2f2' : '#f0fdf4',
                  borderColor: statusMessage.type === 'error' ? '#fecaca' : '#bbf7d0',
                  color: statusMessage.type === 'error' ? '#b91c1c' : '#15803d'
                }}>
                  {statusMessage.text}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={styles.formContainer}>
                {/* Email Input */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Email Address</label>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                      </svg>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      style={styles.textInput}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div style={styles.fieldGroup}>
                  <div style={styles.passwordLabelRow}>
                    <label style={styles.fieldLabel}>Password</label>
                    {!isSignUp && (
                      <span 
                        onClick={() => setStatusMessage({ type: 'success', text: 'Password reset link sent if account exists.' })}
                        style={styles.forgotLink}
                      >
                        Forgot?
                      </span>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <span style={styles.inputIcon}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isSignUp ? "At least 6 characters" : "Enter password"}
                      required
                      style={styles.textInput}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                          <line x1="2" x2="22" y1="2" y2="22"/>
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me / Persistent Orders Checkbox */}
                <div style={styles.rememberRow}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <span style={styles.checkboxText}>
                      {isSignUp ? 'Persist order history & tokens' : 'Stay signed in on this device'}
                    </span>
                  </label>
                </div>

                {/* Primary Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    ...styles.primaryButton,
                    opacity: isLoading ? 0.8 : 1,
                  }}
                >
                  {isLoading && !socialProvider ? (
                    <span style={styles.spinner} />
                  ) : (
                    isSignUp ? 'Create My Account' : 'Sign In to Account'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div style={styles.dividerRow}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>or continue with</span>
                <div style={styles.dividerLine} />
              </div>

              {/* Social Login Buttons: Google and Facebook */}
              <div style={styles.socialButtonsColumn}>
                {/* Google Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                  style={styles.socialButton}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" style={styles.socialIcon}>
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span style={styles.socialButtonText}>
                    {isLoading && socialProvider === 'Google' ? 'Connecting Google...' : 'Continue with Google'}
                  </span>
                </button>

                {/* Facebook Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={isLoading}
                  style={styles.socialButton}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" style={styles.socialIcon}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span style={styles.socialButtonText}>
                    {isLoading && socialProvider === 'Facebook' ? 'Connecting Facebook...' : 'Continue with Facebook'}
                  </span>
                </button>
              </div>

              {/* Bottom security & legal note */}
              <p style={styles.footerLegal}>
                By continuing, you agree to AURA's Terms & Privacy Policy for order storage and credentials.
              </p>
            </div>
          )}
        </div>

        {/* iOS Home Indicator Bar */}
        <div style={styles.homeIndicatorWrapper}>
          <div style={styles.homeIndicatorBar} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '12px',
    backgroundColor: 'transparent',
  },
  phoneFrame: {
    width: '360px',
    height: '680px',
    backgroundColor: '#ffffff',
    borderRadius: '44px',
    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45), 0 0 0 10px #1e293b, 0 0 0 12px #334155',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  },
  notchWrapper: {
    position: 'absolute',
    top: '9px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '108px',
    height: '24px',
    backgroundColor: '#090d16',
    borderRadius: '16px',
    zIndex: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  cameraDot: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
  },
  sensorPill: {
    width: '38px',
    height: '5px',
    borderRadius: '3px',
    backgroundColor: '#1e293b',
  },
  statusBar: {
    height: '42px',
    padding: '10px 22px 0 22px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
    flexShrink: 0,
  },
  statusTime: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.2px',
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  batteryContainer: {
    width: '21px',
    height: '11px',
    border: '1.2px solid #0f172a',
    borderRadius: '3.5px',
    padding: '1.2px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  batteryFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#0f172a',
    borderRadius: '1.5px',
  },
  batteryTip: {
    position: 'absolute',
    right: '-3.5px',
    top: '2.5px',
    width: '2px',
    height: '4px',
    backgroundColor: '#0f172a',
    borderRadius: '0 1px 1px 0',
  },
  screenInner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '4px 20px 8px 20px',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '2px',
  },
  logoBadge: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)',
    flexShrink: 0,
  },
  appName: {
    fontSize: '18px',
    fontWeight: '800',
    letterSpacing: '-0.3px',
    color: '#0f172a',
    lineHeight: '1.2',
  },
  brandAccent: {
    color: '#4f46e5',
    fontWeight: '700',
  },
  brandSubtitle: {
    fontSize: '11px',
    color: '#64748b',
    marginTop: '1px',
    fontWeight: '500',
  },
  tabBar: {
    display: 'flex',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    padding: '3px',
    margin: '8px 0 6px 0',
  },
  tabButton: {
    flex: 1,
    padding: '7px 0',
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  },
  alertBanner: {
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '11px',
    lineHeight: '1.3',
    fontWeight: '500',
    marginBottom: '6px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  passwordLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#334155',
  },
  forgotLink: {
    fontSize: '11px',
    color: '#4f46e5',
    fontWeight: '600',
    cursor: 'pointer',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '11px',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  textInput: {
    width: '100%',
    padding: '9px 34px 9px 34px',
    borderRadius: '10px',
    border: '1.2px solid #e2e8f0',
    fontSize: '12.5px',
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  },
  rememberRow: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-2px',
    marginBottom: '2px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
  },
  checkbox: {
    accentColor: '#4f46e5',
    cursor: 'pointer',
    width: '13px',
    height: '13px',
  },
  checkboxText: {
    fontSize: '10.5px',
    color: '#64748b',
    fontWeight: '500',
  },
  primaryButton: {
    width: '100%',
    padding: '10px 0',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.1px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s ease',
  },
  dividerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '7px 0 6px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: '10px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    fontWeight: '600',
  },
  socialButtonsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  socialButton: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '10px',
    border: '1.2px solid #e2e8f0',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    transition: 'background-color 0.15s ease',
  },
  socialIcon: {
    flexShrink: 0,
  },
  socialButtonText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#1e293b',
  },
  footerLegal: {
    fontSize: '9.5px',
    textAlign: 'center',
    color: '#94a3b8',
    lineHeight: '1.3',
    marginTop: '6px',
    marginBottom: '2px',
  },
  homeIndicatorWrapper: {
    height: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  homeIndicatorBar: {
    width: '128px',
    height: '4px',
    backgroundColor: '#0f172a',
    borderRadius: '2px',
  },
  spinner: {
    width: '14px',
    height: '14px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.6s linear infinite',
  },
  /* Success View Styles */
  successView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '10px 4px',
  },
  successBadge: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    backgroundColor: '#dcfce7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
  },
  successHeading: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '3px',
  },
  successUserEmail: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '16px',
    wordBreak: 'break-all',
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
  },
  orderCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '8px',
  },
  orderCardTitle: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#1e293b',
  },
  badgePill: {
    backgroundColor: '#bbf7d0',
    color: '#166534',
    fontSize: '10px',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '12px',
  },
  orderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
  },
  orderLabel: {
    color: '#64748b',
  },
  orderValue: {
    fontWeight: '600',
    color: '#0f172a',
  },
  switchAccountBtn: {
    width: '100%',
    padding: '10px 0',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#334155',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};
