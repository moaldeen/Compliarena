import React, { useState } from 'react';

const paths = {
  back: <path d="m15 18-6-6 6-6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  user: <><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20c.5-3.6 2.8-5.4 6.5-5.4s6 1.8 6.5 5.4" /></>,
  bag: <><path d="M4.5 8h15l-1 12h-13l-1-12Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
  heart: <path d="M20.8 8.6c0 4-8.8 10.2-8.8 10.2S3.2 12.6 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />,
  pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18M7 15h4" /></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-2 7-2 9h16c0-2-2-2-2-9ZM10 21h4" /></>,
  sliders: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" /><circle cx="16" cy="17" r="2" fill="currentColor" stroke="none" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  shield: <><path d="M12 2.5 20 6v5c0 5-3.2 8.1-8 10.5C7.2 19.1 4 16 4 11V6l8-3.5Z" /><path d="m9 12 2 2 4-4" /></>,
  file: <><path d="M6 3h9l4 4v14H6V3Z" /><path d="M15 3v5h4M9 12h7M9 16h7" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.5 2.5 0 0 1 4.7 1.1c0 1.7-2.4 2-2.4 3.5M12 17.5h.01" /></>,
  logout: <><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 16l4-4-4-4M8 12h10" /></>,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="m5 12 4 4L19 6" />,
};

