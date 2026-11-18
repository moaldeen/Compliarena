import { useEffect, useRef, useState } from 'react'

const STORES = ['Carytown', 'Short Pump', 'Charlottesville', 'Norfolk']
const NOTIFY_KEYS = ['orders', 'shipping', 'restock', 'priceDrop', 'loyalty', 'promoEmail', 'promoPush']
const PURCHASES = [
  { id: 'MR-10482', status: 'Out for delivery', detail: 'Cedar candle, linen napkin set' },
  { id: 'MR-10311', status: 'Delivered Oct 2', detail: 'Oak cutting board' },
]
const INFERENCES = ['Weekend hosting', 'Natural materials', 'Neutral textiles']
const OPEN_ORDER = 'MR-10482'
const DELETION_DETAIL = `Queued within 45 days: account profile, device identifiers, browsing activity, product views, search history, cart activity, saved items, loyalty activity, and inferred preferences. Kept: purchase history needed for tax, warranty, and fraud prevention, plus the shipping address and payment token needed to finish open order ${OPEN_ORDER}. This partial denial can be appealed in the app.`
const AG_CONTACT = 'Office of the Attorney General of Virginia, Consumer Protection Section, 202 North Ninth Street, Richmond, VA 23219, (804) 786-2042'

const FAQS = [
  {
    q: 'How long do privacy requests take?',
    a: 'Access, correction, deletion, and download requests are completed within 45 days. We may extend once by another 45 days and will tell you if we do. Appeals receive a response within 60 days.',
  },
  {
    q: 'Where does this order ship?',
    a: 'Marlow delivers from Richmond across Virginia. Open order MR-10482 is out for delivery today.',
  },
  {
    q: 'How do returns work?',
    a: 'Return unused goods within 30 days in a Virginia store or by mail. Keep purchase records available for the return.',
  },
  {
    q: 'Do rewards require ad tracking?',
    a: 'No. Gold rewards stay if you opt out of sale or targeted advertising. Loyalty is not a condition of selling personal data.',
  },
]

function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

