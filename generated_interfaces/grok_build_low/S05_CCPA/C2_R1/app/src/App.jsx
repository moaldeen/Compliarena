import { useEffect, useMemo, useState } from "react";
import "./App.css";

const STORES = [
  "Santa Monica",
  "Hayes Valley",
  "Sacramento",
  "San Diego",
];

const TITLES = {
  home: "Account",
  profile: "Personal details",
  prefs: "App preferences",
  notes: "Notifications",
  addresses: "Saved addresses",
  payments: "Payment methods",
  security: "Sign-in & security",
  password: "Password",
  privacy: "Your privacy choices",
  request: "California request",
  notice: "Notice at collection",
  policy: "Privacy policy",
  terms: "Terms of use",
  support: "Help & contact",
  delete: "Delete account",
};

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M7.5 4.5 13 10l-5.5 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="status" aria-hidden="true">
      <span>9:41</span>
      <span className="status-icons">
        <svg viewBox="0 0 18 12" width="16" height="11">
          <rect x="0" y="7" width="3" height="5" rx="0.6" fill="currentColor" />
          <rect x="5" y="4.5" width="3" height="7.5" rx="0.6" fill="currentColor" />
          <rect x="10" y="2" width="3" height="10" rx="0.6" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.35" />
        </svg>
        <svg viewBox="0 0 16 12" width="15" height="11">
          <path
            d="M8 2.2c2.3 0 4.4.9 6 2.4l-1.2 1.3A6.6 6.6 0 0 0 8 4.2 6.6 6.6 0 0 0 3.2 5.9L2 4.6A8.4 8.4 0 0 1 8 2.2Zm0 3.2c1.3 0 2.5.5 3.4 1.3L10.2 8A3.2 3.2 0 0 0 8 7.2 3.2 3.2 0 0 0 5.8 8L4.6 6.7A4.9 4.9 0 0 1 8 5.4ZM8 9.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
            fill="currentColor"
          />
        </svg>
        <svg viewBox="0 0 25 12" width="24" height="11">
          <rect x="0.6" y="0.6" width="21" height="10.8" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="2" y="2" width="14" height="8" rx="1.2" fill="currentColor" />
          <path d="M23 4.2v3.6c.8-.3 1.4-1 1.4-1.8S23.8 4.5 23 4.2Z" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function Toggle({ on, label, onToggle }) {
  return (
    <button
      type="button"
      className={on ? "switch on" : "switch"}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
    >
      <span className="knob" />
    </button>
  );
}

function NavRow({ title, sub, onClick, tone }) {
  return (
    <button type="button" className={tone ? `navrow ${tone}` : "navrow"} onClick={onClick}>
      <span className="navcopy">
        <strong>{title}</strong>
        {sub ? <em>{sub}</em> : null}
      </span>
      <Chevron />
    </button>
  );
}

