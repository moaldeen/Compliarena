import React, { useState } from 'react';
import './styles/app.css';
import { PhoneFrame } from './components/PhoneFrame';
import { PersonalizationScreen } from './components/PersonalizationScreen';
import { SuccessState } from './components/SuccessState';
import { SparklesIcon, ShieldCheckIcon, ShoppingBagIcon } from './components/Icons';

export default function App() {
  // Mobile app preferences state
  const [preferences, setPreferences] = useState({
    deals: true,
    analytics: true,
    partners: true
  });

  // 3rd-party partner measurement opt-ins
  const [partners, setPartners] = useState({
    google: true,
    adjust: true,
    meta: true,
    criteo: true
  });

  // Screen flow transition state (post-onboarding -> home store)
  const [isHomeEntered, setIsHomeEntered] = useState(false);

  // Frame simulation tools
  const [theme, setTheme] = useState('light');
  const [bezelStyle, setBezelStyle] = useState('default');
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleApplyPreset = (deals, analytics, partnersVal) => {
    setPreferences({ deals, analytics, partners: partnersVal });
    setPartners({
      google: partnersVal,
      adjust: partnersVal,
      meta: partnersVal,
      criteo: partnersVal
    });
  };

  return (
    <div className="workbench">
      {/* Workbench Header */}
      <header className="workbench-header">
        <div className="workbench-badge">
          <span className="dot" />
          <span>First-Time User Onboarding • Step 4 of 4</span>
        </div>
        <h1 className="workbench-title">
          Android E-Commerce Mobile Personalization Screen
        </h1>
        <p className="workbench-subtitle">
          Shown after Welcome, Language & Preferences, before entering the main shopping home page.
        </p>
      </header>

      {/* Interactive Testing Toolbar */}
      <div className="workbench-toolbar">
        {/* Preset Switchers */}
        <div className="toolbar-group">
          <span className="toolbar-label">Quick Test:</span>
          <button
            className={`toolbar-btn ${preferences.deals && preferences.analytics && preferences.partners ? 'active' : ''}`}
            onClick={() => handleApplyPreset(true, true, true)}
          >
            Recommended
          </button>
          <button
            className={`toolbar-btn ${preferences.deals && preferences.analytics && !preferences.partners ? 'active' : ''}`}
            onClick={() => handleApplyPreset(true, true, false)}
          >
            Balanced
          </button>
          <button
            className={`toolbar-btn ${!preferences.deals && !preferences.analytics && !preferences.partners ? 'active' : ''}`}
            onClick={() => handleApplyPreset(false, false, false)}
          >
            Essential Only
          </button>
        </div>

        {/* Theme inside phone */}
        <div className="toolbar-group">
          <span className="toolbar-label">App Theme:</span>
          <button
            className={`toolbar-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            ☀️ Light
          </button>
          <button
            className={`toolbar-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            🌙 Dark
          </button>
        </div>

        {/* Bezel Style */}
        <div className="toolbar-group">
          <span className="toolbar-label">Device Finish:</span>
          <button
            className={`toolbar-btn ${bezelStyle === 'default' ? 'active' : ''}`}
            onClick={() => setBezelStyle('default')}
          >
            Midnight
          </button>
          <button
            className={`toolbar-btn ${bezelStyle === 'titanium' ? 'active' : ''}`}
            onClick={() => setBezelStyle('titanium')}
          >
            Titanium
          </button>
          <button
            className={`toolbar-btn ${bezelStyle === 'purple' ? 'active' : ''}`}
            onClick={() => setBezelStyle('purple')}
          >
            Violet
          </button>
        </div>

        {/* Zoom Fit */}
        <div className="toolbar-group">
          <span className="toolbar-label">Scale:</span>
          <button
            className={`toolbar-btn ${zoomLevel === 1 ? 'active' : ''}`}
            onClick={() => setZoomLevel(1)}
          >
            100%
          </button>
          <button
            className={`toolbar-btn ${zoomLevel === 0.92 ? 'active' : ''}`}
            onClick={() => setZoomLevel(0.92)}
          >
            92%
          </button>
          <button
            className={`toolbar-btn ${zoomLevel === 0.85 ? 'active' : ''}`}
            onClick={() => setZoomLevel(0.85)}
          >
            85%
          </button>
        </div>

        {/* State reset */}
        {isHomeEntered && (
          <button
            className="toolbar-btn"
            style={{ background: '#4f46e5', color: '#fff' }}
            onClick={() => setIsHomeEntered(false)}
          >
            ↺ Back to Setup Screen
          </button>
        )}
      </div>

      {/* Mobile Device Frame Simulation */}
      <div
        className="phone-viewport-container"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'top center'
        }}
      >
        <PhoneFrame bezelStyle={bezelStyle} theme={theme}>
          {!isHomeEntered ? (
            <PersonalizationScreen
              preferences={preferences}
              setPreferences={setPreferences}
              partners={partners}
              setPartners={setPartners}
              onCompleteSetup={() => setIsHomeEntered(true)}
            />
          ) : (
            <SuccessState
              preferences={preferences}
              partners={partners}
              onResetFlow={() => setIsHomeEntered(false)}
            />
          )}
        </PhoneFrame>
      </div>

      {/* Feature Transparency & Engineering Notes Footer */}
      <footer className="workbench-footer">
        <div className="feature-pill">
          <ShieldCheckIcon size={14} />
          <span>Local Storage & Ad ID Controls</span>
        </div>
        <div className="feature-pill">
          <SparklesIcon size={14} />
          <span>Zero Overflow / Strict Frame Sizing</span>
        </div>
        <div className="feature-pill">
          <ShoppingBagIcon size={14} />
          <span>4 Audited Measurement Partners</span>
        </div>
      </footer>
    </div>
  );
}
