import { useEffect, useRef, useState } from "react";

const LEGAL_NAME = "Alexandra Chen";
const DOB = "Mar 14, 1992";
const MRN = "4821";
const CLINICIAN = "Dr. Priya Shah";

const CONTACTS = [
  { id: "portal", label: "Portal", route: "portal inbox" },
  { id: "text", label: "Text", route: "text" },
  { id: "email", label: "Email", route: "email" },
];

const REASONS = [
  { id: "primary", short: "Primary care", label: "Primary care" },
  { id: "followup", short: "Follow-up", label: "Follow-up visit" },
  { id: "mental", short: "Mental health", label: "Mental health" },
  { id: "refill", short: "Rx refill", label: "Prescription refill" },
];

const WINDOWS = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];

const SLOTS = [
  { id: "t1", label: "Today", time: "2:10 PM" },
  { id: "t2", label: "Tomorrow", time: "9:40 AM" },
  { id: "t3", label: "Thu", time: "4:15 PM" },
];

const REPLIES = [
  {
    text: "That time works for me.",
    answer: "Good. Hold a time on the visit card when you are ready.",
  },
  {
    text: "I need an earlier visit.",
    answer: "Dr. Shah often has a same-day opening. Check the visit card.",
  },
  {
    text: "I have a scheduling question.",
    answer: "This thread is for scheduling. Clinical questions wait for the visit.",
  },
];

function findById(list, id) {
  return list.find((item) => item.id === id) || list[0];
}

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="6" fill="#145e57" />
      <path
        d="M5 15h14M7 15l5-6 5 6"
        fill="none"
        stroke="#f3e6cf"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="status">
      <span className="island" aria-hidden="true" />
      <span className="time">9:41</span>
      <span className="status-icons" aria-hidden="true">
        <span className="sig">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="bat">
          <i />
        </span>
      </span>
    </div>
  );
}

function Progress({ view, saved, onIdentity, onProfile, onPortal }) {
  const portalClass = view === "portal" ? "now" : saved ? "done" : "todo";
  const profileClass = view === "setup" ? "now" : "done";
  const items = [
    { label: "Identity", className: "done", onClick: onIdentity },
    { label: "Profile", className: profileClass, onClick: onProfile },
    { label: "Portal", className: portalClass, onClick: onPortal },
  ];
  return (
    <div className="progress" role="group" aria-label="Setup progress">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={item.className}
          aria-current={item.className === "now" ? "step" : undefined}
          onClick={item.onClick}
        >
          <span className="dot" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Switch({ label, on, onToggle }) {
  return (
    <button
      type="button"
      className={on ? "switch on" : "switch"}
      role="switch"
      aria-checked={on}
      onClick={onToggle}
    >
      <strong>{label}</strong>
      <span className="knob" aria-hidden="true">
        <i />
      </span>
    </button>
  );
}

function Sheet({ title, children, onClose }) {
  return (
    <div className="sheet-back" onClick={onClose} role="presentation">
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function TileIcon({ name }) {
  if (name === "messages") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M2 3.5h12v7H8l-3 2.5V10.5H2v-7z"
          fill="none"
          stroke="#145e57"
          strokeWidth="1.4"
        />
      </svg>
    );
  }
  if (name === "refills") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <rect x="5" y="2" width="6" height="12" rx="2" fill="none" stroke="#145e57" strokeWidth="1.4" />
        <path d="M6.5 8h3M8 6.5v3" stroke="#145e57" strokeWidth="1.4" />
      </svg>
    );
  }
  if (name === "labs") {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M6 2h4M7 2.5v4L3.5 13h9L9 6.5v-4" fill="none" stroke="#145e57" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="5.5" r="2.2" fill="none" stroke="#145e57" strokeWidth="1.4" />
      <path d="M3.5 13c.7-2.2 2.2-3.3 4.5-3.3S12.3 10.8 13 13" fill="none" stroke="#145e57" strokeWidth="1.4" />
    </svg>
  );
}

