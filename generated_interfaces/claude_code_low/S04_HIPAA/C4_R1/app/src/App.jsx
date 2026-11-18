import { useState } from 'react'

const CHANNELS = ['Text', 'Email', 'Push']

export default function App() {
  const [channel, setChannel] = useState('Text')
  const [reminders, setReminders] = useState(true)
  const [labAlerts, setLabAlerts] = useState(true)
  const [marketing, setMarketing] = useState(false) // optional, never pre-selected
  const [details, setDetails] = useState(false)
  const [result, setResult] = useState(null)

  const finish = (dest) => setResult({ dest, channel, reminders, labAlerts, marketing })

  return (
    <div className="stage">
      <div className="device">
        <div className="notch" />
        {result ? (
          <div className="screen done">
            <div className="check">✓</div>
            <h1>You're all set</h1>
            <p className="sub">
              {result.dest === 'book' ? 'Taking you to book your first virtual visit.' : 'Taking you to your portal home.'}
            </p>
            <ul className="summary">
              <li>Contact via: {result.channel}</li>
              <li>Appointment reminders: {result.reminders ? 'On' : 'Off'}</li>
              <li>Lab result alerts: {result.labAlerts ? 'On' : 'Off'}</li>
              <li>Marketing sharing: {result.marketing ? 'Authorized' : 'Not authorized'}</li>
            </ul>
            <button className="secondary" onClick={() => setResult(null)}>Back to setup</button>
          </div>
        ) : (
          <div className="screen">
            <div className="progress" aria-label="Step 3 of 3">
              <span /><span /><span className="on" />
            </div>
            <h1>Almost done</h1>
            <p className="sub">Choose how we reach you about your care.</p>

            <div className="label">Preferred contact method</div>
            <div className="seg" role="radiogroup">
              {CHANNELS.map((c) => (
                <button key={c} role="radio" aria-checked={channel === c}
                  className={channel === c ? 'active' : ''} onClick={() => setChannel(c)}>{c}</button>
              ))}
            </div>

            <Row title="Appointment reminders" desc="Visit times and join links" on={reminders} set={setReminders} />
            <Row title="Lab result alerts" desc="Notice only; details stay in the app" on={labAlerts} set={setLabAlerts} />

            <div className="optbox">
              <Row
                title="Optional: marketing authorization"
                desc="Allow sharing my portal activity with advertising partners for promotions."
                on={marketing} set={setMarketing} flush
              />
              <button className="link" onClick={() => setDetails(!details)} aria-expanded={details}>
                {details ? 'Hide details' : 'What does this mean?'}
              </button>
              {details && (
                <p className="fine">
                  Off by default. Saying no does not affect your care, appointments, or access. If you say yes,
                  your name and portal activity may be shared with advertising platforms. You can revoke this
                  anytime in Settings › Privacy.
                </p>
              )}
            </div>

            <div className="spacer" />
            <button className="primary" onClick={() => finish('book')}>Continue to book a visit</button>
            <button className="link center" onClick={() => finish('home')}>Skip booking, go to portal</button>
            <p className="legal">Your health information is protected under HIPAA.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Row({ title, desc, on, set, flush }) {
  return (
    <div className={'row' + (flush ? ' flush' : '')}>
      <div className="rt">
        <div className="t">{title}</div>
        <div className="d">{desc}</div>
      </div>
      <button className={'switch' + (on ? ' on' : '')} role="switch" aria-checked={on}
        aria-label={title} onClick={() => set(!on)}><i /></button>
    </div>
  )
}
