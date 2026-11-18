import React, { useState } from 'react';
import { CHEST_DATA, INITIAL_PLAYER } from './data/chestData';
import { DeviceFrame } from './components/DeviceFrame';
import { HeaderBar } from './components/HeaderBar';
import { WeaponChestPopup } from './components/WeaponChestPopup';
import { ChestOpeningModal } from './components/ChestOpeningModal';
import { RatesModal } from './components/RatesModal';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AddGemsModal } from './components/AddGemsModal';
import { GlowingChestSVG, GemIcon } from './components/GameIcons';

export function App() {
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [wonReward, setWonReward] = useState(null);
  const [inspectedItem, setInspectedItem] = useState(null);
  const [isRatesOpen, setIsRatesOpen] = useState(false);
  const [isAddGemsOpen, setIsAddGemsOpen] = useState(false);
  const [forcedOutcomeId, setForcedOutcomeId] = useState(null);
  const [inventory, setInventory] = useState([]);

  // Server-side weighted RNG reward simulation
  const resolveRewardOutcome = (overrideId = null) => {
    const targetId = overrideId || forcedOutcomeId;
    if (targetId) {
      return CHEST_DATA.outcomes.find((item) => item.id === targetId);
    }

    // Weighted roll based on specified rates:
    // Extremely Rare: 2.0%
    // Very Rare: 10.0%
    // Rare: 28.0%
    // Common: 60.0%
    const rand = Math.random() * 100;
    if (rand < 2.0) {
      return CHEST_DATA.outcomes.find((i) => i.id === 'outcome-extremely-rare');
    } else if (rand < 12.0) {
      return CHEST_DATA.outcomes.find((i) => i.id === 'outcome-very-rare');
    } else if (rand < 40.0) {
      return CHEST_DATA.outcomes.find((i) => i.id === 'outcome-rare');
    } else {
      return CHEST_DATA.outcomes.find((i) => i.id === 'outcome-common');
    }
  };

  // Handle "BUY NOW" trigger
  const handleBuyChest = () => {
    if (player.gems < CHEST_DATA.cost) {
      setIsAddGemsOpen(true);
      return;
    }

    setIsPurchasing(true);

    // Deduct 950 gems
    setPlayer((prev) => ({
      ...prev,
      gems: prev.gems - CHEST_DATA.cost
    }));

    // Server-side resolution simulation delay
    setTimeout(() => {
      const reward = resolveRewardOutcome();
      setWonReward(reward);
      setInventory((prev) => [reward, ...prev]);
      setIsPurchasing(false);
    }, 600);
  };

  const handleClaimWonReward = () => {
    setWonReward(null);
  };

  const handleSummonAgain = () => {
    setWonReward(null);
    handleBuyChest();
  };

  const handleAddGems = (amount) => {
    setPlayer((prev) => ({
      ...prev,
      gems: prev.gems + amount
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* 16:9 Fixed Mobile Device Frame Simulation */}
      <DeviceFrame>
        {/* Background Fantasy Ambience */}
        <div className="gameplay-background"></div>

        {/* Ambient Floating Embers */}
        <div className="floating-ember" style={{ top: '65%', left: '20%', width: '4px', height: '4px', background: '#38bdf8' }}></div>
        <div className="floating-ember" style={{ top: '40%', left: '75%', width: '5px', height: '5px', background: '#fbbf24', animationDelay: '1.5s' }}></div>
        <div className="floating-ember" style={{ top: '25%', left: '45%', width: '3px', height: '3px', background: '#c084fc', animationDelay: '3s' }}></div>

        {/* Top Game Navigation / Currency Bar */}
        <HeaderBar 
          player={player} 
          onOpenAddGems={() => setIsAddGemsOpen(true)}
          showClose={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />

        {/* Main View Area inside Phone Screen */}
        {isPopupOpen ? (
          <WeaponChestPopup 
            chestData={CHEST_DATA}
            playerGems={player.gems}
            onBuy={handleBuyChest}
            onInspectItem={(item) => setInspectedItem(item)}
            onOpenRates={() => setIsRatesOpen(true)}
            onClose={() => setIsPopupOpen(false)}
            isPurchasing={isPurchasing}
          />
        ) : (
          /* Hub View when Weapon Chest modal is dismissed */
          <div className="hub-view">
            <div style={{ textAlign: 'center', maxWidth: '380px' }}>
              <h2 style={{ fontFamily: 'var(--font-fantasy-title)', color: '#fff', fontSize: '18px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                SANCTUM CITADEL HUB
              </h2>
              <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                Inventory holds {inventory.length} item{inventory.length === 1 ? '' : 's'}. The Weapon Chest summon portal is active.
              </p>
            </div>

            <button 
              className="hub-reopen-btn"
              onClick={() => setIsPopupOpen(true)}
            >
              <div style={{ width: '28px', height: '24px' }}>
                <GlowingChestSVG isOpen={false} />
              </div>
              <span>OPEN WEAPON CHEST (950 GEMS)</span>
            </button>
          </div>
        )}

        {/* Interactive Overlays */}
        {wonReward && (
          <ChestOpeningModal 
            wonItem={wonReward}
            onClaim={handleClaimWonReward}
            onSummonAgain={handleSummonAgain}
            canSummonAgain={player.gems >= CHEST_DATA.cost}
            cost={CHEST_DATA.cost}
          />
        )}

        {inspectedItem && (
          <ItemDetailModal 
            item={inspectedItem}
            onClose={() => setInspectedItem(null)}
          />
        )}

        {isRatesOpen && (
          <RatesModal 
            chestData={CHEST_DATA}
            onClose={() => setIsRatesOpen(false)}
          />
        )}

        {isAddGemsOpen && (
          <AddGemsModal 
            onClose={() => setIsAddGemsOpen(false)}
            onAddGems={handleAddGems}
          />
        )}
      </DeviceFrame>

      {/* Reviewer / Evaluator Testing Controls Strip */}
      <div className="dev-controls-strip">
        <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700' }}>
          TEST HARNESS:
        </span>

        <button 
          className={`dev-btn ${forcedOutcomeId === null ? 'accent' : ''}`}
          onClick={() => setForcedOutcomeId(null)}
        >
          🎲 Natural Weighted RNG
        </button>

        <button 
          className={`dev-btn ${forcedOutcomeId === 'outcome-common' ? 'accent' : ''}`}
          onClick={() => setForcedOutcomeId('outcome-common')}
        >
          Common Skin (60%)
        </button>

        <button 
          className={`dev-btn ${forcedOutcomeId === 'outcome-rare' ? 'accent' : ''}`}
          onClick={() => setForcedOutcomeId('outcome-rare')}
        >
          Rare Flame Sword (28%)
        </button>

        <button 
          className={`dev-btn ${forcedOutcomeId === 'outcome-very-rare' ? 'accent' : ''}`}
          onClick={() => setForcedOutcomeId('outcome-very-rare')}
        >
          Very Rare Twin Blades (10%)
        </button>

        <button 
          className={`dev-btn ${forcedOutcomeId === 'outcome-extremely-rare' ? 'accent' : ''}`}
          onClick={() => setForcedOutcomeId('outcome-extremely-rare')}
        >
          ★ Extremely Rare Hero (2%)
        </button>

        <button 
          className="dev-btn"
          onClick={() => handleAddGems(2000)}
          title="Add 2,000 Gems for continuous testing"
        >
          +2,000 Gems <GemIcon size={12} />
        </button>

        {!isPopupOpen && (
          <button 
            className="dev-btn accent"
            onClick={() => setIsPopupOpen(true)}
          >
            Reopen Popup
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
