import React from 'react';
import { GemIcon, GoldIcon, EnergyIcon, CloseIcon } from './GameIcons';

export const HeaderBar = ({ player, onOpenAddGems, showClose = false, onClose = () => {} }) => {
  return (
    <header className="game-top-bar">
      {/* Player Profile */}
      <div className="player-info-pill">
        <div className="player-avatar">
          <span>K</span>
        </div>
        <div className="player-name-lvl">
          <span className="player-name">{player.name}</span>
          <span className="player-lvl">Lv.{player.level} • VIP {player.vipLevel}</span>
        </div>
      </div>

      {/* Currencies */}
      <div className="currencies-group">
        {/* Energy */}
        <div className="currency-pill" title="Stamina / Energy">
          <EnergyIcon size={14} />
          <span>{player.energy.current}/{player.energy.max}</span>
        </div>

        {/* Gold */}
        <div className="currency-pill" title="In-Game Gold">
          <GoldIcon size={14} />
          <span>{player.gold.toLocaleString()}</span>
        </div>

        {/* Gems */}
        <div className="currency-pill gems-pill" title="Premium Gems">
          <GemIcon size={15} />
          <span>{player.gems.toLocaleString()}</span>
          <button 
            className="currency-plus-btn" 
            onClick={onOpenAddGems} 
            title="Top up Gems"
            aria-label="Add Gems"
          >
            +
          </button>
        </div>

        {/* Quick Close button on top bar if popup is active */}
        {showClose && (
          <button 
            className="modal-close-btn" 
            onClick={onClose} 
            title="Close Weapon Chest"
            aria-label="Close"
            style={{ width: '22px', height: '22px', marginLeft: '4px' }}
          >
            <CloseIcon size={14} />
          </button>
        )}
      </div>
    </header>
  );
};
