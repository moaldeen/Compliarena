import React from 'react';

export const GemIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'drop-shadow(0 0 4px rgba(56, 189, 248, 0.7))' }}>
    <path d="M6 3L18 3L22 9L12 22L2 9L6 3Z" fill="url(#gemGrad)" stroke="#38bdf8" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M6 3L12 9M18 3L12 9M2 9H22M12 9V22M6 3L2 9L12 22M18 3L22 9L12 22" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" strokeLinejoin="round" />
    <defs>
      <linearGradient id="gemGrad" x1="2" y1="3" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="0.5" stopColor="#0284c7" />
        <stop offset="1" stopColor="#0369a1" />
      </linearGradient>
    </defs>
  </svg>
);

export const GoldIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.6))' }}>
    <circle cx="12" cy="12" r="9" fill="url(#goldGrad)" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="6.5" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2 1" />
    <path d="M12 7V17M9 9.5H15M9.5 14.5H14.5" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="goldGrad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef08a" />
        <stop offset="0.5" stopColor="#f59e0b" />
        <stop offset="1" stopColor="#b45309" />
      </linearGradient>
    </defs>
  </svg>
);

export const EnergyIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))' }}>
    <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="url(#energyGrad)" stroke="#4ade80" strokeWidth="1.2" strokeLinejoin="round" />
    <defs>
      <linearGradient id="energyGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#86efac" />
        <stop offset="0.6" stopColor="#22c55e" />
        <stop offset="1" stopColor="#15803d" />
      </linearGradient>
    </defs>
  </svg>
);

export const InfoIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="11" x2="12" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="8" r="1.25" fill="currentColor" />
  </svg>
);

