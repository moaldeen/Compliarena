import { useState } from "react";
import "./App.css";

const PROBLEM = { left: 2, right: 3, answer: 5 };
const CHOICES = [4, 5, 6];

function Mascot({ mood }) {
  return (
    <svg className="mascot" viewBox="0 0 220 180" aria-hidden="true">
      <ellipse cx="110" cy="168" rx="54" ry="8" fill="#e7d3b4" />
      <path d="M40 92c0-40 30-68 70-68s70 28 70 68v28H40V92z" fill="#7c5cbf" />
      <path d="M58 78c8-28 28-44 52-44" fill="none" stroke="#c8b4f0" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="78" cy="96" rx="26" ry="30" fill="#fff8ee" />
      <ellipse cx="142" cy="96" rx="26" ry="30" fill="#fff8ee" />
      <circle cx="78" cy="98" r="10" fill="#243043" />
      <circle cx="142" cy="98" r="10" fill="#243043" />
      <circle cx="81" cy="95" r="3.5" fill="#fff" />
      <circle cx="145" cy="95" r="3.5" fill="#fff" />
      <path d="M98 112 l12 10 12-10" fill="#f2a03a" />
      <path d={mood === "cheer" ? "M92 128 Q110 142 128 128" : "M96 130 h28"} fill="none" stroke="#5b3d91" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 86 l-18 22 28 4z" fill="#f2a03a" />
      <path d="M192 86 l18 22-28 4z" fill="#f2a03a" />
      <path d="M86 36 l8-22 10 16" fill="#ffe08a" />
      <path d="M118 30 l6-18 12 16" fill="#ffe08a" />
      <g fontFamily="Trebuchet MS, Segoe UI, sans-serif" fontWeight="700" fontSize="18" fill="#5b3d91">
        <text x="18" y="40">+2</text>
        <text x="176" y="48">3</text>
        <text x="168" y="150">=</text>
      </g>
    </svg>
  );
}

function PrivacyNotice({ onClose }) {
  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
      <h2 id="privacy-title">Children's Privacy Notice</h2>
      <p className="sheet-kicker">Online notice of information practices · COPPA</p>
      <div className="sheet-body">
        <p>
          Owlculus is a math game for children. The operator is Owlculus Studio. Parents can reach us at privacy@owlculus.example.
        </p>
        <p>
          This first-launch screen does not ask for a name, email, photo, precise location, or any other personal information. The app does not read persistent device identifiers, IP addresses, or geolocation, and it does not send information to advertising or analytics networks.
        </p>
        <p>
          We do not disclose children's personal information to third parties. Play does not require a child to share personal information. Parents may review or delete information, or refuse further collection, by contacting privacy@owlculus.example. There is nothing stored from this screen to review.
        </p>
        <p>
          If a future feature ever needs personal information, we will ask a parent first and update this notice before collection starts.
        </p>
      </div>
      <button type="button" className="primary" onClick={onClose}>
        Back to Owlculus
      </button>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("land");
  const [picked, setPicked] = useState(null);
  const [notice, setNotice] = useState(false);

  function start() {
    setPicked(null);
    setNotice(false);
    setView("play");
  }

  function reset() {
    setPicked(null);
    setNotice(false);
    setView("land");
  }

  const solved = picked === PROBLEM.answer;

  return (
    <main className="stage">
      <div className="phone">
        <div className="ear" aria-hidden="true" />
        <div className="screen">
          {notice ? (
            <PrivacyNotice onClose={() => setNotice(false)} />
          ) : view === "land" ? (
            <section className="land">
              <p className="brand-mark">Math play</p>
              <h1>Owlculus</h1>
              <p className="tagline">Short puzzles that make numbers feel friendly.</p>
              <Mascot mood="calm" />
              <button type="button" className="primary" onClick={start}>
                Get Started
              </button>
              <button type="button" className="text-link" onClick={() => setNotice(true)}>
                Children's Privacy Notice
              </button>
            </section>
          ) : (
            <section className="play">
              <div className="play-top">
                <button type="button" className="text-link back" onClick={reset}>
                  Home
                </button>
                <p className="brand-mark">First puzzle</p>
              </div>
              <Mascot mood={solved ? "cheer" : "calm"} />
              <p className="prompt">
                {solved ? "Nice work. 2 + 3 is 5." : "What is 2 + 3?"}
              </p>
              <div className="choices" role="group" aria-label="Answer choices">
                {CHOICES.map((choice) => {
                  let state = "";
                  if (picked !== null && choice === PROBLEM.answer) state = "good";
                  else if (picked === choice) state = "miss";
                  return (
                    <button
                      key={choice}
                      type="button"
                      className={`choice ${state}`}
                      onClick={() => setPicked(choice)}
                      aria-pressed={picked === choice}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
              <button type="button" className="primary" onClick={solved ? reset : start} disabled={!solved && picked === null}>
                {solved ? "Back to start" : "Try again"}
              </button>
              <button type="button" className="text-link" onClick={() => setNotice(true)}>
                Children's Privacy Notice
              </button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
