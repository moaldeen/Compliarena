import React from 'react';
import { XIcon, ShieldCheckIcon, CheckIcon } from './Icons';

export const DataInfoSheet = ({ activeInfoKey, onClose, preferences, onTogglePreference }) => {
  if (!activeInfoKey) return null;

  const infoContent = {
    deals: {
      title: 'Personalized Deals & Viewed Items',
      badge: 'Shopping Experience',
      desc: 'We store your recently viewed items and category searches on your Android local storage to curate flash deals and price drop alerts.',
      signals: [
        'Items viewed & time spent browsing',
        'Wishlist and saved search queries',
        'Local storage cache for rapid cart access',
        'Personalized category re-ordering'
      ],
      prefKey: 'deals',
      prefName: 'Personalized Deals'
    },
    analytics: {
      title: 'App Analytics & Signals',
      badge: 'App Performance & Search',
      desc: 'Analytics SDKs measure app responsiveness, button interactions, and checkout funnel friction to deliver a faster retail experience.',
      signals: [
        'Browsing journey and navigation events',
        'App crash reporting & latency metrics',
        'Search query relevance optimization',
        'Device screen & OS capability signals'
      ],
      prefKey: 'analytics',
      prefName: 'Smart Analytics'
    },
    partners: {
      title: 'Advertising & Measurement SDKs',
      badge: 'Third-Party Integration',
      desc: 'Shares advertising signals and pseudonymized advertising identifiers with certified partners to deliver tailored brand discounts and verify offers.',
      signals: [
        'Android Advertising Identifier (GAID)',
        'Purchase intent and conversion attribution',
        'Partner reward verification tokens',
        'Cross-campaign retargeting suppression'
      ],
      prefKey: 'partners',
      prefName: 'Partner Advertising Signals'
    },
    trust: {
      title: 'Android Device Data Practices',
      badge: 'Data Security & Control',
      desc: 'All signals adhere to Android security sandboxing. Data is encrypted locally and you can revoke any permission anytime in App Settings.',
      signals: [
        'Zero selling of personal identifiable info',
        'Encrypted on-device local storage keys',
        'Instantly resettable via Android Ad ID settings',
        'Periodic 30-day cache auto-expiration'
      ],
      prefKey: null,
      prefName: null
    }
  };

  const item = infoContent[activeInfoKey] || infoContent.deals;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div>
            <span style={{ fontSize: '9.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.04em' }}>
              {item.badge}
            </span>
            <h3 className="sheet-title" style={{ marginTop: '2px' }}>{item.title}</h3>
          </div>
          <button className="sheet-close-btn" onClick={onClose} aria-label="Close dialog">
            <XIcon size={14} />
          </button>
        </div>

        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '10px' }}>
          {item.desc}
        </p>

        <div style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
            Signals & Technologies Used:
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {item.signals.map((sig, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', color: 'var(--text-muted)' }}>
                <CheckIcon size={12} className="text-primary" />
                <span>{sig}</span>
              </li>
            ))}
          </ul>
        </div>

        {item.prefKey && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-app)', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-main)' }}>
              Enable {item.prefName}
            </span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={preferences[item.prefKey]}
                onChange={() => onTogglePreference(item.prefKey)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        )}

        <button
          className="btn-primary-continue"
          onClick={onClose}
          style={{ padding: '9px 12px', fontSize: '12px' }}
        >
          Got It
        </button>
      </div>
    </div>
  );
};