function stamp() {
  return new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function makeDeviceId() {
  const part = () => Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0')
  return `${part()}-${part()}-${part()}`
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 10) return value.trim()
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function privacySummary(privacy) {
  if (privacy.universalSignal) return 'Signal opt-out'
  if (!privacy.targetedAds && !privacy.sale) return 'Ads & sale off'
  if (!privacy.targetedAds) return 'Ads off'
  if (!privacy.sale) return 'Sale off'
  return 'Ads & sale on'
}

function bannerCopy(privacy) {
  if (!privacy.targetedAds && !privacy.sale) {
    return { title: 'Sale and targeted ads are off', sub: 'Review Virginia privacy choices', done: true }
  }
  if (privacy.sale && privacy.targetedAds) {
    return { title: 'Do not sell my personal data', sub: 'Opt out of targeted advertising', done: false }
  }
  if (privacy.sale) {
    return { title: 'Do not sell my personal data', sub: 'Targeted advertising is already off', done: false }
  }
  return { title: 'Opt out of targeted advertising', sub: 'Sale of personal data is already off', done: false }
}

function findOpenDeletion(requests) {
  return requests.find((item) => (
    item.type === 'Deletion' &&
    (item.status === 'Partly denied' || item.status === 'Appeal received' || item.status === 'Received')
  ))
}

function pillTone(status) {
  if (status === 'Completed' || status === 'Withdrawn') return 'good'
  if (status === 'Partly denied' || status === 'Denied') return 'bad'
  return 'wait'
}

function fallbackCopy(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'absolute'
  area.style.left = '-9999px'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

function copyText(text) {
  const copyFallback = () => {
    try {
      fallbackCopy(text)
    } catch (error) {
      return Promise.reject(error)
    }
    return Promise.resolve()
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => copyFallback())
  }
  return copyFallback()
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

function House() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M7 1.2 12.2 6.2V12.5H8.4V8.2H5.6V12.5H1.8V6.2L7 1.2Z" fill="currentColor" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg className="chev" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M10 3.5 5.5 8 10 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatusIcons() {
  return (
    <span className="status-icons" aria-hidden="true">
      <svg width="15" height="12" viewBox="0 0 15 12">
        <rect x="0" y="8" width="2.2" height="4" rx="0.4" fill="currentColor" />
        <rect x="3.4" y="5.5" width="2.2" height="6.5" rx="0.4" fill="currentColor" />
        <rect x="6.8" y="3" width="2.2" height="9" rx="0.4" fill="currentColor" />
        <rect x="10.2" y="0.5" width="2.2" height="11.5" rx="0.4" fill="currentColor" opacity="0.35" />
      </svg>
      <svg width="13" height="12" viewBox="0 0 13 12">
        <path d="M6.5 9.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" fill="currentColor" />
        <path d="M2.2 7.2a6 6 0 0 1 8.6 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M0.6 5a8.4 8.4 0 0 1 11.8 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <svg width="22" height="11" viewBox="0 0 22 11">
        <rect x="0.6" y="0.6" width="18" height="9.8" rx="2" fill="none" stroke="currentColor" />
        <rect x="2" y="2" width="13" height="7" rx="1" fill="currentColor" />
        <rect x="19.4" y="3.4" width="1.6" height="4" rx="0.5" fill="currentColor" />
      </svg>
    </span>
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function Toggle({ checked, label, disabled, onChange }) {
  return (
    <button
      type="button"
      className={cx('switch', checked && 'on')}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span className="knob" />
    </button>
  )
}

function Row({ title, value, onClick, danger }) {
  return (
    <button type="button" className={cx('row', danger && 'danger')} onClick={onClick}>
      <span className="row-label">{title}</span>
      {value ? <span className="row-value">{value}</span> : null}
      <Chevron />
    </button>
  )
}

function Brand() {
  return (
    <div className="brand">
      <House />
      <span>Marlow</span>
    </div>
  )
}

function Header({ title, onBack, home }) {
  if (home) {
    return (
      <header className="header home">
        <Brand />
        <h1>{title}</h1>
      </header>
    )
  }
  return (
    <header className="header">
      <button type="button" className="back" onClick={onBack}>
        <BackIcon />
        <span>Back</span>
      </button>
      <h1>{title}</h1>
      <span className="header-spacer" />
    </header>
  )
}

function AttorneyGeneral({ onCopy }) {
  return (
    <div className="card">
      <h3>Virginia Attorney General</h3>
      <p className="sub">If we deny an appeal, contact the Consumer Protection Section.</p>
      <p className="flat">202 North Ninth Street, Richmond, VA 23219</p>
      <p className="flat">(804) 786-2042</p>
      <p className="flat">oag.state.va.us/consumer-protection</p>
      <button type="button" className="btn small line" onClick={onCopy}>Copy contact</button>
    </div>
  )
}

function Gate({ api }) {
  const [email, setEmail] = useState(api.profile.email)
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    const result = api.signIn(email, pw)
    setError(result.form || '')
  }

  return (
    <div className="gate">
      <h2>Home supply, Richmond.</h2>
      <p className="lede">Sign in to manage orders, rewards, and Virginia privacy rights. Opting out of sale and targeted ads does not require an account.</p>
      <form onSubmit={onSubmit}>
        <label className="field">
          <span>Email</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" inputMode="email" />
        </label>
        <label className="field">
          <span>Password</span>
          <input type="password" value={pw} onChange={(event) => setPw(event.target.value)} autoComplete="current-password" />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <p className="fine">Demo password starts as harbor418. If you changed it, use the new one.</p>
        <button type="submit" className="btn primary stack-btn">Sign in</button>
      </form>
      <button type="button" className="btn line stack-btn" onClick={() => api.go('privacy')}>
        Do not sell my personal data
      </button>
      <button type="button" className="btn ghost stack-btn" onClick={() => api.go('notice')}>
        Privacy notice
      </button>
    </div>
  )
}

function Home({ api }) {
  const banner = bannerCopy(api.privacy)
  const openDeletion = findOpenDeletion(api.requests)
  const notifyCount = NOTIFY_KEYS.filter((key) => api.notes[key]).length
  return (
    <div>
      <div className="who">
        <div className="avatar" aria-hidden="true">
          {api.profile.firstName.slice(0, 1)}
          {api.profile.lastName.slice(0, 1)}
        </div>
        <div className="who-copy">
          <h2 className="name">{api.profile.firstName} {api.profile.lastName}</h2>
          <p className="meta">{api.profile.email}</p>
          <p className="meta">{api.loyalty.tier} · {api.profile.city}, {api.profile.state}</p>
        </div>
      </div>
      <button type="button" className={cx('optout', banner.done && 'done')} onClick={() => api.go('privacy')}>
        <strong>{banner.title}</strong>
        <em>{banner.sub}</em>
      </button>
      {openDeletion ? (
        <button type="button" className="banner" onClick={() => api.go('request', { id: openDeletion.id })}>
          Deletion request open. See what is kept and how to appeal.
        </button>
      ) : null}
      <section className="section">
        <h2 className="section-label">Account</h2>
        <Row title="Personal details" onClick={() => api.go('profile')} />
        <Row title="Security" onClick={() => api.go('security')} />
      </section>
      <section className="section">
        <h2 className="section-label">Shopping</h2>
        <Row title="Saved shopping info" value={`${api.savedItems.length} saved`} onClick={() => api.go('saved')} />
        <Row title="Notifications" value={`${notifyCount} on`} onClick={() => api.go('notifications')} />
        <Row title="Preferences" value={api.prefs.store} onClick={() => api.go('preferences')} />
        <Row title="Loyalty" value={`${api.loyalty.points.toLocaleString('en-US')} pts`} onClick={() => api.go('loyalty')} />
      </section>
      <section className="section">
        <h2 className="section-label">Privacy</h2>
        <Row title="Privacy choices" value={privacySummary(api.privacy)} onClick={() => api.go('privacy')} />
        <Row title="Privacy notice" onClick={() => api.go('notice')} />
        <Row title="Your data rights" value={api.requests.length ? `${api.requests.length} filed` : 'None yet'} onClick={() => api.go('rights')} />
      </section>
      <section className="section">
        <h2 className="section-label">Help</h2>
        <Row title="Help & support" onClick={() => api.go('support')} />
        <Row title="Terms of use" onClick={() => api.go('terms')} />
        <Row title="Sign out" danger onClick={api.askSignOut} />
      </section>
      <p className="fine">Virginia privacy rights apply here. Opting out keeps prices, orders, and rewards.</p>
    </div>
  )
}

function validateProfile(form) {
  const errors = {}
  if (!form.firstName.trim() || !form.lastName.trim()) errors.name = 'Enter a first and last name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Enter a 10-digit phone number.'
  if (!form.city.trim()) errors.city = 'Enter a city.'
  if (!/^[A-Za-z]{2}$/.test(form.state.trim())) errors.state = 'Use a 2-letter state.'
  return errors
}

function Profile({ api, purpose }) {
  const [form, setForm] = useState(api.profile)
  const [errors, setErrors] = useState({})
  const correcting = purpose === 'correct'

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = validateProfile(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    api.saveProfile({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: formatPhone(form.phone),
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
    }, correcting)
  }

  return (
    <form onSubmit={onSubmit}>
      {correcting ? (
        <p className="note">Update anything inaccurate. Saving files a correction request under the Virginia Consumer Data Protection Act.</p>
      ) : (
        <p className="lede">
          {api.privacy.targetedAds
            ? 'We use account details to fulfill orders and support. A hashed email may be used for audience matching while targeted advertising is on.'
            : 'We use account details to fulfill orders and support. Targeted advertising is off, so the hashed email stays out of audience matching.'}
        </p>
      )}
      <div className="grid-2">
        <label className="field">
          <span>First name</span>
          <input value={form.firstName} onChange={(event) => setField('firstName', event.target.value)} />
        </label>
        <label className="field">
          <span>Last name</span>
          <input value={form.lastName} onChange={(event) => setField('lastName', event.target.value)} />
        </label>
      </div>
      {errors.name ? <p className="error">{errors.name}</p> : null}
      <label className="field">
        <span>Email</span>
        <input value={form.email} onChange={(event) => setField('email', event.target.value)} inputMode="email" autoComplete="email" />
      </label>
      {errors.email ? <p className="error">{errors.email}</p> : null}
      <label className="field">
        <span>Phone</span>
        <input value={form.phone} onChange={(event) => setField('phone', event.target.value)} inputMode="tel" autoComplete="tel" />
      </label>
      {errors.phone ? <p className="error">{errors.phone}</p> : null}
      <div className="grid-2">
        <label className="field">
          <span>City</span>
          <input value={form.city} onChange={(event) => setField('city', event.target.value)} />
        </label>
        <label className="field">
          <span>State</span>
          <input value={form.state} onChange={(event) => setField('state', event.target.value)} maxLength={2} />
        </label>
      </div>
      {errors.city ? <p className="error">{errors.city}</p> : null}
      {errors.state ? <p className="error">{errors.state}</p> : null}
      <button type="submit" className="btn primary stack-btn">{correcting ? 'Save correction' : 'Save profile'}</button>
    </form>
  )
}

function Security({ api }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})

  function onSubmit(event) {
    event.preventDefault()
    const result = api.changePassword(current, next, confirm)
    setErrors(result || {})
    if (!result) {
      setCurrent('')
      setNext('')
      setConfirm('')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p className="lede">The starting demo password is harbor418. Passwords stay on this device and are never part of a data sale.</p>
        <label className="field">
          <span>Current password</span>
          <input type="password" value={current} onChange={(event) => setCurrent(event.target.value)} autoComplete="current-password" />
        </label>
        {errors.current ? <p className="error">{errors.current}</p> : null}
        <label className="field">
          <span>New password</span>
          <input type="password" value={next} onChange={(event) => setNext(event.target.value)} autoComplete="new-password" />
        </label>
        {errors.next ? <p className="error">{errors.next}</p> : null}
        <label className="field">
          <span>Confirm password</span>
          <input type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" />
        </label>
        {errors.confirm ? <p className="error">{errors.confirm}</p> : null}
        <button type="submit" className="btn primary stack-btn">Update password</button>
      </form>
      <div className="card" style={{ marginTop: 10 }}>
        <div className="choice" style={{ borderTop: 0, paddingTop: 0 }}>
          <div className="text">
            <h3>Sign-in alerts</h3>
            <p>Email when a new device signs in.</p>
          </div>
          <Toggle checked={api.notes.signInAlerts} label="Sign-in alerts" onChange={() => api.toggleNote('signInAlerts')} />
        </div>
        <div className="choice">
          <div className="text">
            <h3>Device unlock</h3>
            <p>Uses this phone’s own lock. Marlow does not collect biometric data.</p>
          </div>
          <Toggle checked={api.notes.deviceUnlock} label="Require device unlock" onChange={() => api.toggleNote('deviceUnlock')} />
        </div>
      </div>
      <div className="card">
        <h3>Device identifier</h3>
        <p className="flat">{api.deviceId}</p>
        <div className="mini-row">
          <button type="button" className="btn small ghost" onClick={() => api.copy(api.deviceId, 'Device identifier copied.')}>Copy</button>
          <button type="button" className="btn small line" onClick={api.rotateDevice}>Rotate identifier</button>
        </div>
      </div>
      <div className="card">
        <h3>Devices</h3>
        {api.sessions.map((session) => (
          <div className="line-item" key={session.id}>
            <span>{session.name} · {session.place}{session.current ? ' · This device' : ''}</span>
            {session.current ? null : (
              <button type="button" className="x" onClick={() => api.askSignOutSession(session)}>Sign out</button>
            )}
          </div>
        ))}
        {api.sessions.length === 1 ? <p className="lock-note">No other devices are signed in.</p> : null}
      </div>
    </div>
  )
}

function Saved({ api }) {
  const [itemName, setItemName] = useState('')
  const [itemError, setItemError] = useState('')

  function addItem(event) {
    event.preventDefault()
    if (!itemName.trim()) {
      setItemError('Name a saved item.')
      return
    }
    api.addSavedItem(itemName.trim())
    setItemName('')
    setItemError('')
  }

  return (
    <div>
      <div className="card">
        <h3>Addresses</h3>
        {api.addresses.length === 0 ? <p className="sub">No saved addresses.</p> : null}
        {api.addresses.map((address) => (
          <div key={address.id}>
            <div className="line-item">
              <span>
                <strong>{address.label}</strong>
                {address.isDefault ? <span className="tag keep">Default</span> : null}
                <br />
                {address.line}, {address.city}, {address.state} {address.zip}
              </span>
            </div>
            <div className="mini-row">
              {address.isDefault ? null : (
                <button type="button" className="btn small ghost" onClick={() => api.makeDefaultAddress(address.id)}>Make default</button>
              )}
              <button type="button" className="btn small ghost" onClick={() => api.go('address', { id: address.id })}>Edit</button>
              <button type="button" className="btn small ghost" onClick={() => api.askRemoveAddress(address)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className="btn line stack-btn" onClick={() => api.go('address', { id: null })}>Add address</button>
      </div>
      <div className="card">
        <h3>Payment methods</h3>
        <p className="sub">We store brand, last four, expiration, and name. Full card numbers are not kept.</p>
        {api.payments.length === 0 ? <p className="sub">No saved cards.</p> : null}
        {api.payments.map((card) => (
          <div key={card.id}>
            <div className="line-item">
              <span>{card.brand} ···· {card.last4} · {card.exp}{card.isDefault ? ' · Default' : ''}</span>
            </div>
            <div className="mini-row">
              {card.isDefault ? null : (
                <button type="button" className="btn small ghost" onClick={() => api.makeDefaultPayment(card.id)}>Make default</button>
              )}
              <button type="button" className="btn small ghost" onClick={() => api.askRemovePayment(card)}>Remove</button>
            </div>
          </div>
        ))}
        <button type="button" className="btn line stack-btn" onClick={() => api.go('payment')}>Add card</button>
      </div>
      <div className="card">
        <h3>Saved items</h3>
        {api.savedItems.length === 0 ? <p className="sub">No saved items.</p> : null}
        {api.savedItems.map((item) => (
          <div className="line-item" key={item.id}>
            <span>{item.name}{item.note ? ` · ${item.note}` : ''}</span>
            <button type="button" className="x" onClick={() => api.removeSavedItem(item.id)}>Remove</button>
          </div>
        ))}
        <form onSubmit={addItem}>
          <label className="field">
            <span>Add an item</span>
            <input value={itemName} onChange={(event) => setItemName(event.target.value)} />
          </label>
          {itemError ? <p className="error">{itemError}</p> : null}
          <button type="submit" className="btn primary stack-btn">Save item</button>
        </form>
      </div>
    </div>
  )
}

function AddressForm({ api, id }) {
  const existing = api.addresses.find((address) => address.id === id)
  const [form, setForm] = useState(() => existing || {
    label: 'Home',
    line: '',
    city: 'Richmond',
    state: 'VA',
    zip: '',
    isDefault: api.addresses.length === 0,
  })
  const [errors, setErrors] = useState({})

  if (id && !existing) {
    return (
      <div>
        <p className="lede">That address is no longer saved.</p>
        <button type="button" className="btn line stack-btn" onClick={api.back}>Back to saved shopping</button>
      </div>
    )
  }

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.label.trim()) nextErrors.label = 'Add a label.'
    if (!form.line.trim()) nextErrors.line = 'Add a street address.'
    if (!form.city.trim()) nextErrors.city = 'Add a city.'
    if (!/^[A-Za-z]{2}$/.test(form.state.trim())) nextErrors.state = 'Use a 2-letter state.'
    if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim())) nextErrors.zip = 'Use a 5-digit ZIP code.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    api.saveAddress({
      id: existing ? existing.id : `addr-${Date.now()}`,
      label: form.label.trim(),
      line: form.line.trim(),
      city: form.city.trim(),
      state: form.state.trim().toUpperCase(),
      zip: form.zip.trim(),
      isDefault: Boolean(form.isDefault || api.addresses.length === 0),
    }, !existing)
  }

  return (
    <form onSubmit={onSubmit}>
      <label className="field">
        <span>Label</span>
        <input value={form.label} onChange={(event) => setField('label', event.target.value)} />
      </label>
      {errors.label ? <p className="error">{errors.label}</p> : null}
      <label className="field">
        <span>Street</span>
        <input value={form.line} onChange={(event) => setField('line', event.target.value)} autoComplete="address-line1" />
      </label>
      {errors.line ? <p className="error">{errors.line}</p> : null}
      <div className="grid-2">
        <label className="field">
          <span>City</span>
          <input value={form.city} onChange={(event) => setField('city', event.target.value)} />
        </label>
        <label className="field">
          <span>State</span>
          <input value={form.state} maxLength={2} onChange={(event) => setField('state', event.target.value)} />
        </label>
      </div>
      {errors.city ? <p className="error">{errors.city}</p> : null}
      {errors.state ? <p className="error">{errors.state}</p> : null}
      <label className="field">
        <span>ZIP</span>
        <input value={form.zip} onChange={(event) => setField('zip', event.target.value)} inputMode="numeric" />
      </label>
      {errors.zip ? <p className="error">{errors.zip}</p> : null}
      <div className="choice">
        <div className="text">
          <h3>Default address</h3>
          <p>Used for the next delivery.</p>
        </div>
        <Toggle checked={Boolean(form.isDefault)} label="Default address" onChange={(value) => setField('isDefault', value)} />
      </div>
      <button type="submit" className="btn primary stack-btn">Save address</button>
    </form>
  )
}

