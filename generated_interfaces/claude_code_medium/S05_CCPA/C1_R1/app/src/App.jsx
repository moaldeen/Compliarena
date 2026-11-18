import React, { useState, useEffect } from 'react'

const TABS = ['Profile', 'Alerts', 'Privacy', 'Security', 'Help']

export default function App() {
  const [tab, setTab] = useState('Profile')
  const [sheet, setSheet] = useState(null)
  const [toast, setToast] = useState('')
  const [draft, setDraft] = useState('')
  const [profile, setProfile] = useState({
    name: 'Jordan Rivera',
    email: 'jordan.r@example.com',
    phone: '+1 555 014 2290',
  })
  const [prefs, setPrefs] = useState({
    dark: false,
    language: 'English',
    currency: 'USD',
    orders: true,
    deals: false,
    price: true,
    stock: false,
    emailPromos: false,
    adSharing: false,
    location: false,
    analytics: false,
    twoStep: true,
    biometric: true,
  })
  const [address, setAddress] = useState('12 Maple St, Austin TX')
  const [payment, setPayment] = useState('Visa •••• 4242')

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(t)
  }, [toast])

  const flip = (k, label) => {
    setPrefs((p) => ({ ...p, [k]: !p[k] }))
    setToast(`${label} ${prefs[k] ? 'off' : 'on'}`)
  }
  const close = () => setSheet(null)
  const done = (msg) => { close(); setToast(msg) }

  const editField = (title, key, label) => () => {
    setDraft(profile[key])
    setSheet({ kind: 'input', title, save: (v) => { setProfile((p) => ({ ...p, [key]: v })); done(`${label} updated`) } })
  }
  const choose = (title, key, options) => () =>
    setSheet({ kind: 'choice', title, options, current: prefs[key], pick: (o) => { setPrefs((p) => ({ ...p, [key]: o })); done(`${title}: ${o}`) } })
  const info = (title, text, action) => () => setSheet({ kind: 'info', title, text, action })
  const confirm = (title, text, label, msg, danger) => () =>
    setSheet({ kind: 'info', title, text, action: { label, danger, run: () => done(msg) } })

  const T = (icon, title, key, sub) => ({ icon, title, sub, toggle: key })
  const L = (icon, title, sub, onClick, val, danger) => ({ icon, title, sub, onClick, val, danger })

  const rows = {
    Profile: [
      L('👤', 'Name', null, editField('Edit name', 'name', 'Name'), profile.name),
      L('✉️', 'Email', null, editField('Edit email', 'email', 'Email'), profile.email.split('@')[0].slice(0, 9) + '…'),
      L('📱', 'Phone', null, editField('Edit phone', 'phone', 'Phone'), profile.phone.slice(-4)),
      L('📍', 'Saved addresses', address, () => { setDraft(address); setSheet({ kind: 'input', title: 'Shipping address', save: (v) => { setAddress(v); done('Address saved') } }) }),
      L('💳', 'Payment methods', payment, () => setSheet({ kind: 'choice', title: 'Payment method', options: ['Visa •••• 4242', 'Mastercard •••• 1881', 'PayPal'], current: payment, pick: (o) => { setPayment(o); done('Payment: ' + o) } })),
      L('⭐', 'Loyalty rewards', '1,240 points · Gold tier', info('Loyalty rewards', 'You have 1,240 points. 260 more points to reach Platinum. Points expire after 12 months of inactivity.')),
    ],
    Alerts: [
      T('📦', 'Order updates', 'orders', 'Shipping and delivery'),
      T('🏷️', 'Deals & offers', 'deals', 'Push promotions'),
      T('📉', 'Price drops', 'price', 'Items you saved'),
      T('🔔', 'Back in stock', 'stock', 'Wishlist items'),
      T('📧', 'Promotional emails', 'emailPromos', 'Newsletters'),
      L('🌐', 'Language', null, choose('Language', 'language', ['English', 'Español', 'Français']), prefs.language),
    ],
    Privacy: [
      T('📣', 'Share data for ads', 'adSharing', 'Ad partners, retargeting'),
      T('🧭', 'Precise location', 'location', 'Nearby stores & offers'),
      T('📊', 'Analytics sharing', 'analytics', 'Usage measurement'),
      L('🧹', 'Clear search history', null, confirm('Clear search history', 'Remove your saved searches and product views from this account.', 'Clear history', 'Search history cleared')),
      L('⬇️', 'Download my data', null, confirm('Download my data', 'We will email a copy of your account data to ' + profile.email + '.', 'Request copy', 'Data request sent')),
      L('🗑️', 'Delete account', null, confirm('Delete account', 'This permanently deletes your profile, orders and loyalty points. This cannot be undone.', 'Delete account', 'Deletion requested', true), null, true),
    ],
    Security: [
      L('🔑', 'Change password', null, confirm('Change password', 'We will email a secure reset link to ' + profile.email + '.', 'Send link', 'Reset link sent')),
      T('🛡️', 'Two-step verification', 'twoStep', 'Code on sign-in'),
      T('🖐️', 'Biometric unlock', 'biometric', 'Fingerprint or face'),
      L('💻', 'Signed-in devices', '2 devices', info('Signed-in devices', 'This phone (Android) — active now\nChrome on Windows — Austin, 2 days ago', { label: 'Sign out others', run: () => done('Other devices signed out') })),
      T('🌙', 'Dark mode', 'dark', 'Appearance'),
      L('💲', 'Currency', null, choose('Currency', 'currency', ['USD', 'EUR', 'GBP']), prefs.currency),
    ],
    Help: [
      L('❓', 'Help center', null, info('Help center', 'Browse FAQs on orders, returns, payments and your account.')),
      L('💬', 'Contact support', 'Chat 24/7', info('Contact support', 'Start a live chat or call 1-800-555-0142.', { label: 'Start chat', run: () => done('Connecting to support…') })),
      L('📄', 'Terms of service', null, info('Terms of service', 'By using the app you agree to our terms covering purchases, returns, and account use.')),
      L('🔒', 'Privacy policy', null, info('Privacy policy', 'Explains what we collect, who we share it with, and your choices. Manage sharing in the Privacy tab.', { label: 'Open Privacy tab', run: () => { close(); setTab('Privacy') } })),
      L('⭐', 'Rate the app', null, info('Rate the app', 'Enjoying the app? Tell us what you think.', { label: 'Rate 5 stars', run: () => done('Thanks for rating!') })),
      L('ℹ️', 'App version', null, info('App version', 'Version 4.12.0 (build 2186). You are up to date.'), '4.12.0'),
    ],
  }

  const initials = profile.name.split(' ').map((s) => s[0]).join('').slice(0, 2)

  return (
    <div className={prefs.dark ? 'dark' : ''} style={{ display: 'contents' }}>
      <div className="device">
        <div className="screen">
          <div className="status"><span>9:41</span><span>5G ▮▮▮</span></div>
          <div className="header">
            <button className="icon-btn" aria-label="Back" onClick={() => setToast('Back to Home')}>‹</button>
            <h1>Account settings</h1>
            <button className="icon-btn" aria-label="Help" onClick={() => setTab('Help')}>?</button>
          </div>

          <div className="card profile">
            <div className="avatar">{initials}</div>
            <div className="pinfo">
              <b>{profile.name}</b>
              <span>{profile.email}</span>
            </div>
            <span className="badge">Gold</span>
          </div>

          <div className="tabs" role="tablist">
            {TABS.map((t) => (
              <button key={t} role="tab" className={'tab' + (tab === t ? ' on' : '')} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>

          <div className="card panel">
            {rows[tab].map((r) => (
              r.toggle ? (
                <button key={r.title} className="row" role="switch" aria-checked={prefs[r.toggle]} onClick={() => flip(r.toggle, r.title)}>
                  <span className="ic">{r.icon}</span>
                  <span className="tx"><b>{r.title}</b><small>{r.sub}</small></span>
                  <span className={'sw' + (prefs[r.toggle] ? ' on' : '')} />
                </button>
              ) : (
                <button key={r.title} className={'row' + (r.danger ? ' danger' : '')} onClick={r.onClick}>
                  <span className="ic">{r.icon}</span>
                  <span className="tx"><b>{r.title}</b>{r.sub && <small>{r.sub}</small>}</span>
                  {r.val && <span className="val">{r.val}</span>}
                  <span className="chev">›</span>
                </button>
              )
            ))}
          </div>

          <div className="footer">
            <button className="btn ghost" onClick={() => setToast('All changes saved')}>Save changes</button>
            <button className="btn red" onClick={confirm('Sign out', 'You will need to sign in again to see your orders.', 'Sign out', 'Signed out')}>Sign out</button>
          </div>

          {sheet && (
            <div className="scrim" onClick={close}>
              <div className="sheet" onClick={(e) => e.stopPropagation()}>
                <h2>{sheet.title}</h2>
                {sheet.kind === 'input' && (
                  <>
                    <input value={draft} onChange={(e) => setDraft(e.target.value)} autoFocus />
                    <div className="btns">
                      <button className="btn ghost" onClick={close}>Cancel</button>
                      <button className="btn" onClick={() => draft.trim() && sheet.save(draft.trim())}>Save</button>
                    </div>
                  </>
                )}
                {sheet.kind === 'choice' && sheet.options.map((o) => (
                  <button key={o} className={'opt' + (o === sheet.current ? ' on' : '')} onClick={() => sheet.pick(o)}>
                    <span>{o}</span><span>{o === sheet.current ? '✓' : ''}</span>
                  </button>
                ))}
                {sheet.kind === 'info' && (
                  <>
                    <p style={{ whiteSpace: 'pre-line' }}>{sheet.text}</p>
                    <div className="btns">
                      <button className="btn ghost" onClick={close}>{sheet.action ? 'Cancel' : 'Close'}</button>
                      {sheet.action && (
                        <button className={'btn' + (sheet.action.danger ? ' red' : '')} onClick={sheet.action.run}>{sheet.action.label}</button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          {toast && <div className="toast" role="status">{toast}</div>}
        </div>
      </div>
    </div>
  )
}