function Icon({ name, size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const groups = [
  { title: 'YOUR SHOPPING', items: [
    ['Orders & returns', 'bag', 'Track, return and review orders'],
    ['Saved items', 'heart', 'Your favorites in one place'],
    ['Addresses', 'pin', 'Manage delivery locations'],
    ['Payment methods', 'card', 'Cards and payment preferences'],
  ]},
  { title: 'PREFERENCES', items: [
    ['Notifications', 'bell', 'Offers, orders and updates'],
    ['App preferences', 'sliders', 'Currency, language and display'],
  ]},
  { title: 'ACCOUNT & SUPPORT', items: [
    ['Security', 'lock', 'Password and sign-in'],
    ['Privacy & data', 'shield', 'Control your account data'],
    ['Legal information', 'file', 'Terms and policies'],
    ['Help & support', 'help', 'We’re here to help'],
  ]},
];

function App() {
  const [page, setPage] = useState(null);
  const [toast, setToast] = useState('');
  const [name, setName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@email.com');
  const [notifications, setNotifications] = useState({ orders: true, offers: false, news: true });
  const [currency, setCurrency] = useState('USD · $');
  const [language, setLanguage] = useState('English');
  const [dark, setDark] = useState(false);

  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const open = (title) => setPage(title);
  const row = (label, value, action) => <button className="detail-row" onClick={action || (() => showToast(`${label} is up to date`))}><span>{label}</span><span className="detail-value">{value}<Icon name="chevron" size={16} /></span></button>;
  const toggle = (label, key) => <button className="detail-row" onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}><span>{label}</span><span className={`switch ${notifications[key] ? 'on' : ''}`}><i /></span></button>;

  function content() {
    switch (page) {
      case 'Personal details': return <><p className="detail-intro">Keep your details current for a smoother checkout.</p><label className="field-label">FULL NAME<input value={name} onChange={e => setName(e.target.value)} /></label><label className="field-label">EMAIL ADDRESS<input type="email" value={email} onChange={e => setEmail(e.target.value)} /></label><button className="primary-button" onClick={() => { showToast('Profile saved'); setPage(null); }}>Save changes</button></>;
      case 'Orders & returns': return <><p className="detail-intro">Your recent purchases and returns will appear here.</p><div className="empty-card"><Icon name="bag" size={29} /><strong>No orders yet</strong><span>When you place an order, you can track it here.</span></div><button className="primary-button" onClick={() => setPage(null)}>Continue shopping</button></>;
      case 'Saved items': return <><p className="detail-intro">Products you love, ready when you are.</p><div className="empty-card"><Icon name="heart" size={29} /><strong>Your list is waiting</strong><span>Tap the heart on a product to save it.</span></div><button className="primary-button" onClick={() => setPage(null)}>Explore products</button></>;
      case 'Addresses': return <><p className="detail-intro">Save delivery addresses for faster checkout.</p><div className="empty-card"><Icon name="pin" size={29} /><strong>No saved addresses</strong><span>Add an address when you check out.</span></div><button className="primary-button" onClick={() => showToast('Address form ready at checkout')}>Add an address</button></>;
      case 'Payment methods': return <><p className="detail-intro">Manage how you pay at checkout.</p><div className="empty-card"><Icon name="card" size={29} /><strong>No saved payment methods</strong><span>You can securely add a card at checkout.</span></div><button className="primary-button" onClick={() => showToast('Payment methods can be added at checkout')}>Got it</button></>;
      case 'Notifications': return <><p className="detail-intro">Choose what you hear from us about.</p>{toggle('Order updates', 'orders')}{toggle('Offers & promotions', 'offers')}{toggle('New arrivals', 'news')}<p className="detail-note">Essential account and security messages may still be sent.</p></>;
      case 'App preferences': return <><p className="detail-intro">Make the app feel like yours.</p>{row('Currency', currency, () => setCurrency(currency === 'USD · $' ? 'EUR · €' : 'USD · $'))}{row('Language', language, () => setLanguage(language === 'English' ? 'Español' : 'English'))}<button className="detail-row" onClick={() => setDark(!dark)}><span>Dark appearance</span><span className={`switch ${dark ? 'on' : ''}`}><i /></span></button></>;
      case 'Security': return <><p className="detail-intro">Protect your account and sign-in details.</p>{row('Change password', '', () => showToast('Password reset link sent to your email'))}{row('Sign-in activity', '', () => showToast('You are signed in on this device'))}<p className="detail-note">We’ll email you if there is unusual activity on your account.</p></>;
      case 'Privacy & data': return <><p className="detail-intro">Your account details, saved shopping information and order history are stored securely and synchronized across your devices.</p>{row('Download my data', '', () => showToast('Data download request received'))}{row('Delete account', '', () => setPage('Delete account'))}<p className="detail-note">Deleting your account removes your profile and saved information. Order records may be retained where required by law.</p></>;
      case 'Delete account': return <><p className="detail-intro">Request permanent deletion of your account and associated profile and saved shopping data.</p><div className="notice-card">This action cannot be undone. You will receive an email with the next steps.</div><button className="danger-button" onClick={() => showToast('Deletion request submitted')}>Request account deletion</button></>;
      case 'Legal information': return <><p className="detail-intro">The policies that guide your experience with rue.</p>{row('Privacy policy', '', () => setPage('Privacy policy'))}{row('Terms of service', '', () => setPage('Terms of service'))}{row('Data policy', '', () => setPage('Data policy'))}</>;
      case 'Privacy policy': case 'Terms of service': case 'Data policy': return <><p className="detail-intro">{page}</p><div className="notice-card">We use account information to provide shopping, checkout, order history, and cross-device access. Contact support for a copy of the full policy.</div><button className="primary-button" onClick={() => setPage('Help & support')}>Contact support</button></>;
      case 'Help & support': return <><p className="detail-intro">Need a hand? We’re happy to help.</p>{row('Help center', '', () => showToast('Help center is coming soon'))}{row('Contact us', 'support@rue.shop', () => { window.location.href = 'mailto:support@rue.shop'; })}{row('Returns & refunds', '', () => setPage('Orders & returns'))}</>;
      case 'Sign out': return <><p className="detail-intro">Are you sure you want to sign out of this device?</p><button className="primary-button" onClick={() => { setPage(null); showToast('Signed out of this device'); }}>Sign out</button><button className="secondary-button" onClick={() => setPage(null)}>Cancel</button></>;
      default: return null;
    }
  }

  return <div className={`site ${dark ? 'dark' : ''}`}><div className="phone-shell"><div className="phone">
    <div className="status-bar"><span>9:41</span><div className="status-icons"><span className="signal">▂▄▆</span><span className="wifi">◕</span><span className="battery"><i /></span></div></div>
    <div className="app-header"><button className="back-button" aria-label="Back" onClick={() => page ? setPage(null) : showToast('You are in account settings')}><Icon name="back" size={20} /></button><div className="brand">rue<span>.</span></div><span className="header-spacer" /></div>
    <main className="screen-content">
      {page ? <div className="detail-page"><div className="detail-heading"><span className="eyebrow">ACCOUNT / SETTINGS</span><h1>{page}</h1></div>{content()}</div> : <>
        <div className="heading"><span className="eyebrow">YOUR SPACE</span><h1>Account settings</h1><p>Everything about your account, in one place.</p></div>
        <button className="profile-card" onClick={() => open('Personal details')}><div className="avatar">AM</div><div className="profile-copy"><strong>{name}</strong><span>{email}</span><small>View personal details</small></div><Icon name="chevron" size={17} /></button>
        {groups.map(group => <section className="settings-group" key={group.title}><h2>{group.title}</h2><div className="list-card">{group.items.map(([label, icon, desc]) => <button className="setting-item" key={label} onClick={() => open(label)}><span className="item-icon"><Icon name={icon} size={18} /></span><span className="item-text"><strong>{label}</strong><small>{desc}</small></span><Icon name="chevron" size={16} /></button>)}</div></section>)}
        <button className="signout" onClick={() => open('Sign out')}><Icon name="logout" size={17} /> Sign out</button><div className="version">rue app · Version 1.0</div>
      </>}
    </main>
    <div className="home-indicator" />
    {toast && <div className="toast"><Icon name="check" size={16} />{toast}</div>}
  </div></div></div>;
}

export default App;