function PaymentForm({ api }) {
  const [brand, setBrand] = useState('Visa')
  const [last4, setLast4] = useState('')
  const [exp, setExp] = useState('')
  const [name, setName] = useState(`${api.profile.firstName} ${api.profile.lastName}`)
  const [errors, setErrors] = useState({})

  function onSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!/^\d{4}$/.test(last4)) nextErrors.last4 = 'Enter the last four digits.'
    const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(exp.trim())
    if (!match) nextErrors.exp = 'Use MM/YY.'
    else {
      const month = Number(match[1])
      const year = 2000 + Number(match[2])
      if (new Date(year, month, 1) <= new Date()) nextErrors.exp = 'That card is expired.'
    }
    if (!name.trim()) nextErrors.name = 'Enter the name on the card.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    api.addPayment({
      id: `pay-${Date.now()}`,
      brand,
      last4,
      exp: exp.trim(),
      name: name.trim(),
      isDefault: api.payments.length === 0,
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <p className="lede">Enter only the last four digits. Marlow does not ask for or store the full card number.</p>
      <div className="chips" role="group" aria-label="Card brand">
        {['Visa', 'Mastercard', 'Amex', 'Discover'].map((option) => (
          <button type="button" key={option} className={cx('chip', brand === option && 'on')} onClick={() => setBrand(option)}>{option}</button>
        ))}
      </div>
      <label className="field" style={{ marginTop: 8 }}>
        <span>Last four</span>
        <input value={last4} onChange={(event) => setLast4(event.target.value.replace(/\D/g, '').slice(0, 4))} inputMode="numeric" />
      </label>
      {errors.last4 ? <p className="error">{errors.last4}</p> : null}
      <label className="field">
        <span>Expiration</span>
        <input value={exp} onChange={(event) => setExp(event.target.value)} placeholder="MM/YY" />
      </label>
      {errors.exp ? <p className="error">{errors.exp}</p> : null}
      <label className="field">
        <span>Name on card</span>
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      {errors.name ? <p className="error">{errors.name}</p> : null}
      <button type="submit" className="btn primary stack-btn">Save card</button>
    </form>
  )
}

function Notifications({ api }) {
  const items = [
    ['orders', 'Order updates', 'Status changes for purchases.'],
    ['shipping', 'Delivery', 'When a carrier is on the way.'],
    ['restock', 'Back in stock', 'Items you saved in Marlow.'],
    ['priceDrop', 'Price drops', 'Drops on items you saved in Marlow.'],
    ['loyalty', 'Loyalty', 'Points and reward reminders.'],
    ['promoEmail', 'Promotional email', 'Marlow offers by email.'],
    ['promoPush', 'Promotional push', 'Marlow offers on this phone.'],
  ]
  return (
    <div>
      <p className="lede">Order and promo messages are separate from targeted advertising. Sale and cross-app ad choices live under Privacy choices.</p>
      <div className="card">
        {items.map(([key, title, copy], index) => (
          <div className="choice" key={key} style={index === 0 ? { borderTop: 0, paddingTop: 0 } : undefined}>
            <div className="text">
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <Toggle checked={api.notes[key]} label={title} onChange={() => api.toggleNote(key)} />
          </div>
        ))}
      </div>
      <button type="button" className="btn line stack-btn" onClick={() => api.go('privacy')}>Manage sale and ad opt-outs</button>
    </div>
  )
}

