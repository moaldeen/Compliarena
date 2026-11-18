import React, { useState, useEffect } from 'react';

// Custom SVG Icons
const Icons = {
  FaceId: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M7 21H5a2 2 0 0 1-2-2v-2M17 21h2a2 2 0 0 0 2-2v-2" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <path d="M9 13a3 3 0 0 0 6 0" />
      <line x1="12" y1="10" x2="12" y2="12" />
    </svg>
  ),
  Fingerprint: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </svg>
  ),
  ShieldCheck: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Lock: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Eye: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  ),
  CheckCircle2: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  ChevronRight: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  FileText: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Info: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Sparkles: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  X: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  KeyRound: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  ),
  Zap: ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
};

export default function App() {
  // App state
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [biometricType, setBiometricType] = useState('face'); // 'face' | 'fingerprint'
  const [bipaConsentAgreed, setBipaConsentAgreed] = useState(true);
  const [quickBalanceEnabled, setQuickBalanceEnabled] = useState(true);
  const [autoLockDuration, setAutoLockDuration] = useState('1m'); // 'immediate', '1m', '5m'
  const [rememberId, setRememberId] = useState(true);
  
  // Password login form state
  const [activeTab, setActiveTab] = useState('biometric'); // 'biometric' | 'password'
  const [accountEmail, setAccountEmail] = useState('morgan.vance@apexil.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  
  // Modals & simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [showBipaModal, setShowBipaModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Device Frame theme
  const [deviceColor, setDeviceColor] = useState('black'); // 'black' | 'titanium' | 'navy'

  // Trigger toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Biometric Scan Simulation
  const handleTriggerBiometricScan = () => {
    if (!bipaConsentAgreed && !biometricsEnabled) {
      setShowBipaModal(true);
      return;
    }
    setIsScanning(true);
    setScanProgress(0);
    setScanSuccess(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setScanSuccess(true);
          setTimeout(() => {
            setIsScanning(false);
            setBiometricsEnabled(true);
            triggerToast(
              biometricType === 'face'
                ? "Face ID verified & enabled successfully!"
                : "Fingerprint verified & enabled successfully!"
            );
          }, 800);
        }, 400);
      }
    }, 250);
  };

  // Toggle Biometrics handler (requires BIPA compliance in Illinois)
  const handleToggleBiometrics = () => {
    if (!biometricsEnabled) {
      if (!bipaConsentAgreed) {
        setShowBipaModal(true);
      } else {
        handleTriggerBiometricScan();
      }
    } else {
      setBiometricsEnabled(false);
      triggerToast("Biometric authentication disabled. Password fallback active.");
    }
  };

  // Password sign-in test handler
  const handlePasswordSignIn = (e) => {
    e.preventDefault();
    triggerToast("Authenticated via Master Password! Security token refreshed.");
  };

  // Save all settings handler
  const handleSaveSettings = () => {
    triggerToast("Security preferences saved securely (Illinois BIPA compliant).");
  };

  // Security score calculator (KPI gamification to drive retention and conversion)
  const calculateSecurityScore = () => {
    let score = 40;
    if (biometricsEnabled) score += 35;
    if (bipaConsentAgreed) score += 15;
    if (quickBalanceEnabled) score += 5;
    if (autoLockDuration === 'immediate' || autoLockDuration === '1m') score += 5;
    return score;
  };

  const securityScore = calculateSecurityScore();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: '12px'
    }}>
      {/* Top Banner Context & Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '430px',
        marginBottom: '10px',
        padding: '0 6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 8px #10B981'
          }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em' }}>
            APEX BANK ILLINOIS • SECURE PORTAL
          </span>
        </div>
        
        {/* Device Finish Switcher */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setDeviceColor('black')}
            title="Black Titanium Finish"
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#181A20',
              border: deviceColor === 'black' ? '2px solid #3B82F6' : '1px solid #475569',
              cursor: 'pointer'
            }}
          />
          <button
            onClick={() => setDeviceColor('titanium')}
            title="Natural Titanium Finish"
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#52525B',
              border: deviceColor === 'titanium' ? '2px solid #3B82F6' : '1px solid #475569',
              cursor: 'pointer'
            }}
          />
          <button
            onClick={() => setDeviceColor('navy')}
            title="Apex Navy Finish"
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#1E3A8A',
              border: deviceColor === 'navy' ? '2px solid #3B82F6' : '1px solid #475569',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>

      {/* FIXED MOBILE DEVICE SIMULATION FRAME */}
      {/* Sized precisely to fit without clipping or overflow */}
      <div style={{
        position: 'relative',
        width: '390px',
        height: '800px',
        backgroundColor: '#0F172A',
        borderRadius: '48px',
        border: deviceColor === 'navy' 
          ? '8px solid #1E3A8A' 
          : deviceColor === 'titanium' 
            ? '8px solid #3F3F46' 
            : '8px solid #1E293B',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none'
      }}>
        {/* Realistic Status Bar */}
        <div style={{
          height: '44px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 40,
          backgroundColor: '#0F172A',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
            9:41
          </span>
          {/* Dynamic Island Capsule */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '8px',
            width: '94px',
            height: '24px',
            backgroundColor: '#000000',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            boxShadow: '0 0 1px 1px rgba(255,255,255,0.06)'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#09090b' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', opacity: biometricsEnabled ? 1 : 0.3 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#38BDF8' }}>5G</span>
            <div style={{
              width: '18px',
              height: '10px',
              border: '1px solid #94A3B8',
              borderRadius: '2px',
              padding: '1px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{ width: '80%', height: '100%', backgroundColor: '#10B981', borderRadius: '1px' }} />
            </div>
          </div>
        </div>

        {/* Inner Content Container - Fitted strictly to mobile viewport */}
        <div style={{
          flex: 1,
          padding: '12px 18px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'hidden',
          backgroundColor: '#0A0F1D',
          position: 'relative'
        }}>
          {/* Header Navigation Bar */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px'
            }}>
              <button
                onClick={() => triggerToast("Apex Home screen")}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                ← Back
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                padding: '4px 8px',
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.25)'
              }}>
                <Icons.ShieldCheck size={13} className="text-blue-400" />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#60A5FA' }}>
                  Illinois BIPA Certified
                </span>
              </div>

              <button
                onClick={() => setShowBipaModal(true)}
                title="BIPA Disclosure & Privacy Info"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94A3B8',
                  cursor: 'pointer'
                }}
              >
                <Icons.Info size={14} />
              </button>
            </div>

            {/* Title & Trust Header */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <h1 style={{
                  fontSize: '19px',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF',
                  margin: 0
                }}>
                  Security & Access
                </h1>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: securityScore >= 90 ? '#10B981' : '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>Score: {securityScore}%</span>
                  <div style={{
                    width: '32px',
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${securityScore}%`,
                      height: '100%',
                      backgroundColor: securityScore >= 90 ? '#10B981' : '#F59E0B',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px', lineHeight: '1.3' }}>
                Manage instant biometric verification and traditional master password access.
              </p>
            </div>

            {/* High-Conversion Value Proposition Card (Retention & Conversion KPI) */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: '12px',
              padding: '8px 10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8'
                }}>
                  <Icons.Sparkles size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#E0F2FE' }}>
                    Apex Instant Perks Unlocked
                  </div>
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                    0.2s Biometric login + 4.85% APY Daily Vault access
                  </div>
                </div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                padding: '2px 6px',
                borderRadius: '6px'
              }}>
                ACTIVE
              </span>
            </div>

            {/* Fast Switch Tabs: Biometric vs Password */}
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              padding: '3px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '10px'
            }}>
              <button
                onClick={() => setActiveTab('biometric')}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: activeTab === 'biometric' ? '#2563EB' : 'transparent',
                  color: activeTab === 'biometric' ? '#FFFFFF' : '#94A3B8',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {biometricType === 'face' ? <Icons.FaceId size={14} /> : <Icons.Fingerprint size={14} />}
                Biometric Login
              </button>
              
              <button
                onClick={() => setActiveTab('password')}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  borderRadius: '7px',
                  border: 'none',
                  backgroundColor: activeTab === 'password' ? '#2563EB' : 'transparent',
                  color: activeTab === 'password' ? '#FFFFFF' : '#94A3B8',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icons.KeyRound size={14} />
                Password Login
              </button>
            </div>
          </div>

          {/* MAIN CONFIGURATION CONTENT (Compact, non-overflowing) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeTab === 'biometric' ? (
              /* BIOMETRIC CONFIGURATION VIEW */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Primary Biometric Card */}
                <div style={{
                  backgroundColor: 'rgba(22, 32, 50, 0.75)',
                  border: biometricsEnabled 
                    ? '1px solid rgba(37, 99, 235, 0.4)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '10px 12px',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: biometricsEnabled ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        border: biometricsEnabled ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: biometricsEnabled ? '#60A5FA' : '#94A3B8'
                      }}>
                        {biometricType === 'face' ? <Icons.FaceId size={20} /> : <Icons.Fingerprint size={20} />}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                          {biometricType === 'face' ? 'Face ID Authentication' : 'Touch ID / Fingerprint'}
                        </div>
                        <div style={{ fontSize: '10.5px', color: biometricsEnabled ? '#10B981' : '#94A3B8', fontWeight: 500 }}>
                          {biometricsEnabled ? '● Enabled for instant unlock' : 'Disabled (Password required)'}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Toggle Switch */}
                    <button
                      onClick={handleToggleBiometrics}
                      aria-label="Toggle Biometric Authentication"
                      style={{
                        width: '46px',
                        height: '26px',
                        borderRadius: '13px',
                        backgroundColor: biometricsEnabled ? '#10B981' : '#334155',
                        position: 'relative',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background-color 0.25s ease',
                        padding: '2px'
                      }}
                    >
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        transform: biometricsEnabled ? 'translateX(20px)' : 'translateX(0)',
                        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }} />
                    </button>
                  </div>

                  {/* Biometric Type Selector Chips (Face vs Fingerprint) */}
                  <div style={{
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>Sensor Method:</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          setBiometricType('face');
                          triggerToast("Switched sensor to Apple Face ID / Facial Recognition");
                        }}
                        style={{
                          background: biometricType === 'face' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                          border: biometricType === 'face' ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: biometricType === 'face' ? '#93C5FD' : '#94A3B8',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Icons.FaceId size={12} />
                        Face ID
                      </button>
                      <button
                        onClick={() => {
                          setBiometricType('fingerprint');
                          triggerToast("Switched sensor to Touch ID / Fingerprint Reader");
                        }}
                        style={{
                          background: biometricType === 'fingerprint' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                          border: biometricType === 'fingerprint' ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: biometricType === 'fingerprint' ? '#93C5FD' : '#94A3B8',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '10px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Icons.Fingerprint size={12} />
                        Touch ID
                      </button>
                    </div>
                  </div>

                  {/* Verification action button */}
                  <div style={{ marginTop: '8px' }}>
                    <button
                      onClick={handleTriggerBiometricScan}
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(37, 99, 235, 0.15)',
                        border: '1px solid rgba(59, 130, 246, 0.35)',
                        color: '#60A5FA',
                        borderRadius: '8px',
                        padding: '6px 0',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Icons.Zap size={13} />
                      {biometricsEnabled ? `Re-Verify ${biometricType === 'face' ? 'Face ID' : 'Fingerprint'}` : `Enroll & Test ${biometricType === 'face' ? 'Face ID' : 'Fingerprint'}`}
                    </button>
                  </div>
                </div>

                {/* Illinois BIPA Mandatory Compliance Card */}
                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: '12px',
                  padding: '9px 11px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Icons.FileText size={13} className="text-blue-400" />
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#E2E8F0' }}>
                        Illinois BIPA Consent (740 ILCS 14/)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowBipaModal(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#60A5FA',
                        fontSize: '10px',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Read Policy
                    </button>
                  </div>

                  <p style={{ fontSize: '9.5px', color: '#94A3B8', lineHeight: '1.35', marginBottom: '6px' }}>
                    Apex Bank collects, securely stores, and transmits biometric identifiers solely to verification network APIs for fraud detection & authentication. Data is permanently purged within 30 days of account closure.
                  </p>

                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={bipaConsentAgreed}
                      onChange={(e) => {
                        setBipaConsentAgreed(e.target.checked);
                        if (!e.target.checked && biometricsEnabled) {
                          setBiometricsEnabled(false);
                          triggerToast("BIPA consent revoked: biometrics disabled per IL law.");
                        } else if (e.target.checked) {
                          triggerToast("Illinois BIPA written consent recorded.");
                        }
                      }}
                      style={{
                        marginTop: '2px',
                        accentColor: '#2563EB',
                        cursor: 'pointer',
                        width: '13px',
                        height: '13px'
                      }}
                    />
                    <span style={{ fontSize: '10px', color: '#CBD5E1', lineHeight: '1.3' }}>
                      I execute written consent for biometric verification per Illinois BIPA guidelines.
                    </span>
                  </label>
                </div>

                {/* Additional Retention & Engagement Settings */}
                <div style={{
                  backgroundColor: 'rgba(22, 32, 50, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '8px 11px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  {/* Quick Balance Peek */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: '#F1F5F9' }}>
                        Quick Balance Peek (Biometric)
                      </div>
                      <div style={{ fontSize: '9px', color: '#94A3B8' }}>
                        View balance on widget with quick sensor tap
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setQuickBalanceEnabled(!quickBalanceEnabled);
                        triggerToast(quickBalanceEnabled ? "Quick Peek disabled" : "Quick Peek enabled!");
                      }}
                      style={{
                        width: '38px',
                        height: '20px',
                        borderRadius: '10px',
                        backgroundColor: quickBalanceEnabled ? '#2563EB' : '#334155',
                        position: 'relative',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px'
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        transform: quickBalanceEnabled ? 'translateX(18px)' : 'translateX(0)',
                        transition: 'transform 0.2s ease'
                      }} />
                    </button>
                  </div>

                  {/* Auto-Lock Timeout */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                  }}>
                    <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>Auto-Lock Session:</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {['immediate', '1m', '5m'].map((dur) => (
                        <button
                          key={dur}
                          onClick={() => {
                            setAutoLockDuration(dur);
                            triggerToast(`Auto-lock timeout set to: ${dur}`);
                          }}
                          style={{
                            padding: '2px 7px',
                            borderRadius: '5px',
                            border: autoLockDuration === dur ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.06)',
                            backgroundColor: autoLockDuration === dur ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
                            color: autoLockDuration === dur ? '#93C5FD' : '#94A3B8',
                            fontSize: '9.5px',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {dur === 'immediate' ? 'Instant' : dur}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TRADITIONAL PASSWORD LOGIN CONFIGURATION VIEW */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{
                  backgroundColor: 'rgba(22, 32, 50, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#94A3B8'
                    }}>
                      <Icons.Lock size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFFFFF' }}>
                        Master Password Credentials
                      </div>
                      <div style={{ fontSize: '10px', color: '#94A3B8' }}>
                        Always available as secondary verification fallback
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* User ID Field */}
                    <div>
                      <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, color: '#94A3B8', marginBottom: '3px' }}>
                        ILLINOIS APEX ID / EMAIL
                      </label>
                      <input
                        type="text"
                        value={accountEmail}
                        onChange={(e) => setAccountEmail(e.target.value)}
                        style={{
                          width: '100%',
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '7px 10px',
                          fontSize: '11.5px',
                          color: '#FFFFFF',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Password Field */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <label style={{ fontSize: '10px', fontWeight: 600, color: '#94A3B8' }}>
                          PASSWORD
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowResetModal(true)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#60A5FA',
                            fontSize: '9.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0
                          }}
                        >
                          Change / Reset
                        </button>
                      </div>
                      
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{
                            width: '100%',
                            backgroundColor: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            padding: '7px 32px 7px 10px',
                            fontSize: '11.5px',
                            color: '#FFFFFF',
                            outline: 'none',
                            boxSizing: 'border-box'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {showPassword ? <Icons.EyeOff size={15} /> : <Icons.Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    {/* Remember ID Switch */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '3px 0' }}>
                      <span style={{ fontSize: '10px', color: '#94A3B8' }}>Remember ID on this device</span>
                      <input
                        type="checkbox"
                        checked={rememberId}
                        onChange={(e) => setRememberId(e.target.checked)}
                        style={{ accentColor: '#2563EB', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Sign-in button */}
                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 0',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Icons.ShieldCheck size={14} />
                      Verify & Sign In with Password
                    </button>
                  </form>
                </div>

                {/* Password vs Biometric Speed comparison */}
                <div style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '8px 10px'
                }}>
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#E2E8F0', marginBottom: '4px' }}>
                    Speed Comparison
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '9.5px' }}>
                      <span style={{ color: '#94A3B8' }}>Biometric (Face ID / Touch):</span>
                      <span style={{ color: '#10B981', fontWeight: 700 }}>0.3s Instant</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '9.5px' }}>
                      <span style={{ color: '#94A3B8' }}>Password + 2FA SMS:</span>
                      <span style={{ color: '#F59E0B', fontWeight: 600 }}>14.2s Average</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM CONTROLS & PRIMARY CTA */}
          <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
            <button
              onClick={handleSaveSettings}
              style={{
                width: '100%',
                backgroundColor: '#2563EB',
                backgroundImage: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '11px 0',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
              }}
            >
              <Icons.ShieldCheck size={16} />
              Save & Activate Security Settings
            </button>

            {/* Regulatory Footer Trust Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '8px'
            }}>
              <span style={{ fontSize: '9px', color: '#64748B', fontWeight: 600 }}>
                FDIC Insured • IL BIPA Compliant • 256-Bit TLS
              </span>
            </div>

            {/* Mobile Home Indicator Bar */}
            <div style={{
              width: '120px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              margin: '8px auto 0'
            }} />
          </div>

          {/* OVERLAY: LIVE BIOMETRIC SCAN SIMULATION */}
          {isScanning && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(11, 17, 30, 0.94)',
              backdropFilter: 'blur(8px)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}>
              {/* Scan target visual */}
              <div style={{
                position: 'relative',
                width: '130px',
                height: '130px',
                borderRadius: biometricType === 'face' ? '28px' : '50%',
                border: scanSuccess ? '3px solid #10B981' : '3px solid #3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: 'rgba(30, 58, 138, 0.2)'
              }}>
                {/* Laser animation */}
                {!scanSuccess && (
                  <div className="animate-scan-laser" style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#38BDF8',
                    boxShadow: '0 0 10px #38BDF8, 0 0 20px #38BDF8'
                  }} />
                )}

                {scanSuccess ? (
                  <div style={{ color: '#10B981', transform: 'scale(1.3)', transition: 'transform 0.3s ease' }}>
                    <Icons.CheckCircle2 size={48} />
                  </div>
                ) : (
                  <div style={{ color: '#60A5FA', opacity: 0.9 }}>
                    {biometricType === 'face' ? <Icons.FaceId size={54} /> : <Icons.Fingerprint size={54} />}
                  </div>
                )}
              </div>

              {/* Progress Text */}
              <div style={{ marginTop: '18px', textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
                  {scanSuccess
                    ? `${biometricType === 'face' ? 'Face ID' : 'Fingerprint'} Verified!`
                    : `Scanning ${biometricType === 'face' ? 'Face ID' : 'Fingerprint'}...`}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                  {scanSuccess
                    ? "Cryptographic biometric token stored locally"
                    : "Connecting to Illinois verification network APIs"}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '180px',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                marginTop: '16px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${scanProgress}%`,
                  backgroundColor: scanSuccess ? '#10B981' : '#3B82F6',
                  transition: 'width 0.2s linear'
                }} />
              </div>
            </div>
          )}

          {/* OVERLAY: ILLINOIS BIPA DISCLOSURE SHEET / MODAL */}
          {showBipaModal && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(6px)',
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <div style={{
                backgroundColor: '#111827',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '16px',
                maxHeight: '85%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Icons.FileText size={16} className="text-blue-400" />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                      Illinois BIPA Privacy Disclosure
                    </span>
                  </div>
                  <button
                    onClick={() => setShowBipaModal(false)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Icons.X size={14} />
                  </button>
                </div>

                <div style={{
                  overflowY: 'auto',
                  fontSize: '10px',
                  color: '#94A3B8',
                  lineHeight: '1.45',
                  paddingRight: '4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(37, 99, 235, 0.25)',
                    color: '#93C5FD'
                  }}>
                    <strong>Statutory Authority:</strong> 740 ILCS 14/ Biometric Information Privacy Act (Illinois General Assembly).
                  </div>

                  <div>
                    <strong style={{ color: '#E2E8F0' }}>1. Specific Purpose:</strong> Biometric data (facial geometric vectors or fingerprint scans) is collected and stored solely to authenticate identity, prevent fraud, and interface with authorized verification network APIs.
                  </div>

                  <div>
                    <strong style={{ color: '#E2E8F0' }}>2. Storage & Transmission:</strong> Biometrics are encrypted with AES-256 and transmitted exclusively to verification network APIs. Apex Bank never sells, leases, or trades biometric data for commercial profit under any circumstance.
                  </div>

                  <div>
                    <strong style={{ color: '#E2E8F0' }}>3. Retention & Permanent Destruction Schedule:</strong> Pursuant to 740 ILCS 14/15(a), biometric identifiers are permanently destroyed within thirty (30) calendar days after the primary verification purpose is satisfied, or upon formal closure of the banking relationship.
                  </div>

                  <div>
                    <strong style={{ color: '#E2E8F0' }}>4. Written Consent:</strong> By tapping "Accept Consent", you authorize Apex Bank to capture, verify, and transmit biometric data pursuant to this written schedule.
                  </div>
                </div>

                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      setBipaConsentAgreed(true);
                      setShowBipaModal(false);
                      triggerToast("BIPA consent accepted. You can now enable biometrics.");
                    }}
                    style={{
                      flex: 1,
                      backgroundColor: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '9px 0',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Accept BIPA Consent
                  </button>
                  <button
                    onClick={() => setShowBipaModal(false)}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      color: '#94A3B8',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OVERLAY: PASSWORD RESET MODAL */}
          {showResetModal && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(6px)',
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: '#111827',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                    Reset Master Password
                  </span>
                  <button
                    onClick={() => setShowResetModal(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer'
                    }}
                  >
                    <Icons.X size={16} />
                  </button>
                </div>
                <p style={{ fontSize: '10.5px', color: '#94A3B8', margin: 0 }}>
                  A secure 6-digit confirmation code will be dispatched to your registered Illinois mobile number (+1 ••• ••• 4192).
                </p>
                <button
                  onClick={() => {
                    setShowResetModal(false);
                    triggerToast("Verification code dispatched via SMS!");
                  }}
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 0',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Send Verification SMS
                </button>
              </div>
            </div>
          )}

          {/* INTERACTIVE TOAST NOTIFICATION */}
          {toastMessage && (
            <div style={{
              position: 'absolute',
              top: '52px',
              left: '14px',
              right: '14px',
              backgroundColor: '#1E293B',
              border: '1px solid #3B82F6',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              borderRadius: '10px',
              padding: '8px 12px',
              zIndex: 70,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'float-gentle 2s ease infinite'
            }}>
              <Icons.CheckCircle2 size={16} className="text-emerald-400" />
              <span style={{ fontSize: '10.5px', color: '#F8FAFC', fontWeight: 600 }}>
                {toastMessage}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
