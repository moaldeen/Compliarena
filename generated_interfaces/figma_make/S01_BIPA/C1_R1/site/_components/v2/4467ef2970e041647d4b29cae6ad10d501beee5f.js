const Qe = () => Promise.resolve().then(() => Je), ae = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: le, jsx: i, jsxs: c } = ae;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
function Y(e) {
  const t = e?.props?._fgT, n = typeof t == "function" || typeof t == "string" || typeof t == "object" && t !== null && "$$typeof" in t;
  return globalThis.__GLOBALS__.React.isValidElement(e) && n;
}
function z(e) {
  return globalThis.__GLOBALS__.React.isValidElement(e) && e.type === "fg-txt";
}
function X(e) {
  const { _fgT: t, _fgS: n, _fgB: r, _fgD: o, ...s } = e.props;
  return globalThis.__GLOBALS__.React.createElement(t, {
    ...s,
    key: e.key
  }, s.children);
}
function P(e) {
  return Y(e) ? X(e) : z(e) ? e.props.children : e;
}
const C = globalThis.__GLOBALS__.React.Children, R = {
  map(e, t, n) {
    return C.map(e, (r, o) => {
      const s = P(r);
      return z(r) ? null : t.call(n, s, o);
    });
  },
  forEach(e, t, n) {
    C.forEach(e, (r, o) => {
      if (z(r))
        return;
      const s = P(r);
      t.call(n, s, o);
    });
  },
  count(e) {
    let t = 0;
    return C.forEach(e, (n) => {
      z(n) || t++;
    }), t;
  },
  toArray(e) {
    const t = [];
    return C.forEach(e, (n) => {
      z(n) || t.push(P(n));
    }), t;
  },
  only(e) {
    const t = C.only(e);
    return P(t);
  }
}, L = [
  "_fgT",
  "_fgS",
  "_fgB",
  "_fgD"
];
function ce(e) {
  if (e == null || typeof e != "object") return e;
  const t = Object.keys(e);
  let n = !1;
  for (let o = 0; o < L.length; o++)
    if (L[o] in e) {
      n = !0;
      break;
    }
  if (!n) return e;
  const r = {};
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    L.indexOf(s) === -1 && (r[s] = e[s]);
  }
  return r;
}
const D = globalThis.__GLOBALS__.React.cloneElement, Z = (e, ...t) => {
  if (Y(e)) {
    const n = X(e), r = t[0];
    return r != null && typeof r == "object" && (t = [
      ce(r),
      ...t.slice(1)
    ]), D(n, ...t);
  }
  return D(e, ...t);
};
({
  ...globalThis.__GLOBALS__.React
});
const { Component: et, createContext: $, createElement: j, createFactory: tt, createRef: nt, forwardRef: S, Fragment: de, isValidElement: I, lazy: ot, memo: it, Profiler: rt, PureComponent: st, startTransition: at, StrictMode: lt, Suspense: ct, use: dt, useCallback: K, useContext: fe, useDebugValue: ft, useDeferredValue: ut, useEffect: A, useId: pt, useImperativeHandle: ht, useInsertionEffect: yt, useLayoutEffect: ue, useMemo: F, useReducer: gt, useRef: E, useState: g, useSyncExternalStore: bt, useTransition: mt, version: xt, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: vt } = globalThis.__GLOBALS__.React;
function pe(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e?.(o), n === !1 || !o.defaultPrevented)
      return t?.(o);
  };
}
function W(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function J(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const s = W(o, t);
      return !n && typeof s == "function" && (n = !0), s;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const s = r[o];
          typeof s == "function" ? s() : W(e[o], null);
        }
      };
  };
}
function he(...e) {
  return K(J(...e), e);
}
function ye(e, t = []) {
  let n = [];
  function r(s, a) {
    const l = $(a), d = n.length;
    n = [...n, a];
    const f = (h) => {
      const { scope: u, children: m, ...x } = h, v = u?.[e]?.[d] || l, k = F(() => x, Object.values(x));
      return /* @__PURE__ */ i(v.Provider, { value: k, children: m });
    };
    f.displayName = s + "Provider";
    function p(h, u) {
      const m = u?.[e]?.[d] || l, x = fe(m);
      if (x) return x;
      if (a !== void 0) return a;
      throw new Error(`\`${h}\` must be used within \`${s}\``);
    }
    return [f, p];
  }
  const o = () => {
    const s = n.map((a) => $(a));
    return function(l) {
      const d = l?.[e] || s;
      return F(
        () => ({ [`__scope${e}`]: { ...l, [e]: d } }),
        [l, d]
      );
    };
  };
  return o.scopeName = e, [r, ge(o, ...t)];
}
function ge(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = r.reduce((l, { useScope: d, scopeName: f }) => {
        const h = d(s)[`__scope${f}`];
        return { ...l, ...h };
      }, {});
      return F(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Q(e) {
  const t = E(e);
  return A(() => {
    t.current = e;
  }), F(() => (...n) => t.current?.(...n), []);
}
function be({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  }
}) {
  const [r, o] = me({ defaultProp: t, onChange: n }), s = e !== void 0, a = s ? e : r, l = Q(n), d = K(
    (f) => {
      if (s) {
        const h = typeof f == "function" ? f(e) : f;
        h !== e && l(h);
      } else
        o(f);
    },
    [s, e, o, l]
  );
  return [a, d];
}
function me({
  defaultProp: e,
  onChange: t
}) {
  const n = g(e), [r] = n, o = E(r), s = Q(t);
  return A(() => {
    o.current !== r && (s(r), o.current = r);
  }, [r, o, s]), n;
}
function xe(e) {
  const t = E({ value: e, previous: e });
  return F(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var ve = globalThis?.document ? ue : () => {
};
function Se(e) {
  const [t, n] = g(void 0);
  return ve(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, l;
        if ("borderBoxSize" in s) {
          const d = s.borderBoxSize, f = Array.isArray(d) ? d[0] : d;
          a = f.inlineSize, l = f.blockSize;
        } else
          a = e.offsetWidth, l = e.offsetHeight;
        n({ width: a, height: l });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
globalThis.__GLOBALS__.ReactDOM;
const { createPortal: St, findDOMNode: kt, flushSync: wt, hydrate: _t, render: Ct, unmountComponentAtNode: zt, unstable_batchedUpdates: Rt, unstable_renderSubtreeIntoContainer: Ft, version: Et } = globalThis.__GLOBALS__.ReactDOM;
var ee = S((e, t) => {
  const { children: n, ...r } = e, o = R.toArray(n), s = o.find(we);
  if (s) {
    const a = s.props.children, l = o.map((d) => d === s ? R.count(a) > 1 ? R.only(null) : I(a) ? a.props.children : null : d);
    return /* @__PURE__ */ i(T, { ...r, ref: t, children: I(a) ? Z(a, void 0, l) : null });
  }
  return /* @__PURE__ */ i(T, { ...r, ref: t, children: n });
});
ee.displayName = "Slot";
var T = S((e, t) => {
  const { children: n, ...r } = e;
  if (I(n)) {
    const o = Ce(n), s = _e(r, n.props);
    return n.type !== de && (s.ref = t ? J(t, o) : o), Z(n, s);
  }
  return R.count(n) > 1 ? R.only(null) : null;
});
T.displayName = "SlotClone";
var ke = ({ children: e }) => /* @__PURE__ */ i(le, { children: e });
function we(e) {
  return I(e) && e.type === ke;
}
function _e(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], s = t[r];
    /^on[A-Z]/.test(r) ? o && s ? n[r] = (...l) => {
      s(...l), o(...l);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...s } : r === "className" && (n[r] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Ce(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ze = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], te = ze.reduce((e, t) => {
  const n = S((r, o) => {
    const { asChild: s, ...a } = r, l = s ? ee : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ i(l, { ...a, ref: o });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), O = "Switch", [Re] = ye(O), [Fe, Ee] = Re(O), ne = S(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: s,
      required: a,
      disabled: l,
      value: d = "on",
      onCheckedChange: f,
      form: p,
      ...h
    } = e, [u, m] = g(null), x = he(t, (_) => m(_)), v = E(!1), k = u ? p || !!u.closest("form") : !0, [w = !1, N] = be({
      prop: o,
      defaultProp: s,
      onChange: f
    });
    return /* @__PURE__ */ c(Fe, { scope: n, checked: w, disabled: l, children: [
      /* @__PURE__ */ i(
        te.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": a,
          "data-state": re(w),
          "data-disabled": l ? "" : void 0,
          disabled: l,
          value: d,
          ...h,
          ref: x,
          onClick: pe(e.onClick, (_) => {
            N((y) => !y), k && (v.current = _.isPropagationStopped(), v.current || _.stopPropagation());
          })
        }
      ),
      k && /* @__PURE__ */ i(
        Pe,
        {
          control: u,
          bubbles: !v.current,
          name: r,
          value: d,
          checked: w,
          required: a,
          disabled: l,
          form: p,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
ne.displayName = O;
var oe = "SwitchThumb", ie = S(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = Ee(oe, n);
    return /* @__PURE__ */ i(
      te.span,
      {
        "data-state": re(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
ie.displayName = oe;
var Pe = (e) => {
  const { control: t, checked: n, bubbles: r = !0, ...o } = e, s = E(null), a = xe(n), l = Se(t);
  return A(() => {
    const d = s.current, f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(f, "checked").set;
    if (a !== n && h) {
      const u = new Event("click", { bubbles: r });
      h.call(d, n), d.dispatchEvent(u);
    }
  }, [a, n, r]), /* @__PURE__ */ i(
    "input",
    {
      type: "checkbox",
      "aria-hidden": !0,
      defaultChecked: n,
      ...o,
      tabIndex: -1,
      ref: s,
      style: {
        ...e.style,
        ...l,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    }
  );
};
function re(e) {
  return e ? "checked" : "unchecked";
}
var G = ne, H = ie;
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ie = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Le = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), V = (e) => {
  const t = Le(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, se = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Be = {
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
const Me = S(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: s,
    iconNode: a,
    ...l
  }, d) => j(
    "svg",
    {
      ref: d,
      ...Be,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: se("lucide", o),
      ...l
    },
    [
      ...a.map(([f, p]) => j(f, p)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const b = (e, t) => {
  const n = S(
    ({ className: r, ...o }, s) => j(Me, {
      ref: s,
      iconNode: t,
      className: se(
        `lucide-${Ie(V(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = V(e), n;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const je = [
  ["rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2", key: "1w10f2" }],
  ["line", { x1: "22", x2: "22", y1: "11", y2: "13", key: "4dh1rd" }]
], Te = b("battery", je);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Oe = b("chevron-right", Ae);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ne = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], De = b("eye-off", Ne);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $e = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], We = b("eye", $e);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ge = [
  ["path", { d: "M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4", key: "1nerag" }],
  ["path", { d: "M14 13.12c0 2.38 0 6.38-1 8.88", key: "o46ks0" }],
  ["path", { d: "M17.29 21.02c.12-.6.43-2.3.5-3.02", key: "ptglia" }],
  ["path", { d: "M2 12a10 10 0 0 1 18-6", key: "ydlgp0" }],
  ["path", { d: "M2 16h.01", key: "1gqxmh" }],
  ["path", { d: "M21.8 16c.2-2 .131-5.354 0-6", key: "drycrb" }],
  ["path", { d: "M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2", key: "1tidbn" }],
  ["path", { d: "M8.65 22c.21-.66.45-1.32.57-2", key: "13wd9y" }],
  ["path", { d: "M9 6.8a6 6 0 0 1 9 5.2v2", key: "1fr1j5" }]
], B = b("fingerprint", Ge);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const He = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], U = b("lock", He);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ve = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
], M = b("scan-face", Ve);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ue = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], q = b("shield-check", Ue);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qe = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
], Ye = b("signal", qe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], Ze = b("wifi", Xe);
function Ke() {
  const [e, t] = g(""), [n, r] = g(!1), [o, s] = g(!1), [a, l] = g(!1), [d, f] = g("form"), [p, h] = g(null), [u, m] = g(!1), x = () => {
    e.length >= 4 && f("biometric-setup");
  }, v = (y) => {
    h(y), m(!0), setTimeout(() => {
      m(!1), f("success");
    }, 2e3);
  }, k = (y) => {
    s(y), y && l(!1);
  }, w = (y) => {
    l(y), y && s(!1);
  }, _ = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: !1 });
  return /* @__PURE__ */ c("div", { className: "size-full flex items-center justify-center bg-slate-100", children: [
    /* @__PURE__ */ c(
      "div",
      {
        style: {
          width: 375,
          height: 720,
          borderRadius: 48,
          background: "#0f172a",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0
        },
        children: [
          /* @__PURE__ */ i("div", { style: { position: "absolute", left: -3, top: 120, width: 3, height: 32, background: "#1e293b", borderRadius: "2px 0 0 2px" } }),
          /* @__PURE__ */ i("div", { style: { position: "absolute", left: -3, top: 164, width: 3, height: 32, background: "#1e293b", borderRadius: "2px 0 0 2px" } }),
          /* @__PURE__ */ i("div", { style: { position: "absolute", right: -3, top: 136, width: 3, height: 60, background: "#1e293b", borderRadius: "0 2px 2px 0" } }),
          /* @__PURE__ */ c(
            "div",
            {
              style: {
                position: "absolute",
                inset: 0,
                borderRadius: 48,
                overflow: "hidden",
                background: "linear-gradient(160deg, #0ea5e9 0%, #0369a1 30%, #1e3a5f 65%, #0f172a 100%)",
                display: "flex",
                flexDirection: "column"
              },
              children: [
                /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px 0", height: 44 }, children: [
                  /* @__PURE__ */ i("span", { style: { color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "system-ui" }, children: _ }),
                  /* @__PURE__ */ i("div", { style: { width: 120, height: 32, background: "#0f172a", borderRadius: 20, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 0, display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ i("div", { style: { width: 10, height: 10, borderRadius: "50%", background: "#1e293b", border: "2px solid #334155" } }) }),
                  /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 5 }, children: [
                    /* @__PURE__ */ i(Ye, { size: 13, color: "#fff" }),
                    /* @__PURE__ */ i(Ze, { size: 13, color: "#fff" }),
                    /* @__PURE__ */ i(Te, { size: 13, color: "#fff" })
                  ] })
                ] }),
                /* @__PURE__ */ c("div", { style: { padding: "12px 24px 8px", display: "flex", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ i("div", { style: { width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }, children: /* @__PURE__ */ i(q, { size: 18, color: "#fff" }) }),
                  /* @__PURE__ */ c("div", { children: [
                    /* @__PURE__ */ i("div", { style: { color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "system-ui", lineHeight: 1.2 }, children: "NexaBank" }),
                    /* @__PURE__ */ i("div", { style: { color: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "system-ui" }, children: "Secure Banking" })
                  ] })
                ] }),
                /* @__PURE__ */ c(
                  "div",
                  {
                    style: {
                      margin: "0 12px 12px",
                      flex: 1,
                      background: "#fff",
                      borderRadius: 28,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column"
                    },
                    children: [
                      d === "form" && /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", height: "100%", padding: "22px 20px 16px" }, children: [
                        /* @__PURE__ */ c("div", { style: { marginBottom: 18 }, children: [
                          /* @__PURE__ */ i("h1", { style: { color: "#0f172a", fontSize: 20, fontWeight: 700, fontFamily: "system-ui", margin: 0, lineHeight: 1.3 }, children: "Security Setup" }),
                          /* @__PURE__ */ i("p", { style: { color: "#64748b", fontSize: 12, fontFamily: "system-ui", margin: "4px 0 0" }, children: "Configure your login preferences" })
                        ] }),
                        /* @__PURE__ */ c("div", { style: { marginBottom: 16 }, children: [
                          /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }, children: [
                            /* @__PURE__ */ i(U, { size: 13, color: "#0369a1" }),
                            /* @__PURE__ */ i("span", { style: { color: "#0f172a", fontSize: 12, fontWeight: 600, fontFamily: "system-ui" }, children: "Password Login" })
                          ] }),
                          /* @__PURE__ */ i(
                            "input",
                            {
                              type: "email",
                              placeholder: "Email address",
                              defaultValue: "alex.morgan@email.com",
                              style: {
                                width: "100%",
                                padding: "10px 14px",
                                borderRadius: 12,
                                border: "1.5px solid #e2e8f0",
                                background: "#f8fafc",
                                color: "#0f172a",
                                fontSize: 13,
                                fontFamily: "system-ui",
                                outline: "none",
                                marginBottom: 8,
                                boxSizing: "border-box"
                              }
                            }
                          ),
                          /* @__PURE__ */ c("div", { style: { position: "relative" }, children: [
                            /* @__PURE__ */ i(
                              "input",
                              {
                                type: n ? "text" : "password",
                                placeholder: "Password",
                                value: e,
                                onChange: (y) => t(y.target.value),
                                style: {
                                  width: "100%",
                                  padding: "10px 40px 10px 14px",
                                  borderRadius: 12,
                                  border: "1.5px solid #e2e8f0",
                                  background: "#f8fafc",
                                  color: "#0f172a",
                                  fontSize: 13,
                                  fontFamily: "system-ui",
                                  outline: "none",
                                  boxSizing: "border-box"
                                }
                              }
                            ),
                            /* @__PURE__ */ i(
                              "button",
                              {
                                onClick: () => r(!n),
                                style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" },
                                children: n ? /* @__PURE__ */ i(De, { size: 16, color: "#94a3b8" }) : /* @__PURE__ */ i(We, { size: 16, color: "#94a3b8" })
                              }
                            )
                          ] }),
                          /* @__PURE__ */ i("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 6 }, children: /* @__PURE__ */ i("button", { style: { background: "none", border: "none", color: "#0369a1", fontSize: 11, fontFamily: "system-ui", cursor: "pointer", padding: 0 }, children: "Forgot password?" }) })
                        ] }),
                        /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }, children: [
                          /* @__PURE__ */ i("div", { style: { flex: 1, height: 1, background: "#e2e8f0" } }),
                          /* @__PURE__ */ i("span", { style: { color: "#94a3b8", fontSize: 11, fontFamily: "system-ui" }, children: "or use biometrics" }),
                          /* @__PURE__ */ i("div", { style: { flex: 1, height: 1, background: "#e2e8f0" } })
                        ] }),
                        /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }, children: [
                          /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 14, border: `1.5px solid ${o ? "#0369a1" : "#e2e8f0"}`, background: o ? "#f0f9ff" : "#fff", transition: "all 0.2s" }, children: [
                            /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                              /* @__PURE__ */ i("div", { style: { width: 36, height: 36, borderRadius: 10, background: o ? "#0369a1" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }, children: /* @__PURE__ */ i(M, { size: 18, color: o ? "#fff" : "#64748b" }) }),
                              /* @__PURE__ */ c("div", { children: [
                                /* @__PURE__ */ i("div", { style: { color: "#0f172a", fontSize: 13, fontWeight: 600, fontFamily: "system-ui" }, children: "Face ID" }),
                                /* @__PURE__ */ i("div", { style: { color: "#94a3b8", fontSize: 11, fontFamily: "system-ui" }, children: "Facial recognition" })
                              ] })
                            ] }),
                            /* @__PURE__ */ i(
                              G,
                              {
                                checked: o,
                                onCheckedChange: k,
                                style: {
                                  width: 44,
                                  height: 24,
                                  borderRadius: 12,
                                  background: o ? "#0369a1" : "#cbd5e1",
                                  border: "none",
                                  cursor: "pointer",
                                  position: "relative",
                                  transition: "background 0.2s",
                                  flexShrink: 0
                                },
                                children: /* @__PURE__ */ i(
                                  H,
                                  {
                                    style: {
                                      display: "block",
                                      width: 18,
                                      height: 18,
                                      borderRadius: "50%",
                                      background: "#fff",
                                      position: "absolute",
                                      top: 3,
                                      left: o ? 23 : 3,
                                      transition: "left 0.2s",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                                    }
                                  }
                                )
                              }
                            )
                          ] }),
                          /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 14, border: `1.5px solid ${a ? "#0369a1" : "#e2e8f0"}`, background: a ? "#f0f9ff" : "#fff", transition: "all 0.2s" }, children: [
                            /* @__PURE__ */ c("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                              /* @__PURE__ */ i("div", { style: { width: 36, height: 36, borderRadius: 10, background: a ? "#0369a1" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }, children: /* @__PURE__ */ i(B, { size: 18, color: a ? "#fff" : "#64748b" }) }),
                              /* @__PURE__ */ c("div", { children: [
                                /* @__PURE__ */ i("div", { style: { color: "#0f172a", fontSize: 13, fontWeight: 600, fontFamily: "system-ui" }, children: "Fingerprint" }),
                                /* @__PURE__ */ i("div", { style: { color: "#94a3b8", fontSize: 11, fontFamily: "system-ui" }, children: "Touch sensor" })
                              ] })
                            ] }),
                            /* @__PURE__ */ i(
                              G,
                              {
                                checked: a,
                                onCheckedChange: w,
                                style: {
                                  width: 44,
                                  height: 24,
                                  borderRadius: 12,
                                  background: a ? "#0369a1" : "#cbd5e1",
                                  border: "none",
                                  cursor: "pointer",
                                  position: "relative",
                                  transition: "background 0.2s",
                                  flexShrink: 0
                                },
                                children: /* @__PURE__ */ i(
                                  H,
                                  {
                                    style: {
                                      display: "block",
                                      width: 18,
                                      height: 18,
                                      borderRadius: "50%",
                                      background: "#fff",
                                      position: "absolute",
                                      top: 3,
                                      left: a ? 23 : 3,
                                      transition: "left 0.2s",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                                    }
                                  }
                                )
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }, children: [
                          (o || a) && /* @__PURE__ */ c(
                            "button",
                            {
                              onClick: () => v(o ? "faceid" : "fingerprint"),
                              style: {
                                width: "100%",
                                padding: "13px",
                                borderRadius: 14,
                                border: "none",
                                background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                                color: "#fff",
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "system-ui",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                boxShadow: "0 4px 14px rgba(3,105,161,0.4)"
                              },
                              children: [
                                o ? /* @__PURE__ */ i(M, { size: 16 }) : /* @__PURE__ */ i(B, { size: 16 }),
                                o ? "Log in with Face ID" : "Log in with Fingerprint"
                              ]
                            }
                          ),
                          /* @__PURE__ */ c(
                            "button",
                            {
                              onClick: x,
                              style: {
                                width: "100%",
                                padding: "13px",
                                borderRadius: 14,
                                border: "none",
                                background: o || a ? "#f1f5f9" : "linear-gradient(135deg, #0ea5e9, #0369a1)",
                                color: o || a ? "#475569" : "#fff",
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "system-ui",
                                cursor: e.length >= 4 ? "pointer" : "not-allowed",
                                opacity: e.length >= 4 ? 1 : 0.6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                                boxShadow: o || a ? "none" : "0 4px 14px rgba(3,105,161,0.4)"
                              },
                              children: [
                                /* @__PURE__ */ i(U, { size: 15 }),
                                "Sign In with Password"
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ i("div", { style: { textAlign: "center", marginTop: 12 }, children: /* @__PURE__ */ i("span", { style: { color: "#94a3b8", fontSize: 10, fontFamily: "system-ui" }, children: "Protected by 256-bit encryption" }) })
                      ] }),
                      d === "biometric-setup" && /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px 24px" }, children: [
                        /* @__PURE__ */ i(
                          "div",
                          {
                            style: {
                              width: 96,
                              height: 96,
                              borderRadius: "50%",
                              background: u ? "linear-gradient(135deg, #0ea5e9, #0369a1)" : "#f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 20,
                              boxShadow: u ? "0 0 0 16px rgba(3,105,161,0.12), 0 0 0 32px rgba(3,105,161,0.06)" : "none",
                              transition: "all 0.4s",
                              animation: u ? "pulse 1.5s ease-in-out infinite" : "none"
                            },
                            children: p === "faceid" ? /* @__PURE__ */ i(M, { size: 44, color: u ? "#fff" : "#64748b" }) : /* @__PURE__ */ i(B, { size: 44, color: u ? "#fff" : "#64748b" })
                          }
                        ),
                        /* @__PURE__ */ i("h2", { style: { color: "#0f172a", fontSize: 18, fontWeight: 700, fontFamily: "system-ui", margin: "0 0 6px", textAlign: "center" }, children: p === "faceid" ? "Face ID Scan" : "Fingerprint Scan" }),
                        /* @__PURE__ */ i("p", { style: { color: "#64748b", fontSize: 13, fontFamily: "system-ui", textAlign: "center", margin: "0 0 24px", lineHeight: 1.5 }, children: u ? p === "faceid" ? "Hold still while we scan your face..." : "Keep your finger on the sensor..." : p === "faceid" ? "Position your face in the frame" : "Place your finger on the sensor" }),
                        !u && /* @__PURE__ */ i(
                          "button",
                          {
                            onClick: () => m(!0),
                            style: {
                              padding: "12px 32px",
                              borderRadius: 14,
                              border: "none",
                              background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                              color: "#fff",
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: "system-ui",
                              cursor: "pointer",
                              boxShadow: "0 4px 14px rgba(3,105,161,0.4)"
                            },
                            children: "Start Scan"
                          }
                        ),
                        u && /* @__PURE__ */ i("div", { style: { display: "flex", gap: 6 }, children: [0, 1, 2].map((y) => /* @__PURE__ */ i(
                          "div",
                          {
                            style: {
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "#0369a1",
                              animation: `bounce 0.8s ease-in-out ${y * 0.15}s infinite`
                            }
                          },
                          y
                        )) }),
                        /* @__PURE__ */ i(
                          "button",
                          {
                            onClick: () => f("form"),
                            style: { marginTop: 20, background: "none", border: "none", color: "#94a3b8", fontSize: 12, fontFamily: "system-ui", cursor: "pointer" },
                            children: "Use password instead"
                          }
                        )
                      ] }),
                      d === "success" && /* @__PURE__ */ c("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "24px" }, children: [
                        /* @__PURE__ */ i(
                          "div",
                          {
                            style: {
                              width: 80,
                              height: 80,
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #10b981, #059669)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: 20,
                              boxShadow: "0 0 0 16px rgba(16,185,129,0.12)"
                            },
                            children: /* @__PURE__ */ i(q, { size: 40, color: "#fff" })
                          }
                        ),
                        /* @__PURE__ */ i("h2", { style: { color: "#0f172a", fontSize: 18, fontWeight: 700, fontFamily: "system-ui", margin: "0 0 6px" }, children: "Verified!" }),
                        /* @__PURE__ */ c("p", { style: { color: "#64748b", fontSize: 13, fontFamily: "system-ui", textAlign: "center", margin: "0 0 20px" }, children: [
                          p === "faceid" ? "Face ID" : "Fingerprint",
                          " authentication enabled"
                        ] }),
                        /* @__PURE__ */ c("div", { style: { width: "100%", background: "#f8fafc", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }, children: [
                          /* @__PURE__ */ c("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }, children: [
                            /* @__PURE__ */ i("span", { style: { color: "#64748b", fontSize: 12, fontFamily: "system-ui" }, children: "Password Login" }),
                            /* @__PURE__ */ i("span", { style: { color: "#10b981", fontSize: 12, fontFamily: "system-ui", fontWeight: 600 }, children: "✓ Active" })
                          ] }),
                          /* @__PURE__ */ c("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }, children: [
                            /* @__PURE__ */ i("span", { style: { color: "#64748b", fontSize: 12, fontFamily: "system-ui" }, children: p === "faceid" ? "Face ID" : "Fingerprint" }),
                            /* @__PURE__ */ i("span", { style: { color: "#10b981", fontSize: 12, fontFamily: "system-ui", fontWeight: 600 }, children: "✓ Enabled" })
                          ] }),
                          /* @__PURE__ */ c("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
                            /* @__PURE__ */ i("span", { style: { color: "#64748b", fontSize: 12, fontFamily: "system-ui" }, children: "Encryption" }),
                            /* @__PURE__ */ i("span", { style: { color: "#10b981", fontSize: 12, fontFamily: "system-ui", fontWeight: 600 }, children: "✓ 256-bit" })
                          ] })
                        ] }),
                        /* @__PURE__ */ c(
                          "button",
                          {
                            onClick: () => {
                              f("form"), t(""), h(null);
                            },
                            style: {
                              width: "100%",
                              padding: "13px",
                              borderRadius: 14,
                              border: "none",
                              background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
                              color: "#fff",
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: "system-ui",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 8,
                              boxShadow: "0 4px 14px rgba(3,105,161,0.4)"
                            },
                            children: [
                              "Go to Dashboard",
                              /* @__PURE__ */ i(Oe, { size: 16 })
                            ]
                          }
                        )
                      ] })
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("style", { children: `
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      ` })
  ] });
}
const Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ke
}, Symbol.toStringTag, { value: "Module" }));
export {
  Qe as Code0_8
};
