import React from 'react';
import { XIcon, ShieldCheckIcon, CheckIcon } from './Icons';

export const PartnerModal = ({ isOpen, onClose, partners, onTogglePartner, onToggleAllPartners }) => {
  if (!isOpen) return null;

  const allActive = Object.values(partners).every(v => v);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        
        <div className="sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheckIcon size={16} className="text-primary" />
            <h3 className="sheet-title">3rd-Party Measurement Partners</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close modal">
            <XIcon size={14} />
          </button>
        </div>

        <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Signals are shared only with audited partners to verify purchases and deliver catalog deals. Manage each partner below:
        </p>

        {/* Master quick toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '6px 8px', background: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-main)' }}>
            All Verified Partners
          </span>
          <button
            onClick={() => onToggleAllPartners(!allActive)}
            style={{
              fontSize: '10.5px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: allActive ? 'var(--primary-light)' : 'var(--border-color)',
              color: allActive ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            {allActive ? 'Disable All' : 'Enable All'}
          </button>
        </div>

        <div className="sheet-body">
          {/* Partner 1: Google Advertising & Measurement */}
          <div className="partner-row">
            <div className="partner-info-left">
              <span className="partner-name">Google Ads & Firebase</span>
              <span className="partner-detail">Measures purchase completion & prevents duplicate ads</span>
              <span className="partner-scope-badge">Android Ad ID • Purchase Intent</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={partners.google}
                onChange={() => onTogglePartner('google')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Partner 2: Adjust Attribution SDK */}
          <div className="partner-row">
            <div className="partner-info-left">
              <span className="partner-name">Adjust Mobile Attribution</span>
              <span className="partner-detail">Attribution tracking for promotional campaigns & installs</span>
              <span className="partner-scope-badge">Local Storage • App Launch Signals</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={partners.adjust}
                onChange={() => onTogglePartner('adjust')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Partner 3: Meta Audience & Measurement */}
          <div className="partner-row">
            <div className="partner-info-left">
              <span className="partner-name">Meta Commerce Partner</span>
              <span className="partner-detail">Retargets abandoned carts with exclusive discounts</span>
              <span className="partner-scope-badge">Items Viewed • Retargeting Token</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={partners.meta}
                onChange={() => onTogglePartner('meta')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Partner 4: Criteo Retail Media */}
          <div className="partner-row">
            <div className="partner-info-left">
              <span className="partner-name">Criteo Brand Deals</span>
              <span className="partner-detail">Personalized sponsored brand coupons and retail offers</span>
              <span className="partner-scope-badge">Shopping Activity • Category Affinity</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={partners.criteo}
                onChange={() => onTogglePartner('criteo')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div style={{ marginTop: '12px' }}>
          <button
            className="btn-primary-continue"
            onClick={onClose}
            style={{ padding: '8px 12px', fontSize: '12px' }}
          >
            <CheckIcon size={14} />
            Save Partner Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
