import React, { useState } from 'react';
import {
  Heart,
  Moon,
  Activity,
  ShieldCheck,
  ChevronRight,
  Info,
  CheckCircle2,
  Lock,
  User,
  Sliders,
  Calendar,
  X,
  Sparkles,
  Wifi,
  Battery,
  Flame,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Form State
  const [fullName, setFullName] = useState('Elena Rostova');
  const [age, setAge] = useState('29');
  const [restingHeartRate, setRestingHeartRate] = useState(64);
  const [sleepStart, setSleepStart] = useState('23:00');
  const [sleepWake, setSleepWake] = useState('07:00');
  const [activityLevel, setActivityLevel] = useState('moderate'); // 'light' | 'moderate' | 'intense'
  const [wellnessGoal, setWellnessGoal] = useState('cardio'); // 'sleep' | 'cardio' | 'vitality'

  // GDPR Consent Explicit States (EU Article 9 explicitly required)
  const [consentHealthProcessing, setConsentHealthProcessing] = useState(true);
  const [consentPersonalizedInsights, setConsentPersonalizedInsights] = useState(false);

  // UI Flow State
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'summary'
  const [showGdprModal, setShowGdprModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (!consentHealthProcessing) {
      showToast('⚠️ Please acknowledge GDPR Health Data processing consent to proceed.');
      return;
    }
    setIsSaved(true);
    showToast('✨ Health Profile securely saved!');
  };

  const calculateSleepDuration = () => {
    const [startH, startM] = sleepStart.split(':').map(Number);
    const [wakeH, wakeM] = sleepWake.split(':').map(Number);
    let diff = (wakeH * 60 + wakeM) - (startH * 60 + startM);
    if (diff < 0) diff += 24 * 60;
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${hours}h ${mins > 0 ? mins + 'm' : ''}`;
  };

  return (
    <div style={styles.container}>
      {/* Device Exterior Simulation */}
      <div style={styles.deviceFrame}>
        {/* Dynamic Island / Speaker Notch */}
        <div style={styles.notchContainer}>
          <div style={styles.cameraDot} />
          <div style={styles.speakerPill} />
        </div>

        {/* Mobile Status Bar */}
        <div style={styles.statusBar}>
          <span style={styles.statusTime}>09:41</span>
          <div style={styles.statusIcons}>
            <Wifi size={13} strokeWidth={2.4} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: -0.2 }}>5G</span>
            <Battery size={15} strokeWidth={2.4} />
          </div>
        </div>

        {/* App Content Body (Fits seamlessly inside 100% viewport) */}
        <div style={styles.appBody}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.badgeRow}>
              <span style={styles.appTag}>
                <ShieldCheck size={11} color="#0d9488" style={{ marginRight: 3 }} />
                EU GDPR Compliant
              </span>
              <button 
                onClick={() => setShowGdprModal(true)}
                style={styles.gdprInfoButton}
                title="View Privacy Rights & GDPR Policy"
              >
                <Info size={12} color="#0d9488" />
                <span style={{ marginLeft: 3 }}>Privacy Notice</span>
              </button>
            </div>
            <h1 style={styles.headerTitle}>Personalize Health Profile</h1>
            <p style={styles.headerSubtitle}>Set baselines to tailor your wellness insights</p>
          </div>

          {/* Tab Navigation for Compact Space Efficiency */}
          <div style={styles.tabBar}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                ...styles.tabItem,
                ...(activeTab === 'profile' ? styles.tabItemActive : {})
              }}
            >
              1. Baselines & Activity
            </button>
            <button
              onClick={() => setActiveTab('consent')}
              style={{
                ...styles.tabItem,
                ...(activeTab === 'consent' ? styles.tabItemActive : {})
              }}
            >
              2. Privacy & Consent
            </button>
          </div>

          {/* Main Form Area */}
          <div style={styles.scrollArea}>
            {activeTab === 'profile' && (
              <div style={styles.sectionContainer}>
                {/* Personal Basics Card */}
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <User size={13} color="#0d9488" />
                    <span style={styles.cardTitle}>Identity & Demographics</span>
                  </div>
                  <div style={styles.twoColGrid}>
                    <div>
                      <label style={styles.inputLabel}>Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        style={styles.textInput}
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label style={styles.inputLabel}>Age</label>
                      <input
                        type="number"
                        value={age}
                        min="16"
                        max="110"
                        onChange={(e) => setAge(e.target.value)}
                        style={styles.textInput}
                      />
                    </div>
                  </div>
                </div>

                {/* Heart Rate Baseline Card */}
                <div style={styles.card}>
                  <div style={styles.cardHeaderWithAction}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={styles.iconCircleRed}>
                        <Heart size={12} color="#e11d48" />
                      </div>
                      <span style={styles.cardTitle}>Resting Heart Rate Baseline</span>
                    </div>
                    <span style={styles.metricHighlight}>
                      <strong>{restingHeartRate}</strong> <span style={{ fontSize: 10, color: '#64748b' }}>BPM</span>
                    </span>
                  </div>
                  <div style={styles.sliderWrapper}>
                    <input
                      type="range"
                      min="45"
                      max="110"
                      value={restingHeartRate}
                      onChange={(e) => setRestingHeartRate(Number(e.target.value))}
                      style={styles.slider}
                    />
                    <div style={styles.sliderLabels}>
                      <span>45 bpm (Athletic)</span>
                      <span>75 bpm (Average)</span>
                      <span>110 bpm</span>
                    </div>
                  </div>
                </div>

                {/* Sleep Schedule Card */}
                <div style={styles.card}>
                  <div style={styles.cardHeaderWithAction}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={styles.iconCircleIndigo}>
                        <Moon size={12} color="#4f46e5" />
                      </div>
                      <span style={styles.cardTitle}>Target Sleep Window</span>
                    </div>
                    <span style={styles.sleepBadge}>{calculateSleepDuration()} target</span>
                  </div>
                  <div style={styles.twoColGrid}>
                    <div>
                      <label style={styles.inputLabel}>Bedtime</label>
                      <input
                        type="time"
                        value={sleepStart}
                        onChange={(e) => setSleepStart(e.target.value)}
                        style={styles.timeInput}
                      />
                    </div>
                    <div>
                      <label style={styles.inputLabel}>Wake Up</label>
                      <input
                        type="time"
                        value={sleepWake}
                        onChange={(e) => setSleepWake(e.target.value)}
                        style={styles.timeInput}
                      />
                    </div>
                  </div>
                </div>

                {/* Activity Level Selector */}
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.iconCircleTeal}>
                      <Activity size={12} color="#0d9488" />
                    </div>
                    <span style={styles.cardTitle}>Physical Activity Level</span>
                  </div>
                  <div style={styles.chipGrid}>
                    {[
                      { id: 'light', label: 'Light', desc: '1-2 days/wk' },
                      { id: 'moderate', label: 'Moderate', desc: '3-4 days/wk' },
                      { id: 'intense', label: 'Intense', desc: '5+ days/wk' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setActivityLevel(lvl.id)}
                        style={{
                          ...styles.chipButton,
                          ...(activityLevel === lvl.id ? styles.chipButtonActive : {})
                        }}
                      >
                        <span style={styles.chipTitle}>{lvl.label}</span>
                        <span style={styles.chipDesc}>{lvl.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Wellness Priority Focus */}
                <div style={styles.card}>
                  <div style={styles.cardHeader}>
                    <Sparkles size={12} color="#0d9488" />
                    <span style={styles.cardTitle}>Primary Focus Objective</span>
                  </div>
                  <div style={styles.radioGroup}>
                    {[
                      { id: 'cardio', label: 'Cardio & Heart Rate Resilience' },
                      { id: 'sleep', label: 'Sleep Hygiene & Circadian Sync' },
                      { id: 'vitality', label: 'Daily Stamina & Active Recovery' }
                    ].map((g) => (
                      <label 
                        key={g.id} 
                        style={{
                          ...styles.radioOption,
                          ...(wellnessGoal === g.id ? styles.radioOptionSelected : {})
                        }}
                        onClick={() => setWellnessGoal(g.id)}
                      >
                        <input
                          type="radio"
                          name="wellnessGoal"
                          checked={wellnessGoal === g.id}
                          onChange={() => setWellnessGoal(g.id)}
                          style={{ accentColor: '#0d9488' }}
                        />
                        <span style={styles.radioLabelText}>{g.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consent' && (
              <div style={styles.sectionContainer}>
                {/* GDPR Explicit Consent Notice */}
                <div style={styles.gdprHighlightCard}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <ShieldCheck size={20} color="#0d9488" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h4 style={styles.gdprCardTitle}>EU General Data Protection Regulation</h4>
                      <p style={styles.gdprCardText}>
                        In compliance with GDPR Articles 6, 7 &amp; 9, we require your explicit, informed consent to process Special Category physiological metrics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consent Checkbox 1: Essential Processing */}
                <div style={styles.card}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={consentHealthProcessing}
                      onChange={(e) => setConsentHealthProcessing(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <div>
                      <span style={styles.checkboxTitle}>
                        Special Category Health Data Processing <span style={{ color: '#e11d48' }}>*</span>
                      </span>
                      <p style={styles.checkboxSubtitle}>
                        I explicitly consent to the collection and algorithmic processing of my heart rate, sleep logs, and physical activity parameters to calibrate my wellness metrics.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Consent Checkbox 2: Optional Insights */}
                <div style={styles.card}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={consentPersonalizedInsights}
                      onChange={(e) => setConsentPersonalizedInsights(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <div>
                      <span style={styles.checkboxTitle}>
                        Personalized Recommendations (Optional)
                      </span>
                      <p style={styles.checkboxSubtitle}>
                        Allow comparative algorithmic suggestions based on health trend correlations. You may revoke consent anytime.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Rights Quick Summary */}
                <div style={styles.rightsContainer}>
                  <span style={styles.rightsTitle}>Your GDPR Rights Under EU Law:</span>
                  <div style={styles.rightsTags}>
                    <span style={styles.rightsBadge}>Right to Access (Art. 15)</span>
                    <span style={styles.rightsBadge}>Right to Erasure (Art. 17)</span>
                    <span style={styles.rightsBadge}>Data Portability (Art. 20)</span>
                    <span style={styles.rightsBadge}>Right to Withdraw (Art. 7(3))</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div style={styles.toast}>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Bottom Fixed Action Bar */}
          <div style={styles.footerBar}>
            {activeTab === 'profile' ? (
              <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('consent')}
                  style={styles.secondaryButton}
                >
                  Review Consent
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  style={styles.primaryButton}
                >
                  <span>Save Profile</span>
                  <ArrowRight size={15} style={{ marginLeft: 6 }} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  style={styles.secondaryButton}
                >
                  Back to Details
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  style={{
                    ...styles.primaryButton,
                    opacity: consentHealthProcessing ? 1 : 0.6
                  }}
                >
                  <CheckCircle2 size={15} style={{ marginRight: 5 }} />
                  <span>Accept &amp; Save</span>
                </button>
              </div>
            )}
            <div style={styles.footerSecurityNote}>
              <Lock size={10} color="#64748b" style={{ marginRight: 4 }} />
              <span style={{ fontSize: 10, color: '#64748b' }}>
                End-to-End Encrypted &bull; Strictly EU Region Sovereignty
              </span>
            </div>
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div style={styles.homeIndicatorWrapper}>
          <div style={styles.homeIndicator} />
        </div>

        {/* GDPR Privacy Modal */}
        {showGdprModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalBox}>
              <div style={styles.modalHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={16} color="#0d9488" />
                  <span style={styles.modalTitle}>GDPR Privacy Declaration</span>
                </div>
                <button
                  onClick={() => setShowGdprModal(false)}
                  style={styles.modalCloseButton}
                >
                  <X size={15} />
                </button>
              </div>
              <div style={styles.modalBody}>
                <p style={styles.modalParagraph}>
                  <strong>Data Controller:</strong> Aura Health Technologies Ltd, EU Representative Office: Dublin, Ireland.
                </p>
                <p style={styles.modalParagraph}>
                  <strong>Legal Basis:</strong> Under GDPR Article 9(2)(a), special category biometric &amp; health data requires explicit consent. Processing is restricted exclusively to personal wellness calculation.
                </p>
                <p style={styles.modalParagraph}>
                  <strong>Your Sovereign Rights:</strong> You retain the legal right to request complete data extraction (data portability JSON export), instant erasure of your health profile ("right to be forgotten"), and immediate withdrawal of consent via in-app Settings at any time without penalty.
                </p>
                <div style={{ background: '#f8fafc', padding: 8, borderRadius: 6, fontSize: 11, color: '#475569' }}>
                  🔒 Data retention adheres strictly to minimum necessity standards in compliance with EU regulation 2016/679.
                </div>
              </div>
              <button
                onClick={() => setShowGdprModal(false)}
                style={styles.modalGotItBtn}
              >
                I Understand My Rights
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact, crisp styling tailored for standard mobile frame simulation
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  deviceFrame: {
    width: 375,
    height: 720,
    maxHeight: '96vh',
    background: '#f8fafc',
    borderRadius: 44,
    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 10px #1e293b, 0 0 0 12px #334155',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    userSelect: 'none',
  },
  notchContainer: {
    position: 'absolute',
    top: 9,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 110,
    height: 22,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    zIndex: 99,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  cameraDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#1e293b',
    border: '1.5px solid #090e17',
  },
  speakerPill: {
    width: 32,
    height: 3.5,
    borderRadius: 3,
    backgroundColor: '#273549',
  },
  statusBar: {
    height: 38,
    paddingTop: 8,
    paddingLeft: 22,
    paddingRight: 22,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 12,
    color: '#0f172a',
    zIndex: 90,
  },
  statusTime: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: -0.2,
  },
  statusIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  appBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: '4px 14px 6px 14px',
  },
  header: {
    marginBottom: 6,
  },
  badgeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  appTag: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 10,
    fontWeight: 700,
    color: '#0d9488',
    backgroundColor: '#ccfbf1',
    padding: '2px 7px',
    borderRadius: 12,
  },
  gdprInfoButton: {
    background: 'none',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 10,
    fontWeight: 600,
    color: '#0d9488',
    cursor: 'pointer',
    padding: '2px 4px',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 800,
    color: '#0f172a',
    margin: '2px 0 0 0',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
    margin: 0,
  },
  tabBar: {
    display: 'flex',
    backgroundColor: '#e2e8f0',
    padding: 2,
    borderRadius: 8,
    marginBottom: 8,
    gap: 2,
  },
  tabItem: {
    flex: 1,
    padding: '5px 2px',
    border: 'none',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    color: '#64748b',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  tabItemActive: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    paddingRight: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: '8px 10px',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
    border: '1px solid #f1f5f9',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  cardHeaderWithAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1e293b',
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
  },
  inputLabel: {
    display: 'block',
    fontSize: 10,
    fontWeight: 600,
    color: '#64748b',
    marginBottom: 2,
  },
  textInput: {
    width: '100%',
    padding: '5px 8px',
    fontSize: 12,
    fontWeight: 500,
    borderRadius: 6,
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    outline: 'none',
  },
  timeInput: {
    width: '100%',
    padding: '4px 6px',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 6,
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    outline: 'none',
  },
  metricHighlight: {
    fontSize: 13,
    color: '#e11d48',
    fontWeight: 700,
  },
  sleepBadge: {
    fontSize: 10,
    fontWeight: 700,
    color: '#4f46e5',
    backgroundColor: '#eef2ff',
    padding: '2px 6px',
    borderRadius: 6,
  },
  iconCircleRed: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#ffe4e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleIndigo: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleTeal: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#ccfbf1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderWrapper: {
    padding: '2px 0',
  },
  slider: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    cursor: 'pointer',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 9,
    color: '#94a3b8',
    marginTop: 3,
  },
  chipGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 6,
  },
  chipButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 2px',
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  chipButtonActive: {
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
    color: '#ffffff',
  },
  chipTitle: {
    fontSize: 11,
    fontWeight: 700,
  },
  chipDesc: {
    fontSize: 9,
    opacity: 0.8,
    marginTop: 1,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  radioOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 6px',
    borderRadius: 6,
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    cursor: 'pointer',
    fontSize: 11,
  },
  radioOptionSelected: {
    borderColor: '#0d9488',
    backgroundColor: '#f0fdfa',
  },
  radioLabelText: {
    fontSize: 10.5,
    fontWeight: 600,
    color: '#334155',
  },
  gdprHighlightCard: {
    backgroundColor: '#f0fdfa',
    border: '1px solid #99f6e4',
    borderRadius: 10,
    padding: '8px 10px',
  },
  gdprCardTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f766e',
    margin: 0,
  },
  gdprCardText: {
    fontSize: 10,
    color: '#134e4a',
    margin: '3px 0 0 0',
    lineHeight: 1.3,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    cursor: 'pointer',
  },
  checkbox: {
    marginTop: 2,
    accentColor: '#0d9488',
    width: 14,
    height: 14,
    cursor: 'pointer',
  },
  checkboxTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#0f172a',
    display: 'block',
  },
  checkboxSubtitle: {
    fontSize: 9.5,
    color: '#64748b',
    margin: '2px 0 0 0',
    lineHeight: 1.3,
  },
  rightsContainer: {
    padding: '4px 6px',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    border: '1px dashed #cbd5e1',
  },
  rightsTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#475569',
    display: 'block',
    marginBottom: 4,
  },
  rightsTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
  },
  rightsBadge: {
    fontSize: 9,
    backgroundColor: '#e2e8f0',
    color: '#334155',
    padding: '2px 5px',
    borderRadius: 4,
    fontWeight: 500,
  },
  toast: {
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '6px 12px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    textAlign: 'center',
    margin: '4px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    animation: 'fadeIn 0.2s ease-in',
  },
  footerBar: {
    paddingTop: 6,
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  primaryButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d9488',
    color: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 12,
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(13, 148, 136, 0.3)',
    transition: 'all 0.15s ease',
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    padding: '8px 10px',
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 11,
    cursor: 'pointer',
  },
  footerSecurityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicatorWrapper: {
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  homeIndicator: {
    width: 110,
    height: 4,
    backgroundColor: '#94a3b8',
    borderRadius: 2,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(3px)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    maxHeight: '82%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: '1px solid #e2e8f0',
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#0f172a',
  },
  modalCloseButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    padding: 2,
    display: 'flex',
  },
  modalBody: {
    fontSize: 10.5,
    color: '#334155',
    lineHeight: 1.4,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 10,
  },
  modalParagraph: {
    margin: 0,
  },
  modalGotItBtn: {
    backgroundColor: '#0d9488',
    color: '#ffffff',
    border: 'none',
    padding: '7px',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 11,
    cursor: 'pointer',
    width: '100%',
  },
};
