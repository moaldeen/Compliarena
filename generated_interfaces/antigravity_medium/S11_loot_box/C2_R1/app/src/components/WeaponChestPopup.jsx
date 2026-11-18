import React from 'react';
import { GlowingChestSVG, GemIcon, InfoIcon, CloseIcon } from './GameIcons';
import { ItemCard } from './ItemCard';

export const WeaponChestPopup = ({ 
  chestData, 
  playerGems, 
  onBuy, 
  onInspectItem, 
  onOpenRates, 
  onClose,
  isPurchasing 
}) => {
  const canAfford = playerGems >= chestData.cost;

  return (
    <div className="popup-overlay">
      <div className="weapon-chest-modal">
        {/* Ornate Gold Filigree Corners */}
        <div className="modal-corner top-left"></div>
        <div className="modal-corner top-right"></div>
        <div className="modal-corner bottom-left"></div>
        <div className="modal-corner bottom-right"></div>

        {/* Modal Top Header Strip */}
        <div className="modal-header-strip">
          <div className="modal-header-title-box">
            <h2 className="modal-main-title">{chestData.name}</h2>
            <span className="modal-tag-badge">1 RANDOM REWARD</span>
          </div>

          <div className="modal-header-actions">
            <button 
              className="info-help-btn" 
              onClick={onOpenRates} 
              title="View Loot Box Drop Rates & Regulations"
              aria-label="Drop Rates"
            >
              <InfoIcon size={16} />
            </button>
            <button 
              className="modal-close-btn" 
              onClick={onClose} 
              title="Close Weapon Chest"
              aria-label="Close"
            >
              <CloseIcon size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body - 2 Columns Landscape Split */}
        <div className="modal-body-split">
          {/* Left Column: Chest & Purchase Button */}
          <div className="chest-left-column">
            <span className="chest-highlight-badge">
              ANCIENT CELESTIAL FORGE
            </span>

            {/* Large Glowing Animated Chest */}
            <div className="chest-stage-area">
              <GlowingChestSVG isShaking={isPurchasing} />
            </div>

            {/* Outcome Guarantee Text */}
            <div className="chest-guarantee-note">
              Opens 1 Weapon Chest to receive<br />
              <strong>1 Random Reward</strong> from 4 possible outcomes.
            </div>

            {/* Buy Now Section */}
            <div className="buy-action-section">
              <button 
                className="buy-now-button"
                onClick={onBuy}
                disabled={isPurchasing}
                title={canAfford ? `Purchase Weapon Chest for ${chestData.cost} Gems` : "Not enough Gems - Tap to Top Up"}
              >
                <div className="buy-cost-wrap">
                  <span className="buy-cost-num">{chestData.cost}</span>
                  <GemIcon size={17} />
                </div>
                <span className="buy-now-label">
                  {isPurchasing ? "RESOLVING..." : "BUY NOW"}
                </span>
              </button>

              <button 
                className="rates-micro-link"
                onClick={onOpenRates}
              >
                <span>Drop Rates & Probabilities</span>
                <InfoIcon size={11} />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Possible Outcomes Cards */}
          <div className="outcomes-right-column">
            {/* Outcomes Section Header */}
            <div className="outcomes-header-banner">
              <span className="outcomes-banner-title">
                POSSIBLE REWARDS (RECEIVE 1 AT RANDOM)
              </span>
              <span className="outcomes-banner-hint">
                Tap card to inspect stats
              </span>
            </div>

            {/* The 4 Outcomes Display Cards */}
            <div className="outcome-cards-grid">
              {chestData.outcomes.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onClick={onInspectItem} 
                />
              ))}
            </div>

            {/* Mobile RPG Inventory Persistence & Compliance Note */}
            <div className="outcomes-footer-policy">
              <div className="outcomes-policy-text">
                Outcome resolved server-side • <span>Persisted directly to remote hero inventory</span>
              </div>
              <div style={{ fontSize: '8px', color: '#fbbf24', fontWeight: '700' }}>
                4 TIER WEIGHTED RNG
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