export const CloseIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const GlowingChestSVG = ({ isOpen = false, isShaking = false }) => (
  <div className={`chest-container ${isShaking ? 'chest-shaking' : ''} ${isOpen ? 'chest-opened' : ''}`}>
    <div className="chest-radial-glow"></div>
    <div className="chest-light-beams"></div>
    <svg viewBox="0 0 200 170" width="100%" height="100%" className="chest-svg">
      <defs>
        <radialGradient id="chestAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#0284c7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="75%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="chestWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#331406" />
          <stop offset="50%" stopColor="#1e0a02" />
          <stop offset="100%" stopColor="#120501" />
        </linearGradient>
        <linearGradient id="steelTrim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="gemCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </radialGradient>
        <filter id="fantasyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient Floor Shadow */}
      <ellipse cx="100" cy="148" rx="72" ry="16" fill="rgba(0,0,0,0.6)" />
      <ellipse cx="100" cy="148" rx="48" ry="10" fill="rgba(56,189,248,0.25)" filter="url(#fantasyGlow)" />

      {/* Chest Base Lower Body */}
      <path d="M35 85 L165 85 L155 142 C155 146 150 148 145 148 L55 148 C50 148 45 146 45 142 Z" 
            fill="url(#chestWood)" stroke="#0f172a" strokeWidth="2" />

      {/* Lower Corner Iron Brackets */}
      <path d="M35 85 L50 85 L55 148 L45 148 Z" fill="url(#steelTrim)" stroke="#475569" strokeWidth="1" />
      <path d="M165 85 L150 85 L145 148 L155 148 Z" fill="url(#steelTrim)" stroke="#475569" strokeWidth="1" />

      {/* Center Gold Band Vertical */}
      <path d="M90 85 L110 85 L110 148 L90 148 Z" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="1" />

      {/* Ornate Gold Trim on Base */}
      <path d="M35 85 L165 85 L165 92 L35 92 Z" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="1" />
      <path d="M45 142 L155 142 L155 148 L45 148 Z" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="0.8" />

      {/* Rivets on Base */}
      <circle cx="42" cy="98" r="1.8" fill="#fef08a" />
      <circle cx="44" cy="120" r="1.8" fill="#fef08a" />
      <circle cx="46" cy="140" r="1.8" fill="#fef08a" />
      <circle cx="158" cy="98" r="1.8" fill="#fef08a" />
      <circle cx="156" cy="120" r="1.8" fill="#fef08a" />
      <circle cx="154" cy="140" r="1.8" fill="#fef08a" />

      {/* Chest Lid Group (Can be animated/tilted if open) */}
      <g className="chest-lid" style={{ transformOrigin: '100px 75px', transform: isOpen ? 'rotate(-28deg) translateY(-14px)' : 'none', transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        {/* Lid Top Arc */}
        <path d="M28 85 C28 50, 48 34, 100 34 C152 34, 172 50, 172 85 Z" fill="url(#chestWood)" stroke="#0f172a" strokeWidth="2" />
        
        {/* Lid Arch Reinforcements */}
        <path d="M28 85 C28 50, 48 34, 52 34 L44 85 Z" fill="url(#steelTrim)" stroke="#475569" strokeWidth="1" />
        <path d="M172 85 C172 50, 152 34, 148 34 L156 85 Z" fill="url(#steelTrim)" stroke="#475569" strokeWidth="1" />
        <path d="M88 34 C94 34, 106 34, 112 34 L112 85 L88 85 Z" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="1" />
        
        {/* Gold Trim along lid rim */}
        <path d="M26 82 L174 82 L174 88 L26 88 Z" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="1" />
        
        {/* Rivets on Lid */}
        <circle cx="36" cy="65" r="2" fill="#fef08a" />
        <circle cx="48" cy="48" r="2" fill="#fef08a" />
        <circle cx="164" cy="65" r="2" fill="#fef08a" />
        <circle cx="152" cy="48" r="2" fill="#fef08a" />

        {/* Ornate Dragon Crest / Crown on top */}
        <path d="M92 34 L100 24 L108 34 Z" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="1" />
        <circle cx="100" cy="28" r="2.5" fill="#38bdf8" filter="url(#fantasyGlow)" />
      </g>

      {/* Open Beam Light (visible when open) */}
      {isOpen && (
        <path d="M30 85 L0 0 L200 0 L170 85 Z" fill="url(#gemCoreGlow)" opacity="0.45" filter="url(#fantasyGlow)" />
      )}

      {/* Mythical Runic Lock in Center */}
      <g filter="url(#fantasyGlow)">
        <ellipse cx="100" cy="85" rx="17" ry="17" fill="url(#goldFiligree)" stroke="#78350f" strokeWidth="1.5" />
        <ellipse cx="100" cy="85" rx="12" ry="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        {/* Glowing Arcane Crystal in Keyhole */}
        <polygon points="100,77 106,85 100,93 94,85" fill="url(#gemCoreGlow)" />
        <circle cx="100" cy="85" r="3" fill="#ffffff" />
      </g>
    </svg>
  </div>
);

// Item Card Graphics
export const CommonSkinSVG = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="ironBlade" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#f1f5f9" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="bronzeHilt" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>
    {/* Silver Shield Background Badge */}
    <path d="M20 20 L80 20 L75 65 C75 80 50 90 50 90 C50 90 25 80 25 65 Z" fill="rgba(71,85,105,0.25)" stroke="#64748b" strokeWidth="1" />
    {/* Greatsword Diagonal */}
    <g transform="rotate(45 50 50)">
      {/* Blade Tip */}
      <polygon points="50,10 44,22 45,65 55,65 56,22" fill="url(#ironBlade)" stroke="#334155" strokeWidth="1" />
      {/* Fuller Groove */}
      <line x1="50" y1="18" x2="50" y2="60" stroke="#334155" strokeWidth="1.2" />
      {/* Crossguard */}
      <rect x="36" y="65" width="28" height="6" rx="2" fill="url(#bronzeHilt)" stroke="#1e293b" strokeWidth="1" />
      {/* Grip */}
      <rect x="47" y="71" width="6" height="15" fill="#334155" rx="1" />
      {/* Pommel */}
      <circle cx="50" cy="88" r="4.5" fill="url(#bronzeHilt)" stroke="#1e293b" strokeWidth="1" />
    </g>
  </svg>
);

export const RareFlameSwordSVG = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="flameBlade" x1="0" y1="0" x2="0" y2="100">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#f97316" />
        <stop offset="80%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
      <linearGradient id="azureGlow" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="fireAura" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Flame Particles / Aura */}
    <circle cx="50" cy="45" r="32" fill="rgba(249, 115, 22, 0.18)" filter="url(#fireAura)" />
    <path d="M48 12 Q58 22 52 35 Q65 45 56 60 Q40 45 46 30 Z" fill="rgba(251, 191, 36, 0.45)" filter="url(#fireAura)" />
    {/* Flame Curved Blade */}
    <g transform="rotate(35 50 50)">
      {/* Serrated Flame Edge */}
      <path d="M50 8 C53 18 58 28 56 42 C54 52 56 65 54 68 L46 68 C44 55 45 35 48 20 Z" 
            fill="url(#flameBlade)" stroke="#ea580c" strokeWidth="1" filter="url(#fireAura)" />
      {/* Inner Magma Core */}
      <path d="M50 14 Q52 30 50 62" stroke="#fffbeb" strokeWidth="2" strokeLinecap="round" />
      {/* Dragon Guard */}
      <path d="M34 68 C42 66 58 66 66 68 L62 74 L38 74 Z" fill="url(#azureGlow)" stroke="#0369a1" strokeWidth="1" />
      {/* Ruby in Guard */}
      <circle cx="50" cy="71" r="2.5" fill="#f87171" stroke="#450a0a" strokeWidth="0.8" />
      {/* Grip */}
      <rect x="47" y="74" width="6" height="14" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />
      {/* Pommel */}
      <polygon points="50,92 45,88 55,88" fill="url(#azureGlow)" stroke="#0369a1" strokeWidth="1" />
    </g>
  </svg>
);

