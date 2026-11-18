import React from 'react';
import { CloseIcon } from './GameIcons';

export const RatesModal = ({ chestData, onClose }) => {
  return (
    <div className="submodal-backdrop" onClick={onClose}>
      <div className="rates-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(245, 158, 11, 0.4)', paddingBottom: '8px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-fantasy-title)', color: '#fbbf24', fontSize: '15px', letterSpacing: '1px' }}>
              SUMMON PROBABILITIES & RATES
            </h3>
            <span style={{ fontSize: '9px', color: '#94a3b8' }}>
              Apple App Store & Google Play Compliance Disclosure
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            <CloseIcon size={14} />
          </button>
        </div>

        {/* Rates Table */}
        <table className="rates-table">
          <thead>
            <tr>
              <th>Rarity Tier</th>
              <th>Guaranteed Outcome</th>
              <th>Probability</th>
            </tr>
          </thead>
          <tbody>
            {chestData.outcomes.map((item) => (
              <tr key={item.id}>
                <td>
                  <span style={{ 
                    color: item.color, 
                    fontWeight: '800', 
                    fontSize: '10px',
                    letterSpacing: '0.5px' 
                  }}>
                    {item.rarity}
                  </span>
                </td>
                <td style={{ color: '#e2e8f0', fontWeight: '600' }}>
                  {item.title} ({item.name})
                </td>
                <td style={{ color: '#fbbf24', fontWeight: '800' }}>
                  {item.dropRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Server-Side Resolution Disclosure */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '8px 10px', fontSize: '9.5px', color: '#94a3b8', lineHeight: '1.4' }}>
          <p style={{ marginBottom: '4px' }}>
            <strong style={{ color: '#38bdf8' }}>Server-Side RNG Resolution:</strong> Upon tapping <strong style={{ color: '#fff' }}>BUY NOW</strong>, purchase confirmation is verified and dispatched to the server reward engine. The outcome is generated server-side using secure cryptographic random weights and persisted to your remote player profile inventory.
          </p>
          <p>
            <strong style={{ color: '#38bdf8' }}>Duplicate Protection:</strong> Unlocked Hero Characters grant Awakening Shards if already owned.
          </p>
        </div>

        {/* Close Button */}
        <div style={{ marginTop: '12px', textAlign: 'right' }}>
          <button className="btn-primary-fantasy" onClick={onClose} style={{ padding: '6px 16px', fontSize: '11px' }}>
            CONFIRM & UNDERSTOOD
          </button>
        </div>
      </div>
    </div>
  );
};
