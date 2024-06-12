const u = window.GeneXusM.ArchitectureCommon;
u.BLEvents;
const Pt = u.GXCommLayer;
u.GXCommCoreServices;
u.ContributionProvider;
u.Bindable;
u.bindContributionProvider;
u.IApplicationContribution;
u.IKBModelPartDescriptor;
const Ct = u.IKBObjectCategoryDescriptor;
u.IKBObjectDerivedDescriptor;
const Et = u.IKBObjectDescriptor, It = u.IKBObjectPartDescriptor;
u.BaseDescriptor;
u.KBModelPartDescriptor;
u.KBObjectCategoryDescriptor;
u.KBObjectDerivedDescriptor;
u.KBObjectDescriptor;
u.KBObjectPartDescriptor;
u.KBObjectReferenceHelper;
u.ObjectModuleHelper;
u.PropertyContextHelper;
u.ConfigHelper;
u.KBObjectInfo;
const Ot = u.KBObject;
u.ModuleAssociation;
u.Namespaces;
u.EntityKey;
u.Folder;
u.KBCategory;
u.KBContext;
u.KBEnvironment;
u.KBModel;
u.KBModelObjects;
u.KBObjectReference;
u.KBObjectReferenceSettings;
u.KBProperties;
u.Module;
u.KBObjectPartCommand;
u.KBObjectPartCompositeCommand;
u.ResolveKeyResult;
u.ResolveResult;
u.BuiltInTypes;
u.Decorators;
u.EntityInfo;
u.EntityReferenceInfo;
u.KBModelPart;
u.KBObjectClasses;
u.KBObjectModifiedFilterOptions;
u.KBObjectFilterProperties;
const At = u.KBObjectPart;
u.KBObjectPartElement;
u.KBObjectProperties;
u.KnowledgeBase;
u.ModifiedOption;
u.DependencyType;
u.DependenciesTypes;
u.IModelable;
u.ObjectTypeFlags;
u.QualifiedName;
u.ReferenceType;
u.StructPartItem;
u.StructPart;
u.RemotePropertiesObject;
u.RemotePropertyTypeEditorRegistry;
u.RemotePropertyManager;
u.RemotePropertyTypeConverter;
u.RemotePropertyDescriptor;
u.AbstractService;
u.OutputService;
u.StorageService;
u.CommonServices;
u.PluginUtils;
const Tt = u.PluginModule;
u.GXPlugin;
u.ServiceNames;
u.ServerBLEvents;
const Dt = "plugin-components-sample";
var wt = Object.defineProperty, Mt = (e, r) => {
  for (var t in r)
    wt(e, t, { get: r[t], enumerable: !0 });
}, Xe = {}, xt = (e) => e != null, nt = (e) => (e = typeof e, e === "object" || e === "function");
function ot(e) {
  var r, t, o;
  return (o = (t = (r = e.head) == null ? void 0 : r.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : t.getAttribute("content")) != null ? o : void 0;
}
var Rt = {};
Mt(Rt, {
  err: () => st,
  map: () => jt,
  ok: () => Me,
  unwrap: () => Nt,
  unwrapErr: () => Bt
});
var Me = (e) => ({
  isOk: !0,
  isErr: !1,
  value: e
}), st = (e) => ({
  isOk: !1,
  isErr: !0,
  value: e
});
function jt(e, r) {
  if (e.isOk) {
    const t = r(e.value);
    return t instanceof Promise ? t.then((o) => Me(o)) : Me(t);
  }
  if (e.isErr) {
    const t = e.value;
    return st(t);
  }
  throw "should never get here";
}
var Nt = (e) => {
  if (e.isOk)
    return e.value;
  throw e.value;
}, Bt = (e) => {
  if (e.isErr)
    return e.value;
  throw e.value;
}, Y = (e, r = "") => () => {
}, Lt = (e, r) => () => {
}, _t = "{visibility:hidden}.hydrated{visibility:inherit}", at = "slot-fb{display:contents}slot-fb[hidden]{display:none}", kt = (e, r, ...t) => {
  let o = null, n = null, i = !1, s = !1;
  const a = [], m = (d) => {
    for (let $ = 0; $ < d.length; $++)
      o = d[$], Array.isArray(o) ? m(o) : o != null && typeof o != "boolean" && ((i = typeof e != "function" && !nt(o)) && (o = String(o)), i && s ? a[a.length - 1].$text$ += o : a.push(i ? xe(null, o) : o), s = i);
  };
  m(t), r && r.key && (n = r.key);
  const f = xe(e, null);
  return f.$attrs$ = r, a.length > 0 && (f.$children$ = a), f.$key$ = n, f;
}, xe = (e, r) => {
  const t = {
    $flags$: 0,
    $tag$: e,
    $text$: r,
    $elm$: null,
    $children$: null
  };
  return t.$attrs$ = null, t.$key$ = null, t;
}, Ut = {}, Gt = (e) => e && e.$tag$ === Ut, Kt = (e, r) => e != null && !nt(e) && r & 1 ? String(e) : e, Ht = (e, r, t) => {
  const o = _.ce(r, t);
  return e.dispatchEvent(o), o;
}, We = /* @__PURE__ */ new WeakMap(), Ft = (e, r, t) => {
  let o = Se.get(e);
  mr && t ? (o = o || new CSSStyleSheet(), typeof o == "string" ? o = r : o.replaceSync(r)) : o = r, Se.set(e, o);
}, Xt = (e, r, t) => {
  var o;
  const n = it(r), i = Se.get(n);
  if (e = e.nodeType === 11 ? e : W, i)
    if (typeof i == "string") {
      e = e.head || e;
      let s = We.get(e), a;
      if (s || We.set(e, s = /* @__PURE__ */ new Set()), !s.has(n)) {
        {
          a = W.createElement("style"), a.innerHTML = i;
          const m = (o = _.$nonce$) != null ? o : ot(W);
          m != null && a.setAttribute("nonce", m), e.insertBefore(a, e.querySelector("link"));
        }
        r.$flags$ & 4 && (a.innerHTML += at), s && s.add(n);
      }
    } else
      e.adoptedStyleSheets.includes(i) || (e.adoptedStyleSheets = [...e.adoptedStyleSheets, i]);
  return n;
}, Wt = (e) => {
  const r = e.$cmpMeta$, t = e.$hostElement$, o = r.$flags$, n = Y("attachStyles", r.$tagName$), i = Xt(
    t.shadowRoot ? t.shadowRoot : t.getRootNode(),
    r
  );
  o & 10 && (t["s-sc"] = i, t.classList.add(i + "-h")), n();
}, it = (e, r) => "sc-" + e.$tagName$, qe = (e, r, t, o, n, i) => {
  t !== o && r.toLowerCase();
}, ct = (e, r, t) => {
  const o = r.$elm$.nodeType === 11 && r.$elm$.host ? r.$elm$.host : r.$elm$, n = e && e.$attrs$ || Xe, i = r.$attrs$ || Xe;
  for (const s of Ve(Object.keys(n)))
    s in i || qe(o, s, n[s], void 0);
  for (const s of Ve(Object.keys(i)))
    qe(o, s, n[s], i[s]);
};
function Ve(e) {
  return e.includes("ref") ? (
    // we need to sort these to ensure that `'ref'` is the last attr
    [...e.filter((r) => r !== "ref"), "ref"]
  ) : (
    // no need to sort, return the original array
    e
  );
}
var ve, _e, ye = (e, r, t, o) => {
  const n = r.$children$[t];
  let i = 0, s, a;
  if (n.$text$ !== null)
    s = n.$elm$ = W.createTextNode(n.$text$);
  else if (s = n.$elm$ = W.createElement(
    n.$tag$
  ), ct(null, n), xt(ve) && s["s-si"] !== ve && s.classList.add(s["s-si"] = ve), n.$children$)
    for (i = 0; i < n.$children$.length; ++i)
      a = ye(e, n, i), a && s.appendChild(a);
  return s["s-hn"] = _e, s;
}, lt = (e, r, t, o, n, i) => {
  let s = e, a;
  for (s.shadowRoot && s.tagName === _e && (s = s.shadowRoot); n <= i; ++n)
    o[n] && (a = ye(null, t, n), a && (o[n].$elm$ = a, s.insertBefore(a, r)));
}, ut = (e, r, t) => {
  for (let o = r; o <= t; ++o) {
    const n = e[o];
    if (n) {
      const i = n.$elm$;
      i && i.remove();
    }
  }
}, qt = (e, r, t, o, n = !1) => {
  let i = 0, s = 0, a = 0, m = 0, f = r.length - 1, d = r[0], $ = r[f], y = o.length - 1, p = o[0], S = o[y], O, C;
  for (; i <= f && s <= y; )
    if (d == null)
      d = r[++i];
    else if ($ == null)
      $ = r[--f];
    else if (p == null)
      p = o[++s];
    else if (S == null)
      S = o[--y];
    else if (ge(d, p, n))
      ce(d, p, n), d = r[++i], p = o[++s];
    else if (ge($, S, n))
      ce($, S, n), $ = r[--f], S = o[--y];
    else if (ge(d, S, n))
      ce(d, S, n), e.insertBefore(d.$elm$, $.$elm$.nextSibling), d = r[++i], S = o[--y];
    else if (ge($, p, n))
      ce($, p, n), e.insertBefore($.$elm$, d.$elm$), $ = r[--f], p = o[++s];
    else {
      for (a = -1, m = i; m <= f; ++m)
        if (r[m] && r[m].$key$ !== null && r[m].$key$ === p.$key$) {
          a = m;
          break;
        }
      a >= 0 ? (C = r[a], C.$tag$ !== p.$tag$ ? O = ye(r && r[s], t, a) : (ce(C, p, n), r[a] = void 0, O = C.$elm$), p = o[++s]) : (O = ye(r && r[s], t, s), p = o[++s]), O && d.$elm$.parentNode.insertBefore(O, d.$elm$);
    }
  i > f ? lt(
    e,
    o[y + 1] == null ? null : o[y + 1].$elm$,
    t,
    o,
    s,
    y
  ) : s > y && ut(r, i, f);
}, ge = (e, r, t = !1) => e.$tag$ === r.$tag$ ? t ? !0 : e.$key$ === r.$key$ : !1, ce = (e, r, t = !1) => {
  const o = r.$elm$ = e.$elm$, n = e.$children$, i = r.$children$, s = r.$text$;
  s === null ? (ct(e, r), n !== null && i !== null ? qt(o, n, r, i, t) : i !== null ? (e.$text$ !== null && (o.textContent = ""), lt(o, null, r, i, 0, i.length - 1)) : n !== null && ut(n, 0, n.length - 1)) : e.$text$ !== s && (o.data = s);
}, Vt = (e, r, t = !1) => {
  const o = e.$hostElement$, n = e.$vnode$ || xe(null, null), i = Gt(r) ? r : kt(null, null, r);
  if (_e = o.tagName, t && i.$attrs$)
    for (const s of Object.keys(i.$attrs$))
      o.hasAttribute(s) && !["key", "ref", "style", "class"].includes(s) && (i.$attrs$[s] = o[s]);
  i.$tag$ = null, i.$flags$ |= 4, e.$vnode$ = i, i.$elm$ = n.$elm$ = o.shadowRoot || o, ve = o["s-sc"], ce(n, i, t);
}, ft = (e, r) => {
  r && !e.$onRenderResolve$ && r["s-p"] && r["s-p"].push(new Promise((t) => e.$onRenderResolve$ = t));
}, ke = (e, r) => {
  if (e.$flags$ |= 16, e.$flags$ & 4) {
    e.$flags$ |= 512;
    return;
  }
  return ft(e, e.$ancestorComponent$), pr(() => zt(e, r));
}, zt = (e, r) => {
  const t = Y("scheduleUpdate", e.$cmpMeta$.$tagName$), o = e.$lazyInstance$;
  let n;
  return t(), Jt(n, () => Zt(e, o, r));
}, Jt = (e, r) => Yt(e) ? e.then(r) : r(), Yt = (e) => e instanceof Promise || e && e.then && typeof e.then == "function", Zt = async (e, r, t) => {
  var o;
  const n = e.$hostElement$, i = Y("update", e.$cmpMeta$.$tagName$), s = n["s-rc"];
  t && Wt(e);
  const a = Y("render", e.$cmpMeta$.$tagName$);
  Qt(e, r, n, t), s && (s.map((m) => m()), n["s-rc"] = void 0), a(), i();
  {
    const m = (o = n["s-p"]) != null ? o : [], f = () => er(e);
    m.length === 0 ? f() : (Promise.all(m).then(f), e.$flags$ |= 4, m.length = 0);
  }
}, Qt = (e, r, t, o) => {
  try {
    r = r.render(), e.$flags$ &= -17, e.$flags$ |= 2, Vt(e, r, o);
  } catch (n) {
    he(n, e.$hostElement$);
  }
  return null;
}, er = (e) => {
  const r = e.$cmpMeta$.$tagName$, t = e.$hostElement$, o = Y("postUpdate", r), n = e.$ancestorComponent$;
  e.$flags$ & 64 ? o() : (e.$flags$ |= 64, ht(t), o(), e.$onReadyResolve$(t), n || mt()), e.$onRenderResolve$ && (e.$onRenderResolve$(), e.$onRenderResolve$ = void 0), e.$flags$ & 512 && Ke(() => ke(e, !1)), e.$flags$ &= -517;
}, mt = (e) => {
  ht(W.documentElement), Ke(() => Ht(Ge, "appload", { detail: { namespace: Dt } }));
}, ht = (e) => e.classList.add("hydrated"), tr = (e, r) => ue(e).$instanceValues$.get(r), rr = (e, r, t, o) => {
  const n = ue(e), i = n.$instanceValues$.get(r), s = n.$flags$, a = n.$lazyInstance$;
  t = Kt(t, o.$members$[r][0]);
  const m = Number.isNaN(i) && Number.isNaN(t), f = t !== i && !m;
  (!(s & 8) || i === void 0) && f && (n.$instanceValues$.set(r, t), a && (s & 18) === 2 && ke(n, !1));
}, pt = (e, r, t) => {
  var o;
  const n = e.prototype;
  if (r.$members$) {
    const i = Object.entries(r.$members$);
    if (i.map(([s, [a]]) => {
      (a & 31 || t & 2 && a & 32) && Object.defineProperty(n, s, {
        get() {
          return tr(this, s);
        },
        set(m) {
          rr(this, s, m, r);
        },
        configurable: !0,
        enumerable: !0
      });
    }), t & 1) {
      const s = /* @__PURE__ */ new Map();
      n.attributeChangedCallback = function(a, m, f) {
        _.jmp(() => {
          var d;
          const $ = s.get(a);
          if (this.hasOwnProperty($))
            f = this[$], delete this[$];
          else {
            if (n.hasOwnProperty($) && typeof this[$] == "number" && this[$] == f)
              return;
            if ($ == null) {
              const y = ue(this), p = y == null ? void 0 : y.$flags$;
              if (p && !(p & 8) && p & 128 && f !== m) {
                const S = y.$lazyInstance$, O = (d = r.$watchers$) == null ? void 0 : d[a];
                O == null || O.forEach((C) => {
                  S[C] != null && S[C].call(S, f, m, a);
                });
              }
              return;
            }
          }
          this[$] = f === null && typeof this[$] == "boolean" ? !1 : f;
        });
      }, e.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((o = r.$watchers$) != null ? o : {}),
          ...i.filter(
            ([a, m]) => m[0] & 15
            /* HasAttribute */
          ).map(([a, m]) => {
            const f = m[1] || a;
            return s.set(f, a), f;
          })
        ])
      );
    }
  }
  return e;
}, nr = async (e, r, t, o) => {
  let n;
  if (!(r.$flags$ & 32)) {
    if (r.$flags$ |= 32, t.$lazyBundleId$) {
      if (n = ur(t), n.then) {
        const f = Lt();
        n = await n, f();
      }
      n.isProxied || (pt(
        n,
        t,
        2
        /* proxyState */
      ), n.isProxied = !0);
      const m = Y("createInstance", t.$tagName$);
      r.$flags$ |= 8;
      try {
        new n(r);
      } catch (f) {
        he(f);
      }
      r.$flags$ &= -9, m();
    } else
      n = e.constructor, customElements.whenDefined(t.$tagName$).then(
        () => r.$flags$ |= 128
        /* isWatchReady */
      );
    if (n.style) {
      let m = n.style;
      const f = it(t);
      if (!Se.has(f)) {
        const d = Y("registerStyles", t.$tagName$);
        Ft(f, m, !!(t.$flags$ & 1)), d();
      }
    }
  }
  const i = r.$ancestorComponent$, s = () => ke(r, !0);
  i && i["s-rc"] ? i["s-rc"].push(s) : s();
}, or = (e) => {
}, sr = (e) => {
  if (!(_.$flags$ & 1)) {
    const r = ue(e), t = r.$cmpMeta$, o = Y("connectedCallback", t.$tagName$);
    if (r.$flags$ & 1)
      r != null && r.$lazyInstance$ || r != null && r.$onReadyPromise$ && r.$onReadyPromise$.then(() => or());
    else {
      r.$flags$ |= 1;
      {
        let n = e;
        for (; n = n.parentNode || n.host; )
          if (n["s-p"]) {
            ft(r, r.$ancestorComponent$ = n);
            break;
          }
      }
      t.$members$ && Object.entries(t.$members$).map(([n, [i]]) => {
        if (i & 31 && e.hasOwnProperty(n)) {
          const s = e[n];
          delete e[n], e[n] = s;
        }
      }), nr(e, r, t);
    }
    o();
  }
}, ar = (e) => {
}, ir = async (e) => {
  if (!(_.$flags$ & 1)) {
    const r = ue(e);
    r != null && r.$lazyInstance$ || r != null && r.$onReadyPromise$ && r.$onReadyPromise$.then(() => ar());
  }
}, cr = (e, r = {}) => {
  var t;
  const o = Y(), n = [], i = r.exclude || [], s = Ge.customElements, a = W.head, m = /* @__PURE__ */ a.querySelector("meta[charset]"), f = /* @__PURE__ */ W.createElement("style"), d = [];
  let $, y = !0;
  Object.assign(_, r), _.$resourcesUrl$ = new URL(r.resourcesUrl || "./", W.baseURI).href;
  let p = !1;
  if (e.map((S) => {
    S[1].map((O) => {
      const C = {
        $flags$: O[0],
        $tagName$: O[1],
        $members$: O[2],
        $listeners$: O[3]
      };
      C.$flags$ & 4 && (p = !0), C.$members$ = O[2];
      const G = C.$tagName$, b = class extends HTMLElement {
        // StencilLazyHost
        constructor(I) {
          super(I), I = this, lr(I, C), C.$flags$ & 1 && I.attachShadow({ mode: "open" });
        }
        connectedCallback() {
          $ && (clearTimeout($), $ = null), y ? d.push(this) : _.jmp(() => sr(this));
        }
        disconnectedCallback() {
          _.jmp(() => ir(this));
        }
        componentOnReady() {
          return ue(this).$onReadyPromise$;
        }
      };
      C.$lazyBundleId$ = S[0], !i.includes(G) && !s.get(G) && (n.push(G), s.define(
        G,
        pt(
          b,
          C,
          1
          /* isElementConstructor */
        )
      ));
    });
  }), n.length > 0 && (p && (f.textContent += at), f.textContent += n + _t, f.innerHTML.length)) {
    f.setAttribute("data-styles", "");
    const S = (t = _.$nonce$) != null ? t : ot(W);
    S != null && f.setAttribute("nonce", S), a.insertBefore(f, m ? m.nextSibling : a.firstChild);
  }
  y = !1, d.length ? d.map((S) => S.connectedCallback()) : _.jmp(() => $ = setTimeout(mt, 30)), o();
}, Ue = /* @__PURE__ */ new WeakMap(), ue = (e) => Ue.get(e), hn = (e, r) => Ue.set(r.$lazyInstance$ = e, r), lr = (e, r) => {
  const t = {
    $flags$: 0,
    $hostElement$: e,
    $cmpMeta$: r,
    $instanceValues$: /* @__PURE__ */ new Map()
  };
  return t.$onReadyPromise$ = new Promise((o) => t.$onReadyResolve$ = o), e["s-p"] = [], e["s-rc"] = [], Ue.set(e, t);
}, he = (e, r) => (0, console.error)(e, r), Ae = /* @__PURE__ */ new Map(), ur = (e, r, t) => {
  const o = e.$tagName$.replace(/-/g, "_"), n = e.$lazyBundleId$, i = Ae.get(n);
  if (i)
    return i[o];
  {
    const s = (a) => (Ae.set(n, a), a[o]);
    switch (n) {
      case "my-component":
        return import(
          /* webpackMode: "lazy" */
          "./my-component.entry-BX1xQcR-.js"
        ).then(s, he);
    }
  }
  return import(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${n}.entry.js`
  ).then((s) => (Ae.set(n, s), s[o]), he);
}, Se = /* @__PURE__ */ new Map(), Ge = typeof window < "u" ? window : {}, W = Ge.document || { head: {} }, _ = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (e) => e(),
  raf: (e) => requestAnimationFrame(e),
  ael: (e, r, t, o) => e.addEventListener(r, t, o),
  rel: (e, r, t, o) => e.removeEventListener(r, t, o),
  ce: (e, r) => new CustomEvent(e, r)
}, fr = (e) => Promise.resolve(e), mr = /* @__PURE__ */ (() => {
  try {
    return new CSSStyleSheet(), typeof new CSSStyleSheet().replaceSync == "function";
  } catch {
  }
  return !1;
})(), Re = !1, ze = [], dt = [], hr = (e, r) => (t) => {
  e.push(t), Re || (Re = !0, _.$flags$ & 4 ? Ke(je) : _.raf(je));
}, Je = (e) => {
  for (let r = 0; r < e.length; r++)
    try {
      e[r](performance.now());
    } catch (t) {
      he(t);
    }
  e.length = 0;
}, je = () => {
  Je(ze), Je(dt), (Re = ze.length > 0) && _.raf(je);
}, Ke = (e) => fr().then(e), pr = /* @__PURE__ */ hr(dt);
const dr = () => {
}, $r = async (e, r) => {
  if (!(typeof window > "u"))
    return await dr(), cr([["my-component", [[1, "my-component", { first: [1], middle: [1], last: [1] }]]]], r);
};
(function() {
  if (typeof window < "u" && window.Reflect !== void 0 && window.customElements !== void 0) {
    var e = HTMLElement;
    window.HTMLElement = function() {
      return Reflect.construct(e, [], this.constructor);
    }, HTMLElement.prototype = e.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, e);
  }
})();
const P = window.GeneXusM.Common, br = P.ArgumentNullException;
P.CompositeDisposable;
P.CustomSymbolValueArgument;
P.EventBroker;
P.ExceptionManager;
const Te = P.Guid, gr = P.GXException;
P.NotImplementedException;
P.Selection;
P.TraceManager;
P.Time;
P.Duration;
P.DateTime;
P.CycleType;
P.Cycle;
P.MultiMap;
P.BaseMessage;
P.OutputError;
P.OutputMessages;
P.MessageLevel;
P.IDisposable;
P.Disposable;
P.Emitter;
P.ArrayHelper;
P.ColorHelper;
P.KeyHelper;
P.MethodNameNormalizer;
P.StringHelper;
P.TypeHelper;
P.XmlHelper;
P.EnvHelper;
P.KeyCodes;
P.ShortcutHelper;
P.IComparable;
P.IEquatable;
P.Locale;
P.Mode;
P.NamedColors;
const te = window.GeneXusM.CommonCommLayer;
te.IGXCommLayer;
te.GXCommLayerStatus;
te.CreateKBStatus;
te.ServerType;
te.ModuleStatus;
te.ProgressType;
te.UpdateConflict;
const vr = te.GXHttpCommLayer;
var De = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pe = { exports: {} };
/*! https://mths.be/punycode v1.3.2 by @mathias */
Pe.exports;
(function(e, r) {
  (function(t) {
    var o = r && !r.nodeType && r, n = e && !e.nodeType && e, i = typeof De == "object" && De;
    (i.global === i || i.window === i || i.self === i) && (t = i);
    var s, a = 2147483647, m = 36, f = 1, d = 26, $ = 38, y = 700, p = 72, S = 128, O = "-", C = /^xn--/, G = /[^\x20-\x7E]/, b = /[\x2E\u3002\uFF0E\uFF61]/g, I = {
      overflow: "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    }, L = m - f, T = Math.floor, x = String.fromCharCode, Z;
    function j(h) {
      throw RangeError(I[h]);
    }
    function k(h, g) {
      for (var E = h.length, A = []; E--; )
        A[E] = g(h[E]);
      return A;
    }
    function q(h, g) {
      var E = h.split("@"), A = "";
      E.length > 1 && (A = E[0] + "@", h = E[1]), h = h.replace(b, ".");
      var D = h.split("."), B = k(D, g).join(".");
      return A + B;
    }
    function se(h) {
      for (var g = [], E = 0, A = h.length, D, B; E < A; )
        D = h.charCodeAt(E++), D >= 55296 && D <= 56319 && E < A ? (B = h.charCodeAt(E++), (B & 64512) == 56320 ? g.push(((D & 1023) << 10) + (B & 1023) + 65536) : (g.push(D), E--)) : g.push(D);
      return g;
    }
    function $e(h) {
      return k(h, function(g) {
        var E = "";
        return g > 65535 && (g -= 65536, E += x(g >>> 10 & 1023 | 55296), g = 56320 | g & 1023), E += x(g), E;
      }).join("");
    }
    function re(h) {
      return h - 48 < 10 ? h - 22 : h - 65 < 26 ? h - 65 : h - 97 < 26 ? h - 97 : m;
    }
    function ae(h, g) {
      return h + 22 + 75 * (h < 26) - ((g != 0) << 5);
    }
    function ie(h, g, E) {
      var A = 0;
      for (h = E ? T(h / y) : h >> 1, h += T(h / g); h > L * d >> 1; A += m)
        h = T(h / L);
      return T(A + (L + 1) * h / (h + $));
    }
    function ne(h) {
      var g = [], E = h.length, A, D = 0, B = S, R = p, U, H, X, V, N, K, F, Q, oe;
      for (U = h.lastIndexOf(O), U < 0 && (U = 0), H = 0; H < U; ++H)
        h.charCodeAt(H) >= 128 && j("not-basic"), g.push(h.charCodeAt(H));
      for (X = U > 0 ? U + 1 : 0; X < E; ) {
        for (V = D, N = 1, K = m; X >= E && j("invalid-input"), F = re(h.charCodeAt(X++)), (F >= m || F > T((a - D) / N)) && j("overflow"), D += F * N, Q = K <= R ? f : K >= R + d ? d : K - R, !(F < Q); K += m)
          oe = m - Q, N > T(a / oe) && j("overflow"), N *= oe;
        A = g.length + 1, R = ie(D - V, A, V == 0), T(D / A) > a - B && j("overflow"), B += T(D / A), D %= A, g.splice(D++, 0, B);
      }
      return $e(g);
    }
    function be(h) {
      var g, E, A, D, B, R, U, H, X, V, N, K = [], F, Q, oe, Oe;
      for (h = se(h), F = h.length, g = S, E = 0, B = p, R = 0; R < F; ++R)
        N = h[R], N < 128 && K.push(x(N));
      for (A = D = K.length, D && K.push(O); A < F; ) {
        for (U = a, R = 0; R < F; ++R)
          N = h[R], N >= g && N < U && (U = N);
        for (Q = A + 1, U - g > T((a - E) / Q) && j("overflow"), E += (U - g) * Q, g = U, R = 0; R < F; ++R)
          if (N = h[R], N < g && ++E > a && j("overflow"), N == g) {
            for (H = E, X = m; V = X <= B ? f : X >= B + d ? d : X - B, !(H < V); X += m)
              Oe = H - V, oe = m - V, K.push(
                x(ae(V + Oe % oe, 0))
              ), H = T(Oe / oe);
            K.push(x(ae(H, 0))), B = ie(E, Q, A == D), E = 0, ++A;
          }
        ++E, ++g;
      }
      return K.join("");
    }
    function yt(h) {
      return q(h, function(g) {
        return C.test(g) ? ne(g.slice(4).toLowerCase()) : g;
      });
    }
    function St(h) {
      return q(h, function(g) {
        return G.test(g) ? "xn--" + be(g) : g;
      });
    }
    if (s = {
      /**
       * A string representing the current Punycode.js version number.
       * @memberOf punycode
       * @type String
       */
      version: "1.3.2",
      /**
       * An object of methods to convert from JavaScript's internal character
       * representation (UCS-2) to Unicode code points, and back.
       * @see <https://mathiasbynens.be/notes/javascript-encoding>
       * @memberOf punycode
       * @type Object
       */
      ucs2: {
        decode: se,
        encode: $e
      },
      decode: ne,
      encode: be,
      toASCII: St,
      toUnicode: yt
    }, o && n)
      if (e.exports == o)
        n.exports = s;
      else
        for (Z in s)
          s.hasOwnProperty(Z) && (o[Z] = s[Z]);
    else
      t.punycode = s;
  })(De);
})(Pe, Pe.exports);
var yr = Pe.exports, Sr = {
  isString: function(e) {
    return typeof e == "string";
  },
  isObject: function(e) {
    return typeof e == "object" && e !== null;
  },
  isNull: function(e) {
    return e === null;
  },
  isNullOrUndefined: function(e) {
    return e == null;
  }
}, pe = {};
function Pr(e, r) {
  return Object.prototype.hasOwnProperty.call(e, r);
}
var Cr = function(e, r, t, o) {
  r = r || "&", t = t || "=";
  var n = {};
  if (typeof e != "string" || e.length === 0)
    return n;
  var i = /\+/g;
  e = e.split(r);
  var s = 1e3;
  o && typeof o.maxKeys == "number" && (s = o.maxKeys);
  var a = e.length;
  s > 0 && a > s && (a = s);
  for (var m = 0; m < a; ++m) {
    var f = e[m].replace(i, "%20"), d = f.indexOf(t), $, y, p, S;
    d >= 0 ? ($ = f.substr(0, d), y = f.substr(d + 1)) : ($ = f, y = ""), p = decodeURIComponent($), S = decodeURIComponent(y), Pr(n, p) ? Array.isArray(n[p]) ? n[p].push(S) : n[p] = [n[p], S] : n[p] = S;
  }
  return n;
}, fe = function(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "true" : "false";
    case "number":
      return isFinite(e) ? e : "";
    default:
      return "";
  }
}, Er = function(e, r, t, o) {
  return r = r || "&", t = t || "=", e === null && (e = void 0), typeof e == "object" ? Object.keys(e).map(function(n) {
    var i = encodeURIComponent(fe(n)) + t;
    return Array.isArray(e[n]) ? e[n].map(function(s) {
      return i + encodeURIComponent(fe(s));
    }).join(r) : i + encodeURIComponent(fe(e[n]));
  }).join(r) : o ? encodeURIComponent(fe(o)) + t + encodeURIComponent(fe(e)) : "";
};
pe.decode = pe.parse = Cr;
pe.encode = pe.stringify = Er;
var Ir = yr, z = Sr, Ye = jr;
function J() {
  this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null;
}
var Or = /^([a-z0-9.+-]+:)/i, Ar = /:[0-9]*$/, Tr = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, Dr = ["<", ">", '"', "`", " ", "\r", `
`, "	"], wr = ["{", "}", "|", "\\", "^", "`"].concat(Dr), Ne = ["'"].concat(wr), Ze = ["%", "/", "?", ";", "#"].concat(Ne), Qe = ["/", "?", "#"], Mr = 255, et = /^[+a-z0-9A-Z_-]{0,63}$/, xr = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Rr = {
  javascript: !0,
  "javascript:": !0
}, Be = {
  javascript: !0,
  "javascript:": !0
}, le = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
}, Le = pe;
function $t(e, r, t) {
  if (e && z.isObject(e) && e instanceof J)
    return e;
  var o = new J();
  return o.parse(e, r, t), o;
}
J.prototype.parse = function(e, r, t) {
  if (!z.isString(e))
    throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
  var o = e.indexOf("?"), n = o !== -1 && o < e.indexOf("#") ? "?" : "#", i = e.split(n), s = /\\/g;
  i[0] = i[0].replace(s, "/"), e = i.join(n);
  var a = e;
  if (a = a.trim(), !t && e.split("#").length === 1) {
    var m = Tr.exec(a);
    if (m)
      return this.path = a, this.href = a, this.pathname = m[1], m[2] ? (this.search = m[2], r ? this.query = Le.parse(this.search.substr(1)) : this.query = this.search.substr(1)) : r && (this.search = "", this.query = {}), this;
  }
  var f = Or.exec(a);
  if (f) {
    f = f[0];
    var d = f.toLowerCase();
    this.protocol = d, a = a.substr(f.length);
  }
  if (t || f || a.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var $ = a.substr(0, 2) === "//";
    $ && !(f && Be[f]) && (a = a.substr(2), this.slashes = !0);
  }
  if (!Be[f] && ($ || f && !le[f])) {
    for (var y = -1, p = 0; p < Qe.length; p++) {
      var S = a.indexOf(Qe[p]);
      S !== -1 && (y === -1 || S < y) && (y = S);
    }
    var O, C;
    y === -1 ? C = a.lastIndexOf("@") : C = a.lastIndexOf("@", y), C !== -1 && (O = a.slice(0, C), a = a.slice(C + 1), this.auth = decodeURIComponent(O)), y = -1;
    for (var p = 0; p < Ze.length; p++) {
      var S = a.indexOf(Ze[p]);
      S !== -1 && (y === -1 || S < y) && (y = S);
    }
    y === -1 && (y = a.length), this.host = a.slice(0, y), a = a.slice(y), this.parseHost(), this.hostname = this.hostname || "";
    var G = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!G)
      for (var b = this.hostname.split(/\./), p = 0, I = b.length; p < I; p++) {
        var L = b[p];
        if (L && !L.match(et)) {
          for (var T = "", x = 0, Z = L.length; x < Z; x++)
            L.charCodeAt(x) > 127 ? T += "x" : T += L[x];
          if (!T.match(et)) {
            var j = b.slice(0, p), k = b.slice(p + 1), q = L.match(xr);
            q && (j.push(q[1]), k.unshift(q[2])), k.length && (a = "/" + k.join(".") + a), this.hostname = j.join(".");
            break;
          }
        }
      }
    this.hostname.length > Mr ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), G || (this.hostname = Ir.toASCII(this.hostname));
    var se = this.port ? ":" + this.port : "", $e = this.hostname || "";
    this.host = $e + se, this.href += this.host, G && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), a[0] !== "/" && (a = "/" + a));
  }
  if (!Rr[d])
    for (var p = 0, I = Ne.length; p < I; p++) {
      var re = Ne[p];
      if (a.indexOf(re) !== -1) {
        var ae = encodeURIComponent(re);
        ae === re && (ae = escape(re)), a = a.split(re).join(ae);
      }
    }
  var ie = a.indexOf("#");
  ie !== -1 && (this.hash = a.substr(ie), a = a.slice(0, ie));
  var ne = a.indexOf("?");
  if (ne !== -1 ? (this.search = a.substr(ne), this.query = a.substr(ne + 1), r && (this.query = Le.parse(this.query)), a = a.slice(0, ne)) : r && (this.search = "", this.query = {}), a && (this.pathname = a), le[d] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
    var se = this.pathname || "", be = this.search || "";
    this.path = se + be;
  }
  return this.href = this.format(), this;
};
J.prototype.format = function() {
  var e = this.auth || "";
  e && (e = encodeURIComponent(e), e = e.replace(/%3A/i, ":"), e += "@");
  var r = this.protocol || "", t = this.pathname || "", o = this.hash || "", n = !1, i = "";
  this.host ? n = e + this.host : this.hostname && (n = e + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && z.isObject(this.query) && Object.keys(this.query).length && (i = Le.stringify(this.query));
  var s = this.search || i && "?" + i || "";
  return r && r.substr(-1) !== ":" && (r += ":"), this.slashes || (!r || le[r]) && n !== !1 ? (n = "//" + (n || ""), t && t.charAt(0) !== "/" && (t = "/" + t)) : n || (n = ""), o && o.charAt(0) !== "#" && (o = "#" + o), s && s.charAt(0) !== "?" && (s = "?" + s), t = t.replace(/[?#]/g, function(a) {
    return encodeURIComponent(a);
  }), s = s.replace("#", "%23"), r + n + t + s + o;
};
function jr(e, r) {
  return $t(e, !1, !0).resolve(r);
}
J.prototype.resolve = function(e) {
  return this.resolveObject($t(e, !1, !0)).format();
};
J.prototype.resolveObject = function(e) {
  if (z.isString(e)) {
    var r = new J();
    r.parse(e, !1, !0), e = r;
  }
  for (var t = new J(), o = Object.keys(this), n = 0; n < o.length; n++) {
    var i = o[n];
    t[i] = this[i];
  }
  if (t.hash = e.hash, e.href === "")
    return t.href = t.format(), t;
  if (e.slashes && !e.protocol) {
    for (var s = Object.keys(e), a = 0; a < s.length; a++) {
      var m = s[a];
      m !== "protocol" && (t[m] = e[m]);
    }
    return le[t.protocol] && t.hostname && !t.pathname && (t.path = t.pathname = "/"), t.href = t.format(), t;
  }
  if (e.protocol && e.protocol !== t.protocol) {
    if (!le[e.protocol]) {
      for (var f = Object.keys(e), d = 0; d < f.length; d++) {
        var $ = f[d];
        t[$] = e[$];
      }
      return t.href = t.format(), t;
    }
    if (t.protocol = e.protocol, !e.host && !Be[e.protocol]) {
      for (var I = (e.pathname || "").split("/"); I.length && !(e.host = I.shift()); )
        ;
      e.host || (e.host = ""), e.hostname || (e.hostname = ""), I[0] !== "" && I.unshift(""), I.length < 2 && I.unshift(""), t.pathname = I.join("/");
    } else
      t.pathname = e.pathname;
    if (t.search = e.search, t.query = e.query, t.host = e.host || "", t.auth = e.auth, t.hostname = e.hostname || e.host, t.port = e.port, t.pathname || t.search) {
      var y = t.pathname || "", p = t.search || "";
      t.path = y + p;
    }
    return t.slashes = t.slashes || e.slashes, t.href = t.format(), t;
  }
  var S = t.pathname && t.pathname.charAt(0) === "/", O = e.host || e.pathname && e.pathname.charAt(0) === "/", C = O || S || t.host && e.pathname, G = C, b = t.pathname && t.pathname.split("/") || [], I = e.pathname && e.pathname.split("/") || [], L = t.protocol && !le[t.protocol];
  if (L && (t.hostname = "", t.port = null, t.host && (b[0] === "" ? b[0] = t.host : b.unshift(t.host)), t.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && (I[0] === "" ? I[0] = e.host : I.unshift(e.host)), e.host = null), C = C && (I[0] === "" || b[0] === "")), O)
    t.host = e.host || e.host === "" ? e.host : t.host, t.hostname = e.hostname || e.hostname === "" ? e.hostname : t.hostname, t.search = e.search, t.query = e.query, b = I;
  else if (I.length)
    b || (b = []), b.pop(), b = b.concat(I), t.search = e.search, t.query = e.query;
  else if (!z.isNullOrUndefined(e.search)) {
    if (L) {
      t.hostname = t.host = b.shift();
      var T = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
      T && (t.auth = T.shift(), t.host = t.hostname = T.shift());
    }
    return t.search = e.search, t.query = e.query, (!z.isNull(t.pathname) || !z.isNull(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.href = t.format(), t;
  }
  if (!b.length)
    return t.pathname = null, t.search ? t.path = "/" + t.search : t.path = null, t.href = t.format(), t;
  for (var x = b.slice(-1)[0], Z = (t.host || e.host || b.length > 1) && (x === "." || x === "..") || x === "", j = 0, k = b.length; k >= 0; k--)
    x = b[k], x === "." ? b.splice(k, 1) : x === ".." ? (b.splice(k, 1), j++) : j && (b.splice(k, 1), j--);
  if (!C && !G)
    for (; j--; j)
      b.unshift("..");
  C && b[0] !== "" && (!b[0] || b[0].charAt(0) !== "/") && b.unshift(""), Z && b.join("/").substr(-1) !== "/" && b.push("");
  var q = b[0] === "" || b[0] && b[0].charAt(0) === "/";
  if (L) {
    t.hostname = t.host = q ? "" : b.length ? b.shift() : "";
    var T = t.host && t.host.indexOf("@") > 0 ? t.host.split("@") : !1;
    T && (t.auth = T.shift(), t.host = t.hostname = T.shift());
  }
  return C = C || t.host && b.length, C && !q && b.unshift(""), b.length ? t.pathname = b.join("/") : (t.pathname = null, t.path = null), (!z.isNull(t.pathname) || !z.isNull(t.search)) && (t.path = (t.pathname ? t.pathname : "") + (t.search ? t.search : "")), t.auth = e.auth || t.auth, t.slashes = t.slashes || e.slashes, t.href = t.format(), t;
};
J.prototype.parseHost = function() {
  var e = this.host, r = Ar.exec(e);
  r && (r = r[0], r !== ":" && (this.port = r.substr(1)), e = e.substr(0, e.length - r.length)), e && (this.hostname = e);
};
var we = function(e, r, t, o) {
  function n(i) {
    return i instanceof t ? i : new t(function(s) {
      s(i);
    });
  }
  return new (t || (t = Promise))(function(i, s) {
    function a(d) {
      try {
        f(o.next(d));
      } catch ($) {
        s($);
      }
    }
    function m(d) {
      try {
        f(o.throw(d));
      } catch ($) {
        s($);
      }
    }
    function f(d) {
      d.done ? i(d.value) : n(d.value).then(a, m);
    }
    f((o = o.apply(e, r || [])).next());
  });
};
const Nr = "sample.core/";
class Br {
  constructor(r) {
    this._commLayer = r;
  }
  getData(r, t) {
    return we(this, void 0, void 0, function* () {
      let o = this._commLayer.createHttpOptions();
      return (yield this._commLayer.httpGet(this._getOperationUrl(r, `get_data?kb_id=${encodeURIComponent(t)}`), o)).data;
    });
  }
  echo(r, t, o) {
    return we(this, void 0, void 0, function* () {
      let n = this._commLayer.createHttpOptions();
      return (yield this._commLayer.httpPostJson(this._getOperationUrl(r, `echo?kb_id=${encodeURIComponent(t)}&value=${encodeURIComponent(o)}`), void 0, n)).data;
    });
  }
  echo2(r, t) {
    return we(this, void 0, void 0, function* () {
      let o = this._commLayer.createHttpOptions();
      return (yield this._commLayer.httpPostJson(this._getOperationUrl(r, `echo2?value=${encodeURIComponent(t)}`), void 0, o)).data;
    });
  }
  _getOperationUrl(r, t) {
    return Ye(this._getServiceUrl(r), t);
  }
  _getServiceUrl(r) {
    return Ye(r, Nr);
  }
}
class He {
  constructor() {
  }
  static createInstance(r) {
    if (!r)
      throw new br("commLayer");
    if (r instanceof vr) {
      let t = new He();
      return t.sample = new Br(r), t;
    }
    throw new gr(`Unknown communication layer: ${r.name}`);
  }
}
class de {
  static get() {
    return de._instance;
  }
  static setCommLayer(r) {
    de._instance = He.createInstance(r);
  }
}
const l = window.GeneXusM.ArchitectureUiFramework;
l.CommandDelegator;
l.CommandTargetChain;
l.CommandStatus;
l.ICommandTarget;
const Lr = l.AbstractToolWindow;
l.ReportItem;
l.ReportToolWindow;
l.ToolWindowNames;
l.ToolboxAction;
l.ToolboxItem;
l.ISavableNodeData;
l.ModuleFolderEdit;
l.AbstractNode;
l.KBCategoryNode;
l.KBObjectNode;
l.KBObjectsNode;
l.ModelRootNode;
const _r = l.ICommandsContribution;
l.CommonCommands;
const kr = l.IGXDocumentPartEditorDescriptor;
l.MAIN_MENU_BAR;
const Ur = l.IMenuContribution, bt = l.CommonMenus, Gr = l.IToolWindowDescriptor, Kr = l.ToolWindowDockLocation;
l.IModelTreeNodesProvider;
l.IPreferencesNodesProvider;
l.BaseEditor;
l.GXDocument;
l.GXDocumentEditor;
l.GXDocumentPart;
const Hr = l.GXDocumentPartEditor;
l.CollectionStructEditor;
l.CollectionRootItem;
l.StructEditorPlus;
l.StructPartEditor;
l.KBObjectCollectionEditor;
l.NewObjectCell;
l.ObjectItem;
l.TemporaryObjectDescriptor;
l.EditorServicesHelper;
l.KBFilesHelper;
l.SettingsKeys;
l.SettingsValues;
l.RecentKB;
l.RecentKBObject;
l.RecentList;
l.RecentObject;
l.CreateObjectOptions;
l.DefaultModelTreeResolver;
l.ICommandsService;
l.ICreateKBDialogService;
l.IDocumentManagerService;
l.IEnvironmentService;
l.IKBService;
l.IKeybindingService;
l.IMenuService;
l.IModelTreeService;
l.INavigatorService;
l.INewEnvironmentDialogService;
l.INewObjectDialogService;
l.IObjectsService;
l.IOutlinerItemsDescriptor;
l.IOutlinerService;
l.IPropertyService;
l.IRecentKBsService;
l.ISelectObjectDialogService;
l.ISettingsService;
l.IToolWindowsService;
l.ToolboxCategoryDescriptor;
l.IToolboxService;
l.IToolboxItemsDescriptor;
l.ITrackSelectionService;
l.MessageBoxType;
l.SelectObjectDialogCategory;
l.ServiceNames;
const Fr = l.UIServices;
l.KBObjectReferenceRemoteTypeEditor;
l.UIEvents;
class me extends Lr {
  get name() {
    return "gx.plugin_sample.sampleToolWindow";
  }
  get title() {
    return "Sample Tool Window";
  }
  render() {
    return /* @__PURE__ */ me.dom("div", null, /* @__PURE__ */ me.dom("my-component", { first: "Stencil", last: "'Don't call me a framework' JS ttttt" }), /* @__PURE__ */ me.dom("my-component", { first: "Stencil", last: "'Don't call me a framework' JS AAAA" }));
  }
}
function Xr(e) {
  e(Gr).toDynamicValue((r) => ({
    name: "gx.plugin_sample.sampleToolWinoow",
    location: Kr.Main,
    factory: () => new me(),
    visible: !0
  }));
}
var ee;
((e) => {
  ((r) => {
    r.SAMPLE_CATEGORY = new Te("3A69BC19-7A38-404E-B9E8-E96AAB04ADDC");
  })(e.Categories || (e.Categories = {})), ((r) => {
    r.SAMPLE_OBJECT = new Te("2757390B-863D-456E-A3DF-8C451420BC50");
  })(e.ObjectClasses || (e.ObjectClasses = {})), ((r) => {
    r.SAMPLE_SOURCE_PART = new Te("A8C2F988-F848-4AE4-AA4D-59E30D358CED");
  })(e.PartClasses || (e.PartClasses = {}));
})(ee || (ee = {}));
class Wr extends Ot {
  constructor(r) {
    super(r, ee.ObjectClasses.SAMPLE_OBJECT);
  }
}
class qr extends At {
  constructor(r) {
    super(r, ee.PartClasses.SAMPLE_SOURCE_PART);
  }
}
function Vr(e) {
  e(Ct).toConstantValue({
    id: ee.Categories.SAMPLE_CATEGORY,
    iconName: "",
    visible: !0
  }), e(Et).toConstantValue({
    id: ee.ObjectClasses.SAMPLE_OBJECT,
    iconName: "objects/business-process-diagram",
    factory: (r) => new Wr(r)
  }), e(It).toConstantValue({
    id: ee.PartClasses.SAMPLE_SOURCE_PART,
    iconName: "",
    isInterface: !1,
    factory: (r) => new qr(r)
  });
}
class Fe extends Hr {
  render() {
    return /* @__PURE__ */ Fe.dom("div", null, "Sample Source Part Editor...");
  }
}
function zr(e) {
  e(
    kr
  ).toDynamicValue((r) => ({
    type: ee.PartClasses.SAMPLE_SOURCE_PART,
    factory: () => new Fe()
  }));
}
var tt = "inversify:paramtypes", Jr = "design:paramtypes", Yr = "Cannot apply @injectable decorator multiple times.";
function gt() {
  return function(e) {
    if (Reflect.hasOwnMetadata(tt, e))
      throw new Error(Yr);
    var r = Reflect.getMetadata(Jr, e) || [];
    return Reflect.defineMetadata(tt, r, e), e;
  };
}
var Zr = Object.defineProperty, Qr = Object.getOwnPropertyDescriptor, en = (e, r, t, o) => {
  for (var n = o > 1 ? void 0 : o ? Qr(r, t) : r, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (n = (o ? s(r, t, n) : s(n)) || n);
  return o && n && Zr(r, t, n), n;
};
function tn(e) {
  e(Ee).toSelf().inSingletonScope(), e(_r).to(Ee);
}
var Ce;
((e) => {
  e.SAMPLE_CMD = {
    id: "plugin_sample.sample_cmd",
    label: "Plugin Sample Command  6"
  };
})(Ce || (Ce = {}));
let Ee = class {
  registerCommands(e) {
    e.registerCommand(Ce.SAMPLE_CMD, () => (console.log("Sample Command 2"), this.echo(), !0));
  }
  async echo() {
    let e = Fr.kb.currentKB;
    if (e) {
      let r = e.connectionInfo, t = await de.get().sample.getData(r.location, r.id);
      console.log("Data result", t);
    }
  }
};
Ee = en([
  gt()
], Ee);
var rn = Object.defineProperty, nn = Object.getOwnPropertyDescriptor, on = (e, r, t, o) => {
  for (var n = o > 1 ? void 0 : o ? nn(r, t) : r, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (n = (o ? s(r, t, n) : s(n)) || n);
  return o && n && rn(r, t, n), n;
};
function sn(e) {
  e(Ie).toSelf().inSingletonScope(), e(Ur).to(Ie);
}
let Ie = class {
  registerMenus(e) {
    e.registerMenuAction(bt.FILE_SAVE, {
      commandId: Ce.SAMPLE_CMD.id
    });
  }
};
Ie = on([
  gt()
], Ie);
var rt;
((e) => {
  e.PLUGIN_SAMPLE_MENU = [...bt.FILE_SAVE];
})(rt || (rt = {}));
const v = window.GeneXusM.PatternsCommon;
v.PatternCategory;
v.PatternObjectTypes;
v.PatternPartTypes;
v.Commands;
v.Menus;
const an = v.IPatternHelperDescriptor, vt = v.PatternEditorHelper;
v.PatternFragmentEditor;
v.PatternCompositeEditor;
v.PatternInstanceEditorCommand;
v.PatternInstanceEditorCommandManager;
v.PatternPartEditor;
const cn = v.PatternTreeEditor;
v.PatternVirtualPartEditor;
v.PatternVirtualPartItemEditor;
v.PatternBase;
v.PatternInstance;
v.PatternSettings;
v.PatternBasePart;
v.PatternInstancePart;
v.PatternSettingsPart;
v.PatternVirtualPart;
v.PatternVirtualPartItem;
v.CommandFactory;
v.AddElementCommand;
v.InsertElementCommand;
v.MoveElementCommand;
v.PatternCommand;
v.PatternCompositeCommand;
v.RemoveElementCommand;
v.ReparentElementCommand;
v.SetPropertyValueCommand;
v.PatternInstanceElement;
v.PatternChildrenType;
v.PatternDefinition;
v.PatternSpecificationAttribute;
v.PatternSpecificationChildElement;
v.PatternSpecificationRoot;
v.PatternSpecificationType;
v.SpecificationTypeInitialization;
v.Services;
const c = window.GeneXusM.GenexusCommon;
c.Commands;
c.DiagramsEditorCommands;
c.LayoutEditorCommands;
c.ActionGroupsCommands;
c.LanguageObjectCommands;
c.WorkWithDevicesCommands;
c.WorkWithImagesCommands;
c.PreferenceCommands;
c.TransactionStructPartEditorCommands;
c.GAMCommands;
c.TableObjectCommands;
c.Menus;
c.LayoutEditorMenus;
c.ActionGroupsMenus;
c.LanguageObjectMenus;
c.WorkWithImagesMenu;
c.DiagramsEditorMenus;
c.PreferenceMenus;
c.WorkWithDevicesMenus;
c.GAMMenus;
c.TableObjectMenus;
c.GXBLEvents;
c.GAMHelper;
c.DataStoresPart;
c.DataStore;
c.GeneratorsPart;
c.Generator;
c.GXModelPartClasses;
c.API;
c.Attribute;
c.DataProvider;
c.DataSelector;
c.DataStoreCategory;
c.DesignSystem;
c.Domain;
c.ExternalObject;
c.GeneratorCategory;
const ln = c.GXObjectClasses;
c.Image;
c.IndexObject;
c.Language;
c.Procedure;
c.SDPanel;
c.Sdt;
c.Stencil;
c.SubtypeGroup;
c.Table;
c.Transaction;
c.URLRewrite;
c.UserControl;
c.WebPanel;
c.WikiFileKBObject;
c.DesignSystemElementsPart;
c.DesignSystemGxPropertyReference;
c.DesignSystemPart;
c.DesignSystemData;
c.DesignSystemStylesPart;
c.DesignSystemTokensPart;
c.InsertDiagramElementCommand;
c.RemoveDiagramElementCommand;
c.SetGraphicalPropertiesCommand;
c.SetLinkTerminalCommand;
c.DiagramElement;
c.DiagramElementSlot;
c.DiagramPart;
c.ExternalObjectStructItemTypes;
c.ExoProperties;
c.ExternalObjectStructurePart;
c.GXCategoryClasses;
c.GXPartClasses;
c.ImageItem;
c.ImageProperties;
c.LanguageStructurePart;
c.LayoutPart;
c.LocalizableImagePart;
c.ReportLayoutPart;
c.SDLayoutPart;
c.SDPanelSourcePart;
c.StencilLayoutPart;
c.TableIndexesIndex;
c.TableIndexesUserIndex;
c.TableIndexesMember;
c.TableIndexesItemTypes;
c.TableIndexesPart;
c.TableStructurePart;
c.TransactionItemPropertyManager;
c.TransactionAttributePropertyManager;
c.TransactionLevelPropertyManager;
c.TransactionItem;
c.TransactionLevel;
c.TransactionAttribute;
c.TransactionItemTypes;
c.TransactionStructurePart;
c.UserControlPropertiesPart;
c.UserControlSourcePart;
c.VariableItemTypes;
c.Variable;
c.VariablesPart;
c.VirtualVariablesPart;
c.WebLayoutPart;
c.WikiBlobPart;
c.GXBasicTypes;
c.GXProperties;
c.GXPropertyValues;
c.GXPropertiesHelper;
c.GXUIValidResolvers;
var w;
((e) => {
  e.TRANSACTION = "transaction", e.LEVEL = "level", e.DESCRIPTION_ATTRIBUTE = "descriptionAttribute", e.SELECTION = "selection", e.MODES = "modes", e.ATTRIBUTES = "attributes", e.ATTRIBUTE = "attribute", e.FILTER_ATTRIBUTE = "filterAttribute", e.ORDERS = "orders", e.ORDER = "order", e.FILTER = "filter", e.CONDITIONS = "conditions", e.CONDITION = "condition", e.VIEW = "view", e.PARAMETERS = "parameters", e.PARAMETER = "parameter", e.FIXED_DATA = "fixedData", e.TABS = "tabs", e.TAB = "tab", e.ACTIONS = "actions", e.ACTION = "action";
})(w || (w = {}));
var M;
((e) => {
  e.CONFIG = "Config", e.TEMPLATE = "Template", e.OBJECTS = "Objects", e.THEME = "Theme", e.LABELS = "Labels", e.GRID = "Grid", e.MASTER_PAGES = "MasterPages", e.TRANSACTION = "transaction", e.STANDARD_ACTIONS = "StandardActions", e.INSERT = "Insert", e.UPDATE = "Update", e.DELETE = "Delete", e.DISPLAY = "Display", e.EXPORT = "Export", e.SEARCH = "Search", e.CONTEXT = "Context", e.SECURITY = "Security", e.PARAMETERS = "Parameters";
})(M || (M = {}));
class un extends vt {
  get replaceBaseEditor() {
    return !1;
  }
  get baseEditorCaption() {
    return "Advanced";
  }
  createEditors(r, t) {
    return [
      new cn({
        rootElement: t.rootElement,
        site: r,
        hasCommandManager: !0
      })
    ];
  }
  customShowElement(r, t) {
    switch (t.caption += "_2", r.name) {
      case w.ACTION:
      case w.ACTIONS:
        t.iconName = "objects-parts/events";
        break;
      case w.ATTRIBUTE:
        t.iconName = "objects/attribute";
        break;
      case w.ATTRIBUTES:
        t.iconName = "patterns/attributes";
        break;
      case w.CONDITION:
        t.iconName = "objects-parts/condition";
        break;
      case w.CONDITIONS:
        t.iconName = "objects-parts/conditions";
        break;
      case w.DESCRIPTION_ATTRIBUTE:
        t.iconName = "editing-structures/attribute-description";
        break;
      case w.FILTER:
        t.iconName = "patterns/filters";
        break;
      case w.FILTER_ATTRIBUTE:
        t.iconName = "objects/attribute";
        break;
      case w.FIXED_DATA:
        t.iconName = "patterns/fixed-data";
        break;
      case w.LEVEL:
        t.iconName = "patterns/structure";
        break;
      case w.MODES:
        t.iconName = "objects-parts/events";
        break;
      case w.ORDER:
      case w.ORDERS:
        t.iconName = "patterns/orders";
        break;
      case w.PARAMETER:
        t.iconName = "patterns/parameter";
        break;
      case w.PARAMETERS:
        t.iconName = "patterns/parameters";
        break;
      case w.TAB:
        t.iconName = "patterns/tab";
        break;
      case w.TABS:
        t.iconName = "patterns/tabs";
        break;
      case w.TRANSACTION:
        t.iconName = "objects/transaction";
        break;
      default:
        return !1;
    }
    return !0;
  }
}
class fn extends vt {
  customShowElement(r, t) {
    switch (r.name) {
      case M.CONFIG:
        t.iconName = "general/customization";
        break;
      case M.CONTEXT:
        t.iconName = "objects-parts/variables";
        break;
      case M.STANDARD_ACTIONS:
      case M.INSERT:
      case M.UPDATE:
      case M.DELETE:
      case M.DISPLAY:
      case M.EXPORT:
      case M.SEARCH:
        t.iconName = "objects-parts/events";
        break;
      case M.GRID:
        t.iconName = "controls/grid";
        break;
      case M.LABELS:
        t.iconName = "controls/text-block";
        break;
      case M.MASTER_PAGES:
        t.iconName = "objects/masterpage";
        break;
      case M.OBJECTS:
        t.iconName = "window-tools/properties";
        break;
      case M.PARAMETERS:
        t.iconName = "patterns/parameters";
        break;
      case M.SECURITY:
        t.iconName = "patterns/fixed-data";
        break;
      case M.TEMPLATE:
        t.iconName = "window-tools/properties";
        break;
      case M.THEME:
        t.iconName = "objects/themes";
        break;
      case M.TRANSACTION:
        t.iconName = "objects/transaction";
        break;
      default:
        return !1;
    }
    return !0;
  }
}
function mn(e) {
  e(an).toConstantValue({
    patternId: ln.WORK_WITH_WEB_PATTERN_ID,
    iconName: "patterns/work-with-web",
    instanceEditorHelper: new un(),
    settingsEditorHelper: new fn()
  });
}
$r();
var pn = new Tt(
  (e) => {
    tn(e), sn(e), Vr(e), Xr(e), zr(e), mn(e);
  },
  () => {
    console.log("Activate plugin "), de.setCommLayer(Pt.get());
  }
);
export {
  kt as h,
  hn as r,
  pn as s
};
