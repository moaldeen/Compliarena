import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Check, X, Mail, UserRound, Wifi, Signal, BatteryFull, Sparkles, Zap } from 'lucide-react';

const avatars = [
  { name: 'Bunny', color: '#eadcf9', type: 'bunny' },
  { name: 'Fox', color: '#ffe3cc', type: 'fox' },
  { name: 'Frog', color: '#dfecc7', type: 'frog' },
  { name: 'Bear', color: '#f5dfc5', type: 'bear' },
  { name: 'Cat', color: '#dce9f8', type: 'cat' },
  { name: 'Panda', color: '#f5dce2', type: 'panda' },
];

function Avatar({ type, size = 44 }) {
  const colors = { bunny: '#fcf9ff', fox: '#e98b48', frog: '#7dab59', bear: '#ae7d52', cat: '#849abd', panda: '#fdfcf8' };
  const c = colors[type];
  return <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    {type === 'bunny' ? <><ellipse cx="23" cy="17" rx="6" ry="14" fill={c} /><ellipse cx="41" cy="17" rx="6" ry="14" fill={c} /><ellipse cx="23" cy="16" rx="2.5" ry="9" fill="#eab9ce" /><ellipse cx="41" cy="16" rx="2.5" ry="9" fill="#eab9ce" /></> : type === 'cat' || type === 'fox' ? <><path d="M13 33 11 9 29 24M35 24 53 9 51 33" fill={c} /><path d="m15 15 2 14 7-6M49 15l-2 14-7-6" fill="#efc4bd" /></> : <><circle cx="17" cy="21" r="9" fill={type === 'panda' ? '#404843' : c} /><circle cx="47" cy="21" r="9" fill={type === 'panda' ? '#404843' : c} /></>}
    <ellipse cx="32" cy="37" rx="23" ry="21" fill={c} />
    {type === 'fox' && <path d="M10 32 30 43 32 54 34 43 54 32c1 15-10 25-22 25S9 47 10 32" fill="#fff4dc" />}
    {type === 'panda' && <><ellipse cx="23" cy="34" rx="7" ry="8" fill="#404843" transform="rotate(20 23 34)" /><ellipse cx="41" cy="34" rx="7" ry="8" fill="#404843" transform="rotate(-20 41 34)" /></>}
    <circle cx="23" cy="34" r="2.2" fill={type === 'panda' ? '#fff' : '#354139'} /><circle cx="41" cy="34" r="2.2" fill={type === 'panda' ? '#fff' : '#354139'} />
    <ellipse cx="17" cy="41" rx="4" ry="2.5" fill="#ecaaa0" opacity=".7" /><ellipse cx="47" cy="41" rx="4" ry="2.5" fill="#ecaaa0" opacity=".7" />
    {type !== 'frog' && <path d="m29 41 3 3 3-3Z" fill="#6e514d" />}
    <path d={type === 'frog' ? 'M25 42q7 8 14 0' : 'M27 46q5 5 10 0'} fill="none" stroke="#354139" strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}

function Brand() { return <div className="brand"><span className="brand-mark">✳</span> sum<span className="brand-light">club</span><span className="brand-dot">®</span></div>; }

