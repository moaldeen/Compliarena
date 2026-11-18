import React, { useState } from 'react';
import {
  SparklesIcon,
  TagIcon,
  ActivityIcon,
  TargetIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  HelpCircleIcon,
  ArrowRightIcon,
  CheckIcon
} from './Icons';
import { PartnerModal } from './PartnerModal';
import { DataInfoSheet } from './DataInfoSheet';

export const PersonalizationScreen = ({
  preferences,
  setPreferences,
  partners,
  setPartners,
  onCompleteSetup
}) => {
  const [activeInfoKey, setActiveInfoKey] = useState(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Determine active preset mode
  const activeCount = Object.values(preferences).filter(Boolean).length;
  const isRecommended = preferences.deals && preferences.analytics && preferences.partners;
  const isBalanced = preferences.deals && preferences.analytics && !preferences.partners;
  const isEssential = !preferences.deals && !preferences.analytics && !preferences.partners;

  const handlePreset = (type) => {
    if (type === 'recommended') {
      setPreferences({ deals: true, analytics: true, partners: true });
      setPartners({ google: true, adjust: true, meta: true, criteo: true });
      showToast('Applied: Recommended (Full Personalization)');
    } else if (type === 'balanced') {
      setPreferences({ deals: true, analytics: true, partners: false });
      showToast('Applied: Balanced (Deals + Analytics, Zero Ad Tracking)');
    } else if (type === 'essential') {
      setPreferences({ deals: false, analytics: false, partners: false });
      setPartners({ google: false, adjust: false, meta: false, criteo: false });
      showToast('Applied: Essential Only (Basic Catalog)');
    }
  };

  const handleToggle = (key) => {
    const updated = !preferences[key];
    setPreferences(prev => ({ ...prev, [key]: updated }));
    showToast(`${key === 'deals' ? 'Personalized Deals' : key === 'analytics' ? 'Shopping Analytics' : 'Partner Ad Signals'} ${updated ? 'Enabled' : 'Disabled'}`);
  };

  const handleTogglePartner = (key) => {
    setPartners(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      const anyActive = Object.values(updated).some(Boolean);
      // Auto-sync parent partner preference toggle
      setPreferences(p => ({ ...p, partners: anyActive }));
      return updated;
    });
  };

  const handleToggleAllPartners = (val) => {
    setPartners({ google: val, adjust: val, meta: val, criteo: val });
    setPreferences(p => ({ ...p, partners: val }));
  };

  const activePartnerCount = Object.values(partners).filter(Boolean).length;

  return (
    <div className="screen-content">
      {/* Toast feedback */}
      {toastMessage && (
        <div className="in-app-toast">
          <CheckIcon size={14} className="toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top App Bar & Flow Stepper */}
      <div className="screen-header-bar">
        <button
          className="icon-btn-ghost"
          onClick={() => showToast('Previous step: Category Preferences (Saved)')}
          title="Back to previous onboarding step"
          aria-label="Back"
        >
          <ChevronLeftIcon size={16} />
        </button>

        <div className="step-indicator-badge">
          <span>Step 4 of 4</span>
          <div className="step-dots">
            <span className="step-dot completed" />
            <span className="step-dot completed" />
            <span className="step-dot completed" />
            <span className="step-dot active" />
          </div>
        </div>

        <button
          className="icon-btn-ghost"
          onClick={() => setActiveInfoKey('trust')}
          title="Privacy & Data Information"
          aria-label="Help"
        >
          <HelpCircleIcon size={16} />
        </button>
      </div>

      {/* Hero Title Section */}
      <div className="hero-section">
        <div className="hero-pill-tag">
          <SparklesIcon size={12} />
          <span>Smart Shopping Setup</span>
        </div>
        <h1 className="hero-title">Tailor Your Experience</h1>
        <p className="hero-subtitle">
          Configure how RetailPulse personalizes deals, search, and retail partners before you enter the store.
        </p>
      </div>

      {/* Preset Quick Switcher Chips */}
      <div className="preset-chips-container">
        <button
          className={`preset-chip ${isRecommended ? 'active' : ''}`}
          onClick={() => handlePreset('recommended')}
        >
          <SparklesIcon size={12} />
          Recommended
        </button>
        <button
          className={`preset-chip ${isBalanced ? 'active' : ''}`}
          onClick={() => handlePreset('balanced')}
        >
          Balanced
        </button>
        <button
          className={`preset-chip ${isEssential ? 'active' : ''}`}
          onClick={() => handlePreset('essential')}
        >
          Essential Only
        </button>
      </div>

      {/* Preference Feature Cards */}
      <div className="cards-list">
        {/* Card 1: Personalized Deals & Recommendations */}
        <div className={`pref-card ${preferences.deals ? 'is-active' : ''}`}>
          <div className="pref-card-left">
            <div className="pref-icon-wrapper">
              <TagIcon size={18} />
            </div>
            <div className="pref-content">
              <div className="pref-title-row">
                <span className="pref-title">Tailored Deals & Re-orders</span>
                <button
                  className="info-help-btn"
                  onClick={() => setActiveInfoKey('deals')}
                  aria-label="Info about Personalized Deals"
                  title="View signals used"
                >
                  ?
                </button>
              </div>
              <p className="pref-desc">
                Caches viewed items & purchase intent on device for discount alerts.
              </p>
              <div className="pref-tags">
                <span className="data-tag">Local Storage</span>
                <span className="data-tag">Items Viewed</span>
              </div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.deals}
              onChange={() => handleToggle('deals')}
              aria-label="Toggle Personalized Deals"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* Card 2: App & Search Analytics */}
        <div className={`pref-card ${preferences.analytics ? 'is-active' : ''}`}>
          <div className="pref-card-left">
            <div className="pref-icon-wrapper">
              <ActivityIcon size={18} />
            </div>
            <div className="pref-content">
              <div className="pref-title-row">
                <span className="pref-title">Smart Shopping Analytics</span>
                <button
                  className="info-help-btn"
                  onClick={() => setActiveInfoKey('analytics')}
                  aria-label="Info about Shopping Analytics"
                  title="View signals used"
                >
                  ?
                </button>
              </div>
              <p className="pref-desc">
                Measures browsing signals to optimize catalog search relevancy.
              </p>
              <div className="pref-tags">
                <span className="data-tag">Interaction Signals</span>
                <span className="data-tag">Cart Sync</span>
              </div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => handleToggle('analytics')}
              aria-label="Toggle Shopping Analytics"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {/* Card 3: Partner Promotions & Ad Measurement */}
        <div className={`pref-card ${preferences.partners ? 'is-active' : ''}`}>
          <div className="pref-card-left">
            <div className="pref-icon-wrapper">
              <TargetIcon size={18} />
            </div>
            <div className="pref-content">
              <div className="pref-title-row">
                <span className="pref-title">Partner Deals & Ad Signals</span>
                <button
                  className="info-help-btn"
                  onClick={() => setActiveInfoKey('partners')}
                  aria-label="Info about Partner Signals"
                  title="View signals used"
                >
                  ?
                </button>
              </div>
              <p className="pref-desc">
                Shares advertising ID with vetted partners for exclusive brand perks.
              </p>
              <div className="pref-tags">
                <span className="data-tag">Android Ad ID</span>
                <span className="data-tag">{activePartnerCount} Partners Active</span>
              </div>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.partners}
              onChange={() => handleToggle('partners')}
              aria-label="Toggle Partner Advertising Signals"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      {/* Trust & 3rd-Party Transparency Strip */}
      <div className="transparency-strip">
        <div className="transparency-left">
          <ShieldCheckIcon size={16} className="shield-icon" />
          <span className="transparency-text">
            Stored locally on your Android device.
          </span>
        </div>
        <button
          className="transparency-link-btn"
          onClick={() => setIsPartnerModalOpen(true)}
          title="Inspect third-party measurement integrations"
        >
          <span>Partners ({activePartnerCount})</span>
          <ChevronRightIcon size={12} />
        </button>
      </div>

      {/* Bottom CTA Actions */}
      <div className="bottom-actions">
        <button
          className="btn-primary-continue"
          onClick={onCompleteSetup}
        >
          <span>
            {activeCount === 3
              ? 'Enter Store (All Personalized)'
              : activeCount === 0
              ? 'Enter Store (Essential Only)'
              : `Enter Store (${activeCount} Preferences Active)`}
          </span>
          <ArrowRightIcon size={15} />
        </button>

        <button
          className="btn-secondary-skip"
          onClick={() => {
            handlePreset('essential');
            setTimeout(onCompleteSetup, 200);
          }}
        >
          Continue with essential only
        </button>

        <p className="bottom-microcopy">
          You can adjust these signals anytime in Account &gt; Privacy Preferences.
        </p>
      </div>

      {/* Interactive Modal Drawers (rendered inside mobile frame viewport) */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        partners={partners}
        onTogglePartner={handleTogglePartner}
        onToggleAllPartners={handleToggleAllPartners}
      />

      <DataInfoSheet
        activeInfoKey={activeInfoKey}
        onClose={() => setActiveInfoKey(null)}
        preferences={preferences}
        onTogglePreference={handleToggle}
      />
    </div>
  );
};
