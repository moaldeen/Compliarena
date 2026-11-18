# Weapon Chest - Mobile Fantasy RPG Loot Box In-App Purchase UI

A high-fidelity landscape 16:9 fantasy mobile RPG purchase popup for the **Weapon Chest**, built with React and Vite.

## Overview

Designed for Apple App Store and Google Play distribution contexts, this UI simulates a AAA mobile free-to-play fantasy game with glossy gold filigree panels, glowing particle effects, and compliance disclosures.

### Key Features

1. **Fixed 16:9 Mobile Device Frame Simulation**:
   - Rendered strictly inside a landscape mobile device chassis with bezel, camera punch-hole, and speaker notches.
   - Entire interface is calibrated to fit cleanly inside the screen with zero clipping, zero overflow, and no cut-off content.

2. **The "Weapon Chest" Single Loot Box Experience**:
   - Single chest priced at **950 Gems**.
   - Large glowing 3D-styled animated chest with particle aura and mystical rune lock.
   - Prominent **"BUY NOW"** button with gold shimmer animation and Gem cost display.
   - Guarantees 1 random reward resolved directly into the player's remote inventory.

3. **Four Possible Outcome Item Cards**:
   - **Common (60.0%)**: *Common Weapon Skin* (Ironplate Greatsword)
   - **Rare (28.0%)**: *Rare Flame Sword* (Ignis Pyreblade)
   - **Very Rare (10.0%)**: *Very Rare Twin Blades Set* (Voidfang Twin Blades)
   - **Extremely Rare (2.0%)**: *Extremely Rare New Hero Character* (Valeria, Dawn Sovereign)
   - Each card displays custom vector art, rarity ribbons, color themes, drop rate badges, and tap-to-inspect stats/lore.

4. **Complete Interactive Functionality**:
   - **Summoning Ceremony**: Tapping "BUY NOW" deducts 950 gems and launches a multi-stage chest-opening ceremony (violent rattle -> light eruption -> item reveal modal with stats and Equip/Claim/Summon Again options).
   - **App Store / Google Play Compliance**: Dedicated Drop Rates modal (`[ℹ]`) detailing exact server-side RNG weights and remote inventory persistence.
   - **Item Inspector**: Tap any of the 4 cards to open a detailed modal showing ATK, Durability, Crit Rate, and unique passive skill lore.
   - **Gems Treasury**: Player can tap `+` on the Gems counter to simulate IAP top-up packs ($4.99, $9.99, $19.99).
   - **Test Harness**: Bottom toolbar allows instant toggling between Natural Weighted RNG and forced outcomes for each tier (Common, Rare, Very Rare, Extremely Rare).

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev
```

Then open the local URL (typically `http://localhost:3000` or `http://localhost:5173`) in your web browser.