export default function App() {
  const [scale, setScale] = useState(1);
  const [avatar, setAvatar] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [view, setView] = useState('signup');
  const [modal, setModal] = useState(null);
  const [profile, setProfile] = useState(null);
  const [answer, setAnswer] = useState(null);
  useEffect(() => {
    const resize = () => setScale(Math.min(1, (window.innerWidth - 30) / 390, (window.innerHeight - 36) / 790));
    resize(); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);
  }, []);
  useEffect(() => {
    if (!modal) return;
    const dismiss = event => { if (event.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, [modal]);
  function submit(event) {
    event.preventDefault();
    const next = {};
    if (view === 'signup' && !/^[a-zA-Z0-9_]{3,18}$/.test(username.trim())) next.username = 'Use 3–18 letters, numbers, or underscores.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    if (view === 'login') {
      let saved;
      try { saved = JSON.parse(localStorage.getItem('sumclub-profile')); } catch { /* Storage may be unavailable. */ }
      if (!saved || saved.email.toLowerCase() !== email.trim().toLowerCase()) { setErrors({ email: 'No profile found on this device. Create one to play.' }); return; }
      setProfile(saved); setAvatar(saved.avatar); setUsername(saved.username); setEmail(saved.email); setView('success');
    } else {
      const created = { username: username.trim(), email: email.trim(), avatar };
      try { localStorage.setItem('sumclub-profile', JSON.stringify(created)); } catch { /* The current session can still play. */ }
      setProfile(created); setView('success');
    }
  }
  function changeView(next) { setErrors({}); setView(next); setAnswer(null); }
  const chosen = avatars[avatar];
  return <main className="canvas">
    <div className="ambient ambient-one">+</div><div className="ambient ambient-two">÷</div><div className="ambient ambient-three">×</div>
    <div className="desktop-note"><span className="note-spark">✳</span><span>A little math.<br />A lot of possibility.</span></div>
    <div className="device-space" style={{ width: 390 * scale, height: 790 * scale }}>
      <div className="device" style={{ transform: `scale(${scale})` }}>
        <div className="screen">
          <div className="status-bar"><span>9:41</span><div className="island" /><div className="status-icons"><Signal size={15} fill="currentColor" /><Wifi size={15} /><BatteryFull size={20} /></div></div>
          <div className="app-body">
            <header><Brand /><span className="header-tag">MATH, BUT FUN.</span></header>
            {(view === 'signup' || view === 'login') ? <>
              <div className="steps" aria-label="Account setup"><span className="step active"><span>1</span> Your profile</span><div className="step-line" /><span className="step"><span>2</span> Let’s play</span></div>
              <section className="intro">
                <span className="eyebrow"><span /> YOUR NEXT BRIGHT IDEA</span>
                <h1>{view === 'signup' ? <>Small steps.<br /><span>Big brain energy.</span></> : <>Welcome back,<br /><span>bright mind.</span></>}</h1>
                <p>{view === 'signup' ? 'Make it yours. Let the good problems begin.' : 'Your next little win is waiting for you.'}</p>
                <span className="intro-spark" aria-hidden="true">✧</span>
              </section>
              <form onSubmit={submit} noValidate>
                {view === 'signup' && <>
                  <div className="field-group"><label htmlFor="username">Choose a username <span>That’s you on the leaderboard.</span></label><div className={`input-wrap ${errors.username ? 'invalid' : ''}`}><UserRound size={18} /><input id="username" autoComplete="username" placeholder="e.g. number_ninja" maxLength={18} value={username} onChange={e => { setUsername(e.target.value); setErrors(s => ({ ...s, username: undefined })); }} aria-invalid={!!errors.username} aria-describedby="username-help" />{username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username) && <Check size={17} className="valid-check" />}</div><div id="username-help" className="field-hint">{errors.username || 'A little personality goes a long way.'}</div></div>
                  <fieldset className="avatar-field"><legend>Pick your math buddy <span>Meet your new plus-one.</span></legend><div className="avatars">{avatars.map((a, i) => <button type="button" key={a.name} className={`avatar-choice ${avatar === i ? 'selected' : ''}`} aria-label={`Choose ${a.name}`} aria-pressed={avatar === i} onClick={() => setAvatar(i)}><span className="avatar-circle" style={{ backgroundColor: a.color }}><Avatar type={a.type} /></span>{avatar === i && <span className="selected-check"><Check size={9} strokeWidth={3} /></span>}</button>)}</div><div className="avatar-caption"><span>{chosen.name}</span> looks good on you.</div></fieldset>
                </>}
                <div className="field-group email-group"><label htmlFor="email">Your email <span>Keep your progress in your pocket.</span></label><div className={`input-wrap ${errors.email ? 'invalid' : ''}`}><Mail size={18} /><input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setErrors(s => ({ ...s, email: undefined })); }} aria-invalid={!!errors.email} aria-describedby="email-help" /></div><div id="email-help" className={`field-hint ${errors.email ? 'error' : ''}`}>{errors.email || 'Just for your account. No pop quizzes in your inbox.'}</div></div>
                <button type="submit" className="primary-button">{view === 'signup' ? 'Create my profile' : 'Let’s get back to it'}<ArrowRight size={19} /></button>
                <p className="legal">By continuing, you agree to our <button type="button" onClick={() => setModal('Terms')}>Terms</button><br />and <button type="button" onClick={() => setModal('Privacy Policy')}>Privacy Policy</button>. Nice and simple.</p>
              </form>
              <div className="signin">{view === 'signup' ? 'Already part of the club?' : 'New around here?'} <button onClick={() => changeView(view === 'signup' ? 'login' : 'signup')}>{view === 'signup' ? 'Log in' : 'Join the club'}<ArrowRight size={13} /></button></div>
              <div className="bottom-note"><Zap size={12} fill="currentColor" /> A little better, one problem at a time.</div>
            </> : <section className="success-view">
              <div className="success-badge"><Sparkles size={14} /> {view === 'challenge' ? 'YOUR FIRST LITTLE WIN' : 'YOU’RE IN THE CLUB'}</div>
              <div className="large-avatar" style={{ backgroundColor: chosen.color }}><Avatar type={chosen.type} size={104} /><span>✦</span></div>
              <h1>{view === 'challenge' ? <>Let’s warm<br /><span>that brain up.</span></> : <>Hey, {profile?.username}!<br /><span>Looking sharp.</span></>}</h1>
              {view === 'challenge' ? <><p>One small problem. A big happy brain.</p><div className="equation">6 <span>×</span> 7 <span>=</span> ?</div><div className="answers">{[36, 42, 48].map(n => <button key={n} className={answer === n ? (n === 42 ? 'correct' : 'incorrect') : ''} onClick={() => setAnswer(n)}>{n}{answer === n && n === 42 && <Check size={16} />}</button>)}</div><div className="answer-feedback" aria-live="polite">{answer === null ? 'Trust your inner number ninja.' : answer === 42 ? 'Nailed it! Your first win looks good on you.' : 'Almost! Try counting seven groups of six.'}</div><button className="primary-button" onClick={() => changeView('success')}>Back to my profile<ArrowRight size={18} /></button></> : <><p>Your profile is ready.<br />Let’s turn a little practice into a lot of progress.</p><div className="welcome-card"><span><Zap size={20} /></span><div><strong>Every great streak starts with one.</strong><p>Your first challenge is on us.</p></div></div><button className="primary-button" onClick={() => changeView('challenge')}>Let’s play<ArrowRight size={19} /></button><button className="back-button" onClick={() => changeView('signup')}><ArrowLeft size={14} /> Edit my profile</button></>}
            </section>}
          </div>
          <div className="home-indicator" />
          {modal && <div className="modal-backdrop" onClick={() => setModal(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e => e.stopPropagation()}><button className="close-button" aria-label="Close" autoFocus onClick={() => setModal(null)}><X size={20} /></button><span className="eyebrow">THE CLUB BASICS</span><h2 id="modal-title">{modal}</h2><p>{modal === 'Terms' ? 'Play kindly, choose a respectful username, and enjoy learning at your own pace. This demo is free to explore and does not include purchases.' : 'This local demo saves your username, email, and selected avatar in your browser so you can return to your profile. It does not send your details to a server.'}</p><p>{modal === 'Terms' ? 'Your profile belongs to you. You can edit it by returning to the profile setup screen.' : 'You can remove this saved profile by clearing this site’s browser data.'}</p><button className="primary-button" onClick={() => setModal(null)}>Got it<Check size={18} /></button></section></div>}
        </div>
      </div>
    </div>
    <div className="desktop-footer">GOOD PROBLEMS. GREAT POSSIBILITIES.<span>SUM CLUB / 001</span></div>
  </main>;
}
