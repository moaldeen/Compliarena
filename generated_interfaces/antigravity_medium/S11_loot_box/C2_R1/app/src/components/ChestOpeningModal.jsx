import React, { useState, useEffect } from 'react';
import { GlowingChestSVG, CommonSkinSVG, RareFlameSwordSVG, VeryRareTwinBladesSVG, ExtremelyRareHeroSVG, GemIcon } from './GameIcons';

export const ChestOpeningModal = ({ wonItem, onClaim, onSummonAgain, canSummonAgain, cost }) => {
  const [stage, setStage] = useState('shaking'); // 'shaking' | 'revealed'

  useEffect(() => {
    // 1.2s of exciting chest shaking & magic buildup, then reveal
    const timer = setTimeout(() => {
      setStage('revealed');
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const renderArtwork = () => {
    switch (wonItem.id) {
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

  const isExtremelyRare = wonItem.rarity === 'EXTREMELY RARE';

  return (
    <div className="submodal-backdrop">
      <div 
        className="reveal-modal-panel" 
        style={{ 
          borderColor: isExtremelyRare ? '#f59e0b' : wonItem.borderColor,
          boxShadow: isExtremelyRare ? '0 0 50px rgba(251, 191, 36, 0.8)' : `0 0 35px ${wonItem.glowColor}`
        }}
      >
        <div className="reveal-burst-rays"></div>

        {stage === 'shaking' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '240px', gap: '12px' }}>
            <h3 style={{ fontFamily: 'var(--font-fantasy-title)', color: '#fbbf24', fontSize: '16px', letterSpacing: '2px', textShadow: '0 0 10px #fbbf24' }}>
              COMMUNING WITH CELESTIAL FORGE...
            </h3>
            <div style={{ width: '180px', height: '140px' }}>
              <GlowingChestSVG isShaking={true} isOpen={false} />
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
              Server RNG resolving remote reward packet...
            </span>
          </div>
        ) : (
          <>
            {/* Reveal Banner */}
            <div className="reveal-banner-tag" style={{ color: wonItem.color }}>
              {isExtremelyRare ? '★ MYTHIC SUMMON COMPLETE ★' : 'REWARD RESOLVED & ACQUIRED!'}
            </div>

            {/* Rarity Pill */}
            <div className="reveal-rarity-pill" style={{ background: wonItem.borderColor }}>
              {wonItem.rarity} • {wonItem.tag}
            </div>

            {/* Graphic with glowing frame */}
            <div className="reveal-item-graphic">
              {renderArtwork()}
            </div>

            {/* Won Item Details */}
            <div className="reveal-item-name" style={{ color: isExtremelyRare ? '#fef08a' : '#fff' }}>
              {wonItem.title}
            </div>
            <div style={{ fontSize: '11px', color: wonItem.color, fontWeight: '700', marginBottom: '4px' }}>
              {wonItem.name}
            </div>

            <p className="reveal-item-desc">
              {wonItem.passive}
            </p>

            {/* Stats */}
            <div className="reveal-stats-row">
              {wonItem.stats.map((st, i) => (
                <div key={i} className="reveal-stat-badge">
                  <span>{st.label}:</span>
                  <strong>{st.val}</strong>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="reveal-actions-row">
              <button 
                className="btn-primary-fantasy" 
                onClick={onClaim}
              >
                {isExtremelyRare ? 'AWAKEN & EQUIP' : 'CLAIM TO INVENTORY'}
              </button>

              <button 
                className="btn-secondary-fantasy"
                onClick={onSummonAgain}
                disabled={!canSummonAgain}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: canSummonAgain ? 1 : 0.5 }}
                title={canSummonAgain ? 'Open another chest for 950 Gems' : 'Insufficient Gems'}
              >
                <span>OPEN AGAIN</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#38bdf8' }}>
                  ({cost} <GemIcon size={12} />)
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
