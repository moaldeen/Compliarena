import { useState } from 'react'

const STORE_KEY = 'shop_consent_v1'

const CATEGORIES = [
  {
    id: 'analytics',
    title: 'Analytics',
    short: 'Measure items viewed and how you use the app.',
    more: 'Stores identifiers on your device and reads app interaction signals (screens, items viewed, shopping activity) so we and our measurement partners can understand and improve the app.',
  },
  {
    id: 'advertising',
    title: 'Personalised ads',
    short: 'Use your activity and ad ID to show relevant ads.',
    more: 'Uses your Android advertising ID and shopping signals (purchase intent, retargeting) to show you tailored ads. Without it you still see ads, but they are not personalised.',
  },
  {
    id: 'sharing',
    title: 'Sharing with partners',
    short: 'Send ad and analytics signals to third parties.',
    more: 'Allows us to share identifiers and interaction signals with third-party advertising and measurement partners. Requires the matching category above to be on to have any effect.',
  },
]

const NONE = { analytics: false, advertising: false, sharing: false }

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY))
  } catch {
    return null
  }
}

export default function App() {
  const saved = load()
  const [choices, setChoices] = useState(saved?.choices || NONE)
  const [done, setDone] = useState(Boolean(saved))
  const [open, setOpen] = useState(null)
  const [page, setPage] = useState(null)

  const commit = (c) => {
    setChoices(c)
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ choices: c, at: new Date().toISOString() })
      )
    } catch {}
    setDone(true)
  }

  const acceptAll = () => commit({ analytics: true, advertising: true, sharing: true })
  const rejectAll = () => commit(NONE)
  const toggle = (id) => setChoices((c) => ({ ...c, [id]: !c[id] }))
  const reset = () => {
    try {
      localStorage.removeItem(STORE_KEY)
    } catch {}
    setChoices(NONE)
    setDone(false)
    setOpen(null)
  }

  let body
  if (page === 'privacy') {
    body = (
      <div className="screen">
        <h1>Privacy &amp; cookies</h1>
        <div className="doc">
          <p>
            We store and access information on your device (local storage, tracking and advertising
            identifiers, app interaction signals) only with your consent, except for what is strictly
            necessary to run the app, such as your basket, language and this choice.
          </p>
          <p>
            Optional uses: measuring browsing and shopping activity, retargeting, personalised ads,
            and sharing signals with advertising and measurement partners.
          </p>
          <p>
            You can refuse without any impact on shopping, and change or withdraw your choice at any
            time from Settings &gt; Privacy choices.
          </p>
        </div>
        <button className="btn secondary" onClick={() => setPage(null)}>
          Back
        </button>
      </div>
    )
  } else if (done) {
    body = (
      <div className="screen">
        <div className="check" aria-hidden="true">✓</div>
        <h1 className="center">Choices saved</h1>
        <ul className="summary">
          <li><span>Essential</span><b>Always on</b></li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <span>{c.title}</span>
              <b className={choices[c.id] ? 'on' : 'off'}>{choices[c.id] ? 'On' : 'Off'}</b>
            </li>
          ))}
        </ul>
        <button className="btn primary" onClick={() => alert('Entering the shop home page…')}>
          Start shopping
        </button>
        <button className="btn secondary" onClick={reset}>
          Change my choices
        </button>
      </div>
    )
  } else {
    body = (
      <div className="screen">
        <h1>Your privacy choices</h1>
        <p className="lead">
          We’d like to use technologies on your device to measure and advertise. You decide — shopping
          works the same either way.
        </p>

        <div className="list">
          <div className="row locked">
            <div className="txt">
              <strong>Essential</strong>
              <span>Basket, language, security and saving this choice.</span>
            </div>
            <span className="badge">Always on</span>
          </div>

          {CATEGORIES.map((c) => (
            <div className="row" key={c.id}>
              <div className="txt">
                <strong>{c.title}</strong>
                <span>{open === c.id ? c.more : c.short}</span>
                <button
                  className="link small"
                  aria-expanded={open === c.id}
                  onClick={() => setOpen(open === c.id ? null : c.id)}
                >
                  {open === c.id ? 'Less' : 'More info'}
                </button>
              </div>
              <button
                role="switch"
                aria-checked={choices[c.id]}
                aria-label={c.title}
                className={'switch' + (choices[c.id] ? ' on' : '')}
                onClick={() => toggle(c.id)}
              >
                <i />
              </button>
            </div>
          ))}
        </div>

        <div className="actions">
          <div className="pair">
            <button className="btn secondary" onClick={rejectAll}>Reject all</button>
            <button className="btn secondary" onClick={acceptAll}>Accept all</button>
          </div>
          <button className="btn primary" onClick={() => commit(choices)}>
            Save my choices
          </button>
          <p className="foot">
            Change anytime in Settings.{' '}
            <button className="link" onClick={() => setPage('privacy')}>Privacy policy</button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="stage">
      <div className="device">
        <div className="notch" />
        <div className="status"><span>9:41</span><span>●●● ▮</span></div>
        {body}
        <div className="home-bar" />
      </div>
    </div>
  )
}
