import React from 'react';
import { CloseIcon, CommonSkinSVG, RareFlameSwordSVG, VeryRareTwinBladesSVG, ExtremelyRareHeroSVG } from './GameIcons';

export const ItemDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  const renderArtwork = () => {
    switch (item.id) {
      case 'outcome-common':
        return <CommonSkinSVG />;
      case 'outcome-rare':
        return <RareFlameSwordSVG />;
      case 'outcome-very-rare':
        return <VeryRareTwinBladesSVG />;
      case 'outcome-extremely-rare':
        return <ExtremelyRareHeroSVG />;
      default:
        return <CommonSkinSVG />;
    }
  };

  return (
    <div className="submodal-backdrop" onClick={onClose}>
      <div className="detail-modal-panel" onClick={(e) => e.stopPropagation()} style={{ borderColor: item.borderColor }}>
        {/* Header */}
        <div className="detail-modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                background: item.borderColor, 
                color: '#fff', 
                fontSize: '9px', 
                fontWeight: '800', 
                padding: '2px 8px', 
                borderRadius: '4px' 
              }}>
                {item.rarity}
              </span>
              <span style={{ color: item.color, fontSize: '11px', fontWeight: '700' }}>
                {item.powerRating}
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-fantasy-title)', color: '#fff', fontSize: '16px', marginTop: '4px' }}>
              {item.title}
            </h3>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>{item.name}</span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
            <CloseIcon size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="detail-modal-content">
          {/* Art frame */}
          <div className="detail-art-box" style={{ background: item.bgGradient, borderColor: item.borderColor }}>
            <div style={{ width: '90px', height: '90px' }}>
              {renderArtwork()}
            </div>
          </div>

          {/* Stats & Lore */}
          <div className="detail-info-block">
            {/* Stat Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.stats.map((st, i) => (
                <div key={i} style={{ 
                  background: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.15)', 
                  padding: '2px 8px', 
                  borderRadius: '6px', 
                  fontSize: '9.5px',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ color: '#94a3b8' }}>{st.label}:</span>
                  <span style={{ color: item.color, fontWeight: '700' }}>{st.val}</span>
                </div>
              ))}
            </div>

            {/* Passive Skill */}
            <div style={{ background: 'rgba(8, 47, 73, 0.4)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '6px 8px', borderRadius: '6px', fontSize: '9px' }}>
              <span style={{ color: '#38bdf8', fontWeight: '700' }}>Special Effect: </span>
              <span style={{ color: '#e2e8f0' }}>{item.passive}</span>
            </div>

            {/* Lore */}
            <p className="detail-lore">
              "{item.lore}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' }}>
          <span style={{ fontSize: '9px', color: '#94a3b8' }}>
            Base Drop Chance: <strong style={{ color: item.color }}>{item.dropRate}%</strong>
          </span>
          <button className="btn-secondary-fantasy" onClick={onClose} style={{ padding: '4px 14px', fontSize: '10px' }}>
            CLOSE PREVIEW
          </button>
        </div>
      </div>
    </div>
  );
};
