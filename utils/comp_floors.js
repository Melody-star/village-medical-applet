! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define &&
		define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Comp_floors = e()
}(this, function() {
	"use strict";

	function t() {}
	const e = t => t;

	function n(t) {
		return t()
	}

	function o() {
		return Object.create(null)
	}

	function s(t) {
		t.forEach(n)
	}

	function r(t) {
		return "function" == typeof t
	}

	function i(t, e) {
		return t != t ? e == e : t !== e || t && "object" == typeof t || "function" == typeof t
	}
	let c;

	function l(t, e) {
		return c || (c = document.createElement("a")), c.href = e, t === c.href
	}

	function a(t, e, n, o) {
		return t[1] && o ? function(t, e) {
			for (const n in e) t[n] = e[n];
			return t
		}(n.ctx.slice(), t[1](o(e))) : n.ctx
	}

	function u(t) {
		return null == t ? "" : t
	}
	const h = "undefined" != typeof window;
	let d = h ? () => window.performance.now() : () => Date.now(),
		f = h ? t => requestAnimationFrame(t) : t;
	const m = new Set;

	function $(t) {
		m.forEach(e => {
			e.c(t) || (m.delete(e), e.f())
		}), 0 !== m.size && f($)
	}

	function g(t, e) {
		t.appendChild(e)
	}

	function p(t) {
		if (!t) return document;
		const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
		return e && e.host ? e : t.ownerDocument
	}

	function x(t) {
		const e = z("style");
		return function(t, e) {
			g(t.head || t, e)
		}(p(t), e), e.sheet
	}

	function y(t, e, n) {
		t.insertBefore(e, n || null)
	}

	function v(t) {
		t.parentNode.removeChild(t)
	}

	function z(t) {
		return document.createElement(t)
	}

	function k(t) {
		return document.createTextNode(t)
	}

	function I() {
		return k(" ")
	}

	function w(t, e, n, o) {
		return t.addEventListener(e, n, o), () => t.removeEventListener(e, n, o)
	}

	function b(t, e, n) {
		null == n ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n)
	}

	function S(t, e, n, o) {
		null === n ? t.style.removeProperty(e) : t.style.setProperty(e, n, o ? "important" : "")
	}

	function C(t, e, n) {
		t.classList[n ? "add" : "remove"](e)
	}

	function _(t, e, {
		bubbles: n = !1,
		cancelable: o = !1
	} = {}) {
		const s = document.createEvent("CustomEvent");
		return s.initCustomEvent(t, n, o, e), s
	}
	const M = new Map;
	let O, E = 0;

	function H(t, e, n, o, s, r, i, c = 0) {
		const l = 16.666 / o;
		let a = "{\n";
		for (let t = 0; t <= 1; t += l) {
			const o = e + (n - e) * r(t);
			a += 100 * t + `%{${i(o,1-o)}}\n`
		}
		const u = a + `100% {${i(n,1-n)}}\n}`,
			h =
			`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${c}`,
			d = p(t),
			{
				stylesheet: f,
				rules: m
			} = M.get(d) || function(t, e) {
				const n = {
					stylesheet: x(e),
					rules: {}
				};
				return M.set(t, n), n
			}(d, t);
		m[h] || (m[h] = !0, f.insertRule(`@keyframes ${h} ${u}`, f.cssRules.length));
		const $ = t.style.animation || "";
		return t.style.animation = `${$?`${$}, `:""}${h} ${o}ms linear ${s}ms 1 both`, E += 1, h
	}

	function B(t, e) {
		const n = (t.style.animation || "").split(", "),
			o = n.filter(e ? t => t.indexOf(e) < 0 : t => -1 === t.indexOf("__svelte")),
			s = n.length - o.length;
		s && (t.style.animation = o.join(", "), (E -= s) || f(() => {
			E || (M.forEach(t => {
				const {
					stylesheet: e
				} = t;
				let n = e.cssRules.length;
				for (; n--;) e.deleteRule(n);
				t.rules = {}
			}), M.clear())
		}))
	}

	function T(t) {
		O = t
	}

	function P() {
		if (!O) throw new Error("Function called outside component initialization");
		return O
	}

	function F(t) {
		P().$$.on_mount.push(t)
	}

	function j() {
		const t = P();
		return (e, n, {
			cancelable: o = !1
		} = {}) => {
			const s = t.$$.callbacks[e];
			if (s) {
				const r = _(e, n, {
					cancelable: o
				});
				return s.slice().forEach(e => {
					e.call(t, r)
				}), !r.defaultPrevented
			}
			return !0
		}
	}
	const N = [],
		A = [],
		L = [],
		D = [],
		R = Promise.resolve();
	let q = !1;

	function U(t) {
		L.push(t)
	}
	const W = new Set;
	let V, G = 0;

	function J() {
		const t = O;
		do {
			for (; G < N.length;) {
				const t = N[G];
				G++, T(t), K(t.$$)
			}
			for (T(null), N.length = 0, G = 0; A.length;) A.pop()();
			for (let t = 0; t < L.length; t += 1) {
				const e = L[t];
				W.has(e) || (W.add(e), e())
			}
			L.length = 0
		} while (N.length);
		for (; D.length;) D.pop()();
		q = !1, W.clear(), T(t)
	}

	function K(t) {
		if (null !== t.fragment) {
			t.update(), s(t.before_update);
			const e = t.dirty;
			t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(U)
		}
	}

	function Q(t, e, n) {
		t.dispatchEvent(_(`${e?"intro":"outro"}${n}`))
	}
	const X = new Set;
	let Y;

	function Z() {
		Y = {
			r: 0,
			c: [],
			p: Y
		}
	}

	function tt() {
		Y.r || s(Y.c), Y = Y.p
	}

	function et(t, e) {
		t && t.i && (X.delete(t), t.i(e))
	}

	function nt(t, e, n, o) {
		if (t && t.o) {
			if (X.has(t)) return;
			X.add(t), Y.c.push(() => {
				X.delete(t), o && (n && t.d(1), o())
			}), t.o(e)
		} else o && o()
	}
	const ot = {
		duration: 0
	};

	function st(n, o, i, c) {
		let l = o(n, i),
			a = c ? 0 : 1,
			u = null,
			h = null,
			g = null;

		function p() {
			g && B(n, g)
		}

		function x(t, e) {
			const n = t.b - a;
			return e *= Math.abs(n), {
				a: a,
				b: t.b,
				d: n,
				duration: e,
				start: t.start,
				end: t.start + e,
				group: t.group
			}
		}

		function y(o) {
			const {
				delay: r = 0,
				duration: i = 300,
				easing: c = e,
				tick: y = t,
				css: v
			} = l || ot, z = {
				start: d() + r,
				b: o
			};
			o || (z.group = Y, Y.r += 1), u || h ? h = z : (v && (p(), g = H(n, a, o, i, r, c, v)), o && y(0, 1),
				u = x(z, i), U(() => Q(n, o, "start")),
				function(t) {
					let e;
					0 === m.size && f($), new Promise(n => {
						m.add(e = {
							c: t,
							f: n
						})
					})
				}(t => {
					if (h && t > h.start && (u = x(h, i), h = null, Q(n, u.b, "start"), v && (p(), g = H(n,
							a, u.b, u.duration, 0, c, l.css))), u)
						if (t >= u.end) y(a = u.b, 1 - a), Q(n, u.b, "end"), h || (u.b ? p() : --u.group
							.r || s(u.group.c)), u = null;
						else if (t >= u.start) {
						const e = t - u.start;
						a = u.a + u.d * c(e / u.duration), y(a, 1 - a)
					}
					return !(!u && !h)
				}))
		}
		return {
			run(t) {
				r(l) ? (V || (V = Promise.resolve()).then(() => {
					V = null
				}), V).then(() => {
					l = l(), y(t)
				}) : y(t)
			},
			end() {
				p(), u = h = null
			}
		}
	}

	function rt(t) {
		t && t.c()
	}

	function it(t, e, o, i) {
		const {
			fragment: c,
			on_mount: l,
			on_destroy: a,
			after_update: u
		} = t.$$;
		c && c.m(e, o), i || U(() => {
			const e = l.map(n).filter(r);
			a ? a.push(...e) : s(e), t.$$.on_mount = []
		}), u.forEach(U)
	}

	function ct(t, e) {
		const n = t.$$;
		null !== n.fragment && (s(n.on_destroy), n.fragment && n.fragment.d(e), n.on_destroy = n.fragment = null, n
			.ctx = [])
	}

	function lt(t, e) {
		-1 === t.$$.dirty[0] && (N.push(t), q || (q = !0, R.then(J)), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |=
			1 << e % 31
	}

	function at(e, n, r, i, c, l, a, u = [-1]) {
		const h = O;
		T(e);
		const d = e.$$ = {
			fragment: null,
			ctx: null,
			props: l,
			update: t,
			not_equal: c,
			bound: o(),
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(n.context || (h ? h.$$.context : [])),
			callbacks: o(),
			dirty: u,
			skip_bound: !1,
			root: n.target || h.$$.root
		};
		a && a(d.root);
		let f = !1;
		if (d.ctx = r ? r(e, n.props || {}, (t, n, ...o) => {
				const s = o.length ? o[0] : n;
				return d.ctx && c(d.ctx[t], d.ctx[t] = s) && (!d.skip_bound && d.bound[t] && d.bound[t](s), f &&
					lt(e, t)), n
			}) : [], d.update(), f = !0, s(d.before_update), d.fragment = !!i && i(d.ctx), n.target) {
			if (n.hydrate) {
				const t = (m = n.target, Array.from(m.childNodes));
				d.fragment && d.fragment.l(t), t.forEach(v)
			} else d.fragment && d.fragment.c();
			n.intro && et(e.$$.fragment), it(e, n.target, n.anchor, n.customElement), J()
		}
		var m;
		T(h)
	}
	class ut {
		$destroy() {
			ct(this, 1), this.$destroy = t
		}
		$on(t, e) {
			const n = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
			return n.push(e), () => {
				const t = n.indexOf(e); - 1 !== t && n.splice(t, 1)
			}
		}
		$set(t) {
			var e;
			this.$$set && (e = t, 0 !== Object.keys(e).length) && (this.$$.skip_bound = !0, this.$$set(t), this
				.$$.skip_bound = !1)
		}
	}
	class ht {
		constructor() {
			this.callbacks = [], this.alldone = null
		}
		delay(t) {
			var e = new this.constructor;
			return setTimeout(function() {
				e.resolve()
			}, t), e
		}
		then(t) {
			return this.callbacks.push(t), this
		}
		resolve(t) {
			var e = this,
				n = null,
				o = !1;
			setTimeout(() => {
				if (e.callbacks.length) {
					for (var s = 0; s < e.callbacks.length; s++) {
						var r = e.callbacks[s](n || t);
						if (r instanceof e.constructor) {
							for (o = !0, s++; s < e.callbacks.length; s++) r.then(e.callbacks[s]);
							e.alldone && (r.alldone = e.alldone), n = null
						} else n = r
					}
					o || e.alldone && (e.alldone(n || t), e.alldone = null)
				} else e.alldone && e.alldone(n || t)
			}, 0)
		}
	}
	ht.empty = function(t) {
		var e = new ht;
		return setTimeout(function() {
			e.resolve(t)
		}, 0), e
	}, ht.delay = function(t) {
		var e = new ht;
		return setTimeout(function() {
			e.resolve()
		}, t), e
	}, ht.all = function(t) {
		var prom = new ht,
			e = 0,
			n = [];

		function o(o) {
			e++, n.push(o), e === t.length && prom.resolve(n)
		}
		return t.forEach(t => {
			t.alldone = o
		}), prom
	};
	var dt = {
		getUUID: function() {
			for (var t = [], e = 0; e < 256; e++) t[e] = (e < 16 ? "0" : "") + e.toString(16);
			return function() {
				var e = 4294967295 * Math.random() | 0,
					n = 4294967295 * Math.random() | 0,
					o = 4294967295 * Math.random() | 0,
					s = 4294967295 * Math.random() | 0;
				return (t[255 & e] + t[e >> 8 & 255] + t[e >> 16 & 255] + t[e >> 24 & 255] + "-" + t[
							255 & n] + t[n >> 8 & 255] + "-" + t[n >> 16 & 15 | 64] + t[n >> 24 & 255] +
						"-" + t[63 & o | 128] + t[o >> 8 & 255] + "-" + t[o >> 16 & 255] + t[o >> 24 &
							255] + t[255 & s] + t[s >> 8 & 255] + t[s >> 16 & 255] + t[s >> 24 & 255])
					.toUpperCase()
			}
		}(),
		loadScript(t) {
			t = [].concat(t);
			var e = [];
			return t.forEach(n => {
				var prom = new ht,
					o = document.createElement("script");
				o.onload = function() {
					prom.resolve()
				}, o.src = t, document.head.appendChild(o), e.push(prom)
			}), ht.all(e)
		},
		loadCSS(t) {
			var e = document.getElementsByTagName("head")[0],
				n = document.createElement("link");
			n.rel = "stylesheet", n.type = "text/css", n.href = t, setTimeout(() => {
				e.appendChild(n)
			}, 0)
		},
		loadCompCSS(t, e) {
			var n = `${e||"https://www.ooomap.com/sdk/comps"}/${t=t.toLowerCase()}/${t}.css`;
			this.loadCSS(n)
		},
		getRequest() {
			var t = window.decodeURIComponent(location.search),
				e = {};
			if (-1 != t.indexOf("?"))
				for (var n = t.substr(1).split("&"), o = 0; o < n.length; o++) e[n[o].split("=")[0]] = unescape(
					n[o].split("=")[1]);
			return e
		},
		isWeixin: () => "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i),
		getPlatform: () => /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) ? "ios" : /(Android)/i.test(
			navigator.userAgent) ? "android" : "pc",
		gltfAnimControl(t) {
			t.crossFadeTo = om.OMModel.prototype.crossFadeTo.bind(t), t.stopAll = om.OMModel.prototype.stopAll
				.bind(t), t.fadeTo = om.OMModel.prototype.fadeTo.bind(t), t.play = om.OMModel.prototype.play
				.bind(t)
		},
		randomString: function(t) {
			t = t || 5;
			for (var e = ""; e.length < t;) e += Math.random().toString(36).replace(/[^a-z0-9]+/g, "");
			return e.substr(-1 * t)
		},
		getWeatherIcon: function() {
			var t = [{
				word: "晴",
				icon: "./assets/map-icons/qing.png"
			}, {
				word: ["霾", "沙", "尘"],
				icon: "./assets/map-icons/wumai.png"
			}, {
				word: "阴",
				icon: "./assets/map-icons/yintian.png"
			}, {
				word: "雷阵雨",
				icon: "./assets/map-icons/leizhenyu.png"
			}, {
				word: "雨夹雪",
				icon: "./assets/map-icons/yujiaxue.png"
			}, {
				word: "雨",
				icon: "./assets/map-icons/yu.png"
			}, {
				word: "雪",
				icon: "./assets/map-icons/xue.png"
			}, {
				word: "多云",
				icon: "./assets/map-icons/duoyun.png"
			}];

			function e(t, e) {
				e = [].concat(e);
				for (var n = 0; n < e.length; n++)
					if (t.indexOf(e[n]) > -1) return !0;
				return !1
			}
			return function(n) {
				for (var o = 0; o < t.length; o++) {
					var s = t[o];
					if (e(n, s.word)) return s.icon
				}
			}
		}()
	};

	function ft(t) {
		let e, n;
		const o = t[2].default,
			s = function(t, e, n, o) {
				if (t) {
					const s = a(t, e, n, o);
					return t[0](s)
				}
			}(o, t, t[1], null);
		return {
			c() {
				e = z("div"), s && s.c(), b(e, "class", "theContainer svelte-17do8sa"), b(e, "style", t[0])
			},
			m(t, o) {
				y(t, e, o), s && s.m(e, null), n = !0
			},
			p(t, [r]) {
				s && s.p && (!n || 2 & r) && function(t, e, n, o, s, r) {
					if (s) {
						const i = a(e, n, o, r);
						t.p(i, s)
					}
				}(s, o, t, t[1], n ? function(t, e, n, o) {
					if (t[2] && o) {
						const s = t[2](o(n));
						if (void 0 === e.dirty) return s;
						if ("object" == typeof s) {
							const t = [],
								n = Math.max(e.dirty.length, s.length);
							for (let o = 0; o < n; o += 1) t[o] = e.dirty[o] | s[o];
							return t
						}
						return e.dirty | s
					}
					return e.dirty
				}(o, t[1], r, null) : function(t) {
					if (t.ctx.length > 32) {
						const e = [],
							n = t.ctx.length / 32;
						for (let t = 0; t < n; t++) e[t] = -1;
						return e
					}
					return -1
				}(t[1]), null), (!n || 1 & r) && b(e, "style", t[0])
			},
			i(t) {
				n || (et(s, t), n = !0)
			},
			o(t) {
				nt(s, t), n = !1
			},
			d(t) {
				t && v(e), s && s.d(t)
			}
		}
	}

	function mt(t, e, n) {
		let {
			$$slots: o = {},
			$$scope: s
		} = e, {
			style: r = ""
		} = e;
		return t.$$set = (t => {
			"style" in t && n(0, r = t.style), "$$scope" in t && n(1, s = t.$$scope)
		}), [r, s, o]
	}
	class $t extends ut {
		constructor(t) {
			super(), at(this, t, mt, ft, i, {
				style: 0
			})
		}
		get style() {
			return this.$$.ctx[0]
		}
		set style(t) {
			this.$$set({
				style: t
			}), J()
		}
	}

	function gt(t) {
		let e, n, o;
		return {
			c() {
				b(e = z("i"), "class", n = "iconfont " + t[9] + " icon-size svelte-1n9ujv"), b(e, "style", o = t[
					3] ? `font-size: ${t[3]}px` : "")
			},
			m(t, n) {
				y(t, e, n)
			},
			p(t, s) {
				512 & s && n !== (n = "iconfont " + t[9] + " icon-size svelte-1n9ujv") && b(e, "class", n), 8 & s &&
					o !== (o = t[3] ? `font-size: ${t[3]}px` : "") && b(e, "style", o)
			},
			d(t) {
				t && v(e)
			}
		}
	}

	function pt(t) {
		let e, n, o;
		return {
			c() {
				b(e = z("i"), "class", n = "iconfont " + t[10] + " icon-size svelte-1n9ujv"), b(e, "style", o = t[
					4] ? `font-size: ${t[4]}px` : "")
			},
			m(t, n) {
				y(t, e, n)
			},
			p(t, s) {
				1024 & s && n !== (n = "iconfont " + t[10] + " icon-size svelte-1n9ujv") && b(e, "class", n), 16 &
					s && o !== (o = t[4] ? `font-size: ${t[4]}px` : "") && b(e, "style", o)
			},
			d(t) {
				t && v(e)
			}
		}
	}

	function xt(t) {
		let e, n, o;
		return {
			c() {
				l((e = z("img")).src, n = t[12]) || b(e, "src", n), b(e, "alt", ""), b(e, "class",
					"icon-size svelte-1n9ujv"), b(e, "style", o = t[6] ? `width: ${t[6]}px;height: ${t[6]}px;` :
					"")
			},
			m(t, n) {
				y(t, e, n)
			},
			p(t, s) {
				4096 & s && !l(e.src, n = t[12]) && b(e, "src", n), 64 & s && o !== (o = t[6] ?
					`width: ${t[6]}px;height: ${t[6]}px;` : "") && b(e, "style", o)
			},
			d(t) {
				t && v(e)
			}
		}
	}

	function yt(t) {
		let e;

		function n(t, e) {
			return t[11] ? zt : t[9] ? vt : void 0
		}
		let o = n(t),
			s = o && o(t);
		return {
			c() {
				s && s.c(), e = k("")
			},
			m(t, n) {
				s && s.m(t, n), y(t, e, n)
			},
			p(t, r) {
				o === (o = n(t)) && s ? s.p(t, r) : (s && s.d(1), (s = o && o(t)) && (s.c(), s.m(e.parentNode, e)))
			},
			d(t) {
				s && s.d(t), t && v(e)
			}
		}
	}

	function vt(t) {
		let e, n, o;
		return {
			c() {
				b(e = z("i"), "class", n = "iconfont " + t[9] + " icon-size svelte-1n9ujv"), b(e, "style", o = t[
					3] ? `font-size: ${t[3]}px` : "")
			},
			m(t, n) {
				y(t, e, n)
			},
			p(t, s) {
				512 & s && n !== (n = "iconfont " + t[9] + " icon-size svelte-1n9ujv") && b(e, "class", n), 8 & s &&
					o !== (o = t[3] ? `font-size: ${t[3]}px` : "") && b(e, "style", o)
			},
			d(t) {
				t && v(e)
			}
		}
	}

	function zt(t) {
		let e, n, o;
		return {
			c() {
				l((e = z("img")).src, n = t[11]) || b(e, "src", n), b(e, "alt", ""), b(e, "class",
					"icon-size svelte-1n9ujv"), b(e, "style", o = t[5] ? `width: ${t[5]}px;height: ${t[5]}px;` :
					"")
			},
			m(t, n) {
				y(t, e, n)
			},
			p(t, s) {
				2048 & s && !l(e.src, n = t[11]) && b(e, "src", n), 32 & s && o !== (o = t[5] ?
					`width: ${t[5]}px;height: ${t[5]}px;` : "") && b(e, "style", o)
			},
			d(t) {
				t && v(e)
			}
		}
	}

	function kt(t) {
		let e, n, o;

		function s(t, e) {
			return t[0] ? t[12] ? xt : t[10] ? pt : gt : yt
		}
		let r = s(t),
			i = r(t);
		return {
			c() {
				e = z("div"), i.c(), S(e, "color", t[0] ? t[7] : t[8]), S(e, "margin", "auto"), S(e, "width",
					"100%"), S(e, "height", "100%"), S(e, "display", "flex"), S(e, "user-select", "none")
			},
			m(s, r) {
				y(s, e, r), i.m(e, null), n || (o = w(e, "click", t[13]), n = !0)
			},
			p(t, n) {
				r === (r = s(t)) && i ? i.p(t, n) : (i.d(1), (i = r(t)) && (i.c(), i.m(e, null))), 385 & n && S(e,
					"color", t[0] ? t[7] : t[8])
			},
			d(t) {
				t && v(e), i.d(), n = !1, o()
			}
		}
	}

	function It(t) {
		let e, n;
		return e = new $t({
			props: {
				style: "width: " + t[1] + "px; height: " + (t[2] || t[1]) + "px;",
				$$slots: {
					default: [kt]
				},
				$$scope: {
					ctx: t
				}
			}
		}), {
			c() {
				rt(e.$$.fragment)
			},
			m(t, o) {
				it(e, t, o), n = !0
			},
			p(t, [n]) {
				const o = {};
				6 & n && (o.style = "width: " + t[1] + "px; height: " + (t[2] || t[1]) + "px;"), 73721 & n && (o
					.$$scope = {
						dirty: n,
						ctx: t
					}), e.$set(o)
			},
			i(t) {
				n || (et(e.$$.fragment, t), n = !0)
			},
			o(t) {
				nt(e.$$.fragment, t), n = !1
			},
			d(t) {
				ct(e, t)
			}
		}
	}

	function wt(t, e, n) {
		var o = j();
		let {
			size: s = 40
		} = e, {
			height: r = 0
		} = e, {
			normalIconSize: i = 25
		} = e, {
			checkedIconSize: c = 25
		} = e, {
			normalImageSize: l = 25
		} = e, {
			checkedImageSize: a = 25
		} = e, {
			highlightColor: u = "#4495ef"
		} = e, {
			normalColor: h = "#666"
		} = e, {
			checked: d = !1
		} = e, {
			normalIcon: f = ""
		} = e, {
			checkedIcon: m = ""
		} = e, {
			normalImage: $ = ""
		} = e, {
			checkedImage: g = ""
		} = e, {
			tag: p = "button"
		} = e;
		return t.$$set = (t => {
			"size" in t && n(1, s = t.size), "height" in t && n(2, r = t.height), "normalIconSize" in t &&
				n(3, i = t.normalIconSize), "checkedIconSize" in t && n(4, c = t.checkedIconSize),
				"normalImageSize" in t && n(5, l = t.normalImageSize), "checkedImageSize" in t && n(6, a = t
					.checkedImageSize), "highlightColor" in t && n(7, u = t.highlightColor),
				"normalColor" in t && n(8, h = t.normalColor), "checked" in t && n(0, d = t.checked),
				"normalIcon" in t && n(9, f = t.normalIcon), "checkedIcon" in t && n(10, m = t.checkedIcon),
				"normalImage" in t && n(11, $ = t.normalImage), "checkedImage" in t && n(12, g = t
					.checkedImage), "tag" in t && n(14, p = t.tag)
		}), [d, s, r, i, c, l, a, u, h, f, m, $, g, function() {
			n(0, d = !d), o("click", {
				tag: p,
				checked: d
			})
		}, p]
	}
	class bt extends ut {
		constructor(t) {
			super(), at(this, t, wt, It, i, {
				size: 1,
				height: 2,
				normalIconSize: 3,
				checkedIconSize: 4,
				normalImageSize: 5,
				checkedImageSize: 6,
				highlightColor: 7,
				normalColor: 8,
				checked: 0,
				normalIcon: 9,
				checkedIcon: 10,
				normalImage: 11,
				checkedImage: 12,
				tag: 14
			})
		}
		get size() {
			return this.$$.ctx[1]
		}
		set size(t) {
			this.$$set({
				size: t
			}), J()
		}
		get height() {
			return this.$$.ctx[2]
		}
		set height(t) {
			this.$$set({
				height: t
			}), J()
		}
		get normalIconSize() {
			return this.$$.ctx[3]
		}
		set normalIconSize(t) {
			this.$$set({
				normalIconSize: t
			}), J()
		}
		get checkedIconSize() {
			return this.$$.ctx[4]
		}
		set checkedIconSize(t) {
			this.$$set({
				checkedIconSize: t
			}), J()
		}
		get normalImageSize() {
			return this.$$.ctx[5]
		}
		set normalImageSize(t) {
			this.$$set({
				normalImageSize: t
			}), J()
		}
		get checkedImageSize() {
			return this.$$.ctx[6]
		}
		set checkedImageSize(t) {
			this.$$set({
				checkedImageSize: t
			}), J()
		}
		get highlightColor() {
			return this.$$.ctx[7]
		}
		set highlightColor(t) {
			this.$$set({
				highlightColor: t
			}), J()
		}
		get normalColor() {
			return this.$$.ctx[8]
		}
		set normalColor(t) {
			this.$$set({
				normalColor: t
			}), J()
		}
		get checked() {
			return this.$$.ctx[0]
		}
		set checked(t) {
			this.$$set({
				checked: t
			}), J()
		}
		get normalIcon() {
			return this.$$.ctx[9]
		}
		set normalIcon(t) {
			this.$$set({
				normalIcon: t
			}), J()
		}
		get checkedIcon() {
			return this.$$.ctx[10]
		}
		set checkedIcon(t) {
			this.$$set({
				checkedIcon: t
			}), J()
		}
		get normalImage() {
			return this.$$.ctx[11]
		}
		set normalImage(t) {
			this.$$set({
				normalImage: t
			}), J()
		}
		get checkedImage() {
			return this.$$.ctx[12]
		}
		set checkedImage(t) {
			this.$$set({
				checkedImage: t
			}), J()
		}
		get tag() {
			return this.$$.ctx[14]
		}
		set tag(t) {
			this.$$set({
				tag: t
			}), J()
		}
	}

	function St(t, {
		delay: n = 0,
		duration: o = 400,
		easing: s = e
	} = {}) {
		const r = +getComputedStyle(t).opacity;
		return {
			delay: n,
			duration: o,
			easing: s,
			css: t => `opacity: ${t*r}`
		}
	}

	function Ct(t, e, n) {
		const o = t.slice();
		return o[21] = e[n], o[22] = e, o[23] = n, o
	}

	function _t(t) {
		let e, n, o, s, r, i, c, l, a = t[21].floorName + "",
			h = t[23],
			d = t[23] > 0 && function(t) {
				let e;
				return {
					c() {
						S(e = z("div"), "width", "60%"), S(e, "border-top", "1px solid #ddd")
					},
					m(t, n) {
						y(t, e, n)
					},
					d(t) {
						t && v(e)
					}
				}
			}();
		const f = () => t[15](n, h),
			m = () => t[15](null, h);

		function $() {
			return t[16](t[21], t[23])
		}
		return {
			c() {
				d && d.c(), e = I(), n = z("div"), o = z("span"), s = k(a), i = I(), b(o, "class", r = u(t[0] == t[
					23] ? "highlight" : "normalColor") + " svelte-net7p3"), S(o, "margin", "auto"), S(o,
					"font-weight", "600"), S(o, "font-size", t[4] || ".8rem"), S(n, "height", t[2] + "px"), S(n,
					"display", "flex"), S(n, "flex-shrink", "0"), S(n, "width", "100%")
			},
			m(t, r) {
				d && d.m(t, r), y(t, e, r), y(t, n, r), g(n, o), g(o, s), g(n, i), f(), c || (l = w(n, "click", $),
					c = !0)
			},
			p(e, i) {
				var c, l;
				t = e, 2 & i && a !== (a = t[21].floorName + "") && (l = "" + (l = a), (c = s).wholeText !== l && (c
						.data = l)), 1 & i && r !== (r = u(t[0] == t[23] ? "highlight" : "normalColor") +
						" svelte-net7p3") && b(o, "class", r), 16 & i && S(o, "font-size", t[4] || ".8rem"), 4 &
					i && S(n, "height", t[2] + "px"), h !== t[23] && (m(), h = t[23], f())
			},
			d(t) {
				d && d.d(t), t && v(e), t && v(n), m(), c = !1, l()
			}
		}
	}

	function Mt(e) {
		let n, o, s;
		return {
			c() {
				b(n = z("div"), "class", "gradientTop svelte-net7p3")
			},
			m(t, o) {
				y(t, n, o), e[18](n), s = !0
			},
			p: t,
			i(t) {
				s || (U(() => {
					o || (o = st(n, St, {}, !0)), o.run(1)
				}), s = !0)
			},
			o(t) {
				o || (o = st(n, St, {}, !1)), o.run(0), s = !1
			},
			d(t) {
				t && v(n), e[18](null), t && o && o.end()
			}
		}
	}

	function Ot(e) {
		let n, o, s;
		return {
			c() {
				b(n = z("div"), "class", "gradientBottom svelte-net7p3")
			},
			m(t, o) {
				y(t, n, o), e[19](n), s = !0
			},
			p: t,
			i(t) {
				s || (U(() => {
					o || (o = st(n, St, {}, !0)), o.run(1)
				}), s = !0)
			},
			o(t) {
				o || (o = st(n, St, {}, !1)), o.run(0), s = !1
			},
			d(t) {
				t && v(n), e[19](null), t && o && o.end()
			}
		}
	}

	function Et(t) {
		let e, n, o, s, r, i, c, l = t[1],
			a = [];
		for (let e = 0; e < l.length; e += 1) a[e] = _t(Ct(t, l, e));
		let u = t[9] && Mt(t),
			h = t[10] && Ot(t);
		return {
			c() {
				e = z("div"), n = z("div");
				for (let t = 0; t < a.length; t += 1) a[t].c();
				o = I(), u && u.c(), s = I(), h && h.c(), b(n, "id", "floor_container"), S(n, "width", "100%"), S(n,
					"display", "flex"), S(n, "flex-direction", "column"), S(n, "align-items", "center"), S(n,
					"user-select", "none"), S(n, "overflow", "auto"), S(n, "height", "100%"), b(n, "class",
					"svelte-net7p3"), S(e, "width", "100%"), S(e, "position", "relative")
			},
			m(l, d) {
				y(l, e, d), g(e, n);
				for (let t = 0; t < a.length; t += 1) a[t].m(n, null);
				t[17](n), g(e, o), u && u.m(e, null), g(e, s), h && h.m(e, null), r = !0, i || (c = w(n, "scroll",
					t[13]), i = !0)
			},
			p(t, o) {
				if (6167 & o) {
					let e;
					for (l = t[1], e = 0; e < l.length; e += 1) {
						const s = Ct(t, l, e);
						a[e] ? a[e].p(s, o) : (a[e] = _t(s), a[e].c(), a[e].m(n, null))
					}
					for (; e < a.length; e += 1) a[e].d(1);
					a.length = l.length
				}
				t[9] ? u ? (u.p(t, o), 512 & o && et(u, 1)) : ((u = Mt(t)).c(), et(u, 1), u.m(e, s)) : u && (Z(),
					nt(u, 1, 1, () => {
						u = null
					}), tt()), t[10] ? h ? (h.p(t, o), 1024 & o && et(h, 1)) : ((h = Ot(t)).c(), et(h, 1), h.m(
					e, null)) : h && (Z(), nt(h, 1, 1, () => {
					h = null
				}), tt())
			},
			i(t) {
				r || (et(u), et(h), r = !0)
			},
			o(t) {
				nt(u), nt(h), r = !1
			},
			d(n) {
				n && v(e),
					function(t, e) {
						for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e)
					}(a, n), t[17](null), u && u.d(), h && h.d(), i = !1, c()
			}
		}
	}

	function Ht(t) {
		let e, n;
		return e = new $t({
			props: {
				style: "width:" + t[2] + "px;max-height: " + t[3] + "px;" + t[5],
				$$slots: {
					default: [Et]
				},
				$$scope: {
					ctx: t
				}
			}
		}), {
			c() {
				rt(e.$$.fragment)
			},
			m(t, o) {
				it(e, t, o), n = !0
			},
			p(t, [n]) {
				const o = {};
				44 & n && (o.style = "width:" + t[2] + "px;max-height: " + t[3] + "px;" + t[5]), 16781271 & n &&
					(o.$$scope = {
						dirty: n,
						ctx: t
					}), e.$set(o)
			},
			i(t) {
				n || (et(e.$$.fragment, t), n = !0)
			},
			o(t) {
				nt(e.$$.fragment, t), n = !1
			},
			d(t) {
				ct(e, t)
			}
		}
	}

	function Bt(t, e, n) {
		var o = j();
		let {
			list: s = []
		} = e, {
			size: r = 40
		} = e, {
			maxHeight: i = 200
		} = e, {
			currentIndex: c = 0
		} = e, {
			fontSize: l = ".8rem"
		} = e, {
			style: a = ""
		} = e;
		var u, h, d, f, m, $ = [];

		function g(t, e) {
			n(0, c = e), o("click", t)
		}
		F(() => {
			n(8, d.scrollTop = d.scrollHeight, d)
		});
		return t.$$set = (t => {
			"list" in t && n(1, s = t.list), "size" in t && n(2, r = t.size), "maxHeight" in t && n(3, i = t
				.maxHeight), "currentIndex" in t && n(0, c = t.currentIndex), "fontSize" in t && n(4,
				l = t.fontSize), "style" in t && n(5, a = t.style)
		}), [c, s, r, i, l, a, u, h, d, f, m, $, g, function() {
			n(9, f = d.scrollTop > r / 3), n(10, m = d.scrollTop < d.scrollHeight - d.offsetHeight - r / 3)
		}, function(t) {
			n(0, c = s.findIndex(e => e.floorNumber == t));
			var e = $[c];
			e && e.scrollIntoView()
		}, function(t, e) {
			A[t ? "unshift" : "push"](() => {
				$[e] = t, n(11, $)
			})
		}, (t, e) => g(t, e), function(t) {
			A[t ? "unshift" : "push"](() => {
				n(8, d = t)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(6, u = t)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(7, h = t)
			})
		}]
	}
	class Tt extends ut {
		constructor(t) {
			super(), at(this, t, Bt, Ht, i, {
				list: 1,
				size: 2,
				maxHeight: 3,
				currentIndex: 0,
				fontSize: 4,
				style: 5,
				setIndex: 14
			})
		}
		get list() {
			return this.$$.ctx[1]
		}
		set list(t) {
			this.$$set({
				list: t
			}), J()
		}
		get size() {
			return this.$$.ctx[2]
		}
		set size(t) {
			this.$$set({
				size: t
			}), J()
		}
		get maxHeight() {
			return this.$$.ctx[3]
		}
		set maxHeight(t) {
			this.$$set({
				maxHeight: t
			}), J()
		}
		get currentIndex() {
			return this.$$.ctx[0]
		}
		set currentIndex(t) {
			this.$$set({
				currentIndex: t
			}), J()
		}
		get fontSize() {
			return this.$$.ctx[4]
		}
		set fontSize(t) {
			this.$$set({
				fontSize: t
			}), J()
		}
		get style() {
			return this.$$.ctx[5]
		}
		set style(t) {
			this.$$set({
				style: t
			}), J()
		}
		get setIndex() {
			return this.$$.ctx[14]
		}
	}

	function Pt(t) {
		let e, n, o = {
			size: t[1],
			normalIcon: "icon-mendoor13",
			tag: "toOutdoor"
		};
		return e = new bt({
			props: o
		}), t[19](e), e.$on("click", t[13]), {
			c() {
				rt(e.$$.fragment)
			},
			m(t, o) {
				it(e, t, o), n = !0
			},
			p(t, n) {
				const o = {};
				2 & n && (o.size = t[1]), e.$set(o)
			},
			i(t) {
				n || (et(e.$$.fragment, t), n = !0)
			},
			o(t) {
				nt(e.$$.fragment, t), n = !1
			},
			d(n) {
				t[19](null), ct(e, n)
			}
		}
	}

	function Ft(t) {
		let e, n, o = {
			size: t[1],
			normalIcon: "icon-d",
			checkedIcon: "icon-liti",
			tag: "dimension"
		};
		return e = new bt({
			props: o
		}), t[20](e), e.$on("click", t[13]), {
			c() {
				rt(e.$$.fragment)
			},
			m(t, o) {
				it(e, t, o), n = !0
			},
			p(t, n) {
				const o = {};
				2 & n && (o.size = t[1]), e.$set(o)
			},
			i(t) {
				n || (et(e.$$.fragment, t), n = !0)
			},
			o(t) {
				nt(e.$$.fragment, t), n = !1
			},
			d(n) {
				t[20](null), ct(e, n)
			}
		}
	}

	function jt(t) {
		let e, n, o = {
			size: t[1],
			normalImage: t[7] + "layer.png",
			checkedImage: t[7] + "layers.png",
			checkedImageSize: "20",
			tag: "viewFloors"
		};
		return e = new bt({
			props: o
		}), t[21](e), e.$on("click", t[13]), {
			c() {
				rt(e.$$.fragment)
			},
			m(t, o) {
				it(e, t, o), n = !0
			},
			p(t, n) {
				const o = {};
				2 & n && (o.size = t[1]), 128 & n && (o.normalImage = t[7] + "layer.png"), 128 & n && (o
					.checkedImage = t[7] + "layers.png"), e.$set(o)
			},
			i(t) {
				n || (et(e.$$.fragment, t), n = !0)
			},
			o(t) {
				nt(e.$$.fragment, t), n = !1
			},
			d(n) {
				t[21](null), ct(e, n)
			}
		}
	}

	function Nt(t) {
		let e, n, o, s, r, i, c, l = t[4] && Pt(t),
			a = t[5] && Ft(t),
			u = t[6] && jt(t),
			h = {
				size: t[1],
				maxHeight: t[3],
				style: "margin-top: 6px"
			};
		return r = new Tt({
			props: h
		}), t[22](r), r.$on("click", t[14]), {
			c() {
				e = z("div"), l && l.c(), n = I(), a && a.c(), o = I(), u && u.c(), s = I(), rt(r.$$.fragment),
					b(e, "class", "floorWrap svelte-bg3u0k"), b(e, "style", i = "width: " + t[1] + "px; " + t[
						2]), C(e, "hidden", !t[12])
			},
			m(i, h) {
				y(i, e, h), l && l.m(e, null), g(e, n), a && a.m(e, null), g(e, o), u && u.m(e, null), g(e, s),
					it(r, e, null), t[23](e), c = !0
			},
			p(t, [h]) {
				t[4] ? l ? (l.p(t, h), 16 & h && et(l, 1)) : ((l = Pt(t)).c(), et(l, 1), l.m(e, n)) : l && (Z(),
					nt(l, 1, 1, () => {
						l = null
					}), tt()), t[5] ? a ? (a.p(t, h), 32 & h && et(a, 1)) : ((a = Ft(t)).c(), et(a, 1), a.m(
					e, o)) : a && (Z(), nt(a, 1, 1, () => {
					a = null
				}), tt()), t[6] ? u ? (u.p(t, h), 64 & h && et(u, 1)) : ((u = jt(t)).c(), et(u, 1), u.m(e,
					s)) : u && (Z(), nt(u, 1, 1, () => {
					u = null
				}), tt());
				const d = {};
				2 & h && (d.size = t[1]), 8 & h && (d.maxHeight = t[3]), r.$set(d), (!c || 6 & h && i !== (i =
					"width: " + t[1] + "px; " + t[2])) && b(e, "style", i), 4096 & h && C(e, "hidden", !t[
					12])
			},
			i(t) {
				c || (et(l), et(a), et(u), et(r.$$.fragment, t), c = !0)
			},
			o(t) {
				nt(l), nt(a), nt(u), nt(r.$$.fragment, t), c = !1
			},
			d(n) {
				n && v(e), l && l.d(), a && a.d(), u && u.d(), t[22](null), ct(r), t[23](null)
			}
		}
	}

	function At(t, e, n) {
		var o, s, r, i, c, l, a = j(),
			u = "";
		let {
			size: h = 40
		} = e, {
			style: d = ""
		} = e, {
			floorMaxHeight: f = 180
		} = e, {
			hasOutdoor: m = !1
		} = e, {
			has3DButton: $ = !0
		} = e, {
			hasLayerButton: g = !0
		} = e, {
			dom: p
		} = e, {
			assetsPath: x = ""
		} = e;
		return F(() => {
			dt.loadCompCSS("comp_floors", x ? "./" : ""), x ? dt.loadCSS(`${x}fonts/iconfont.css`) : dt
				.loadCSS("https://at.alicdn.com/t/font_1920785_fe42q6mstyt.css"), n(7, u = x ?
					`${x}/images/` : "https://www.ooomap.com/assets/map_images/")
		}), t.$$set = (t => {
			"size" in t && n(1, h = t.size), "style" in t && n(2, d = t.style), "floorMaxHeight" in t && n(
					3, f = t.floorMaxHeight), "hasOutdoor" in t && n(4, m = t.hasOutdoor), "has3DButton" in
				t && n(5, $ = t.has3DButton), "hasLayerButton" in t && n(6, g = t.hasLayerButton), "dom" in
				t && n(0, p = t.dom), "assetsPath" in t && n(17, x = t.assetsPath)
		}), [p, h, d, f, m, $, g, u, o, s, r, i, l, function(t) {
			var e = t.detail;
			switch (a("pre-click", e), e.tag) {
				case "toOutdoor":
					e.checked ? l.toOutdoor() : l.toIndoor();
					break;
				case "viewFloors":
					l.viewFloors(e.checked ? "all" : l.data.focus || l.floors[0].floorNumber).then(() => {
						l.focusFloors(l.data.focus)
					});
					break;
				case "dimension":
					c.view.viewMode = e.checked ? "3d" : "2d"
			}
			a("post-click", e)
		}, function(t) {
			var e = t.detail;
			a("pre-click", e), l.focusFloors(e.floorNumber), a("post-click", e)
		}, function() {
			return o
		}, function() {
			return s
		}, x, function(t) {
			c = t, t.on("focusFloors", (t, e) => {
				e === l && o.setIndex(t[0])
			}), t.on("door", (t, e) => {
				s && e === l && n(9, s.checked = !t, s)
			}), t.on("focusBuilding", e => {
				n(12, l = e), e && function(t, e) {
					n(12, l = e), s && n(9, s.checked = !1 === e.isIndoor, s), r && n(10, r
						.checked = "3d" === t.view.viewMode, r);
					var c = e.data.floors.slice();
					c.sort((t, e) => e.floorNumber - t.floorNumber), n(8, o.list = c, o);
					var a = e.data.focus || e.data.floors[0].floorNumber;
					o.setIndex(a), e.data.focus = a, e.data.viewFloors && e.data.viewFloors
						.length || (e.data.viewFloors = [a]), i && n(11, i.checked = e.data
							.viewFloors.length > 1, i)
				}(t, e), s && n(9, s.checked = !e, s)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(9, s = t)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(10, r = t)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(11, i = t)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(8, o = t)
			})
		}, function(t) {
			A[t ? "unshift" : "push"](() => {
				n(0, p = t)
			})
		}]
	}
	return class extends ut {
		constructor(t) {
			super(), at(this, t, At, Nt, i, {
				getFloorComp: 15,
				getOutdoorComp: 16,
				size: 1,
				style: 2,
				floorMaxHeight: 3,
				hasOutdoor: 4,
				has3DButton: 5,
				hasLayerButton: 6,
				dom: 0,
				assetsPath: 17,
				bind: 18
			})
		}
		get getFloorComp() {
			return this.$$.ctx[15]
		}
		get getOutdoorComp() {
			return this.$$.ctx[16]
		}
		get size() {
			return this.$$.ctx[1]
		}
		set size(t) {
			this.$$set({
				size: t
			}), J()
		}
		get style() {
			return this.$$.ctx[2]
		}
		set style(t) {
			this.$$set({
				style: t
			}), J()
		}
		get floorMaxHeight() {
			return this.$$.ctx[3]
		}
		set floorMaxHeight(t) {
			this.$$set({
				floorMaxHeight: t
			}), J()
		}
		get hasOutdoor() {
			return this.$$.ctx[4]
		}
		set hasOutdoor(t) {
			this.$$set({
				hasOutdoor: t
			}), J()
		}
		get has3DButton() {
			return this.$$.ctx[5]
		}
		set has3DButton(t) {
			this.$$set({
				has3DButton: t
			}), J()
		}
		get hasLayerButton() {
			return this.$$.ctx[6]
		}
		set hasLayerButton(t) {
			this.$$set({
				hasLayerButton: t
			}), J()
		}
		get dom() {
			return this.$$.ctx[0]
		}
		set dom(t) {
			this.$$set({
				dom: t
			}), J()
		}
		get assetsPath() {
			return this.$$.ctx[17]
		}
		set assetsPath(t) {
			this.$$set({
				assetsPath: t
			}), J()
		}
		get bind() {
			return this.$$.ctx[18]
		}
	}
});