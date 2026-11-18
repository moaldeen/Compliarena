import { useEffect, useState } from 'react'

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d.map((p, i) => <path key={i} d={p} />)}
  </svg>
)
const icons = {
  lock: ['M6 11h12v9H6z', 'M8 11V8a4 4 0 0 1 8 0v3'],
  key: ['M15 7a4 4 0 1 1-3.5 5.9L4 20v-3l2-1v-2l2-1 3.6-3.6A4 4 0 0 1 15 7z'],
  face: ['M4 8V5a1 1 0 0 1 1-1h3', 'M16 4h3a1 1 0 0 1 1 1v3', 'M20 16v3a1 1 0 0 1-1 1h-3', 'M8 20H5a1 1 0 0 1-1-1v-3', 'M9 10v1', 'M15 10v1', 'M9.5 15c1.5 1.3 3.5 1.3 5 0'],
  finger: ['M6 10a6 6 0 0 1 12 0v2', 'M9 20c-1-2-1-4-1-6a4 4 0 0 1 8 0c0 3 .5 4.5 1.5 6', 'M12 12v3c0 2 .5 3.5 1 5'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'],
}

const Row = ({ icon, title, sub, children, onClick }) => {
  const inner = (
    <>
      <div className="ico"><Icon d={icons[icon]} /></div>
      <div className="txt"><b>{title}</b><span>{sub}</span></div>
      {children}
    </>
  )
  return onClick
    ? <button className="row" onClick={onClick}>{inner}</button>
    : <div className="row">{inner}</div>
}

const Switch = ({ on, onChange, label, disabled }) => (
  <button className={'switch' + (on ? ' on' : '')} role="switch" aria-checked={on}
    aria-label={label} disabled={disabled} onClick={() => onChange(!on)} />
)

export default function App() {
  const [password, setPassword] = useState('Secure#2024')
  const [passwordLogin, setPasswordLogin] = useState(true)
  const [faceId, setFaceId] = useState(false)
  const [fingerprint, setFingerprint] = useState(false)
  const [defaultMethod, setDefaultMethod] = useState('password')
  const [consent, setConsent] = useState(false)
  const [sheet, setSheet] = useState(null) // 'password' | 'privacy' | 'test'
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ cur: '', next: '', conf: '' })
  const [testPw, setTestPw] = useState('')
  const [err, setErr] = useState('')

  const bioOn = faceId || fingerprint

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const closeSheet = () => { setSheet(null); setErr(''); setForm({ cur: '', next: '', conf: '' }); setTestPw('') }

  const toggleBio = (setter, name) => (v) => {
    if (v && !consent) { setSheet('privacy'); return }
    setter(v)
    if (!v && defaultMethod === 'biometric' && !(name === 'Face ID' ? fingerprint : faceId)) setDefaultMethod('password')
    setToast(`${name} ${v ? 'enabled' : 'disabled'}`)
  }

  const togglePasswordLogin = (v) => {
    if (!v && !bioOn) { setToast('Enable biometrics before turning off password'); return }
    setPasswordLogin(v)
    if (!v) setDefaultMethod('biometric')
  }

  const grantConsent = () => {
    setConsent(true)
    setFaceId(true)
    setSheet(null)
    setToast('Consent saved · Face ID enabled')
  }

  const withdraw = () => {
    setConsent(false); setFaceId(false); setFingerprint(false)
    setDefaultMethod('password'); setPasswordLogin(true)
    closeSheet(); setToast('Consent withdrawn · biometrics off')
  }

  const savePassword = () => {
    if (form.cur !== password) return setErr('Current password is incorrect')
    if (form.next.length < 8) return setErr('Use at least 8 characters')
    if (form.next !== form.conf) return setErr('Passwords do not match')
    setPassword(form.next); closeSheet(); setToast('Password updated')
  }

  const runTest = () => {
    if (defaultMethod === 'password') {
      if (testPw === password) { closeSheet(); setToast('Sign-in test successful') }
      else setErr('Incorrect password')
    }
  }

  const available = (m) => (m === 'password' ? passwordLogin : bioOn)

  return (
    <div className="device">
      <div className="screen">
        <div className="notch" />
        <div className="status"><span>9:41</span><span>●●●● 100%</span></div>

        <div className="header">
          <h1>Sign-in &amp; Security</h1>
          <p>Choose how you access your accounts.</p>
        </div>

        <div className="body">
          <div className="label">Password</div>
          <div className="card">
            <Row icon="lock" title="Password login" sub={passwordLogin ? 'Enabled' : 'Disabled'}>
              <Switch on={passwordLogin} onChange={togglePasswordLogin} label="Password login" />
            </Row>
            <Row icon="key" title="Change password" sub="Update your sign-in password" onClick={() => setSheet('password')}>
              <span className="chev">›</span>
            </Row>
          </div>

          <div className="label">Biometrics</div>
          <div className="card">
            <Row icon="face" title="Face ID" sub="Sign in with your face">
              <Switch on={faceId} onChange={toggleBio(setFaceId, 'Face ID')} label="Face ID" />
            </Row>
            <Row icon="finger" title="Fingerprint" sub="Sign in with your fingerprint">
              <Switch on={fingerprint} onChange={toggleBio(setFingerprint, 'Fingerprint')} label="Fingerprint" />
            </Row>
          </div>

          <div className="label">Default sign-in</div>
          <div className="card">
            <div className="seg">
              {['password', 'biometric'].map((m) => (
                <button key={m} className={defaultMethod === m ? 'active' : ''} disabled={!available(m)}
                  onClick={() => setDefaultMethod(m)}>
                  {m === 'password' ? 'Password' : 'Biometric'}
                </button>
              ))}
            </div>
          </div>

          <div className="notice">
            <b>Your biometric data:</b> to verify you, it is stored and shared with
            third-party verification services. Enabling is optional; you can withdraw
            consent anytime. <button className="notice-link" style={{ all: 'unset', color: '#1f4fd8', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => setSheet('privacy')}>Details</button>
          </div>
        </div>

        <div className="footer">
          <button className="btn" onClick={() => setSheet('test')}>Test sign-in</button>
          <button className="btn ghost" disabled={!consent} onClick={withdraw}
            style={{ opacity: consent ? 1 : .4 }}>Withdraw biometric consent</button>
        </div>

        {toast && <div className="toast" role="status">{toast}</div>}

        {sheet && (
          <div className="overlay" onClick={closeSheet}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}>
              {sheet === 'password' && (
                <>
                  <h2>Change password</h2>
                  {[['cur', 'Current password'], ['next', 'New password'], ['conf', 'Confirm new password']].map(([k, l]) => (
                    <label className="field" key={k}>{l}
                      <input type="password" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                    </label>
                  ))}
                  <div className="err">{err}</div>
                  <button className="btn" onClick={savePassword}>Save password</button>
                  <button className="btn ghost" onClick={closeSheet}>Cancel</button>
                </>
              )}
              {sheet === 'privacy' && (
                <>
                  <h2>Biometric data consent</h2>
                  <p>If you enable Face ID or fingerprint sign-in, your biometric data is collected and stored by the bank,
                    and shared with third-party verification network providers solely to verify your identity.
                    Biometrics are optional — password sign-in always remains available. You can withdraw consent
                    at any time from this screen.</p>
                  <label className="check">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                    I understand and agree to this collection, storage and sharing.
                  </label>
                  <button className="btn" disabled={!consent} onClick={grantConsent}>Agree &amp; enable Face ID</button>
                  <button className="btn ghost" onClick={() => { setConsent(false); closeSheet() }}>Not now</button>
                </>
              )}
              {sheet === 'test' && (
                <>
                  <h2>Test {defaultMethod === 'password' ? 'password' : 'biometric'} sign-in</h2>
                  {defaultMethod === 'password' ? (
                    <>
                      <label className="field">Password
                        <input type="password" value={testPw} onChange={(e) => setTestPw(e.target.value)} />
                      </label>
                      <div className="err">{err}</div>
                      <button className="btn" onClick={runTest}>Sign in</button>
                    </>
                  ) : (
                    <>
                      <p>Simulated prompt: authenticate with {faceId ? 'Face ID' : 'your fingerprint'}.</p>
                      <button className="btn" onClick={() => { closeSheet(); setToast('Biometric sign-in successful') }}>Authenticate</button>
                    </>
                  )}
                  <button className="btn ghost" onClick={closeSheet}>Cancel</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
