export const CHEST_DATA = {
  id: "weapon-chest-exclusive",
  name: "Weapon Chest",
  subtitle: "ANCIENT SANCTUM ARSENAL",
  cost: 950,
  currency: "Gems",
  badge: "LIMITED TIME SUMMON",
  timer: "Ends in: 02d 14h 28m",
  description: "Summon from the Celestial Forge. Guarantees 1 random reward resolved directly into your remote inventory.",
  outcomes: [
    {
      id: "outcome-common",
      title: "Common Weapon Skin",
      name: "Ironplate Greatsword",
      rarity: "COMMON",
      rarityOrder: 1,
      dropRate: 60.0,
      color: "#94a3b8",
      glowColor: "rgba(148, 163, 184, 0.45)",
      bgGradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      borderColor: "#475569",
      accentColor: "#cbd5e1",
      tag: "COSMETIC SKIN",
      powerRating: "★☆☆☆☆",
      stats: [
        { label: "ATK Boost", val: "+25" },
        { label: "Durability", val: "+15%" }
      ],
      passive: "Polished Edge: Increases cosmetic sheen and weapon stability in combat.",
      lore: "Standard garrison iron tempered with dwarven coal. Reliable and favored by seasoned sellswords across the continent."
    },
    {
      id: "outcome-rare",
      title: "Rare Flame Sword",
      name: "Ignis Pyreblade",
      rarity: "RARE",
      rarityOrder: 2,
      dropRate: 28.0,
      color: "#38bdf8",
      glowColor: "rgba(56, 189, 248, 0.55)",
      bgGradient: "linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)",
      borderColor: "#0284c7",
      accentColor: "#7dd3fc",
      tag: "ELEMENTAL BLADE",
      powerRating: "★★★☆☆",
      stats: [
        { label: "Fire ATK", val: "+160" },
        { label: "Burn Chance", val: "+22%" }
      ],
      passive: "Living Embers: Basic attacks apply Scorched Soul, dealing 45 damage/sec.",
      lore: "Forged in the caldera of Mount Cinder. The blade pulses with eternal magma that never cools."
    },
    {
      id: "outcome-very-rare",
      title: "Very Rare Twin Blades Set",
      name: "Voidfang Twin Blades",
      rarity: "VERY RARE",
      rarityOrder: 3,
      dropRate: 10.0,
      color: "#c084fc",
      glowColor: "rgba(192, 132, 252, 0.65)",
      bgGradient: "linear-gradient(135deg, #581c87 0%, #3b0764 100%)",
      borderColor: "#9333ea",
      accentColor: "#e9d5ff",
      tag: "DUAL WEAPON SET",
      powerRating: "★★★★☆",
      stats: [
        { label: "Physical ATK", val: "+340" },
        { label: "Attack Speed", val: "+28%" },
        { label: "Crit Rate", val: "+18%" }
      ],
      passive: "Phantom Flurry: Every 4th strike tears open a void rift dealing 250% true damage.",
      lore: "Twin spatial shards carved from a dying rift star. Wielded by the silent assassins of the Umbral Court."
    },
    {
      id: "outcome-extremely-rare",
      title: "Extremely Rare New Hero Character",
      name: "Valeria, Dawn Sovereign",
      rarity: "EXTREMELY RARE",
      rarityOrder: 4,
      dropRate: 2.0,
      color: "#fbbf24",
      glowColor: "rgba(251, 191, 36, 0.8)",
      bgGradient: "linear-gradient(135deg, #78350f 0%, #451a03 100%)",
      borderColor: "#f59e0b",
      accentColor: "#fef08a",
      tag: "5★ MYTHIC HERO UNLOCK",
      powerRating: "★★★★★",
      stats: [
        { label: "Base HP", val: "18,400" },
        { label: "Base ATK", val: "1,680" },
        { label: "Aura", val: "+25% Party Holy" }
      ],
      passive: "Solar Retribution: Grants invulnerability for 3s upon taking fatal damage and purges all debuffs.",
      lore: "The legendary Dawnbringer who shattered the Eclipse Tyrant. Reborn to lead mortals against the coming abyss."
    }
  ]
};

export const INITIAL_PLAYER = {
  name: "Lord Kaelen",
  level: 48,
  vipLevel: 6,
  avatar: "hero-avatar",
  energy: { current: 120, max: 120 },
  gold: 485000,
  gems: 2850
};