export default function App() {
  const nameRef = useRef(null);
  const [view, setView] = useState("setup");
  const [name, setName] = useState("Alex");
  const [contact, setContact] = useState("portal");
  const [reason, setReason] = useState("primary");
  const [visitWindow, setVisitWindow] = useState("morning");
  const [reminders, setReminders] = useState(true);
  const [labAlerts, setLabAlerts] = useState(true);
  const [promo, setPromo] = useState(false);
  const [consent, setConsent] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [error, setError] = useState("");
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [refill, setRefill] = useState("none");
  const [messages, setMessages] = useState([
    {
      from: "team",
      text: "Identity check complete. You can book a video visit with Dr. Shah.",
    },
  ]);
  const [msgIndex, setMsgIndex] = useState(0);

  const contactMeta = findById(CONTACTS, contact);
  const reasonMeta = findById(REASONS, reason);
  const windowMeta = findById(WINDOWS, visitWindow);
  const greeting = name.trim() || "there";
  const reminderLabel = `${contactMeta.label} reminders`;

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") setSheet(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function show(message) {
    setToast(message);
  }

  function goProfile() {
    setSheet(null);
    setView("setup");
  }

  function goPortal() {
    setSheet(null);
    setView("portal");
    if (!profileSaved) {
      show("Visits stay locked until you save.");
    }
  }

  function explainStep() {
    if (view === "setup") {
      show("Identity is done. This step is your profile.");
      return;
    }
    show(profileSaved ? "Profile saved. You are in the portal." : "Portal is open. Visits are still locked.");
  }

  function handleContinue(event) {
    event.preventDefault();
    if (!name.trim()) {
      setError("Enter a preferred name.");
      return;
    }
    if (!consent) {
      setError("Agree to a video visit to continue.");
      return;
    }
    setError("");
    setProfileSaved(true);
    setView("portal");
    show("Profile saved. You can book a visit.");
  }

  function browse() {
    setView("portal");
    show(profileSaved ? "Back in the portal." : "Visits stay locked until you save.");
  }

  function chooseContact(id) {
    const next = findById(CONTACTS, id);
    setContact(next.id);
    show(`Reminders route: ${next.route}.`);
  }

  function chooseReason(id) {
    const next = findById(REASONS, id);
    setReason(next.id);
    show(`Visit focus: ${next.label}.`);
  }

  function chooseWindow(id) {
    const next = findById(WINDOWS, id);
    setVisitWindow(next.id);
    show(`Preferred window: ${next.label}.`);
  }

  function toggleReminders() {
    setReminders((value) => !value);
    show(reminders ? "Visit reminders off." : "Visit reminders on.");
  }

  function toggleLabs() {
    setLabAlerts((value) => !value);
    show(labAlerts ? "Lab alerts off." : "Lab alerts on.");
  }

  function togglePromo() {
    setPromo((value) => !value);
    show(promo ? "Promotional notes off." : "General clinic news on.");
  }

  function openSlots() {
    if (!profileSaved) {
      setSheet("locked");
      return;
    }
    setSheet("slots");
  }

  function book(slot) {
    if (appointment?.id === slot.id) {
      setSheet(null);
      show("That time is already held.");
      return;
    }
    setAppointment(slot);
    setSheet(null);
    show(`Held ${slot.label} ${slot.time}.`);
  }

  function releaseVisit() {
    setAppointment(null);
    setSheet(null);
    show("That time was released.");
  }

  function editName() {
    setSheet(null);
    setView("setup");
    setTimeout(() => nameRef.current?.focus(), 0);
  }

  function prevMsg() {
    if (msgIndex <= 0) {
      show("This is the first note.");
      return;
    }
    setMsgIndex(msgIndex - 1);
  }

  function nextMsg() {
    if (msgIndex >= messages.length - 1) {
      show("This is the latest note.");
      return;
    }
    setMsgIndex(msgIndex + 1);
  }

  function jumpLatest() {
    if (msgIndex >= messages.length - 1) {
      show("This is the latest note.");
      return;
    }
    setMsgIndex(messages.length - 1);
  }

  function sendReply(reply) {
    const next = [
      ...messages,
      { from: "you", text: reply.text },
      { from: "team", text: reply.answer },
    ];
    setMessages(next);
    setMsgIndex(next.length - 1);
  }

  function requestRefill() {
    setRefill("pending");
    show("Refill review requested.");
  }

  function cancelRefill() {
    setRefill("none");
    show("Refill request canceled.");
  }

  const note = messages[Math.min(msgIndex, messages.length - 1)];

  return (
    <div className="stage">
      <div className="phone">
        <div className="screen">
          <StatusBar />
          <div className="view">
            {view === "setup" && (
              <form className="setup" onSubmit={handleContinue}>
                <div className="toprow">
                  <button
                    type="button"
                    className="wordmark"
                    onClick={() => setSheet("about")}
                    aria-label="About Northline"
                  >
                    <Mark />
                    Northline
                  </button>
                  <button type="button" className="step-label" onClick={explainStep}>
                    Step 2 of 3
                  </button>
                </div>
                <Progress
                  view={view}
                  saved={profileSaved}
                  onIdentity={() => setSheet("identity")}
                  onProfile={goProfile}
                  onPortal={goPortal}
                />
                <div className="heading">
                  <p className="kicker">Identity verified</p>
                  <h1>Finish profile</h1>
                  <p className="subline">Next: book your first video visit.</p>
                </div>
                <label className="field">
                  <span className="lbl">Preferred name</span>
                  <input
                    ref={nameRef}
                    value={name}
                    maxLength={16}
                    autoComplete="given-name"
                    aria-invalid={error === "Enter a preferred name."}
                    className={error === "Enter a preferred name." ? "bad" : undefined}
                    placeholder="Name clinicians use"
                    onChange={(event) => {
                      setName(event.target.value.slice(0, 16));
                      setError("");
                    }}
                  />
                </label>
                <button type="button" className="id-btn" onClick={() => setSheet("identity")}>
                  <span className="seal" aria-hidden="true">
                    <svg width="10" height="10" viewBox="0 0 10 10">
                      <path d="M2 5.2 4 7.2 8 2.8" fill="none" stroke="white" strokeWidth="1.4" />
                    </svg>
                  </span>
                  {LEGAL_NAME} · ID verified
                </button>
                <div className="block">
                  <span className="lbl">How we reach you</span>
                  <div className="seg" role="group" aria-label="Contact method">
                    {CONTACTS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={contact === item.id}
                        onClick={() => chooseContact(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="block">
                  <span className="lbl">Visit focus</span>
                  <div className="chips" role="group" aria-label="Visit focus">
                    {REASONS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={reason === item.id}
                        aria-label={item.label}
                        onClick={() => chooseReason(item.id)}
                      >
                        {item.short}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="block">
                  <span className="lbl">Visit window</span>
                  <div className="seg" role="group" aria-label="Visit window">
                    {WINDOWS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={visitWindow === item.id}
                        onClick={() => chooseWindow(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Switch label={reminderLabel} on={reminders} onToggle={toggleReminders} />
                <label className="consent">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setError("");
                    }}
                  />
                  <span>I agree to a non-urgent video visit.</span>
                </label>
                <p className="error" role={error ? "alert" : undefined}>
                  {error || "\u00a0"}
                </p>
                <div className="spacer" />
                <button className="btn primary full" type="submit">
                  Continue
                </button>
                <div className="linkrow">
                  <button type="button" onClick={browse}>
                    {profileSaved ? "Portal" : "Browse"}
                  </button>
                  <span aria-hidden="true">·</span>
                  <button type="button" onClick={() => setSheet("privacy")}>
                    Privacy
                  </button>
                  <span aria-hidden="true">·</span>
                  <button type="button" onClick={() => setSheet("emergency")}>
                    Emergency
                  </button>
                </div>
              </form>
            )}

            {view === "portal" && (
              <div className="portal">
                <div className="toprow">
                  <button
                    type="button"
                    className="wordmark"
                    onClick={() => setSheet("about")}
                    aria-label="About Northline"
                  >
                    <Mark />
                    Northline
                  </button>
                  <button type="button" className="step-label" onClick={explainStep}>
                    Step 3 of 3
                  </button>
                </div>
                <Progress
                  view={view}
                  saved={profileSaved}
                  onIdentity={() => setSheet("identity")}
                  onProfile={goProfile}
                  onPortal={goPortal}
                />
                <h1>Hello, {greeting}</h1>
                {!profileSaved && (
                  <button type="button" className="banner" onClick={goProfile}>
                    Profile not saved. Tap to unlock visits.
                  </button>
                )}
                <button type="button" className="reminder-line" onClick={toggleReminders}>
                  {reminders ? `${reminderLabel} on` : "Reminders off"} · tap to change
                </button>
                <section className="card">
                  <p className="kicker">First video visit</p>
                  {appointment ? (
                    <>
                      <h2>
                        {appointment.label} · {appointment.time}
                      </h2>
                      <p className="meta">
                        {CLINICIAN} · {reasonMeta.short}
                      </p>
                      <div className="card-actions">
                        <button type="button" className="btn secondary" onClick={openSlots}>
                          Change time
                        </button>
                        <button type="button" className="btn secondary" onClick={() => setSheet("release")}>
                          Release
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>{reasonMeta.short}</h2>
                      <p className="meta">
                        {windowMeta.label} · {CLINICIAN}
                      </p>
                      <button type="button" className="btn primary full" onClick={openSlots}>
                        Choose a time
                      </button>
                    </>
                  )}
                </section>
                <div className="tiles">
                  <button type="button" className="tile" onClick={() => setView("messages")}>
                    <span className="tile-top">
                      <TileIcon name="messages" />
                      Messages
                    </span>
                    <small>{messages.length} notes</small>
                  </button>
                  <button type="button" className="tile" onClick={() => setView("refills")}>
                    <span className="tile-top">
                      <TileIcon name="refills" />
                      Refills
                    </span>
                    <small>{refill === "pending" ? "Review pending" : "None on file"}</small>
                  </button>
                  <button type="button" className="tile" onClick={() => setView("labs")}>
                    <span className="tile-top">
                      <TileIcon name="labs" />
                      Labs
                    </span>
                    <small>{labAlerts ? "Alerts on" : "Alerts off"}</small>
                  </button>
                  <button type="button" className="tile" onClick={() => setView("team")}>
                    <span className="tile-top">
                      <TileIcon name="team" />
                      Clinician
                    </span>
                    <small>{CLINICIAN}</small>
                  </button>
                </div>
                <div className="spacer" />
                <button type="button" className="btn ghost full" onClick={goProfile}>
                  Edit profile
                </button>
              </div>
            )}

            {view === "messages" && (
              <div className="sub">
                <div className="subhead">
                  <button type="button" className="back" onClick={() => setView("portal")}>
                    Back
                  </button>
                  <button type="button" className="text-btn" onClick={() => setSheet("about")}>
                    About
                  </button>
                </div>
                <h1>Messages</h1>
                <div className={note.from === "you" ? "bubble you" : "bubble team"}>
                  <span className="who">{note.from === "you" ? "You" : "Care team"}</span>
                  {note.text}
                </div>
                <div className="pager">
                  <button type="button" onClick={prevMsg}>
                    Previous
                  </button>
                  <button type="button" className="text-btn" onClick={jumpLatest}>
                    {msgIndex + 1} of {messages.length}
                  </button>
                  <button type="button" onClick={nextMsg}>
                    Next
                  </button>
                </div>
                <div className="replies">
                  {REPLIES.map((reply) => (
                    <button
                      key={reply.text}
                      type="button"
                      className="reply"
                      onClick={() => sendReply(reply)}
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {view === "refills" && (
              <div className="sub">
                <div className="subhead">
                  <button type="button" className="back" onClick={() => setView("portal")}>
                    Back
                  </button>
                </div>
                <h1>Refills</h1>
                <p className="empty">
                  {refill === "pending"
                    ? "A clinician will review your refill request."
                    : "No prescriptions are on file yet."}
                </p>
                <div className="push">
                  {refill === "pending" ? (
                    <button type="button" className="btn secondary full" onClick={cancelRefill}>
                      Cancel request
                    </button>
                  ) : (
                    <button type="button" className="btn primary full" onClick={requestRefill}>
                      Request a refill review
                    </button>
                  )}
                </div>
              </div>
            )}

            {view === "labs" && (
              <div className="sub">
                <div className="subhead">
                  <button type="button" className="back" onClick={() => setView("portal")}>
                    Back
                  </button>
                </div>
                <h1>Lab results</h1>
                <p className="empty">No results yet. New results stay in your chart.</p>
                <Switch
                  label={labAlerts ? "Lab alerts on" : "Lab alerts off"}
                  on={labAlerts}
                  onToggle={toggleLabs}
                />
                <div className="push">
                  <button type="button" className="btn secondary full" onClick={() => setSheet("privacy")}>
                    Privacy choices
                  </button>
                </div>
              </div>
            )}

            {view === "team" && (
              <div className="sub">
                <div className="subhead">
                  <button type="button" className="back" onClick={() => setView("portal")}>
                    Back
                  </button>
                </div>
                <h1>Care team</h1>
                <div className="clinician">
                  <span className="avatar">PS</span>
                  <div>
                    <strong>{CLINICIAN}</strong>
                    <span>Family medicine</span>
                  </div>
                </div>
                <p className="empty">
                  Usually sees patients in the {windowMeta.label.toLowerCase()}.
                </p>
                <div className="push">
                  <button type="button" className="btn secondary full" onClick={() => setView("messages")}>
                    Message care team
                  </button>
                  <button type="button" className="btn primary full" onClick={openSlots}>
                    Book with Dr. Shah
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="home-indicator" aria-hidden="true">
            <span />
          </div>

          {toast && (
            <button type="button" className="toast" onClick={() => setToast("")}>
              {toast}
            </button>
          )}

          {sheet === "about" && (
            <Sheet title="About Northline" onClose={() => setSheet(null)}>
              <p>Northline is your clinic portal for scheduled video visits.</p>
              <button type="button" className="btn primary full" onClick={() => setSheet(null)}>
                Done
              </button>
            </Sheet>
          )}

          {sheet === "identity" && (
            <Sheet title="Verified identity" onClose={() => setSheet(null)}>
              <ul className="facts">
                <li>Legal name: {LEGAL_NAME}</li>
                <li>Date of birth: {DOB}</li>
                <li>Record: ••••{MRN}</li>
                <li>Preferred name: {greeting}</li>
              </ul>
              <p>Photo ID matched this record. Mobile and email match registration.</p>
              <button type="button" className="btn secondary full" onClick={editName}>
                Edit preferred name
              </button>
              <button type="button" className="btn primary full" onClick={() => setSheet(null)}>
                Done
              </button>
            </Sheet>
          )}

          {sheet === "privacy" && (
            <Sheet title="Privacy choices" onClose={() => setSheet(null)}>
              <p>Visit details, messages, and results stay in your chart.</p>
              <Switch
                label={labAlerts ? "Lab alerts on" : "Lab alerts off"}
                on={labAlerts}
                onToggle={toggleLabs}
              />
              <Switch
                label={promo ? "Clinic news on" : "Clinic news off"}
                on={promo}
                onToggle={togglePromo}
              />
              <p>
                {promo
                  ? "You will get general Northline news. Chart details are not included."
                  : "Promotional notes are off. Care messages still follow your reminder setting."}
              </p>
              <button type="button" className="btn primary full" onClick={() => setSheet(null)}>
                Done
              </button>
            </Sheet>
          )}

          {sheet === "emergency" && (
            <Sheet title="Emergency help" onClose={() => setSheet(null)}>
              <p>If you may be in danger, call 911. Northline cannot contact emergency services for you.</p>
              <button type="button" className="btn primary full" onClick={() => setSheet(null)}>
                Done
              </button>
            </Sheet>
          )}

          {sheet === "locked" && (
            <Sheet title="Save your profile" onClose={() => setSheet(null)}>
              <p>Booking opens after you save a preferred name and agree to a video visit.</p>
              <button type="button" className="btn primary full" onClick={goProfile}>
                Finish profile
              </button>
              <button type="button" className="btn ghost full" onClick={() => setSheet(null)}>
                Keep browsing
              </button>
            </Sheet>
          )}

          {sheet === "slots" && (
            <Sheet title="Open times" onClose={() => setSheet(null)}>
              <p>
                {reasonMeta.label} · {windowMeta.label} · {CLINICIAN}
              </p>
              {SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  className={appointment?.id === slot.id ? "choice on" : "choice"}
                  onClick={() => book(slot)}
                >
                  <b>
                    {slot.label} · {slot.time}
                  </b>
                  <span>{appointment?.id === slot.id ? "Held" : "Hold"}</span>
                </button>
              ))}
              <button type="button" className="btn ghost full" onClick={() => setSheet(null)}>
                Close
              </button>
            </Sheet>
          )}

          {sheet === "release" && (
            <Sheet title="Release this time?" onClose={() => setSheet(null)}>
              <p>
                {appointment ? `${appointment.label} · ${appointment.time}` : "No time is held."} with {CLINICIAN}.
              </p>
              <button type="button" className="btn secondary full" onClick={() => setSheet(null)}>
                Keep this time
              </button>
              <button type="button" className="btn primary full" onClick={releaseVisit}>
                Release time
              </button>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
}
