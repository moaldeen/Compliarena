import { useEffect, useMemo, useRef, useState } from "react";
import { KIN, KinFace, kinById } from "./kin.jsx";
import { FOCUS, makeRound, roundNote } from "./questions.js";
import { findByEmail, loadProfiles, upsertProfile } from "./storage.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[A-Za-z0-9]{3,14}$/;

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function newId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `kin-${Date.now()}`;
}

function Hint({ error, children }) {
  return <p className={error ? "hint bad" : "hint"}>{error || children || " "}</p>;
}

export default function App() {
  const scrollerRef = useRef(null);
  const [time, setTime] = useState(() => formatTime(new Date()));
  const [mode, setMode] = useState("create");
  const [rulesOpen, setRulesOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [kinId, setKinId] = useState("");
  const [focusId, setFocusId] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [signInEmail, setSignInEmail] = useState("");
  const [signInError, setSignInError] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [returnMode, setReturnMode] = useState("create");

  useEffect(() => {
    const timer = setInterval(() => setTime(formatTime(new Date())), 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    scrollerRef.current?.scrollTo?.(0, 0);
  }, [mode, rulesOpen]);

  const kin = kinById(kinId);
  const focus = FOCUS.find((item) => item.id === focusId) || null;
  const editing = mode === "edit";

  const scoreLine = useMemo(() => {
    if (!profile || profile.lastScore == null) return "Warm-up waiting.";
    return `Last round ${profile.lastScore}/3 · Best ${profile.bestScore}/3`;
  }, [profile]);

  function openMode(next) {
    setErrors({});
    setSignInError("");
    setMode(next);
  }

  function openSignIn() {
    setReturnMode(mode);
    openMode("signin");
  }

  function validateProfile(nextUsername, nextEmail, nextKin, nextFocus, nextAgreed) {
    const nextErrors = {};
    const cleanName = nextUsername.trim();
    const cleanEmail = nextEmail.trim();
    const profiles = loadProfiles();
    const ignoreId = editing ? profile?.id : null;

    if (!cleanName) nextErrors.username = "Add a username.";
    else if (!NAME_PATTERN.test(cleanName)) nextErrors.username = "Use 3–14 letters or numbers.";
    else if (profiles.some((item) => item.username.toLowerCase() === cleanName.toLowerCase() && item.id !== ignoreId)) {
      nextErrors.username = "That username is already in use.";
    }

    if (!cleanEmail) nextErrors.email = "Add an email.";
    else if (!EMAIL_PATTERN.test(cleanEmail)) nextErrors.email = "That email does not look right.";
    else if (profiles.some((item) => item.email.toLowerCase() === cleanEmail.toLowerCase() && item.id !== ignoreId)) {
      nextErrors.email = "That email is already in use.";
    }

    if (!nextKin) nextErrors.kin = "Choose a kin.";
    if (!nextFocus) nextErrors.focus = "Choose a practice track.";
    if (!nextAgreed) nextErrors.rules = "Agree to the house rules.";
    return nextErrors;
  }

  function onCreate(event) {
    event.preventDefault();
    const nextErrors = validateProfile(username, email, kinId, focusId, agreed);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    let saved;
    try {
      saved = upsertProfile({
        id: editing && profile ? profile.id : newId(),
        username: username.trim(),
        email: email.trim(),
        kinId,
        focusId,
        bestScore: profile?.bestScore || 0,
        lastScore: profile?.lastScore ?? null,
      });
    } catch {
      setErrors({ form: "This browser could not keep the profile." });
      return;
    }
    setProfile(saved);
    openMode("done");
  }

  function onSignIn(event) {
    event.preventDefault();
    const clean = signInEmail.trim();
    if (!EMAIL_PATTERN.test(clean)) {
      setSignInError("Enter the email on your profile.");
      return;
    }
    const found = findByEmail(clean);
    if (!found) {
      setSignInError("No profile uses that email yet.");
      return;
    }
    setProfile(found);
    setUsername(found.username);
    setEmail(found.email);
    setKinId(found.kinId);
    setFocusId(found.focusId);
    setAgreed(true);
    openMode("done");
  }

  function openEdit() {
    if (!profile) return;
    setUsername(profile.username);
    setEmail(profile.email);
    setKinId(profile.kinId);
    setFocusId(profile.focusId);
    setAgreed(true);
    openMode("edit");
  }

  function startQuiz() {
    if (!profile) return;
    setQuiz({
      problems: makeRound(profile.focusId),
      index: 0,
      score: 0,
      picked: null,
      done: false,
    });
    openMode("quiz");
  }

  function pickAnswer(choice) {
    if (!quiz || quiz.picked != null || quiz.done) return;
    const problem = quiz.problems[quiz.index];
    const correct = choice === problem.answer;
    setQuiz((current) => ({
      ...current,
      picked: choice,
      score: current.score + (correct ? 1 : 0),
    }));
  }

  function nextQuestion() {
    if (!quiz || quiz.picked == null) return;
    const last = quiz.index >= quiz.problems.length - 1;
    if (last && profile) {
      const bestScore = Math.max(profile.bestScore || 0, quiz.score);
      const nextProfile = { ...profile, bestScore, lastScore: quiz.score };
      try {
        upsertProfile(nextProfile);
        setProfile(nextProfile);
      } catch {
        setProfile(nextProfile);
      }
      setQuiz((current) => ({ ...current, done: true, picked: null }));
      return;
    }
    setQuiz((current) => ({
      ...current,
      index: current.index + 1,
      picked: null,
    }));
  }

  const activeProfileKin = kinById(profile?.kinId);
  const activeFocus = FOCUS.find((item) => item.id === profile?.focusId);

  return (
    <main className="stage">
      <div className="phone">
        <span className="camera" aria-hidden="true" />
        <section className="screen" aria-label="Oddkin profile">
          <div className="status">
            <span>{time}</span>
            <span className="battery" aria-hidden="true"><span /></span>
          </div>

          <div className="screen-body" ref={scrollerRef}>
            {mode === "done" && profile && activeProfileKin && activeFocus ? (
              <Ready
                profile={profile}
                kin={activeProfileKin}
                focus={activeFocus}
                scoreLine={scoreLine}
                onQuiz={startQuiz}
                onEdit={openEdit}
              />
            ) : null}

            {mode === "quiz" && quiz && activeProfileKin && activeFocus ? (
              <Quiz
                quiz={quiz}
                kin={activeProfileKin}
                focus={activeFocus}
                onPick={pickAnswer}
                onNext={nextQuestion}
                onAgain={startQuiz}
                onBack={() => openMode("done")}
              />
            ) : null}

            {mode === "signin" ? (
              <SignIn
                email={signInEmail}
                error={signInError}
                onChange={(value) => {
                  setSignInEmail(value);
                  setSignInError("");
                }}
                onSubmit={onSignIn}
                onCreate={() => openMode(returnMode)}
              />
            ) : null}

            {mode === "create" || mode === "edit" ? (
              <form className="form-grid" onSubmit={onCreate} noValidate>
                <div className="brand">
                  <span className="seal" aria-hidden="true">∑</span>
                  <span>Oddkin</span>
                </div>
                <h1>{editing ? "Edit profile" : "Create your profile"}</h1>
                <p className="lede">A name, a kin, and an email.</p>

                <label className="field">
                  <span className="label">Username</span>
                  <input
                    className={errors.username ? "input bad" : "input"}
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setErrors((current) => ({ ...current, username: "" }));
                    }}
                    placeholder="NumberNib"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    maxLength={14}
                    aria-invalid={Boolean(errors.username)}
                  />
                  <Hint error={errors.username}>3–14 letters or numbers.</Hint>
                </label>

                <div className="field">
                  <span className="label">Your kin</span>
                  <div className="kin-grid">
                    {KIN.map((item) => {
                      const selected = item.id === kinId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="kin-btn"
                          aria-pressed={selected}
                          aria-label={`${item.name}. ${item.trait}`}
                          onClick={() => {
                            setKinId(item.id);
                            setErrors((current) => ({ ...current, kin: "" }));
                          }}
                        >
                          <span className="kin-face">
                            <KinFace id={item.id} decorative />
                          </span>
                          <span className="kin-name">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <Hint error={errors.kin}>
                    {kin ? `${kin.name} · ${kin.trait}` : "Tap a kin to choose."}
                  </Hint>
                </div>

                <label className="field">
                  <span className="label">Email</span>
                  <input
                    className={errors.email ? "input bad" : "input"}
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({ ...current, email: "" }));
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-invalid={Boolean(errors.email)}
                  />
                  <Hint error={errors.email}>Keeps this profile yours.</Hint>
                </label>

                <div className="field">
                  <span className="label">Practice</span>
                  <div className="chips">
                    {FOCUS.map((item) => {
                      const selected = item.id === focusId;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className="chip"
                          aria-pressed={selected}
                          onClick={() => {
                            setFocusId(item.id);
                            setErrors((current) => ({ ...current, focus: "" }));
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                  <Hint error={errors.focus}>
                    {focus ? `Warm-ups use ${focus.blurb}.` : "Choose one track."}
                  </Hint>
                </div>

                <div className="check">
                  <input
                    id="house-rules"
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => {
                      setAgreed(event.target.checked);
                      setErrors((current) => ({ ...current, rules: "" }));
                    }}
                  />
                  <label htmlFor="house-rules">I agree to the house rules.</label>
                  <button type="button" className="link" onClick={() => setRulesOpen(true)}>
                    Read
                  </button>
                </div>
                {errors.rules || errors.form ? (
                  <p className="hint bad">{errors.rules || errors.form}</p>
                ) : null}

                <button className="primary" type="submit">
                  {editing ? "Update profile" : "Create profile"}
                </button>
                <button className="text-btn" type="button" onClick={openSignIn}>
                  I already have a profile
                </button>
              </form>
            ) : null}
          </div>

          <div className="home" aria-hidden="true" />

          {rulesOpen ? (
            <div className="scrim" onClick={() => setRulesOpen(false)} role="presentation">
              <div
                className="sheet"
                role="dialog"
                aria-modal="true"
                aria-labelledby="rules-title"
                onClick={(event) => event.stopPropagation()}
              >
                <h2 id="rules-title">House rules</h2>
                <ul>
                  <li>Be kind in every challenge.</li>
                  <li>Keep this profile for yourself.</li>
                  <li>Choose a friendly username.</li>
                </ul>
                <button
                  className="primary"
                  type="button"
                  onClick={() => {
                    setAgreed(true);
                    setErrors((current) => ({ ...current, rules: "" }));
                    setRulesOpen(false);
                  }}
                >
                  I will play fair
                </button>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function Ready({ profile, kin, focus, scoreLine, onQuiz, onEdit }) {
  return (
    <div className="ready">
      <div className="brand">
        <span className="seal" aria-hidden="true">∑</span>
        <span>Oddkin</span>
      </div>
      <div className="hero-face">
        <KinFace id={kin.id} />
      </div>
      <h1>You are in, {profile.username}.</h1>
      <p className="quiet">{kin.name} is ready for {focus.blurb}.</p>
      <p className="email-line">{profile.email}</p>
      <p className="meta">{scoreLine}</p>
      <div className="stack">
        <button className="primary" type="button" onClick={onQuiz}>Play a warm-up</button>
        <button className="secondary" type="button" onClick={onEdit}>Edit profile</button>
      </div>
    </div>
  );
}

function Quiz({ quiz, kin, focus, onPick, onNext, onAgain, onBack }) {
  if (quiz.done) {
    return (
      <div className="quiz">
        <p className="label">Warm-up</p>
        <div className="hero-face hero-face-small">
          <KinFace id={kin.id} />
        </div>
        <h1 className="center">{quiz.score} of 3</h1>
        <p className="quiet center">{roundNote(quiz.score)}</p>
        <div className="stack">
          <button className="primary" type="button" onClick={onAgain}>Play again</button>
          <button className="secondary" type="button" onClick={onBack}>Back to profile</button>
        </div>
      </div>
    );
  }

  const problem = quiz.problems[quiz.index];
  return (
    <div className="quiz">
      <div className="back-row">
        <button className="text-btn" type="button" onClick={onBack}>Back</button>
      </div>
      <p className="label">Warm-up {quiz.index + 1} of 3</p>
      <p className="quiet">{kin.name} · {focus.label}</p>
      <div className="prompt-card">
        <p className="prompt">{problem.prompt}</p>
      </div>
      <div className="choices">
        {problem.choices.map((choice) => {
          let tone = "";
          if (quiz.picked != null) {
            if (choice === problem.answer) tone = " good";
            else if (choice === quiz.picked) tone = " bad";
            else tone = " dim";
          }
          return (
            <button
              key={String(choice)}
              type="button"
              className={`choice${tone}`}
              onClick={() => onPick(choice)}
            >
              {choice}
            </button>
          );
        })}
      </div>
      <p className="feedback" aria-live="polite">
        {quiz.picked == null
          ? "Tap an answer."
          : quiz.picked === problem.answer
            ? "Yes, that is right."
            : `The answer is ${problem.answer}.`}
      </p>
      <button className="primary" type="button" disabled={quiz.picked == null} onClick={onNext}>
        {quiz.index === quiz.problems.length - 1 ? "See score" : "Next"}
      </button>
    </div>
  );
}

function SignIn({ email, error, onChange, onSubmit, onCreate }) {
  return (
    <form className="stack" onSubmit={onSubmit} noValidate>
      <div className="back-row">
        <button className="text-btn" type="button" onClick={onCreate}>Back</button>
      </div>
      <div className="brand">
        <span className="seal" aria-hidden="true">∑</span>
        <span>Oddkin</span>
      </div>
      <h1>Welcome back</h1>
      <p className="lede">Enter the email on your profile.</p>
      <label className="field">
        <span className="label">Email</span>
        <input
          className={error ? "input bad" : "input"}
          type="email"
          inputMode="email"
          value={email}
          onChange={(event) => onChange(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={Boolean(error)}
        />
        <Hint error={error}>We will open the matching profile.</Hint>
      </label>
      <button className="primary" type="submit">Find my profile</button>
    </form>
  );
}