export const VeryRareTwinBladesSVG = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <linearGradient id="voidBlade1" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#f3e8ff" />
        <stop offset="40%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
      <filter id="voidGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Dark Void Swirl */}
    <circle cx="50" cy="50" r="34" fill="rgba(192, 132, 252, 0.18)" filter="url(#voidGlow)" />
    
    {/* Blade 1 (Leaning Left) */}
    <g transform="rotate(-30 50 50)">
      <path d="M50 10 C56 22 58 45 52 70 L46 70 C44 48 42 26 50 10 Z" fill="url(#voidBlade1)" stroke="#a855f7" strokeWidth="1.2" />
      <path d="M50 18 Q52 38 49 64" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
      <rect x="42" y="70" width="16" height="4" rx="1.5" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
      <rect x="47.5" y="74" width="5" height="12" fill="#1e1b4b" />
      <circle cx="50" cy="88" r="3" fill="#c084fc" />
    </g>

    {/* Blade 2 (Crossed Leaning Right) */}
    <g transform="rotate(30 50 50)">
      <path d="M50 10 C56 22 58 45 52 70 L46 70 C44 48 42 26 50 10 Z" fill="url(#voidBlade1)" stroke="#a855f7" strokeWidth="1.2" />
      <path d="M50 18 Q52 38 49 64" stroke="#ffffff" strokeWidth="1.2" opacity="0.85" />
      <rect x="42" y="70" width="16" height="4" rx="1.5" fill="#3b0764" stroke="#c084fc" strokeWidth="0.8" />
      <rect x="47.5" y="74" width="5" height="12" fill="#1e1b4b" />
      <circle cx="50" cy="88" r="3" fill="#c084fc" />
    </g>

    {/* Center Void Rift Spark */}
    <circle cx="50" cy="50" r="4" fill="#ffffff" filter="url(#voidGlow)" />
  </svg>
);

export const ExtremelyRareHeroSVG = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <radialGradient id="solarCorona" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="heroGoldArmor" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#fbbf24" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
      <filter id="heroSunburst" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Solar Halo Behind Head */}
    <circle cx="50" cy="46" r="38" fill="url(#solarCorona)" filter="url(#heroSunburst)" />
    
    {/* Halo Spikes */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line key={i} x1="50" y1="12" x2="50" y2="6" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" transform={`rotate(${angle} 50 46)`} />
    ))}

    {/* Hero Pauldrons (Shoulders) */}
    <path d="M18 84 C22 66 38 60 44 64 L34 88 Z" fill="url(#heroGoldArmor)" stroke="#b45309" strokeWidth="1" />
    <path d="M82 84 C78 66 62 60 56 64 L66 88 Z" fill="url(#heroGoldArmor)" stroke="#b45309" strokeWidth="1" />

    {/* Chest Plate / Gorget */}
    <path d="M38 68 L50 82 L62 68 L50 62 Z" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
    <polygon points="50,68 53,74 50,78 47,74" fill="#38bdf8" />

    {/* Hero Head / Face Silhouette */}
    <ellipse cx="50" cy="45" rx="14" ry="18" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />

    {/* Flowing Silver/Golden Hair */}
    <path d="M34 40 C34 26 40 22 50 22 C60 22 66 26 66 40 C66 52 64 62 64 65 C58 55 58 48 58 45 C56 38 52 35 48 35 C44 35 42 42 42 46 C42 52 40 60 36 65 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />

    {/* Winged Tiara / Crown */}
    <path d="M36 34 L50 24 L64 34 L58 38 L50 32 L42 38 Z" fill="url(#heroGoldArmor)" stroke="#92400e" strokeWidth="1" />
    <circle cx="50" cy="30" r="2.5" fill="#38bdf8" />

    {/* Glowing Eyes */}
    <ellipse cx="45" cy="45" rx="2" ry="1.2" fill="#38bdf8" filter="url(#heroSunburst)" />
    <ellipse cx="55" cy="45" rx="2" ry="1.2" fill="#38bdf8" filter="url(#heroSunburst)" />

    {/* 5-Star Mythic Badge */}
    <g transform="translate(25, 87) scale(0.5)">
      {[0, 20, 40, 60, 80].map((offset, idx) => (
        <path key={idx} d={`M${10 + offset} 2 L${13 + offset} 9 L${20 + offset} 9 L${14 + offset} 14 L${16 + offset} 21 L${10 + offset} 16 L${4 + offset} 21 L${6 + offset} 14 L${0 + offset} 9 L${7 + offset} 9 Z`} fill="#fbbf24" stroke="#b45309" strokeWidth="0.8" />
      ))}
    </g>
  </svg>
);
