import React from 'react';
import { CommonSkinSVG, RareFlameSwordSVG, VeryRareTwinBladesSVG, ExtremelyRareHeroSVG } from './GameIcons';

export const ItemCard = ({ item, onClick }) => {
  const rarityClass = `rarity-${item.rarity.toLowerCase().replace(/\s+/g, '-')}`;

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
    <div 
      className={`item-card ${rarityClass}`} 
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      title={`Click to inspect ${item.title}`}
    >
      {/* Rarity Header Badge */}
      <div className="card-rarity-tag">
        {item.rarity}
      </div>

      {/* Art Frame with Drop Rate % Tag */}
      <div className="card-art-box">
        <span className="card-drop-badge" title="Summon Probability">
          {item.dropRate}%
        </span>
        {renderArtwork()}
      </div>

      {/* Item Title & Subtext */}
      <div className="card-text-block">
        <div className="card-item-title">
          {item.title}
        </div>
        <div className="card-item-subtitle">
          {item.name}
        </div>
        <div className="card-inspect-hint">
          Inspect 🔍
        </div>
      </div>
    </div>
  );
};
