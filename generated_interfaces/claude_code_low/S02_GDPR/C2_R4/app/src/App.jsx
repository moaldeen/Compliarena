import React, { useState, useEffect } from 'react';

const initial = {
  name: '', age: '', sex: 'Female', height: '', weight: '',
  restHr: 65, bed: '23:00', wake: '07:00', activity: 'Moderate',
  goals: ['Better sleep'], consent: true,
};
const GOALS = ['Better sleep', 'Lower stress', 'Fitness', 'Weight', 'Heart health'];
const LEVELS = ['Low', 'Light', 'Moderate', 'High'];
const SEX = ['Female', 'Male', 'Other'];

function sleepHours(bed, wake) {
  const [bh, bm] = bed.split(':').map(Number);
  const [wh, wm] = wake.split(':').map(Number);
  let m = wh * 60 + wm - (bh * 60 + bm);
  if (m <= 0) m += 1440;
  return (m / 60).toFixed(1);
}

export default function App() {
  const [f, setF] = useState(initial);
  const [err, setErr] = useState({});
  const [saved, setSaved] = useState(false);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2200);
    return () => clearTimeout(t);
  }, [saved]);

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const toggleGoal = (g) =>
    set('goals', f.goals.includes(g) ? f.goals.filter((x) => x !== g) : [...f.goals, g]);

  const save = () => {
    const e = {};
    if (!f.name.trim()) e.name = true;
    if (!(f.age >= 13 && f.age <= 110)) e.age = true;
    if (!(f.height > 0)) e.height = true;
    if (!(f.weight > 0)) e.weight = true;
    setErr(e);
    if (Object.keys(e).length) return;
    setSaved(true);
  };

  const reset = () => { setF(initial); setErr({}); setSaved(false); };
  const hu = unit === 'metric' ? 'cm' : 'in';
  const wu = unit === 'metric' ? 'kg' : 'lb';
  const filled = [f.name, f.age, f.height, f.weight].filter(Boolean).length;

  return (
    <div className="device">
      <div className="screen">
        <div className="status"><span>9:41</span><span className="notch" /><span>100%</span></div>
        {saved && <div className="toast" role="status">Profile saved ✓</div>}
        <div className="head">
          <h1>Set up your profile</h1>
          <p>Personalize your wellness dashboard.</p>
        </div>
        <div className="steps">
          {[0, 1, 2, 3].map((i) => <i key={i} className={i < filled ? 'on' : ''} />)}
        </div>

        <div className="form">
          <div className="row">
            <div className="field" style={{ flex: 2 }}>
              <label htmlFor="n">Name</label>
              <input id="n" type="text" className={err.name ? 'err' : ''} value={f.name}
                placeholder="Your name" onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="a">Age</label>
              <input id="a" type="number" className={err.age ? 'err' : ''} value={f.age}
                placeholder="30" onChange={(e) => set('age', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="field">
              <span className="lbl">Sex</span>
              <div className="seg">
                {SEX.map((s) => (
                  <button key={s} className={f.sex === s ? 'on' : ''} onClick={() => set('sex', s)}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="h">Height ({hu})</label>
              <input id="h" type="number" className={err.height ? 'err' : ''} value={f.height}
                placeholder={unit === 'metric' ? '170' : '67'} onChange={(e) => set('height', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="w">Weight ({wu})</label>
              <input id="w" type="number" className={err.weight ? 'err' : ''} value={f.weight}
                placeholder={unit === 'metric' ? '65' : '143'} onChange={(e) => set('weight', e.target.value)} />
            </div>
            <div className="field" style={{ flex: 0.8 }}>
              <span className="lbl">Units</span>
              <div className="seg">
                <button className={unit === 'metric' ? 'on' : ''} onClick={() => setUnit('metric')}>Met</button>
                <button className={unit === 'imperial' ? 'on' : ''} onClick={() => setUnit('imperial')}>Imp</button>
              </div>
            </div>
          </div>

          <div className="card">
            <h2>❤️ Resting heart rate</h2>
            <span className="lbl"><span>Baseline</span><b>{f.restHr} bpm</b></span>
            <input type="range" min="40" max="100" value={f.restHr}
              aria-label="Resting heart rate" onChange={(e) => set('restHr', +e.target.value)} />
          </div>

          <div className="card">
            <h2>🌙 Sleep schedule</h2>
            <div className="row">
              <div className="field">
                <label htmlFor="b">Bedtime</label>
                <input id="b" type="time" value={f.bed} onChange={(e) => set('bed', e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="k">Wake up</label>
                <input id="k" type="time" value={f.wake} onChange={(e) => set('wake', e.target.value)} />
              </div>
            </div>
            <span className="lbl"><span>Target sleep</span><b>{sleepHours(f.bed, f.wake)} h</b></span>
          </div>

          <div className="card">
            <h2>🏃 Activity level</h2>
            <div className="seg">
              {LEVELS.map((l) => (
                <button key={l} className={f.activity === l ? 'on' : ''} onClick={() => set('activity', l)}>{l}</button>
              ))}
            </div>
            <div className="chips">
              {GOALS.map((g) => (
                <button key={g} className={'chip' + (f.goals.includes(g) ? ' on' : '')} onClick={() => toggleGoal(g)}>{g}</button>
              ))}
            </div>
          </div>
          <div className="msg">{Object.keys(err).length ? 'Please complete the highlighted fields.' : ''}</div>
        </div>

        <div className="foot">
          <button className="primary" onClick={save}>Save profile</button>
          <button className="reset" onClick={reset}>Reset all</button>
        </div>
      </div>
    </div>
  );
}
