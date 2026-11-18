const _u = () => Promise.resolve().then(() => ju), Fr = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: Or, jsx: f, jsxs: T } = Fr;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function Xi(t) {
  const e = t?.props?._fgT, n = typeof e == "function" || typeof e == "string" || typeof e == "object" && e !== null && "$$typeof" in e;
  return globalThis.__GLOBALS__.React.isValidElement(t) && n;
}
function Vt(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function Yi(t) {
  const { _fgT: e, _fgS: n, _fgB: i, _fgD: s, ...o } = t.props;
  return globalThis.__GLOBALS__.React.createElement(e, {
    ...o,
    key: t.key
  }, o.children);
}
function zt(t) {
  return Xi(t) ? Yi(t) : Vt(t) ? t.props.children : t;
}
const At = globalThis.__GLOBALS__.React.Children, jr = {
  map(t, e, n) {
    return At.map(t, (i, s) => {
      const o = zt(i);
      return Vt(i) ? null : e.call(n, o, s);
    });
  },
  forEach(t, e, n) {
    At.forEach(t, (i, s) => {
      if (Vt(i))
        return;
      const o = zt(i);
      e.call(n, o, s);
    });
  },
  count(t) {
    let e = 0;
    return At.forEach(t, (n) => {
      Vt(n) || e++;
    }), e;
  },
  toArray(t) {
    const e = [];
    return At.forEach(t, (n) => {
      Vt(n) || e.push(zt(n));
    }), e;
  },
  only(t) {
    const e = At.only(t);
    return zt(e);
  }
}, he = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function Nr(t) {
  if (t == null || typeof t != "object") return t;
  const e = Object.keys(t);
  let n = !1;
  for (let s = 0; s < he.length; s++)
    if (he[s] in t) {
      n = !0;
      break;
    }
  if (!n) return t;
  const i = {};
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    he.indexOf(o) === -1 && (i[o] = t[o]);
  }
  return i;
}
const In = globalThis.__GLOBALS__.React.cloneElement, _r = (t, ...e) => {
  if (Xi(t)) {
    const n = Yi(t), i = e[0];
    return i != null && typeof i == "object" && (e = [
      Nr(i),
      ...e.slice(1)
    ]), In(n, ...e);
  }
  return In(t, ...e);
};
({
  ...globalThis.__GLOBALS__.React
});
const { Component: qi, createContext: Tt, createElement: Wr, createFactory: Wu, createRef: Uu, forwardRef: Ur, Fragment: Zi, isValidElement: Gr, lazy: Gu, memo: $u, Profiler: Ku, PureComponent: zu, startTransition: Hu, StrictMode: Xu, Suspense: Yu, use: qu, useCallback: Xe, useContext: F, useDebugValue: Zu, useDeferredValue: Qu, useEffect: Wt, useId: Ye, useImperativeHandle: Ju, useInsertionEffect: Qi, useLayoutEffect: $r, useMemo: ht, useReducer: th, useRef: tt, useState: ee, useSyncExternalStore: eh, useTransition: nh, version: ih, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: sh } = globalThis.__GLOBALS__.React, qe = Tt({});
function Ze(t) {
  const e = tt(null);
  return e.current === null && (e.current = t()), e.current;
}
const Qe = typeof window < "u", Ji = Qe ? $r : Wt, ae = /* @__PURE__ */ Tt(null);
function Je(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function tn(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const q = (t, e, n) => n > e ? e : n < t ? t : n;
let en = () => {
};
const Z = {}, ts = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function es(t) {
  return typeof t == "object" && t !== null;
}
const ns = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function nn(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const K = /* @__NO_SIDE_EFFECTS__ */ (t) => t, Kr = (t, e) => (n) => e(t(n)), Ut = (...t) => t.reduce(Kr), Bt = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class sn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Je(this.subscriptions, e), () => tn(this.subscriptions, e);
  }
  notify(e, n, i) {
    const s = this.subscriptions.length;
    if (s)
      if (s === 1)
        this.subscriptions[0](e, n, i);
      else
        for (let o = 0; o < s; o++) {
          const r = this.subscriptions[o];
          r && r(e, n, i);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const X = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, $ = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function is(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const ss = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, zr = 1e-7, Hr = 12;
function Xr(t, e, n, i, s) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = ss(r, i, s) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > zr && ++a < Hr);
  return r;
}
function Gt(t, e, n, i) {
  if (t === e && n === i)
    return K;
  const s = (o) => Xr(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : ss(s(o), e, i);
}
const rs = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, os = (t) => (e) => 1 - t(1 - e), as = /* @__PURE__ */ Gt(0.33, 1.53, 0.69, 0.99), rn = /* @__PURE__ */ os(as), ls = /* @__PURE__ */ rs(rn), cs = (t) => (t *= 2) < 1 ? 0.5 * rn(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), on = (t) => 1 - Math.sin(Math.acos(t)), us = os(on), hs = rs(on), Yr = /* @__PURE__ */ Gt(0.42, 0, 1, 1), qr = /* @__PURE__ */ Gt(0, 0, 0.58, 1), fs = /* @__PURE__ */ Gt(0.42, 0, 0.58, 1), Zr = (t) => Array.isArray(t) && typeof t[0] != "number", ds = (t) => Array.isArray(t) && typeof t[0] == "number", Qr = {
  linear: K,
  easeIn: Yr,
  easeInOut: fs,
  easeOut: qr,
  circIn: on,
  circInOut: hs,
  circOut: us,
  backIn: rn,
  backInOut: ls,
  backOut: as,
  anticipate: cs
}, Jr = (t) => typeof t == "string", Bn = (t) => {
  if (ds(t)) {
    en(t.length === 4);
    const [e, n, i, s] = t;
    return Gt(e, n, i, s);
  } else if (Jr(t))
    return Qr[t];
  return t;
}, Ht = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function to(t, e) {
  let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), s = !1, o = !1;
  const r = /* @__PURE__ */ new WeakSet();
  let a = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function l(c) {
    r.has(c) && (u.schedule(c), t()), c(a);
  }
  const u = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (c, h = !1, d = !1) => {
      const m = d && s ? n : i;
      return h && r.add(c), m.has(c) || m.add(c), c;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (c) => {
      i.delete(c), r.delete(c);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (c) => {
      if (a = c, s) {
        o = !0;
        return;
      }
      s = !0, [n, i] = [i, n], n.forEach(l), n.clear(), s = !1, o && (o = !1, u.process(c));
    }
  };
  return u;
}
const eo = 40;
function ps(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = Ht.reduce((x, A) => (x[A] = to(o), x), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: d, render: p, postRender: m } = r, y = () => {
    const x = Z.useManualTiming ? s.timestamp : performance.now();
    n = !1, Z.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(x - s.timestamp, eo), 1)), s.timestamp = x, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), h.process(s), d.process(s), p.process(s), m.process(s), s.isProcessing = !1, n && e && (i = !1, t(y));
  }, v = () => {
    n = !0, i = !0, s.isProcessing || t(y);
  };
  return { schedule: Ht.reduce((x, A) => {
    const w = r[A];
    return x[A] = (C, V = !1, P = !1) => (n || v(), w.schedule(C, V, P)), x;
  }, {}), cancel: (x) => {
    for (let A = 0; A < Ht.length; A++)
      r[Ht[A]].cancel(x);
  }, state: s, steps: r };
}
const { schedule: M, cancel: et, state: B, steps: fe } = /* @__PURE__ */ ps(typeof requestAnimationFrame < "u" ? requestAnimationFrame : K, !0);
let Zt;
function no() {
  Zt = void 0;
}
const _ = {
  now: () => (Zt === void 0 && _.set(B.isProcessing || Z.useManualTiming ? B.timestamp : performance.now()), Zt),
  set: (t) => {
    Zt = t, queueMicrotask(no);
  }
}, ms = (t) => (e) => typeof e == "string" && e.startsWith(t), an = /* @__PURE__ */ ms("--"), io = /* @__PURE__ */ ms("var(--"), ln = (t) => io(t) ? so.test(t.split("/*")[0].trim()) : !1, so = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, wt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Ft = {
  ...wt,
  transform: (t) => q(0, 1, t)
}, Xt = {
  ...wt,
  default: 1
}, Rt = (t) => Math.round(t * 1e5) / 1e5, cn = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function ro(t) {
  return t == null;
}
const oo = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, un = (t, e) => (n) => !!(typeof n == "string" && oo.test(n) && n.startsWith(t) || e && !ro(n) && Object.prototype.hasOwnProperty.call(n, e)), gs = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, o, r, a] = i.match(cn);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, ao = (t) => q(0, 255, t), de = {
  ...wt,
  transform: (t) => Math.round(ao(t))
}, at = {
  test: /* @__PURE__ */ un("rgb", "red"),
  parse: /* @__PURE__ */ gs("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + de.transform(t) + ", " + de.transform(e) + ", " + de.transform(n) + ", " + Rt(Ft.transform(i)) + ")"
};
function lo(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Ve = {
  test: /* @__PURE__ */ un("#"),
  parse: lo,
  transform: at.transform
}, $t = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), J = /* @__PURE__ */ $t("deg"), Y = /* @__PURE__ */ $t("%"), S = /* @__PURE__ */ $t("px"), co = /* @__PURE__ */ $t("vh"), uo = /* @__PURE__ */ $t("vw"), Fn = {
  ...Y,
  parse: (t) => Y.parse(t) / 100,
  transform: (t) => Y.transform(t * 100)
}, dt = {
  test: /* @__PURE__ */ un("hsl", "hue"),
  parse: /* @__PURE__ */ gs("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + Y.transform(Rt(e)) + ", " + Y.transform(Rt(n)) + ", " + Rt(Ft.transform(i)) + ")"
}, k = {
  test: (t) => at.test(t) || Ve.test(t) || dt.test(t),
  parse: (t) => at.test(t) ? at.parse(t) : dt.test(t) ? dt.parse(t) : Ve.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? at.transform(t) : dt.transform(t),
  getAnimatableNone: (t) => {
    const e = k.parse(t);
    return e.alpha = 0, k.transform(e);
  }
}, ho = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function fo(t) {
  return isNaN(t) && typeof t == "string" && (t.match(cn)?.length || 0) + (t.match(ho)?.length || 0) > 0;
}
const ys = "number", xs = "color", po = "var", mo = "var(", On = "${}", go = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ot(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let o = 0;
  const a = e.replace(go, (l) => (k.test(l) ? (i.color.push(o), s.push(xs), n.push(k.parse(l))) : l.startsWith(mo) ? (i.var.push(o), s.push(po), n.push(l)) : (i.number.push(o), s.push(ys), n.push(parseFloat(l))), ++o, On)).split(On);
  return { values: n, split: a, indexes: i, types: s };
}
function vs(t) {
  return Ot(t).values;
}
function bs(t) {
  const { split: e, types: n } = Ot(t), i = e.length;
  return (s) => {
    let o = "";
    for (let r = 0; r < i; r++)
      if (o += e[r], s[r] !== void 0) {
        const a = n[r];
        a === ys ? o += Rt(s[r]) : a === xs ? o += k.transform(s[r]) : o += s[r];
      }
    return o;
  };
}
const yo = (t) => typeof t == "number" ? 0 : k.test(t) ? k.getAnimatableNone(t) : t;
function xo(t) {
  const e = vs(t);
  return bs(t)(e.map(yo));
}
const nt = {
  test: fo,
  parse: vs,
  createTransformer: bs,
  getAnimatableNone: xo
};
function pe(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function vo({ hue: t, saturation: e, lightness: n, alpha: i }) {
  t /= 360, e /= 100, n /= 100;
  let s = 0, o = 0, r = 0;
  if (!e)
    s = o = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e, l = 2 * n - a;
    s = pe(l, a, t + 1 / 3), o = pe(l, a, t), r = pe(l, a, t - 1 / 3);
  }
  return {
    red: Math.round(s * 255),
    green: Math.round(o * 255),
    blue: Math.round(r * 255),
    alpha: i
  };
}
function ne(t, e) {
  return (n) => n > 0 ? e : t;
}
const D = (t, e, n) => t + (e - t) * n, me = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, bo = [Ve, at, dt], To = (t) => bo.find((e) => e.test(t));
function jn(t) {
  const e = To(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === dt && (n = vo(n)), n;
}
const Nn = (t, e) => {
  const n = jn(t), i = jn(e);
  if (!n || !i)
    return ne(t, e);
  const s = { ...n };
  return (o) => (s.red = me(n.red, i.red, o), s.green = me(n.green, i.green, o), s.blue = me(n.blue, i.blue, o), s.alpha = D(n.alpha, i.alpha, o), at.transform(s));
}, Me = /* @__PURE__ */ new Set(["none", "hidden"]);
function wo(t, e) {
  return Me.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function So(t, e) {
  return (n) => D(t, e, n);
}
function hn(t) {
  return typeof t == "number" ? So : typeof t == "string" ? ln(t) ? ne : k.test(t) ? Nn : Co : Array.isArray(t) ? Ts : typeof t == "object" ? k.test(t) ? Nn : Po : ne;
}
function Ts(t, e) {
  const n = [...t], i = n.length, s = t.map((o, r) => hn(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < i; r++)
      n[r] = s[r](o);
    return n;
  };
}
function Po(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = hn(t[s])(t[s], e[s]));
  return (s) => {
    for (const o in i)
      n[o] = i[o](s);
    return n;
  };
}
function Ao(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const o = e.types[s], r = t.indexes[o][i[o]], a = t.values[r] ?? 0;
    n[s] = a, i[o]++;
  }
  return n;
}
const Co = (t, e) => {
  const n = nt.createTransformer(e), i = Ot(t), s = Ot(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Me.has(t) && !s.values.length || Me.has(e) && !i.values.length ? wo(t, e) : Ut(Ts(Ao(i, s), s.values), n) : ne(t, e);
};
function ws(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? D(t, e, n) : hn(t)(t, e);
}
const Vo = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => M.update(e, n),
    stop: () => et(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => B.isProcessing ? B.timestamp : _.now()
  };
}, Ss = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let o = 0; o < s; o++)
    i += Math.round(t(o / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, ie = 2e4;
function fn(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < ie; )
    e += n, i = t.next(e);
  return e >= ie ? 1 / 0 : e;
}
function Mo(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(fn(i), ie);
  return {
    type: "keyframes",
    ease: (o) => i.next(s * o).value / e,
    duration: /* @__PURE__ */ $(s)
  };
}
const Do = 5;
function Ps(t, e, n) {
  const i = Math.max(e - Do, 0);
  return is(n - t(i), e - i);
}
const R = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
}, ge = 1e-3;
function Ro({ duration: t = R.duration, bounce: e = R.bounce, velocity: n = R.velocity, mass: i = R.mass }) {
  let s, o, r = 1 - e;
  r = q(R.minDamping, R.maxDamping, r), t = q(R.minDuration, R.maxDuration, /* @__PURE__ */ $(t)), r < 1 ? (s = (u) => {
    const c = u * r, h = c * t, d = c - n, p = De(u, r), m = Math.exp(-h);
    return ge - d / p * m;
  }, o = (u) => {
    const h = u * r * t, d = h * n + n, p = Math.pow(r, 2) * Math.pow(u, 2) * t, m = Math.exp(-h), y = De(Math.pow(u, 2), r);
    return (-s(u) + ge > 0 ? -1 : 1) * ((d - p) * m) / y;
  }) : (s = (u) => {
    const c = Math.exp(-u * t), h = (u - n) * t + 1;
    return -ge + c * h;
  }, o = (u) => {
    const c = Math.exp(-u * t), h = (n - u) * (t * t);
    return c * h;
  });
  const a = 5 / t, l = ko(s, o, a);
  if (t = /* @__PURE__ */ X(t), isNaN(l))
    return {
      stiffness: R.stiffness,
      damping: R.damping,
      duration: t
    };
  {
    const u = Math.pow(l, 2) * i;
    return {
      stiffness: u,
      damping: r * 2 * Math.sqrt(i * u),
      duration: t
    };
  }
}
const Eo = 12;
function ko(t, e, n) {
  let i = n;
  for (let s = 1; s < Eo; s++)
    i = i - t(i) / e(i);
  return i;
}
function De(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const Lo = ["duration", "bounce"], Io = ["stiffness", "damping", "mass"];
function _n(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Bo(t) {
  let e = {
    velocity: R.velocity,
    stiffness: R.stiffness,
    damping: R.damping,
    mass: R.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!_n(t, Io) && _n(t, Lo))
    if (t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, o = 2 * q(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: R.mass,
        stiffness: s,
        damping: o
      };
    } else {
      const n = Ro(t);
      e = {
        ...e,
        ...n,
        mass: R.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function se(t = R.visualDuration, e = R.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: i, restDelta: s } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: h, velocity: d, isResolvedFromDuration: p } = Bo({
    ...n,
    velocity: -/* @__PURE__ */ $(n.velocity || 0)
  }), m = d || 0, y = u / (2 * Math.sqrt(l * c)), v = r - o, g = /* @__PURE__ */ $(Math.sqrt(l / c)), b = Math.abs(v) < 5;
  i || (i = b ? R.restSpeed.granular : R.restSpeed.default), s || (s = b ? R.restDelta.granular : R.restDelta.default);
  let x;
  if (y < 1) {
    const w = De(g, y);
    x = (C) => {
      const V = Math.exp(-y * g * C);
      return r - V * ((m + y * g * v) / w * Math.sin(w * C) + v * Math.cos(w * C));
    };
  } else if (y === 1)
    x = (w) => r - Math.exp(-g * w) * (v + (m + g * v) * w);
  else {
    const w = g * Math.sqrt(y * y - 1);
    x = (C) => {
      const V = Math.exp(-y * g * C), P = Math.min(w * C, 300);
      return r - V * ((m + y * g * v) * Math.sinh(P) + w * v * Math.cosh(P)) / w;
    };
  }
  const A = {
    calculatedDuration: p && h || null,
    next: (w) => {
      const C = x(w);
      if (p)
        a.done = w >= h;
      else {
        let V = w === 0 ? m : 0;
        y < 1 && (V = w === 0 ? /* @__PURE__ */ X(m) : Ps(x, w, C));
        const P = Math.abs(V) <= i, L = Math.abs(r - C) <= s;
        a.done = P && L;
      }
      return a.value = a.done ? r : C, a;
    },
    toString: () => {
      const w = Math.min(fn(A), ie), C = Ss((V) => A.next(w * V).value, w, 30);
      return w + "ms " + C;
    },
    toTransition: () => {
    }
  };
  return A;
}
se.applyToOptions = (t) => {
  const e = Mo(t, 100, se);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ X(e.duration), t.type = "keyframes", t;
};
function Re({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = t[0], d = {
    done: !1,
    value: h
  }, p = (P) => a !== void 0 && P < a || l !== void 0 && P > l, m = (P) => a === void 0 ? l : l === void 0 || Math.abs(a - P) < Math.abs(l - P) ? a : l;
  let y = n * e;
  const v = h + y, g = r === void 0 ? v : r(v);
  g !== v && (y = g - h);
  const b = (P) => -y * Math.exp(-P / i), x = (P) => g + b(P), A = (P) => {
    const L = b(P), j = x(P);
    d.done = Math.abs(L) <= u, d.value = d.done ? g : j;
  };
  let w, C;
  const V = (P) => {
    p(d.value) && (w = P, C = se({
      keyframes: [d.value, m(d.value)],
      velocity: Ps(x, P, d.value),
      // TODO: This should be passing * 1000
      damping: s,
      stiffness: o,
      restDelta: u,
      restSpeed: c
    }));
  };
  return V(0), {
    calculatedDuration: null,
    next: (P) => {
      let L = !1;
      return !C && w === void 0 && (L = !0, A(P), V(P)), w !== void 0 && P >= w ? C.next(P - w) : (!L && A(P), d);
    }
  };
}
function Fo(t, e, n) {
  const i = [], s = n || Z.mix || ws, o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = s(t[r], t[r + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[r] || K : e;
      a = Ut(l, a);
    }
    i.push(a);
  }
  return i;
}
function Oo(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const o = t.length;
  if (en(o === e.length), o === 1)
    return () => e[0];
  if (o === 2 && e[0] === e[1])
    return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Fo(e, i, s), l = a.length, u = (c) => {
    if (r && c < t[0])
      return e[0];
    let h = 0;
    if (l > 1)
      for (; h < t.length - 2 && !(c < t[h + 1]); h++)
        ;
    const d = /* @__PURE__ */ Bt(t[h], t[h + 1], c);
    return a[h](d);
  };
  return n ? (c) => u(q(t[0], t[o - 1], c)) : u;
}
function jo(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ Bt(0, e, i);
    t.push(D(n, 1, s));
  }
}
function No(t) {
  const e = [0];
  return jo(e, t.length - 1), e;
}
function _o(t, e) {
  return t.map((n) => n * e);
}
function Wo(t, e) {
  return t.map(() => e || fs).splice(0, t.length - 1);
}
function Et({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = Zr(i) ? i.map(Bn) : Bn(i), o = {
    done: !1,
    value: e[0]
  }, r = _o(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : No(e),
    t
  ), a = Oo(r, e, {
    ease: Array.isArray(s) ? s : Wo(e, s)
  });
  return {
    calculatedDuration: t,
    next: (l) => (o.value = a(l), o.done = l >= t, o)
  };
}
const Uo = (t) => t !== null;
function dn(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const o = t.filter(Uo), a = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : o.length - 1;
  return !a || i === void 0 ? o[a] : i;
}
const Go = {
  decay: Re,
  inertia: Re,
  tween: Et,
  keyframes: Et,
  spring: se
};
function As(t) {
  typeof t.type == "string" && (t.type = Go[t.type]);
}
class pn {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
}
const $o = (t) => t / 100;
class mn extends pn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== _.now() && this.tick(_.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    As(e);
    const { type: n = Et, repeat: i = 0, repeatDelay: s = 0, repeatType: o, velocity: r = 0 } = e;
    let { keyframes: a } = e;
    const l = n || Et;
    l !== Et && typeof a[0] != "number" && (this.mixKeyframes = Ut($o, ws(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = fn(u));
    const { calculatedDuration: c } = u;
    this.calculatedDuration = c, this.resolvedDuration = c + s, this.totalDuration = this.resolvedDuration * (i + 1) - s, this.generator = u;
  }
  updateTime(e) {
    const n = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n;
  }
  tick(e, n = !1) {
    const { generator: i, totalDuration: s, mixKeyframes: o, mirroredGenerator: r, resolvedDuration: a, calculatedDuration: l } = this;
    if (this.startTime === null)
      return i.next(0);
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: d, repeatDelay: p, type: m, onUpdate: y, finalKeyframe: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const g = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), b = this.playbackSpeed >= 0 ? g < 0 : g > s;
    this.currentTime = Math.max(g, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let x = this.currentTime, A = i;
    if (h) {
      const P = Math.min(this.currentTime, s) / a;
      let L = Math.floor(P), j = P % 1;
      !j && P >= 1 && (j = 1), j === 1 && L--, L = Math.min(L, h + 1), !!(L % 2) && (d === "reverse" ? (j = 1 - j, p && (j -= p / a)) : d === "mirror" && (A = r)), x = q(0, 1, j) * a;
    }
    const w = b ? { done: !1, value: c[0] } : A.next(x);
    o && (w.value = o(w.value));
    let { done: C } = w;
    !b && l !== null && (C = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const V = this.holdTime === null && (this.state === "finished" || this.state === "running" && C);
    return V && m !== Re && (w.value = dn(c, this.options, v, this.speed)), y && y(w.value), V && this.finish(), w;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, n) {
    return this.finished.then(e, n);
  }
  get duration() {
    return /* @__PURE__ */ $(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ $(e);
  }
  get time() {
    return /* @__PURE__ */ $(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ X(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(_.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ $(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Vo, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(_.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function Ko(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const lt = (t) => t * 180 / Math.PI, Ee = (t) => {
  const e = lt(Math.atan2(t[1], t[0]));
  return ke(e);
}, zo = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ee,
  rotateZ: Ee,
  skewX: (t) => lt(Math.atan(t[1])),
  skewY: (t) => lt(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, ke = (t) => (t = t % 360, t < 0 && (t += 360), t), Wn = Ee, Un = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Gn = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), Ho = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: Un,
  scaleY: Gn,
  scale: (t) => (Un(t) + Gn(t)) / 2,
  rotateX: (t) => ke(lt(Math.atan2(t[6], t[5]))),
  rotateY: (t) => ke(lt(Math.atan2(-t[2], t[0]))),
  rotateZ: Wn,
  rotate: Wn,
  skewX: (t) => lt(Math.atan(t[4])),
  skewY: (t) => lt(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function Le(t) {
  return t.includes("scale") ? 1 : 0;
}
function Ie(t, e) {
  if (!t || t === "none")
    return Le(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = Ho, s = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = zo, s = a;
  }
  if (!s)
    return Le(e);
  const o = i[e], r = s[1].split(",").map(Yo);
  return typeof o == "function" ? o(r) : r[o];
}
const Xo = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Ie(n, e);
};
function Yo(t) {
  return parseFloat(t.trim());
}
const St = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Pt = new Set(St), $n = (t) => t === wt || t === S, qo = /* @__PURE__ */ new Set(["x", "y", "z"]), Zo = St.filter((t) => !qo.has(t));
function Qo(t) {
  const e = [];
  return Zo.forEach((n) => {
    const i = t.getValue(n);
    i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const ct = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => Ie(e, "x"),
  y: (t, { transform: e }) => Ie(e, "y")
};
ct.translateX = ct.x;
ct.translateY = ct.y;
const ut = /* @__PURE__ */ new Set();
let Be = !1, Fe = !1, Oe = !1;
function Cs() {
  if (Fe) {
    const t = Array.from(ut).filter((i) => i.needsMeasurement), e = new Set(t.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    e.forEach((i) => {
      const s = Qo(i);
      s.length && (n.set(i, s), i.render());
    }), t.forEach((i) => i.measureInitialState()), e.forEach((i) => {
      i.render();
      const s = n.get(i);
      s && s.forEach(([o, r]) => {
        i.getValue(o)?.set(r);
      });
    }), t.forEach((i) => i.measureEndState()), t.forEach((i) => {
      i.suspendedScrollY !== void 0 && window.scrollTo(0, i.suspendedScrollY);
    });
  }
  Fe = !1, Be = !1, ut.forEach((t) => t.complete(Oe)), ut.clear();
}
function Vs() {
  ut.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Fe = !0);
  });
}
function Jo() {
  Oe = !0, Vs(), Cs(), Oe = !1;
}
class gn {
  constructor(e, n, i, s, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ut.add(this), Be || (Be = !0, M.read(Vs), M.resolveKeyframes(Cs))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: n, element: i, motionValue: s } = this;
    if (e[0] === null) {
      const o = s?.get(), r = e[e.length - 1];
      if (o !== void 0)
        e[0] = o;
      else if (i && n) {
        const a = i.readValue(n, r);
        a != null && (e[0] = a);
      }
      e[0] === void 0 && (e[0] = r), s && o === void 0 && s.set(e[0]);
    }
    Ko(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ut.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ut.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ta = (t) => t.startsWith("--");
function ea(t, e, n) {
  ta(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const na = /* @__PURE__ */ nn(() => window.ScrollTimeline !== void 0), ia = {};
function sa(t, e) {
  const n = /* @__PURE__ */ nn(t);
  return () => ia[e] ?? n();
}
const Ms = /* @__PURE__ */ sa(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Mt = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, Kn = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Mt([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Mt([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Mt([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Mt([0.33, 1.53, 0.69, 0.99])
};
function Ds(t, e) {
  if (t)
    return typeof t == "function" ? Ms() ? Ss(t, e) : "ease-out" : ds(t) ? Mt(t) : Array.isArray(t) ? t.map((n) => Ds(n, e) || Kn.easeOut) : Kn[t];
}
function ra(t, e, n, { delay: i = 0, duration: s = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const h = Ds(a, s);
  Array.isArray(h) && (c.easing = h);
  const d = {
    delay: i,
    duration: s,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (d.pseudoElement = u), t.animate(c, d);
}
function Rs(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function oa({ type: t, ...e }) {
  return Rs(t) && Ms() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class aa extends pn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = e, en(typeof e.type != "string");
    const u = oa(e);
    this.animation = ra(n, i, s, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = dn(s, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : ea(n, i, c), this.animation.cancel();
      }
      l?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ $(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ $(e);
  }
  get time() {
    return /* @__PURE__ */ $(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ X(e);
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return Number(this.animation.startTime);
  }
  set startTime(e) {
    this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, observe: n }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && na() ? (this.animation.timeline = e, K) : n(this);
  }
}
const Es = {
  anticipate: cs,
  backInOut: ls,
  circInOut: hs
};
function la(t) {
  return t in Es;
}
function ca(t) {
  typeof t.ease == "string" && la(t.ease) && (t.ease = Es[t.ease]);
}
const zn = 10;
class ua extends aa {
  constructor(e) {
    ca(e), As(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read commited styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: n, onUpdate: i, onComplete: s, element: o, ...r } = this.options;
    if (!n)
      return;
    if (e !== void 0) {
      n.set(e);
      return;
    }
    const a = new mn({
      ...r,
      autoplay: !1
    }), l = /* @__PURE__ */ X(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - zn).value, a.sample(l).value, zn), a.stop();
  }
}
const Hn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(nt.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function ha(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function fa(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const o = t[t.length - 1], r = Hn(s, e), a = Hn(o, e);
  return !r || !a ? !1 : ha(t) || (n === "spring" || Rs(n)) && i;
}
function je(t) {
  t.duration = 0, t.type = "keyframes";
}
const da = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), pa = /* @__PURE__ */ nn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function ma(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: o, type: r } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return pa() && n && da.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && s !== "mirror" && o !== 0 && r !== "inertia";
}
const ga = 40;
class ya extends pn {
  constructor({ autoplay: e = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = _.now();
    const d = {
      autoplay: e,
      delay: n,
      type: i,
      repeat: s,
      repeatDelay: o,
      repeatType: r,
      name: l,
      motionValue: u,
      element: c,
      ...h
    }, p = c?.KeyframeResolver || gn;
    this.keyframeResolver = new p(a, (m, y, v) => this.onKeyframesResolved(m, y, d, !v), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = _.now(), fa(e, o, r, a) || ((Z.instantAnimations || !l) && c?.(dn(e, i, n)), e[0] = e[e.length - 1], je(i), i.repeat = 0);
    const d = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > ga ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: e
    }, p = !u && ma(d) ? new ua({
      ...d,
      element: d.motionValue.owner.current
    }) : new mn(d);
    p.finished.then(() => this.notifyFinished()).catch(K), this.pendingTimeline && (this.stopTimeline = p.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = p;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), Jo()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
const xa = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function va(t) {
  const e = xa.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
function ks(t, e, n = 1) {
  const [i, s] = va(t);
  if (!i)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(i);
  if (o) {
    const r = o.trim();
    return ts(r) ? parseFloat(r) : r;
  }
  return ln(s) ? ks(s, e, n + 1) : s;
}
function yn(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const Ls = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...St
]), ba = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Is = (t) => (e) => e.test(t), Bs = [wt, S, Y, J, uo, co, ba], Xn = (t) => Bs.find(Is(t));
function Ta(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || ns(t) : !0;
}
const wa = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Sa(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(cn) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let o = wa.has(e) ? 1 : 0;
  return i !== n && (o *= 100), e + "(" + o + s + ")";
}
const Pa = /\b([a-z-]*)\(.*?\)/gu, Ne = {
  ...nt,
  getAnimatableNone: (t) => {
    const e = t.match(Pa);
    return e ? e.map(Sa).join(" ") : t;
  }
}, Yn = {
  ...wt,
  transform: Math.round
}, Aa = {
  rotate: J,
  rotateX: J,
  rotateY: J,
  rotateZ: J,
  scale: Xt,
  scaleX: Xt,
  scaleY: Xt,
  scaleZ: Xt,
  skew: J,
  skewX: J,
  skewY: J,
  distance: S,
  translateX: S,
  translateY: S,
  translateZ: S,
  x: S,
  y: S,
  z: S,
  perspective: S,
  transformPerspective: S,
  opacity: Ft,
  originX: Fn,
  originY: Fn,
  originZ: S
}, xn = {
  // Border props
  borderWidth: S,
  borderTopWidth: S,
  borderRightWidth: S,
  borderBottomWidth: S,
  borderLeftWidth: S,
  borderRadius: S,
  radius: S,
  borderTopLeftRadius: S,
  borderTopRightRadius: S,
  borderBottomRightRadius: S,
  borderBottomLeftRadius: S,
  // Positioning props
  width: S,
  maxWidth: S,
  height: S,
  maxHeight: S,
  top: S,
  right: S,
  bottom: S,
  left: S,
  // Spacing props
  padding: S,
  paddingTop: S,
  paddingRight: S,
  paddingBottom: S,
  paddingLeft: S,
  margin: S,
  marginTop: S,
  marginRight: S,
  marginBottom: S,
  marginLeft: S,
  // Misc
  backgroundPositionX: S,
  backgroundPositionY: S,
  ...Aa,
  zIndex: Yn,
  // SVG
  fillOpacity: Ft,
  strokeOpacity: Ft,
  numOctaves: Yn
}, Ca = {
  ...xn,
  // Color props
  color: k,
  backgroundColor: k,
  outlineColor: k,
  fill: k,
  stroke: k,
  // Border props
  borderColor: k,
  borderTopColor: k,
  borderRightColor: k,
  borderBottomColor: k,
  borderLeftColor: k,
  filter: Ne,
  WebkitFilter: Ne
}, Fs = (t) => Ca[t];
function Os(t, e) {
  let n = Fs(t);
  return n !== Ne && (n = nt), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const Va = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Ma(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const o = t[i];
    typeof o == "string" && !Va.has(o) && Ot(o).values.length && (s = t[i]), i++;
  }
  if (s && n)
    for (const o of e)
      t[o] = Os(n, s);
}
class Da extends gn {
  constructor(e, n, i, s, o) {
    super(e, n, i, s, o, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: n, name: i } = this;
    if (!n || !n.current)
      return;
    super.readKeyframes();
    for (let l = 0; l < e.length; l++) {
      let u = e[l];
      if (typeof u == "string" && (u = u.trim(), ln(u))) {
        const c = ks(u, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !Ls.has(i) || e.length !== 2)
      return;
    const [s, o] = e, r = Xn(s), a = Xn(o);
    if (r !== a)
      if ($n(r) && $n(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else ct[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || Ta(e[s])) && i.push(s);
    i.length && Ma(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ct[i](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
    const s = n[n.length - 1];
    s !== void 0 && e.getValue(i, s).jump(s, !1);
  }
  measureEndState() {
    const { element: e, name: n, unresolvedKeyframes: i } = this;
    if (!e || !e.current)
      return;
    const s = e.getValue(n);
    s && s.jump(this.measuredOrigin, !1);
    const o = i.length - 1, r = i[o];
    i[o] = ct[n](e.measureViewportBox(), window.getComputedStyle(e.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function Ra(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const s = n?.[t] ?? i.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t);
}
const js = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function Ns(t) {
  return es(t) && "offsetHeight" in t;
}
const qn = 30, Ea = (t) => !isNaN(parseFloat(t));
class ka {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = _.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = _.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Ea(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, n) {
    this.events[e] || (this.events[e] = new sn());
    const i = this.events[e].add(n);
    return e === "change" ? () => {
      i(), M.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : i;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, n) {
    this.passiveEffect = e, this.stopPassiveEffect = n;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, n, i) {
    this.set(n), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - i;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, n = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = _.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > qn)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, qn);
    return is(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((n) => {
      this.hasAnimated = !0, this.animation = e(n), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function vt(t, e) {
  return new ka(t, e);
}
const { schedule: vn } = /* @__PURE__ */ ps(queueMicrotask, !1), z = {
  x: !1,
  y: !1
};
function _s() {
  return z.x || z.y;
}
function La(t) {
  return t === "x" || t === "y" ? z[t] ? null : (z[t] = !0, () => {
    z[t] = !1;
  }) : z.x || z.y ? null : (z.x = z.y = !0, () => {
    z.x = z.y = !1;
  });
}
function Ws(t, e) {
  const n = Ra(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function Zn(t) {
  return !(t.pointerType === "touch" || _s());
}
function Ia(t, e, n = {}) {
  const [i, s, o] = Ws(t, n), r = (a) => {
    if (!Zn(a))
      return;
    const { target: l } = a, u = e(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      Zn(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, s);
  };
  return i.forEach((a) => {
    a.addEventListener("pointerenter", r, s);
  }), o;
}
const Us = (t, e) => e ? t === e ? !0 : Us(t, e.parentElement) : !1, bn = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Ba = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Fa(t) {
  return Ba.has(t.tagName) || t.tabIndex !== -1;
}
const Qt = /* @__PURE__ */ new WeakSet();
function Qn(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function ye(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const Oa = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = Qn(() => {
    if (Qt.has(n))
      return;
    ye(n, "down");
    const s = Qn(() => {
      ye(n, "up");
    }), o = () => ye(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", o, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function Jn(t) {
  return bn(t) && !_s();
}
function ja(t, e, n = {}) {
  const [i, s, o] = Ws(t, n), r = (a) => {
    const l = a.currentTarget;
    if (!Jn(a))
      return;
    Qt.add(l);
    const u = e(l, a), c = (p, m) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", d), Qt.has(l) && Qt.delete(l), Jn(p) && typeof u == "function" && u(p, { success: m });
    }, h = (p) => {
      c(p, l === window || l === document || n.useGlobalTarget || Us(l, p.target));
    }, d = (p) => {
      c(p, !1);
    };
    window.addEventListener("pointerup", h, s), window.addEventListener("pointercancel", d, s);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, s), Ns(a) && (a.addEventListener("focus", (u) => Oa(u, s)), !Fa(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function Gs(t) {
  return es(t) && "ownerSVGElement" in t;
}
function Na(t) {
  return Gs(t) && t.tagName === "svg";
}
const O = (t) => !!(t && t.getVelocity), _a = [...Bs, k, nt], Wa = (t) => _a.find(Is(t)), Tn = Tt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function ti(t, e) {
  if (typeof t == "function")
    return t(e);
  t != null && (t.current = e);
}
function Ua(...t) {
  return (e) => {
    let n = !1;
    const i = t.map((s) => {
      const o = ti(s, e);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const o = i[s];
          typeof o == "function" ? o() : ti(t[s], null);
        }
      };
  };
}
function Ga(...t) {
  return Xe(Ua(...t), t);
}
class $a extends qi {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const i = n.offsetParent, s = Ns(i) && i.offsetWidth || 0, o = this.props.sizeRef.current;
      o.height = n.offsetHeight || 0, o.width = n.offsetWidth || 0, o.top = n.offsetTop, o.left = n.offsetLeft, o.right = s - o.width - o.left;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function Ka({ children: t, isPresent: e, anchorX: n, root: i }) {
  const s = Ye(), o = tt(null), r = tt({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: a } = F(Tn), l = Ga(o, t?.ref);
  return Qi(() => {
    const { width: u, height: c, top: h, left: d, right: p } = r.current;
    if (e || !o.current || !u || !c)
      return;
    const m = n === "left" ? `left: ${d}` : `right: ${p}`;
    o.current.dataset.motionPopId = s;
    const y = document.createElement("style");
    a && (y.nonce = a);
    const v = i ?? document.head;
    return v.appendChild(y), y.sheet && y.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${m}px !important;
            top: ${h}px !important;
          }
        `), () => {
      v.contains(y) && v.removeChild(y);
    };
  }, [e]), f($a, { isPresent: e, childRef: o, sizeRef: r, children: _r(t, { ref: l }) });
}
const za = ({ children: t, initial: e, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: o, mode: r, anchorX: a, root: l }) => {
  const u = Ze(Ha), c = Ye();
  let h = !0, d = ht(() => (h = !1, {
    id: c,
    initial: e,
    isPresent: n,
    custom: s,
    onExitComplete: (p) => {
      u.set(p, !0);
      for (const m of u.values())
        if (!m)
          return;
      i && i();
    },
    register: (p) => (u.set(p, !1), () => u.delete(p))
  }), [n, u, i]);
  return o && h && (d = { ...d }), ht(() => {
    u.forEach((p, m) => u.set(m, !1));
  }, [n]), Wt(() => {
    !n && !u.size && i && i();
  }, [n]), r === "popLayout" && (t = f(Ka, { isPresent: n, anchorX: a, root: l, children: t })), f(ae.Provider, { value: d, children: t });
};
function Ha() {
  return /* @__PURE__ */ new Map();
}
function $s(t = !0) {
  const e = F(ae);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, o = Ye();
  Wt(() => {
    if (t)
      return s(o);
  }, [t]);
  const r = Xe(() => t && i && i(o), [o, i, t]);
  return !n && i ? [!1, r] : [!0];
}
const Yt = (t) => t.key || "";
function ei(t) {
  const e = [];
  return jr.forEach(t, (n) => {
    Gr(n) && e.push(n);
  }), e;
}
const Xa = ({ children: t, custom: e, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: o = "sync", propagate: r = !1, anchorX: a = "left", root: l }) => {
  const [u, c] = $s(r), h = ht(() => ei(t), [t]), d = r && !u ? [] : h.map(Yt), p = tt(!0), m = tt(h), y = Ze(() => /* @__PURE__ */ new Map()), [v, g] = ee(h), [b, x] = ee(h);
  Ji(() => {
    p.current = !1, m.current = h;
    for (let C = 0; C < b.length; C++) {
      const V = Yt(b[C]);
      d.includes(V) ? y.delete(V) : y.get(V) !== !0 && y.set(V, !1);
    }
  }, [b, d.length, d.join("-")]);
  const A = [];
  if (h !== v) {
    let C = [...h];
    for (let V = 0; V < b.length; V++) {
      const P = b[V], L = Yt(P);
      d.includes(L) || (C.splice(V, 0, P), A.push(P));
    }
    return o === "wait" && A.length && (C = A), x(ei(C)), g(h), null;
  }
  const { forceRender: w } = F(qe);
  return f(Or, { children: b.map((C) => {
    const V = Yt(C), P = r && !u ? !1 : h === b || d.includes(V), L = () => {
      if (y.has(V))
        y.set(V, !0);
      else
        return;
      let j = !0;
      y.forEach((Q) => {
        Q || (j = !1);
      }), j && (w?.(), x(m.current), r && c?.(), i && i());
    };
    return f(za, { isPresent: P, initial: !p.current || n ? void 0 : !1, custom: e, presenceAffectsLayout: s, mode: o, root: l, onExitComplete: P ? void 0 : L, anchorX: a, children: C }, V);
  }) });
}, Ks = Tt({ strict: !1 }), ni = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
}, bt = {};
for (const t in ni)
  bt[t] = {
    isEnabled: (e) => ni[t].some((n) => !!e[n])
  };
function Ya(t) {
  for (const e in t)
    bt[e] = {
      ...bt[e],
      ...t[e]
    };
}
const qa = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "ignoreStrict",
  "viewport"
]);
function re(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || qa.has(t);
}
let zs = (t) => !re(t);
function Za(t) {
  typeof t == "function" && (zs = (e) => e.startsWith("on") ? !re(e) : t(e));
}
try {
  Za(require("@emotion/is-prop-valid").default);
} catch {
}
function Qa(t, e, n) {
  const i = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (zs(s) || n === !0 && re(s) || !e && !re(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
  return i;
}
const le = /* @__PURE__ */ Tt({});
function ce(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function jt(t) {
  return typeof t == "string" || Array.isArray(t);
}
const wn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Sn = ["initial", ...wn];
function ue(t) {
  return ce(t.animate) || Sn.some((e) => jt(t[e]));
}
function Hs(t) {
  return !!(ue(t) || t.variants);
}
function Ja(t, e) {
  if (ue(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || jt(n) ? n : void 0,
      animate: jt(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function tl(t) {
  const { initial: e, animate: n } = Ja(t, F(le));
  return ht(() => ({ initial: e, animate: n }), [ii(e), ii(n)]);
}
function ii(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Nt = {};
function el(t) {
  for (const e in t)
    Nt[e] = t[e], an(e) && (Nt[e].isCSSVariable = !0);
}
function Xs(t, { layout: e, layoutId: n }) {
  return Pt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!Nt[t] || t === "opacity");
}
const nl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, il = St.length;
function sl(t, e, n) {
  let i = "", s = !0;
  for (let o = 0; o < il; o++) {
    const r = St[o], a = t[r];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (r.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = js(a, xn[r]);
      if (!l) {
        s = !1;
        const c = nl[r] || r;
        i += `${c}(${u}) `;
      }
      n && (e[r] = u);
    }
  }
  return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function Pn(t, e, n) {
  const { style: i, vars: s, transformOrigin: o } = t;
  let r = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (Pt.has(l)) {
      r = !0;
      continue;
    } else if (an(l)) {
      s[l] = u;
      continue;
    } else {
      const c = js(u, xn[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : i[l] = c;
    }
  }
  if (e.transform || (r || n ? i.transform = sl(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
const An = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Ys(t, e, n) {
  for (const i in e)
    !O(e[i]) && !Xs(i, n) && (t[i] = e[i]);
}
function rl({ transformTemplate: t }, e) {
  return ht(() => {
    const n = An();
    return Pn(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function ol(t, e) {
  const n = t.style || {}, i = {};
  return Ys(i, n, t), Object.assign(i, rl(t, e)), i;
}
function al(t, e) {
  const n = {}, i = ol(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const ll = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, cl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function ul(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const o = s ? ll : cl;
  t[o.offset] = S.transform(-i);
  const r = S.transform(e), a = S.transform(n);
  t[o.array] = `${r} ${a}`;
}
function qs(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (Pn(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: d } = t;
  h.transform && (d.transform = h.transform, delete h.transform), (d.transform || h.transformOrigin) && (d.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), d.transform && (d.transformBox = c?.transformBox ?? "fill-box", delete h.transformBox), e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), i !== void 0 && (h.scale = i), s !== void 0 && ul(h, s, o, r, !1);
}
const Zs = () => ({
  ...An(),
  attrs: {}
}), Qs = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function hl(t, e, n, i) {
  const s = ht(() => {
    const o = Zs();
    return qs(o, e, Qs(i), t.transformTemplate, t.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    Ys(o, t.style, t), s.style = { ...o, ...s.style };
  }
  return s;
}
const fl = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function Cn(t) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof t != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    t.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(fl.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function dl(t, e, n, { latestValues: i }, s, o = !1) {
  const a = (Cn(t) ? hl : al)(e, i, s, t), l = Qa(e, typeof t == "string", o), u = t !== Zi ? { ...l, ...a, ref: n } : {}, { children: c } = e, h = ht(() => O(c) ? c.get() : c, [c]);
  return Wr(t, {
    ...u,
    children: h
  });
}
function si(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Vn(t, e, n, i) {
  if (typeof e == "function") {
    const [s, o] = si(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, o] = si(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  return e;
}
function Jt(t) {
  return O(t) ? t.get() : t;
}
function pl({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: ml(n, i, s, t),
    renderState: e()
  };
}
function ml(t, e, n, i) {
  const s = {}, o = i(t, {});
  for (const d in o)
    s[d] = Jt(o[d]);
  let { initial: r, animate: a } = t;
  const l = ue(t), u = Hs(t);
  e && u && !l && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || r === !1;
  const h = c ? a : r;
  if (h && typeof h != "boolean" && !ce(h)) {
    const d = Array.isArray(h) ? h : [h];
    for (let p = 0; p < d.length; p++) {
      const m = Vn(t, d[p]);
      if (m) {
        const { transitionEnd: y, transition: v, ...g } = m;
        for (const b in g) {
          let x = g[b];
          if (Array.isArray(x)) {
            const A = c ? x.length - 1 : 0;
            x = x[A];
          }
          x !== null && (s[b] = x);
        }
        for (const b in y)
          s[b] = y[b];
      }
    }
  }
  return s;
}
const Js = (t) => (e, n) => {
  const i = F(le), s = F(ae), o = () => pl(t, e, i, s);
  return n ? o() : Ze(o);
};
function Mn(t, e, n) {
  const { style: i } = t, s = {};
  for (const o in i)
    (O(i[o]) || e.style && O(e.style[o]) || Xs(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (s[o] = i[o]);
  return s;
}
const gl = /* @__PURE__ */ Js({
  scrapeMotionValuesFromProps: Mn,
  createRenderState: An
});
function tr(t, e, n) {
  const i = Mn(t, e, n);
  for (const s in t)
    if (O(t[s]) || O(e[s])) {
      const o = St.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[o] = t[s];
    }
  return i;
}
const yl = /* @__PURE__ */ Js({
  scrapeMotionValuesFromProps: tr,
  createRenderState: Zs
}), xl = Symbol.for("motionComponentSymbol");
function pt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function vl(t, e, n) {
  return Xe(
    (i) => {
      i && t.onMount && t.onMount(i), e && (i ? e.mount(i) : e.unmount()), n && (typeof n == "function" ? n(i) : pt(n) && (n.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [e]
  );
}
const Dn = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), bl = "framerAppearId", er = "data-" + Dn(bl), nr = Tt({});
function Tl(t, e, n, i, s) {
  const { visualElement: o } = F(le), r = F(Ks), a = F(ae), l = F(Tn).reducedMotion, u = tt(null);
  i = i || r.renderer, !u.current && i && (u.current = i(t, {
    visualState: e,
    parent: o,
    props: n,
    presenceContext: a,
    blockInitialAnimation: a ? a.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const c = u.current, h = F(nr);
  c && !c.projection && s && (c.type === "html" || c.type === "svg") && wl(u.current, n, s, h);
  const d = tt(!1);
  Qi(() => {
    c && d.current && c.update(n, a);
  });
  const p = n[er], m = tt(!!p && !window.MotionHandoffIsComplete?.(p) && window.MotionHasOptimisedAnimation?.(p));
  return Ji(() => {
    c && (d.current = !0, window.MotionIsMounted = !0, c.updateFeatures(), c.scheduleRenderMicrotask(), m.current && c.animationState && c.animationState.animateChanges());
  }), Wt(() => {
    c && (!m.current && c.animationState && c.animationState.animateChanges(), m.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(p);
    }), m.current = !1), c.enteringChildren = void 0);
  }), c;
}
function wl(t, e, n, i) {
  const { layoutId: s, layout: o, drag: r, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : ir(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: o,
    alwaysMeasureLayout: !!r || a && pt(a),
    visualElement: t,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof o == "string" ? o : "both",
    initialPromotionConfig: i,
    crossfade: c,
    layoutScroll: l,
    layoutRoot: u
  });
}
function ir(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : ir(t.parent);
}
function xe(t, { forwardMotionProps: e = !1 } = {}, n, i) {
  n && Ya(n);
  const s = Cn(t) ? yl : gl;
  function o(a, l) {
    let u;
    const c = {
      ...F(Tn),
      ...a,
      layoutId: Sl(a)
    }, { isStatic: h } = c, d = tl(a), p = s(a, h);
    if (!h && Qe) {
      Pl();
      const m = Al(c);
      u = m.MeasureLayout, d.visualElement = Tl(t, p, c, i, m.ProjectionNode);
    }
    return T(le.Provider, { value: d, children: [u && d.visualElement ? f(u, { visualElement: d.visualElement, ...c }) : null, dl(t, a, vl(p, d.visualElement, l), p, h, e)] });
  }
  o.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const r = Ur(o);
  return r[xl] = t, r;
}
function Sl({ layoutId: t }) {
  const e = F(qe).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Pl(t, e) {
  F(Ks).strict;
}
function Al(t) {
  const { drag: e, layout: n } = bt;
  if (!e && !n)
    return {};
  const i = { ...e, ...n };
  return {
    MeasureLayout: e?.isEnabled(t) || n?.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function Cl(t, e) {
  if (typeof Proxy > "u")
    return xe;
  const n = /* @__PURE__ */ new Map(), i = (o, r) => xe(o, r, t, e), s = (o, r) => i(o, r);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? i : (n.has(r) || n.set(r, xe(r, void 0, t, e)), n.get(r))
  });
}
function sr({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function Vl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Ml(t, e) {
  if (!e)
    return t;
  const n = e({ x: t.left, y: t.top }), i = e({ x: t.right, y: t.bottom });
  return {
    top: n.y,
    left: n.x,
    bottom: i.y,
    right: i.x
  };
}
function ve(t) {
  return t === void 0 || t === 1;
}
function _e({ scale: t, scaleX: e, scaleY: n }) {
  return !ve(t) || !ve(e) || !ve(n);
}
function ot(t) {
  return _e(t) || rr(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function rr(t) {
  return ri(t.x) || ri(t.y);
}
function ri(t) {
  return t && t !== "0%";
}
function oe(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function oi(t, e, n, i, s) {
  return s !== void 0 && (t = oe(t, s, i)), oe(t, n, i) + e;
}
function We(t, e = 0, n = 1, i, s) {
  t.min = oi(t.min, e, n, i, s), t.max = oi(t.max, e, n, i, s);
}
function or(t, { x: e, y: n }) {
  We(t.x, e.translate, e.scale, e.originPoint), We(t.y, n.translate, n.scale, n.originPoint);
}
const ai = 0.999999999999, li = 1.0000000000001;
function Dl(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < s; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (i && o.options.layoutScroll && o.scroll && o !== o.root && gt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, or(t, r)), i && ot(o.latestValues) && gt(t, o.latestValues));
  }
  e.x < li && e.x > ai && (e.x = 1), e.y < li && e.y > ai && (e.y = 1);
}
function mt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function ci(t, e, n, i, s = 0.5) {
  const o = D(t.min, t.max, s);
  We(t, e, n, o, i);
}
function gt(t, e) {
  ci(t.x, e.x, e.scaleX, e.scale, e.originX), ci(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function ar(t, e) {
  return sr(Ml(t.getBoundingClientRect(), e));
}
function Rl(t, e, n) {
  const i = ar(t, n), { scroll: s } = e;
  return s && (mt(i.x, s.offset.x), mt(i.y, s.offset.y)), i;
}
const ui = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), yt = () => ({
  x: ui(),
  y: ui()
}), hi = () => ({ min: 0, max: 0 }), E = () => ({
  x: hi(),
  y: hi()
}), Ue = { current: null }, lr = { current: !1 };
function El() {
  if (lr.current = !0, !!Qe)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => Ue.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      Ue.current = !1;
}
const kl = /* @__PURE__ */ new WeakMap();
function Ll(t, e, n) {
  for (const i in e) {
    const s = e[i], o = n[i];
    if (O(s))
      t.addValue(i, s);
    else if (O(o))
      t.addValue(i, vt(s, { owner: t }));
    else if (o !== s)
      if (t.hasValue(i)) {
        const r = t.getValue(i);
        r.liveStyle === !0 ? r.jump(s) : r.hasAnimated || r.set(s);
      } else {
        const r = t.getStaticValue(i);
        t.addValue(i, vt(r !== void 0 ? r : s, { owner: t }));
      }
  }
  for (const i in n)
    e[i] === void 0 && t.removeValue(i);
  return e;
}
const fi = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Il {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, n, i) {
    return {};
  }
  constructor({ parent: e, props: n, presenceContext: i, reducedMotionConfig: s, blockInitialAnimation: o, visualState: r }, a = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = gn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const d = _.now();
      this.renderScheduledAt < d && (this.renderScheduledAt = d, M.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = r;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.options = a, this.blockInitialAnimation = !!o, this.isControllingVariants = ue(n), this.isVariantNode = Hs(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const d in h) {
      const p = h[d];
      l[d] !== void 0 && O(p) && p.set(l[d]);
    }
  }
  mount(e) {
    this.current = e, kl.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), lr.current || El(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : Ue.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), et(this.notifyUpdate), et(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const n = this.features[e];
      n && (n.unmount(), n.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, n) {
    this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
    const i = Pt.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && M.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let o;
    window.MotionCheckAppearSync && (o = window.MotionCheckAppearSync(this, e, n)), this.valueSubscriptions.set(e, () => {
      s(), o && o(), n.owner && n.stop();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in bt) {
      const n = bt[e];
      if (!n)
        continue;
      const { isEnabled: i, Feature: s } = n;
      if (!this.features[e] && s && i(this.props) && (this.features[e] = new s(this)), this.features[e]) {
        const o = this.features[e];
        o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : E();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, n) {
    this.latestValues[e] = n;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, n) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
    for (let i = 0; i < fi.length; i++) {
      const s = fi[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const o = "on" + s, r = e[o];
      r && (this.propEventSubscriptions[s] = this.on(s, r));
    }
    this.prevMotionValues = Ll(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const n = this.getClosestVariantNode();
    if (n)
      return n.variantChildren && n.variantChildren.add(e), () => n.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, n) {
    const i = this.values.get(e);
    n !== i && (i && this.removeValue(e), this.bindToMotionValue(e, n), this.values.set(e, n), this.latestValues[e] = n.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const n = this.valueSubscriptions.get(e);
    n && (n(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, n) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let i = this.values.get(e);
    return i === void 0 && n !== void 0 && (i = vt(n === null ? void 0 : n, { owner: this }), this.addValue(e, i)), i;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, n) {
    let i = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return i != null && (typeof i == "string" && (ts(i) || ns(i)) ? i = parseFloat(i) : !Wa(i) && nt.test(n) && (i = Os(e, n)), this.setBaseTarget(e, O(i) ? i.get() : i)), O(i) ? i.get() : i;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, n) {
    this.baseTarget[e] = n;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: n } = this.props;
    let i;
    if (typeof n == "string" || typeof n == "object") {
      const o = Vn(this.props, n, this.presenceContext?.custom);
      o && (i = o[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !O(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new sn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    vn.render(this.render);
  }
}
class cr extends Il {
  constructor() {
    super(...arguments), this.KeyframeResolver = Da;
  }
  sortInstanceNodePosition(e, n) {
    return e.compareDocumentPosition(n) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, n) {
    return e.style ? e.style[n] : void 0;
  }
  removeValueFromRenderState(e, { vars: n, style: i }) {
    delete n[e], delete i[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    O(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function ur(t, { style: e, vars: n }, i, s) {
  const o = t.style;
  let r;
  for (r in e)
    o[r] = e[r];
  s?.applyProjectionStyles(o, i);
  for (r in n)
    o.setProperty(r, n[r]);
}
function Bl(t) {
  return window.getComputedStyle(t);
}
class Fl extends cr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = ur;
  }
  readValueFromInstance(e, n) {
    if (Pt.has(n))
      return this.projection?.isProjecting ? Le(n) : Xo(e, n);
    {
      const i = Bl(e), s = (an(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return ar(e, n);
  }
  build(e, n, i) {
    Pn(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Mn(e, n, i);
  }
}
const hr = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);
function Ol(t, e, n, i) {
  ur(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(hr.has(s) ? s : Dn(s), e.attrs[s]);
}
class jl extends cr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = E;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (Pt.has(n)) {
      const i = Fs(n);
      return i && i.default || 0;
    }
    return n = hr.has(n) ? n : Dn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return tr(e, n, i);
  }
  build(e, n, i) {
    qs(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    Ol(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = Qs(e.tagName), super.mount(e);
  }
}
const Nl = (t, e) => Cn(t) ? new jl(e) : new Fl(e, {
  allowProjection: t !== Zi
});
function xt(t, e, n) {
  const i = t.getProps();
  return Vn(i, e, n !== void 0 ? n : i.custom, t);
}
const Ge = (t) => Array.isArray(t);
function _l(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, vt(n));
}
function Wl(t) {
  return Ge(t) ? t[t.length - 1] || 0 : t;
}
function Ul(t, e) {
  const n = xt(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...o } = n || {};
  o = { ...o, ...i };
  for (const r in o) {
    const a = Wl(o[r]);
    _l(t, r, a);
  }
}
function Gl(t) {
  return !!(O(t) && t.add);
}
function $e(t, e) {
  const n = t.getValue("willChange");
  if (Gl(n))
    return n.add(e);
  if (!n && Z.WillChange) {
    const i = new Z.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function fr(t) {
  return t.props[er];
}
const $l = (t) => t !== null;
function Kl(t, { repeat: e, repeatType: n = "loop" }, i) {
  const s = t.filter($l), o = e && n !== "loop" && e % 2 === 1 ? 0 : s.length - 1;
  return s[o];
}
const zl = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Hl = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), Xl = {
  type: "keyframes",
  duration: 0.8
}, Yl = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, ql = (t, { keyframes: e }) => e.length > 2 ? Xl : Pt.has(t) ? t.startsWith("scale") ? Hl(e[1]) : zl : Yl;
function Zl({ when: t, delay: e, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const Rn = (t, e, n, i = {}, s, o) => (r) => {
  const a = yn(i, t) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ X(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (d) => {
      e.set(d), a.onUpdate && a.onUpdate(d);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: o ? void 0 : s
  };
  Zl(a) || Object.assign(c, ql(t, c)), c.duration && (c.duration = /* @__PURE__ */ X(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ X(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (je(c), c.delay === 0 && (h = !0)), (Z.instantAnimations || Z.skipAnimations) && (h = !0, je(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !o && e.get() !== void 0) {
    const d = Kl(c.keyframes, a);
    if (d !== void 0) {
      M.update(() => {
        c.onUpdate(d), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new mn(c) : new ya(c);
};
function Ql({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function dr(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = e;
  i && (o = i);
  const l = [], u = s && t.animationState && t.animationState.getState()[s];
  for (const c in a) {
    const h = t.getValue(c, t.latestValues[c] ?? null), d = a[c];
    if (d === void 0 || u && Ql(u, c))
      continue;
    const p = {
      delay: n,
      ...yn(o || {}, c)
    }, m = h.get();
    if (m !== void 0 && !h.isAnimating && !Array.isArray(d) && d === m && !p.velocity)
      continue;
    let y = !1;
    if (window.MotionHandoffAnimation) {
      const g = fr(t);
      if (g) {
        const b = window.MotionHandoffAnimation(g, c, M);
        b !== null && (p.startTime = b, y = !0);
      }
    }
    $e(t, c), h.start(Rn(c, h, d, t.shouldReduceMotion && Ls.has(c) ? { type: !1 } : p, t, y));
    const v = h.animation;
    v && l.push(v);
  }
  return r && Promise.all(l).then(() => {
    M.update(() => {
      r && Ul(t, r);
    });
  }), l;
}
function pr(t, e, n, i = 0, s = 1) {
  const o = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), r = t.size, a = (r - 1) * i;
  return typeof n == "function" ? n(o, r) : s === 1 ? o * i : a - o * i;
}
function Ke(t, e, n = {}) {
  const i = xt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(dr(t, i, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = s;
    return Jl(t, e, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => u());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function Jl(t, e, n = 0, i = 0, s = 0, o = 1, r) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(Ke(l, e, {
      ...r,
      delay: n + (typeof i == "function" ? 0 : i) + pr(t.variantChildren, l, i, s, o)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function tc(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((o) => Ke(t, o, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = Ke(t, e, n);
  else {
    const s = typeof e == "function" ? xt(t, e, n.custom) : e;
    i = Promise.all(dr(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function mr(t, e) {
  if (!Array.isArray(e))
    return !1;
  const n = e.length;
  if (n !== t.length)
    return !1;
  for (let i = 0; i < n; i++)
    if (e[i] !== t[i])
      return !1;
  return !0;
}
const ec = Sn.length;
function gr(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? gr(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < ec; n++) {
    const i = Sn[n], s = t.props[i];
    (jt(s) || s === !1) && (e[i] = s);
  }
  return e;
}
const nc = [...wn].reverse(), ic = wn.length;
function sc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => tc(t, n, i)));
}
function rc(t) {
  let e = sc(t), n = di(), i = !0;
  const s = (l) => (u, c) => {
    const h = xt(t, c, l === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: d, transitionEnd: p, ...m } = h;
      u = { ...u, ...m, ...p };
    }
    return u;
  };
  function o(l) {
    e = l(t);
  }
  function r(l) {
    const { props: u } = t, c = gr(t.parent) || {}, h = [], d = /* @__PURE__ */ new Set();
    let p = {}, m = 1 / 0;
    for (let v = 0; v < ic; v++) {
      const g = nc[v], b = n[g], x = u[g] !== void 0 ? u[g] : c[g], A = jt(x), w = g === l ? b.isActive : null;
      w === !1 && (m = v);
      let C = x === c[g] && x !== u[g] && A;
      if (C && i && t.manuallyAnimateOnMount && (C = !1), b.protectedKeys = { ...p }, // If it isn't active and hasn't *just* been set as inactive
      !b.isActive && w === null || // If we didn't and don't have any defined prop for this animation type
      !x && !b.prevProp || // Or if the prop doesn't define an animation
      ce(x) || typeof x == "boolean")
        continue;
      const V = oc(b.prevProp, x);
      let P = V || // If we're making this variant active, we want to always make it active
      g === l && b.isActive && !C && A || // If we removed a higher-priority variant (i is in reverse order)
      v > m && A, L = !1;
      const j = Array.isArray(x) ? x : [x];
      let Q = j.reduce(s(g), {});
      w === !1 && (Q = {});
      const { prevResolvedValues: En = {} } = b, Ir = {
        ...En,
        ...Q
      }, kn = (I) => {
        P = !0, d.has(I) && (L = !0, d.delete(I)), b.needsAnimating[I] = !0;
        const W = t.getValue(I);
        W && (W.liveStyle = !1);
      };
      for (const I in Ir) {
        const W = Q[I], st = En[I];
        if (p.hasOwnProperty(I))
          continue;
        let ft = !1;
        Ge(W) && Ge(st) ? ft = !mr(W, st) : ft = W !== st, ft ? W != null ? kn(I) : d.add(I) : W !== void 0 && d.has(I) ? kn(I) : b.protectedKeys[I] = !0;
      }
      b.prevProp = x, b.prevResolvedValues = Q, b.isActive && (p = { ...p, ...Q }), i && t.blockInitialAnimation && (P = !1);
      const Ln = C && V;
      P && (!Ln || L) && h.push(...j.map((I) => {
        const W = { type: g };
        if (typeof I == "string" && i && !Ln && t.manuallyAnimateOnMount && t.parent) {
          const { parent: st } = t, ft = xt(st, I);
          if (st.enteringChildren && ft) {
            const { delayChildren: Br } = ft.transition || {};
            W.delay = pr(st.enteringChildren, t, Br);
          }
        }
        return {
          animation: I,
          options: W
        };
      }));
    }
    if (d.size) {
      const v = {};
      if (typeof u.initial != "boolean") {
        const g = xt(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        g && g.transition && (v.transition = g.transition);
      }
      d.forEach((g) => {
        const b = t.getBaseTarget(g), x = t.getValue(g);
        x && (x.liveStyle = !0), v[g] = b ?? null;
      }), h.push({ animation: v });
    }
    let y = !!h.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (y = !1), i = !1, y ? e(h) : Promise.resolve();
  }
  function a(l, u) {
    if (n[l].isActive === u)
      return Promise.resolve();
    t.variantChildren?.forEach((h) => h.animationState?.setActive(l, u)), n[l].isActive = u;
    const c = r(l);
    for (const h in n)
      n[h].protectedKeys = {};
    return c;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: o,
    getState: () => n,
    reset: () => {
      n = di();
    }
  };
}
function oc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !mr(e, t) : !1;
}
function rt(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function di() {
  return {
    animate: rt(!0),
    whileInView: rt(),
    whileHover: rt(),
    whileTap: rt(),
    whileDrag: rt(),
    whileFocus: rt(),
    exit: rt()
  };
}
class it {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
class ac extends it {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = rc(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    ce(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: n } = this.node.prevProps || {};
    e !== n && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let lc = 0;
class cc extends it {
  constructor() {
    super(...arguments), this.id = lc++;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: n } = this.node.presenceContext, { isPresent: i } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === i)
      return;
    const s = this.node.animationState.setActive("exit", !e);
    n && !e && s.then(() => {
      n(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: n } = this.node.presenceContext || {};
    n && n(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const uc = {
  animation: {
    Feature: ac
  },
  exit: {
    Feature: cc
  }
};
function _t(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n);
}
function Kt(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const hc = (t) => (e) => bn(e) && t(e, Kt(e));
function kt(t, e, n, i) {
  return _t(t, e, hc(n), i);
}
const yr = 1e-4, fc = 1 - yr, dc = 1 + yr, xr = 0.01, pc = 0 - xr, mc = 0 + xr;
function N(t) {
  return t.max - t.min;
}
function gc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function pi(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = D(e.min, e.max, t.origin), t.scale = N(n) / N(e), t.translate = D(n.min, n.max, t.origin) - t.originPoint, (t.scale >= fc && t.scale <= dc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= pc && t.translate <= mc || isNaN(t.translate)) && (t.translate = 0);
}
function Lt(t, e, n, i) {
  pi(t.x, e.x, n.x, i ? i.originX : void 0), pi(t.y, e.y, n.y, i ? i.originY : void 0);
}
function mi(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + N(e);
}
function yc(t, e, n) {
  mi(t.x, e.x, n.x), mi(t.y, e.y, n.y);
}
function gi(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + N(e);
}
function It(t, e, n) {
  gi(t.x, e.x, n.x), gi(t.y, e.y, n.y);
}
function G(t) {
  return [t("x"), t("y")];
}
const vr = ({ current: t }) => t ? t.ownerDocument.defaultView : null, yi = (t, e) => Math.abs(t - e);
function xc(t, e) {
  const n = yi(t.x, e.x), i = yi(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class br {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const d = Te(this.lastMoveEventInfo, this.history), p = this.startEvent !== null, m = xc(d.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!p && !m)
        return;
      const { point: y } = d, { timestamp: v } = B;
      this.history.push({ ...y, timestamp: v });
      const { onStart: g, onMove: b } = this.handlers;
      p || (g && g(this.lastMoveEvent, d), this.startEvent = this.lastMoveEvent), b && b(this.lastMoveEvent, d);
    }, this.handlePointerMove = (d, p) => {
      this.lastMoveEvent = d, this.lastMoveEventInfo = be(p, this.transformPagePoint), M.update(this.updatePoint, !0);
    }, this.handlePointerUp = (d, p) => {
      this.end();
      const { onEnd: m, onSessionEnd: y, resumeAnimation: v } = this.handlers;
      if (this.dragSnapToOrigin && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const g = Te(d.type === "pointercancel" ? this.lastMoveEventInfo : be(p, this.transformPagePoint), this.history);
      this.startEvent && m && m(d, g), y && y(d, g);
    }, !bn(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = r, this.contextWindow = s || window;
    const a = Kt(e), l = be(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = B;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: h } = n;
    h && h(e, Te(l, this.history)), this.removeListeners = Ut(kt(this.contextWindow, "pointermove", this.handlePointerMove), kt(this.contextWindow, "pointerup", this.handlePointerUp), kt(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), et(this.updatePoint);
  }
}
function be(t, e) {
  return e ? { point: e(t.point) } : t;
}
function xi(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function Te({ point: t }, e) {
  return {
    point: t,
    delta: xi(t, Tr(e)),
    offset: xi(t, vc(e)),
    velocity: bc(e, 0.1)
  };
}
function vc(t) {
  return t[0];
}
function Tr(t) {
  return t[t.length - 1];
}
function bc(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = Tr(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ X(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const o = /* @__PURE__ */ $(s.timestamp - i.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (s.x - i.x) / o,
    y: (s.y - i.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function Tc(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? D(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? D(n, t, i.max) : Math.min(t, n)), t;
}
function vi(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function wc(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: vi(t.x, n, s),
    y: vi(t.y, e, i)
  };
}
function bi(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function Sc(t, e) {
  return {
    x: bi(t.x, e.x),
    y: bi(t.y, e.y)
  };
}
function Pc(t, e) {
  let n = 0.5;
  const i = N(t), s = N(e);
  return s > i ? n = /* @__PURE__ */ Bt(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ Bt(t.min, t.max - s, e.min)), q(0, 1, n);
}
function Ac(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const ze = 0.35;
function Cc(t = ze) {
  return t === !1 ? t = 0 : t === !0 && (t = ze), {
    x: Ti(t, "left", "right"),
    y: Ti(t, "top", "bottom")
  };
}
function Ti(t, e, n) {
  return {
    min: wi(t, e),
    max: wi(t, n)
  };
}
function wi(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const Vc = /* @__PURE__ */ new WeakMap();
class Mc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = E(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const o = (h) => {
      const { dragSnapToOrigin: d } = this.getProps();
      d ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Kt(h).point);
    }, r = (h, d) => {
      const { drag: p, dragPropagation: m, onDragStart: y } = this.getProps();
      if (p && !m && (this.openDragLock && this.openDragLock(), this.openDragLock = La(p), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = d, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), G((g) => {
        let b = this.getAxisMotionValue(g).get() || 0;
        if (Y.test(b)) {
          const { projection: x } = this.visualElement;
          if (x && x.layout) {
            const A = x.layout.layoutBox[g];
            A && (b = N(A) * (parseFloat(b) / 100));
          }
        }
        this.originPoint[g] = b;
      }), y && M.postRender(() => y(h, d)), $e(this.visualElement, "transform");
      const { animationState: v } = this.visualElement;
      v && v.setActive("whileDrag", !0);
    }, a = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d;
      const { dragPropagation: p, dragDirectionLock: m, onDirectionLock: y, onDrag: v } = this.getProps();
      if (!p && !this.openDragLock)
        return;
      const { offset: g } = d;
      if (m && this.currentDirection === null) {
        this.currentDirection = Dc(g), this.currentDirection !== null && y && y(this.currentDirection);
        return;
      }
      this.updateAxis("x", d.point, g), this.updateAxis("y", d.point, g), this.visualElement.render(), v && v(h, d);
    }, l = (h, d) => {
      this.latestPointerEvent = h, this.latestPanInfo = d, this.stop(h, d), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => G((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new br(e, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: i,
      contextWindow: vr(this.visualElement)
    });
  }
  /**
   * @internal
   */
  stop(e, n) {
    const i = e || this.latestPointerEvent, s = n || this.latestPanInfo, o = this.isDragging;
    if (this.cancel(), !o || !s || !i)
      return;
    const { velocity: r } = s;
    this.startAnimation(r);
    const { onDragEnd: a } = this.getProps();
    a && M.postRender(() => a(i, s));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: n } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
    const { dragPropagation: i } = this.getProps();
    !i && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1);
  }
  updateAxis(e, n, i) {
    const { drag: s } = this.getProps();
    if (!i || !qt(e, s, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (r = Tc(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && pt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = wc(i.layoutBox, e) : this.constraints = !1, this.elastic = Cc(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && G((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Ac(i.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !pt(e))
      return !1;
    const i = e.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const o = Rl(i, s.root, this.visualElement.getTransformPagePoint());
    let r = Sc(s.layout.layoutBox, o);
    if (n) {
      const a = n(Vl(r));
      this.hasMutatedConstraints = !!a, a && (r = sr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = G((c) => {
      if (!qt(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      r && (h = { min: 0, max: 0 });
      const d = s ? 200 : 1e6, p = s ? 40 : 1e7, m = {
        type: "inertia",
        velocity: i ? e[c] : 0,
        bounceStiffness: d,
        bounceDamping: p,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(c, m);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return $e(this.visualElement, e), i.start(Rn(e, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    G((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    G((e) => this.getAxisMotionValue(e).animation?.pause());
  }
  getAnimationState(e) {
    return this.getAxisMotionValue(e).animation?.state;
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const n = `_drag${e.toUpperCase()}`, i = this.visualElement.getProps(), s = i[n];
    return s || this.visualElement.getValue(e, (i.initial ? i.initial[e] : void 0) || 0);
  }
  snapToCursor(e) {
    G((n) => {
      const { drag: i } = this.getProps();
      if (!qt(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, o = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: r, max: a } = s.layout.layoutBox[n];
        o.set(e[n] - D(r, a, 0.5));
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: n } = this.getProps(), { projection: i } = this.visualElement;
    if (!pt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    G((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        s[r] = Pc({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), G((r) => {
      if (!qt(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      a.set(D(l, u, s[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Vc.set(this.visualElement, this);
    const e = this.visualElement.current, n = kt(e, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      pt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, o = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), M.read(i);
    const r = _t(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && (G((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: o = !1, dragElastic: r = ze, dragMomentum: a = !0 } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: i,
      dragPropagation: s,
      dragConstraints: o,
      dragElastic: r,
      dragMomentum: a
    };
  }
}
function qt(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Dc(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Rc extends it {
  constructor(e) {
    super(e), this.removeGroupControls = K, this.removeListeners = K, this.controls = new Mc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || K;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Si = (t) => (e, n) => {
  t && M.postRender(() => t(e, n));
};
class Ec extends it {
  constructor() {
    super(...arguments), this.removePointerDownListener = K;
  }
  onPointerDown(e) {
    this.session = new br(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: vr(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Si(e),
      onStart: Si(n),
      onMove: i,
      onEnd: (o, r) => {
        delete this.session, s && M.postRender(() => s(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = kt(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const te = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
};
function Pi(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Ct = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (S.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Pi(t, e.target.x), i = Pi(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, kc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = nt.parse(t);
    if (s.length > 5)
      return i;
    const o = nt.createTransformer(t), r = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    s[0 + r] /= a, s[1 + r] /= l;
    const u = D(a, l, 0.5);
    return typeof s[2 + r] == "number" && (s[2 + r] /= u), typeof s[3 + r] == "number" && (s[3 + r] /= u), o(s);
  }
};
let we = !1;
class Lc extends qi {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: o } = e;
    el(Ic), o && (n.group && n.group.add(o), i && i.register && s && i.register(o), we && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), te.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: o } = this.props, { projection: r } = i;
    return r && (r.isPresent = o, we = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== o ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || M.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), vn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    we = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function wr(t) {
  const [e, n] = $s(), i = F(qe);
  return f(Lc, { ...t, layoutGroup: i, switchLayoutGroup: F(nr), isPresent: e, safeToRemove: n });
}
const Ic = {
  borderRadius: {
    ...Ct,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Ct,
  borderTopRightRadius: Ct,
  borderBottomLeftRadius: Ct,
  borderBottomRightRadius: Ct,
  boxShadow: kc
};
function Bc(t, e, n) {
  const i = O(t) ? t : vt(t);
  return i.start(Rn("", i, e, n)), i.animation;
}
const Fc = (t, e) => t.depth - e.depth;
class Oc {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Je(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    tn(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Fc), this.isDirty = !1, this.children.forEach(e);
  }
}
function jc(t, e) {
  const n = _.now(), i = ({ timestamp: s }) => {
    const o = s - n;
    o >= e && (et(i), t(o - e));
  };
  return M.setup(i, !0), () => et(i);
}
const Sr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], Nc = Sr.length, Ai = (t) => typeof t == "string" ? parseFloat(t) : t, Ci = (t) => typeof t == "number" || S.test(t);
function _c(t, e, n, i, s, o) {
  s ? (t.opacity = D(0, n.opacity ?? 1, Wc(i)), t.opacityExit = D(e.opacity ?? 1, 0, Uc(i))) : o && (t.opacity = D(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let r = 0; r < Nc; r++) {
    const a = `border${Sr[r]}Radius`;
    let l = Vi(e, a), u = Vi(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Ci(l) === Ci(u) ? (t[a] = Math.max(D(Ai(l), Ai(u), i), 0), (Y.test(u) || Y.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = D(e.rotate || 0, n.rotate || 0, i));
}
function Vi(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const Wc = /* @__PURE__ */ Pr(0, 0.5, us), Uc = /* @__PURE__ */ Pr(0.5, 0.95, K);
function Pr(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ Bt(t, e, i));
}
function Mi(t, e) {
  t.min = e.min, t.max = e.max;
}
function U(t, e) {
  Mi(t.x, e.x), Mi(t.y, e.y);
}
function Di(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
function Ri(t, e, n, i, s) {
  return t -= e, t = oe(t, 1 / n, i), s !== void 0 && (t = oe(t, 1 / s, i)), t;
}
function Gc(t, e = 0, n = 1, i = 0.5, s, o = t, r = t) {
  if (Y.test(e) && (e = parseFloat(e), e = D(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = D(o.min, o.max, i);
  t === o && (a -= e), t.min = Ri(t.min, e, n, a, s), t.max = Ri(t.max, e, n, a, s);
}
function Ei(t, e, [n, i, s], o, r) {
  Gc(t, e[n], e[i], e[s], e.scale, o, r);
}
const $c = ["x", "scaleX", "originX"], Kc = ["y", "scaleY", "originY"];
function ki(t, e, n, i) {
  Ei(t.x, e, $c, n ? n.x : void 0, i ? i.x : void 0), Ei(t.y, e, Kc, n ? n.y : void 0, i ? i.y : void 0);
}
function Li(t) {
  return t.translate === 0 && t.scale === 1;
}
function Ar(t) {
  return Li(t.x) && Li(t.y);
}
function Ii(t, e) {
  return t.min === e.min && t.max === e.max;
}
function zc(t, e) {
  return Ii(t.x, e.x) && Ii(t.y, e.y);
}
function Bi(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function Cr(t, e) {
  return Bi(t.x, e.x) && Bi(t.y, e.y);
}
function Fi(t) {
  return N(t.x) / N(t.y);
}
function Oi(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class Hc {
  constructor() {
    this.members = [];
  }
  add(e) {
    Je(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (tn(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((s) => e === s);
    if (n === 0)
      return !1;
    let i;
    for (let s = n; s >= 0; s--) {
      const o = this.members[s];
      if (o.isPresent !== !1) {
        i = o;
        break;
      }
    }
    return i ? (this.promote(i), !0) : !1;
  }
  promote(e, n) {
    const i = this.lead;
    if (e !== i && (this.prevLead = i, this.lead = e, e.show(), i)) {
      i.instance && i.scheduleRender(), e.scheduleRender(), e.resumeFrom = i, n && (e.resumeFrom.preserveOpacity = !0), i.snapshot && (e.snapshot = i.snapshot, e.snapshot.latestValues = i.animationValues || i.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
      const { crossfade: s } = e.options;
      s === !1 && i.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      const { options: n, resumingFrom: i } = e;
      n.onExitComplete && n.onExitComplete(), i && i.options.onExitComplete && i.options.onExitComplete();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  /**
   * Clear any leads that have been removed this render to prevent them from being
   * used in future animations and to prevent memory leaks
   */
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
}
function Xc(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, o = t.y.translate / e.y, r = n?.z || 0;
  if ((s || o || r) && (i = `translate3d(${s}px, ${o}px, ${r}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: d, skewX: p, skewY: m } = n;
    u && (i = `perspective(${u}px) ${i}`), c && (i += `rotate(${c}deg) `), h && (i += `rotateX(${h}deg) `), d && (i += `rotateY(${d}deg) `), p && (i += `skewX(${p}deg) `), m && (i += `skewY(${m}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (i += `scale(${a}, ${l})`), i || "none";
}
const Se = ["", "X", "Y", "Z"], Yc = 1e3;
let qc = 0;
function Pe(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function Vr(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = fr(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", M, !(s || o));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && Vr(i);
}
function Mr({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(r = {}, a = e?.()) {
      this.id = qc++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Jc), this.nodes.forEach(iu), this.nodes.forEach(su), this.nodes.forEach(tu);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Oc());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new sn()), this.eventHandlers.get(r).add(a);
    }
    notifyListeners(r, ...a) {
      const l = this.eventHandlers.get(r);
      l && l.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    /**
     * Lifecycles
     */
    mount(r) {
      if (this.instance)
        return;
      this.isSVG = Gs(r) && !Na(r), this.instance = r;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let c, h = 0;
        const d = () => this.root.updateBlockedByResize = !1;
        M.read(() => {
          h = window.innerWidth;
        }), t(r, () => {
          const p = window.innerWidth;
          p !== h && (h = p, this.root.updateBlockedByResize = !0, c && c(), c = jc(d, 250), te.hasAnimatedSinceResize && (te.hasAnimatedSinceResize = !1, this.nodes.forEach(_i)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: d, layout: p }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const m = this.options.transition || u.getDefaultTransition() || cu, { onLayoutAnimationStart: y, onLayoutAnimationComplete: v } = u.getProps(), g = !this.targetLayout || !Cr(this.targetLayout, p), b = !h && d;
        if (this.options.layoutRoot || this.resumeFrom || b || h && (g || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const x = {
            ...yn(m, "layout"),
            onPlay: y,
            onComplete: v
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (x.delay = 0, x.type = !1), this.startAnimation(x), this.setAnimationOrigin(c, b);
        } else
          h || _i(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = p;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), et(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(ru), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: r } = this.options;
      return r && r.getProps().transformTemplate;
    }
    willUpdate(r = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Vr(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let c = 0; c < this.path.length; c++) {
        const h = this.path[c];
        h.shouldResetTransform = !0, h.updateScroll("snapshot"), h.options.layoutRoot && h.willUpdate(!1);
      }
      const { layoutId: a, layout: l } = this.options;
      if (a === void 0 && !l)
        return;
      const u = this.getTransformTemplate();
      this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), r && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(ji);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ni);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(nu), this.nodes.forEach(Zc), this.nodes.forEach(Qc)) : this.nodes.forEach(Ni), this.clearAllSnapshots();
      const a = _.now();
      B.delta = q(0, 1e3 / 60, a - B.timestamp), B.timestamp = a, B.isProcessing = !0, fe.update.process(B), fe.preRender.process(B), fe.render.process(B), B.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, vn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(eu), this.sharedNodes.forEach(ou);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, M.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      M.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !N(this.snapshot.measuredBox.x) && !N(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = E(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: a } = this.options;
      a && a.notify("LayoutMeasure", this.layout.layoutBox, r ? r.layoutBox : void 0);
    }
    updateScroll(r = "measure") {
      let a = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === r && (a = !1), a && this.instance) {
        const l = i(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: r,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l
        };
      }
    }
    resetTransform() {
      if (!s)
        return;
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Ar(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      r && this.instance && (a || ot(this.latestValues) || c) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return r && (l = this.removeTransform(l)), uu(l), {
        animationId: this.root.animationId,
        measuredBox: a,
        layoutBox: l,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: r } = this.options;
      if (!r)
        return E();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(hu))) {
        const { scroll: u } = this.root;
        u && (mt(a.x, u.offset.x), mt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = E();
      if (U(a, r), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && U(a, r), mt(a.x, c.offset.x), mt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = E();
      U(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && gt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), ot(c.latestValues) && gt(l, c.latestValues);
      }
      return ot(this.latestValues) && gt(l, this.latestValues), l;
    }
    removeTransform(r) {
      const a = E();
      U(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !ot(u.latestValues))
          continue;
        _e(u.latestValues) && u.updateSnapshot();
        const c = E(), h = u.measurePageBox();
        U(c, h), ki(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return ot(this.latestValues) && ki(a, this.latestValues), a;
    }
    setTargetDelta(r) {
      this.targetDelta = r, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== B.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(r = !1) {
      const a = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
      const l = !!this.resumingFrom || this !== a;
      if (!(r || l && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: c, layoutId: h } = this.options;
      if (!(!this.layout || !(c || h))) {
        if (this.resolvedRelativeTargetAt = B.timestamp, !this.targetDelta && !this.relativeTarget) {
          const d = this.getClosestProjectingParent();
          d && d.layout && this.animationProgress !== 1 ? (this.relativeParent = d, this.forceRelativeParentToResolveTarget(), this.relativeTarget = E(), this.relativeTargetOrigin = E(), It(this.relativeTargetOrigin, this.layout.layoutBox, d.layout.layoutBox), U(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = E(), this.targetWithTransforms = E()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), yc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : U(this.target, this.layout.layoutBox), or(this.target, this.targetDelta)) : U(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const d = this.getClosestProjectingParent();
          d && !!d.resumingFrom == !!this.resumingFrom && !d.options.layoutScroll && d.target && this.animationProgress !== 1 ? (this.relativeParent = d, this.forceRelativeParentToResolveTarget(), this.relativeTarget = E(), this.relativeTargetOrigin = E(), It(this.relativeTargetOrigin, this.target, d.target), U(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || _e(this.parent.latestValues) || rr(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    calcProjection() {
      const r = this.getLead(), a = !!this.resumingFrom || this !== r;
      let l = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === B.timestamp && (l = !1), l)
        return;
      const { layout: u, layoutId: c } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c))
        return;
      U(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, d = this.treeScale.y;
      Dl(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = E());
      const { target: p } = r;
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Di(this.prevProjectionDelta.x, this.projectionDelta.x), Di(this.prevProjectionDelta.y, this.projectionDelta.y)), Lt(this.projectionDelta, this.layoutCorrected, p, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== d || !Oi(this.projectionDelta.x, this.prevProjectionDelta.x) || !Oi(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", p));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      if (this.options.visualElement?.scheduleRender(), r) {
        const a = this.getStack();
        a && a.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = yt(), this.projectionDelta = yt(), this.projectionDeltaWithTransform = yt();
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = yt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const d = E(), p = l ? l.source : void 0, m = this.layout ? this.layout.source : void 0, y = p !== m, v = this.getStack(), g = !v || v.members.length <= 1, b = !!(y && !g && this.options.crossfade === !0 && !this.path.some(lu));
      this.animationProgress = 0;
      let x;
      this.mixTargetDelta = (A) => {
        const w = A / 1e3;
        Wi(h.x, r.x, w), Wi(h.y, r.y, w), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (It(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), au(this.relativeTarget, this.relativeTargetOrigin, d, w), x && zc(this.relativeTarget, x) && (this.isProjectionDirty = !1), x || (x = E()), U(x, this.relativeTarget)), y && (this.animationValues = c, _c(c, u, this.latestValues, w, b, g)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = w;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (et(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = M.update(() => {
        te.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = vt(0)), this.currentAnimation = Bc(this.motionValue, [0, 1e3], {
          ...r,
          velocity: 0,
          isSync: !0,
          onUpdate: (a) => {
            this.mixTargetDelta(a), r.onUpdate && r.onUpdate(a);
          },
          onStop: () => {
          },
          onComplete: () => {
            r.onComplete && r.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const r = this.getStack();
      r && r.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(Yc), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = r;
      if (!(!a || !l || !u)) {
        if (this !== r && this.layout && u && Dr(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || E();
          const h = N(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + h;
          const d = N(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + d;
        }
        U(a, l), gt(a, c), Lt(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new Hc()), this.sharedNodes.get(r).add(a);
      const u = a.options.initialPromotionConfig;
      a.promote({
        transition: u ? u.transition : void 0,
        preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
      });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: r } = this.options;
      return r ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r)
        return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: l } = {}) {
      const u = this.getStack();
      u && u.promote(this, l), r && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({ transition: a });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: r } = this.options;
      if (!r)
        return;
      let a = !1;
      const { latestValues: l } = r;
      if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)
        return;
      const u = {};
      l.z && Pe("z", r, u, this.animationValues);
      for (let c = 0; c < Se.length; c++)
        Pe(`rotate${Se[c]}`, r, u, this.animationValues), Pe(`skew${Se[c]}`, r, u, this.animationValues);
      r.render();
      for (const c in u)
        r.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
      r.scheduleRender();
    }
    applyProjectionStyles(r, a) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        r.visibility = "hidden";
        return;
      }
      const l = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = Jt(a?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = Jt(a?.pointerEvents) || ""), this.hasProjected && !ot(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = Xc(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), r.transform = h;
      const { x: d, y: p } = this.projectionDelta;
      r.transformOrigin = `${d.origin * 100}% ${p.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : r.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const m in Nt) {
        if (c[m] === void 0)
          continue;
        const { correct: y, applyTo: v, isCSSVariable: g } = Nt[m], b = h === "none" ? c[m] : y(c[m], u);
        if (v) {
          const x = v.length;
          for (let A = 0; A < x; A++)
            r[v[A]] = b;
        } else
          g ? this.options.visualElement.renderState.vars[m] = b : r[m] = b;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? Jt(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(ji), this.root.sharedNodes.clear();
    }
  };
}
function Zc(t) {
  t.updateLayout();
}
function Qc(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, o = e.source !== t.layout.source;
    s === "size" ? G((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], d = N(h);
      h.min = n[c].min, h.max = h.min + d;
    }) : Dr(s, e.layoutBox, n) && G((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], d = N(n[c]);
      h.max = h.min + d, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + d);
    });
    const r = yt();
    Lt(r, n, e.layoutBox);
    const a = yt();
    o ? Lt(a, t.applyTransform(i, !0), e.measuredBox) : Lt(a, n, e.layoutBox);
    const l = !Ar(r);
    let u = !1;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: d } = c;
        if (h && d) {
          const p = E();
          It(p, e.layoutBox, h.layoutBox);
          const m = E();
          It(m, n, d.layoutBox), Cr(p, m) || (u = !0), c.options.layoutRoot && (t.relativeTarget = m, t.relativeTargetOrigin = p, t.relativeParent = c);
        }
      }
    }
    t.notifyListeners("didUpdate", {
      layout: n,
      snapshot: e,
      delta: a,
      layoutDelta: r,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: u
    });
  } else if (t.isLead()) {
    const { onExitComplete: n } = t.options;
    n && n();
  }
  t.options.transition = void 0;
}
function Jc(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function tu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function eu(t) {
  t.clearSnapshot();
}
function ji(t) {
  t.clearMeasurements();
}
function Ni(t) {
  t.isLayoutDirty = !1;
}
function nu(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function _i(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function iu(t) {
  t.resolveTargetDelta();
}
function su(t) {
  t.calcProjection();
}
function ru(t) {
  t.resetSkewAndRotation();
}
function ou(t) {
  t.removeLeadSnapshot();
}
function Wi(t, e, n) {
  t.translate = D(e.translate, 0, n), t.scale = D(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function Ui(t, e, n, i) {
  t.min = D(e.min, n.min, i), t.max = D(e.max, n.max, i);
}
function au(t, e, n, i) {
  Ui(t.x, e.x, n.x, i), Ui(t.y, e.y, n.y, i);
}
function lu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const cu = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Gi = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), $i = Gi("applewebkit/") && !Gi("chrome/") ? Math.round : K;
function Ki(t) {
  t.min = $i(t.min), t.max = $i(t.max);
}
function uu(t) {
  Ki(t.x), Ki(t.y);
}
function Dr(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !gc(Fi(e), Fi(n), 0.2);
}
function hu(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const fu = Mr({
  attachResizeListener: (t, e) => _t(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Ae = {
  current: void 0
}, Rr = Mr({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Ae.current) {
      const t = new fu({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Ae.current = t;
    }
    return Ae.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), du = {
  pan: {
    Feature: Ec
  },
  drag: {
    Feature: Rc,
    ProjectionNode: Rr,
    MeasureLayout: wr
  }
};
function zi(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, o = i[s];
  o && M.postRender(() => o(e, Kt(e)));
}
class pu extends it {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Ia(e, (n, i) => (zi(this.node, i, "Start"), (s) => zi(this.node, s, "End"))));
  }
  unmount() {
  }
}
class mu extends it {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Ut(_t(this.node.current, "focus", () => this.onFocus()), _t(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Hi(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), o = i[s];
  o && M.postRender(() => o(e, Kt(e)));
}
class gu extends it {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = ja(e, (n, i) => (Hi(this.node, i, "Start"), (s, { success: o }) => Hi(this.node, s, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const He = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakMap(), yu = (t) => {
  const e = He.get(t.target);
  e && e(t);
}, xu = (t) => {
  t.forEach(yu);
};
function vu({ root: t, ...e }) {
  const n = t || document;
  Ce.has(n) || Ce.set(n, {});
  const i = Ce.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(xu, { root: t, ...e })), i[s];
}
function bu(t, e, n) {
  const i = vu(e);
  return He.set(t, n), i.observe(t), () => {
    He.delete(t), i.unobserve(t);
  };
}
const Tu = {
  some: 0,
  all: 1
};
class wu extends it {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : Tu[s]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), d = u ? c : h;
      d && d(l);
    };
    return bu(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(Su(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function Su({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Pu = {
  inView: {
    Feature: wu
  },
  tap: {
    Feature: gu
  },
  focus: {
    Feature: mu
  },
  hover: {
    Feature: pu
  }
}, Au = {
  layout: {
    ProjectionNode: Rr,
    MeasureLayout: wr
  }
}, Cu = {
  ...uc,
  ...Pu,
  ...du,
  ...Au
}, H = /* @__PURE__ */ Cl(Cu, Nl), Vu = "https://images.unsplash.com/photo-1680372669294-570f598ce2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", Dt = [
  {
    id: 1,
    rarity: "COMMON",
    name: "Weapon Skin",
    fullName: "Common Weapon Skin",
    color: "#9ca3af",
    darkBg: "linear-gradient(150deg,#1f2937,#111827)",
    border: "#6b7280",
    glow: "rgba(156,163,175,0.4)",
    iconType: "sword"
  },
  {
    id: 2,
    rarity: "RARE",
    name: "Flame Sword",
    fullName: "Rare Flame Sword",
    color: "#60a5fa",
    darkBg: "linear-gradient(150deg,#1e3a5f,#0f172a)",
    border: "#3b82f6",
    glow: "rgba(59,130,246,0.45)",
    iconType: "flame"
  },
  {
    id: 3,
    rarity: "VERY RARE",
    name: "Twin Blades",
    fullName: "Very Rare Twin Blades Set",
    color: "#c084fc",
    darkBg: "linear-gradient(150deg,#3b1f5e,#1a0533)",
    border: "#a855f7",
    glow: "rgba(168,85,247,0.45)",
    iconType: "twins"
  },
  {
    id: 4,
    rarity: "EX. RARE",
    name: "New Hero",
    fullName: "Extremely Rare New Hero Character",
    color: "#fbbf24",
    darkBg: "linear-gradient(150deg,#5c2800,#2c1001)",
    border: "#f59e0b",
    glow: "rgba(245,158,11,0.55)",
    iconType: "hero"
  }
];
function Mu({ color: t = "#9ca3af" }) {
  const e = `sw-${t.replace(/[^a-zA-Z0-9]/g, "")}`;
  return /* @__PURE__ */ T("svg", { width: "26", height: "40", viewBox: "0 0 26 40", children: [
    /* @__PURE__ */ f("defs", { children: /* @__PURE__ */ T("linearGradient", { id: e, x1: "0", y1: "0", x2: "1", y2: "0", children: [
      /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#6b7280" }),
      /* @__PURE__ */ f("stop", { offset: "50%", stopColor: t }),
      /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#6b7280" })
    ] }) }),
    /* @__PURE__ */ f("polygon", { points: "13,1 16,24 10,24", fill: `url(#${e})` }),
    /* @__PURE__ */ f("line", { x1: "13", y1: "2", x2: "13", y2: "24", stroke: "rgba(255,255,255,0.22)", strokeWidth: "0.6" }),
    /* @__PURE__ */ f("rect", { x: "5.5", y: "23", width: "15", height: "3.5", rx: "1.5", fill: "#78716c" }),
    /* @__PURE__ */ f("rect", { x: "5.5", y: "23", width: "15", height: "1.5", rx: "0.75", fill: t, opacity: "0.5" }),
    /* @__PURE__ */ f("rect", { x: "11.5", y: "26.5", width: "3", height: "9.5", rx: "1.5", fill: "#44403c" }),
    /* @__PURE__ */ f("circle", { cx: "13", cy: "38", r: "2.5", fill: "#78716c" })
  ] });
}
function Du() {
  return /* @__PURE__ */ T("svg", { width: "26", height: "44", viewBox: "0 0 26 44", children: [
    /* @__PURE__ */ T("defs", { children: [
      /* @__PURE__ */ T("linearGradient", { id: "fi-bl", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#fde68a" }),
        /* @__PURE__ */ f("stop", { offset: "35%", stopColor: "#ef4444" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#3b82f6" })
      ] }),
      /* @__PURE__ */ T("filter", { id: "fi-glo", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
        /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1.5", result: "b" }),
        /* @__PURE__ */ T("feMerge", { children: [
          /* @__PURE__ */ f("feMergeNode", { in: "b" }),
          /* @__PURE__ */ f("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f("ellipse", { cx: "13", cy: "8", rx: "4", ry: "7", fill: "#fcd34d", opacity: "0.9", filter: "url(#fi-glo)" }),
    /* @__PURE__ */ f("ellipse", { cx: "10", cy: "10", rx: "2.5", ry: "5", fill: "#f97316", opacity: "0.7" }),
    /* @__PURE__ */ f("ellipse", { cx: "16", cy: "11", rx: "2", ry: "4", fill: "#fbbf24", opacity: "0.6" }),
    /* @__PURE__ */ f("polygon", { points: "13,5 16,30 10,30", fill: "url(#fi-bl)", filter: "url(#fi-glo)" }),
    /* @__PURE__ */ f("rect", { x: "6", y: "29", width: "14", height: "3.5", rx: "1.5", fill: "#1e40af" }),
    /* @__PURE__ */ f("rect", { x: "6", y: "29", width: "14", height: "1.5", rx: "0.75", fill: "#60a5fa", opacity: "0.8" }),
    /* @__PURE__ */ f("rect", { x: "11.5", y: "32.5", width: "3", height: "8", rx: "1.5", fill: "#1e3a8a" }),
    /* @__PURE__ */ f("circle", { cx: "13", cy: "42", r: "2.5", fill: "#2563eb" })
  ] });
}
function Ru() {
  return /* @__PURE__ */ T("svg", { width: "38", height: "38", viewBox: "0 0 38 38", children: [
    /* @__PURE__ */ T("defs", { children: [
      /* @__PURE__ */ T("linearGradient", { id: "ti-bl", x1: "0", y1: "0", x2: "1", y2: "1", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#e9d5ff" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#a855f7" })
      ] }),
      /* @__PURE__ */ T("filter", { id: "ti-glo", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
        /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1.5", result: "b" }),
        /* @__PURE__ */ T("feMerge", { children: [
          /* @__PURE__ */ f("feMergeNode", { in: "b" }),
          /* @__PURE__ */ f("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ T("g", { transform: "rotate(-38 19 19)", filter: "url(#ti-glo)", children: [
      /* @__PURE__ */ f("polygon", { points: "19,2 21,23 17,23", fill: "url(#ti-bl)" }),
      /* @__PURE__ */ f("rect", { x: "15", y: "22", width: "8", height: "3", rx: "1", fill: "#7c3aed" }),
      /* @__PURE__ */ f("rect", { x: "17.5", y: "25", width: "3", height: "7", rx: "1.5", fill: "#4c1d95" }),
      /* @__PURE__ */ f("circle", { cx: "19", cy: "33.5", r: "2", fill: "#7c3aed" })
    ] }),
    /* @__PURE__ */ T("g", { transform: "rotate(38 19 19)", filter: "url(#ti-glo)", children: [
      /* @__PURE__ */ f("polygon", { points: "19,2 21,23 17,23", fill: "url(#ti-bl)" }),
      /* @__PURE__ */ f("rect", { x: "15", y: "22", width: "8", height: "3", rx: "1", fill: "#7c3aed" }),
      /* @__PURE__ */ f("rect", { x: "17.5", y: "25", width: "3", height: "7", rx: "1.5", fill: "#4c1d95" }),
      /* @__PURE__ */ f("circle", { cx: "19", cy: "33.5", r: "2", fill: "#7c3aed" })
    ] })
  ] });
}
function Eu() {
  return /* @__PURE__ */ T("svg", { width: "30", height: "42", viewBox: "0 0 30 42", children: [
    /* @__PURE__ */ T("defs", { children: [
      /* @__PURE__ */ T("linearGradient", { id: "hi-gd", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#fde68a" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#d97706" })
      ] }),
      /* @__PURE__ */ T("filter", { id: "hi-glo", x: "-50%", y: "-50%", width: "200%", height: "200%", children: [
        /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "1.5", result: "b" }),
        /* @__PURE__ */ T("feMerge", { children: [
          /* @__PURE__ */ f("feMergeNode", { in: "b" }),
          /* @__PURE__ */ f("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ T("g", { fill: "url(#hi-gd)", filter: "url(#hi-glo)", children: [
      /* @__PURE__ */ f("path", { d: "M5 17 Q2 28 4 40 L10 38 Q9 28 11 20 Z", opacity: "0.75" }),
      /* @__PURE__ */ f("path", { d: "M25 17 Q28 28 26 40 L20 38 Q21 28 19 20 Z", opacity: "0.75" }),
      /* @__PURE__ */ f("rect", { x: "9", y: "18", width: "12", height: "14", rx: "2.5" }),
      /* @__PURE__ */ f("circle", { cx: "15", cy: "10", r: "6" }),
      /* @__PURE__ */ f("path", { d: "M9 9 L11 4 L15 2 L19 4 L21 9 Z", fill: "#fcd34d" }),
      /* @__PURE__ */ f("rect", { x: "14", y: "1", width: "2", height: "3", rx: "0.5", fill: "#fbbf24" }),
      /* @__PURE__ */ f("rect", { x: "3", y: "18", width: "6", height: "11", rx: "3" }),
      /* @__PURE__ */ f("rect", { x: "21", y: "18", width: "6", height: "11", rx: "3" }),
      /* @__PURE__ */ f("rect", { x: "9", y: "32", width: "5", height: "9", rx: "2.5" }),
      /* @__PURE__ */ f("rect", { x: "16", y: "32", width: "5", height: "9", rx: "2.5" })
    ] })
  ] });
}
function Er({ size: t = 16 }) {
  return /* @__PURE__ */ T("svg", { width: t, height: t, viewBox: "0 0 20 20", children: [
    /* @__PURE__ */ f("defs", { children: /* @__PURE__ */ T("linearGradient", { id: "gm-g", x1: "0", y1: "0", x2: "1", y2: "1", children: [
      /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#a5f3fc" }),
      /* @__PURE__ */ f("stop", { offset: "50%", stopColor: "#38bdf8" }),
      /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#0369a1" })
    ] }) }),
    /* @__PURE__ */ f("polygon", { points: "10,1 19,7 16,18 4,18 1,7", fill: "url(#gm-g)" }),
    /* @__PURE__ */ f("polygon", { points: "10,1 19,7 10,8", fill: "rgba(255,255,255,0.35)" }),
    /* @__PURE__ */ f("line", { x1: "10", y1: "1", x2: "10", y2: "8", stroke: "rgba(255,255,255,0.4)", strokeWidth: "0.5" })
  ] });
}
function kr({ type: t, color: e }) {
  return t === "sword" ? /* @__PURE__ */ f(Mu, { color: e }) : t === "flame" ? /* @__PURE__ */ f(Du, {}) : t === "twins" ? /* @__PURE__ */ f(Ru, {}) : t === "hero" ? /* @__PURE__ */ f(Eu, {}) : null;
}
function Lr() {
  return /* @__PURE__ */ T("svg", { viewBox: "0 0 120 120", xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "100%", children: [
    /* @__PURE__ */ T("defs", { children: [
      /* @__PURE__ */ T("radialGradient", { id: "ca", cx: "50%", cy: "62%", r: "50%", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#fcd34d", stopOpacity: "0.6" }),
        /* @__PURE__ */ f("stop", { offset: "55%", stopColor: "#f97316", stopOpacity: "0.2" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#fbbf24", stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ T("linearGradient", { id: "cl", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#92400e" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#5c2800" })
      ] }),
      /* @__PURE__ */ T("linearGradient", { id: "cb", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#78350f" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#3c1500" })
      ] }),
      /* @__PURE__ */ T("linearGradient", { id: "cg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ f("stop", { offset: "0%", stopColor: "#fde68a" }),
        /* @__PURE__ */ f("stop", { offset: "50%", stopColor: "#f59e0b" }),
        /* @__PURE__ */ f("stop", { offset: "100%", stopColor: "#b45309" })
      ] }),
      /* @__PURE__ */ T("filter", { id: "cglo", x: "-40%", y: "-40%", width: "180%", height: "180%", children: [
        /* @__PURE__ */ f("feGaussianBlur", { stdDeviation: "2.5", result: "b" }),
        /* @__PURE__ */ T("feMerge", { children: [
          /* @__PURE__ */ f("feMergeNode", { in: "b" }),
          /* @__PURE__ */ f("feMergeNode", { in: "SourceGraphic" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f("circle", { cx: "60", cy: "72", r: "52", fill: "url(#ca)" }),
    /* @__PURE__ */ f("ellipse", { cx: "60", cy: "112", rx: "36", ry: "5.5", fill: "rgba(0,0,0,0.5)" }),
    /* @__PURE__ */ f("rect", { x: "13", y: "67", width: "94", height: "41", rx: "5", fill: "url(#cb)" }),
    /* @__PURE__ */ f("line", { x1: "13", y1: "84", x2: "107", y2: "84", stroke: "rgba(0,0,0,0.22)", strokeWidth: "1" }),
    /* @__PURE__ */ f("line", { x1: "13", y1: "97", x2: "107", y2: "97", stroke: "rgba(0,0,0,0.22)", strokeWidth: "1" }),
    /* @__PURE__ */ f("rect", { x: "13", y: "67", width: "94", height: "9", rx: "5", fill: "rgba(255,255,255,0.035)" }),
    /* @__PURE__ */ f("rect", { x: "11", y: "65", width: "98", height: "6", rx: "2", fill: "url(#cg)" }),
    /* @__PURE__ */ f("rect", { x: "11", y: "82", width: "98", height: "3.5", rx: "1.5", fill: "url(#cg)", opacity: "0.8" }),
    /* @__PURE__ */ f("rect", { x: "11", y: "95", width: "98", height: "3.5", rx: "1.5", fill: "url(#cg)", opacity: "0.8" }),
    /* @__PURE__ */ f("path", { d: "M13 70 L13 44 Q13 22 60 19 Q107 22 107 44 L107 70 Z", fill: "url(#cl)" }),
    /* @__PURE__ */ f("path", { d: "M17 56 Q60 42 103 56 L103 50 Q60 35 17 50 Z", fill: "rgba(255,255,255,0.05)" }),
    /* @__PURE__ */ f("path", { d: "M13 47 Q60 40 107 47", stroke: "url(#cg)", strokeWidth: "2.5", fill: "none" }),
    /* @__PURE__ */ f("path", { d: "M13 44 Q13 22 60 19 Q107 22 107 44", stroke: "url(#cg)", strokeWidth: "2.5", fill: "none" }),
    /* @__PURE__ */ f("rect", { x: "11", y: "66.5", width: "98", height: "5", rx: "2", fill: "url(#cg)" }),
    /* @__PURE__ */ f("rect", { x: "12", y: "69", width: "96", height: "2", fill: "#fde68a", opacity: "0.72", filter: "url(#cglo)" }),
    /* @__PURE__ */ f("rect", { x: "46", y: "61", width: "28", height: "20", rx: "4", fill: "url(#cg)" }),
    /* @__PURE__ */ f("rect", { x: "49", y: "64", width: "22", height: "14", rx: "2.5", fill: "#7c3f00" }),
    /* @__PURE__ */ f(
      "path",
      {
        d: "M53 64 L53 56 Q53 49 60 49 Q67 49 67 56 L67 64",
        stroke: "#fde68a",
        strokeWidth: "3.5",
        fill: "none",
        strokeLinecap: "round",
        filter: "url(#cglo)"
      }
    ),
    /* @__PURE__ */ f(
      "path",
      {
        d: "M53 64 L53 56 Q53 49 60 49 Q67 49 67 56 L67 64",
        stroke: "#b45309",
        strokeWidth: "2",
        fill: "none",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ f("circle", { cx: "60", cy: "70", r: "3.5", fill: "#451a00" }),
    /* @__PURE__ */ f("polygon", { points: "60,73.5 58,80 62,80", fill: "#451a00" }),
    [
      [20, 74],
      [100, 74],
      [20, 90],
      [100, 90],
      [20, 103],
      [100, 103]
    ].map(([t, e], n) => /* @__PURE__ */ f("circle", { cx: t, cy: e, r: "3.5", fill: "#fde68a" }, n)),
    /* @__PURE__ */ T("g", { filter: "url(#cglo)", children: [
      /* @__PURE__ */ f("polygon", { points: "27,22 29,28 35,30 29,32 27,38 25,32 19,30 25,28", fill: "#fde68a" }),
      /* @__PURE__ */ f("polygon", { points: "85,16 87,21 92,22.5 87,24 85,29 83,24 78,22.5 83,21", fill: "#fcd34d", opacity: "0.85" })
    ] }),
    /* @__PURE__ */ f("circle", { cx: "17", cy: "47", r: "1.5", fill: "#fbbf24", opacity: "0.55" }),
    /* @__PURE__ */ f("circle", { cx: "103", cy: "38", r: "2", fill: "#fbbf24", opacity: "0.6" }),
    /* @__PURE__ */ f("circle", { cx: "94", cy: "15", r: "1.5", fill: "#fbbf24", opacity: "0.4" })
  ] });
}
function ku({ item: t }) {
  return /* @__PURE__ */ T(
    "div",
    {
      style: {
        flex: 1,
        minWidth: 0,
        background: t.darkBg,
        border: `1.5px solid ${t.border}`,
        boxShadow: `0 0 10px ${t.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 3px 5px",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              background: `${t.border}22`,
              border: `1px solid ${t.border}55`,
              borderRadius: "3px",
              padding: "1px 4px",
              fontSize: "6px",
              fontWeight: 700,
              color: t.color,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              flexShrink: 0
            },
            children: t.rarity
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              padding: "3px 0",
              filter: `drop-shadow(0 0 6px ${t.glow})`
            },
            children: /* @__PURE__ */ f(kr, { type: t.iconType, color: t.color })
          }
        ),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              fontSize: "7.5px",
              fontWeight: 600,
              color: t.color,
              textAlign: "center",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              padding: "0 2px",
              flexShrink: 0
            },
            children: t.name
          }
        )
      ]
    }
  );
}
function Lu({ onBuy: t, onClose: e }) {
  return /* @__PURE__ */ f(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "7px 9px"
      },
      children: /* @__PURE__ */ T(
        "div",
        {
          style: {
            width: "100%",
            height: "100%",
            background: "linear-gradient(150deg,rgba(10,18,38,0.98) 0%,rgba(26,10,52,0.98) 50%,rgba(8,16,36,0.98) 100%)",
            border: "2px solid rgba(253,230,138,0.32)",
            boxShadow: "0 0 30px rgba(245,158,11,0.22),0 0 60px rgba(168,85,247,0.1),inset 0 1px 0 rgba(253,230,138,0.1)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          },
          children: [
            /* @__PURE__ */ T(
              "div",
              {
                style: {
                  background: "linear-gradient(90deg,rgba(38,8,75,0.95),rgba(52,16,5,0.95),rgba(38,8,75,0.95))",
                  borderBottom: "1px solid rgba(253,230,138,0.18)",
                  padding: "5px 11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexShrink: 0
                },
                children: [
                  /* @__PURE__ */ T("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
                    /* @__PURE__ */ T("svg", { width: "12", height: "18", viewBox: "0 0 12 18", children: [
                      /* @__PURE__ */ f("polygon", { points: "6,1 7.5,11 4.5,11", fill: "#f59e0b" }),
                      /* @__PURE__ */ f("rect", { x: "2", y: "10.5", width: "8", height: "2", rx: "1", fill: "#b45309" }),
                      /* @__PURE__ */ f("rect", { x: "5", y: "12.5", width: "2", height: "4", rx: "1", fill: "#78350f" })
                    ] }),
                    /* @__PURE__ */ f(
                      H.span,
                      {
                        animate: { color: ["#fde68a", "#f59e0b", "#fbbf24", "#fde68a"] },
                        transition: { duration: 3.5, repeat: 1 / 0, ease: "easeInOut" },
                        style: {
                          fontSize: "13px",
                          fontWeight: 800,
                          letterSpacing: "0.11em"
                        },
                        children: "WEAPON CHEST"
                      }
                    ),
                    /* @__PURE__ */ T("svg", { width: "12", height: "18", viewBox: "0 0 12 18", children: [
                      /* @__PURE__ */ f("polygon", { points: "6,1 7.5,11 4.5,11", fill: "#f59e0b" }),
                      /* @__PURE__ */ f("rect", { x: "2", y: "10.5", width: "8", height: "2", rx: "1", fill: "#b45309" }),
                      /* @__PURE__ */ f("rect", { x: "5", y: "12.5", width: "2", height: "4", rx: "1", fill: "#78350f" })
                    ] })
                  ] }),
                  /* @__PURE__ */ T("div", { style: { display: "flex", alignItems: "center", gap: "6px" }, children: [
                    /* @__PURE__ */ f(
                      "div",
                      {
                        style: {
                          background: "rgba(253,230,138,0.1)",
                          border: "1px solid rgba(253,230,138,0.22)",
                          borderRadius: "4px",
                          padding: "1px 6px",
                          fontSize: "7.5px",
                          color: "#fde68a",
                          letterSpacing: "0.06em",
                          fontWeight: 700
                        },
                        children: "LIMITED"
                      }
                    ),
                    /* @__PURE__ */ f(
                      "button",
                      {
                        onClick: e,
                        style: {
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.16)",
                          borderRadius: "50%",
                          width: 20,
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "10px",
                          fontWeight: 700,
                          lineHeight: 1,
                          padding: 0,
                          flexShrink: 0
                        },
                        children: "x"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ T("div", { style: { flex: 1, display: "flex", minHeight: 0 }, children: [
              /* @__PURE__ */ T(
                "div",
                {
                  style: {
                    width: "36%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 5px",
                    position: "relative"
                  },
                  children: [
                    /* @__PURE__ */ f(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          inset: 0,
                          background: "radial-gradient(ellipse at 50% 58%,rgba(245,158,11,0.17) 0%,transparent 68%)"
                        }
                      }
                    ),
                    /* @__PURE__ */ T(
                      H.div,
                      {
                        animate: { y: [0, -5, 0] },
                        transition: { duration: 2.8, repeat: 1 / 0, ease: "easeInOut" },
                        style: {
                          width: "90%",
                          maxWidth: 125,
                          position: "relative",
                          zIndex: 1,
                          filter: "drop-shadow(0 0 16px rgba(251,191,36,0.65))"
                        },
                        children: [
                          /* @__PURE__ */ f(
                            H.div,
                            {
                              animate: { opacity: [0.5, 1, 0.5] },
                              transition: { duration: 2, repeat: 1 / 0, ease: "easeInOut" },
                              style: {
                                position: "absolute",
                                inset: "-22%",
                                background: "radial-gradient(circle,rgba(251,191,36,0.22) 0%,transparent 70%)",
                                borderRadius: "50%",
                                pointerEvents: "none"
                              }
                            }
                          ),
                          /* @__PURE__ */ f(Lr, {})
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    width: 1,
                    background: "linear-gradient(to bottom,transparent,rgba(253,230,138,0.22) 25%,rgba(253,230,138,0.22) 75%,transparent)",
                    flexShrink: 0,
                    margin: "8px 0"
                  }
                }
              ),
              /* @__PURE__ */ T(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "8px 10px 8px",
                    gap: "6px",
                    minWidth: 0
                  },
                  children: [
                    /* @__PURE__ */ T(
                      "div",
                      {
                        style: {
                          fontSize: "8px",
                          color: "rgba(203,213,225,0.7)",
                          lineHeight: 1.35,
                          flexShrink: 0
                        },
                        children: [
                          "Open for",
                          " ",
                          /* @__PURE__ */ f("span", { style: { color: "#fbbf24", fontWeight: 700 }, children: "1 random weapon reward" }),
                          " ",
                          "from 4 possible outcomes."
                        ]
                      }
                    ),
                    /* @__PURE__ */ T(
                      "div",
                      {
                        style: {
                          fontSize: "7px",
                          fontWeight: 700,
                          color: "rgba(253,230,138,0.65)",
                          letterSpacing: "0.1em",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          flexShrink: 0
                        },
                        children: [
                          /* @__PURE__ */ f("div", { style: { flex: 1, height: 1, background: "rgba(253,230,138,0.15)" } }),
                          "POSSIBLE REWARDS",
                          /* @__PURE__ */ f("div", { style: { flex: 1, height: 1, background: "rgba(253,230,138,0.15)" } })
                        ]
                      }
                    ),
                    /* @__PURE__ */ f("div", { style: { display: "flex", gap: "5px", flex: 1, minHeight: 0 }, children: Dt.map((n) => /* @__PURE__ */ f(ku, { item: n }, n.id)) }),
                    /* @__PURE__ */ T(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexShrink: 0
                        },
                        children: [
                          /* @__PURE__ */ T(
                            "div",
                            {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                background: "rgba(0,0,0,0.38)",
                                border: "1px solid rgba(56,189,248,0.3)",
                                borderRadius: "7px",
                                padding: "5px 9px",
                                flexShrink: 0
                              },
                              children: [
                                /* @__PURE__ */ f(Er, { size: 15 }),
                                /* @__PURE__ */ f(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "16px",
                                      fontWeight: 800,
                                      color: "#38bdf8",
                                      lineHeight: 1
                                    },
                                    children: "950"
                                  }
                                ),
                                /* @__PURE__ */ f(
                                  "span",
                                  {
                                    style: {
                                      fontSize: "7px",
                                      color: "rgba(148,163,184,0.8)",
                                      fontWeight: 600,
                                      lineHeight: 1,
                                      alignSelf: "flex-end",
                                      paddingBottom: "1px"
                                    },
                                    children: "GEMS"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ f(
                            "button",
                            {
                              onClick: t,
                              style: {
                                flex: 1,
                                background: "linear-gradient(135deg,#b45309 0%,#d97706 30%,#fbbf24 50%,#d97706 70%,#b45309 100%)",
                                border: "2px solid #fde68a",
                                borderRadius: "9px",
                                padding: "8px 0",
                                fontSize: "12px",
                                fontWeight: 900,
                                color: "#1c0a00",
                                cursor: "pointer",
                                letterSpacing: "0.07em",
                                boxShadow: "0 0 18px rgba(251,191,36,0.55),0 2px 0 rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.25)",
                                textShadow: "0 1px 0 rgba(255,255,255,0.22)"
                              },
                              children: "BUY NOW"
                            }
                          )
                        ]
                      }
                    )
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function Iu() {
  return /* @__PURE__ */ T(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: [
        /* @__PURE__ */ f(
          H.div,
          {
            animate: {
              scale: [1, 1.07, 0.93, 1.14, 0.87, 1.22, 0.05],
              rotate: [-3, 3, -5, 5, -6, 6, 0]
            },
            transition: { duration: 2, times: [0, 0.2, 0.38, 0.55, 0.68, 0.83, 1] },
            style: {
              width: 145,
              height: 145,
              filter: "drop-shadow(0 0 28px rgba(251,191,36,0.85))"
            },
            children: /* @__PURE__ */ f(Lr, {})
          }
        ),
        /* @__PURE__ */ f(
          H.div,
          {
            animate: { opacity: [0, 0, 0.5, 1] },
            transition: { duration: 2, times: [0, 0.68, 0.83, 1] },
            style: {
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle,rgba(253,230,138,0.95) 0%,rgba(245,158,11,0.55) 35%,transparent 65%)",
              pointerEvents: "none"
            }
          }
        )
      ]
    }
  );
}
function Bu({ item: t, onClose: e }) {
  return /* @__PURE__ */ T(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              backgroundImage: `repeating-conic-gradient(${t.glow} 0deg 10deg, transparent 10deg 20deg)`,
              opacity: 0.25
            }
          }
        ),
        /* @__PURE__ */ T(
          H.div,
          {
            initial: { scale: 0.15, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: "spring", bounce: 0.42, duration: 0.75 },
            style: {
              background: t.darkBg,
              border: `2.5px solid ${t.border}`,
              boxShadow: `0 0 40px ${t.glow},0 0 80px ${t.glow}`,
              borderRadius: "14px",
              padding: "18px 28px 18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              position: "relative",
              zIndex: 1,
              minWidth: "175px"
            },
            children: [
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    fontSize: "8.5px",
                    fontWeight: 700,
                    color: "rgba(203,213,225,0.65)",
                    letterSpacing: "0.13em"
                  },
                  children: "YOU RECEIVED"
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    background: `${t.border}30`,
                    border: `1px solid ${t.border}`,
                    borderRadius: "5px",
                    padding: "2px 10px",
                    fontSize: "9px",
                    fontWeight: 800,
                    color: t.color,
                    letterSpacing: "0.08em"
                  },
                  children: t.rarity
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    filter: `drop-shadow(0 0 14px ${t.glow})`,
                    margin: "8px 0 4px"
                  },
                  children: /* @__PURE__ */ f(kr, { type: t.iconType, color: t.color })
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#ffffff",
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: "200px"
                  },
                  children: t.fullName
                }
              ),
              /* @__PURE__ */ f(
                "button",
                {
                  onClick: e,
                  style: {
                    marginTop: "10px",
                    background: "linear-gradient(135deg,#b45309 0%,#d97706 30%,#fbbf24 50%,#d97706 70%,#b45309 100%)",
                    border: "2px solid #fde68a",
                    borderRadius: "8px",
                    padding: "7px 32px",
                    fontSize: "12px",
                    fontWeight: 900,
                    color: "#1c0a00",
                    cursor: "pointer",
                    letterSpacing: "0.06em",
                    boxShadow: "0 0 18px rgba(251,191,36,0.55)",
                    textShadow: "0 1px 0 rgba(255,255,255,0.2)"
                  },
                  children: "CLAIM!"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Fu({ onReopen: t }) {
  return /* @__PURE__ */ T(
    "div",
    {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "14px"
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(148,163,184,0.55)",
              letterSpacing: "0.15em"
            },
            children: "STORE CLOSED"
          }
        ),
        /* @__PURE__ */ f(
          "button",
          {
            onClick: t,
            style: {
              background: "linear-gradient(135deg,rgba(30,58,138,0.85),rgba(37,99,235,0.85))",
              border: "1.5px solid rgba(96,165,250,0.45)",
              borderRadius: "8px",
              padding: "8px 22px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#93c5fd",
              cursor: "pointer",
              letterSpacing: "0.07em",
              boxShadow: "0 0 12px rgba(59,130,246,0.3)"
            },
            children: "OPEN STORE"
          }
        )
      ]
    }
  );
}
function Ou() {
  const [t, e] = ee("shop"), [n, i] = ee(null);
  return Wt(() => {
    if (t !== "opening") return;
    const s = setTimeout(() => {
      const o = Math.random(), r = o < 0.5 ? Dt[0] : o < 0.8 ? Dt[1] : o < 0.95 ? Dt[2] : Dt[3];
      i(r), e("reveal");
    }, 2e3);
    return () => clearTimeout(s);
  }, [t]), /* @__PURE__ */ f(
    "div",
    {
      style: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center,#0f0a1a 0%,#060308 100%)",
        fontFamily: "'Segoe UI',system-ui,sans-serif"
      },
      children: /* @__PURE__ */ T(
        "div",
        {
          style: {
            position: "relative",
            width: "min(96vw,calc(91vh * 16 / 9))",
            aspectRatio: "16 / 9",
            background: "#161616",
            borderRadius: "18px",
            boxShadow: "0 0 0 1.5px #2c2c2c,0 0 0 3px #0e0e0e,0 28px 75px rgba(0,0,0,0.95)"
          },
          children: [
            /* @__PURE__ */ f(
              "div",
              {
                style: {
                  position: "absolute",
                  top: "50%",
                  right: "1.5%",
                  transform: "translateY(-50%)",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#222",
                  border: "1px solid #1a1a1a"
                }
              }
            ),
            /* @__PURE__ */ T(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: "5px",
                  borderRadius: "13px",
                  overflow: "hidden",
                  background: "#000"
                },
                children: [
                  /* @__PURE__ */ f(
                    "img",
                    {
                      src: Vu,
                      alt: "",
                      style: {
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "blur(7px) brightness(0.28) saturate(0.55)",
                        transform: "scale(1.12)"
                      }
                    }
                  ),
                  /* @__PURE__ */ f(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        inset: 0,
                        background: "radial-gradient(ellipse at center,transparent 18%,rgba(0,0,0,0.72) 100%)"
                      }
                    }
                  ),
                  /* @__PURE__ */ T(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        top: "6px",
                        left: "8px",
                        zIndex: 5,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid rgba(56,189,248,0.25)",
                        borderRadius: "6px",
                        padding: "3px 7px"
                      },
                      children: [
                        /* @__PURE__ */ f(Er, { size: 11 }),
                        /* @__PURE__ */ f("span", { style: { fontSize: "10px", fontWeight: 700, color: "#38bdf8", letterSpacing: "0.03em" }, children: "2,400" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ T(Xa, { mode: "wait", children: [
                    t === "shop" && /* @__PURE__ */ f(
                      H.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        transition: { duration: 0.22 },
                        style: { position: "absolute", inset: 0 },
                        children: /* @__PURE__ */ f(
                          Lu,
                          {
                            onBuy: () => e("opening"),
                            onClose: () => e("closed")
                          }
                        )
                      },
                      "shop"
                    ),
                    t === "opening" && /* @__PURE__ */ f(
                      H.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        transition: { duration: 0.18 },
                        style: { position: "absolute", inset: 0 },
                        children: /* @__PURE__ */ f(Iu, {})
                      },
                      "opening"
                    ),
                    t === "reveal" && n && /* @__PURE__ */ f(
                      H.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        transition: { duration: 0.22 },
                        style: { position: "absolute", inset: 0 },
                        children: /* @__PURE__ */ f(
                          Bu,
                          {
                            item: n,
                            onClose: () => {
                              i(null), e("shop");
                            }
                          }
                        )
                      },
                      "reveal"
                    ),
                    t === "closed" && /* @__PURE__ */ f(
                      H.div,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        exit: { opacity: 0 },
                        transition: { duration: 0.22 },
                        style: { position: "absolute", inset: 0 },
                        children: /* @__PURE__ */ f(Fu, { onReopen: () => e("shop") })
                      },
                      "closed"
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ f(
              "div",
              {
                style: {
                  position: "absolute",
                  right: -3.5,
                  top: "28%",
                  width: 3.5,
                  height: "34%",
                  background: "#1e1e1e",
                  borderRadius: "0 3px 3px 0"
                }
              }
            ),
            /* @__PURE__ */ f(
              "div",
              {
                style: {
                  position: "absolute",
                  left: -3.5,
                  top: "22%",
                  width: 3.5,
                  height: "15%",
                  background: "#1e1e1e",
                  borderRadius: "3px 0 0 3px"
                }
              }
            ),
            /* @__PURE__ */ f(
              "div",
              {
                style: {
                  position: "absolute",
                  left: -3.5,
                  top: "42%",
                  width: 3.5,
                  height: "15%",
                  background: "#1e1e1e",
                  borderRadius: "3px 0 0 3px"
                }
              }
            )
          ]
        }
      )
    }
  );
}
const ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ou
}, Symbol.toStringTag, { value: "Module" }));
export {
  _u as Code0_8
};