function ToggleRow({ title, sub, on, onToggle }) {
  return (
    <div className="trow">
      <span className="navcopy">
        <strong>{title}</strong>
        {sub ? <em>{sub}</em> : null}
      </span>
      <Toggle on={on} label={title} onToggle={onToggle} />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

export default function App() {
  const [stack, setStack] = useState(["home"]);
  const [toast, setToast] = useState("");
  const [signedOut, setSignedOut] = useState(false);
  const [confirmOut, setConfirmOut] = useState(false);
  const [profile, setProfile] = useState({
    name: "Avery Marlow",
    email: "avery.marlow@email.com",
    phone: "(415) 555-0148",
  });
  const [draft, setDraft] = useState(profile);
  const [profileError, setProfileError] = useState("");
  const [prefs, setPrefs] = useState({
    store: "Santa Monica",
    haptics: true,
    reduceMotion: false,
    recent: true,
  });
  const [notes, setNotes] = useState({
    orders: true,
    delivery: true,
    loyalty: true,
    promos: false,
  });
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", line: "1842 Oak Ave", city: "Santa Monica", zip: "90405", def: true },
    { id: 2, label: "Work", line: "88 Market St", city: "San Francisco", zip: "94105", def: false },
  ]);
  const [addrForm, setAddrForm] = useState(null);
  const [addrError, setAddrError] = useState("");
  const [cards, setCards] = useState([
    { id: 1, brand: "Visa", last4: "4242", exp: "08/28", def: true },
    { id: 2, brand: "Mastercard", last4: "1881", exp: "02/27", def: false },
  ]);
  const [cardForm, setCardForm] = useState(false);
  const [cardDraft, setCardDraft] = useState({ brand: "Visa", last4: "", exp: "" });
  const [cardError, setCardError] = useState("");
  const [security, setSecurity] = useState({ biometrics: true, twoFactor: false });
  const [sessionsCleared, setSessionsCleared] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [privacy, setPrivacy] = useState({
    doNotSellOrShare: false,
    limitSensitive: false,
  });
  const [request, setRequest] = useState({
    type: "access",
    detail: "",
  });
  const [requestSent, setRequestSent] = useState(false);
  const [faq, setFaq] = useState(null);
  const [ticket, setTicket] = useState({ topic: "Order", message: "" });
  const [ticketSent, setTicketSent] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletionPending, setDeletionPending] = useState(false);

  const view = stack[stack.length - 1];

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const push = (next) => {
    setStack((prev) => [...prev, next]);
    if (next === "profile") {
      setDraft(profile);
      setProfileError("");
    }
    if (next === "password") {
      setPw({ current: "", next: "", confirm: "" });
      setPwError("");
    }
    if (next === "delete") {
      setDeleteText("");
      setDeleteError("");
    }
  };

  const back = () => setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const privacySummary = useMemo(() => {
    if (privacy.doNotSellOrShare && privacy.limitSensitive) {
      return "Sale/share off · location limited";
    }
    if (privacy.doNotSellOrShare) return "Sale and share is off";
    if (privacy.limitSensitive) return "Precise location limited";
    return "Advertising share is on";
  }, [privacy]);

  const saveProfile = (event) => {
    event.preventDefault();
    const name = draft.name.trim();
    const email = draft.email.trim();
    const phone = draft.phone.trim();
    if (name.length < 2) {
      setProfileError("Enter the name on your account.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError("Enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setProfileError("Enter a 10-digit phone number.");
      return;
    }
    setProfile({ name, email, phone });
    setProfileError("");
    setToast("Profile saved");
    back();
  };

  const saveAddress = (event) => {
    event.preventDefault();
    const label = addrForm.label.trim();
    const line = addrForm.line.trim();
    const city = addrForm.city.trim();
    const zip = addrForm.zip.trim();
    if (!label || !line || !city) {
      setAddrError("Label, street, and city are required.");
      return;
    }
    if (!/^\d{5}$/.test(zip)) {
      setAddrError("Use a 5-digit ZIP code.");
      return;
    }
    if (addrForm.id) {
      setAddresses((list) =>
        list.map((item) => (item.id === addrForm.id ? { ...item, label, line, city, zip } : item))
      );
      setToast("Address updated");
    } else {
      setAddresses((list) => [
        ...list,
        { id: Date.now(), label, line, city, zip, def: list.length === 0 },
      ]);
      setToast("Address added");
    }
    setAddrForm(null);
    setAddrError("");
  };

  const makeDefaultAddress = (id) => {
    setAddresses((list) => list.map((item) => ({ ...item, def: item.id === id })));
    setToast("Default address updated");
  };

  const removeAddress = (id) => {
    setAddresses((list) => {
      const next = list.filter((item) => item.id !== id);
      if (next.length && !next.some((item) => item.def)) next[0] = { ...next[0], def: true };
      return next;
    });
    setToast("Address removed");
  };

  const saveCard = (event) => {
    event.preventDefault();
    if (!/^\d{4}$/.test(cardDraft.last4)) {
      setCardError("Enter the last 4 digits only.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDraft.exp)) {
      setCardError("Expiration must look like 08/28.");
      return;
    }
    setCards((list) => [
      ...list,
      {
        id: Date.now(),
        brand: cardDraft.brand,
        last4: cardDraft.last4,
        exp: cardDraft.exp,
        def: list.length === 0,
      },
    ]);
    setCardDraft({ brand: "Visa", last4: "", exp: "" });
    setCardForm(false);
    setCardError("");
    setToast("Card saved on this device");
  };

  const makeDefaultCard = (id) => {
    setCards((list) => list.map((item) => ({ ...item, def: item.id === id })));
    setToast("Default card updated");
  };

  const removeCard = (id) => {
    setCards((list) => {
      const next = list.filter((item) => item.id !== id);
      if (next.length && !next.some((item) => item.def)) next[0] = { ...next[0], def: true };
      return next;
    });
    setToast("Card removed");
  };

  const savePassword = (event) => {
    event.preventDefault();
    if (pw.current.length < 8) {
      setPwError("Current password must be at least 8 characters.");
      return;
    }
    if (pw.next.length < 8) {
      setPwError("New password must be at least 8 characters.");
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwError("New passwords do not match.");
      return;
    }
    if (pw.next === pw.current) {
      setPwError("Choose a different password.");
      return;
    }
    setPwError("");
    setToast("Password updated");
    back();
  };

  const submitRequest = (event) => {
    event.preventDefault();
    if (request.type === "correct" && request.detail.trim().length < 8) {
      setToast("Describe what we should correct");
      return;
    }
    setRequestSent(true);
    setToast("Request received · ref CA-20418");
  };

  const submitTicket = (event) => {
    event.preventDefault();
    if (ticket.message.trim().length < 8) {
      setToast("Add a few more details");
      return;
    }
    setTicketSent(true);
    setTicket({ topic: "Order", message: "" });
    setToast("Message sent to SOLA Care");
  };

  const confirmDelete = (event) => {
    event.preventDefault();
    if (deleteText !== "DELETE") {
      setDeleteError('Type DELETE to confirm.');
      return;
    }
    setDeletionPending(true);
    setDeleteError("");
    setToast("Deletion scheduled for 14 days");
    setStack(["home"]);
  };

  const body = () => {
    if (view === "home") {
      return (
        <div className="stack">
          <button type="button" className="profile" onClick={() => push("profile")}>
            <span className="avatar">{initials(profile.name)}</span>
            <span className="navcopy">
              <strong>{profile.name}</strong>
              <em>Gold · ID 48291 · {profile.email}</em>
            </span>
            <Chevron />
          </button>
          {deletionPending ? (
            <div className="banner">
              <span>Account deletion is scheduled. You can still shop until it finishes.</span>
              <button
                type="button"
                onClick={() => {
                  setDeletionPending(false);
                  setToast("Deletion canceled");
                }}
              >
                Undo
              </button>
            </div>
          ) : null}
          <p className="label">Profile</p>
          <div className="group">
            <NavRow title="Personal details" sub="Name, email, phone" onClick={() => push("profile")} />
          </div>
          <p className="label">Preferences</p>
          <div className="group">
            <NavRow title="App preferences" sub={`${prefs.store} store`} onClick={() => push("prefs")} />
            <NavRow
              title="Notifications"
              sub={notes.orders ? "Order alerts on" : "Order alerts off"}
              onClick={() => push("notes")}
            />
          </div>
          <p className="label">Saved shopping</p>
          <div className="group">
            <NavRow title="Addresses" sub={`${addresses.length} saved`} onClick={() => push("addresses")} />
            <NavRow title="Payment methods" sub={`${cards.length} cards`} onClick={() => push("payments")} />
          </div>
          <p className="label">Security</p>
          <div className="group">
            <NavRow
              title="Sign-in & security"
              sub={security.twoFactor ? "2-step on" : "2-step off"}
              onClick={() => push("security")}
            />
          </div>
          <p className="label">California privacy</p>
          <div className="group">
            <NavRow
              tone="privacy"
              title="Do Not Sell or Share My Personal Information"
              sub={privacy.doNotSellOrShare ? "Opted out" : "Currently shared for ads"}
              onClick={() => push("privacy")}
            />
            <NavRow
              tone="privacy"
              title="Limit the Use of My Sensitive Personal Information"
              sub={privacy.limitSensitive ? "Precise location limited" : "Precise location in use"}
              onClick={() => push("privacy")}
            />
            <NavRow title="Privacy policy & terms" sub={privacySummary} onClick={() => push("policy")} />
          </div>
          <p className="label">Support</p>
          <div className="group">
            <NavRow title="Help & contact" sub="Orders, stores, SOLA Care" onClick={() => push("support")} />
            <button type="button" className="navrow danger" onClick={() => setConfirmOut(true)}>
              <span className="navcopy">
                <strong>Sign out</strong>
                <em>This device only</em>
              </span>
            </button>
          </div>
          <p className="fine">SOLA 2.4 · California shopper</p>
        </div>
      );
    }

    if (view === "profile") {
      return (
        <form className="stack" onSubmit={saveProfile}>
          <Field label="Full name">
            <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <input
              type="email"
              autoComplete="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              autoComplete="tel"
              value={draft.phone}
              onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
            />
          </Field>
          <div className="readonly">
            <span>Loyalty ID</span>
            <strong>48291 · Gold</strong>
          </div>
          {profileError ? <p className="error">{profileError}</p> : null}
          <button className="primary" type="submit">
            Save details
          </button>
        </form>
      );
    }

    if (view === "prefs") {
      return (
        <div className="stack">
          <Field label="Default store">
            <select
              value={prefs.store}
              onChange={(e) => {
                setPrefs({ ...prefs, store: e.target.value });
                setToast(`Store set to ${e.target.value}`);
              }}
            >
              {STORES.map((store) => (
                <option key={store} value={store}>
                  SOLA {store}
                </option>
              ))}
            </select>
          </Field>
          <div className="group">
            <ToggleRow
              title="Haptic feedback"
              sub="Light taps on buttons"
              on={prefs.haptics}
              onToggle={() => setPrefs({ ...prefs, haptics: !prefs.haptics })}
            />
            <ToggleRow
              title="Reduce motion"
              sub="Quieter transitions"
              on={prefs.reduceMotion}
              onToggle={() => setPrefs({ ...prefs, reduceMotion: !prefs.reduceMotion })}
            />
            <ToggleRow
              title="Recently viewed"
              sub="Keep a private history on this device"
              on={prefs.recent}
              onToggle={() => {
                setPrefs({ ...prefs, recent: !prefs.recent });
                setToast(prefs.recent ? "Recent views cleared from home" : "Recent views will show");
              }}
            />
          </div>
          <p className="note">Prices and sizes stay in U.S. dollars and imperial units.</p>
        </div>
      );
    }

    if (view === "notes") {
      return (
        <div className="stack">
          <div className="group">
            <ToggleRow
              title="Order updates"
              sub="Confirmed, packed, refunded"
              on={notes.orders}
              onToggle={() => setNotes({ ...notes, orders: !notes.orders })}
            />
            <ToggleRow
              title="Delivery alerts"
              sub="Driver nearby and doorstep"
              on={notes.delivery}
              onToggle={() => setNotes({ ...notes, delivery: !notes.delivery })}
            />
            <ToggleRow
              title="Loyalty rewards"
              sub="Points and Gold perks"
              on={notes.loyalty}
              onToggle={() => setNotes({ ...notes, loyalty: !notes.loyalty })}
            />
            <ToggleRow
              title="Promotions"
              sub="First-party offers from SOLA"
              on={notes.promos}
              onToggle={() => setNotes({ ...notes, promos: !notes.promos })}
            />
          </div>
          <p className="note">
            Promo messages are from SOLA. Ad-network sharing is controlled under Do Not Sell or Share.
          </p>
          <button type="button" className="primary" onClick={() => setToast("Notification choices saved")}>
            Save notifications
          </button>
        </div>
      );
    }

    if (view === "addresses") {
      return (
        <div className="stack">
          <div className="group">
            {addresses.map((item) => (
              <div className="cardrow" key={item.id}>
                <div>
                  <strong>
                    {item.label}
                    {item.def ? <i> Default</i> : null}
                  </strong>
                  <em>
                    {item.line}, {item.city} {item.zip}
                  </em>
                </div>
                <div className="rowacts">
                  {!item.def ? (
                    <button type="button" onClick={() => makeDefaultAddress(item.id)}>
                      Default
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      setAddrError("");
                      setAddrForm({ ...item });
                    }}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => removeAddress(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {addresses.length === 0 ? <p className="note tight">No saved addresses yet.</p> : null}
          </div>
          {addrForm ? (
            <form className="sheet" onSubmit={saveAddress}>
              <Field label="Label">
                <input
                  value={addrForm.label}
                  onChange={(e) => setAddrForm({ ...addrForm, label: e.target.value })}
                />
              </Field>
              <Field label="Street">
                <input
                  value={addrForm.line}
                  onChange={(e) => setAddrForm({ ...addrForm, line: e.target.value })}
                />
              </Field>
              <div className="split">
                <Field label="City">
                  <input
                    value={addrForm.city}
                    onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                  />
                </Field>
                <Field label="ZIP">
                  <input
                    inputMode="numeric"
                    value={addrForm.zip}
                    onChange={(e) => setAddrForm({ ...addrForm, zip: e.target.value })}
                  />
                </Field>
              </div>
              {addrError ? <p className="error">{addrError}</p> : null}
              <div className="split acts">
                <button type="button" className="ghost" onClick={() => setAddrForm(null)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Save address
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              className="primary"
              onClick={() => {
                setAddrError("");
                setAddrForm({ label: "Home", line: "", city: "", zip: "" });
              }}
            >
              Add address
            </button>
          )}
        </div>
      );
    }

    if (view === "payments") {
      return (
        <div className="stack">
          <div className="group">
            {cards.map((item) => (
              <div className="cardrow" key={item.id}>
                <div>
                  <strong>
                    {item.brand} ··{item.last4}
                    {item.def ? <i> Default</i> : null}
                  </strong>
                  <em>Exp {item.exp}</em>
                </div>
                <div className="rowacts">
                  {!item.def ? (
                    <button type="button" onClick={() => makeDefaultCard(item.id)}>
                      Default
                    </button>
                  ) : null}
                  <button type="button" onClick={() => removeCard(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {cards.length === 0 ? <p className="note tight">No cards saved.</p> : null}
          </div>
          {cardForm ? (
            <form className="sheet" onSubmit={saveCard}>
              <Field label="Brand">
                <select
                  value={cardDraft.brand}
                  onChange={(e) => setCardDraft({ ...cardDraft, brand: e.target.value })}
                >
                  <option>Visa</option>
                  <option>Mastercard</option>
                  <option>Amex</option>
                  <option>Discover</option>
                </select>
              </Field>
              <div className="split">
                <Field label="Last 4">
                  <input
                    inputMode="numeric"
                    maxLength={4}
                    value={cardDraft.last4}
                    onChange={(e) => setCardDraft({ ...cardDraft, last4: e.target.value })}
                  />
                </Field>
                <Field label="Exp">
                  <input
                    placeholder="MM/YY"
                    value={cardDraft.exp}
                    onChange={(e) => setCardDraft({ ...cardDraft, exp: e.target.value })}
                  />
                </Field>
              </div>
              {cardError ? <p className="error">{cardError}</p> : null}
              <div className="split acts">
                <button type="button" className="ghost" onClick={() => setCardForm(false)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Save card
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              className="primary"
              onClick={() => {
                setCardError("");
                setCardForm(true);
              }}
            >
              Add card
            </button>
          )}
          <p className="note">Only the last four digits are stored in this demo.</p>
        </div>
      );
    }

    if (view === "security") {
      return (
        <div className="stack">
          <div className="group">
            <ToggleRow
              title="Face unlock"
              sub="Unlock checkout on this phone"
              on={security.biometrics}
              onToggle={() => setSecurity({ ...security, biometrics: !security.biometrics })}
            />
            <ToggleRow
              title="2-step verification"
              sub="Code by text to your phone"
              on={security.twoFactor}
              onToggle={() => {
                setSecurity({ ...security, twoFactor: !security.twoFactor });
                setToast(security.twoFactor ? "2-step turned off" : "2-step codes will text this phone");
              }}
            />
          </div>
          <button type="button" className="secondary" onClick={() => push("password")}>
            Change password
          </button>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setSessionsCleared(true);
              setToast("Other sessions signed out");
            }}
          >
            {sessionsCleared ? "Other sessions cleared" : "Sign out other devices"}
          </button>
          <button type="button" className="textbtn" onClick={() => push("delete")}>
            Delete account
          </button>
        </div>
      );
    }

    if (view === "password") {
      return (
        <form className="stack" onSubmit={savePassword}>
          <Field label="Current password">
            <input
              type="password"
              value={pw.current}
              onChange={(e) => setPw({ ...pw, current: e.target.value })}
            />
          </Field>
          <Field label="New password">
            <input type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          </Field>
          <Field label="Confirm new password">
            <input
              type="password"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
            />
          </Field>
          {pwError ? <p className="error">{pwError}</p> : null}
          <button className="primary" type="submit">
            Update password
          </button>
        </form>
      );
    }

    if (view === "privacy") {
      return (
        <div className="stack">
          <div className="choice">
            <div>
              <strong>Do Not Sell or Share My Personal Information</strong>
              <em>
                {privacy.doNotSellOrShare
                  ? "Identifiers, browsing, and shopping segments are not sold or shared for cross-context ads."
                  : "We share identifiers, device IDs, browsing, and interest segments with ad partners."}
              </em>
            </div>
            <Toggle
              on={privacy.doNotSellOrShare}
              label="Do Not Sell or Share My Personal Information"
              onToggle={() => {
                const next = !privacy.doNotSellOrShare;
                setPrivacy({ ...privacy, doNotSellOrShare: next });
                setToast(next ? "You opted out of sale and share" : "Sale and share turned back on");
              }}
            />
          </div>
          <div className="choice">
            <div>
              <strong>Limit the Use of My Sensitive Personal Information</strong>
              <em>
                {privacy.limitSensitive
                  ? "Precise location is used only to deliver orders and show nearby stores."
                  : "Precise geolocation can be used to infer shopping preferences for ads."}
              </em>
            </div>
            <Toggle
              on={privacy.limitSensitive}
              label="Limit the Use of My Sensitive Personal Information"
              onToggle={() => {
                const next = !privacy.limitSensitive;
                setPrivacy({ ...privacy, limitSensitive: next });
                setToast(next ? "Sensitive location use limited" : "Location limit removed");
              }}
            />
          </div>
          <div className="group">
            <NavRow title="Notice at collection" onClick={() => push("notice")} />
            <NavRow title="Privacy policy" onClick={() => push("policy")} />
            <NavRow title="Submit a California privacy request" onClick={() => push("request")} />
          </div>
        </div>
      );
    }

    if (view === "request") {
      return (
        <form className="stack" onSubmit={submitRequest}>
          <Field label="Request type">
            <select
              value={request.type}
              onChange={(e) => setRequest({ ...request, type: e.target.value })}
            >
              <option value="access">Know / access my data</option>
              <option value="delete">Delete my data</option>
              <option value="correct">Correct my data</option>
            </select>
          </Field>
          <p className="note tight">We will reply to {profile.email}. We may need to confirm it is you.</p>
          {request.type === "correct" ? (
            <Field label="What should we correct?">
              <textarea
                rows={3}
                value={request.detail}
                onChange={(e) => setRequest({ ...request, detail: e.target.value })}
              />
            </Field>
          ) : null}
          {requestSent ? (
            <p className="ok">Request CA-20418 is in review. A copy will go to your email.</p>
          ) : (
            <button className="primary" type="submit">
              Submit request
            </button>
          )}
        </form>
      );
    }

    if (view === "notice") {
      return (
        <article className="prose">
          <p>
            We collect your name, email, phone, account ID, device identifiers, shopping activity, product views,
            search history, cart activity, purchases, loyalty activity, precise geolocation, and inferred preferences.
          </p>
          <p>
            We use them to run your account, fulfill orders, personalize the shop, and measure performance. We share
            identifiers, device IDs, browsing, product interest, purchase intent, and inferred segments with advertising
            networks, analytics providers, and data partners for cross-context advertising, retargeting, measurement,
            and campaign optimization.
          </p>
          <p>Precise geolocation is sensitive personal information. You can limit that use on the privacy screen.</p>
          <button type="button" className="secondary" onClick={() => push("privacy")}>
            Open privacy choices
          </button>
        </article>
      );
    }

    if (view === "policy") {
      return (
        <article className="prose">
          <p>
            SOLA retains account and purchase records while your account is open, and loyalty history for the program
            period. You can request access, correction, or deletion.
          </p>
          <p>
            Sale and sharing for cross-context behavioral advertising is on unless you opt out. First-party SOLA
            emails follow your notification settings and are separate from that opt-out.
          </p>
          <p>
            When you limit sensitive personal information, we do not use precise location to build ad segments. We may
            still use it to deliver an order or pick a nearby store.
          </p>
          <div className="group">
            <NavRow title="Notice at collection" onClick={() => push("notice")} />
            <NavRow title="Terms of use" onClick={() => push("terms")} />
            <NavRow title="Your privacy choices" onClick={() => push("privacy")} />
          </div>
        </article>
      );
    }

    if (view === "terms") {
      return (
        <article className="prose">
          <p>
            SOLA provides an online shop for California customers. Orders are offers we accept when we send a
            confirmation. Delivery windows are estimates.
          </p>
          <p>
            You are responsible for activity on your account. Gold loyalty points have no cash value and expire 12
            months after the last qualifying purchase.
          </p>
          <p>These terms are governed by California law. Privacy choices live in Account settings.</p>
          <button type="button" className="secondary" onClick={() => push("support")}>
            Contact support
          </button>
        </article>
      );
    }

    if (view === "support") {
      const items = [
        ["Where is my order?", "Open Orders from the shop tab. Delivery alerts arrive if that switch is on."],
        ["Change a store?", "Set your default store under App preferences. Pickup follows that store."],
        ["Privacy questions?", "Use Your privacy choices or submit a California request. We reply by email."],
      ];
      return (
        <div className="stack">
          <div className="group">
            {items.map(([q, a]) => (
              <button
                type="button"
                key={q}
                className="faq"
                aria-expanded={faq === q}
                onClick={() => setFaq(faq === q ? null : q)}
              >
                <strong>{q}</strong>
                {faq === q ? <em>{a}</em> : null}
              </button>
            ))}
          </div>
          <p className="note tight">SOLA Care · (800) 555-0198 · Daily 8a–8p PT</p>
          {ticketSent ? (
            <p className="ok">Thanks. We will reply to {profile.email}.</p>
          ) : (
            <form className="sheet" onSubmit={submitTicket}>
              <Field label="Topic">
                <select value={ticket.topic} onChange={(e) => setTicket({ ...ticket, topic: e.target.value })}>
                  <option>Order</option>
                  <option>Loyalty</option>
                  <option>Payment</option>
                  <option>Privacy</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  rows={3}
                  value={ticket.message}
                  onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                />
              </Field>
              <button className="primary" type="submit">
                Send message
              </button>
            </form>
          )}
        </div>
      );
    }

    if (view === "delete") {
      return (
        <form className="stack" onSubmit={confirmDelete}>
          <p className="note">
            This schedules closure in 14 days. Orders in progress still complete. You can undo from Account until then.
          </p>
          <Field label="Type DELETE to confirm">
            <input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} />
          </Field>
          {deleteError ? <p className="error">{deleteError}</p> : null}
          <button className="dangerbtn" type="submit">
            Schedule deletion
          </button>
        </form>
      );
    }

    return null;
  };

  return (
    <div className="stage">
      <div className="device" aria-label="SOLA account settings">
        <span className="hw vol-up" aria-hidden="true" />
        <span className="hw vol-down" aria-hidden="true" />
        <span className="hw power" aria-hidden="true" />
        <div className="screen">
          <StatusBar />
          {signedOut ? (
            <div className="signedout">
              <p className="mark">SOLA</p>
              <h1>Signed out</h1>
              <p>Your cart and privacy choices stay on this account.</p>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setSignedOut(false);
                  setStack(["home"]);
                  setToast("Welcome back");
                }}
              >
                Sign in
              </button>
            </div>
          ) : (
            <>
              <header className="top">
                {view !== "home" ? (
                  <button type="button" className="back" onClick={back}>
                    Back
                  </button>
                ) : (
                  <span className="mark">SOLA</span>
                )}
                <h1>{TITLES[view]}</h1>
              </header>
              <div className="body">{body()}</div>
            </>
          )}
          {toast ? (
            <div className="toast" role="status">
              {toast}
            </div>
          ) : null}
          {confirmOut ? (
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="out-title">
              <div className="dialog">
                <h2 id="out-title">Sign out of SOLA?</h2>
                <p>You will need your email and password to shop again on this phone.</p>
                <div className="split acts">
                  <button type="button" className="ghost" onClick={() => setConfirmOut(false)}>
                    Stay
                  </button>
                  <button
                    type="button"
                    className="primary"
                    onClick={() => {
                      setConfirmOut(false);
                      setSignedOut(true);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <div className="homebar" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
