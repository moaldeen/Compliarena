import React from 'react';
import { ShoppingBagIcon, SparklesIcon, CheckIcon, ArrowRightIcon } from './Icons';

export const SuccessState = ({ preferences, partners, onResetFlow }) => {
  const activeCount = Object.values(preferences).filter(Boolean).length;
  const activePartnerCount = Object.values(partners).filter(Boolean).length;

  return (
    <div className="home-preview-screen">
      <div>
        <div className="home-preview-top">
          <div className="app-brand-logo">
            <ShoppingBagIcon size={18} />
            <span>RetailPulse</span>
          </div>
          <span style={{ fontSize: '10px', background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '9999px', fontWeight: 700 }}>
            Home Feed
          </span>
        </div>

        <div className="home-welcome-card">
          <span className="welcome-chip">Welcome Explorer</span>
          <h2 className="welcome-heading">Your Tailored Shop is Ready!</h2>
          <p className="welcome-sub">
            {activeCount === 3
              ? 'Full personalization enabled: deals, fast sync & exclusive partner rewards.'
              : activeCount === 0
              ? 'Basic catalog active. Standard recommendations without tracking signals.'
              : `Custom experience active: ${activeCount} preference features configured.`}
          </p>
        </div>

        <div className="active-signals-card">
          <div className="active-signals-title">
            <span>Configured Privacy & Signals</span>
            <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 600 }}>
              {activeCount}/3 Active
            </span>
          </div>

          <div className="signal-status-list">
            <div className="signal-status-item">
              <span style={{ color: 'var(--text-muted)' }}>Personalized Deals & History:</span>
              <span style={{ fontWeight: 700, color: preferences.deals ? 'var(--success)' : 'var(--text-subtle)' }}>
                {preferences.deals ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="signal-status-item">
              <span style={{ color: 'var(--text-muted)' }}>Browsing & App Analytics:</span>
              <span style={{ fontWeight: 700, color: preferences.analytics ? 'var(--success)' : 'var(--text-subtle)' }}>
                {preferences.analytics ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            <div className="signal-status-item">
              <span style={{ color: 'var(--text-muted)' }}>Partner Ad Signals ({activePartnerCount}/4):</span>
              <span style={{ fontWeight: 700, color: preferences.partners ? 'var(--success)' : 'var(--text-subtle)' }}>
                {preferences.partners ? `${activePartnerCount} Partners On` : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
          {preferences.deals ? 'Curated Picks For You' : 'Trending Products (Standard)'}
        </div>

        <div className="mock-feed-grid">
          <div className="mock-product-card">
            <div className="mock-product-img">🎧</div>
            <span className="mock-product-title">Noise-Cancelling Headphones</span>
            <span className="mock-product-price">
              {preferences.deals ? '$129.99 (Save 20%)' : '$159.99'}
            </span>
          </div>

          <div className="mock-product-card">
            <div className="mock-product-img">👟</div>
            <span className="mock-product-title">Ultra Cushion Runners</span>
            <span className="mock-product-price">
              {preferences.deals ? '$89.50 (Flash Deal)' : '$110.00'}
            </span>
          </div>
        </div>
      </div>

      <div>
        <button className="btn-restart-flow" onClick={onResetFlow}>
          <span>← Back to Personalization Screen</span>
        </button>
      </div>
    </div>
  );
};
