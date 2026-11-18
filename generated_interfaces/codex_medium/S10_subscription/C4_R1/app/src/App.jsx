import React, { useState } from 'react';
import { ArrowRight, Check, Crown, Layers, SlidersHorizontal, Sparkles, WandSparkles, X, Wifi, Signal, BatteryFull } from 'lucide-react';

const plans = {
  annual: { name: 'Yearly', price: '$39.99', period: 'year', monthly: '$3.33/month', billing: '$39.99 billed every year' },
  monthly: { name: 'Monthly', price: '$6.99', period: 'month', monthly: 'Billed monthly', billing: '$6.99 billed every month' },
};

function Landscape({ muted = false, id = 'hero' }) {
  return <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" className={`landscape ${muted ? 'muted' : ''}`} role="img" aria-label="Warm sunlit mountain landscape with a winding desert road">
    <defs>
      <linearGradient id={`${id}-sky`} x2="0" y2="1"><stop stopColor="#777a9a"/><stop offset=".6" stopColor="#f4b9a0"/><stop offset="1" stopColor="#ffd2a7"/></linearGradient>
      <linearGradient id={`${id}-rock`} x2=".8" y2="1"><stop stopColor="#d98567"/><stop offset="1" stopColor="#783d49"/></linearGradient>
      <linearGradient id={`${id}-land`} x2="1" y2="1"><stop stopColor="#b46d5f"/><stop offset="1" stopColor="#4b3f50"/></linearGradient>
      <filter id={`${id}-grain`}><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter>
    </defs>
    <g filter={`url(#${id}-grain)`}>
      <path fill={`url(#${id}-sky)`} d="M0 0h600v360H0z"/>
      <circle cx="435" cy="102" r="31" fill="#ffe7b9"/>
      <path d="M0 209L51 181 94 192 151 145 208 174 258 134 318 189 363 164 414 187 467 151 523 182 600 144V360H0Z" fill="#b38b8a"/>
      <path d="M0 163L27 154 41 117 67 106 81 92 96 94 115 133 128 140 142 202 164 221 199 233 220 278 0 360Z" fill={`url(#${id}-rock)`}/>
      <path d="M34 164L51 123 68 116 83 100 93 104 105 147 119 154 132 215 102 188 91 142 72 158 60 206Z" fill="#eeae88" opacity=".6"/>
      <path d="M600 135L569 121 551 128 538 167 521 180 509 202 470 220 450 264 600 360Z" fill="#8c535b"/>
      <path d="M600 135L569 126 555 136 546 177 535 186 526 213 557 200 573 154Z" fill="#d89479"/>
      <path d="M0 285Q146 206 295 241T600 244V360H0Z" fill={`url(#${id}-land)`}/>
      <path d="M236 360Q277 323 338 299T354 270Q331 258 361 244Q326 255 337 270T306 292Q237 315 176 360Z" fill="#f0be9c"/>
      <path d="M207 360Q254 320 321 297T345 270" fill="none" stroke="#fcdbc0" strokeWidth="2" opacity=".6"/>
      <path d="M0 322L87 296 158 313 108 340 41 347Z" fill="#453846" opacity=".4"/>
      <path d="M416 333L438 291 444 290 439 328M462 345L479 306 485 305 480 341" stroke="#564549" strokeWidth="4" fill="none"/>
      <path d="M438 311L429 308 429 299M479 323L491 317 491 309" stroke="#564549" strokeWidth="3" fill="none"/>
    </g>
  </svg>;
}

