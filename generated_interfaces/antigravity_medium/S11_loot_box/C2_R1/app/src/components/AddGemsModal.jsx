import React from 'react';
import { CloseIcon, GemIcon } from './GameIcons';

export const AddGemsModal = ({ onClose, onAddGems }) => {
  const gemPacks = [
    { id: 'pack-small', gems: 500, bonus: 0, price: '$4.99', popular: false },
    { id: 'pack-medium', gems: 1200, bonus: 200, price: '$9.99', popular: true, tag: 'BEST VALUE' },
    { id: 'pack-large', gems: 2500, bonus: 600, price: '$19.99', popular: false, tag: '+25% BONUS' }
  ];

  return (
    <div className="submodal-backdrop" onClick={onClose}>
      <div className="detail-modal-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        {/* Header */}
        <div className="detail-modal-header">
          <div>
            <h3 style={{ fontFamily: 'var(--font-fantasy-title)', color: '#38bdf8', fontSize: '15px' }}>
              SANCTUM GEM TREASURY
            </h3>
            <span style={{ fontSize: '9.5px', color: '#94a3b8' }}>
              Simulated App Store / Google Play In-App Billing
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close treasury">
            <CloseIcon size={14} />
          </button>
        </div>

        {/* Packs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', margin: '10px 0' }}>
          {gemPacks.map((pack) => (
            <div 
              key={pack.id} 
              style={{
                background: pack.popular ? 'linear-gradient(180deg, #0c4a6e 0%, #082f49 100%)' : 'rgba(15, 23, 42, 0.8)',
                border: pack.popular ? '1.5px solid #38bdf8' : '1px solid #334155',
                borderRadius: '8px',
                padding: '8px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '4px',
                position: 'relative'
              }}
            >
              {pack.tag && (
                <div style={{ 
                  position: 'absolute', 
                  top: '-7px', 
                  fontSize: '7.5px', 
                  fontWeight: '800', 
                  background: '#fbbf24', 
                  color: '#1c1917', 
                  padding: '1px 5px', 
                  borderRadius: '4px' 
                }}>
                  {pack.tag}
                </div>
              )}

              <div style={{ marginTop: pack.tag ? '4px' : '0' }}>
                <GemIcon size={26} />
              </div>

              <div style={{ fontWeight: '800', fontSize: '14px', color: '#fff' }}>
                +{pack.gems + pack.bonus}
              </div>

              {pack.bonus > 0 && (
                <div style={{ fontSize: '8px', color: '#4ade80', fontWeight: '700' }}>
                  Includes {pack.bonus} Free!
                </div>
              )}

              <button 
                className="btn-primary-fantasy" 
                onClick={() => {
                  onAddGems(pack.gems + pack.bonus);
                  onClose();
                }}
                style={{ width: '100%', padding: '4px 0', fontSize: '10px', marginTop: '4px' }}
              >
                {pack.price}
              </button>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '9px', color: '#94a3b8', textAlign: 'center' }}>
          Tap any pack to instantly credit test gems to your account.
        </div>
      </div>
    </div>
  );
};
