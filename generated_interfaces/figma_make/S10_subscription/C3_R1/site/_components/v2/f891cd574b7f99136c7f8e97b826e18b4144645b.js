const Hu = () => Promise.resolve().then(() => Ku), _r = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: Ur, jsx: S, jsxs: _ } = _r;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function Qi(t) {
  const e = t?.props?._fgT, n = typeof e == "function" || typeof e == "string" || typeof e == "object" && e !== null && "$$typeof" in e;
  return globalThis.__GLOBALS__.React.isValidElement(t) && n;
}
function Ct(t) {
  return globalThis.__GLOBALS__.React.isValidElement(t) && t.type === "fg-txt";
}
function ts(t) {
  const { _fgT: e, _fgS: n, _fgB: i, _fgD: s, ...o } = t.props;
  return globalThis.__GLOBALS__.React.createElement(e, {
    ...o,
    key: t.key
  }, o.children);
}
function zt(t) {
  return Qi(t) ? ts(t) : Ct(t) ? t.props.children : t;
}
const At = globalThis.__GLOBALS__.React.Children, Wr = {
  map(t, e, n) {
    return At.map(t, (i, s) => {
      const o = zt(i);
      return Ct(i) ? null : e.call(n, o, s);
    });
  },
  forEach(t, e, n) {
    At.forEach(t, (i, s) => {
      if (Ct(i))
        return;
      const o = zt(i);
      e.call(n, o, s);
    });
  },
  count(t) {
    let e = 0;
    return At.forEach(t, (n) => {
      Ct(n) || e++;
    }), e;
  },
  toArray(t) {
    const e = [];
    return At.forEach(t, (n) => {
      Ct(n) || e.push(zt(n));
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
function $r(t) {
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
const Fn = globalThis.__GLOBALS__.React.cloneElement, zr = (t, ...e) => {
  if (Qi(t)) {
    const n = ts(t), i = e[0];
    return i != null && typeof i == "object" && (e = [
      $r(i),
      ...e.slice(1)
    ]), Fn(n, ...e);
  }
  return Fn(t, ...e);
};
({
  ...globalThis.__GLOBALS__.React
});
const { Component: es, createContext: Tt, createElement: Qt, createFactory: Xu, createRef: Yu, forwardRef: Xe, Fragment: ns, isValidElement: Kr, lazy: qu, memo: Zu, Profiler: Ju, PureComponent: Qu, startTransition: th, StrictMode: eh, Suspense: nh, use: ih, useCallback: Ye, useContext: F, useDebugValue: sh, useDeferredValue: rh, useEffect: oe, useId: qe, useImperativeHandle: oh, useInsertionEffect: is, useLayoutEffect: Gr, useMemo: ut, useReducer: ah, useRef: Q, useState: te, useSyncExternalStore: lh, useTransition: ch, version: uh, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: hh } = globalThis.__GLOBALS__.React;
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hr = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xr = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, n, i) => i ? i.toUpperCase() : n.toLowerCase()
), In = (t) => {
  const e = Xr(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, ss = (...t) => t.filter((e, n, i) => !!e && e.trim() !== "" && i.indexOf(e) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Yr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qr = Xe(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: i,
    className: s = "",
    children: o,
    iconNode: r,
    ...a
  }, l) => Qt(
    "svg",
    {
      ref: l,
      ...Yr,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: i ? Number(n) * 24 / Number(e) : n,
      className: ss("lucide", s),
      ...a
    },
    [
      ...r.map(([u, c]) => Qt(u, c)),
      ...Array.isArray(o) ? o : [o]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bt = (t, e) => {
  const n = Xe(
    ({ className: i, ...s }, o) => Qt(qr, {
      ref: o,
      iconNode: e,
      className: ss(
        `lucide-${Hr(In(t))}`,
        `lucide-${t}`,
        i
      ),
      ...s
    })
  );
  return n.displayName = In(t), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zr = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Jr = bt("check", Zr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], to = bt("layers", Qr);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eo = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
], rs = bt("sparkles", eo);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const no = [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",
      key: "ul74o6"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
], io = bt("wand-sparkles", no);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const so = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], ro = bt("x", so);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oo = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], ao = bt("zap", oo), Ze = Tt({});
function Je(t) {
  const e = Q(null);
  return e.current === null && (e.current = t()), e.current;
}
const Qe = typeof window < "u", os = Qe ? Gr : oe, ae = /* @__PURE__ */ Tt(null);
function tn(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function en(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
const Y = (t, e, n) => n > e ? e : n < t ? t : n;
let nn = () => {
};
const q = {}, as = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function ls(t) {
  return typeof t == "object" && t !== null;
}
const cs = (t) => /^0[^.\s]+$/u.test(t);
// @__NO_SIDE_EFFECTS__
function sn(t) {
  let e;
  return () => (e === void 0 && (e = t()), e);
}
const K = /* @__NO_SIDE_EFFECTS__ */ (t) => t, lo = (t, e) => (n) => e(t(n)), _t = (...t) => t.reduce(lo), Bt = /* @__NO_SIDE_EFFECTS__ */ (t, e, n) => {
  const i = e - t;
  return i === 0 ? 1 : (n - t) / i;
};
class rn {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return tn(this.subscriptions, e), () => en(this.subscriptions, e);
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
const H = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, z = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function us(t, e) {
  return e ? t * (1e3 / e) : 0;
}
const hs = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t, co = 1e-7, uo = 12;
function ho(t, e, n, i, s) {
  let o, r, a = 0;
  do
    r = e + (n - e) / 2, o = hs(r, i, s) - t, o > 0 ? n = r : e = r;
  while (Math.abs(o) > co && ++a < uo);
  return r;
}
function Ut(t, e, n, i) {
  if (t === e && n === i)
    return K;
  const s = (o) => ho(o, 0, 1, t, n);
  return (o) => o === 0 || o === 1 ? o : hs(s(o), e, i);
}
const fs = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2, ds = (t) => (e) => 1 - t(1 - e), ps = /* @__PURE__ */ Ut(0.33, 1.53, 0.69, 0.99), on = /* @__PURE__ */ ds(ps), ms = /* @__PURE__ */ fs(on), gs = (t) => (t *= 2) < 1 ? 0.5 * on(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))), an = (t) => 1 - Math.sin(Math.acos(t)), ys = ds(an), vs = fs(an), fo = /* @__PURE__ */ Ut(0.42, 0, 1, 1), po = /* @__PURE__ */ Ut(0, 0, 0.58, 1), xs = /* @__PURE__ */ Ut(0.42, 0, 0.58, 1), mo = (t) => Array.isArray(t) && typeof t[0] != "number", Ts = (t) => Array.isArray(t) && typeof t[0] == "number", go = {
  linear: K,
  easeIn: fo,
  easeInOut: xs,
  easeOut: po,
  circIn: an,
  circInOut: vs,
  circOut: ys,
  backIn: on,
  backInOut: ms,
  backOut: ps,
  anticipate: gs
}, yo = (t) => typeof t == "string", On = (t) => {
  if (Ts(t)) {
    nn(t.length === 4);
    const [e, n, i, s] = t;
    return Ut(e, n, i, s);
  } else if (yo(t))
    return go[t];
  return t;
}, Kt = [
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
function vo(t, e) {
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
    schedule: (c, h = !1, f = !1) => {
      const p = f && s ? n : i;
      return h && r.add(c), p.has(c) || p.add(c), c;
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
const xo = 40;
function bs(t, e) {
  let n = !1, i = !0;
  const s = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, o = () => n = !0, r = Kt.reduce((y, w) => (y[w] = vo(o), y), {}), { setup: a, read: l, resolveKeyframes: u, preUpdate: c, update: h, preRender: f, render: d, postRender: p } = r, g = () => {
    const y = q.useManualTiming ? s.timestamp : performance.now();
    n = !1, q.useManualTiming || (s.delta = i ? 1e3 / 60 : Math.max(Math.min(y - s.timestamp, xo), 1)), s.timestamp = y, s.isProcessing = !0, a.process(s), l.process(s), u.process(s), c.process(s), h.process(s), f.process(s), d.process(s), p.process(s), s.isProcessing = !1, n && e && (i = !1, t(g));
  }, v = () => {
    n = !0, i = !0, s.isProcessing || t(g);
  };
  return { schedule: Kt.reduce((y, w) => {
    const T = r[w];
    return y[w] = (A, V = !1, P = !1) => (n || v(), T.schedule(A, V, P)), y;
  }, {}), cancel: (y) => {
    for (let w = 0; w < Kt.length; w++)
      r[Kt[w]].cancel(y);
  }, state: s, steps: r };
}
const { schedule: C, cancel: tt, state: B, steps: fe } = /* @__PURE__ */ bs(typeof requestAnimationFrame < "u" ? requestAnimationFrame : K, !0);
let Yt;
function To() {
  Yt = void 0;
}
const N = {
  now: () => (Yt === void 0 && N.set(B.isProcessing || q.useManualTiming ? B.timestamp : performance.now()), Yt),
  set: (t) => {
    Yt = t, queueMicrotask(To);
  }
}, Ps = (t) => (e) => typeof e == "string" && e.startsWith(t), ln = /* @__PURE__ */ Ps("--"), bo = /* @__PURE__ */ Ps("var(--"), cn = (t) => bo(t) ? Po.test(t.split("/*")[0].trim()) : !1, Po = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, Pt = {
  test: (t) => typeof t == "number",
  parse: parseFloat,
  transform: (t) => t
}, Ft = {
  ...Pt,
  transform: (t) => Y(0, 1, t)
}, Gt = {
  ...Pt,
  default: 1
}, Dt = (t) => Math.round(t * 1e5) / 1e5, un = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function So(t) {
  return t == null;
}
const wo = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, hn = (t, e) => (n) => !!(typeof n == "string" && wo.test(n) && n.startsWith(t) || e && !So(n) && Object.prototype.hasOwnProperty.call(n, e)), Ss = (t, e, n) => (i) => {
  if (typeof i != "string")
    return i;
  const [s, o, r, a] = i.match(un);
  return {
    [t]: parseFloat(s),
    [e]: parseFloat(o),
    [n]: parseFloat(r),
    alpha: a !== void 0 ? parseFloat(a) : 1
  };
}, Ao = (t) => Y(0, 255, t), de = {
  ...Pt,
  transform: (t) => Math.round(Ao(t))
}, ot = {
  test: /* @__PURE__ */ hn("rgb", "red"),
  parse: /* @__PURE__ */ Ss("red", "green", "blue"),
  transform: ({ red: t, green: e, blue: n, alpha: i = 1 }) => "rgba(" + de.transform(t) + ", " + de.transform(e) + ", " + de.transform(n) + ", " + Dt(Ft.transform(i)) + ")"
};
function Vo(t) {
  let e = "", n = "", i = "", s = "";
  return t.length > 5 ? (e = t.substring(1, 3), n = t.substring(3, 5), i = t.substring(5, 7), s = t.substring(7, 9)) : (e = t.substring(1, 2), n = t.substring(2, 3), i = t.substring(3, 4), s = t.substring(4, 5), e += e, n += n, i += i, s += s), {
    red: parseInt(e, 16),
    green: parseInt(n, 16),
    blue: parseInt(i, 16),
    alpha: s ? parseInt(s, 16) / 255 : 1
  };
}
const Ce = {
  test: /* @__PURE__ */ hn("#"),
  parse: Vo,
  transform: ot.transform
}, Wt = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
  test: (e) => typeof e == "string" && e.endsWith(t) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${t}`
}), J = /* @__PURE__ */ Wt("deg"), X = /* @__PURE__ */ Wt("%"), b = /* @__PURE__ */ Wt("px"), Co = /* @__PURE__ */ Wt("vh"), Mo = /* @__PURE__ */ Wt("vw"), jn = {
  ...X,
  parse: (t) => X.parse(t) / 100,
  transform: (t) => X.transform(t * 100)
}, ft = {
  test: /* @__PURE__ */ hn("hsl", "hue"),
  parse: /* @__PURE__ */ Ss("hue", "saturation", "lightness"),
  transform: ({ hue: t, saturation: e, lightness: n, alpha: i = 1 }) => "hsla(" + Math.round(t) + ", " + X.transform(Dt(e)) + ", " + X.transform(Dt(n)) + ", " + Dt(Ft.transform(i)) + ")"
}, E = {
  test: (t) => ot.test(t) || Ce.test(t) || ft.test(t),
  parse: (t) => ot.test(t) ? ot.parse(t) : ft.test(t) ? ft.parse(t) : Ce.parse(t),
  transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? ot.transform(t) : ft.transform(t),
  getAnimatableNone: (t) => {
    const e = E.parse(t);
    return e.alpha = 0, E.transform(e);
  }
}, Do = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Ro(t) {
  return isNaN(t) && typeof t == "string" && (t.match(un)?.length || 0) + (t.match(Do)?.length || 0) > 0;
}
const ws = "number", As = "color", Eo = "var", Lo = "var(", Nn = "${}", ko = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function It(t) {
  const e = t.toString(), n = [], i = {
    color: [],
    number: [],
    var: []
  }, s = [];
  let o = 0;
  const a = e.replace(ko, (l) => (E.test(l) ? (i.color.push(o), s.push(As), n.push(E.parse(l))) : l.startsWith(Lo) ? (i.var.push(o), s.push(Eo), n.push(l)) : (i.number.push(o), s.push(ws), n.push(parseFloat(l))), ++o, Nn)).split(Nn);
  return { values: n, split: a, indexes: i, types: s };
}
function Vs(t) {
  return It(t).values;
}
function Cs(t) {
  const { split: e, types: n } = It(t), i = e.length;
  return (s) => {
    let o = "";
    for (let r = 0; r < i; r++)
      if (o += e[r], s[r] !== void 0) {
        const a = n[r];
        a === ws ? o += Dt(s[r]) : a === As ? o += E.transform(s[r]) : o += s[r];
      }
    return o;
  };
}
const Bo = (t) => typeof t == "number" ? 0 : E.test(t) ? E.getAnimatableNone(t) : t;
function Fo(t) {
  const e = Vs(t);
  return Cs(t)(e.map(Bo));
}
const et = {
  test: Ro,
  parse: Vs,
  createTransformer: Cs,
  getAnimatableNone: Fo
};
function pe(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Io({ hue: t, saturation: e, lightness: n, alpha: i }) {
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
function ee(t, e) {
  return (n) => n > 0 ? e : t;
}
const M = (t, e, n) => t + (e - t) * n, me = (t, e, n) => {
  const i = t * t, s = n * (e * e - i) + i;
  return s < 0 ? 0 : Math.sqrt(s);
}, Oo = [Ce, ot, ft], jo = (t) => Oo.find((e) => e.test(t));
function _n(t) {
  const e = jo(t);
  if (!e)
    return !1;
  let n = e.parse(t);
  return e === ft && (n = Io(n)), n;
}
const Un = (t, e) => {
  const n = _n(t), i = _n(e);
  if (!n || !i)
    return ee(t, e);
  const s = { ...n };
  return (o) => (s.red = me(n.red, i.red, o), s.green = me(n.green, i.green, o), s.blue = me(n.blue, i.blue, o), s.alpha = M(n.alpha, i.alpha, o), ot.transform(s));
}, Me = /* @__PURE__ */ new Set(["none", "hidden"]);
function No(t, e) {
  return Me.has(t) ? (n) => n <= 0 ? t : e : (n) => n >= 1 ? e : t;
}
function _o(t, e) {
  return (n) => M(t, e, n);
}
function fn(t) {
  return typeof t == "number" ? _o : typeof t == "string" ? cn(t) ? ee : E.test(t) ? Un : $o : Array.isArray(t) ? Ms : typeof t == "object" ? E.test(t) ? Un : Uo : ee;
}
function Ms(t, e) {
  const n = [...t], i = n.length, s = t.map((o, r) => fn(o)(o, e[r]));
  return (o) => {
    for (let r = 0; r < i; r++)
      n[r] = s[r](o);
    return n;
  };
}
function Uo(t, e) {
  const n = { ...t, ...e }, i = {};
  for (const s in n)
    t[s] !== void 0 && e[s] !== void 0 && (i[s] = fn(t[s])(t[s], e[s]));
  return (s) => {
    for (const o in i)
      n[o] = i[o](s);
    return n;
  };
}
function Wo(t, e) {
  const n = [], i = { color: 0, var: 0, number: 0 };
  for (let s = 0; s < e.values.length; s++) {
    const o = e.types[s], r = t.indexes[o][i[o]], a = t.values[r] ?? 0;
    n[s] = a, i[o]++;
  }
  return n;
}
const $o = (t, e) => {
  const n = et.createTransformer(e), i = It(t), s = It(e);
  return i.indexes.var.length === s.indexes.var.length && i.indexes.color.length === s.indexes.color.length && i.indexes.number.length >= s.indexes.number.length ? Me.has(t) && !s.values.length || Me.has(e) && !i.values.length ? No(t, e) : _t(Ms(Wo(i, s), s.values), n) : ee(t, e);
};
function Ds(t, e, n) {
  return typeof t == "number" && typeof e == "number" && typeof n == "number" ? M(t, e, n) : fn(t)(t, e);
}
const zo = (t) => {
  const e = ({ timestamp: n }) => t(n);
  return {
    start: (n = !0) => C.update(e, n),
    stop: () => tt(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => B.isProcessing ? B.timestamp : N.now()
  };
}, Rs = (t, e, n = 10) => {
  let i = "";
  const s = Math.max(Math.round(e / n), 2);
  for (let o = 0; o < s; o++)
    i += Math.round(t(o / (s - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${i.substring(0, i.length - 2)})`;
}, ne = 2e4;
function dn(t) {
  let e = 0;
  const n = 50;
  let i = t.next(e);
  for (; !i.done && e < ne; )
    e += n, i = t.next(e);
  return e >= ne ? 1 / 0 : e;
}
function Ko(t, e = 100, n) {
  const i = n({ ...t, keyframes: [0, e] }), s = Math.min(dn(i), ne);
  return {
    type: "keyframes",
    ease: (o) => i.next(s * o).value / e,
    duration: /* @__PURE__ */ z(s)
  };
}
const Go = 5;
function Es(t, e, n) {
  const i = Math.max(e - Go, 0);
  return us(n - t(i), e - i);
}
const D = {
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
function Ho({ duration: t = D.duration, bounce: e = D.bounce, velocity: n = D.velocity, mass: i = D.mass }) {
  let s, o, r = 1 - e;
  r = Y(D.minDamping, D.maxDamping, r), t = Y(D.minDuration, D.maxDuration, /* @__PURE__ */ z(t)), r < 1 ? (s = (u) => {
    const c = u * r, h = c * t, f = c - n, d = De(u, r), p = Math.exp(-h);
    return ge - f / d * p;
  }, o = (u) => {
    const h = u * r * t, f = h * n + n, d = Math.pow(r, 2) * Math.pow(u, 2) * t, p = Math.exp(-h), g = De(Math.pow(u, 2), r);
    return (-s(u) + ge > 0 ? -1 : 1) * ((f - d) * p) / g;
  }) : (s = (u) => {
    const c = Math.exp(-u * t), h = (u - n) * t + 1;
    return -ge + c * h;
  }, o = (u) => {
    const c = Math.exp(-u * t), h = (n - u) * (t * t);
    return c * h;
  });
  const a = 5 / t, l = Yo(s, o, a);
  if (t = /* @__PURE__ */ H(t), isNaN(l))
    return {
      stiffness: D.stiffness,
      damping: D.damping,
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
const Xo = 12;
function Yo(t, e, n) {
  let i = n;
  for (let s = 1; s < Xo; s++)
    i = i - t(i) / e(i);
  return i;
}
function De(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const qo = ["duration", "bounce"], Zo = ["stiffness", "damping", "mass"];
function Wn(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Jo(t) {
  let e = {
    velocity: D.velocity,
    stiffness: D.stiffness,
    damping: D.damping,
    mass: D.mass,
    isResolvedFromDuration: !1,
    ...t
  };
  if (!Wn(t, Zo) && Wn(t, qo))
    if (t.visualDuration) {
      const n = t.visualDuration, i = 2 * Math.PI / (n * 1.2), s = i * i, o = 2 * Y(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(s);
      e = {
        ...e,
        mass: D.mass,
        stiffness: s,
        damping: o
      };
    } else {
      const n = Ho(t);
      e = {
        ...e,
        ...n,
        mass: D.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function ie(t = D.visualDuration, e = D.bounce) {
  const n = typeof t != "object" ? {
    visualDuration: t,
    keyframes: [0, 1],
    bounce: e
  } : t;
  let { restSpeed: i, restDelta: s } = n;
  const o = n.keyframes[0], r = n.keyframes[n.keyframes.length - 1], a = { done: !1, value: o }, { stiffness: l, damping: u, mass: c, duration: h, velocity: f, isResolvedFromDuration: d } = Jo({
    ...n,
    velocity: -/* @__PURE__ */ z(n.velocity || 0)
  }), p = f || 0, g = u / (2 * Math.sqrt(l * c)), v = r - o, m = /* @__PURE__ */ z(Math.sqrt(l / c)), x = Math.abs(v) < 5;
  i || (i = x ? D.restSpeed.granular : D.restSpeed.default), s || (s = x ? D.restDelta.granular : D.restDelta.default);
  let y;
  if (g < 1) {
    const T = De(m, g);
    y = (A) => {
      const V = Math.exp(-g * m * A);
      return r - V * ((p + g * m * v) / T * Math.sin(T * A) + v * Math.cos(T * A));
    };
  } else if (g === 1)
    y = (T) => r - Math.exp(-m * T) * (v + (p + m * v) * T);
  else {
    const T = m * Math.sqrt(g * g - 1);
    y = (A) => {
      const V = Math.exp(-g * m * A), P = Math.min(T * A, 300);
      return r - V * ((p + g * m * v) * Math.sinh(P) + T * v * Math.cosh(P)) / T;
    };
  }
  const w = {
    calculatedDuration: d && h || null,
    next: (T) => {
      const A = y(T);
      if (d)
        a.done = T >= h;
      else {
        let V = T === 0 ? p : 0;
        g < 1 && (V = T === 0 ? /* @__PURE__ */ H(p) : Es(y, T, A));
        const P = Math.abs(V) <= i, L = Math.abs(r - A) <= s;
        a.done = P && L;
      }
      return a.value = a.done ? r : A, a;
    },
    toString: () => {
      const T = Math.min(dn(w), ne), A = Rs((V) => w.next(T * V).value, T, 30);
      return T + "ms " + A;
    },
    toTransition: () => {
    }
  };
  return w;
}
ie.applyToOptions = (t) => {
  const e = Ko(t, 100, ie);
  return t.ease = e.ease, t.duration = /* @__PURE__ */ H(e.duration), t.type = "keyframes", t;
};
function Re({ keyframes: t, velocity: e = 0, power: n = 0.8, timeConstant: i = 325, bounceDamping: s = 10, bounceStiffness: o = 500, modifyTarget: r, min: a, max: l, restDelta: u = 0.5, restSpeed: c }) {
  const h = t[0], f = {
    done: !1,
    value: h
  }, d = (P) => a !== void 0 && P < a || l !== void 0 && P > l, p = (P) => a === void 0 ? l : l === void 0 || Math.abs(a - P) < Math.abs(l - P) ? a : l;
  let g = n * e;
  const v = h + g, m = r === void 0 ? v : r(v);
  m !== v && (g = m - h);
  const x = (P) => -g * Math.exp(-P / i), y = (P) => m + x(P), w = (P) => {
    const L = x(P), O = y(P);
    f.done = Math.abs(L) <= u, f.value = f.done ? m : O;
  };
  let T, A;
  const V = (P) => {
    d(f.value) && (T = P, A = ie({
      keyframes: [f.value, p(f.value)],
      velocity: Es(y, P, f.value),
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
      return !A && T === void 0 && (L = !0, w(P), V(P)), T !== void 0 && P >= T ? A.next(P - T) : (!L && w(P), f);
    }
  };
}
function Qo(t, e, n) {
  const i = [], s = n || q.mix || Ds, o = t.length - 1;
  for (let r = 0; r < o; r++) {
    let a = s(t[r], t[r + 1]);
    if (e) {
      const l = Array.isArray(e) ? e[r] || K : e;
      a = _t(l, a);
    }
    i.push(a);
  }
  return i;
}
function ta(t, e, { clamp: n = !0, ease: i, mixer: s } = {}) {
  const o = t.length;
  if (nn(o === e.length), o === 1)
    return () => e[0];
  if (o === 2 && e[0] === e[1])
    return () => e[1];
  const r = t[0] === t[1];
  t[0] > t[o - 1] && (t = [...t].reverse(), e = [...e].reverse());
  const a = Qo(e, i, s), l = a.length, u = (c) => {
    if (r && c < t[0])
      return e[0];
    let h = 0;
    if (l > 1)
      for (; h < t.length - 2 && !(c < t[h + 1]); h++)
        ;
    const f = /* @__PURE__ */ Bt(t[h], t[h + 1], c);
    return a[h](f);
  };
  return n ? (c) => u(Y(t[0], t[o - 1], c)) : u;
}
function ea(t, e) {
  const n = t[t.length - 1];
  for (let i = 1; i <= e; i++) {
    const s = /* @__PURE__ */ Bt(0, e, i);
    t.push(M(n, 1, s));
  }
}
function na(t) {
  const e = [0];
  return ea(e, t.length - 1), e;
}
function ia(t, e) {
  return t.map((n) => n * e);
}
function sa(t, e) {
  return t.map(() => e || xs).splice(0, t.length - 1);
}
function Rt({ duration: t = 300, keyframes: e, times: n, ease: i = "easeInOut" }) {
  const s = mo(i) ? i.map(On) : On(i), o = {
    done: !1,
    value: e[0]
  }, r = ia(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    n && n.length === e.length ? n : na(e),
    t
  ), a = ta(r, e, {
    ease: Array.isArray(s) ? s : sa(e, s)
  });
  return {
    calculatedDuration: t,
    next: (l) => (o.value = a(l), o.done = l >= t, o)
  };
}
const ra = (t) => t !== null;
function pn(t, { repeat: e, repeatType: n = "loop" }, i, s = 1) {
  const o = t.filter(ra), a = s < 0 || e && n !== "loop" && e % 2 === 1 ? 0 : o.length - 1;
  return !a || i === void 0 ? o[a] : i;
}
const oa = {
  decay: Re,
  inertia: Re,
  tween: Rt,
  keyframes: Rt,
  spring: ie
};
function Ls(t) {
  typeof t.type == "string" && (t.type = oa[t.type]);
}
class mn {
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
const aa = (t) => t / 100;
class gn extends mn {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
      const { motionValue: n } = this.options;
      n && n.updatedAt !== N.now() && this.tick(N.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Ls(e);
    const { type: n = Rt, repeat: i = 0, repeatDelay: s = 0, repeatType: o, velocity: r = 0 } = e;
    let { keyframes: a } = e;
    const l = n || Rt;
    l !== Rt && typeof a[0] != "number" && (this.mixKeyframes = _t(aa, Ds(a[0], a[1])), a = [0, 100]);
    const u = l({ ...e, keyframes: a });
    o === "mirror" && (this.mirroredGenerator = l({
      ...e,
      keyframes: [...a].reverse(),
      velocity: -r
    })), u.calculatedDuration === null && (u.calculatedDuration = dn(u));
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
    const { delay: u = 0, keyframes: c, repeat: h, repeatType: f, repeatDelay: d, type: p, onUpdate: g, finalKeyframe: v } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - s / this.speed, this.startTime)), n ? this.currentTime = e : this.updateTime(e);
    const m = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1), x = this.playbackSpeed >= 0 ? m < 0 : m > s;
    this.currentTime = Math.max(m, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = s);
    let y = this.currentTime, w = i;
    if (h) {
      const P = Math.min(this.currentTime, s) / a;
      let L = Math.floor(P), O = P % 1;
      !O && P >= 1 && (O = 1), O === 1 && L--, L = Math.min(L, h + 1), !!(L % 2) && (f === "reverse" ? (O = 1 - O, d && (O -= d / a)) : f === "mirror" && (w = r)), y = Y(0, 1, O) * a;
    }
    const T = x ? { done: !1, value: c[0] } : w.next(y);
    o && (T.value = o(T.value));
    let { done: A } = T;
    !x && l !== null && (A = this.playbackSpeed >= 0 ? this.currentTime >= s : this.currentTime <= 0);
    const V = this.holdTime === null && (this.state === "finished" || this.state === "running" && A);
    return V && p !== Re && (T.value = pn(c, this.options, v, this.speed)), g && g(T.value), V && this.finish(), T;
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
    return /* @__PURE__ */ z(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ z(e);
  }
  get time() {
    return /* @__PURE__ */ z(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ H(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    this.updateTime(N.now());
    const n = this.playbackSpeed !== e;
    this.playbackSpeed = e, n && (this.time = /* @__PURE__ */ z(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = zo, startTime: n } = this.options;
    this.driver || (this.driver = e((s) => this.tick(s))), this.options.onPlay?.();
    const i = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = i) : this.holdTime !== null ? this.startTime = i - this.holdTime : this.startTime || (this.startTime = n ?? i), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(N.now()), this.holdTime = this.currentTime;
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
function la(t) {
  for (let e = 1; e < t.length; e++)
    t[e] ?? (t[e] = t[e - 1]);
}
const at = (t) => t * 180 / Math.PI, Ee = (t) => {
  const e = at(Math.atan2(t[1], t[0]));
  return Le(e);
}, ca = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
  rotate: Ee,
  rotateZ: Ee,
  skewX: (t) => at(Math.atan(t[1])),
  skewY: (t) => at(Math.atan(t[2])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, Le = (t) => (t = t % 360, t < 0 && (t += 360), t), $n = Ee, zn = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), Kn = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), ua = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: zn,
  scaleY: Kn,
  scale: (t) => (zn(t) + Kn(t)) / 2,
  rotateX: (t) => Le(at(Math.atan2(t[6], t[5]))),
  rotateY: (t) => Le(at(Math.atan2(-t[2], t[0]))),
  rotateZ: $n,
  rotate: $n,
  skewX: (t) => at(Math.atan(t[4])),
  skewY: (t) => at(Math.atan(t[1])),
  skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function ke(t) {
  return t.includes("scale") ? 1 : 0;
}
function Be(t, e) {
  if (!t || t === "none")
    return ke(e);
  const n = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let i, s;
  if (n)
    i = ua, s = n;
  else {
    const a = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    i = ca, s = a;
  }
  if (!s)
    return ke(e);
  const o = i[e], r = s[1].split(",").map(fa);
  return typeof o == "function" ? o(r) : r[o];
}
const ha = (t, e) => {
  const { transform: n = "none" } = getComputedStyle(t);
  return Be(n, e);
};
function fa(t) {
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
], wt = new Set(St), Gn = (t) => t === Pt || t === b, da = /* @__PURE__ */ new Set(["x", "y", "z"]), pa = St.filter((t) => !da.has(t));
function ma(t) {
  const e = [];
  return pa.forEach((n) => {
    const i = t.getValue(n);
    i !== void 0 && (e.push([n, i.get()]), i.set(n.startsWith("scale") ? 1 : 0));
  }), e;
}
const lt = {
  // Dimensions
  width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) => t.max - t.min - parseFloat(e) - parseFloat(n),
  top: (t, { top: e }) => parseFloat(e),
  left: (t, { left: e }) => parseFloat(e),
  bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
  right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
  // Transform
  x: (t, { transform: e }) => Be(e, "x"),
  y: (t, { transform: e }) => Be(e, "y")
};
lt.translateX = lt.x;
lt.translateY = lt.y;
const ct = /* @__PURE__ */ new Set();
let Fe = !1, Ie = !1, Oe = !1;
function ks() {
  if (Ie) {
    const t = Array.from(ct).filter((i) => i.needsMeasurement), e = new Set(t.map((i) => i.element)), n = /* @__PURE__ */ new Map();
    e.forEach((i) => {
      const s = ma(i);
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
  Ie = !1, Fe = !1, ct.forEach((t) => t.complete(Oe)), ct.clear();
}
function Bs() {
  ct.forEach((t) => {
    t.readKeyframes(), t.needsMeasurement && (Ie = !0);
  });
}
function ga() {
  Oe = !0, Bs(), ks(), Oe = !1;
}
class yn {
  constructor(e, n, i, s, o, r = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = n, this.name = i, this.motionValue = s, this.element = o, this.isAsync = r;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ct.add(this), Fe || (Fe = !0, C.read(Bs), C.resolveKeyframes(ks))) : (this.readKeyframes(), this.complete());
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
    la(e);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ct.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ct.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const ya = (t) => t.startsWith("--");
function va(t, e, n) {
  ya(e) ? t.style.setProperty(e, n) : t.style[e] = n;
}
const xa = /* @__PURE__ */ sn(() => window.ScrollTimeline !== void 0), Ta = {};
function ba(t, e) {
  const n = /* @__PURE__ */ sn(t);
  return () => Ta[e] ?? n();
}
const Fs = /* @__PURE__ */ ba(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Mt = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`, Hn = {
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
function Is(t, e) {
  if (t)
    return typeof t == "function" ? Fs() ? Rs(t, e) : "ease-out" : Ts(t) ? Mt(t) : Array.isArray(t) ? t.map((n) => Is(n, e) || Hn.easeOut) : Hn[t];
}
function Pa(t, e, n, { delay: i = 0, duration: s = 300, repeat: o = 0, repeatType: r = "loop", ease: a = "easeOut", times: l } = {}, u = void 0) {
  const c = {
    [e]: n
  };
  l && (c.offset = l);
  const h = Is(a, s);
  Array.isArray(h) && (c.easing = h);
  const f = {
    delay: i,
    duration: s,
    easing: Array.isArray(h) ? "linear" : h,
    fill: "both",
    iterations: o + 1,
    direction: r === "reverse" ? "alternate" : "normal"
  };
  return u && (f.pseudoElement = u), t.animate(c, f);
}
function Os(t) {
  return typeof t == "function" && "applyToOptions" in t;
}
function Sa({ type: t, ...e }) {
  return Os(t) && Fs() ? t.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class wa extends mn {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, !e)
      return;
    const { element: n, name: i, keyframes: s, pseudoElement: o, allowFlatten: r = !1, finalKeyframe: a, onComplete: l } = e;
    this.isPseudoElement = !!o, this.allowFlatten = r, this.options = e, nn(typeof e.type != "string");
    const u = Sa(e);
    this.animation = Pa(n, i, s, u, o), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !o) {
        const c = pn(s, this.options, a, this.speed);
        this.updateMotionValue ? this.updateMotionValue(c) : va(n, i, c), this.animation.cancel();
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
    return /* @__PURE__ */ z(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ z(e);
  }
  get time() {
    return /* @__PURE__ */ z(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ H(e);
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && xa() ? (this.animation.timeline = e, K) : n(this);
  }
}
const js = {
  anticipate: gs,
  backInOut: ms,
  circInOut: vs
};
function Aa(t) {
  return t in js;
}
function Va(t) {
  typeof t.ease == "string" && Aa(t.ease) && (t.ease = js[t.ease]);
}
const Xn = 10;
class Ca extends wa {
  constructor(e) {
    Va(e), Ls(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
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
    const a = new gn({
      ...r,
      autoplay: !1
    }), l = /* @__PURE__ */ H(this.finishedTime ?? this.time);
    n.setWithVelocity(a.sample(l - Xn).value, a.sample(l).value, Xn), a.stop();
  }
}
const Yn = (t, e) => e === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && // It's animatable if we have a string
(et.test(t) || t === "0") && // And it contains numbers and/or colors
!t.startsWith("url("));
function Ma(t) {
  const e = t[0];
  if (t.length === 1)
    return !0;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e)
      return !0;
}
function Da(t, e, n, i) {
  const s = t[0];
  if (s === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const o = t[t.length - 1], r = Yn(s, e), a = Yn(o, e);
  return !r || !a ? !1 : Ma(t) || (n === "spring" || Os(n)) && i;
}
function je(t) {
  t.duration = 0, t.type = "keyframes";
}
const Ra = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Could be re-enabled now we have support for linear() easing
  // "background-color"
]), Ea = /* @__PURE__ */ sn(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function La(t) {
  const { motionValue: e, name: n, repeatDelay: i, repeatType: s, damping: o, type: r } = t;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: l, transformTemplate: u } = e.owner.getProps();
  return Ea() && n && Ra.has(n) && (n !== "transform" || !u) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !l && !i && s !== "mirror" && o !== 0 && r !== "inertia";
}
const ka = 40;
class Ba extends mn {
  constructor({ autoplay: e = !0, delay: n = 0, type: i = "keyframes", repeat: s = 0, repeatDelay: o = 0, repeatType: r = "loop", keyframes: a, name: l, motionValue: u, element: c, ...h }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = N.now();
    const f = {
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
    }, d = c?.KeyframeResolver || yn;
    this.keyframeResolver = new d(a, (p, g, v) => this.onKeyframesResolved(p, g, f, !v), l, u, c), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, n, i, s) {
    this.keyframeResolver = void 0;
    const { name: o, type: r, velocity: a, delay: l, isHandoff: u, onUpdate: c } = i;
    this.resolvedAt = N.now(), Da(e, o, r, a) || ((q.instantAnimations || !l) && c?.(pn(e, i, n)), e[0] = e[e.length - 1], je(i), i.repeat = 0);
    const f = {
      startTime: s ? this.resolvedAt ? this.resolvedAt - this.createdAt > ka ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: n,
      ...i,
      keyframes: e
    }, d = !u && La(f) ? new Ca({
      ...f,
      element: f.motionValue.owner.current
    }) : new gn(f);
    d.finished.then(() => this.notifyFinished()).catch(K), this.pendingTimeline && (this.stopTimeline = d.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = d;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, n) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), ga()), this._animation;
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
const Fa = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Ia(t) {
  const e = Fa.exec(t);
  if (!e)
    return [,];
  const [, n, i, s] = e;
  return [`--${n ?? i}`, s];
}
function Ns(t, e, n = 1) {
  const [i, s] = Ia(t);
  if (!i)
    return;
  const o = window.getComputedStyle(e).getPropertyValue(i);
  if (o) {
    const r = o.trim();
    return as(r) ? parseFloat(r) : r;
  }
  return cn(s) ? Ns(s, e, n + 1) : s;
}
function vn(t, e) {
  return t?.[e] ?? t?.default ?? t;
}
const _s = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...St
]), Oa = {
  test: (t) => t === "auto",
  parse: (t) => t
}, Us = (t) => (e) => e.test(t), Ws = [Pt, b, X, J, Mo, Co, Oa], qn = (t) => Ws.find(Us(t));
function ja(t) {
  return typeof t == "number" ? t === 0 : t !== null ? t === "none" || t === "0" || cs(t) : !0;
}
const Na = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function _a(t) {
  const [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return t;
  const [i] = n.match(un) || [];
  if (!i)
    return t;
  const s = n.replace(i, "");
  let o = Na.has(e) ? 1 : 0;
  return i !== n && (o *= 100), e + "(" + o + s + ")";
}
const Ua = /\b([a-z-]*)\(.*?\)/gu, Ne = {
  ...et,
  getAnimatableNone: (t) => {
    const e = t.match(Ua);
    return e ? e.map(_a).join(" ") : t;
  }
}, Zn = {
  ...Pt,
  transform: Math.round
}, Wa = {
  rotate: J,
  rotateX: J,
  rotateY: J,
  rotateZ: J,
  scale: Gt,
  scaleX: Gt,
  scaleY: Gt,
  scaleZ: Gt,
  skew: J,
  skewX: J,
  skewY: J,
  distance: b,
  translateX: b,
  translateY: b,
  translateZ: b,
  x: b,
  y: b,
  z: b,
  perspective: b,
  transformPerspective: b,
  opacity: Ft,
  originX: jn,
  originY: jn,
  originZ: b
}, xn = {
  // Border props
  borderWidth: b,
  borderTopWidth: b,
  borderRightWidth: b,
  borderBottomWidth: b,
  borderLeftWidth: b,
  borderRadius: b,
  radius: b,
  borderTopLeftRadius: b,
  borderTopRightRadius: b,
  borderBottomRightRadius: b,
  borderBottomLeftRadius: b,
  // Positioning props
  width: b,
  maxWidth: b,
  height: b,
  maxHeight: b,
  top: b,
  right: b,
  bottom: b,
  left: b,
  // Spacing props
  padding: b,
  paddingTop: b,
  paddingRight: b,
  paddingBottom: b,
  paddingLeft: b,
  margin: b,
  marginTop: b,
  marginRight: b,
  marginBottom: b,
  marginLeft: b,
  // Misc
  backgroundPositionX: b,
  backgroundPositionY: b,
  ...Wa,
  zIndex: Zn,
  // SVG
  fillOpacity: Ft,
  strokeOpacity: Ft,
  numOctaves: Zn
}, $a = {
  ...xn,
  // Color props
  color: E,
  backgroundColor: E,
  outlineColor: E,
  fill: E,
  stroke: E,
  // Border props
  borderColor: E,
  borderTopColor: E,
  borderRightColor: E,
  borderBottomColor: E,
  borderLeftColor: E,
  filter: Ne,
  WebkitFilter: Ne
}, $s = (t) => $a[t];
function zs(t, e) {
  let n = $s(t);
  return n !== Ne && (n = et), n.getAnimatableNone ? n.getAnimatableNone(e) : void 0;
}
const za = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function Ka(t, e, n) {
  let i = 0, s;
  for (; i < t.length && !s; ) {
    const o = t[i];
    typeof o == "string" && !za.has(o) && It(o).values.length && (s = t[i]), i++;
  }
  if (s && n)
    for (const o of e)
      t[o] = zs(n, s);
}
class Ga extends yn {
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
      if (typeof u == "string" && (u = u.trim(), cn(u))) {
        const c = Ns(u, n.current);
        c !== void 0 && (e[l] = c), l === e.length - 1 && (this.finalKeyframe = u);
      }
    }
    if (this.resolveNoneKeyframes(), !_s.has(i) || e.length !== 2)
      return;
    const [s, o] = e, r = qn(s), a = qn(o);
    if (r !== a)
      if (Gn(r) && Gn(a))
        for (let l = 0; l < e.length; l++) {
          const u = e[l];
          typeof u == "string" && (e[l] = parseFloat(u));
        }
      else lt[i] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: n } = this, i = [];
    for (let s = 0; s < e.length; s++)
      (e[s] === null || ja(e[s])) && i.push(s);
    i.length && Ka(e, i, n);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: n, name: i } = this;
    if (!e || !e.current)
      return;
    i === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = lt[i](e.measureViewportBox(), window.getComputedStyle(e.current)), n[0] = this.measuredOrigin;
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
    i[o] = lt[n](e.measureViewportBox(), window.getComputedStyle(e.current)), r !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = r), this.removedTransforms?.length && this.removedTransforms.forEach(([a, l]) => {
      e.getValue(a).set(l);
    }), this.resolveNoneKeyframes();
  }
}
function Ha(t, e, n) {
  if (t instanceof EventTarget)
    return [t];
  if (typeof t == "string") {
    let i = document;
    const s = n?.[t] ?? i.querySelectorAll(t);
    return s ? Array.from(s) : [];
  }
  return Array.from(t);
}
const Ks = (t, e) => e && typeof t == "number" ? e.transform(t) : t;
function Gs(t) {
  return ls(t) && "offsetHeight" in t;
}
const Jn = 30, Xa = (t) => !isNaN(parseFloat(t));
class Ya {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, n = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (i) => {
      const s = N.now();
      if (this.updatedAt !== s && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(i), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const o of this.dependents)
          o.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = n.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = N.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Xa(this.current));
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
    this.events[e] || (this.events[e] = new rn());
    const i = this.events[e].add(n);
    return e === "change" ? () => {
      i(), C.read(() => {
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
    const e = N.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Jn)
      return 0;
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, Jn);
    return us(parseFloat(this.current) - parseFloat(this.prevFrameValue), n);
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
  return new Ya(t, e);
}
const { schedule: Tn } = /* @__PURE__ */ bs(queueMicrotask, !1), G = {
  x: !1,
  y: !1
};
function Hs() {
  return G.x || G.y;
}
function qa(t) {
  return t === "x" || t === "y" ? G[t] ? null : (G[t] = !0, () => {
    G[t] = !1;
  }) : G.x || G.y ? null : (G.x = G.y = !0, () => {
    G.x = G.y = !1;
  });
}
function Xs(t, e) {
  const n = Ha(t), i = new AbortController(), s = {
    passive: !0,
    ...e,
    signal: i.signal
  };
  return [n, s, () => i.abort()];
}
function Qn(t) {
  return !(t.pointerType === "touch" || Hs());
}
function Za(t, e, n = {}) {
  const [i, s, o] = Xs(t, n), r = (a) => {
    if (!Qn(a))
      return;
    const { target: l } = a, u = e(l, a);
    if (typeof u != "function" || !l)
      return;
    const c = (h) => {
      Qn(h) && (u(h), l.removeEventListener("pointerleave", c));
    };
    l.addEventListener("pointerleave", c, s);
  };
  return i.forEach((a) => {
    a.addEventListener("pointerenter", r, s);
  }), o;
}
const Ys = (t, e) => e ? t === e ? !0 : Ys(t, e.parentElement) : !1, bn = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, Ja = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function Qa(t) {
  return Ja.has(t.tagName) || t.tabIndex !== -1;
}
const qt = /* @__PURE__ */ new WeakSet();
function ti(t) {
  return (e) => {
    e.key === "Enter" && t(e);
  };
}
function ye(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const tl = (t, e) => {
  const n = t.currentTarget;
  if (!n)
    return;
  const i = ti(() => {
    if (qt.has(n))
      return;
    ye(n, "down");
    const s = ti(() => {
      ye(n, "up");
    }), o = () => ye(n, "cancel");
    n.addEventListener("keyup", s, e), n.addEventListener("blur", o, e);
  });
  n.addEventListener("keydown", i, e), n.addEventListener("blur", () => n.removeEventListener("keydown", i), e);
};
function ei(t) {
  return bn(t) && !Hs();
}
function el(t, e, n = {}) {
  const [i, s, o] = Xs(t, n), r = (a) => {
    const l = a.currentTarget;
    if (!ei(a))
      return;
    qt.add(l);
    const u = e(l, a), c = (d, p) => {
      window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", f), qt.has(l) && qt.delete(l), ei(d) && typeof u == "function" && u(d, { success: p });
    }, h = (d) => {
      c(d, l === window || l === document || n.useGlobalTarget || Ys(l, d.target));
    }, f = (d) => {
      c(d, !1);
    };
    window.addEventListener("pointerup", h, s), window.addEventListener("pointercancel", f, s);
  };
  return i.forEach((a) => {
    (n.useGlobalTarget ? window : a).addEventListener("pointerdown", r, s), Gs(a) && (a.addEventListener("focus", (u) => tl(u, s)), !Qa(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0));
  }), o;
}
function qs(t) {
  return ls(t) && "ownerSVGElement" in t;
}
function nl(t) {
  return qs(t) && t.tagName === "svg";
}
const I = (t) => !!(t && t.getVelocity), il = [...Ws, E, et], sl = (t) => il.find(Us(t)), Pn = Tt({
  transformPagePoint: (t) => t,
  isStatic: !1,
  reducedMotion: "never"
});
function ni(t, e) {
  if (typeof t == "function")
    return t(e);
  t != null && (t.current = e);
}
function rl(...t) {
  return (e) => {
    let n = !1;
    const i = t.map((s) => {
      const o = ni(s, e);
      return !n && typeof o == "function" && (n = !0), o;
    });
    if (n)
      return () => {
        for (let s = 0; s < i.length; s++) {
          const o = i[s];
          typeof o == "function" ? o() : ni(t[s], null);
        }
      };
  };
}
function ol(...t) {
  return Ye(rl(...t), t);
}
class al extends es {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const i = n.offsetParent, s = Gs(i) && i.offsetWidth || 0, o = this.props.sizeRef.current;
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
function ll({ children: t, isPresent: e, anchorX: n, root: i }) {
  const s = qe(), o = Q(null), r = Q({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0
  }), { nonce: a } = F(Pn), l = ol(o, t?.ref);
  return is(() => {
    const { width: u, height: c, top: h, left: f, right: d } = r.current;
    if (e || !o.current || !u || !c)
      return;
    const p = n === "left" ? `left: ${f}` : `right: ${d}`;
    o.current.dataset.motionPopId = s;
    const g = document.createElement("style");
    a && (g.nonce = a);
    const v = i ?? document.head;
    return v.appendChild(g), g.sheet && g.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${u}px !important;
            height: ${c}px !important;
            ${p}px !important;
            top: ${h}px !important;
          }
        `), () => {
      v.contains(g) && v.removeChild(g);
    };
  }, [e]), S(al, { isPresent: e, childRef: o, sizeRef: r, children: zr(t, { ref: l }) });
}
const cl = ({ children: t, initial: e, isPresent: n, onExitComplete: i, custom: s, presenceAffectsLayout: o, mode: r, anchorX: a, root: l }) => {
  const u = Je(ul), c = qe();
  let h = !0, f = ut(() => (h = !1, {
    id: c,
    initial: e,
    isPresent: n,
    custom: s,
    onExitComplete: (d) => {
      u.set(d, !0);
      for (const p of u.values())
        if (!p)
          return;
      i && i();
    },
    register: (d) => (u.set(d, !1), () => u.delete(d))
  }), [n, u, i]);
  return o && h && (f = { ...f }), ut(() => {
    u.forEach((d, p) => u.set(p, !1));
  }, [n]), oe(() => {
    !n && !u.size && i && i();
  }, [n]), r === "popLayout" && (t = S(ll, { isPresent: n, anchorX: a, root: l, children: t })), S(ae.Provider, { value: f, children: t });
};
function ul() {
  return /* @__PURE__ */ new Map();
}
function Zs(t = !0) {
  const e = F(ae);
  if (e === null)
    return [!0, null];
  const { isPresent: n, onExitComplete: i, register: s } = e, o = qe();
  oe(() => {
    if (t)
      return s(o);
  }, [t]);
  const r = Ye(() => t && i && i(o), [o, i, t]);
  return !n && i ? [!1, r] : [!0];
}
const Ht = (t) => t.key || "";
function ii(t) {
  const e = [];
  return Wr.forEach(t, (n) => {
    Kr(n) && e.push(n);
  }), e;
}
const hl = ({ children: t, custom: e, initial: n = !0, onExitComplete: i, presenceAffectsLayout: s = !0, mode: o = "sync", propagate: r = !1, anchorX: a = "left", root: l }) => {
  const [u, c] = Zs(r), h = ut(() => ii(t), [t]), f = r && !u ? [] : h.map(Ht), d = Q(!0), p = Q(h), g = Je(() => /* @__PURE__ */ new Map()), [v, m] = te(h), [x, y] = te(h);
  os(() => {
    d.current = !1, p.current = h;
    for (let A = 0; A < x.length; A++) {
      const V = Ht(x[A]);
      f.includes(V) ? g.delete(V) : g.get(V) !== !0 && g.set(V, !1);
    }
  }, [x, f.length, f.join("-")]);
  const w = [];
  if (h !== v) {
    let A = [...h];
    for (let V = 0; V < x.length; V++) {
      const P = x[V], L = Ht(P);
      f.includes(L) || (A.splice(V, 0, P), w.push(P));
    }
    return o === "wait" && w.length && (A = w), y(ii(A)), m(h), null;
  }
  const { forceRender: T } = F(Ze);
  return S(Ur, { children: x.map((A) => {
    const V = Ht(A), P = r && !u ? !1 : h === x || f.includes(V), L = () => {
      if (g.has(V))
        g.set(V, !0);
      else
        return;
      let O = !0;
      g.forEach((Z) => {
        Z || (O = !1);
      }), O && (T?.(), y(p.current), r && c?.(), i && i());
    };
    return S(cl, { isPresent: P, initial: !d.current || n ? void 0 : !1, custom: e, presenceAffectsLayout: s, mode: o, root: l, onExitComplete: P ? void 0 : L, anchorX: a, children: A }, V);
  }) });
}, Js = Tt({ strict: !1 }), si = {
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
}, xt = {};
for (const t in si)
  xt[t] = {
    isEnabled: (e) => si[t].some((n) => !!e[n])
  };
function fl(t) {
  for (const e in t)
    xt[e] = {
      ...xt[e],
      ...t[e]
    };
}
const dl = /* @__PURE__ */ new Set([
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
function se(t) {
  return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || dl.has(t);
}
let Qs = (t) => !se(t);
function pl(t) {
  typeof t == "function" && (Qs = (e) => e.startsWith("on") ? !se(e) : t(e));
}
try {
  pl(require("@emotion/is-prop-valid").default);
} catch {
}
function ml(t, e, n) {
  const i = {};
  for (const s in t)
    s === "values" && typeof t.values == "object" || (Qs(s) || n === !0 && se(s) || !e && !se(s) || // If trying to use native HTML drag events, forward drag listeners
    t.draggable && s.startsWith("onDrag")) && (i[s] = t[s]);
  return i;
}
const le = /* @__PURE__ */ Tt({});
function ce(t) {
  return t !== null && typeof t == "object" && typeof t.start == "function";
}
function Ot(t) {
  return typeof t == "string" || Array.isArray(t);
}
const Sn = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], wn = ["initial", ...Sn];
function ue(t) {
  return ce(t.animate) || wn.some((e) => Ot(t[e]));
}
function tr(t) {
  return !!(ue(t) || t.variants);
}
function gl(t, e) {
  if (ue(t)) {
    const { initial: n, animate: i } = t;
    return {
      initial: n === !1 || Ot(n) ? n : void 0,
      animate: Ot(i) ? i : void 0
    };
  }
  return t.inherit !== !1 ? e : {};
}
function yl(t) {
  const { initial: e, animate: n } = gl(t, F(le));
  return ut(() => ({ initial: e, animate: n }), [ri(e), ri(n)]);
}
function ri(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const jt = {};
function vl(t) {
  for (const e in t)
    jt[e] = t[e], ln(e) && (jt[e].isCSSVariable = !0);
}
function er(t, { layout: e, layoutId: n }) {
  return wt.has(t) || t.startsWith("origin") || (e || n !== void 0) && (!!jt[t] || t === "opacity");
}
const xl = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Tl = St.length;
function bl(t, e, n) {
  let i = "", s = !0;
  for (let o = 0; o < Tl; o++) {
    const r = St[o], a = t[r];
    if (a === void 0)
      continue;
    let l = !0;
    if (typeof a == "number" ? l = a === (r.startsWith("scale") ? 1 : 0) : l = parseFloat(a) === 0, !l || n) {
      const u = Ks(a, xn[r]);
      if (!l) {
        s = !1;
        const c = xl[r] || r;
        i += `${c}(${u}) `;
      }
      n && (e[r] = u);
    }
  }
  return i = i.trim(), n ? i = n(e, s ? "" : i) : s && (i = "none"), i;
}
function An(t, e, n) {
  const { style: i, vars: s, transformOrigin: o } = t;
  let r = !1, a = !1;
  for (const l in e) {
    const u = e[l];
    if (wt.has(l)) {
      r = !0;
      continue;
    } else if (ln(l)) {
      s[l] = u;
      continue;
    } else {
      const c = Ks(u, xn[l]);
      l.startsWith("origin") ? (a = !0, o[l] = c) : i[l] = c;
    }
  }
  if (e.transform || (r || n ? i.transform = bl(e, t.transform, n) : i.transform && (i.transform = "none")), a) {
    const { originX: l = "50%", originY: u = "50%", originZ: c = 0 } = o;
    i.transformOrigin = `${l} ${u} ${c}`;
  }
}
const Vn = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function nr(t, e, n) {
  for (const i in e)
    !I(e[i]) && !er(i, n) && (t[i] = e[i]);
}
function Pl({ transformTemplate: t }, e) {
  return ut(() => {
    const n = Vn();
    return An(n, e, t), Object.assign({}, n.vars, n.style);
  }, [e]);
}
function Sl(t, e) {
  const n = t.style || {}, i = {};
  return nr(i, n, t), Object.assign(i, Pl(t, e)), i;
}
function wl(t, e) {
  const n = {}, i = Sl(t, e);
  return t.drag && t.dragListener !== !1 && (n.draggable = !1, i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none", i.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (n.tabIndex = 0), n.style = i, n;
}
const Al = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Vl = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Cl(t, e, n = 1, i = 0, s = !0) {
  t.pathLength = 1;
  const o = s ? Al : Vl;
  t[o.offset] = b.transform(-i);
  const r = b.transform(e), a = b.transform(n);
  t[o.array] = `${r} ${a}`;
}
function ir(t, {
  attrX: e,
  attrY: n,
  attrScale: i,
  pathLength: s,
  pathSpacing: o = 1,
  pathOffset: r = 0,
  // This is object creation, which we try to avoid per-frame.
  ...a
}, l, u, c) {
  if (An(t, a, u), l) {
    t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
    return;
  }
  t.attrs = t.style, t.style = {};
  const { attrs: h, style: f } = t;
  h.transform && (f.transform = h.transform, delete h.transform), (f.transform || h.transformOrigin) && (f.transformOrigin = h.transformOrigin ?? "50% 50%", delete h.transformOrigin), f.transform && (f.transformBox = c?.transformBox ?? "fill-box", delete h.transformBox), e !== void 0 && (h.x = e), n !== void 0 && (h.y = n), i !== void 0 && (h.scale = i), s !== void 0 && Cl(h, s, o, r, !1);
}
const sr = () => ({
  ...Vn(),
  attrs: {}
}), rr = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function Ml(t, e, n, i) {
  const s = ut(() => {
    const o = sr();
    return ir(o, e, rr(i), t.transformTemplate, t.style), {
      ...o.attrs,
      style: { ...o.style }
    };
  }, [e]);
  if (t.style) {
    const o = {};
    nr(o, t.style, t), s.style = { ...o, ...s.style };
  }
  return s;
}
const Dl = [
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
      !!(Dl.indexOf(t) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(t))
    )
  );
}
function Rl(t, e, n, { latestValues: i }, s, o = !1) {
  const a = (Cn(t) ? Ml : wl)(e, i, s, t), l = ml(e, typeof t == "string", o), u = t !== ns ? { ...l, ...a, ref: n } : {}, { children: c } = e, h = ut(() => I(c) ? c.get() : c, [c]);
  return Qt(t, {
    ...u,
    children: h
  });
}
function oi(t) {
  const e = [{}, {}];
  return t?.values.forEach((n, i) => {
    e[0][i] = n.get(), e[1][i] = n.getVelocity();
  }), e;
}
function Mn(t, e, n, i) {
  if (typeof e == "function") {
    const [s, o] = oi(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  if (typeof e == "string" && (e = t.variants && t.variants[e]), typeof e == "function") {
    const [s, o] = oi(i);
    e = e(n !== void 0 ? n : t.custom, s, o);
  }
  return e;
}
function Zt(t) {
  return I(t) ? t.get() : t;
}
function El({ scrapeMotionValuesFromProps: t, createRenderState: e }, n, i, s) {
  return {
    latestValues: Ll(n, i, s, t),
    renderState: e()
  };
}
function Ll(t, e, n, i) {
  const s = {}, o = i(t, {});
  for (const f in o)
    s[f] = Zt(o[f]);
  let { initial: r, animate: a } = t;
  const l = ue(t), u = tr(t);
  e && u && !l && t.inherit !== !1 && (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let c = n ? n.initial === !1 : !1;
  c = c || r === !1;
  const h = c ? a : r;
  if (h && typeof h != "boolean" && !ce(h)) {
    const f = Array.isArray(h) ? h : [h];
    for (let d = 0; d < f.length; d++) {
      const p = Mn(t, f[d]);
      if (p) {
        const { transitionEnd: g, transition: v, ...m } = p;
        for (const x in m) {
          let y = m[x];
          if (Array.isArray(y)) {
            const w = c ? y.length - 1 : 0;
            y = y[w];
          }
          y !== null && (s[x] = y);
        }
        for (const x in g)
          s[x] = g[x];
      }
    }
  }
  return s;
}
const or = (t) => (e, n) => {
  const i = F(le), s = F(ae), o = () => El(t, e, i, s);
  return n ? o() : Je(o);
};
function Dn(t, e, n) {
  const { style: i } = t, s = {};
  for (const o in i)
    (I(i[o]) || e.style && I(e.style[o]) || er(o, t) || n?.getValue(o)?.liveStyle !== void 0) && (s[o] = i[o]);
  return s;
}
const kl = /* @__PURE__ */ or({
  scrapeMotionValuesFromProps: Dn,
  createRenderState: Vn
});
function ar(t, e, n) {
  const i = Dn(t, e, n);
  for (const s in t)
    if (I(t[s]) || I(e[s])) {
      const o = St.indexOf(s) !== -1 ? "attr" + s.charAt(0).toUpperCase() + s.substring(1) : s;
      i[o] = t[s];
    }
  return i;
}
const Bl = /* @__PURE__ */ or({
  scrapeMotionValuesFromProps: ar,
  createRenderState: sr
}), Fl = Symbol.for("motionComponentSymbol");
function dt(t) {
  return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function Il(t, e, n) {
  return Ye(
    (i) => {
      i && t.onMount && t.onMount(i), e && (i ? e.mount(i) : e.unmount()), n && (typeof n == "function" ? n(i) : dt(n) && (n.current = i));
    },
    /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */
    [e]
  );
}
const Rn = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), Ol = "framerAppearId", lr = "data-" + Rn(Ol), cr = Tt({});
function jl(t, e, n, i, s) {
  const { visualElement: o } = F(le), r = F(Js), a = F(ae), l = F(Pn).reducedMotion, u = Q(null);
  i = i || r.renderer, !u.current && i && (u.current = i(t, {
    visualState: e,
    parent: o,
    props: n,
    presenceContext: a,
    blockInitialAnimation: a ? a.initial === !1 : !1,
    reducedMotionConfig: l
  }));
  const c = u.current, h = F(cr);
  c && !c.projection && s && (c.type === "html" || c.type === "svg") && Nl(u.current, n, s, h);
  const f = Q(!1);
  is(() => {
    c && f.current && c.update(n, a);
  });
  const d = n[lr], p = Q(!!d && !window.MotionHandoffIsComplete?.(d) && window.MotionHasOptimisedAnimation?.(d));
  return os(() => {
    c && (f.current = !0, window.MotionIsMounted = !0, c.updateFeatures(), c.scheduleRenderMicrotask(), p.current && c.animationState && c.animationState.animateChanges());
  }), oe(() => {
    c && (!p.current && c.animationState && c.animationState.animateChanges(), p.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(d);
    }), p.current = !1), c.enteringChildren = void 0);
  }), c;
}
function Nl(t, e, n, i) {
  const { layoutId: s, layout: o, drag: r, dragConstraints: a, layoutScroll: l, layoutRoot: u, layoutCrossfade: c } = e;
  t.projection = new n(t.latestValues, e["data-framer-portal-id"] ? void 0 : ur(t.parent)), t.projection.setOptions({
    layoutId: s,
    layout: o,
    alwaysMeasureLayout: !!r || a && dt(a),
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
function ur(t) {
  if (t)
    return t.options.allowProjection !== !1 ? t.projection : ur(t.parent);
}
function ve(t, { forwardMotionProps: e = !1 } = {}, n, i) {
  n && fl(n);
  const s = Cn(t) ? Bl : kl;
  function o(a, l) {
    let u;
    const c = {
      ...F(Pn),
      ...a,
      layoutId: _l(a)
    }, { isStatic: h } = c, f = yl(a), d = s(a, h);
    if (!h && Qe) {
      Ul();
      const p = Wl(c);
      u = p.MeasureLayout, f.visualElement = jl(t, d, c, i, p.ProjectionNode);
    }
    return _(le.Provider, { value: f, children: [u && f.visualElement ? S(u, { visualElement: f.visualElement, ...c }) : null, Rl(t, a, Il(d, f.visualElement, l), d, h, e)] });
  }
  o.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
  const r = Xe(o);
  return r[Fl] = t, r;
}
function _l({ layoutId: t }) {
  const e = F(Ze).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function Ul(t, e) {
  F(Js).strict;
}
function Wl(t) {
  const { drag: e, layout: n } = xt;
  if (!e && !n)
    return {};
  const i = { ...e, ...n };
  return {
    MeasureLayout: e?.isEnabled(t) || n?.isEnabled(t) ? i.MeasureLayout : void 0,
    ProjectionNode: i.ProjectionNode
  };
}
function $l(t, e) {
  if (typeof Proxy > "u")
    return ve;
  const n = /* @__PURE__ */ new Map(), i = (o, r) => ve(o, r, t, e), s = (o, r) => i(o, r);
  return new Proxy(s, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (o, r) => r === "create" ? i : (n.has(r) || n.set(r, ve(r, void 0, t, e)), n.get(r))
  });
}
function hr({ top: t, left: e, right: n, bottom: i }) {
  return {
    x: { min: e, max: n },
    y: { min: t, max: i }
  };
}
function zl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function Kl(t, e) {
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
function xe(t) {
  return t === void 0 || t === 1;
}
function _e({ scale: t, scaleX: e, scaleY: n }) {
  return !xe(t) || !xe(e) || !xe(n);
}
function rt(t) {
  return _e(t) || fr(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function fr(t) {
  return ai(t.x) || ai(t.y);
}
function ai(t) {
  return t && t !== "0%";
}
function re(t, e, n) {
  const i = t - n, s = e * i;
  return n + s;
}
function li(t, e, n, i, s) {
  return s !== void 0 && (t = re(t, s, i)), re(t, n, i) + e;
}
function Ue(t, e = 0, n = 1, i, s) {
  t.min = li(t.min, e, n, i, s), t.max = li(t.max, e, n, i, s);
}
function dr(t, { x: e, y: n }) {
  Ue(t.x, e.translate, e.scale, e.originPoint), Ue(t.y, n.translate, n.scale, n.originPoint);
}
const ci = 0.999999999999, ui = 1.0000000000001;
function Gl(t, e, n, i = !1) {
  const s = n.length;
  if (!s)
    return;
  e.x = e.y = 1;
  let o, r;
  for (let a = 0; a < s; a++) {
    o = n[a], r = o.projectionDelta;
    const { visualElement: l } = o.options;
    l && l.props.style && l.props.style.display === "contents" || (i && o.options.layoutScroll && o.scroll && o !== o.root && mt(t, {
      x: -o.scroll.offset.x,
      y: -o.scroll.offset.y
    }), r && (e.x *= r.x.scale, e.y *= r.y.scale, dr(t, r)), i && rt(o.latestValues) && mt(t, o.latestValues));
  }
  e.x < ui && e.x > ci && (e.x = 1), e.y < ui && e.y > ci && (e.y = 1);
}
function pt(t, e) {
  t.min = t.min + e, t.max = t.max + e;
}
function hi(t, e, n, i, s = 0.5) {
  const o = M(t.min, t.max, s);
  Ue(t, e, n, o, i);
}
function mt(t, e) {
  hi(t.x, e.x, e.scaleX, e.scale, e.originX), hi(t.y, e.y, e.scaleY, e.scale, e.originY);
}
function pr(t, e) {
  return hr(Kl(t.getBoundingClientRect(), e));
}
function Hl(t, e, n) {
  const i = pr(t, n), { scroll: s } = e;
  return s && (pt(i.x, s.offset.x), pt(i.y, s.offset.y)), i;
}
const fi = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), gt = () => ({
  x: fi(),
  y: fi()
}), di = () => ({ min: 0, max: 0 }), R = () => ({
  x: di(),
  y: di()
}), We = { current: null }, mr = { current: !1 };
function Xl() {
  if (mr.current = !0, !!Qe)
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"), e = () => We.current = t.matches;
      t.addEventListener("change", e), e();
    } else
      We.current = !1;
}
const Yl = /* @__PURE__ */ new WeakMap();
function ql(t, e, n) {
  for (const i in e) {
    const s = e[i], o = n[i];
    if (I(s))
      t.addValue(i, s);
    else if (I(o))
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
const pi = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
class Zl {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = yn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const f = N.now();
      this.renderScheduledAt < f && (this.renderScheduledAt = f, C.render(this.render, !1, !0));
    };
    const { latestValues: l, renderState: u } = r;
    this.latestValues = l, this.baseTarget = { ...l }, this.initialValues = n.initial ? { ...l } : {}, this.renderState = u, this.parent = e, this.props = n, this.presenceContext = i, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = s, this.options = a, this.blockInitialAnimation = !!o, this.isControllingVariants = ue(n), this.isVariantNode = tr(n), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: c, ...h } = this.scrapeMotionValuesFromProps(n, {}, this);
    for (const f in h) {
      const d = h[f];
      l[f] !== void 0 && I(d) && d.set(l[f]);
    }
  }
  mount(e) {
    this.current = e, Yl.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((n, i) => this.bindToMotionValue(i, n)), mr.current || Xl(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : We.current, this.parent?.addChild(this), this.update(this.props, this.presenceContext);
  }
  unmount() {
    this.projection && this.projection.unmount(), tt(this.notifyUpdate), tt(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    const i = wt.has(e);
    i && this.onBindTransform && this.onBindTransform();
    const s = n.on("change", (r) => {
      this.latestValues[e] = r, this.props.onUpdate && C.preRender(this.notifyUpdate), i && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (e in xt) {
      const n = xt[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : R();
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
    for (let i = 0; i < pi.length; i++) {
      const s = pi[i];
      this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
      const o = "on" + s, r = e[o];
      r && (this.propEventSubscriptions[s] = this.on(s, r));
    }
    this.prevMotionValues = ql(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return i != null && (typeof i == "string" && (as(i) || cs(i)) ? i = parseFloat(i) : !sl(i) && et.test(n) && (i = zs(e, n)), this.setBaseTarget(e, I(i) ? i.get() : i)), I(i) ? i.get() : i;
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
      const o = Mn(this.props, n, this.presenceContext?.custom);
      o && (i = o[e]);
    }
    if (n && i !== void 0)
      return i;
    const s = this.getBaseTargetFromProps(this.props, e);
    return s !== void 0 && !I(s) ? s : this.initialValues[e] !== void 0 && i === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, n) {
    return this.events[e] || (this.events[e] = new rn()), this.events[e].add(n);
  }
  notify(e, ...n) {
    this.events[e] && this.events[e].notify(...n);
  }
  scheduleRenderMicrotask() {
    Tn.render(this.render);
  }
}
class gr extends Zl {
  constructor() {
    super(...arguments), this.KeyframeResolver = Ga;
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
    I(e) && (this.childSubscription = e.on("change", (n) => {
      this.current && (this.current.textContent = `${n}`);
    }));
  }
}
function yr(t, { style: e, vars: n }, i, s) {
  const o = t.style;
  let r;
  for (r in e)
    o[r] = e[r];
  s?.applyProjectionStyles(o, i);
  for (r in n)
    o.setProperty(r, n[r]);
}
function Jl(t) {
  return window.getComputedStyle(t);
}
class Ql extends gr {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = yr;
  }
  readValueFromInstance(e, n) {
    if (wt.has(n))
      return this.projection?.isProjecting ? ke(n) : ha(e, n);
    {
      const i = Jl(e), s = (ln(n) ? i.getPropertyValue(n) : i[n]) || 0;
      return typeof s == "string" ? s.trim() : s;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: n }) {
    return pr(e, n);
  }
  build(e, n, i) {
    An(e, n, i.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return Dn(e, n, i);
  }
}
const vr = /* @__PURE__ */ new Set([
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
function tc(t, e, n, i) {
  yr(t, e, void 0, i);
  for (const s in e.attrs)
    t.setAttribute(vr.has(s) ? s : Rn(s), e.attrs[s]);
}
class ec extends gr {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = R;
  }
  getBaseTargetFromProps(e, n) {
    return e[n];
  }
  readValueFromInstance(e, n) {
    if (wt.has(n)) {
      const i = $s(n);
      return i && i.default || 0;
    }
    return n = vr.has(n) ? n : Rn(n), e.getAttribute(n);
  }
  scrapeMotionValuesFromProps(e, n, i) {
    return ar(e, n, i);
  }
  build(e, n, i) {
    ir(e, n, this.isSVGTag, i.transformTemplate, i.style);
  }
  renderInstance(e, n, i, s) {
    tc(e, n, i, s);
  }
  mount(e) {
    this.isSVGTag = rr(e.tagName), super.mount(e);
  }
}
const nc = (t, e) => Cn(t) ? new ec(e) : new Ql(e, {
  allowProjection: t !== ns
});
function yt(t, e, n) {
  const i = t.getProps();
  return Mn(i, e, n !== void 0 ? n : i.custom, t);
}
const $e = (t) => Array.isArray(t);
function ic(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, vt(n));
}
function sc(t) {
  return $e(t) ? t[t.length - 1] || 0 : t;
}
function rc(t, e) {
  const n = yt(t, e);
  let { transitionEnd: i = {}, transition: s = {}, ...o } = n || {};
  o = { ...o, ...i };
  for (const r in o) {
    const a = sc(o[r]);
    ic(t, r, a);
  }
}
function oc(t) {
  return !!(I(t) && t.add);
}
function ze(t, e) {
  const n = t.getValue("willChange");
  if (oc(n))
    return n.add(e);
  if (!n && q.WillChange) {
    const i = new q.WillChange("auto");
    t.addValue("willChange", i), i.add(e);
  }
}
function xr(t) {
  return t.props[lr];
}
const ac = (t) => t !== null;
function lc(t, { repeat: e, repeatType: n = "loop" }, i) {
  const s = t.filter(ac), o = e && n !== "loop" && e % 2 === 1 ? 0 : s.length - 1;
  return s[o];
}
const cc = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, uc = (t) => ({
  type: "spring",
  stiffness: 550,
  damping: t === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), hc = {
  type: "keyframes",
  duration: 0.8
}, fc = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, dc = (t, { keyframes: e }) => e.length > 2 ? hc : wt.has(t) ? t.startsWith("scale") ? uc(e[1]) : cc : fc;
function pc({ when: t, delay: e, delayChildren: n, staggerChildren: i, staggerDirection: s, repeat: o, repeatType: r, repeatDelay: a, from: l, elapsed: u, ...c }) {
  return !!Object.keys(c).length;
}
const En = (t, e, n, i = {}, s, o) => (r) => {
  const a = vn(i, t) || {}, l = a.delay || i.delay || 0;
  let { elapsed: u = 0 } = i;
  u = u - /* @__PURE__ */ H(l);
  const c = {
    keyframes: Array.isArray(n) ? n : [null, n],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...a,
    delay: -u,
    onUpdate: (f) => {
      e.set(f), a.onUpdate && a.onUpdate(f);
    },
    onComplete: () => {
      r(), a.onComplete && a.onComplete();
    },
    name: t,
    motionValue: e,
    element: o ? void 0 : s
  };
  pc(a) || Object.assign(c, dc(t, c)), c.duration && (c.duration = /* @__PURE__ */ H(c.duration)), c.repeatDelay && (c.repeatDelay = /* @__PURE__ */ H(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
  let h = !1;
  if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (je(c), c.delay === 0 && (h = !0)), (q.instantAnimations || q.skipAnimations) && (h = !0, je(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, h && !o && e.get() !== void 0) {
    const f = lc(c.keyframes, a);
    if (f !== void 0) {
      C.update(() => {
        c.onUpdate(f), c.onComplete();
      });
      return;
    }
  }
  return a.isSync ? new gn(c) : new Ba(c);
};
function mc({ protectedKeys: t, needsAnimating: e }, n) {
  const i = t.hasOwnProperty(n) && e[n] !== !0;
  return e[n] = !1, i;
}
function Tr(t, e, { delay: n = 0, transitionOverride: i, type: s } = {}) {
  let { transition: o = t.getDefaultTransition(), transitionEnd: r, ...a } = e;
  i && (o = i);
  const l = [], u = s && t.animationState && t.animationState.getState()[s];
  for (const c in a) {
    const h = t.getValue(c, t.latestValues[c] ?? null), f = a[c];
    if (f === void 0 || u && mc(u, c))
      continue;
    const d = {
      delay: n,
      ...vn(o || {}, c)
    }, p = h.get();
    if (p !== void 0 && !h.isAnimating && !Array.isArray(f) && f === p && !d.velocity)
      continue;
    let g = !1;
    if (window.MotionHandoffAnimation) {
      const m = xr(t);
      if (m) {
        const x = window.MotionHandoffAnimation(m, c, C);
        x !== null && (d.startTime = x, g = !0);
      }
    }
    ze(t, c), h.start(En(c, h, f, t.shouldReduceMotion && _s.has(c) ? { type: !1 } : d, t, g));
    const v = h.animation;
    v && l.push(v);
  }
  return r && Promise.all(l).then(() => {
    C.update(() => {
      r && rc(t, r);
    });
  }), l;
}
function br(t, e, n, i = 0, s = 1) {
  const o = Array.from(t).sort((u, c) => u.sortNodePosition(c)).indexOf(e), r = t.size, a = (r - 1) * i;
  return typeof n == "function" ? n(o, r) : s === 1 ? o * i : a - o * i;
}
function Ke(t, e, n = {}) {
  const i = yt(t, e, n.type === "exit" ? t.presenceContext?.custom : void 0);
  let { transition: s = t.getDefaultTransition() || {} } = i || {};
  n.transitionOverride && (s = n.transitionOverride);
  const o = i ? () => Promise.all(Tr(t, i, n)) : () => Promise.resolve(), r = t.variantChildren && t.variantChildren.size ? (l = 0) => {
    const { delayChildren: u = 0, staggerChildren: c, staggerDirection: h } = s;
    return gc(t, e, l, u, c, h, n);
  } : () => Promise.resolve(), { when: a } = s;
  if (a) {
    const [l, u] = a === "beforeChildren" ? [o, r] : [r, o];
    return l().then(() => u());
  } else
    return Promise.all([o(), r(n.delay)]);
}
function gc(t, e, n = 0, i = 0, s = 0, o = 1, r) {
  const a = [];
  for (const l of t.variantChildren)
    l.notify("AnimationStart", e), a.push(Ke(l, e, {
      ...r,
      delay: n + (typeof i == "function" ? 0 : i) + br(t.variantChildren, l, i, s, o)
    }).then(() => l.notify("AnimationComplete", e)));
  return Promise.all(a);
}
function yc(t, e, n = {}) {
  t.notify("AnimationStart", e);
  let i;
  if (Array.isArray(e)) {
    const s = e.map((o) => Ke(t, o, n));
    i = Promise.all(s);
  } else if (typeof e == "string")
    i = Ke(t, e, n);
  else {
    const s = typeof e == "function" ? yt(t, e, n.custom) : e;
    i = Promise.all(Tr(t, s, n));
  }
  return i.then(() => {
    t.notify("AnimationComplete", e);
  });
}
function Pr(t, e) {
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
const vc = wn.length;
function Sr(t) {
  if (!t)
    return;
  if (!t.isControllingVariants) {
    const n = t.parent ? Sr(t.parent) || {} : {};
    return t.props.initial !== void 0 && (n.initial = t.props.initial), n;
  }
  const e = {};
  for (let n = 0; n < vc; n++) {
    const i = wn[n], s = t.props[i];
    (Ot(s) || s === !1) && (e[i] = s);
  }
  return e;
}
const xc = [...Sn].reverse(), Tc = Sn.length;
function bc(t) {
  return (e) => Promise.all(e.map(({ animation: n, options: i }) => yc(t, n, i)));
}
function Pc(t) {
  let e = bc(t), n = mi(), i = !0;
  const s = (l) => (u, c) => {
    const h = yt(t, c, l === "exit" ? t.presenceContext?.custom : void 0);
    if (h) {
      const { transition: f, transitionEnd: d, ...p } = h;
      u = { ...u, ...p, ...d };
    }
    return u;
  };
  function o(l) {
    e = l(t);
  }
  function r(l) {
    const { props: u } = t, c = Sr(t.parent) || {}, h = [], f = /* @__PURE__ */ new Set();
    let d = {}, p = 1 / 0;
    for (let v = 0; v < Tc; v++) {
      const m = xc[v], x = n[m], y = u[m] !== void 0 ? u[m] : c[m], w = Ot(y), T = m === l ? x.isActive : null;
      T === !1 && (p = v);
      let A = y === c[m] && y !== u[m] && w;
      if (A && i && t.manuallyAnimateOnMount && (A = !1), x.protectedKeys = { ...d }, // If it isn't active and hasn't *just* been set as inactive
      !x.isActive && T === null || // If we didn't and don't have any defined prop for this animation type
      !y && !x.prevProp || // Or if the prop doesn't define an animation
      ce(y) || typeof y == "boolean")
        continue;
      const V = Sc(x.prevProp, y);
      let P = V || // If we're making this variant active, we want to always make it active
      m === l && x.isActive && !A && w || // If we removed a higher-priority variant (i is in reverse order)
      v > p && w, L = !1;
      const O = Array.isArray(y) ? y : [y];
      let Z = O.reduce(s(m), {});
      T === !1 && (Z = {});
      const { prevResolvedValues: Ln = {} } = x, jr = {
        ...Ln,
        ...Z
      }, kn = (k) => {
        P = !0, f.has(k) && (L = !0, f.delete(k)), x.needsAnimating[k] = !0;
        const U = t.getValue(k);
        U && (U.liveStyle = !1);
      };
      for (const k in jr) {
        const U = Z[k], it = Ln[k];
        if (d.hasOwnProperty(k))
          continue;
        let ht = !1;
        $e(U) && $e(it) ? ht = !Pr(U, it) : ht = U !== it, ht ? U != null ? kn(k) : f.add(k) : U !== void 0 && f.has(k) ? kn(k) : x.protectedKeys[k] = !0;
      }
      x.prevProp = y, x.prevResolvedValues = Z, x.isActive && (d = { ...d, ...Z }), i && t.blockInitialAnimation && (P = !1);
      const Bn = A && V;
      P && (!Bn || L) && h.push(...O.map((k) => {
        const U = { type: m };
        if (typeof k == "string" && i && !Bn && t.manuallyAnimateOnMount && t.parent) {
          const { parent: it } = t, ht = yt(it, k);
          if (it.enteringChildren && ht) {
            const { delayChildren: Nr } = ht.transition || {};
            U.delay = br(it.enteringChildren, t, Nr);
          }
        }
        return {
          animation: k,
          options: U
        };
      }));
    }
    if (f.size) {
      const v = {};
      if (typeof u.initial != "boolean") {
        const m = yt(t, Array.isArray(u.initial) ? u.initial[0] : u.initial);
        m && m.transition && (v.transition = m.transition);
      }
      f.forEach((m) => {
        const x = t.getBaseTarget(m), y = t.getValue(m);
        y && (y.liveStyle = !0), v[m] = x ?? null;
      }), h.push({ animation: v });
    }
    let g = !!h.length;
    return i && (u.initial === !1 || u.initial === u.animate) && !t.manuallyAnimateOnMount && (g = !1), i = !1, g ? e(h) : Promise.resolve();
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
      n = mi();
    }
  };
}
function Sc(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !Pr(e, t) : !1;
}
function st(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function mi() {
  return {
    animate: st(!0),
    whileInView: st(),
    whileHover: st(),
    whileTap: st(),
    whileDrag: st(),
    whileFocus: st(),
    exit: st()
  };
}
class nt {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
class wc extends nt {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Pc(e));
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
let Ac = 0;
class Vc extends nt {
  constructor() {
    super(...arguments), this.id = Ac++;
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
const Cc = {
  animation: {
    Feature: wc
  },
  exit: {
    Feature: Vc
  }
};
function Nt(t, e, n, i = { passive: !0 }) {
  return t.addEventListener(e, n, i), () => t.removeEventListener(e, n);
}
function $t(t) {
  return {
    point: {
      x: t.pageX,
      y: t.pageY
    }
  };
}
const Mc = (t) => (e) => bn(e) && t(e, $t(e));
function Et(t, e, n, i) {
  return Nt(t, e, Mc(n), i);
}
const wr = 1e-4, Dc = 1 - wr, Rc = 1 + wr, Ar = 0.01, Ec = 0 - Ar, Lc = 0 + Ar;
function j(t) {
  return t.max - t.min;
}
function kc(t, e, n) {
  return Math.abs(t - e) <= n;
}
function gi(t, e, n, i = 0.5) {
  t.origin = i, t.originPoint = M(e.min, e.max, t.origin), t.scale = j(n) / j(e), t.translate = M(n.min, n.max, t.origin) - t.originPoint, (t.scale >= Dc && t.scale <= Rc || isNaN(t.scale)) && (t.scale = 1), (t.translate >= Ec && t.translate <= Lc || isNaN(t.translate)) && (t.translate = 0);
}
function Lt(t, e, n, i) {
  gi(t.x, e.x, n.x, i ? i.originX : void 0), gi(t.y, e.y, n.y, i ? i.originY : void 0);
}
function yi(t, e, n) {
  t.min = n.min + e.min, t.max = t.min + j(e);
}
function Bc(t, e, n) {
  yi(t.x, e.x, n.x), yi(t.y, e.y, n.y);
}
function vi(t, e, n) {
  t.min = e.min - n.min, t.max = t.min + j(e);
}
function kt(t, e, n) {
  vi(t.x, e.x, n.x), vi(t.y, e.y, n.y);
}
function $(t) {
  return [t("x"), t("y")];
}
const Vr = ({ current: t }) => t ? t.ownerDocument.defaultView : null, xi = (t, e) => Math.abs(t - e);
function Fc(t, e) {
  const n = xi(t.x, e.x), i = xi(t.y, e.y);
  return Math.sqrt(n ** 2 + i ** 2);
}
class Cr {
  constructor(e, n, { transformPagePoint: i, contextWindow: s = window, dragSnapToOrigin: o = !1, distanceThreshold: r = 3 } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const f = be(this.lastMoveEventInfo, this.history), d = this.startEvent !== null, p = Fc(f.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!d && !p)
        return;
      const { point: g } = f, { timestamp: v } = B;
      this.history.push({ ...g, timestamp: v });
      const { onStart: m, onMove: x } = this.handlers;
      d || (m && m(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), x && x(this.lastMoveEvent, f);
    }, this.handlePointerMove = (f, d) => {
      this.lastMoveEvent = f, this.lastMoveEventInfo = Te(d, this.transformPagePoint), C.update(this.updatePoint, !0);
    }, this.handlePointerUp = (f, d) => {
      this.end();
      const { onEnd: p, onSessionEnd: g, resumeAnimation: v } = this.handlers;
      if (this.dragSnapToOrigin && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const m = be(f.type === "pointercancel" ? this.lastMoveEventInfo : Te(d, this.transformPagePoint), this.history);
      this.startEvent && p && p(f, m), g && g(f, m);
    }, !bn(e))
      return;
    this.dragSnapToOrigin = o, this.handlers = n, this.transformPagePoint = i, this.distanceThreshold = r, this.contextWindow = s || window;
    const a = $t(e), l = Te(a, this.transformPagePoint), { point: u } = l, { timestamp: c } = B;
    this.history = [{ ...u, timestamp: c }];
    const { onSessionStart: h } = n;
    h && h(e, be(l, this.history)), this.removeListeners = _t(Et(this.contextWindow, "pointermove", this.handlePointerMove), Et(this.contextWindow, "pointerup", this.handlePointerUp), Et(this.contextWindow, "pointercancel", this.handlePointerUp));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), tt(this.updatePoint);
  }
}
function Te(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Ti(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function be({ point: t }, e) {
  return {
    point: t,
    delta: Ti(t, Mr(e)),
    offset: Ti(t, Ic(e)),
    velocity: Oc(e, 0.1)
  };
}
function Ic(t) {
  return t[0];
}
function Mr(t) {
  return t[t.length - 1];
}
function Oc(t, e) {
  if (t.length < 2)
    return { x: 0, y: 0 };
  let n = t.length - 1, i = null;
  const s = Mr(t);
  for (; n >= 0 && (i = t[n], !(s.timestamp - i.timestamp > /* @__PURE__ */ H(e))); )
    n--;
  if (!i)
    return { x: 0, y: 0 };
  const o = /* @__PURE__ */ z(s.timestamp - i.timestamp);
  if (o === 0)
    return { x: 0, y: 0 };
  const r = {
    x: (s.x - i.x) / o,
    y: (s.y - i.y) / o
  };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function jc(t, { min: e, max: n }, i) {
  return e !== void 0 && t < e ? t = i ? M(e, t, i.min) : Math.max(t, e) : n !== void 0 && t > n && (t = i ? M(n, t, i.max) : Math.min(t, n)), t;
}
function bi(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0
  };
}
function Nc(t, { top: e, left: n, bottom: i, right: s }) {
  return {
    x: bi(t.x, n, s),
    y: bi(t.y, e, i)
  };
}
function Pi(t, e) {
  let n = e.min - t.min, i = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, i] = [i, n]), { min: n, max: i };
}
function _c(t, e) {
  return {
    x: Pi(t.x, e.x),
    y: Pi(t.y, e.y)
  };
}
function Uc(t, e) {
  let n = 0.5;
  const i = j(t), s = j(e);
  return s > i ? n = /* @__PURE__ */ Bt(e.min, e.max - i, t.min) : i > s && (n = /* @__PURE__ */ Bt(t.min, t.max - s, e.min)), Y(0, 1, n);
}
function Wc(t, e) {
  const n = {};
  return e.min !== void 0 && (n.min = e.min - t.min), e.max !== void 0 && (n.max = e.max - t.min), n;
}
const Ge = 0.35;
function $c(t = Ge) {
  return t === !1 ? t = 0 : t === !0 && (t = Ge), {
    x: Si(t, "left", "right"),
    y: Si(t, "top", "bottom")
  };
}
function Si(t, e, n) {
  return {
    min: wi(t, e),
    max: wi(t, n)
  };
}
function wi(t, e) {
  return typeof t == "number" ? t : t[e] || 0;
}
const zc = /* @__PURE__ */ new WeakMap();
class Kc {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = R(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: n = !1, distanceThreshold: i } = {}) {
    const { presenceContext: s } = this.visualElement;
    if (s && s.isPresent === !1)
      return;
    const o = (h) => {
      const { dragSnapToOrigin: f } = this.getProps();
      f ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor($t(h).point);
    }, r = (h, f) => {
      const { drag: d, dragPropagation: p, onDragStart: g } = this.getProps();
      if (d && !p && (this.openDragLock && this.openDragLock(), this.openDragLock = qa(d), !this.openDragLock))
        return;
      this.latestPointerEvent = h, this.latestPanInfo = f, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), $((m) => {
        let x = this.getAxisMotionValue(m).get() || 0;
        if (X.test(x)) {
          const { projection: y } = this.visualElement;
          if (y && y.layout) {
            const w = y.layout.layoutBox[m];
            w && (x = j(w) * (parseFloat(x) / 100));
          }
        }
        this.originPoint[m] = x;
      }), g && C.postRender(() => g(h, f)), ze(this.visualElement, "transform");
      const { animationState: v } = this.visualElement;
      v && v.setActive("whileDrag", !0);
    }, a = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f;
      const { dragPropagation: d, dragDirectionLock: p, onDirectionLock: g, onDrag: v } = this.getProps();
      if (!d && !this.openDragLock)
        return;
      const { offset: m } = f;
      if (p && this.currentDirection === null) {
        this.currentDirection = Gc(m), this.currentDirection !== null && g && g(this.currentDirection);
        return;
      }
      this.updateAxis("x", f.point, m), this.updateAxis("y", f.point, m), this.visualElement.render(), v && v(h, f);
    }, l = (h, f) => {
      this.latestPointerEvent = h, this.latestPanInfo = f, this.stop(h, f), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, u = () => $((h) => this.getAnimationState(h) === "paused" && this.getAxisMotionValue(h).animation?.play()), { dragSnapToOrigin: c } = this.getProps();
    this.panSession = new Cr(e, {
      onSessionStart: o,
      onStart: r,
      onMove: a,
      onSessionEnd: l,
      resumeAnimation: u
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: c,
      distanceThreshold: i,
      contextWindow: Vr(this.visualElement)
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
    a && C.postRender(() => a(i, s));
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
    if (!i || !Xt(e, s, this.currentDirection))
      return;
    const o = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + i[e];
    this.constraints && this.constraints[e] && (r = jc(r, this.constraints[e], this.elastic[e])), o.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(), i = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, s = this.constraints;
    e && dt(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && i ? this.constraints = Nc(i.layoutBox, e) : this.constraints = !1, this.elastic = $c(n), s !== this.constraints && i && this.constraints && !this.hasMutatedConstraints && $((o) => {
      this.constraints !== !1 && this.getAxisMotionValue(o) && (this.constraints[o] = Wc(i.layoutBox[o], this.constraints[o]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !dt(e))
      return !1;
    const i = e.current, { projection: s } = this.visualElement;
    if (!s || !s.layout)
      return !1;
    const o = Hl(i, s.root, this.visualElement.getTransformPagePoint());
    let r = _c(s.layout.layoutBox, o);
    if (n) {
      const a = n(zl(r));
      this.hasMutatedConstraints = !!a, a && (r = hr(a));
    }
    return r;
  }
  startAnimation(e) {
    const { drag: n, dragMomentum: i, dragElastic: s, dragTransition: o, dragSnapToOrigin: r, onDragTransitionEnd: a } = this.getProps(), l = this.constraints || {}, u = $((c) => {
      if (!Xt(c, n, this.currentDirection))
        return;
      let h = l && l[c] || {};
      r && (h = { min: 0, max: 0 });
      const f = s ? 200 : 1e6, d = s ? 40 : 1e7, p = {
        type: "inertia",
        velocity: i ? e[c] : 0,
        bounceStiffness: f,
        bounceDamping: d,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...o,
        ...h
      };
      return this.startAxisValueAnimation(c, p);
    });
    return Promise.all(u).then(a);
  }
  startAxisValueAnimation(e, n) {
    const i = this.getAxisMotionValue(e);
    return ze(this.visualElement, e), i.start(En(e, i, 0, n, this.visualElement, !1));
  }
  stopAnimation() {
    $((e) => this.getAxisMotionValue(e).stop());
  }
  pauseAnimation() {
    $((e) => this.getAxisMotionValue(e).animation?.pause());
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
    $((n) => {
      const { drag: i } = this.getProps();
      if (!Xt(n, i, this.currentDirection))
        return;
      const { projection: s } = this.visualElement, o = this.getAxisMotionValue(n);
      if (s && s.layout) {
        const { min: r, max: a } = s.layout.layoutBox[n];
        o.set(e[n] - M(r, a, 0.5));
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
    if (!dt(n) || !i || !this.constraints)
      return;
    this.stopAnimation();
    const s = { x: 0, y: 0 };
    $((r) => {
      const a = this.getAxisMotionValue(r);
      if (a && this.constraints !== !1) {
        const l = a.get();
        s[r] = Uc({ min: l, max: l }, this.constraints[r]);
      }
    });
    const { transformTemplate: o } = this.visualElement.getProps();
    this.visualElement.current.style.transform = o ? o({}, "") : "none", i.root && i.root.updateScroll(), i.updateLayout(), this.resolveConstraints(), $((r) => {
      if (!Xt(r, e, null))
        return;
      const a = this.getAxisMotionValue(r), { min: l, max: u } = this.constraints[r];
      a.set(M(l, u, s[r]));
    });
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    zc.set(this.visualElement, this);
    const e = this.visualElement.current, n = Et(e, "pointerdown", (l) => {
      const { drag: u, dragListener: c = !0 } = this.getProps();
      u && c && this.start(l);
    }), i = () => {
      const { dragConstraints: l } = this.getProps();
      dt(l) && l.current && (this.constraints = this.resolveRefConstraints());
    }, { projection: s } = this.visualElement, o = s.addEventListener("measure", i);
    s && !s.layout && (s.root && s.root.updateScroll(), s.updateLayout()), C.read(i);
    const r = Nt(window, "resize", () => this.scalePositionWithinConstraints()), a = s.addEventListener("didUpdate", (({ delta: l, hasLayoutChanged: u }) => {
      this.isDragging && u && ($((c) => {
        const h = this.getAxisMotionValue(c);
        h && (this.originPoint[c] += l[c].translate, h.set(h.get() + l[c].translate));
      }), this.visualElement.render());
    }));
    return () => {
      r(), n(), o(), a && a();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: n = !1, dragDirectionLock: i = !1, dragPropagation: s = !1, dragConstraints: o = !1, dragElastic: r = Ge, dragMomentum: a = !0 } = e;
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
function Xt(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Gc(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? n = "y" : Math.abs(t.x) > e && (n = "x"), n;
}
class Hc extends nt {
  constructor(e) {
    super(e), this.removeGroupControls = K, this.removeListeners = K, this.controls = new Kc(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || K;
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners();
  }
}
const Ai = (t) => (e, n) => {
  t && C.postRender(() => t(e, n));
};
class Xc extends nt {
  constructor() {
    super(...arguments), this.removePointerDownListener = K;
  }
  onPointerDown(e) {
    this.session = new Cr(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Vr(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: n, onPan: i, onPanEnd: s } = this.node.getProps();
    return {
      onSessionStart: Ai(e),
      onStart: Ai(n),
      onMove: i,
      onEnd: (o, r) => {
        delete this.session, s && C.postRender(() => s(o, r));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Et(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
const Jt = {
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
function Vi(t, e) {
  return e.max === e.min ? 0 : t / (e.max - e.min) * 100;
}
const Vt = {
  correct: (t, e) => {
    if (!e.target)
      return t;
    if (typeof t == "string")
      if (b.test(t))
        t = parseFloat(t);
      else
        return t;
    const n = Vi(t, e.target.x), i = Vi(t, e.target.y);
    return `${n}% ${i}%`;
  }
}, Yc = {
  correct: (t, { treeScale: e, projectionDelta: n }) => {
    const i = t, s = et.parse(t);
    if (s.length > 5)
      return i;
    const o = et.createTransformer(t), r = typeof s[0] != "number" ? 1 : 0, a = n.x.scale * e.x, l = n.y.scale * e.y;
    s[0 + r] /= a, s[1 + r] /= l;
    const u = M(a, l, 0.5);
    return typeof s[2 + r] == "number" && (s[2 + r] /= u), typeof s[3 + r] == "number" && (s[3 + r] /= u), o(s);
  }
};
let Pe = !1;
class qc extends es {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i, layoutId: s } = this.props, { projection: o } = e;
    vl(Zc), o && (n.group && n.group.add(o), i && i.register && s && i.register(o), Pe && o.root.didUpdate(), o.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), o.setOptions({
      ...o.options,
      onExitComplete: () => this.safeToRemove()
    })), Jt.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: n, visualElement: i, drag: s, isPresent: o } = this.props, { projection: r } = i;
    return r && (r.isPresent = o, Pe = !0, s || e.layoutDependency !== n || n === void 0 || e.isPresent !== o ? r.willUpdate() : this.safeToRemove(), e.isPresent !== o && (o ? r.promote() : r.relegate() || C.postRender(() => {
      const a = r.getStack();
      (!a || !a.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e && (e.root.didUpdate(), Tn.postRender(() => {
      !e.currentAnimation && e.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: n, switchLayoutGroup: i } = this.props, { projection: s } = e;
    Pe = !0, s && (s.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(s), i && i.deregister && i.deregister(s));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function Dr(t) {
  const [e, n] = Zs(), i = F(Ze);
  return S(qc, { ...t, layoutGroup: i, switchLayoutGroup: F(cr), isPresent: e, safeToRemove: n });
}
const Zc = {
  borderRadius: {
    ...Vt,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: Vt,
  borderTopRightRadius: Vt,
  borderBottomLeftRadius: Vt,
  borderBottomRightRadius: Vt,
  boxShadow: Yc
};
function Jc(t, e, n) {
  const i = I(t) ? t : vt(t);
  return i.start(En("", i, e, n)), i.animation;
}
const Qc = (t, e) => t.depth - e.depth;
class tu {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    tn(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    en(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(Qc), this.isDirty = !1, this.children.forEach(e);
  }
}
function eu(t, e) {
  const n = N.now(), i = ({ timestamp: s }) => {
    const o = s - n;
    o >= e && (tt(i), t(o - e));
  };
  return C.setup(i, !0), () => tt(i);
}
const Rr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"], nu = Rr.length, Ci = (t) => typeof t == "string" ? parseFloat(t) : t, Mi = (t) => typeof t == "number" || b.test(t);
function iu(t, e, n, i, s, o) {
  s ? (t.opacity = M(0, n.opacity ?? 1, su(i)), t.opacityExit = M(e.opacity ?? 1, 0, ru(i))) : o && (t.opacity = M(e.opacity ?? 1, n.opacity ?? 1, i));
  for (let r = 0; r < nu; r++) {
    const a = `border${Rr[r]}Radius`;
    let l = Di(e, a), u = Di(n, a);
    if (l === void 0 && u === void 0)
      continue;
    l || (l = 0), u || (u = 0), l === 0 || u === 0 || Mi(l) === Mi(u) ? (t[a] = Math.max(M(Ci(l), Ci(u), i), 0), (X.test(u) || X.test(l)) && (t[a] += "%")) : t[a] = u;
  }
  (e.rotate || n.rotate) && (t.rotate = M(e.rotate || 0, n.rotate || 0, i));
}
function Di(t, e) {
  return t[e] !== void 0 ? t[e] : t.borderRadius;
}
const su = /* @__PURE__ */ Er(0, 0.5, ys), ru = /* @__PURE__ */ Er(0.5, 0.95, K);
function Er(t, e, n) {
  return (i) => i < t ? 0 : i > e ? 1 : n(/* @__PURE__ */ Bt(t, e, i));
}
function Ri(t, e) {
  t.min = e.min, t.max = e.max;
}
function W(t, e) {
  Ri(t.x, e.x), Ri(t.y, e.y);
}
function Ei(t, e) {
  t.translate = e.translate, t.scale = e.scale, t.originPoint = e.originPoint, t.origin = e.origin;
}
function Li(t, e, n, i, s) {
  return t -= e, t = re(t, 1 / n, i), s !== void 0 && (t = re(t, 1 / s, i)), t;
}
function ou(t, e = 0, n = 1, i = 0.5, s, o = t, r = t) {
  if (X.test(e) && (e = parseFloat(e), e = M(r.min, r.max, e / 100) - r.min), typeof e != "number")
    return;
  let a = M(o.min, o.max, i);
  t === o && (a -= e), t.min = Li(t.min, e, n, a, s), t.max = Li(t.max, e, n, a, s);
}
function ki(t, e, [n, i, s], o, r) {
  ou(t, e[n], e[i], e[s], e.scale, o, r);
}
const au = ["x", "scaleX", "originX"], lu = ["y", "scaleY", "originY"];
function Bi(t, e, n, i) {
  ki(t.x, e, au, n ? n.x : void 0, i ? i.x : void 0), ki(t.y, e, lu, n ? n.y : void 0, i ? i.y : void 0);
}
function Fi(t) {
  return t.translate === 0 && t.scale === 1;
}
function Lr(t) {
  return Fi(t.x) && Fi(t.y);
}
function Ii(t, e) {
  return t.min === e.min && t.max === e.max;
}
function cu(t, e) {
  return Ii(t.x, e.x) && Ii(t.y, e.y);
}
function Oi(t, e) {
  return Math.round(t.min) === Math.round(e.min) && Math.round(t.max) === Math.round(e.max);
}
function kr(t, e) {
  return Oi(t.x, e.x) && Oi(t.y, e.y);
}
function ji(t) {
  return j(t.x) / j(t.y);
}
function Ni(t, e) {
  return t.translate === e.translate && t.scale === e.scale && t.originPoint === e.originPoint;
}
class uu {
  constructor() {
    this.members = [];
  }
  add(e) {
    tn(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (en(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
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
function hu(t, e, n) {
  let i = "";
  const s = t.x.translate / e.x, o = t.y.translate / e.y, r = n?.z || 0;
  if ((s || o || r) && (i = `translate3d(${s}px, ${o}px, ${r}px) `), (e.x !== 1 || e.y !== 1) && (i += `scale(${1 / e.x}, ${1 / e.y}) `), n) {
    const { transformPerspective: u, rotate: c, rotateX: h, rotateY: f, skewX: d, skewY: p } = n;
    u && (i = `perspective(${u}px) ${i}`), c && (i += `rotate(${c}deg) `), h && (i += `rotateX(${h}deg) `), f && (i += `rotateY(${f}deg) `), d && (i += `skewX(${d}deg) `), p && (i += `skewY(${p}deg) `);
  }
  const a = t.x.scale * e.x, l = t.y.scale * e.y;
  return (a !== 1 || l !== 1) && (i += `scale(${a}, ${l})`), i || "none";
}
const Se = ["", "X", "Y", "Z"], fu = 1e3;
let du = 0;
function we(t, e, n, i) {
  const { latestValues: s } = e;
  s[t] && (n[t] = s[t], e.setStaticValue(t, 0), i && (i[t] = 0));
}
function Br(t) {
  if (t.hasCheckedOptimisedAppear = !0, t.root === t)
    return;
  const { visualElement: e } = t.options;
  if (!e)
    return;
  const n = xr(e);
  if (window.MotionHasOptimisedAnimation(n, "transform")) {
    const { layout: s, layoutId: o } = t.options;
    window.MotionCancelOptimisedAnimation(n, "transform", C, !(s || o));
  }
  const { parent: i } = t;
  i && !i.hasCheckedOptimisedAppear && Br(i);
}
function Fr({ attachResizeListener: t, defaultParent: e, measureScroll: n, checkIsScrollRoot: i, resetTransform: s }) {
  return class {
    constructor(r = {}, a = e?.()) {
      this.id = du++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(gu), this.nodes.forEach(Tu), this.nodes.forEach(bu), this.nodes.forEach(yu);
      }, this.resolvedRelativeTargetAt = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = r, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new tu());
    }
    addEventListener(r, a) {
      return this.eventHandlers.has(r) || this.eventHandlers.set(r, new rn()), this.eventHandlers.get(r).add(a);
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
      this.isSVG = qs(r) && !nl(r), this.instance = r;
      const { layoutId: a, layout: l, visualElement: u } = this.options;
      if (u && !u.current && u.mount(r), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), t) {
        let c, h = 0;
        const f = () => this.root.updateBlockedByResize = !1;
        C.read(() => {
          h = window.innerWidth;
        }), t(r, () => {
          const d = window.innerWidth;
          d !== h && (h = d, this.root.updateBlockedByResize = !0, c && c(), c = eu(f, 250), Jt.hasAnimatedSinceResize && (Jt.hasAnimatedSinceResize = !1, this.nodes.forEach(Wi)));
        });
      }
      a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({ delta: c, hasLayoutChanged: h, hasRelativeLayoutChanged: f, layout: d }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const p = this.options.transition || u.getDefaultTransition() || Vu, { onLayoutAnimationStart: g, onLayoutAnimationComplete: v } = u.getProps(), m = !this.targetLayout || !kr(this.targetLayout, d), x = !h && f;
        if (this.options.layoutRoot || this.resumeFrom || x || h && (m || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const y = {
            ...vn(p, "layout"),
            onPlay: g,
            onComplete: v
          };
          (u.shouldReduceMotion || this.options.layoutRoot) && (y.delay = 0, y.type = !1), this.startAnimation(y), this.setAnimationOrigin(c, x);
        } else
          h || Wi(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = d;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const r = this.getStack();
      r && r.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), tt(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Pu), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Br(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(_i);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ui);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(xu), this.nodes.forEach(pu), this.nodes.forEach(mu)) : this.nodes.forEach(Ui), this.clearAllSnapshots();
      const a = N.now();
      B.delta = Y(0, 1e3 / 60, a - B.timestamp), B.timestamp = a, B.isProcessing = !0, fe.update.process(B), fe.preRender.process(B), fe.render.process(B), B.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Tn.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(vu), this.sharedNodes.forEach(Su);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, C.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      C.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !j(this.snapshot.measuredBox.x) && !j(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++)
          this.path[l].updateScroll();
      const r = this.layout;
      this.layout = this.measure(!1), this.layoutCorrected = R(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const r = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, a = this.projectionDelta && !Lr(this.projectionDelta), l = this.getTransformTemplate(), u = l ? l(this.latestValues, "") : void 0, c = u !== this.prevTransformTemplateValue;
      r && this.instance && (a || rt(this.latestValues) || c) && (s(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(r = !0) {
      const a = this.measurePageBox();
      let l = this.removeElementScroll(a);
      return r && (l = this.removeTransform(l)), Cu(l), {
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
        return R();
      const a = r.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Mu))) {
        const { scroll: u } = this.root;
        u && (pt(a.x, u.offset.x), pt(a.y, u.offset.y));
      }
      return a;
    }
    removeElementScroll(r) {
      const a = R();
      if (W(a, r), this.scroll?.wasRoot)
        return a;
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l], { scroll: c, options: h } = u;
        u !== this.root && c && h.layoutScroll && (c.wasRoot && W(a, r), pt(a.x, c.offset.x), pt(a.y, c.offset.y));
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const l = R();
      W(l, r);
      for (let u = 0; u < this.path.length; u++) {
        const c = this.path[u];
        !a && c.options.layoutScroll && c.scroll && c !== c.root && mt(l, {
          x: -c.scroll.offset.x,
          y: -c.scroll.offset.y
        }), rt(c.latestValues) && mt(l, c.latestValues);
      }
      return rt(this.latestValues) && mt(l, this.latestValues), l;
    }
    removeTransform(r) {
      const a = R();
      W(a, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !rt(u.latestValues))
          continue;
        _e(u.latestValues) && u.updateSnapshot();
        const c = R(), h = u.measurePageBox();
        W(c, h), Bi(a, u.latestValues, u.snapshot ? u.snapshot.layoutBox : void 0, c);
      }
      return rt(this.latestValues) && Bi(a, this.latestValues), a;
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
          const f = this.getClosestProjectingParent();
          f && f.layout && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = R(), this.relativeTargetOrigin = R(), kt(this.relativeTargetOrigin, this.layout.layoutBox, f.layout.layoutBox), W(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
        if (!(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = R(), this.targetWithTransforms = R()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), Bc(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : W(this.target, this.layout.layoutBox), dr(this.target, this.targetDelta)) : W(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget)) {
          this.attemptToResolveRelativeTarget = !1;
          const f = this.getClosestProjectingParent();
          f && !!f.resumingFrom == !!this.resumingFrom && !f.options.layoutScroll && f.target && this.animationProgress !== 1 ? (this.relativeParent = f, this.forceRelativeParentToResolveTarget(), this.relativeTarget = R(), this.relativeTargetOrigin = R(), kt(this.relativeTargetOrigin, this.target, f.target), W(this.relativeTarget, this.relativeTargetOrigin)) : this.relativeParent = this.relativeTarget = void 0;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || _e(this.parent.latestValues) || fr(this.parent.latestValues)))
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
      W(this.layoutCorrected, this.layout.layoutBox);
      const h = this.treeScale.x, f = this.treeScale.y;
      Gl(this.layoutCorrected, this.treeScale, this.path, a), r.layout && !r.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (r.target = r.layout.layoutBox, r.targetWithTransforms = R());
      const { target: d } = r;
      if (!d) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ei(this.prevProjectionDelta.x, this.projectionDelta.x), Ei(this.prevProjectionDelta.y, this.projectionDelta.y)), Lt(this.projectionDelta, this.layoutCorrected, d, this.latestValues), (this.treeScale.x !== h || this.treeScale.y !== f || !Ni(this.projectionDelta.x, this.prevProjectionDelta.x) || !Ni(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", d));
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
      this.prevProjectionDelta = gt(), this.projectionDelta = gt(), this.projectionDeltaWithTransform = gt();
    }
    setAnimationOrigin(r, a = !1) {
      const l = this.snapshot, u = l ? l.latestValues : {}, c = { ...this.latestValues }, h = gt();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
      const f = R(), d = l ? l.source : void 0, p = this.layout ? this.layout.source : void 0, g = d !== p, v = this.getStack(), m = !v || v.members.length <= 1, x = !!(g && !m && this.options.crossfade === !0 && !this.path.some(Au));
      this.animationProgress = 0;
      let y;
      this.mixTargetDelta = (w) => {
        const T = w / 1e3;
        $i(h.x, r.x, T), $i(h.y, r.y, T), this.setTargetDelta(h), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (kt(f, this.layout.layoutBox, this.relativeParent.layout.layoutBox), wu(this.relativeTarget, this.relativeTargetOrigin, f, T), y && cu(this.relativeTarget, y) && (this.isProjectionDirty = !1), y || (y = R()), W(y, this.relativeTarget)), g && (this.animationValues = c, iu(c, u, this.latestValues, T, x, m)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = T;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(r) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (tt(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = C.update(() => {
        Jt.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = vt(0)), this.currentAnimation = Jc(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(fu), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let { targetWithTransforms: a, target: l, layout: u, latestValues: c } = r;
      if (!(!a || !l || !u)) {
        if (this !== r && this.layout && u && Ir(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
          l = this.target || R();
          const h = j(this.layout.layoutBox.x);
          l.x.min = r.target.x.min, l.x.max = l.x.min + h;
          const f = j(this.layout.layoutBox.y);
          l.y.min = r.target.y.min, l.y.max = l.y.min + f;
        }
        W(a, l), mt(a, c), Lt(this.projectionDeltaWithTransform, this.layoutCorrected, a, c);
      }
    }
    registerSharedNode(r, a) {
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new uu()), this.sharedNodes.get(r).add(a);
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
      l.z && we("z", r, u, this.animationValues);
      for (let c = 0; c < Se.length; c++)
        we(`rotate${Se[c]}`, r, u, this.animationValues), we(`skew${Se[c]}`, r, u, this.animationValues);
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
        this.needsReset = !1, r.visibility = "", r.opacity = "", r.pointerEvents = Zt(a?.pointerEvents) || "", r.transform = l ? l(this.latestValues, "") : "none";
        return;
      }
      const u = this.getLead();
      if (!this.projectionDelta || !this.layout || !u.target) {
        this.options.layoutId && (r.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, r.pointerEvents = Zt(a?.pointerEvents) || ""), this.hasProjected && !rt(this.latestValues) && (r.transform = l ? l({}, "") : "none", this.hasProjected = !1);
        return;
      }
      r.visibility = "";
      const c = u.animationValues || u.latestValues;
      this.applyTransformsToTarget();
      let h = hu(this.projectionDeltaWithTransform, this.treeScale, c);
      l && (h = l(c, h)), r.transform = h;
      const { x: f, y: d } = this.projectionDelta;
      r.transformOrigin = `${f.origin * 100}% ${d.origin * 100}% 0`, u.animationValues ? r.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : r.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
      for (const p in jt) {
        if (c[p] === void 0)
          continue;
        const { correct: g, applyTo: v, isCSSVariable: m } = jt[p], x = h === "none" ? c[p] : g(c[p], u);
        if (v) {
          const y = v.length;
          for (let w = 0; w < y; w++)
            r[v[w]] = x;
        } else
          m ? this.options.visualElement.renderState.vars[p] = x : r[p] = x;
      }
      this.options.layoutId && (r.pointerEvents = u === this ? Zt(a?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((r) => r.currentAnimation?.stop()), this.root.nodes.forEach(_i), this.root.sharedNodes.clear();
    }
  };
}
function pu(t) {
  t.updateLayout();
}
function mu(t) {
  const e = t.resumeFrom?.snapshot || t.snapshot;
  if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
    const { layoutBox: n, measuredBox: i } = t.layout, { animationType: s } = t.options, o = e.source !== t.layout.source;
    s === "size" ? $((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], f = j(h);
      h.min = n[c].min, h.max = h.min + f;
    }) : Ir(s, e.layoutBox, n) && $((c) => {
      const h = o ? e.measuredBox[c] : e.layoutBox[c], f = j(n[c]);
      h.max = h.min + f, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + f);
    });
    const r = gt();
    Lt(r, n, e.layoutBox);
    const a = gt();
    o ? Lt(a, t.applyTransform(i, !0), e.measuredBox) : Lt(a, n, e.layoutBox);
    const l = !Lr(r);
    let u = !1;
    if (!t.resumeFrom) {
      const c = t.getClosestProjectingParent();
      if (c && !c.resumeFrom) {
        const { snapshot: h, layout: f } = c;
        if (h && f) {
          const d = R();
          kt(d, e.layoutBox, h.layoutBox);
          const p = R();
          kt(p, n, f.layoutBox), kr(d, p) || (u = !0), c.options.layoutRoot && (t.relativeTarget = p, t.relativeTargetOrigin = d, t.relativeParent = c);
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
function gu(t) {
  t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty || (t.isSharedProjectionDirty = !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty)), t.isTransformDirty || (t.isTransformDirty = t.parent.isTransformDirty));
}
function yu(t) {
  t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function vu(t) {
  t.clearSnapshot();
}
function _i(t) {
  t.clearMeasurements();
}
function Ui(t) {
  t.isLayoutDirty = !1;
}
function xu(t) {
  const { visualElement: e } = t.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function Wi(t) {
  t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function Tu(t) {
  t.resolveTargetDelta();
}
function bu(t) {
  t.calcProjection();
}
function Pu(t) {
  t.resetSkewAndRotation();
}
function Su(t) {
  t.removeLeadSnapshot();
}
function $i(t, e, n) {
  t.translate = M(e.translate, 0, n), t.scale = M(e.scale, 1, n), t.origin = e.origin, t.originPoint = e.originPoint;
}
function zi(t, e, n, i) {
  t.min = M(e.min, n.min, i), t.max = M(e.max, n.max, i);
}
function wu(t, e, n, i) {
  zi(t.x, e.x, n.x, i), zi(t.y, e.y, n.y, i);
}
function Au(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const Vu = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Ki = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), Gi = Ki("applewebkit/") && !Ki("chrome/") ? Math.round : K;
function Hi(t) {
  t.min = Gi(t.min), t.max = Gi(t.max);
}
function Cu(t) {
  Hi(t.x), Hi(t.y);
}
function Ir(t, e, n) {
  return t === "position" || t === "preserve-aspect" && !kc(ji(e), ji(n), 0.2);
}
function Mu(t) {
  return t !== t.root && t.scroll?.wasRoot;
}
const Du = Fr({
  attachResizeListener: (t, e) => Nt(t, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop
  }),
  checkIsScrollRoot: () => !0
}), Ae = {
  current: void 0
}, Or = Fr({
  measureScroll: (t) => ({
    x: t.scrollLeft,
    y: t.scrollTop
  }),
  defaultParent: () => {
    if (!Ae.current) {
      const t = new Du({});
      t.mount(window), t.setOptions({ layoutScroll: !0 }), Ae.current = t;
    }
    return Ae.current;
  },
  resetTransform: (t, e) => {
    t.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), Ru = {
  pan: {
    Feature: Xc
  },
  drag: {
    Feature: Hc,
    ProjectionNode: Or,
    MeasureLayout: Dr
  }
};
function Xi(t, e, n) {
  const { props: i } = t;
  t.animationState && i.whileHover && t.animationState.setActive("whileHover", n === "Start");
  const s = "onHover" + n, o = i[s];
  o && C.postRender(() => o(e, $t(e)));
}
class Eu extends nt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = Za(e, (n, i) => (Xi(this.node, i, "Start"), (s) => Xi(this.node, s, "End"))));
  }
  unmount() {
  }
}
class Lu extends nt {
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
    this.unmount = _t(Nt(this.node.current, "focus", () => this.onFocus()), Nt(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Yi(t, e, n) {
  const { props: i } = t;
  if (t.current instanceof HTMLButtonElement && t.current.disabled)
    return;
  t.animationState && i.whileTap && t.animationState.setActive("whileTap", n === "Start");
  const s = "onTap" + (n === "End" ? "" : n), o = i[s];
  o && C.postRender(() => o(e, $t(e)));
}
class ku extends nt {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = el(e, (n, i) => (Yi(this.node, i, "Start"), (s, { success: o }) => Yi(this.node, s, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
  }
  unmount() {
  }
}
const He = /* @__PURE__ */ new WeakMap(), Ve = /* @__PURE__ */ new WeakMap(), Bu = (t) => {
  const e = He.get(t.target);
  e && e(t);
}, Fu = (t) => {
  t.forEach(Bu);
};
function Iu({ root: t, ...e }) {
  const n = t || document;
  Ve.has(n) || Ve.set(n, {});
  const i = Ve.get(n), s = JSON.stringify(e);
  return i[s] || (i[s] = new IntersectionObserver(Fu, { root: t, ...e })), i[s];
}
function Ou(t, e, n) {
  const i = Iu(e);
  return He.set(t, n), i.observe(t), () => {
    He.delete(t), i.unobserve(t);
  };
}
const ju = {
  some: 0,
  all: 1
};
class Nu extends nt {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.unmount();
    const { viewport: e = {} } = this.node.getProps(), { root: n, margin: i, amount: s = "some", once: o } = e, r = {
      root: n ? n.current : void 0,
      rootMargin: i,
      threshold: typeof s == "number" ? s : ju[s]
    }, a = (l) => {
      const { isIntersecting: u } = l;
      if (this.isInView === u || (this.isInView = u, o && !u && this.hasEnteredView))
        return;
      u && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", u);
      const { onViewportEnter: c, onViewportLeave: h } = this.node.getProps(), f = u ? c : h;
      f && f(l);
    };
    return Ou(this.node.current, r, a);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: n } = this.node;
    ["amount", "margin", "root"].some(_u(e, n)) && this.startObserver();
  }
  unmount() {
  }
}
function _u({ viewport: t = {} }, { viewport: e = {} } = {}) {
  return (n) => t[n] !== e[n];
}
const Uu = {
  inView: {
    Feature: Nu
  },
  tap: {
    Feature: ku
  },
  focus: {
    Feature: Lu
  },
  hover: {
    Feature: Eu
  }
}, Wu = {
  layout: {
    ProjectionNode: Or,
    MeasureLayout: Dr
  }
}, $u = {
  ...Cc,
  ...Uu,
  ...Ru,
  ...Wu
}, qi = /* @__PURE__ */ $l($u, nc), Zi = [
  {
    id: "yearly",
    label: "Yearly",
    badge: "BEST VALUE",
    price: "$39.99",
    period: "/ year",
    perMonth: "$3.33/mo",
    savings: "Save 67%"
  },
  {
    id: "monthly",
    label: "Monthly",
    badge: null,
    price: "$9.99",
    period: "/ month",
    perMonth: null,
    savings: null
  }
], Ji = [
  { icon: io, text: "AI-powered auto-enhance & retouching" },
  { icon: to, text: "500+ premium filters & effects" },
  { icon: rs, text: "Remove backgrounds & objects" },
  { icon: ao, text: "Export in 4K without watermarks" }
];
function zu() {
  const [t, e] = te("yearly"), [n, i] = te(!1), s = Zi.find((r) => r.id === t), o = t === "yearly" ? "Subscription auto-renews at $39.99/year unless cancelled at least 24 hours before renewal." : "Subscription auto-renews at $9.99/month unless cancelled at least 24 hours before renewal.";
  return /* @__PURE__ */ S("div", { className: "size-full flex items-center justify-center bg-zinc-100", children: /* @__PURE__ */ _(
    "div",
    {
      style: {
        width: 375,
        height: 720,
        borderRadius: 40,
        background: "#111",
        boxShadow: "0 0 0 2px #333, 0 0 0 4px #555, 0 30px 80px rgba(0,0,0,0.45)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0
      },
      children: [
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 28,
              background: "#111",
              borderRadius: "0 0 18px 18px",
              zIndex: 20
            }
          }
        ),
        /* @__PURE__ */ S(hl, { children: n ? /* @__PURE__ */ _(
          qi.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "size-full flex flex-col items-center justify-center gap-3",
            style: { background: "linear-gradient(160deg, #0f0c29, #302b63, #24243e)" },
            children: [
              /* @__PURE__ */ S("p", { style: { color: "rgba(255,255,255,0.5)", fontSize: 14 }, children: "You closed the offer." }),
              /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => i(!1),
                  style: {
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    padding: "8px 20px",
                    borderRadius: 20,
                    fontSize: 13,
                    cursor: "pointer"
                  },
                  children: "View Offer Again"
                }
              )
            ]
          },
          "dismissed"
        ) : /* @__PURE__ */ _(
          qi.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "size-full flex flex-col",
            style: {
              background: "linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #1a0533 100%)",
              overflowY: "auto",
              scrollbarWidth: "none"
            },
            children: [
              /* @__PURE__ */ S("div", { style: { height: 36 } }),
              /* @__PURE__ */ S("div", { className: "flex justify-end px-4", children: /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => i(!0),
                  "aria-label": "Close subscription offer",
                  style: {
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.8)"
                  },
                  children: /* @__PURE__ */ S(ro, { size: 16 })
                }
              ) }),
              /* @__PURE__ */ _("div", { className: "flex flex-col items-center px-5 pt-2 pb-3", children: [
                /* @__PURE__ */ S(
                  "div",
                  {
                    style: {
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      background: "linear-gradient(135deg, #a855f7, #ec4899)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                      boxShadow: "0 8px 24px rgba(168,85,247,0.4)"
                    },
                    children: /* @__PURE__ */ S(rs, { size: 28, color: "#fff" })
                  }
                ),
                /* @__PURE__ */ S(
                  "h1",
                  {
                    style: {
                      color: "#fff",
                      fontSize: 22,
                      fontWeight: 700,
                      textAlign: "center",
                      margin: 0,
                      lineHeight: 1.2
                    },
                    children: "Unlock PixelPro"
                  }
                ),
                /* @__PURE__ */ S(
                  "p",
                  {
                    style: {
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 13,
                      textAlign: "center",
                      marginTop: 4,
                      lineHeight: 1.4
                    },
                    children: "Professional photo editing, powered by AI"
                  }
                )
              ] }),
              /* @__PURE__ */ S(
                "div",
                {
                  style: {
                    margin: "0 16px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 14,
                    padding: "10px 14px",
                    border: "1px solid rgba(255,255,255,0.08)"
                  },
                  children: Ji.map((r, a) => /* @__PURE__ */ _(
                    "div",
                    {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "6px 0",
                        borderBottom: a < Ji.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none"
                      },
                      children: [
                        /* @__PURE__ */ S(
                          "div",
                          {
                            style: {
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              background: "linear-gradient(135deg, #a855f7, #ec4899)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0
                            },
                            children: /* @__PURE__ */ S(r.icon, { size: 14, color: "#fff" })
                          }
                        ),
                        /* @__PURE__ */ S("span", { style: { color: "rgba(255,255,255,0.85)", fontSize: 13 }, children: r.text })
                      ]
                    },
                    a
                  ))
                }
              ),
              /* @__PURE__ */ S("div", { className: "flex gap-3 px-4 pt-4 pb-1", children: Zi.map((r) => {
                const a = t === r.id;
                return /* @__PURE__ */ _(
                  "button",
                  {
                    onClick: () => e(r.id),
                    style: {
                      flex: 1,
                      borderRadius: 14,
                      padding: "10px 8px",
                      border: a ? "2px solid #a855f7" : "2px solid rgba(255,255,255,0.12)",
                      background: a ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.05)",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.18s"
                    },
                    children: [
                      r.badge && /* @__PURE__ */ S(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: -10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "linear-gradient(90deg,#a855f7,#ec4899)",
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 20,
                            whiteSpace: "nowrap",
                            letterSpacing: "0.05em"
                          },
                          children: r.badge
                        }
                      ),
                      /* @__PURE__ */ S(
                        "div",
                        {
                          style: {
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 600,
                            marginBottom: 2
                          },
                          children: r.label
                        }
                      ),
                      /* @__PURE__ */ S(
                        "div",
                        {
                          style: {
                            color: a ? "#d8b4fe" : "rgba(255,255,255,0.5)",
                            fontSize: 18,
                            fontWeight: 700
                          },
                          children: r.price
                        }
                      ),
                      /* @__PURE__ */ S(
                        "div",
                        {
                          style: {
                            color: "rgba(255,255,255,0.45)",
                            fontSize: 11
                          },
                          children: r.period
                        }
                      ),
                      r.perMonth && /* @__PURE__ */ S(
                        "div",
                        {
                          style: {
                            marginTop: 3,
                            background: "rgba(168,85,247,0.3)",
                            color: "#d8b4fe",
                            fontSize: 10,
                            borderRadius: 6,
                            padding: "1px 6px",
                            display: "inline-block",
                            fontWeight: 600
                          },
                          children: r.savings
                        }
                      )
                    ]
                  },
                  r.id
                );
              }) }),
              /* @__PURE__ */ S("div", { className: "px-4 pt-2", children: /* @__PURE__ */ _(
                "div",
                {
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 10,
                    padding: "8px 12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ S("span", { style: { color: "rgba(255,255,255,0.55)", fontSize: 12 }, children: "Billed today" }),
                    /* @__PURE__ */ _("span", { style: { color: "#fff", fontSize: 14, fontWeight: 700 }, children: [
                      s.price,
                      /* @__PURE__ */ _(
                        "span",
                        {
                          style: { color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 400 },
                          children: [
                            " ",
                            s.period
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ) }),
              /* @__PURE__ */ S("div", { className: "px-4 pt-3", children: /* @__PURE__ */ S(
                "button",
                {
                  style: {
                    width: "100%",
                    padding: "14px",
                    borderRadius: 14,
                    background: "linear-gradient(90deg, #a855f7, #ec4899)",
                    border: "none",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(168,85,247,0.4)",
                    letterSpacing: "0.01em"
                  },
                  children: "Subscribe Now"
                }
              ) }),
              /* @__PURE__ */ _("div", { className: "px-5 pt-2 pb-4", children: [
                /* @__PURE__ */ _(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      marginBottom: 6
                    },
                    children: [
                      /* @__PURE__ */ S(Jr, { size: 12, color: "#a855f7" }),
                      /* @__PURE__ */ S("span", { style: { color: "rgba(255,255,255,0.5)", fontSize: 11 }, children: "Cancel anytime in Google Play" })
                    ]
                  }
                ),
                /* @__PURE__ */ _(
                  "p",
                  {
                    style: {
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 10,
                      textAlign: "center",
                      lineHeight: 1.5,
                      margin: 0
                    },
                    children: [
                      o,
                      " Manage or cancel at any time via your Google Play subscriptions.",
                      " ",
                      /* @__PURE__ */ S(
                        "span",
                        {
                          style: { textDecoration: "underline", cursor: "pointer" },
                          children: "Privacy Policy"
                        }
                      ),
                      " ",
                      "&",
                      " ",
                      /* @__PURE__ */ S(
                        "span",
                        {
                          style: { textDecoration: "underline", cursor: "pointer" },
                          children: "Terms of Service"
                        }
                      )
                    ]
                  }
                )
              ] })
            ]
          },
          "paywall"
        ) })
      ]
    }
  ) });
}
const Ku = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zu
}, Symbol.toStringTag, { value: "Module" }));
export {
  Hu as Code0_8
};
