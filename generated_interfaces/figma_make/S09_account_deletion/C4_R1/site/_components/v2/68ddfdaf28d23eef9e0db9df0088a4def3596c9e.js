const be = () => Promise.resolve().then(() => pe), L = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: ye, jsx: e, jsxs: t } = L;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
globalThis.__GLOBALS__.React.Children;
globalThis.__GLOBALS__.React.cloneElement;
({
  ...globalThis.__GLOBALS__.React
});
const { Component: ve, createContext: fe, createElement: w, createFactory: we, createRef: Ne, forwardRef: C, Fragment: _e, isValidElement: ke, lazy: Ce, memo: Me, Profiler: ze, PureComponent: Se, startTransition: Le, StrictMode: Ae, Suspense: $e, use: Re, useCallback: Pe, useContext: Oe, useDebugValue: Te, useDeferredValue: Ee, useEffect: De, useId: je, useImperativeHandle: Be, useInsertionEffect: He, useLayoutEffect: Ve, useMemo: Ge, useReducer: Ue, useRef: qe, useState: m, useSyncExternalStore: Ie, useTransition: Fe, version: Ze, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Je } = globalThis.__GLOBALS__.React;
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const A = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), $ = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, i, o) => o ? o.toUpperCase() : i.toLowerCase()
), N = (a) => {
  const s = $(a);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, M = (...a) => a.filter((s, i, o) => !!s && s.trim() !== "" && o.indexOf(s) === i).join(" ").trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var R = {
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
const P = C(
  ({
    color: a = "currentColor",
    size: s = 24,
    strokeWidth: i = 2,
    absoluteStrokeWidth: o,
    className: h = "",
    children: r,
    iconNode: b,
    ...y
  }, p) => w(
    "svg",
    {
      ref: p,
      ...R,
      width: s,
      height: s,
      stroke: a,
      strokeWidth: o ? Number(i) * 24 / Number(s) : i,
      className: M("lucide", h),
      ...y
    },
    [
      ...b.map(([v, x]) => w(v, x)),
      ...Array.isArray(r) ? r : [r]
    ]
  )
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l = (a, s) => {
  const i = C(
    ({ className: o, ...h }, r) => w(P, {
      ref: r,
      iconNode: s,
      className: M(
        `lucide-${A(N(a))}`,
        `lucide-${a}`,
        o
      ),
      ...h
    })
  );
  return i.displayName = N(a), i;
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const O = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], T = l("bell", O);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const E = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], D = l("chevron-down", E);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const j = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], z = l("chevron-right", j);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const B = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], H = l("circle-help", B);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const V = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], G = l("credit-card", V);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const U = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], f = l("file-text", U);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const q = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
], I = l("gift", q);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const F = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], Z = l("globe", F);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
], W = l("heart", J);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K = [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
], Q = l("log-out", K);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const X = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], Y = l("map-pin", X);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ee = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
], te = l("moon", ee);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
], _ = l("package", ae);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const se = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], le = l("settings", se);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ne = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], ie = l("shield", ne);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oe = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
], k = l("star", oe);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], ce = l("user", re);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const de = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
], he = l("zap", de);
function g({ checked: a, onChange: s }) {
  return /* @__PURE__ */ e(
    "button",
    {
      onClick: s,
      className: `relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none ${a ? "bg-violet-600" : "bg-gray-300"}`,
      children: /* @__PURE__ */ e(
        "span",
        {
          className: `inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${a ? "translate-x-5" : "translate-x-1"}`
        }
      )
    }
  );
}
function n({ icon: a, label: s, sub: i, right: o, onClick: h, danger: r }) {
  return /* @__PURE__ */ t(
    "button",
    {
      onClick: h,
      className: `w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left ${r ? "text-red-500" : ""}`,
      children: [
        /* @__PURE__ */ e("span", { className: `shrink-0 ${r ? "text-red-400" : "text-gray-500"}`, children: a }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ e("p", { className: `text-sm ${r ? "text-red-500" : "text-gray-800"}`, children: s }),
          i && /* @__PURE__ */ e("p", { className: "text-xs text-gray-400 truncate", children: i })
        ] }),
        o !== void 0 ? /* @__PURE__ */ e("span", { className: "shrink-0", children: o }) : /* @__PURE__ */ e(z, { size: 15, className: "text-gray-400 shrink-0" })
      ]
    }
  );
}
function u({ label: a }) {
  return /* @__PURE__ */ e("p", { className: "px-4 pt-3 pb-1 text-xs text-gray-400 uppercase tracking-widest", children: a });
}
function d() {
  return /* @__PURE__ */ e("div", { className: "h-px bg-gray-100 mx-4" });
}
function me() {
  const [a, s] = m(!0), [i, o] = m(!0), [h, r] = m(!1), [b, y] = m(!1), [p, v] = m(!1), x = 2840;
  return /* @__PURE__ */ t("div", { className: "flex flex-col h-full bg-gray-50 overflow-hidden", children: [
    /* @__PURE__ */ t("div", { className: "bg-violet-700 px-4 pt-2 pb-1 flex justify-between items-center shrink-0", children: [
      /* @__PURE__ */ e("span", { className: "text-white text-xs", children: "9:41" }),
      /* @__PURE__ */ t("div", { className: "flex gap-1.5 items-center", children: [
        /* @__PURE__ */ e("div", { className: "flex gap-0.5", children: [3, 4, 5, 4].map((c, S) => /* @__PURE__ */ e("div", { className: "bg-white rounded-sm w-0.5", style: { height: c * 2 + "px" } }, S)) }),
        /* @__PURE__ */ t("svg", { width: "14", height: "10", viewBox: "0 0 14 10", fill: "none", children: [
          /* @__PURE__ */ e("path", { d: "M7 2C8.93 2 10.68 2.76 11.97 4H14C12.49 2.02 10.4 0.6 7 0.6S1.51 2.02 0 4h2.03C3.32 2.76 5.07 2 7 2Z", fill: "white" }),
          /* @__PURE__ */ e("path", { d: "M7 5C8.27 5 9.42 5.51 10.25 6.33L12.1 4.48A7.94 7.94 0 0 0 7 3C4.42 3 2.11 4.07 0.47 5.79L2.32 7.44C3.4 6.07 5.1 5 7 5Z", fill: "white", opacity: ".7" }),
          /* @__PURE__ */ e("circle", { cx: "7", cy: "9", r: "1.5", fill: "white" })
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5", children: /* @__PURE__ */ e("div", { className: "border border-white rounded-sm w-5 h-3 flex items-center px-0.5", children: /* @__PURE__ */ e("div", { className: "bg-white rounded-xs h-2 w-3.5" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "bg-violet-700 px-4 pb-3 flex items-center gap-3 shrink-0", children: [
      /* @__PURE__ */ e("div", { className: "w-5" }),
      /* @__PURE__ */ e("h1", { className: "flex-1 text-center text-white text-base", children: "Account" }),
      /* @__PURE__ */ e(le, { size: 18, className: "text-white opacity-80" })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 overflow-y-auto overscroll-contain", children: [
      /* @__PURE__ */ t("div", { className: "bg-violet-700 px-4 pb-4 pt-1 shrink-0", children: [
        /* @__PURE__ */ t("div", { className: "bg-white/10 rounded-2xl p-3 flex items-center gap-3", children: [
          /* @__PURE__ */ t("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ e("div", { className: "w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "text-white text-lg", children: "J" }) }),
            /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 bg-amber-400 rounded-full w-4 h-4 flex items-center justify-center", children: /* @__PURE__ */ e(k, { size: 9, className: "text-white fill-white" }) })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ e("p", { className: "text-white text-sm font-medium truncate", children: "Jordan Rivera" }),
            /* @__PURE__ */ e("p", { className: "text-violet-200 text-xs truncate", children: "jordan.r@email.com" }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ e("span", { className: "bg-amber-400 text-amber-900 text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none", children: "GOLD" }),
              /* @__PURE__ */ e("span", { className: "text-violet-200 text-[10px]", children: "Member" })
            ] })
          ] }),
          /* @__PURE__ */ e("button", { className: "text-violet-200 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ e(z, { size: 18 }) })
        ] }),
        /* @__PURE__ */ t("div", { className: "mt-2.5 bg-white/10 rounded-2xl px-3 py-2.5", children: [
          /* @__PURE__ */ t("div", { className: "flex justify-between items-center mb-1.5", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ e(I, { size: 12, className: "text-amber-300" }),
              /* @__PURE__ */ e("span", { className: "text-white text-xs", children: "Reward Points" })
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ e(he, { size: 11, className: "text-amber-300" }),
              /* @__PURE__ */ t("span", { className: "text-amber-300 text-xs font-semibold", children: [
                x.toLocaleString(),
                " pts"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ e("div", { className: "w-full bg-white/20 rounded-full h-1.5", children: /* @__PURE__ */ e(
            "div",
            {
              className: "bg-gradient-to-r from-amber-300 to-orange-400 h-1.5 rounded-full",
              style: { width: "71%" }
            }
          ) }),
          /* @__PURE__ */ t("p", { className: "text-violet-200 text-[10px] mt-1", children: [
            (4e3 - x).toLocaleString(),
            " pts to Platinum · Earn 2× on every order"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white mt-2 rounded-2xl mx-3 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ e(u, { label: "Shopping" }),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(_, { size: 16 }), label: "Orders & Returns", sub: "Track, return, or reorder" }),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(W, { size: 16 }), label: "Wishlist", sub: "14 saved items" }),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(Y, { size: 16 }), label: "Addresses", sub: "2 saved locations" }),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(G, { size: 16 }), label: "Payment Methods", sub: "Visa ···4812" })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white mt-2 rounded-2xl mx-3 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ e(u, { label: "Notifications" }),
        /* @__PURE__ */ e(
          n,
          {
            icon: /* @__PURE__ */ e(T, { size: 16 }),
            label: "Deal Alerts",
            sub: "Flash sales & exclusive offers",
            right: /* @__PURE__ */ e(g, { checked: a, onChange: () => s((c) => !c) })
          }
        ),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(
          n,
          {
            icon: /* @__PURE__ */ e(_, { size: 16 }),
            label: "Order Updates",
            sub: "Shipping & delivery status",
            right: /* @__PURE__ */ e(g, { checked: i, onChange: () => o((c) => !c) })
          }
        ),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(
          n,
          {
            icon: /* @__PURE__ */ e(k, { size: 16 }),
            label: "Email Promotions",
            sub: "Personalised recommendations",
            right: /* @__PURE__ */ e(g, { checked: h, onChange: () => r((c) => !c) })
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white mt-2 rounded-2xl mx-3 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ e(u, { label: "Preferences" }),
        /* @__PURE__ */ e(
          n,
          {
            icon: /* @__PURE__ */ e(te, { size: 16 }),
            label: "Dark Mode",
            right: /* @__PURE__ */ e(g, { checked: b, onChange: () => y((c) => !c) })
          }
        ),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(Z, { size: 16 }), label: "Language & Region", sub: "English (US) · USD" })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white mt-2 rounded-2xl mx-3 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ e(u, { label: "Security" }),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(ie, { size: 16 }), label: "Password & Security", sub: "Last changed 3 months ago" }),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(ce, { size: 16 }), label: "Login Activity", sub: "3 active sessions" })
      ] }),
      /* @__PURE__ */ t("div", { className: "bg-white mt-2 rounded-2xl mx-3 overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ e(u, { label: "Support & Legal" }),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(H, { size: 16 }), label: "Help Center", sub: "FAQs & live chat" }),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(f, { size: 16 }), label: "Privacy Policy" }),
        /* @__PURE__ */ e(d, {}),
        /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(f, { size: 16 }), label: "Terms of Service" })
      ] }),
      /* @__PURE__ */ e("div", { className: "bg-white mt-2 rounded-2xl mx-3 overflow-hidden shadow-sm", children: /* @__PURE__ */ e(
        n,
        {
          icon: /* @__PURE__ */ e(Q, { size: 16 }),
          label: "Sign Out",
          right: /* @__PURE__ */ e("span", {}),
          onClick: () => {
          }
        }
      ) }),
      /* @__PURE__ */ t("div", { className: "mt-2 mb-1 mx-3", children: [
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => v((c) => !c),
            className: "w-full flex items-center justify-center gap-1 py-1.5 text-gray-400 text-xs hover:text-gray-500 transition-colors",
            children: [
              /* @__PURE__ */ e("span", { children: "Manage account data" }),
              /* @__PURE__ */ e(D, { size: 12, className: `transition-transform ${p ? "rotate-180" : ""}` })
            ]
          }
        ),
        p && /* @__PURE__ */ t("div", { className: "bg-white rounded-xl overflow-hidden mt-1 shadow-sm", children: [
          /* @__PURE__ */ e(n, { icon: /* @__PURE__ */ e(f, { size: 15 }), label: "Download My Data", sub: "Request a copy of your data" }),
          /* @__PURE__ */ e(d, {}),
          /* @__PURE__ */ e("button", { className: "w-full text-center py-2.5 text-xs text-gray-400 hover:text-red-400 transition-colors", children: "Close Account" })
        ] })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-center text-gray-300 text-[10px] pb-4 mt-1", children: "v4.2.1 · © 2026 ShopNow Inc." })
    ] })
  ] });
}
function ue() {
  return /* @__PURE__ */ e("div", { className: "min-h-screen bg-slate-200 flex items-center justify-center p-6", children: /* @__PURE__ */ t(
    "div",
    {
      className: "relative bg-gray-900 rounded-[3rem] shadow-2xl",
      style: { width: 375, height: 780 },
      children: [
        /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-[3rem] ring-1 ring-white/10 pointer-events-none" }),
        /* @__PURE__ */ e("div", { className: "absolute -left-[3px] top-24 w-[3px] h-8 bg-gray-700 rounded-l-sm" }),
        /* @__PURE__ */ e("div", { className: "absolute -left-[3px] top-36 w-[3px] h-14 bg-gray-700 rounded-l-sm" }),
        /* @__PURE__ */ e("div", { className: "absolute -left-[3px] top-52 w-[3px] h-14 bg-gray-700 rounded-l-sm" }),
        /* @__PURE__ */ e("div", { className: "absolute -right-[3px] top-36 w-[3px] h-20 bg-gray-700 rounded-r-sm" }),
        /* @__PURE__ */ t("div", { className: "absolute inset-[10px] rounded-[2.4rem] bg-gray-900 overflow-hidden", children: [
          /* @__PURE__ */ e("div", { className: "absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rounded-full z-20 ring-2 ring-gray-800" }),
          /* @__PURE__ */ e("div", { className: "absolute inset-0 rounded-[2.4rem] overflow-hidden bg-gray-50", children: /* @__PURE__ */ e(me, {}) })
        ] }),
        /* @__PURE__ */ e("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" })
      ]
    }
  ) });
}
const pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ue
}, Symbol.toStringTag, { value: "Module" }));
export {
  be as Code0_8
};
