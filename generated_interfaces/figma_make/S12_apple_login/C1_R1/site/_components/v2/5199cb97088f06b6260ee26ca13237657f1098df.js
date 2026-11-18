const L = () => Promise.resolve().then(() => z), w = globalThis.__GLOBALS__.ReactJSXRuntime, { Fragment: R, jsx: e, jsxs: o } = w;
"use" in globalThis.__GLOBALS__.React || (globalThis.__GLOBALS__.React.use = () => {
  throw new Error("`use` is not available in this version of React. Make currently only supports React 18, but `use` is only available in React 19+.");
});
globalThis.__GLOBALS__.React.Children;
globalThis.__GLOBALS__.React.cloneElement;
({
  ...globalThis.__GLOBALS__.React
});
const { Component: B, createContext: A, createElement: T, createFactory: W, createRef: I, forwardRef: M, Fragment: E, isValidElement: F, lazy: j, memo: O, Profiler: P, PureComponent: D, startTransition: G, StrictMode: V, Suspense: H, use: N, useCallback: U, useContext: X, useDebugValue: Y, useDeferredValue: $, useEffect: J, useId: q, useImperativeHandle: K, useInsertionEffect: Q, useLayoutEffect: Z, useMemo: ee, useReducer: te, useRef: oe, useState: i, useSyncExternalStore: ne, useTransition: ie, version: re, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: le } = globalThis.__GLOBALS__.React;
function S() {
  return /* @__PURE__ */ o("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ e("path", { d: "M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z", fill: "#4285F4" }),
    /* @__PURE__ */ e("path", { d: "M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z", fill: "#34A853" }),
    /* @__PURE__ */ e("path", { d: "M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z", fill: "#FBBC05" }),
    /* @__PURE__ */ e("path", { d: "M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z", fill: "#EA4335" })
  ] });
}
function k() {
  return /* @__PURE__ */ e("svg", { width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ e("path", { d: "M18 9a9 9 0 10-10.406 8.892V11.6H5.31V9h2.284V7.018c0-2.255 1.343-3.502 3.4-3.502.984 0 2.014.176 2.014.176v2.213h-1.135c-1.118 0-1.466.694-1.466 1.406V9h2.496l-.399 2.6H10.41v6.292A9.003 9.003 0 0018 9z", fill: "#1877F2" }) });
}
function C({ open: n }) {
  return n ? /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
    /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "3" })
  ] }) : /* @__PURE__ */ o("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ e("path", { d: "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" }),
    /* @__PURE__ */ e("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
  ] });
}
function _() {
  const [n, d] = i("signin"), [c, p] = i(""), [f, b] = i(""), [y, x] = i(""), [l, v] = i(!1), [r, g] = i(!1), [h, a] = i(null), s = (t) => {
    a(t), setTimeout(() => a(null), 2200);
  }, m = (t) => {
    t.preventDefault(), !(!c || !f) && (g(!0), setTimeout(() => {
      g(!1), s(n === "signin" ? "Signed in successfully!" : "Account created!");
    }, 1200));
  }, u = (t) => {
    s(`Continuing with ${t}…`);
  };
  return /* @__PURE__ */ e("div", { className: "size-full flex items-center justify-center bg-[#f0f0f0]", children: /* @__PURE__ */ o(
    "div",
    {
      style: {
        width: 375,
        height: 720,
        borderRadius: 44,
        background: "#fff",
        boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 12px #3a3a3a, 0 24px 64px rgba(0,0,0,0.35)",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              height: 44,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ e("span", { style: { fontSize: 13, fontWeight: 600, color: "#111" }, children: "9:41" }),
              /* @__PURE__ */ o("div", { style: { display: "flex", gap: 5, alignItems: "center" }, children: [
                /* @__PURE__ */ o("svg", { width: "16", height: "11", viewBox: "0 0 16 11", fill: "none", children: [
                  /* @__PURE__ */ e("rect", { x: "0", y: "4", width: "3", height: "7", rx: "1", fill: "#111" }),
                  /* @__PURE__ */ e("rect", { x: "4.5", y: "2.5", width: "3", height: "8.5", rx: "1", fill: "#111" }),
                  /* @__PURE__ */ e("rect", { x: "9", y: "0.5", width: "3", height: "10.5", rx: "1", fill: "#111" }),
                  /* @__PURE__ */ e("rect", { x: "13.5", y: "0", width: "3", height: "11", rx: "1", fill: "#111", opacity: "0.3" })
                ] }),
                /* @__PURE__ */ o("svg", { width: "15", height: "11", viewBox: "0 0 15 11", fill: "none", children: [
                  /* @__PURE__ */ e("path", { d: "M7.5 2.2C9.8 2.2 11.9 3.1 13.4 4.6L14.8 3.2C12.9 1.2 10.3 0 7.5 0S2.1 1.2 0.2 3.2L1.6 4.6C3.1 3.1 5.2 2.2 7.5 2.2z", fill: "#111" }),
                  /* @__PURE__ */ e("path", { d: "M7.5 5.5C9 5.5 10.3 6.1 11.3 7.1L12.7 5.7C11.3 4.3 9.5 3.5 7.5 3.5S3.7 4.3 2.3 5.7L3.7 7.1C4.7 6.1 6 5.5 7.5 5.5z", fill: "#111" }),
                  /* @__PURE__ */ e("circle", { cx: "7.5", cy: "9.5", r: "1.5", fill: "#111" })
                ] }),
                /* @__PURE__ */ o("svg", { width: "25", height: "12", viewBox: "0 0 25 12", fill: "none", children: [
                  /* @__PURE__ */ e("rect", { x: "0.5", y: "0.5", width: "21", height: "11", rx: "3.5", stroke: "#111", strokeOpacity: "0.35" }),
                  /* @__PURE__ */ e("rect", { x: "2", y: "2", width: "17", height: "8", rx: "2", fill: "#111" }),
                  /* @__PURE__ */ e("path", { d: "M23 4v4a2 2 0 000-4z", fill: "#111", fillOpacity: "0.4" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            style: {
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 34,
              background: "#000",
              borderRadius: 20,
              zIndex: 10
            }
          }
        ),
        /* @__PURE__ */ o(
          "div",
          {
            style: {
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              padding: "12px 24px 20px",
              background: "linear-gradient(180deg, #fff 0%, #f8f8fa 100%)",
              overflowX: "hidden"
            },
            children: [
              /* @__PURE__ */ o("div", { style: { textAlign: "center", marginBottom: 20 }, children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    style: {
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #6c47ff 0%, #a678ff 100%)",
                      margin: "0 auto 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: /* @__PURE__ */ o("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", children: [
                      /* @__PURE__ */ e("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
                      /* @__PURE__ */ e("line", { x1: "3", y1: "6", x2: "21", y2: "6", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round" }),
                      /* @__PURE__ */ e("path", { d: "M16 10a4 4 0 01-8 0", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
                    ] })
                  }
                ),
                /* @__PURE__ */ e("p", { style: { fontSize: 18, fontWeight: 700, color: "#111", margin: 0, letterSpacing: -0.3 }, children: "Shopova" }),
                /* @__PURE__ */ e("p", { style: { fontSize: 12, color: "#888", margin: "2px 0 0", fontWeight: 400 }, children: n === "signin" ? "Welcome back" : "Create your account" })
              ] }),
              /* @__PURE__ */ e(
                "div",
                {
                  style: {
                    display: "flex",
                    background: "#f0eff5",
                    borderRadius: 12,
                    padding: 3,
                    marginBottom: 20
                  },
                  children: ["signin", "signup"].map((t) => /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => {
                        d(t), a(null);
                      },
                      style: {
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        transition: "all 0.18s",
                        background: n === t ? "#fff" : "transparent",
                        color: n === t ? "#6c47ff" : "#888",
                        boxShadow: n === t ? "0 1px 4px rgba(0,0,0,0.1)" : "none"
                      },
                      children: t === "signin" ? "Sign In" : "Sign Up"
                    },
                    t
                  ))
                }
              ),
              /* @__PURE__ */ o("form", { onSubmit: m, style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
                n === "signup" && /* @__PURE__ */ o("div", { children: [
                  /* @__PURE__ */ e("label", { style: { fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }, children: "Full Name" }),
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "text",
                      placeholder: "Jane Smith",
                      value: y,
                      onChange: (t) => x(t.target.value),
                      style: {
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: 12,
                        border: "1.5px solid #e8e8ee",
                        fontSize: 14,
                        color: "#111",
                        background: "#fafafa",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.15s"
                      },
                      onFocus: (t) => t.target.style.borderColor = "#6c47ff",
                      onBlur: (t) => t.target.style.borderColor = "#e8e8ee"
                    }
                  )
                ] }),
                /* @__PURE__ */ o("div", { children: [
                  /* @__PURE__ */ e("label", { style: { fontSize: 12, fontWeight: 600, color: "#444", display: "block", marginBottom: 5 }, children: "Email" }),
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "email",
                      placeholder: "you@example.com",
                      value: c,
                      onChange: (t) => p(t.target.value),
                      style: {
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: 12,
                        border: "1.5px solid #e8e8ee",
                        fontSize: 14,
                        color: "#111",
                        background: "#fafafa",
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border-color 0.15s"
                      },
                      onFocus: (t) => t.target.style.borderColor = "#6c47ff",
                      onBlur: (t) => t.target.style.borderColor = "#e8e8ee"
                    }
                  )
                ] }),
                /* @__PURE__ */ o("div", { children: [
                  /* @__PURE__ */ o("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 5 }, children: [
                    /* @__PURE__ */ e("label", { style: { fontSize: 12, fontWeight: 600, color: "#444" }, children: "Password" }),
                    n === "signin" && /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => s("Password reset email sent!"),
                        style: { fontSize: 11, color: "#6c47ff", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600 },
                        children: "Forgot?"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o("div", { style: { position: "relative" }, children: [
                    /* @__PURE__ */ e(
                      "input",
                      {
                        type: l ? "text" : "password",
                        placeholder: "••••••••",
                        value: f,
                        onChange: (t) => b(t.target.value),
                        style: {
                          width: "100%",
                          padding: "11px 40px 11px 14px",
                          borderRadius: 12,
                          border: "1.5px solid #e8e8ee",
                          fontSize: 14,
                          color: "#111",
                          background: "#fafafa",
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.15s"
                        },
                        onFocus: (t) => t.target.style.borderColor = "#6c47ff",
                        onBlur: (t) => t.target.style.borderColor = "#e8e8ee"
                      }
                    ),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => v(!l),
                        style: {
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#aaa",
                          padding: 0,
                          display: "flex",
                          alignItems: "center"
                        },
                        children: /* @__PURE__ */ e(C, { open: l })
                      }
                    )
                  ] })
                ] }),
                n === "signup" && /* @__PURE__ */ o("p", { style: { fontSize: 10, color: "#999", margin: "0", lineHeight: 1.5, fontWeight: 400 }, children: [
                  "By signing up you agree to our",
                  " ",
                  /* @__PURE__ */ e("span", { style: { color: "#6c47ff", cursor: "pointer" }, children: "Terms of Service" }),
                  " & ",
                  /* @__PURE__ */ e("span", { style: { color: "#6c47ff", cursor: "pointer" }, children: "Privacy Policy" }),
                  "."
                ] }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "submit",
                    disabled: r,
                    style: {
                      width: "100%",
                      padding: "13px 0",
                      borderRadius: 14,
                      border: "none",
                      background: r ? "#b39dff" : "linear-gradient(135deg, #6c47ff 0%, #a678ff 100%)",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: r ? "default" : "pointer",
                      marginTop: 2,
                      letterSpacing: 0.1,
                      transition: "opacity 0.15s",
                      boxShadow: "0 4px 14px rgba(108,71,255,0.35)"
                    },
                    children: r ? "Please wait…" : n === "signin" ? "Sign In" : "Create Account"
                  }
                )
              ] }),
              /* @__PURE__ */ o("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }, children: [
                /* @__PURE__ */ e("div", { style: { flex: 1, height: 1, background: "#e8e8ee" } }),
                /* @__PURE__ */ e("span", { style: { fontSize: 11, color: "#bbb", fontWeight: 500 }, children: "or continue with" }),
                /* @__PURE__ */ e("div", { style: { flex: 1, height: 1, background: "#e8e8ee" } })
              ] }),
              /* @__PURE__ */ o("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    onClick: () => u("Google"),
                    style: {
                      width: "100%",
                      padding: "11px 0",
                      borderRadius: 12,
                      border: "1.5px solid #e8e8ee",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#222",
                      transition: "background 0.15s"
                    },
                    onMouseEnter: (t) => t.currentTarget.style.background = "#f7f6ff",
                    onMouseLeave: (t) => t.currentTarget.style.background = "#fff",
                    children: [
                      /* @__PURE__ */ e(S, {}),
                      "Continue with Google"
                    ]
                  }
                ),
                /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    onClick: () => u("Facebook"),
                    style: {
                      width: "100%",
                      padding: "11px 0",
                      borderRadius: 12,
                      border: "none",
                      background: "#1877F2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#fff",
                      transition: "opacity 0.15s"
                    },
                    onMouseEnter: (t) => t.currentTarget.style.opacity = "0.88",
                    onMouseLeave: (t) => t.currentTarget.style.opacity = "1",
                    children: [
                      /* @__PURE__ */ e(k, {}),
                      "Continue with Facebook"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ o("p", { style: { textAlign: "center", marginTop: 16, marginBottom: 0, fontSize: 12, color: "#888", fontWeight: 400 }, children: [
                n === "signin" ? "Don't have an account? " : "Already have an account? ",
                /* @__PURE__ */ e(
                  "span",
                  {
                    onClick: () => d(n === "signin" ? "signup" : "signin"),
                    style: { color: "#6c47ff", fontWeight: 700, cursor: "pointer" },
                    children: n === "signin" ? "Sign Up" : "Sign In"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            style: {
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f8f8fa",
              flexShrink: 0
            },
            children: /* @__PURE__ */ e("div", { style: { width: 120, height: 4, borderRadius: 2, background: "#d0d0d8" } })
          }
        ),
        h && /* @__PURE__ */ e(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 48,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(20,20,30,0.88)",
              color: "#fff",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 100,
              backdropFilter: "blur(8px)"
            },
            children: h
          }
        )
      ]
    }
  ) });
}
const z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as Code0_8
};