function Preferences({ api }) {
  return (
    <div>
      <div className="card">
        <h3>Preferred store</h3>
        <div className="chips">
          {STORES.map((store) => (
            <button type="button" key={store} className={cx('chip', api.prefs.store === store && 'on')} onClick={() => api.setStore(store)}>{store}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="choice" style={{ borderTop: 0, paddingTop: 0 }}>
          <div className="text">
            <h3>In-app recommendations</h3>
            <p>Suggestions from your activity inside Marlow. This is separate from targeted advertising.</p>
          </div>
          <Toggle
            checked={api.prefs.recommendations}
            label="In-app recommendations"
            onChange={() => api.togglePref('recommendations')}
          />
        </div>
        <div className="choice">
          <div className="text">
            <h3>Email receipts</h3>
            <p>Send a receipt for each purchase.</p>
          </div>
          <Toggle checked={api.prefs.receipts} label="Email receipts" onChange={() => api.togglePref('receipts')} />
        </div>
      </div>
      <p className="fine">Currency is US dollars. Marlow ships within Virginia and prices orders from the store you pick.</p>
      <button type="button" className="btn line stack-btn" onClick={() => api.go('privacy')}>Manage sale and ad opt-outs</button>
    </div>
  )
}

function Loyalty({ api }) {
  const ready = Math.floor(api.loyalty.points / 500)
  const toward = api.loyalty.points % 500
  return (
    <div>
      <div className="card">
        <h3>{api.loyalty.tier} member</h3>
        <p className="flat">{api.loyalty.points.toLocaleString('en-US')} points · {api.loyalty.id}</p>
        <p className="sub">{ready} reward{ready === 1 ? '' : 's'} of $5 ready. {toward} points toward another.</p>
        <div className="mini-row">
          <button type="button" className="btn small primary" disabled={ready < 1} onClick={api.redeem}>Redeem 500 points</button>
          <button type="button" className="btn small ghost" onClick={() => api.copy(api.loyalty.id, 'Member ID copied.')}>Copy member ID</button>
        </div>
      </div>
      <p className="note">Rewards stay if you opt out of sale or targeted advertising. Loyalty is not conditioned on a sale of personal data.</p>
      <div className="card">
        <h3>Recent activity</h3>
        {api.loyalty.activity.map((entry) => (
          <div className="line-item" key={entry.id}>
            <span>{entry.label}</span>
            <span>{entry.points}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Privacy({ api }) {
  const locked = api.privacy.universalSignal
  return (
    <div>
      <p className="lede">Virginia residents can opt out of targeted advertising, the sale of personal data, and profiling used for decisions with legal or similarly significant effects. No account is required.</p>
      <button
        type="button"
        className="btn primary stack-btn"
        disabled={!api.privacy.targetedAds && !api.privacy.sale}
        onClick={api.optOutBoth}
      >
        {!api.privacy.targetedAds && !api.privacy.sale ? 'Opted out of sale and targeted ads' : 'Opt out of sale and targeted ads'}
      </button>
      <div className="card" style={{ marginTop: 8 }}>
        <div className="choice" style={{ borderTop: 0, paddingTop: 0 }}>
          <div className="text">
            <h3>Targeted advertising</h3>
            <p>Ads selected from your activity over time and across nonaffiliated websites and apps, including retargeting, audience matching, and campaign optimization.</p>
            <span className={cx('badge', api.privacy.targetedAds ? 'allow' : 'stop')}>{api.privacy.targetedAds ? 'Allowed' : 'Opted out'}</span>
            {locked ? <p className="lock-note">Locked off while a universal opt-out signal is on.</p> : null}
          </div>
          <Toggle
            checked={api.privacy.targetedAds}
            disabled={locked}
            label="Allow targeted advertising"
            onChange={(value) => api.setPrivacyFlag('targetedAds', value)}
          />
        </div>
        <div className="choice">
          <div className="text">
            <h3>Sale of personal data</h3>
            <p>Exchange of device identifiers, shopping activity, and a hashed email with advertising partners for valuable consideration.</p>
            <span className={cx('badge', api.privacy.sale ? 'allow' : 'stop')}>{api.privacy.sale ? 'Allowed' : 'Opted out'}</span>
          </div>
          <Toggle
            checked={api.privacy.sale}
            disabled={locked}
            label="Allow sale of personal data"
            onChange={(value) => api.setPrivacyFlag('sale', value)}
          />
        </div>
        <div className="choice">
          <div className="text">
            <h3>Profiling for significant decisions</h3>
            <p>Marlow does not use personal data for credit, housing, insurance, employment, or similar decisions. You can still record an opt-out.</p>
            <span className="badge stop">{api.privacy.profilingOptOut ? 'Opt-out recorded' : 'Not used'}</span>
          </div>
          <button
            type="button"
            className="btn small line"
            disabled={api.privacy.profilingOptOut}
            onClick={api.recordProfilingOptOut}
          >
            {api.privacy.profilingOptOut ? 'Recorded' : 'Record opt-out'}
          </button>
        </div>
      </div>
      <div className="card">
        <h3>Universal opt-out signal</h3>
        <p className="flat">Detected: {api.privacy.universalSignal ? 'Yes, simulated on this device' : 'No'}.</p>
        <p className="sub">A real device signal opts you out of sale and targeted advertising without an account. This demo can apply the same result.</p>
        {api.privacy.universalSignal ? (
          <button type="button" className="btn ghost stack-btn" onClick={api.clearSignal}>Clear simulated signal</button>
        ) : (
          <button type="button" className="btn line stack-btn" onClick={api.enableSignal}>Simulate a device opt-out signal</button>
        )}
      </div>
      <p className="fine">An authorized agent may opt out for you by emailing privacy@marlow.example with your name and signed permission. Opting out keeps prices, service, and loyalty rewards.</p>
      <button type="button" className="btn ghost stack-btn" onClick={() => api.go('notice')}>Read the privacy notice</button>
      {api.signedIn ? (
        <button type="button" className="btn ghost stack-btn" onClick={() => api.go('rights')}>Exercise data rights</button>
      ) : (
        <p className="fine">Sign in to access, correct, delete, or download personal data. The opt-out above already applies.</p>
      )}
    </div>
  )
}

function Notice({ api }) {
  return (
    <div>
      <p className="lede">Last updated October 20, 2026. This notice covers Virginia residents who use Marlow.</p>
      <div className="card">
        <h3>Who we are</h3>
        <p className="flat">Marlow Home Supply, LLC, 412 E Main Street, Richmond, VA 23219.</p>
        <p className="flat">privacy@marlow.example · (804) 555-0198</p>
      </div>
      <div className="card">
        <h3>Personal data we collect</h3>
        <ul>
          <li>Account information: name, email, phone, and addresses</li>
          <li>Device identifiers</li>
          <li>Browsing activity in the app</li>
          <li>Product views</li>
          <li>Search history</li>
          <li>Cart activity</li>
          <li>Purchase history</li>
          <li>Loyalty-program activity</li>
          <li>Inferred shopping preferences</li>
        </ul>
        <p className="flat">We do not collect sensitive data as defined by the Virginia Consumer Data Protection Act, including precise location, health information, biometrics, or personal data of a known child. Device unlock stays on your phone. This app is not directed to children under 13.</p>
      </div>
      <div className="card">
        <h3>How we use it and who receives it</h3>
        <p className="flat">We use this data to run your account, orders, deliveries, payments, support, security, and loyalty program.</p>
        <p className="flat">Recommendations inside Marlow use your activity in Marlow. Those suggestions are separate from targeted advertising.</p>
        <p className="flat">If you allow targeted advertising, we use personal data from your activity over time and across nonaffiliated websites and mobile apps to predict shopping preferences and to support targeted advertising, retargeting, audience matching, and campaign optimization.</p>
        <p className="flat">Payment, shipping, cloud hosting, and support companies receive only what they need to perform that work. That disclosure is processing, not a sale.</p>
        <p className="flat">If you allow a sale, advertising partners receive device identifiers, shopping activity, inferred preferences, loyalty activity, and a hashed email for valuable consideration.</p>
      </div>
      <div className="card">
        <h3>Opt-out rights</h3>
        <p className="flat">You may opt out of targeted advertising, the sale of personal data, and profiling used for decisions with legal or similarly significant effects.</p>
        <p className="flat">We do not use profiling for credit, housing, insurance, employment, or similar decisions. You can still record an opt-out.</p>
        <p className="flat">Use Your privacy choices on the account screen or the sign-in screen. You do not need an account. An authorized agent may email privacy@marlow.example with your name and proof of permission. A universal opt-out signal is honored as an opt-out of sale and targeted advertising.</p>
        <p className="flat">Opting out keeps your prices, service, and loyalty rewards. Basic ad measurement may continue. In-app recommendations and order messages have their own controls.</p>
      </div>
      <div className="card">
        <h3>Access, correction, deletion, and a copy</h3>
        <p className="flat">You may confirm and access personal data, correct inaccuracies, delete personal data, and obtain a portable copy. Sign in so we can authenticate those requests.</p>
        <p className="flat">We respond within 45 days. If we need one more 45-day period, we will tell you.</p>
        <p className="flat">We may keep data needed to finish an order, secure the service, or meet legal duties such as tax and fraud prevention. We explain any denial.</p>
      </div>
      <div className="card">
        <h3>Appeals</h3>
        <p className="flat">If we deny a request, appeal in the app. We respond within 60 days. If we deny the appeal, you may contact the Virginia Attorney General, Consumer Protection Section, 202 North Ninth Street, Richmond, VA 23219, (804) 786-2042.</p>
      </div>
      <button type="button" className="btn primary stack-btn" onClick={() => api.go('privacy')}>Open privacy choices</button>
      {api.signedIn ? (
        <button type="button" className="btn line stack-btn" onClick={() => api.go('rights')}>Exercise data rights</button>
      ) : (
        <button type="button" className="btn line stack-btn" onClick={api.showGate}>Back to sign in</button>
      )}
    </div>
  )
}

function Rights({ api }) {
  return (
    <div>
      <p className="lede">Signed-in requests are authenticated. We respond within 45 days, with one possible 45-day extension if we tell you.</p>
      <button type="button" className="btn primary stack-btn" onClick={api.openAccess}>Access my data</button>
      <button type="button" className="btn line stack-btn" onClick={() => api.go('profile', { purpose: 'correct' })}>Correct inaccurate data</button>
      <button type="button" className="btn line stack-btn" onClick={api.askDeletion}>Delete personal data</button>
      <button type="button" className="btn line stack-btn" onClick={api.downloadData}>Download a portable copy</button>
      <button type="button" className="btn ghost stack-btn" onClick={() => api.go('appeals')}>Appeal a denial</button>
      <div className="card" style={{ marginTop: 10 }}>
        <h3>Requests</h3>
        {api.requests.length === 0 ? <p className="sub">You have not filed a privacy request yet.</p> : null}
        {api.requests.map((item) => (
          <button type="button" className="row" key={item.id} onClick={() => api.go('request', { id: item.id })}>
            <span className="row-label">{item.type}</span>
            <span className={cx('pill', pillTone(item.status))}>{item.status}</span>
            <Chevron />
          </button>
        ))}
      </div>
    </div>
  )
}

function ActivityList({ title, items, group, queued, onRemove }) {
  return (
    <div className="card">
      <h3>
        {title}
        {queued ? <span className="tag">Queued</span> : null}
      </h3>
      {items.length === 0 ? <p className="sub">None stored.</p> : null}
      {items.map((item, index) => (
        <div className="line-item" key={`${group}-${index}`}>
          <span>{item}</span>
          <button type="button" className="x" onClick={() => onRemove(group, index)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

function Access({ api }) {
  const [showFile, setShowFile] = useState(false)
  const queued = Boolean(findOpenDeletion(api.requests))
  const snapshot = api.snapshot()
  return (
    <div>
      <p className="lede">This is the personal data in your signed-in demo account. An access request is logged as completed because the data is shown here. The statute allows up to 45 days.</p>
      {queued ? <p className="note">A deletion request is open. Queued categories stay visible until the 45-day window finishes. Purchase records we must keep are marked retained.</p> : null}
      <div className="card">
        <h3>Account information {queued ? <span className="tag">Queued</span> : null}</h3>
        <p className="fact"><b>{api.profile.firstName} {api.profile.lastName}</b></p>
        <p className="flat">{api.profile.email}</p>
        <p className="flat">{api.profile.phone}</p>
        <p className="flat">{api.profile.city}, {api.profile.state}</p>
      </div>
      <div className="card">
        <h3>Device identifier {queued ? <span className="tag">Queued</span> : null}</h3>
        <p className="flat">{api.deviceId}</p>
        <button type="button" className="btn small ghost" onClick={api.rotateDevice}>Rotate identifier</button>
      </div>
      <ActivityList title="Browsing activity" items={api.activity.browsing} group="browsing" queued={queued} onRemove={api.removeActivity} />
      <ActivityList title="Product views" items={api.activity.views} group="views" queued={queued} onRemove={api.removeActivity} />
      <ActivityList title="Search history" items={api.activity.searches} group="searches" queued={queued} onRemove={api.removeActivity} />
      <ActivityList title="Cart activity" items={api.activity.cart} group="cart" queued={queued} onRemove={api.removeActivity} />
      <div className="card">
        <h3>Purchase history <span className="tag keep">Retained</span></h3>
        {PURCHASES.map((order) => (
          <div className="line-item" key={order.id}>
            <span>{order.id} · {order.status}<br />{order.detail}</span>
          </div>
        ))}
        <p className="lock-note">Kept for tax, warranty, fraud prevention, and open order {OPEN_ORDER}.</p>
      </div>
      <div className="card">
        <h3>Addresses and payments {queued ? <span className="tag keep">Kept for open order</span> : null}</h3>
        {api.addresses.map((address) => (
          <p className="flat" key={address.id}>{address.label}: {address.line}, {address.city}, {address.state} {address.zip}</p>
        ))}
        {api.payments.map((card) => (
          <p className="flat" key={card.id}>{card.brand} ···· {card.last4}</p>
        ))}
      </div>
      <div className="card">
        <h3>Saved items {queued ? <span className="tag">Queued</span> : null}</h3>
        {api.savedItems.length === 0 ? <p className="sub">None stored.</p> : null}
        {api.savedItems.map((item) => <p className="flat" key={item.id}>{item.name}</p>)}
      </div>
      <div className="card">
        <h3>Loyalty activity {queued ? <span className="tag">Queued</span> : null}</h3>
        <p className="flat">{api.loyalty.tier} · {api.loyalty.points} points · {api.loyalty.id}</p>
      </div>
      <div className="card">
        <h3>Inferred shopping preferences {queued ? <span className="tag">Queued</span> : null}</h3>
        {INFERENCES.map((item) => <p className="flat" key={item}>{item}</p>)}
        <p className="lock-note">
          {api.privacy.targetedAds
            ? 'Used to predict preferences for targeted advertising while that processing is allowed.'
            : 'Stored here, and excluded from targeted advertising, retargeting, audience matching, and campaign optimization.'}
        </p>
      </div>
      <div className="card">
        <h3>Sensitive data</h3>
        <p className="flat">Not collected. Passwords and biometrics are absent from this file.</p>
      </div>
      <button type="button" className="btn line stack-btn" onClick={() => setShowFile((open) => !open)} aria-expanded={showFile}>
        {showFile ? 'Hide portable preview' : 'Preview portable copy'}
      </button>
      {showFile ? <pre className="pre">{JSON.stringify(snapshot, null, 2)}</pre> : null}
      <button type="button" className="btn primary stack-btn" onClick={api.downloadData}>Download JSON copy</button>
    </div>
  )
}

function RequestView({ api, id }) {
  const request = api.requests.find((item) => item.id === id)
  if (!request) {
    return <p className="lede">That request is not on this account.</p>
  }
  const canAppeal = request.status === 'Partly denied' || request.status === 'Denied'
  const canWithdraw = request.type === 'Deletion' && (request.status === 'Partly denied' || request.status === 'Appeal received' || request.status === 'Received')
  return (
    <div>
      <div className="card">
        <h3>{request.type}</h3>
        <p className="flat"><span className={cx('pill', pillTone(request.status))}>{request.status}</span></p>
        <p className="flat">{request.id}</p>
        <p className="flat">{request.date}</p>
        <p className="flat">{request.detail}</p>
        {request.appealReason ? <p className="flat">Appeal filed {request.appealDate}: {request.appealReason}</p> : null}
        <button type="button" className="btn small ghost" onClick={() => api.copy(request.id, 'Request ID copied.')}>Copy request ID</button>
      </div>
      {request.status === 'Appeal received' ? (
        <p className="note">Appeal received. We will respond within 60 days. If we deny it, contact the Virginia Attorney General.</p>
      ) : null}
      {canAppeal ? (
        <button type="button" className="btn primary stack-btn" onClick={() => api.go('appeals', { requestId: request.id })}>Appeal this decision</button>
      ) : null}
      {canWithdraw ? (
        <button type="button" className="btn ghost stack-btn" onClick={() => api.withdrawDeletion(request.id)}>Withdraw deletion request</button>
      ) : null}
      {request.type === 'Access' || request.type === 'Download' ? (
        <button type="button" className="btn line stack-btn" onClick={() => api.go('access')}>View the data</button>
      ) : null}
      <AttorneyGeneral onCopy={() => api.copy(AG_CONTACT, 'Attorney General contact copied.')} />
    </div>
  )
}

function Appeals({ api, initialId }) {
  const [requestId, setRequestId] = useState(initialId || api.requests[0]?.id || '')
  const [reason, setReason] = useState('')
  const selected = api.requests.find((item) => item.id === requestId)

  function onSubmit(event) {
    event.preventDefault()
    api.submitAppeal(requestId, reason)
  }

  return (
    <div>
      <p className="lede">Appeal a denied or partly denied request. We answer within 60 days. A granted opt-out does not need an appeal.</p>
      {api.requests.length === 0 ? (
        <div>
          <p className="note">You have no privacy requests yet. File one under Your data rights. If we deny it, the appeal form opens here.</p>
          <button type="button" className="btn line stack-btn" onClick={() => api.go('rights')}>Go to data rights</button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <label className="field">
            <span>Request</span>
            <select value={requestId} onChange={(event) => setRequestId(event.target.value)}>
              {api.requests.map((item) => (
                <option key={item.id} value={item.id}>{item.id} · {item.type} · {item.status}</option>
              ))}
            </select>
          </label>
          {selected ? <p className="sub">Current status: {selected.status}. {selected.detail}</p> : null}
          <label className="field">
            <span>Why this should change</span>
            <textarea rows={3} value={reason} onChange={(event) => setReason(event.target.value)} />
          </label>
          <button type="submit" className="btn primary stack-btn" disabled={selected?.status === 'Appeal received'}>
            {selected?.status === 'Appeal received' ? 'Appeal already received' : 'Submit appeal'}
          </button>
        </form>
      )}
      <div style={{ marginTop: 8 }}>
        <AttorneyGeneral onCopy={() => api.copy(AG_CONTACT, 'Attorney General contact copied.')} />
      </div>
    </div>
  )
}

function Support({ api }) {
  const [orderId, setOrderId] = useState('')
  const [orderResult, setOrderResult] = useState(null)
  const [orderError, setOrderError] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [topic, setTopic] = useState('Order')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')

  function lookup(event) {
    event.preventDefault()
    if (!orderId.trim()) {
      setOrderError('Enter an order number.')
      setOrderResult(null)
      return
    }
    const found = PURCHASES.find((order) => order.id.toLowerCase() === orderId.trim().toLowerCase())
    setOrderError(found ? '' : 'No Marlow order uses that number.')
    setOrderResult(found || null)
  }

  function sendNote(event) {
    event.preventDefault()
    if (message.trim().length < 8) {
      setMessageError('Write at least a short sentence.')
      return
    }
    api.addTicket(topic, message.trim())
    setMessage('')
    setMessageError('')
  }

  return (
    <div>
      <form onSubmit={lookup}>
        <label className="field">
          <span>Order number</span>
          <input value={orderId} onChange={(event) => setOrderId(event.target.value)} placeholder="MR-10482" />
        </label>
        {orderError ? <p className="error">{orderError}</p> : null}
        <button type="submit" className="btn primary stack-btn">Look up order</button>
      </form>
      <p className="fine">Try MR-10482 or MR-10311.</p>
      {orderResult ? (
        <div className="card">
          <h3>{orderResult.id}</h3>
          <p className="flat">{orderResult.status}</p>
          <p className="flat">{orderResult.detail}</p>
          {orderResult.id === OPEN_ORDER ? (
            <button type="button" className="btn small line" onClick={() => api.go('rights')}>See why deletion can be partial</button>
          ) : null}
        </div>
      ) : null}
      <div className="card">
        <h3>Common questions</h3>
        {FAQS.map((faq, index) => (
          <div key={faq.q}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={openFaq === index}
              onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            >
              {faq.q}
            </button>
            {openFaq === index ? <p className="faq-a">{faq.a}</p> : null}
          </div>
        ))}
      </div>
      <form onSubmit={sendNote}>
        <label className="field">
          <span>Topic</span>
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            {['Order', 'Return', 'Privacy request', 'Loyalty', 'Something else'].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Message to support@marlow.example</span>
          <textarea rows={3} value={message} onChange={(event) => setMessage(event.target.value)} />
        </label>
        {messageError ? <p className="error">{messageError}</p> : null}
        <button type="submit" className="btn primary stack-btn">Send note</button>
      </form>
      <div className="card" style={{ marginTop: 8 }}>
        <h3>Your notes</h3>
        {api.tickets.length === 0 ? <p className="sub">No notes sent yet.</p> : null}
        {api.tickets.map((ticket) => (
          <div className="line-item" key={ticket.id}>
            <span>{ticket.id} · {ticket.topic}<br />{ticket.message}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Richmond store</h3>
        <p className="flat">412 E Main Street, Richmond, VA 23219</p>
        <p className="flat">(804) 555-0198</p>
        <div className="mini-row">
          <button type="button" className="btn small ghost" onClick={() => api.copy('412 E Main Street, Richmond, VA 23219', 'Store address copied.')}>Copy address</button>
          <button type="button" className="btn small ghost" onClick={() => api.copy('(804) 555-0198', 'Phone number copied.')}>Copy phone</button>
        </div>
      </div>
    </div>
  )
}

function Terms({ api }) {
  return (
    <div>
      <div className="card">
        <h3>Orders</h3>
        <p className="flat">Prices are in US dollars. Virginia deliveries follow the store you select. Open orders finish even if you later opt out of advertising or request deletion of other data.</p>
      </div>
      <div className="card">
        <h3>Loyalty</h3>
        <p className="flat">Points and Gold status are part of a bona fide rewards program. They do not depend on allowing a sale of personal data or targeted advertising.</p>
      </div>
      <div className="card">
        <h3>Privacy</h3>
        <p className="flat">Virginia privacy rights are described in the privacy notice. These terms do not waive them.</p>
      </div>
      <div className="card">
        <h3>Virginia law</h3>
        <p className="flat">These terms are governed by Virginia law. Consumer privacy requests follow the Virginia Consumer Data Protection Act.</p>
      </div>
      <button type="button" className="btn line stack-btn" onClick={() => api.go('notice')}>Privacy notice</button>
      <button type="button" className="btn ghost stack-btn" onClick={() => api.go('rights')}>Your data rights</button>
    </div>
  )
}

function titleFor(route) {
  switch (route.name) {
    case 'gate': return 'Sign in'
    case 'home': return 'Account'
    case 'profile': return route.purpose === 'correct' ? 'Correct data' : 'Personal details'
    case 'security': return 'Security'
    case 'saved': return 'Saved shopping'
    case 'address': return route.id ? 'Edit address' : 'New address'
    case 'payment': return 'Add card'
    case 'notifications': return 'Notifications'
    case 'preferences': return 'Preferences'
    case 'loyalty': return 'Loyalty'
    case 'privacy': return 'Privacy choices'
    case 'notice': return 'Privacy notice'
    case 'rights': return 'Your data rights'
    case 'access': return 'Data we hold'
    case 'request': return 'Privacy request'
    case 'appeals': return 'Appeals'
    case 'support': return 'Help & support'
    case 'terms': return 'Terms of use'
    default: return 'Account'
  }
}

function ScreenBody({ route, api }) {
  switch (route.name) {
    case 'gate': return <Gate key={api.profile.email} api={api} />
    case 'home': return <Home api={api} />
    case 'profile': return <Profile key={route.purpose || 'edit'} api={api} purpose={route.purpose} />
    case 'security': return <Security api={api} />
    case 'saved': return <Saved api={api} />
    case 'address': return <AddressForm key={route.id || 'new'} api={api} id={route.id} />
    case 'payment': return <PaymentForm api={api} />
    case 'notifications': return <Notifications api={api} />
    case 'preferences': return <Preferences api={api} />
    case 'loyalty': return <Loyalty api={api} />
    case 'privacy': return <Privacy api={api} />
    case 'notice': return <Notice api={api} />
    case 'rights': return <Rights api={api} />
    case 'access': return <Access api={api} />
    case 'request': return <RequestView key={route.id} api={api} id={route.id} />
    case 'appeals': return <Appeals key={route.requestId || 'appeals'} api={api} initialId={route.requestId} />
    case 'support': return <Support api={api} />
    case 'terms': return <Terms api={api} />
    default: return <p className="lede">This page is unavailable.</p>
  }
}

export default function App() {
  const time = useClock()
  const bodyRef = useRef(null)
  const seq = useRef(2041)
  const [signedIn, setSignedIn] = useState(true)
  const [stack, setStack] = useState([{ name: 'home' }])
  const [toast, setToast] = useState(null)
  const [sheet, setSheet] = useState(null)
  const [password, setPassword] = useState('harbor418')
  const [deviceId, setDeviceId] = useState('A1B2-7F3C-91E0')
  const [profile, setProfile] = useState({
    firstName: 'Avery',
    lastName: 'Lang',
    email: 'avery.lang@email.com',
    phone: '(804) 555-0148',
    city: 'Richmond',
    state: 'VA',
  })
  const [addresses, setAddresses] = useState([
    { id: 'addr-1', label: 'Home', line: '418 Grove Ave', city: 'Richmond', state: 'VA', zip: '23220', isDefault: true },
    { id: 'addr-2', label: 'Studio', line: '12 E Cary St', city: 'Richmond', state: 'VA', zip: '23219', isDefault: false },
  ])
  const [payments, setPayments] = useState([
    { id: 'pay-1', brand: 'Visa', last4: '4242', exp: '08/28', name: 'Avery Lang', isDefault: true },
    { id: 'pay-2', brand: 'Mastercard', last4: '1881', exp: '02/27', name: 'Avery Lang', isDefault: false },
  ])
  const [savedItems, setSavedItems] = useState([
    { id: 'item-1', name: 'Linen throw', note: 'Natural' },
    { id: 'item-2', name: 'Oak cutting board', note: 'Large' },
    { id: 'item-3', name: 'Stoneware mug', note: 'Set of 2' },
  ])
  const [prefs, setPrefs] = useState({ store: 'Carytown', recommendations: true, receipts: true })
  const [notes, setNotes] = useState({
    orders: true,
    shipping: true,
    restock: true,
    priceDrop: true,
    loyalty: true,
    promoEmail: true,
    promoPush: false,
    signInAlerts: true,
    deviceUnlock: false,
  })
  const [privacy, setPrivacy] = useState({
    targetedAds: true,
    sale: true,
    profilingOptOut: false,
    universalSignal: false,
  })
  const [loyalty, setLoyalty] = useState({
    id: 'GLD-20418',
    tier: 'Gold',
    points: 2480,
    activity: [
      { id: 'loy-1', label: 'Order MR-10311', points: '+120' },
      { id: 'loy-2', label: 'Welcome bonus', points: '+500' },
    ],
  })
  const [sessions, setSessions] = useState([
    { id: 's1', name: 'This iPhone', place: 'Richmond, VA', current: true },
    { id: 's2', name: 'iPad', place: 'Richmond, VA', current: false },
  ])
  const [activity, setActivity] = useState({
    browsing: ['Carytown store page', 'Shipping & returns'],
    views: ['Linen throw', 'Oak cutting board', 'Ceramic pour-over'],
    searches: ['cedar candle', 'queen sheets'],
    cart: ['Stoneware mug × 2'],
  })
  const [requests, setRequests] = useState([])
  const [tickets, setTickets] = useState([])

  const route = stack[stack.length - 1]
  const publicRoute = route.name === 'gate' || route.name === 'privacy' || route.name === 'notice'
  const safeRoute = signedIn || publicRoute ? route : { name: 'gate' }

  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), 2800)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!sheet) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setSheet(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheet])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [safeRoute.name, safeRoute.id, safeRoute.purpose, safeRoute.requestId])

  function notify(text) {
    setToast({ text, id: Date.now() })
  }

  function go(name, extra = {}) {
    setStack((current) => [...current, { name, ...extra }])
  }

  function back() {
    setStack((current) => (current.length > 1 ? current.slice(0, -1) : current))
  }

  function copy(text, message) {
    copyText(text).then(() => notify(message)).catch(() => notify('Could not copy that.'))
  }

  function nextRequestId() {
    const id = `MR-PR-${seq.current}`
    seq.current += 1
    return id
  }

  function addRequest(partial) {
    const entry = { id: nextRequestId(), date: stamp(), ...partial }
    setRequests((list) => [entry, ...list])
    return entry
  }

  function updateRequest(id, patch) {
    setRequests((list) => list.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  function snapshot() {
    return {
      controller: 'Marlow Home Supply, LLC',
      generatedAt: stamp(),
      privacyChoices: {
        targetedAdvertisingAllowed: privacy.targetedAds,
        saleOfPersonalDataAllowed: privacy.sale,
        profilingForLegalOrSignificantEffects: 'not used',
        profilingOptOutRecorded: privacy.profilingOptOut,
        universalOptOutSignal: privacy.universalSignal,
      },
      account: profile,
      deviceIdentifier: deviceId,
      addresses,
      paymentMethods: payments.map(({ brand, last4, exp, name, isDefault }) => ({ brand, last4, exp, name, isDefault })),
      savedItems,
      loyalty,
      preferences: prefs,
      notifications: notes,
      activity,
      purchases: PURCHASES,
      inferredShoppingPreferences: INFERENCES,
      sessions: sessions.map(({ name, place, current }) => ({ name, place, current })),
      requests,
    }
  }

  function signIn(email, pw) {
    if (!email.trim() || !pw) return { form: 'Enter your email and password.' }
    if (email.trim().toLowerCase() !== profile.email.toLowerCase()) return { form: 'No Marlow account uses that email.' }
    if (pw !== password) return { form: 'That password does not match this account.' }
    setSignedIn(true)
    setStack([{ name: 'home' }])
    notify('Signed in.')
    return {}
  }

  function signOut() {
    setSignedIn(false)
    setStack([{ name: 'gate' }])
    setSheet(null)
    notify('Signed out. Sale and ad opt-outs still work without an account.')
  }

  function showGate() {
    setStack([{ name: 'gate' }])
  }

  function saveProfile(next, asRequest) {
    const fields = [
      ['firstName', 'first name'],
      ['lastName', 'last name'],
      ['email', 'email'],
      ['phone', 'phone'],
      ['city', 'city'],
      ['state', 'state'],
    ]
    const changed = fields.filter(([key]) => profile[key] !== next[key]).map(([, label]) => label)
    if (!changed.length) {
      notify(asRequest ? 'No inaccuracies to correct.' : 'No changes to save.')
      return
    }
    setProfile(next)
    if (asRequest) {
      const entry = addRequest({
        type: 'Correction',
        status: 'Completed',
        detail: `Updated ${changed.join(', ')}.`,
      })
      notify('Correction saved.')
      go('request', { id: entry.id })
      return
    }
    notify('Profile saved.')
    back()
  }

  function changePassword(current, next, confirm) {
    if (current !== password) return { current: 'That is not the current password.' }
    if (next.length < 8 || !/[A-Za-z]/.test(next) || !/\d/.test(next)) {
      return { next: 'Use 8 or more characters with a letter and a number.' }
    }
    if (next === current) return { next: 'Choose a different password.' }
    if (next !== confirm) return { confirm: 'Passwords do not match.' }
    setPassword(next)
    notify('Password updated.')
    return null
  }

  function toggleNote(key) {
    const labels = {
      signInAlerts: 'Sign-in alerts',
      deviceUnlock: 'Device unlock',
      orders: 'Order updates',
      shipping: 'Delivery alerts',
      restock: 'Back-in-stock alerts',
      priceDrop: 'Price-drop alerts',
      loyalty: 'Loyalty alerts',
      promoEmail: 'Promotional email',
      promoPush: 'Promotional push',
    }
    const value = !notes[key]
    setNotes((current) => ({ ...current, [key]: value }))
    notify(`${labels[key]} ${value ? 'on' : 'off'}.`)
  }

  function setStore(store) {
    setPrefs((current) => ({ ...current, store }))
    notify(`Preferred store set to ${store}.`)
  }

  function togglePref(key) {
    const value = !prefs[key]
    setPrefs((current) => ({ ...current, [key]: value }))
    notify(key === 'recommendations'
      ? `In-app recommendations ${value ? 'on' : 'off'}.`
      : `Email receipts ${value ? 'on' : 'off'}.`)
  }

  function setPrivacyFlag(key, value) {
    if (privacy.universalSignal) return
    setPrivacy((current) => ({ ...current, [key]: value }))
    if (key === 'targetedAds') {
      notify(value
        ? 'Targeted advertising is allowed again.'
        : 'You opted out of targeted advertising.')
    } else {
      notify(value
        ? 'Sale of personal data is allowed again.'
        : 'You opted out of the sale of personal data.')
    }
  }

  function optOutBoth() {
    if (privacy.universalSignal) {
      notify('A universal opt-out signal already covers sale and targeted advertising.')
      return
    }
    setPrivacy((current) => ({ ...current, targetedAds: false, sale: false }))
    notify('You opted out of sale and targeted advertising.')
  }

  function recordProfilingOptOut() {
    setPrivacy((current) => ({ ...current, profilingOptOut: true }))
    notify('Profiling opt-out recorded. Marlow does not use that processing.')
  }

  function enableSignal() {
    setPrivacy((current) => ({
      ...current,
      universalSignal: true,
      targetedAds: false,
      sale: false,
    }))
    notify('Universal opt-out signal applied. No account is required.')
  }

  function clearSignal() {
    setPrivacy((current) => ({ ...current, universalSignal: false }))
    notify('Signal cleared. Your opt-out stays until you turn a setting on.')
  }

  function rotateDevice() {
    const next = makeDeviceId()
    setDeviceId(next)
    notify('Device identifier replaced.')
  }

  function saveAddress(address, isNew) {
    setAddresses((list) => {
      const without = list.filter((item) => item.id !== address.id)
      const next = address.isDefault
        ? [...without.map((item) => ({ ...item, isDefault: false })), address]
        : [...without, address]
      if (!next.some((item) => item.isDefault) && next.length) {
        next[0] = { ...next[0], isDefault: true }
      }
      return next
    })
    notify(isNew ? 'Address added.' : 'Address updated.')
    back()
  }

  function makeDefaultAddress(id) {
    setAddresses((list) => list.map((item) => ({ ...item, isDefault: item.id === id })))
    notify('Default address updated.')
  }

  function removeAddress(id) {
    setAddresses((list) => {
      const next = list.filter((item) => item.id !== id)
      if (next.length && !next.some((item) => item.isDefault)) next[0] = { ...next[0], isDefault: true }
      return next
    })
    notify('Address removed.')
  }

  function makeDefaultPayment(id) {
    setPayments((list) => list.map((item) => ({ ...item, isDefault: item.id === id })))
    notify('Default card updated.')
  }

  function removePayment(id) {
    setPayments((list) => {
      const next = list.filter((item) => item.id !== id)
      if (next.length && !next.some((item) => item.isDefault)) next[0] = { ...next[0], isDefault: true }
      return next
    })
    notify('Card removed.')
  }

  function addPayment(card) {
    setPayments((list) => [...list, card])
    notify('Card saved with the last four digits only.')
    back()
  }

  function addSavedItem(name) {
    setSavedItems((list) => [...list, { id: `item-${Date.now()}`, name, note: '' }])
    notify(`${name} saved.`)
  }

  function removeSavedItem(id) {
    const item = savedItems.find((entry) => entry.id === id)
    setSavedItems((list) => list.filter((entry) => entry.id !== id))
    notify(item ? `${item.name} removed.` : 'Item removed.')
  }

  function removeActivity(group, index) {
    setActivity((current) => ({
      ...current,
      [group]: current[group].filter((_, itemIndex) => itemIndex !== index),
    }))
    notify('Removed from your account activity.')
  }

  function redeem() {
    if (loyalty.points < 500) {
      notify('You need 500 points to redeem.')
      return
    }
    setLoyalty((current) => ({
      ...current,
      points: current.points - 500,
      activity: [{ id: `loy-${Date.now()}`, label: '$5 reward redeemed', points: '−500' }, ...current.activity],
    }))
    notify('$5 reward redeemed. 500 points deducted.')
  }

  function openAccess() {
    const entry = addRequest({
      type: 'Access',
      status: 'Completed',
      detail: 'We showed the personal data held for this account.',
    })
    go('access', { requestId: entry.id })
  }

  function downloadData() {
    try {
      const entry = {
        id: nextRequestId(),
        date: stamp(),
        type: 'Download',
        status: 'Completed',
        detail: 'We prepared a portable JSON copy of your personal data.',
      }
      const file = snapshot()
      file.requests = [entry, ...requests]
      downloadJson('marlow-personal-data.json', file)
      setRequests((list) => [entry, ...list])
      notify('Portable copy downloaded.')
    } catch {
      notify('Could not prepare the download.')
    }
  }

  function submitDeletion() {
    const existing = findOpenDeletion(requests)
    if (existing) {
      notify('You already have an open deletion request.')
      go('request', { id: existing.id })
      return
    }
    const entry = addRequest({
      type: 'Deletion',
      status: 'Partly denied',
      detail: DELETION_DETAIL,
    })
    notify('Deletion request submitted.')
    go('request', { id: entry.id })
  }

  function askDeletion() {
    const existing = findOpenDeletion(requests)
    if (existing) {
      notify('You already have an open deletion request.')
      go('request', { id: existing.id })
      return
    }
    setSheet({
      title: 'Delete personal data?',
      paragraphs: [
        'We will queue deletion of your profile, device identifier, browsing activity, product views, search history, cart activity, saved items, loyalty activity, and inferred preferences.',
        `Purchase records needed for tax, warranty, and fraud prevention stay. The address and payment token needed to finish open order ${OPEN_ORDER} stay. That partial denial can be appealed.`,
        'You can withdraw the request while it is open.',
      ],
      confirmLabel: 'Submit request',
      danger: true,
      onConfirm: submitDeletion,
    })
  }

  function withdrawDeletion(id) {
    updateRequest(id, {
      status: 'Withdrawn',
      detail: 'You withdrew this deletion request. We will keep your account data.',
    })
    notify('Deletion request withdrawn. Your account data stays.')
  }

  function submitAppeal(id, reason) {
    const clean = reason.trim()
    if (clean.length < 10) {
      notify('Tell us a bit more in your appeal.')
      return
    }
    const request = requests.find((item) => item.id === id)
    if (!request) {
      notify('Choose a request.')
      return
    }
    if (request.status === 'Appeal received') {
      notify('We already have an appeal for this request.')
      return
    }
    if (request.status !== 'Partly denied' && request.status !== 'Denied') {
      notify(`This request is ${request.status}. You can appeal only if we deny it.`)
      return
    }
    updateRequest(id, { status: 'Appeal received', appealReason: clean, appealDate: stamp() })
    notify('Appeal received. We will respond within 60 days.')
  }

  function addTicket(topic, message) {
    const id = `MR-H-${seq.current}`
    seq.current += 1
    setTickets((list) => [{ id, topic, message, date: stamp() }, ...list])
    notify(`Note ${id} sent to Marlow support.`)
  }

  function askSignOut() {
    setSheet({
      title: 'Sign out?',
      paragraphs: ['You can still opt out of sale and targeted advertising on the sign-in screen. No account is required for that opt-out.'],
      confirmLabel: 'Sign out',
      danger: true,
      onConfirm: signOut,
    })
  }

  function askSignOutSession(session) {
    setSheet({
      title: `Sign out ${session.name}?`,
      paragraphs: [`${session.name} in ${session.place} will need a password to open Marlow again.`],
      confirmLabel: 'Sign out device',
      danger: true,
      onConfirm: () => {
        setSessions((list) => list.filter((item) => item.id !== session.id))
        notify(`${session.name} signed out.`)
      },
    })
  }

  function askRemoveAddress(address) {
    setSheet({
      title: `Remove ${address.label}?`,
      paragraphs: [`${address.line}, ${address.city}, ${address.state} ${address.zip} will leave saved shopping info.`],
      confirmLabel: 'Remove',
      danger: true,
      onConfirm: () => removeAddress(address.id),
    })
  }

  function askRemovePayment(card) {
    setSheet({
      title: 'Remove this card?',
      paragraphs: [`${card.brand} ending ${card.last4} will leave your account. Only the last four digits were stored.`],
      confirmLabel: 'Remove',
      danger: true,
      onConfirm: () => removePayment(card.id),
    })
  }

  const api = {
    profile,
    addresses,
    payments,
    savedItems,
    prefs,
    notes,
    privacy,
    loyalty,
    sessions,
    activity,
    requests,
    tickets,
    deviceId,
    signedIn,
    go,
    back,
    copy,
    signIn,
    showGate,
    saveProfile,
    changePassword,
    toggleNote,
    setStore,
    togglePref,
    setPrivacyFlag,
    optOutBoth,
    recordProfilingOptOut,
    enableSignal,
    clearSignal,
    rotateDevice,
    saveAddress,
    makeDefaultAddress,
    makeDefaultPayment,
    addPayment,
    addSavedItem,
    removeSavedItem,
    removeActivity,
    redeem,
    openAccess,
    downloadData,
    askDeletion,
    withdrawDeletion,
    submitAppeal,
    addTicket,
    askSignOut,
    askSignOutSession,
    askRemoveAddress,
    askRemovePayment,
    snapshot,
  }

  return (
    <div className="stage">
      <div className="device">
        <div className="screen">
          <div className="island" />
          <div className="status">
            <span>{time}</span>
            <StatusIcons />
          </div>
          <Header
            title={titleFor(safeRoute)}
            home={safeRoute.name === 'home' || safeRoute.name === 'gate'}
            onBack={back}
          />
          <div className="body" ref={bodyRef}>
            <ScreenBody route={safeRoute} api={api} />
          </div>
          <div className="home-bar" aria-hidden="true"><span /></div>
          {toast ? <div className="toast" role="status">{toast.text}</div> : null}
          {sheet ? (
            <div className="modal-layer">
              <button type="button" className="backdrop" aria-label="Close dialog" onClick={() => setSheet(null)} />
              <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
                <h3 id="sheet-title">{sheet.title}</h3>
                {sheet.paragraphs.map((paragraph) => <p className="flat" key={paragraph}>{paragraph}</p>)}
                <div className="actions">
                  <button type="button" className="btn ghost" onClick={() => setSheet(null)}>Cancel</button>
                  <button
                    type="button"
                    className={cx('btn', sheet.danger ? 'danger' : 'primary')}
                    onClick={() => {
                      const action = sheet.onConfirm
                      setSheet(null)
                      action()
                    }}
                  >
                    {sheet.confirmLabel}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