function App() {
  const [plan, setPlan] = useState('annual');
  const [dialog, setDialog] = useState(null);
  const [screen, setScreen] = useState('offer');
  const [original, setOriginal] = useState(false);
  const [intensity, setIntensity] = useState(75);
  const selected = plans[plan];
  const closeDialog = () => setDialog(null);

  return <main className="presentation">
    <div className="device-wrap">
      <div className="device">
        <div className="status-bar"><span>9:41</span><div className="camera"/><div className="status-icons"><Signal size={14}/><Wifi size={15}/><BatteryFull size={19}/></div></div>
        <div className="app-content">
          <header className="app-header"><div className="brand"><span className="brand-mark"><Sparkles size={18}/></span>aurea<span className="pro-tag">PRO</span></div><button className="close-button" aria-label={screen === 'offer' ? 'Close subscription offer and use free editor' : 'Show subscription offer'} onClick={() => { setScreen(screen === 'offer' ? 'editor' : 'offer'); setOriginal(false); }}><X size={19}/></button></header>
          {screen === 'offer' ? <>
            <button className="hero" onClick={() => setOriginal(!original)} aria-label={`Show ${original ? 'edited' : 'original'} landscape preview`}>
              <Landscape muted={original}/>
              <span className="hero-top"><span className="tiny-dot"/>{original ? 'THE ORIGINAL' : 'A LITTLE MAGIC. ALL YOU.'}</span>
              <span className="photo-caption">{original ? 'Before the glow' : 'Find your golden hour.'}</span>
              <span className="preset-label"><SlidersHorizontal size={12}/>{original ? 'Original' : 'Golden · 75'}<span className="compare-icon">◐</span></span>
            </button>
            <section className="intro"><div className="eyebrow">MAKE EVERY PHOTO A FAVORITE</div><h1>Your vision.<br/>Without limits.</h1><p>A little more magic for the moments that matter.</p></section>
            <div className="features">
              <div><span className="feature-icon"><WandSparkles size={19}/></span><span><strong>Beautiful edits, in a tap</strong><small>Premium filters & one-tap enhancements</small></span></div>
              <div><span className="feature-icon"><Layers size={19}/></span><span><strong>More room to create</strong><small>Advanced tools & full-resolution exports</small></span></div>
            </div>
            <fieldset className="plans"><legend>Choose your plan</legend>
              {Object.entries(plans).map(([key, item]) => <label className={`plan ${plan === key ? 'selected' : ''}`} key={key}>
                <input type="radio" name="plan" value={key} checked={plan === key} onChange={() => setPlan(key)}/><span className="radio-indicator">{plan === key && <Check size={12} strokeWidth={3}/>}</span>
                <span className="plan-name"><span className="plan-title">{item.name}{key === 'annual' && <span className="save">SAVE 52%</span>}</span><small>{item.monthly}</small></span>
                <span className="plan-price">{item.price}<small>/{item.period}</small></span>
              </label>)}
            </fieldset>
            <div className="purchase-section"><button className="primary" onClick={() => setDialog('purchase')}>Continue with {plan === 'annual' ? 'yearly' : 'monthly'}<ArrowRight size={18}/></button><div className="billing"><strong>{selected.billing}.</strong> Auto-renews.<br/>Cancel anytime in Google Play. No free trial.</div></div>
            <footer><button onClick={() => setDialog('terms')}>Terms</button><span>·</span><button onClick={() => setDialog('privacy')}>Privacy</button><span>·</span><button onClick={() => setDialog('restore')}>Restore purchases</button></footer>
          </> : <section className="editor">
            <div className="eyebrow">YOUR NEXT FAVORITE STARTS HERE</div><h1>A little golden<br/>hour, anytime.</h1><div className="editor-photo" style={{ filter: `saturate(${intensity / 70})` }}><Landscape id="editor" muted={original}/></div>
            <div className="editor-heading"><strong>Golden hour</strong><button className="text-button" onClick={() => setOriginal(!original)}>{original ? 'Show edit' : 'Show original'}</button></div>
            <label className="slider-label" htmlFor="intensity">Intensity <span>{intensity}%</span></label><input id="intensity" className="intensity" type="range" min="0" max="100" value={intensity} onChange={event => setIntensity(Number(event.target.value))}/>
            <button className="primary" onClick={() => setDialog('export')}>Save your edit<ArrowRight size={18}/></button><button className="upgrade" onClick={() => setScreen('offer')}><Crown size={16}/> Explore Aurea Pro</button><p className="editor-note">Keep creating with the free editor.</p>
          </section>}
        </div>
        <div className="navigation-bar"/>
        {dialog && <div className="modal-backdrop" onClick={closeDialog}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={event => event.stopPropagation()}><button className="modal-close close-button" aria-label="Close dialog" onClick={closeDialog}><X size={19}/></button>
          {dialog === 'purchase' ? <><div className="modal-symbol"><Crown size={25}/></div><h2 id="dialog-title">Your creative upgrade</h2><p>Aurea Pro · {selected.name} subscription</p><div className="summary-price">{selected.price}<span>/{selected.period}</span></div><p>{selected.billing}. Payment is due when you confirm. Your subscription automatically renews until canceled in Google Play.</p><div className="demo-note">Interactive preview only. No payment will be taken. A released Android app would open Google Play’s purchase confirmation here.</div><button className="primary" onClick={() => setDialog('demo')}>Preview confirmation<ArrowRight size={17}/></button><button className="modal-secondary" onClick={closeDialog}>Go back</button></> : dialog === 'demo' ? <><div className="modal-symbol"><Check size={26}/></div><h2 id="dialog-title">You're all set to create</h2><p>You’ve completed the demo flow. No subscription was started and no payment was taken.</p><button className="primary" onClick={() => { closeDialog(); setScreen('editor'); }}>Try the editor<ArrowRight size={17}/></button></> : dialog === 'restore' ? <><h2 id="dialog-title">Restore purchases</h2><p>No purchase is connected to this web preview. In the Android app, existing Aurea Pro purchases would be restored using your Google Play account.</p><button className="primary" onClick={closeDialog}>Got it</button></> : dialog === 'export' ? <><div className="modal-symbol"><Check size={25}/></div><h2 id="dialog-title">Your edit is ready</h2><p>Download your landscape with your selected intensity.</p><button className="primary" onClick={() => { const svg = document.querySelector('.editor-photo svg').cloneNode(true); svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); svg.setAttribute('style', `filter:saturate(${intensity / 70})${original ? ' grayscale(.65)' : ''}`); const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' })); const link = document.createElement('a'); link.href = url; link.download = 'aurea-golden-hour.svg'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); closeDialog(); }}>Download image<ArrowRight size={17}/></button></> : <><h2 id="dialog-title">{dialog === 'terms' ? 'Subscription terms' : 'Your privacy'}</h2>{dialog === 'terms' ? <><p>Aurea Pro includes premium filters, one-tap enhancements, advanced editing tools, and full-resolution exports.</p><p>Yearly: $39.99 per year. Monthly: $6.99 per month. Prices shown in USD. There is no free trial. Payment is due on purchase confirmation. Subscriptions renew automatically unless canceled before renewal. Manage or cancel in Google Play → Payments & subscriptions.</p><p>The yearly plan saves 52% compared with 12 monthly payments, rounded to the nearest percent.</p></> : <><p>This local preview processes your edits in your browser. It does not upload your photos, collect account details, or process payments.</p><p>In a published app, a complete privacy policy would explain any collected data, its use, and your choices before purchase.</p></>}<button className="primary" onClick={closeDialog}>Done</button></>}
        </section></div>}
      </div>
      <div className="outside-caption"><span className="caption-line"/>A LITTLE LIGHT. A LOT OF POSSIBILITY.<span className="caption-line"/></div>
    </div>
  </main>;
}

export default App;
