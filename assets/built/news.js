function lightbox(e) {
  document.querySelectorAll(e).forEach(function (e) {
    e.addEventListener("click", function (e) {
      !(function (t) {
        t.preventDefault();
        for (
          var n,
            o = [],
            i = 0,
            e = t.target.closest(".kg-card").previousElementSibling;
          e &&
          (e.classList.contains("kg-image-card") ||
            e.classList.contains("kg-gallery-card"));

        ) {
          var r = [];
          e.querySelectorAll("img").forEach(function (e) {
            r.push({
              src: e.getAttribute("src"),
              msrc: e.getAttribute("src"),
              w: e.getAttribute("width"),
              h: e.getAttribute("height"),
              el: e,
            }),
              (i += 1);
          }),
            (e = e.previousElementSibling),
            (o = r.concat(o));
        }
        t.target.classList.contains("kg-image")
          ? o.push({
              src: t.target.getAttribute("src"),
              msrc: t.target.getAttribute("src"),
              w: t.target.getAttribute("width"),
              h: t.target.getAttribute("height"),
              el: t.target,
            })
          : ((n = !1),
            t.target
              .closest(".kg-gallery-card")
              .querySelectorAll("img")
              .forEach(function (e) {
                o.push({
                  src: e.getAttribute("src"),
                  msrc: e.getAttribute("src"),
                  w: e.getAttribute("width"),
                  h: e.getAttribute("height"),
                  el: e,
                }),
                  n || e === t.target ? (n = !0) : (i += 1);
              }));
        for (
          var a = t.target.closest(".kg-card").nextElementSibling;
          a &&
          (a.classList.contains("kg-image-card") ||
            a.classList.contains("kg-gallery-card"));

        )
          a.querySelectorAll("img").forEach(function (e) {
            o.push({
              src: e.getAttribute("src"),
              msrc: e.getAttribute("src"),
              w: e.getAttribute("width"),
              h: e.getAttribute("height"),
              el: e,
            });
          }),
            (a = a.nextElementSibling);
        var s = document.querySelectorAll(".pswp")[0];
        new PhotoSwipe(s, PhotoSwipeUI_Default, o, {
          bgOpacity: 0.9,
          closeOnScroll: !0,
          fullscreenEl: !1,
          history: !1,
          index: i,
          shareEl: !1,
          zoomEl: !1,
          getThumbBoundsFn: function (e) {
            var t = o[e].el,
              e = window.pageYOffset || document.documentElement.scrollTop,
              t = t.getBoundingClientRect();
            return { x: t.left, y: t.top + e, w: t.width };
          },
        }).init();
      })(e);
    });
  });
}
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var n = (this._events = this._events || {}),
          e = (n[e] = n[e] || []);
        return -1 == e.indexOf(t) && e.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var n = (this._onceEvents = this._onceEvents || {});
        return ((n[e] = n[e] || {})[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      e = this._events && this._events[e];
      if (e && e.length) {
        t = e.indexOf(t);
        return -1 != t && e.splice(t, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var n = this._events && this._events[e];
      if (n && n.length) {
        (n = n.slice(0)), (t = t || []);
        for (
          var o = this._onceEvents && this._onceEvents[e], i = 0;
          i < n.length;
          i++
        ) {
          var r = n[i];
          o && o[r] && (this.off(e, r), delete o[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (t, n) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (e) {
          return n(t, e);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = n(t, require("ev-emitter")))
      : (t.imagesLoaded = n(t, t.EvEmitter));
  })("undefined" != typeof window ? window : this, function (t, e) {
    function r(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function a(e, t, n) {
      if (!(this instanceof a)) return new a(e, t, n);
      var o,
        i = e;
      return (i = "string" == typeof e ? document.querySelectorAll(e) : i)
        ? ((this.elements =
            ((o = i),
            Array.isArray(o)
              ? o
              : "object" == typeof o && "number" == typeof o.length
              ? c.call(o)
              : [o])),
          (this.options = r({}, this.options)),
          "function" == typeof t ? (n = t) : r(this.options, t),
          n && this.on("always", n),
          this.getImages(),
          s && (this.jqDeferred = new s.Deferred()),
          void setTimeout(this.check.bind(this)))
        : void l.error("Bad element for imagesLoaded " + (i || e));
    }
    function n(e) {
      this.img = e;
    }
    function o(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var s = t.jQuery,
      l = t.console,
      c = Array.prototype.slice;
    ((a.prototype = Object.create(e.prototype)).options = {}),
      (a.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (a.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          !0 === this.options.background && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var n = e.querySelectorAll("img"), o = 0; o < n.length; o++) {
            var i = n[o];
            this.addImage(i);
          }
          if ("string" == typeof this.options.background)
            for (
              var r = e.querySelectorAll(this.options.background), o = 0;
              o < r.length;
              o++
            ) {
              var a = r[o];
              this.addElementBackgroundImages(a);
            }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (a.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var n = /url\((['"])?(.*?)\1\)/gi, o = n.exec(t.backgroundImage);
            null !== o;

          ) {
            var i = o && o[2];
            i && this.addBackground(i, e), (o = n.exec(t.backgroundImage));
          }
      }),
      (a.prototype.addImage = function (e) {
        e = new n(e);
        this.images.push(e);
      }),
      (a.prototype.addBackground = function (e, t) {
        t = new o(e, t);
        this.images.push(t);
      }),
      (a.prototype.check = function () {
        function t(e, t, n) {
          setTimeout(function () {
            o.progress(e, t, n);
          });
        }
        var o = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              })
            : void this.complete()
        );
      }),
      (a.prototype.progress = function (e, t, n) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && l && l.log("progress: " + n, e, t);
      }),
      (a.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        (this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred &&
            ((e = this.hasAnyBroken ? "reject" : "resolve"),
            this.jqDeferred[e](this));
      }),
      ((n.prototype = Object.create(e.prototype)).check = function () {
        return this.getIsImageComplete()
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (n.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (n.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (n.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (n.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (n.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (n.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      ((o.prototype = Object.create(n.prototype)).check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (o.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (o.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (a.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) &&
          ((s = e).fn.imagesLoaded = function (e, t) {
            return new a(this, e, t).jqDeferred.promise(s(this));
          });
      })(),
      a
    );
  }),
  (function (r) {
    "use strict";
    (r.fn.fitVids = function (e) {
      var t,
        n,
        i = { customSelector: null, ignore: null };
      return (
        document.getElementById("fit-vids-style") ||
          ((t = document.head || document.getElementsByTagName("head")[0]),
          ((n = document.createElement("div")).innerHTML =
            '<p>x</p><style id="fit-vids-style">.fluid-width-video-container{flex-grow: 1;width:100%;}.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
          t.appendChild(n.childNodes[1])),
        e && r.extend(i, e),
        this.each(function () {
          var e = [
            'iframe[src*="player.vimeo.com"]',
            'iframe[src*="youtube.com"]',
            'iframe[src*="youtube-nocookie.com"]',
            'iframe[src*="kickstarter.com"][src*="video.html"]',
            "object",
            "embed",
          ];
          i.customSelector && e.push(i.customSelector);
          var o = ".fitvidsignore";
          i.ignore && (o = o + ", " + i.ignore);
          e = r(this).find(e.join(","));
          (e = (e = e.not("object object")).not(o)).each(function () {
            var e,
              t,
              n = r(this);
            0 < n.parents(o).length ||
              ("embed" === this.tagName.toLowerCase() &&
                n.parent("object").length) ||
              n.parent(".fluid-width-video-wrapper").length ||
              (n.css("height") ||
                n.css("width") ||
                (!isNaN(n.attr("height")) && !isNaN(n.attr("width"))) ||
                (n.attr("height", 9), n.attr("width", 16)),
              (e =
                ("object" === this.tagName.toLowerCase() ||
                (n.attr("height") && !isNaN(parseInt(n.attr("height"), 10)))
                  ? parseInt(n.attr("height"), 10)
                  : n.height()) /
                (isNaN(parseInt(n.attr("width"), 10))
                  ? n.width()
                  : parseInt(n.attr("width"), 10))),
              n.attr("name") ||
                ((t = "fitvid" + r.fn.fitVids._count),
                n.attr("name", t),
                r.fn.fitVids._count++),
              n
                .wrap(
                  '<div class="fluid-width-video-container"><div class="fluid-width-video-wrapper"></div></div>'
                )
                .parent(".fluid-width-video-wrapper")
                .css("padding-top", 100 * e + "%"),
              n.removeAttr("height").removeAttr("width"));
          });
        })
      );
    }),
      (r.fn.fitVids._count = 0);
  })(window.jQuery || window.Zepto),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.PhotoSwipeUI_Default = t());
  })(this, function () {
    "use strict";
    return function (o, s) {
      function e(e) {
        if (k) return !0;
        (e = e || window.event), S.timeToIdle && S.mouseUsed && !x && Z();
        for (
          var t,
            n,
            o = (e.target || e.srcElement).getAttribute("class") || "",
            i = 0;
          i < N.length;
          i++
        )
          (t = N[i]).onTap &&
            -1 < o.indexOf("pswp__" + t.name) &&
            (t.onTap(), (n = !0));
        n &&
          (e.stopPropagation && e.stopPropagation(),
          (k = !0),
          (e = s.features.isOldAndroid ? 600 : 30),
          setTimeout(function () {
            k = !1;
          }, e));
      }
      function t(e, t, n) {
        s[(n ? "add" : "remove") + "Class"](e, "pswp__" + t);
      }
      function n() {
        var e = 1 === S.getNumItemsFn();
        e !== T && (t(m, "ui--one-slide", e), (T = e));
      }
      function i() {
        t(y, "share-modal--hidden", O);
      }
      function r() {
        return (
          (O = !O)
            ? (s.removeClass(y, "pswp__share-modal--fade-in"),
              setTimeout(function () {
                O && i();
              }, 300))
            : (i(),
              setTimeout(function () {
                O || s.addClass(y, "pswp__share-modal--fade-in");
              }, 30)),
          O || R(),
          0
        );
      }
      function a(e) {
        var t = (e = e || window.event).target || e.srcElement;
        return (
          o.shout("shareLinkClick", e, t),
          !(
            !t.href ||
            (!t.hasAttribute("download") &&
              (window.open(
                t.href,
                "pswp_share",
                "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" +
                  (window.screen ? Math.round(screen.width / 2 - 275) : 100)
              ),
              O || r(),
              1))
          )
        );
      }
      function l(e) {
        for (var t = 0; t < S.closeElClasses.length; t++)
          if (s.hasClass(e, "pswp__" + S.closeElClasses[t])) return !0;
      }
      function c(e) {
        ((e = (e = e || window.event).relatedTarget || e.toElement) &&
          "HTML" !== e.nodeName) ||
          (clearTimeout(L),
          (L = setTimeout(function () {
            D.setIdle(!0);
          }, S.timeToIdleOutside)));
      }
      function u(e) {
        var t,
          n = e.vGap;
        !o.likelyTouchDevice || S.mouseUsed || screen.width > S.fitControlsWidth
          ? ((t = S.barsSize),
            S.captionEl && "auto" === t.bottom
              ? (h ||
                  ((h = s.createEl(
                    "pswp__caption pswp__caption--fake"
                  )).appendChild(s.createEl("pswp__caption__center")),
                  m.insertBefore(h, f),
                  s.addClass(m, "pswp__ui--fit")),
                S.addCaptionHTMLFn(e, h, !0)
                  ? ((e = h.clientHeight), (n.bottom = parseInt(e, 10) || 44))
                  : (n.bottom = t.top))
              : (n.bottom = "auto" === t.bottom ? 0 : t.bottom),
            (n.top = t.top))
          : (n.top = n.bottom = 0);
      }
      function d() {
        function e(e) {
          if (e)
            for (var t = e.length, n = 0; n < t; n++) {
              (i = e[n]), (r = i.className);
              for (var o = 0; o < N.length; o++)
                (a = N[o]),
                  -1 < r.indexOf("pswp__" + a.name) &&
                    (S[a.option]
                      ? (s.removeClass(i, "pswp__element--disabled"),
                        a.onInit && a.onInit(i))
                      : s.addClass(i, "pswp__element--disabled"));
            }
        }
        var i, r, a;
        e(m.children);
        var t = s.getChildByClass(m, "pswp__top-bar");
        t && e(t.children);
      }
      var p,
        m,
        f,
        h,
        g,
        v,
        y,
        w,
        x,
        b,
        E,
        I,
        C,
        T,
        S,
        k,
        A,
        L,
        D = this,
        _ = !1,
        M = !0,
        O = !0,
        F = {
          barsSize: { top: 44, bottom: "auto" },
          closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
          timeToIdle: 4e3,
          timeToIdleOutside: 1e3,
          loadingIndicatorDelay: 1e3,
          addCaptionHTMLFn: function (e, t) {
            return e.title
              ? ((t.children[0].innerHTML = e.title), !0)
              : ((t.children[0].innerHTML = ""), !1);
          },
          closeEl: !0,
          captionEl: !0,
          fullscreenEl: !0,
          zoomEl: !0,
          shareEl: !0,
          counterEl: !0,
          arrowEl: !0,
          preloaderEl: !0,
          tapToClose: !1,
          tapToToggleControls: !0,
          clickToCloseNonZoomable: !0,
          shareButtons: [
            {
              id: "facebook",
              label: "Share on Facebook",
              url: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
            },
            {
              id: "twitter",
              label: "Tweet",
              url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
            },
            {
              id: "pinterest",
              label: "Pin it",
              url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}",
            },
            {
              id: "download",
              label: "Download image",
              url: "{{raw_image_url}}",
              download: !0,
            },
          ],
          getImageURLForShare: function () {
            return o.currItem.src || "";
          },
          getPageURLForShare: function () {
            return window.location.href;
          },
          getTextForShare: function () {
            return o.currItem.title || "";
          },
          indexIndicatorSep: " / ",
          fitControlsWidth: 1200,
        },
        R = function () {
          for (var e, t, n, o, i = "", r = 0; r < S.shareButtons.length; r++)
            (e = S.shareButtons[r]),
              (t = S.getImageURLForShare(e)),
              (n = S.getPageURLForShare(e)),
              (o = S.getTextForShare(e)),
              (i +=
                '<a href="' +
                e.url
                  .replace("{{url}}", encodeURIComponent(n))
                  .replace("{{image_url}}", encodeURIComponent(t))
                  .replace("{{raw_image_url}}", t)
                  .replace("{{text}}", encodeURIComponent(o)) +
                '" target="_blank" class="pswp__share--' +
                e.id +
                '"' +
                (e.download ? "download" : "") +
                ">" +
                e.label +
                "</a>"),
              S.parseShareButtonOut && (i = S.parseShareButtonOut(e, i));
          (y.children[0].innerHTML = i), (y.children[0].onclick = a);
        },
        P = 0,
        Z = function () {
          clearTimeout(L), (P = 0), x && D.setIdle(!1);
        },
        z = function (e) {
          I !== e && (t(E, "preloader--active", !e), (I = e));
        },
        N = [
          {
            name: "caption",
            option: "captionEl",
            onInit: function (e) {
              f = e;
            },
          },
          {
            name: "share-modal",
            option: "shareEl",
            onInit: function (e) {
              y = e;
            },
            onTap: function () {
              r();
            },
          },
          {
            name: "button--share",
            option: "shareEl",
            onInit: function (e) {
              v = e;
            },
            onTap: function () {
              r();
            },
          },
          {
            name: "button--zoom",
            option: "zoomEl",
            onTap: o.toggleDesktopZoom,
          },
          {
            name: "counter",
            option: "counterEl",
            onInit: function (e) {
              g = e;
            },
          },
          { name: "button--close", option: "closeEl", onTap: o.close },
          { name: "button--arrow--left", option: "arrowEl", onTap: o.prev },
          { name: "button--arrow--right", option: "arrowEl", onTap: o.next },
          {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function () {
              p.isFullscreen() ? p.exit() : p.enter();
            },
          },
          {
            name: "preloader",
            option: "preloaderEl",
            onInit: function (e) {
              E = e;
            },
          },
        ];
      (D.init = function () {
        var t;
        s.extend(o.options, F, !0),
          (S = o.options),
          (m = s.getChildByClass(o.scrollWrap, "pswp__ui")),
          (b = o.listen)("onVerticalDrag", function (e) {
            M && e < 0.95
              ? D.hideControls()
              : !M && 0.95 <= e && D.showControls();
          }),
          b("onPinchClose", function (e) {
            M && e < 0.9
              ? (D.hideControls(), (t = !0))
              : t && !M && 0.9 < e && D.showControls();
          }),
          b("zoomGestureEnded", function () {
            (t = !1) && !M && D.showControls();
          }),
          b("beforeChange", D.update),
          b("doubleTap", function (e) {
            var t = o.currItem.initialZoomLevel;
            o.getZoomLevel() !== t
              ? o.zoomTo(t, e, 333)
              : o.zoomTo(S.getDoubleTapZoom(!1, o.currItem), e, 333);
          }),
          b("preventDragEvent", function (e, t, n) {
            var o = e.target || e.srcElement;
            o &&
              o.getAttribute("class") &&
              -1 < e.type.indexOf("mouse") &&
              (0 < o.getAttribute("class").indexOf("__caption") ||
                /(SMALL|STRONG|EM)/i.test(o.tagName)) &&
              (n.prevent = !1);
          }),
          b("bindEvents", function () {
            s.bind(m, "pswpTap click", e),
              s.bind(o.scrollWrap, "pswpTap", D.onGlobalTap),
              o.likelyTouchDevice ||
                s.bind(o.scrollWrap, "mouseover", D.onMouseOver);
          }),
          b("unbindEvents", function () {
            O || r(),
              A && clearInterval(A),
              s.unbind(document, "mouseout", c),
              s.unbind(document, "mousemove", Z),
              s.unbind(m, "pswpTap click", e),
              s.unbind(o.scrollWrap, "pswpTap", D.onGlobalTap),
              s.unbind(o.scrollWrap, "mouseover", D.onMouseOver),
              p &&
                (s.unbind(document, p.eventK, D.updateFullscreen),
                p.isFullscreen() && ((S.hideAnimationDuration = 0), p.exit()),
                (p = null));
          }),
          b("destroy", function () {
            S.captionEl &&
              (h && m.removeChild(h), s.removeClass(f, "pswp__caption--empty")),
              y && (y.children[0].onclick = null),
              s.removeClass(m, "pswp__ui--over-close"),
              s.addClass(m, "pswp__ui--hidden"),
              D.setIdle(!1);
          }),
          S.showAnimationDuration || s.removeClass(m, "pswp__ui--hidden"),
          b("initialZoomIn", function () {
            S.showAnimationDuration && s.removeClass(m, "pswp__ui--hidden");
          }),
          b("initialZoomOut", function () {
            s.addClass(m, "pswp__ui--hidden");
          }),
          b("parseVerticalMargin", u),
          d(),
          S.shareEl && v && y && (O = !0),
          n(),
          S.timeToIdle &&
            b("mouseUsed", function () {
              s.bind(document, "mousemove", Z),
                s.bind(document, "mouseout", c),
                (A = setInterval(function () {
                  2 === ++P && D.setIdle(!0);
                }, S.timeToIdle / 2));
            }),
          S.fullscreenEl &&
            !s.features.isOldAndroid &&
            ((p = p || D.getFullscreenAPI())
              ? (s.bind(document, p.eventK, D.updateFullscreen),
                D.updateFullscreen(),
                s.addClass(o.template, "pswp--supports-fs"))
              : s.removeClass(o.template, "pswp--supports-fs")),
          S.preloaderEl &&
            (z(!0),
            b("beforeChange", function () {
              clearTimeout(C),
                (C = setTimeout(function () {
                  o.currItem && o.currItem.loading
                    ? (o.allowProgressiveImg() &&
                        (!o.currItem.img || o.currItem.img.naturalWidth)) ||
                      z(!1)
                    : z(!0);
                }, S.loadingIndicatorDelay));
            }),
            b("imageLoadComplete", function (e, t) {
              o.currItem === t && z(!0);
            }));
      }),
        (D.setIdle = function (e) {
          t(m, "ui--idle", (x = e));
        }),
        (D.update = function () {
          (_ =
            !(!M || !o.currItem) &&
            (D.updateIndexIndicator(),
            S.captionEl &&
              (S.addCaptionHTMLFn(o.currItem, f),
              t(f, "caption--empty", !o.currItem.title)),
            !0)),
            O || r(),
            n();
        }),
        (D.updateFullscreen = function (e) {
          e &&
            setTimeout(function () {
              o.setScrollOffset(0, s.getScrollY());
            }, 50),
            s[(p.isFullscreen() ? "add" : "remove") + "Class"](
              o.template,
              "pswp--fs"
            );
        }),
        (D.updateIndexIndicator = function () {
          S.counterEl &&
            (g.innerHTML =
              o.getCurrentIndex() +
              1 +
              S.indexIndicatorSep +
              S.getNumItemsFn());
        }),
        (D.onGlobalTap = function (e) {
          var t = (e = e || window.event).target || e.srcElement;
          if (!k)
            if (e.detail && "mouse" === e.detail.pointerType)
              l(t)
                ? o.close()
                : s.hasClass(t, "pswp__img") &&
                  (1 === o.getZoomLevel() &&
                  o.getZoomLevel() <= o.currItem.fitRatio
                    ? S.clickToCloseNonZoomable && o.close()
                    : o.toggleDesktopZoom(e.detail.releasePoint));
            else if (
              (S.tapToToggleControls &&
                (M ? D.hideControls() : D.showControls()),
              S.tapToClose && (s.hasClass(t, "pswp__img") || l(t)))
            )
              return void o.close();
        }),
        (D.onMouseOver = function (e) {
          e = (e = e || window.event).target || e.srcElement;
          t(m, "ui--over-close", l(e));
        }),
        (D.hideControls = function () {
          s.addClass(m, "pswp__ui--hidden"), (M = !1);
        }),
        (D.showControls = function () {
          (M = !0), _ || D.update(), s.removeClass(m, "pswp__ui--hidden");
        }),
        (D.supportsFullscreen = function () {
          var e = document;
          return !!(
            e.exitFullscreen ||
            e.mozCancelFullScreen ||
            e.webkitExitFullscreen ||
            e.msExitFullscreen
          );
        }),
        (D.getFullscreenAPI = function () {
          var e,
            t = document.documentElement,
            n = "fullscreenchange";
          return (
            t.requestFullscreen
              ? (e = {
                  enterK: "requestFullscreen",
                  exitK: "exitFullscreen",
                  elementK: "fullscreenElement",
                  eventK: n,
                })
              : t.mozRequestFullScreen
              ? (e = {
                  enterK: "mozRequestFullScreen",
                  exitK: "mozCancelFullScreen",
                  elementK: "mozFullScreenElement",
                  eventK: "moz" + n,
                })
              : t.webkitRequestFullscreen
              ? (e = {
                  enterK: "webkitRequestFullscreen",
                  exitK: "webkitExitFullscreen",
                  elementK: "webkitFullscreenElement",
                  eventK: "webkit" + n,
                })
              : t.msRequestFullscreen &&
                (e = {
                  enterK: "msRequestFullscreen",
                  exitK: "msExitFullscreen",
                  elementK: "msFullscreenElement",
                  eventK: "MSFullscreenChange",
                }),
            e &&
              ((e.enter = function () {
                return (
                  (w = S.closeOnScroll),
                  (S.closeOnScroll = !1),
                  "webkitRequestFullscreen" !== this.enterK
                    ? o.template[this.enterK]()
                    : void o.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                );
              }),
              (e.exit = function () {
                return (S.closeOnScroll = w), document[this.exitK]();
              }),
              (e.isFullscreen = function () {
                return document[this.elementK];
              })),
            e
          );
        });
    };
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(t)
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.PhotoSwipe = t());
  })(this, function () {
    "use strict";
    return function (m, n, e, t) {
      var f = {
        features: null,
        bind: function (e, t, n, o) {
          var i = (o ? "remove" : "add") + "EventListener";
          t = t.split(" ");
          for (var r = 0; r < t.length; r++) t[r] && e[i](t[r], n, !1);
        },
        isArray: function (e) {
          return e instanceof Array;
        },
        createEl: function (e, t) {
          t = document.createElement(t || "div");
          return e && (t.className = e), t;
        },
        getScrollY: function () {
          var e = window.pageYOffset;
          return void 0 !== e ? e : document.documentElement.scrollTop;
        },
        unbind: function (e, t, n) {
          f.bind(e, t, n, !0);
        },
        removeClass: function (e, t) {
          t = new RegExp("(\\s|^)" + t + "(\\s|$)");
          e.className = e.className
            .replace(t, " ")
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "");
        },
        addClass: function (e, t) {
          f.hasClass(e, t) || (e.className += (e.className ? " " : "") + t);
        },
        hasClass: function (e, t) {
          return (
            e.className &&
            new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
          );
        },
        getChildByClass: function (e, t) {
          for (var n = e.firstChild; n; ) {
            if (f.hasClass(n, t)) return n;
            n = n.nextSibling;
          }
        },
        arraySearch: function (e, t, n) {
          for (var o = e.length; o--; ) if (e[o][n] === t) return o;
          return -1;
        },
        extend: function (e, t, n) {
          for (var o in t)
            if (t.hasOwnProperty(o)) {
              if (n && e.hasOwnProperty(o)) continue;
              e[o] = t[o];
            }
        },
        easing: {
          sine: {
            out: function (e) {
              return Math.sin(e * (Math.PI / 2));
            },
            inOut: function (e) {
              return -(Math.cos(Math.PI * e) - 1) / 2;
            },
          },
          cubic: {
            out: function (e) {
              return --e * e * e + 1;
            },
          },
        },
        detectFeatures: function () {
          if (f.features) return f.features;
          var e,
            t,
            n = f.createEl().style,
            o = "",
            i = {};
          (i.oldIE = document.all && !document.addEventListener),
            (i.touch = "ontouchstart" in window),
            window.requestAnimationFrame &&
              ((i.raf = window.requestAnimationFrame),
              (i.caf = window.cancelAnimationFrame)),
            (i.pointerEvent =
              !!window.PointerEvent || navigator.msPointerEnabled),
            i.pointerEvent ||
              ((e = navigator.userAgent),
              !/iP(hone|od)/.test(navigator.platform) ||
                ((t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)) &&
                  0 < t.length &&
                  1 <= (t = parseInt(t[1], 10)) &&
                  t < 8 &&
                  (i.isOldIOSPhone = !0)),
              (t = (t = e.match(/Android\s([0-9\.]*)/)) ? t[1] : 0),
              1 <= (t = parseFloat(t)) &&
                (t < 4.4 && (i.isOldAndroid = !0), (i.androidVersion = t)),
              (i.isMobileOpera = /opera mini|opera mobi/i.test(e)));
          for (
            var r,
              a,
              s,
              l = ["transform", "perspective", "animationName"],
              c = ["", "webkit", "Moz", "ms", "O"],
              u = 0;
            u < 4;
            u++
          ) {
            o = c[u];
            for (var d = 0; d < 3; d++)
              (r = l[d]),
                (a = o + (o ? r.charAt(0).toUpperCase() + r.slice(1) : r)),
                !i[r] && a in n && (i[r] = a);
            o &&
              !i.raf &&
              ((o = o.toLowerCase()),
              (i.raf = window[o + "RequestAnimationFrame"]),
              i.raf &&
                (i.caf =
                  window[o + "CancelAnimationFrame"] ||
                  window[o + "CancelRequestAnimationFrame"]));
          }
          return (
            i.raf ||
              ((s = 0),
              (i.raf = function (e) {
                var t = new Date().getTime(),
                  n = Math.max(0, 16 - (t - s)),
                  o = window.setTimeout(function () {
                    e(t + n);
                  }, n);
                return (s = t + n), o;
              }),
              (i.caf = function (e) {
                clearTimeout(e);
              })),
            (i.svg =
              !!document.createElementNS &&
              !!document.createElementNS("http://www.w3.org/2000/svg", "svg")
                .createSVGRect),
            (f.features = i)
          );
        },
      };
      f.detectFeatures(),
        f.features.oldIE &&
          (f.bind = function (e, t, n, o) {
            t = t.split(" ");
            for (
              var i,
                r = (o ? "detach" : "attach") + "Event",
                a = function () {
                  n.handleEvent.call(n);
                },
                s = 0;
              s < t.length;
              s++
            )
              if ((i = t[s]))
                if ("object" == typeof n && n.handleEvent) {
                  if (o) {
                    if (!n["oldIE" + i]) return !1;
                  } else n["oldIE" + i] = a;
                  e[r]("on" + i, n["oldIE" + i]);
                } else e[r]("on" + i, n);
          });
      var h = this,
        g = {
          allowPanToNext: !0,
          spacing: 0.12,
          bgOpacity: 1,
          mouseUsed: !1,
          loop: !0,
          pinchToClose: !0,
          closeOnScroll: !0,
          closeOnVerticalDrag: !0,
          verticalDragRange: 0.75,
          hideAnimationDuration: 333,
          showAnimationDuration: 333,
          showHideOpacity: !1,
          focus: !0,
          escKey: !0,
          arrowKeys: !0,
          mainScrollEndFriction: 0.35,
          panEndFriction: 0.35,
          isClickableElement: function (e) {
            return "A" === e.tagName;
          },
          getDoubleTapZoom: function (e, t) {
            return e || t.initialZoomLevel < 0.7 ? 1 : 1.33;
          },
          maxSpreadZoom: 1.33,
          modal: !0,
          scaleMode: "fit",
        };
      f.extend(g, t);
      function o() {
        return { x: 0, y: 0 };
      }
      function i(e, t) {
        f.extend(h, t.publicMethods), Qe.push(e);
      }
      function a(e) {
        var t = jt();
        return t - 1 < e ? e - t : e < 0 ? t + e : e;
      }
      function r(e, t) {
        return et[e] || (et[e] = []), et[e].push(t);
      }
      function v(e) {
        var t = et[e];
        if (t) {
          var n = Array.prototype.slice.call(arguments);
          n.shift();
          for (var o = 0; o < t.length; o++) t[o].apply(h, n);
        }
      }
      function u() {
        return new Date().getTime();
      }
      function y(e) {
        (Ne = e), (h.bg.style.opacity = e * g.bgOpacity);
      }
      function s(e, t, n, o, i) {
        (!Je || (i && i !== h.currItem)) && (o /= (i || h.currItem).fitRatio),
          (e[se] = Q + t + "px, " + n + "px" + $ + " scale(" + o + ")");
      }
      function d(e, t) {
        var n;
        !g.loop &&
          t &&
          ((n = U + (Ge.x * je - e) / Ge.x),
          (t = Math.round(e - xt.x)),
          ((n < 0 && 0 < t) || (n >= jt() - 1 && t < 0)) &&
            (e = xt.x + t * g.mainScrollEndFriction)),
          (xt.x = e),
          ot(e, K);
      }
      function l(e, t) {
        var n = bt[e] - Ye[e];
        return Ue[e] + He[e] + n - (t / X) * n;
      }
      function w(e, t) {
        (e.x = t.x), (e.y = t.y), t.id && (e.id = t.id);
      }
      function c(e) {
        (e.x = Math.round(e.x)), (e.y = Math.round(e.y));
      }
      function p(e, t) {
        return (e = Qt(h.currItem, We, e)), t && (Oe = e), e;
      }
      function x(e) {
        return (e = e || h.currItem).initialZoomLevel;
      }
      function b(e) {
        return 0 < (e = e || h.currItem).w ? g.maxSpreadZoom : 1;
      }
      function E(e, t, n, o) {
        return o === h.currItem.initialZoomLevel
          ? ((n[e] = h.currItem.initialPosition[e]), !0)
          : ((n[e] = l(e, o)),
            n[e] > t.min[e]
              ? ((n[e] = t.min[e]), !0)
              : n[e] < t.max[e] && ((n[e] = t.max[e]), !0));
      }
      function I(e) {
        var t = "";
        g.escKey && 27 === e.keyCode
          ? (t = "close")
          : g.arrowKeys &&
            (37 === e.keyCode
              ? (t = "prev")
              : 39 === e.keyCode && (t = "next")),
          t &&
            (e.ctrlKey ||
              e.altKey ||
              e.shiftKey ||
              e.metaKey ||
              (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
              h[t]()));
      }
      function C(e) {
        e &&
          (ke || Se || Re || Ee) &&
          (e.preventDefault(), e.stopPropagation());
      }
      function T() {
        h.setScrollOffset(0, f.getScrollY());
      }
      function S(e) {
        at[e] && (at[e].raf && de(at[e].raf), st--, delete at[e]);
      }
      function k(e) {
        at[e] && S(e), at[e] || (st++, (at[e] = {}));
      }
      function A() {
        for (var e in at) at.hasOwnProperty(e) && S(e);
      }
      function L(e, t, n, o, i, r, a) {
        var s,
          l = u();
        k(e);
        var c = function () {
          if (at[e]) {
            if (((s = u() - l), o <= s)) return S(e), r(n), void (a && a());
            r((n - t) * i(s / o) + t), (at[e].raf = ue(c));
          }
        };
        c();
      }
      function D(e, t) {
        return (
          (gt.x = Math.abs(e.x - t.x)),
          (gt.y = Math.abs(e.y - t.y)),
          Math.sqrt(gt.x * gt.x + gt.y * gt.y)
        );
      }
      function _(e, t) {
        return (
          (St.prevent = !Tt(e.target, g.isClickableElement)),
          v("preventDragEvent", e, t, St),
          St.prevent
        );
      }
      function M(e, t) {
        return (t.x = e.pageX), (t.y = e.pageY), (t.id = e.identifier), t;
      }
      function O(e, t, n) {
        (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y));
      }
      function F() {
        var e = Ke.y - h.currItem.initialPosition.y;
        return 1 - Math.abs(e / (We.y / 2));
      }
      function R(e) {
        for (; 0 < Lt.length; ) Lt.pop();
        return (
          le
            ? ((Be = 0),
              mt.forEach(function (e) {
                0 === Be ? (Lt[0] = e) : 1 === Be && (Lt[1] = e), Be++;
              }))
            : -1 < e.type.indexOf("touch")
            ? e.touches &&
              0 < e.touches.length &&
              ((Lt[0] = M(e.touches[0], kt)),
              1 < e.touches.length && (Lt[1] = M(e.touches[1], At)))
            : ((kt.x = e.pageX), (kt.y = e.pageY), (kt.id = ""), (Lt[0] = kt)),
          Lt
        );
      }
      function P(e, t) {
        var n,
          o,
          i,
          r = Ke[e] + t[e],
          a = 0 < t[e],
          s = xt.x + t.x,
          l = xt.x - ft.x,
          c = r > Oe.min[e] || r < Oe.max[e] ? g.panEndFriction : 1,
          r = Ke[e] + t[e] * c;
        return (!g.allowPanToNext && V !== h.currItem.initialZoomLevel) ||
          (Fe
            ? "h" !== Pe ||
              "x" !== e ||
              Se ||
              (a
                ? (r > Oe.min[e] &&
                    ((c = g.panEndFriction),
                    Oe.min[e],
                    (n = Oe.min[e] - Ue[e])),
                  (n <= 0 || l < 0) && 1 < jt()
                    ? ((i = s), l < 0 && s > ft.x && (i = ft.x))
                    : Oe.min.x !== Oe.max.x && (o = r))
                : (r < Oe.max[e] &&
                    ((c = g.panEndFriction),
                    Oe.max[e],
                    (n = Ue[e] - Oe.max[e])),
                  (n <= 0 || 0 < l) && 1 < jt()
                    ? ((i = s), 0 < l && s < ft.x && (i = ft.x))
                    : Oe.min.x !== Oe.max.x && (o = r)))
            : (i = s),
          "x" !== e)
          ? void (Re || Le || (V > h.currItem.fitRatio && (Ke[e] += t[e] * c)))
          : (void 0 !== i && (d(i, !0), (Le = i !== ft.x)),
            Oe.min.x !== Oe.max.x &&
              (void 0 !== o ? (Ke.x = o) : Le || (Ke.x += t.x * c)),
            void 0 !== i);
      }
      function Z(e) {
        var t;
        ("mousedown" === e.type && 0 < e.button) ||
          (Kt
            ? e.preventDefault()
            : (Ie && "mousedown" === e.type) ||
              (_(e, !0) && e.preventDefault(),
              v("pointerDown"),
              le &&
                ((t = f.arraySearch(mt, e.pointerId, "id")) < 0 &&
                  (t = mt.length),
                (mt[t] = { x: e.pageX, y: e.pageY, id: e.pointerId })),
              (e = (t = R(e)).length),
              (De = null),
              A(),
              (Ce && 1 !== e) ||
                ((Ce = Ze = !0),
                f.bind(window, j, h),
                (be = qe = ze = Ee = Le = ke = Te = Se = !1),
                (Pe = null),
                v("firstTouchStart", t),
                w(Ue, Ke),
                (He.x = He.y = 0),
                w(dt, t[0]),
                w(pt, dt),
                (ft.x = Ge.x * je),
                (ht = [{ x: dt.x, y: dt.y }]),
                (we = ye = u()),
                p(V, !0),
                It(),
                Ct()),
              !_e &&
                1 < e &&
                !Re &&
                !Le &&
                ((X = V),
                (_e = Te = !(Se = !1)),
                (He.y = He.x = 0),
                w(Ue, Ke),
                w(lt, t[0]),
                w(ct, t[1]),
                O(lt, ct, Et),
                (bt.x = Math.abs(Et.x) - Ke.x),
                (bt.y = Math.abs(Et.y) - Ke.y),
                (Me = D(lt, ct)))));
      }
      function z(e) {
        var t, n;
        e.preventDefault(),
          le &&
            -1 < (t = f.arraySearch(mt, e.pointerId, "id")) &&
            (((n = mt[t]).x = e.pageX), (n.y = e.pageY)),
          Ce &&
            ((n = R(e)),
            Pe || ke || _e
              ? (De = n)
              : xt.x !== Ge.x * je
              ? (Pe = "h")
              : ((e = Math.abs(n[0].x - dt.x) - Math.abs(n[0].y - dt.y)),
                10 <= Math.abs(e) && ((Pe = 0 < e ? "h" : "v"), (De = n))));
      }
      function N(e) {
        if (ge.isOldAndroid) {
          if (Ie && "mouseup" === e.type) return;
          -1 < e.type.indexOf("touch") &&
            (clearTimeout(Ie),
            (Ie = setTimeout(function () {
              Ie = 0;
            }, 600)));
        }
        v("pointerUp"),
          _(e, !1) && e.preventDefault(),
          !le ||
            (-1 < (n = f.arraySearch(mt, e.pointerId, "id")) &&
              ((r = mt.splice(n, 1)[0]),
              navigator.msPointerEnabled
                ? ((r.type = { 4: "mouse", 2: "touch", 3: "pen" }[
                    e.pointerType
                  ]),
                  r.type || (r.type = e.pointerType || "mouse"))
                : (r.type = e.pointerType || "mouse")));
        var t = R(e),
          n = t.length;
        if (2 === (n = "mouseup" === e.type ? 0 : n)) return !(De = null);
        1 === n && w(pt, t[0]),
          0 !== n ||
            Pe ||
            Re ||
            (r ||
              ("mouseup" === e.type
                ? (r = { x: e.pageX, y: e.pageY, type: "mouse" })
                : e.changedTouches &&
                  e.changedTouches[0] &&
                  (r = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY,
                    type: "touch",
                  })),
            v("touchRelease", e, r));
        var o,
          i,
          r = -1;
        if (
          (0 === n &&
            ((Ce = !1),
            f.unbind(window, j, h),
            It(),
            _e ? (r = 0) : -1 !== wt && (r = u() - wt)),
          (wt = 1 === n ? u() : -1),
          (r = -1 !== r && r < 150 ? "zoom" : "swipe"),
          _e &&
            n < 2 &&
            ((_e = !1),
            1 === n && (r = "zoomPointerUp"),
            v("zoomGestureEnded")),
          (De = null),
          ke || Se || Re || Ee)
        )
          if ((A(), (xe = xe || _t()).calculateSwipeSpeed("x"), Ee))
            F() < g.verticalDragRange
              ? h.close()
              : ((o = Ke.y),
                (i = Ne),
                L("verticalDrag", 0, 1, 300, f.easing.cubic.out, function (e) {
                  (Ke.y = (h.currItem.initialPosition.y - o) * e + o),
                    y((1 - i) * e + i),
                    tt();
                }),
                v("onVerticalDrag", 1));
          else {
            if ((Le || Re) && 0 === n) {
              if (Ot(r, xe)) return;
              r = "zoomPointerUp";
            }
            if (!Re)
              return "swipe" !== r
                ? void Rt()
                : void (!Le && V > h.currItem.fitRatio && Mt(xe));
          }
      }
      var q,
        B,
        H,
        U,
        K,
        W,
        j,
        Y,
        G,
        V,
        X,
        Q,
        $,
        J,
        ee,
        te,
        ne,
        oe,
        ie,
        re,
        ae,
        se,
        le,
        ce,
        ue,
        de,
        pe,
        me,
        fe,
        he,
        ge,
        ve,
        ye,
        we,
        xe,
        be,
        Ee,
        Ie,
        Ce,
        Te,
        Se,
        ke,
        Ae,
        Le,
        De,
        _e,
        Me,
        Oe,
        Fe,
        Re,
        Pe,
        Ze,
        ze,
        Ne,
        qe,
        Be,
        He = o(),
        Ue = o(),
        Ke = o(),
        We = {},
        je = 0,
        Ye = {},
        Ge = o(),
        Ve = 0,
        Xe = !0,
        Qe = [],
        $e = {},
        Je = !1,
        et = {},
        tt = function (e) {
          Fe &&
            (e &&
              (V > h.currItem.fitRatio
                ? Je || ($t(h.currItem, !1, !0), (Je = !0))
                : Je && ($t(h.currItem), (Je = !1))),
            s(Fe, Ke.x, Ke.y, V));
        },
        nt = function (e) {
          e.container &&
            s(
              e.container.style,
              e.initialPosition.x,
              e.initialPosition.y,
              e.initialZoomLevel,
              e
            );
        },
        ot = function (e, t) {
          t[se] = Q + e + "px, 0px" + $;
        },
        it = null,
        rt = function () {
          it &&
            (f.unbind(document, "mousemove", rt),
            f.addClass(m, "pswp--has_mouse"),
            (g.mouseUsed = !0),
            v("mouseUsed")),
            (it = setTimeout(function () {
              it = null;
            }, 100));
        },
        at = {},
        st = 0,
        t = {
          shout: v,
          listen: r,
          viewportSize: We,
          options: g,
          isMainScrollAnimating: function () {
            return Re;
          },
          getZoomLevel: function () {
            return V;
          },
          getCurrentIndex: function () {
            return U;
          },
          isDragging: function () {
            return Ce;
          },
          isZooming: function () {
            return _e;
          },
          setScrollOffset: function (e, t) {
            (Ye.x = e), (he = Ye.y = t), v("updateScrollOffset", Ye);
          },
          applyZoomPan: function (e, t, n, o) {
            (Ke.x = t), (Ke.y = n), (V = e), tt(o);
          },
          init: function () {
            if (!q && !B) {
              var e;
              (h.framework = f),
                (h.template = m),
                (h.bg = f.getChildByClass(m, "pswp__bg")),
                (pe = m.className),
                (q = !0),
                (ge = f.detectFeatures()),
                (ue = ge.raf),
                (de = ge.caf),
                (se = ge.transform),
                (fe = ge.oldIE),
                (h.scrollWrap = f.getChildByClass(m, "pswp__scroll-wrap")),
                (h.container = f.getChildByClass(
                  h.scrollWrap,
                  "pswp__container"
                )),
                (K = h.container.style),
                (h.itemHolders = te =
                  [
                    { el: h.container.children[0], wrap: 0, index: -1 },
                    { el: h.container.children[1], wrap: 0, index: -1 },
                    { el: h.container.children[2], wrap: 0, index: -1 },
                  ]),
                (te[0].el.style.display = te[2].el.style.display = "none"),
                (function () {
                  if (se) {
                    var e = ge.perspective && !ce;
                    return (
                      (Q = "translate" + (e ? "3d(" : "(")),
                      ($ = ge.perspective ? ", 0px)" : ")")
                    );
                  }
                  (se = "left"),
                    f.addClass(m, "pswp--ie"),
                    (ot = function (e, t) {
                      t.left = e + "px";
                    }),
                    (nt = function (e) {
                      var t = 1 < e.fitRatio ? 1 : e.fitRatio,
                        n = e.container.style,
                        o = t * e.w,
                        t = t * e.h;
                      (n.width = o + "px"),
                        (n.height = t + "px"),
                        (n.left = e.initialPosition.x + "px"),
                        (n.top = e.initialPosition.y + "px");
                    }),
                    (tt = function () {
                      var e, t, n, o;
                      Fe &&
                        ((e = Fe),
                        (n =
                          (t = 1 < (o = h.currItem).fitRatio ? 1 : o.fitRatio) *
                          o.w),
                        (o = t * o.h),
                        (e.width = n + "px"),
                        (e.height = o + "px"),
                        (e.left = Ke.x + "px"),
                        (e.top = Ke.y + "px"));
                    });
                })(),
                (G = {
                  resize: h.updateSize,
                  orientationchange: function () {
                    clearTimeout(ve),
                      (ve = setTimeout(function () {
                        We.x !== h.scrollWrap.clientWidth && h.updateSize();
                      }, 500));
                  },
                  scroll: T,
                  keydown: I,
                  click: C,
                });
              var t = ge.isOldIOSPhone || ge.isOldAndroid || ge.isMobileOpera;
              for (
                (ge.animationName && ge.transform && !t) ||
                  (g.showAnimationDuration = g.hideAnimationDuration = 0),
                  e = 0;
                e < Qe.length;
                e++
              )
                h["init" + Qe[e]]();
              n && (h.ui = new n(h, f)).init(),
                v("firstUpdate"),
                (U = U || g.index || 0),
                (isNaN(U) || U < 0 || U >= jt()) && (U = 0),
                (h.currItem = Wt(U)),
                (ge.isOldIOSPhone || ge.isOldAndroid) && (Xe = !1),
                m.setAttribute("aria-hidden", "false"),
                g.modal &&
                  (Xe
                    ? (m.style.position = "fixed")
                    : ((m.style.position = "absolute"),
                      (m.style.top = f.getScrollY() + "px"))),
                void 0 === he &&
                  (v("initialLayout"), (he = me = f.getScrollY()));
              t = "pswp--open ";
              for (
                g.mainClass && (t += g.mainClass + " "),
                  g.showHideOpacity && (t += "pswp--animate_opacity "),
                  t += ce ? "pswp--touch" : "pswp--notouch",
                  t += ge.animationName ? " pswp--css_animation" : "",
                  t += ge.svg ? " pswp--svg" : "",
                  f.addClass(m, t),
                  h.updateSize(),
                  W = -1,
                  Ve = null,
                  e = 0;
                e < 3;
                e++
              )
                ot((e + W) * Ge.x, te[e].el.style);
              fe || f.bind(h.scrollWrap, Y, h),
                r("initialZoomInEnd", function () {
                  h.setContent(te[0], U - 1),
                    h.setContent(te[2], U + 1),
                    (te[0].el.style.display = te[2].el.style.display = "block"),
                    g.focus && m.focus(),
                    f.bind(document, "keydown", h),
                    ge.transform && f.bind(h.scrollWrap, "click", h),
                    g.mouseUsed || f.bind(document, "mousemove", rt),
                    f.bind(window, "resize scroll orientationchange", h),
                    v("bindEvents");
                }),
                h.setContent(te[1], U),
                h.updateCurrItem(),
                v("afterInit"),
                Xe ||
                  (J = setInterval(function () {
                    st ||
                      Ce ||
                      _e ||
                      V !== h.currItem.initialZoomLevel ||
                      h.updateSize();
                  }, 1e3)),
                f.addClass(m, "pswp--visible");
            }
          },
          close: function () {
            q &&
              ((B = !(q = !1)),
              v("close"),
              f.unbind(window, "resize scroll orientationchange", h),
              f.unbind(window, "scroll", G.scroll),
              f.unbind(document, "keydown", h),
              f.unbind(document, "mousemove", rt),
              ge.transform && f.unbind(h.scrollWrap, "click", h),
              Ce && f.unbind(window, j, h),
              clearTimeout(ve),
              v("unbindEvents"),
              Yt(h.currItem, null, !0, h.destroy));
          },
          destroy: function () {
            v("destroy"),
              Bt && clearTimeout(Bt),
              m.setAttribute("aria-hidden", "true"),
              (m.className = pe),
              J && clearInterval(J),
              f.unbind(h.scrollWrap, Y, h),
              f.unbind(window, "scroll", h),
              It(),
              A(),
              (et = null);
          },
          panTo: function (e, t, n) {
            n ||
              (e > Oe.min.x ? (e = Oe.min.x) : e < Oe.max.x && (e = Oe.max.x),
              t > Oe.min.y ? (t = Oe.min.y) : t < Oe.max.y && (t = Oe.max.y)),
              (Ke.x = e),
              (Ke.y = t),
              tt();
          },
          handleEvent: function (e) {
            (e = e || window.event), G[e.type] && G[e.type](e);
          },
          goTo: function (e) {
            var t = (e = a(e)) - U;
            (Ve = t),
              (U = e),
              (h.currItem = Wt(U)),
              (je -= t),
              d(Ge.x * je),
              A(),
              (Re = !1),
              h.updateCurrItem();
          },
          next: function () {
            h.goTo(U + 1);
          },
          prev: function () {
            h.goTo(U - 1);
          },
          updateCurrZoomItem: function (e) {
            var t;
            e && v("beforeChange", 0),
              (Fe = te[1].el.children.length
                ? ((t = te[1].el.children[0]),
                  f.hasClass(t, "pswp__zoom-wrap") ? t.style : null)
                : null),
              (Oe = h.currItem.bounds),
              (X = V = h.currItem.initialZoomLevel),
              (Ke.x = Oe.center.x),
              (Ke.y = Oe.center.y),
              e && v("afterChange");
          },
          invalidateCurrItems: function () {
            ee = !0;
            for (var e = 0; e < 3; e++)
              te[e].item && (te[e].item.needsUpdate = !0);
          },
          updateCurrItem: function (e) {
            if (0 !== Ve) {
              var t,
                n = Math.abs(Ve);
              if (!(e && n < 2)) {
                (h.currItem = Wt(U)),
                  (Je = !1),
                  v("beforeChange", Ve),
                  3 <= n && ((W += Ve + (0 < Ve ? -3 : 3)), (n = 3));
                for (var o = 0; o < n; o++)
                  0 < Ve
                    ? ((t = te.shift()),
                      (te[2] = t),
                      ot((++W + 2) * Ge.x, t.el.style),
                      h.setContent(t, U - n + o + 1 + 1))
                    : ((t = te.pop()),
                      te.unshift(t),
                      ot(--W * Ge.x, t.el.style),
                      h.setContent(t, U + n - o - 1 - 1));
                !Fe ||
                  1 !== Math.abs(Ve) ||
                  ((e = Wt(ne)).initialZoomLevel !== V &&
                    (Qt(e, We), $t(e), nt(e))),
                  (Ve = 0),
                  h.updateCurrZoomItem(),
                  (ne = U),
                  v("afterChange");
              }
            }
          },
          updateSize: function (e) {
            if (!Xe && g.modal) {
              var t = f.getScrollY();
              if (
                (he !== t && ((m.style.top = t + "px"), (he = t)),
                !e && $e.x === window.innerWidth && $e.y === window.innerHeight)
              )
                return;
              ($e.x = window.innerWidth),
                ($e.y = window.innerHeight),
                (m.style.height = $e.y + "px");
            }
            if (
              ((We.x = h.scrollWrap.clientWidth),
              (We.y = h.scrollWrap.clientHeight),
              T(),
              (Ge.x = We.x + Math.round(We.x * g.spacing)),
              (Ge.y = We.y),
              d(Ge.x * je),
              v("beforeResize"),
              void 0 !== W)
            ) {
              for (var n, o, i, r = 0; r < 3; r++)
                (n = te[r]),
                  ot((r + W) * Ge.x, n.el.style),
                  (i = U + r - 1),
                  g.loop && 2 < jt() && (i = a(i)),
                  (o = Wt(i)) && (ee || o.needsUpdate || !o.bounds)
                    ? (h.cleanSlide(o),
                      h.setContent(n, i),
                      1 === r && ((h.currItem = o), h.updateCurrZoomItem(!0)),
                      (o.needsUpdate = !1))
                    : -1 === n.index && 0 <= i && h.setContent(n, i),
                  o && o.container && (Qt(o, We), $t(o), nt(o));
              ee = !1;
            }
            (X = V = h.currItem.initialZoomLevel),
              (Oe = h.currItem.bounds) &&
                ((Ke.x = Oe.center.x), (Ke.y = Oe.center.y), tt(!0)),
              v("resize");
          },
          zoomTo: function (t, e, n, o, i) {
            e &&
              ((X = V),
              (bt.x = Math.abs(e.x) - Ke.x),
              (bt.y = Math.abs(e.y) - Ke.y),
              w(Ue, Ke));
            var e = p(t, !1),
              r = {};
            E("x", e, r, t), E("y", e, r, t);
            var a = V,
              s = Ke.x,
              l = Ke.y;
            c(r);
            e = function (e) {
              1 === e
                ? ((V = t), (Ke.x = r.x), (Ke.y = r.y))
                : ((V = (t - a) * e + a),
                  (Ke.x = (r.x - s) * e + s),
                  (Ke.y = (r.y - l) * e + l)),
                i && i(e),
                tt(1 === e);
            };
            n ? L("customZoomTo", 0, 1, n, o || f.easing.sine.inOut, e) : e(1);
          },
        },
        lt = {},
        ct = {},
        ut = {},
        dt = {},
        pt = {},
        mt = [],
        ft = {},
        ht = [],
        gt = {},
        vt = 0,
        yt = o(),
        wt = 0,
        xt = o(),
        bt = o(),
        Et = o(),
        It = function () {
          Ae && (de(Ae), (Ae = null));
        },
        Ct = function () {
          Ce && ((Ae = ue(Ct)), Dt());
        },
        Tt = function (e, t) {
          return (
            !(!e || e === document) &&
            !(
              e.getAttribute("class") &&
              -1 < e.getAttribute("class").indexOf("pswp__scroll-wrap")
            ) &&
            (t(e) ? e : Tt(e.parentNode, t))
          );
        },
        St = {},
        kt = {},
        At = {},
        Lt = [],
        Dt = function () {
          if (De) {
            var e = De.length;
            if (0 !== e)
              if (
                (w(lt, De[0]),
                (ut.x = lt.x - dt.x),
                (ut.y = lt.y - dt.y),
                _e && 1 < e)
              )
                (dt.x = lt.x),
                  (dt.y = lt.y),
                  (ut.x ||
                    ut.y ||
                    ((r = De[1]), (a = ct), r.x !== a.x || r.y !== a.y)) &&
                    (w(ct, De[1]),
                    Se || ((Se = !0), v("zoomGestureStarted")),
                    (o = D(lt, ct)),
                    (i = Ft(o)) >
                      h.currItem.initialZoomLevel +
                        h.currItem.initialZoomLevel / 15 && (qe = !0),
                    (n = 1),
                    (e = x()),
                    (r = b()),
                    i < e
                      ? g.pinchToClose &&
                        !qe &&
                        X <= h.currItem.initialZoomLevel
                        ? (y((a = 1 - (e - i) / (e / 1.2))),
                          v("onPinchClose", a),
                          (ze = !0))
                        : (i =
                            e - (n = 1 < (n = (e - i) / e) ? 1 : n) * (e / 3))
                      : r < i &&
                        (i = r + (n = 1 < (n = (i - r) / (6 * e)) ? 1 : n) * e),
                    n < 0 && (n = 0),
                    O(lt, ct, yt),
                    (He.x += yt.x - Et.x),
                    (He.y += yt.y - Et.y),
                    w(Et, yt),
                    (Ke.x = l("x", i)),
                    (Ke.y = l("y", i)),
                    (be = V < i),
                    (V = i),
                    tt());
              else if (
                Pe &&
                (Ze &&
                  ((Ze = !1),
                  10 <= Math.abs(ut.x) && (ut.x -= De[0].x - pt.x),
                  10 <= Math.abs(ut.y) && (ut.y -= De[0].y - pt.y)),
                (dt.x = lt.x),
                (dt.y = lt.y),
                0 !== ut.x || 0 !== ut.y)
              ) {
                if (
                  "v" === Pe &&
                  g.closeOnVerticalDrag &&
                  "fit" === g.scaleMode &&
                  V === h.currItem.initialZoomLevel
                ) {
                  (He.y += ut.y), (Ke.y += ut.y);
                  var t = F();
                  return (Ee = !0), v("onVerticalDrag", t), y(t), void tt();
                }
                (n = u()),
                  (o = lt.x),
                  (i = lt.y),
                  50 < n - we &&
                    (((t = 2 < ht.length ? ht.shift() : {}).x = o),
                    (t.y = i),
                    ht.push(t),
                    (we = n)),
                  (ke = !0),
                  (Oe = h.currItem.bounds),
                  P("x", ut) || (P("y", ut), c(Ke), tt());
              }
          }
          var n, o, i, r, a;
        },
        _t = function () {
          var t,
            n,
            o = {
              lastFlickOffset: {},
              lastFlickDist: {},
              lastFlickSpeed: {},
              slowDownRatio: {},
              slowDownRatioReverse: {},
              speedDecelerationRatio: {},
              speedDecelerationRatioAbs: {},
              distanceOffset: {},
              backAnimDestination: {},
              backAnimStarted: {},
              calculateSwipeSpeed: function (e) {
                (n =
                  1 < ht.length
                    ? ((t = u() - we + 50), ht[ht.length - 2][e])
                    : ((t = u() - ye), pt[e])),
                  (o.lastFlickOffset[e] = dt[e] - n),
                  (o.lastFlickDist[e] = Math.abs(o.lastFlickOffset[e])),
                  20 < o.lastFlickDist[e]
                    ? (o.lastFlickSpeed[e] = o.lastFlickOffset[e] / t)
                    : (o.lastFlickSpeed[e] = 0),
                  Math.abs(o.lastFlickSpeed[e]) < 0.1 &&
                    (o.lastFlickSpeed[e] = 0),
                  (o.slowDownRatio[e] = 0.95),
                  (o.slowDownRatioReverse[e] = 1 - o.slowDownRatio[e]),
                  (o.speedDecelerationRatio[e] = 1);
              },
              calculateOverBoundsAnimOffset: function (t, e) {
                o.backAnimStarted[t] ||
                  (Ke[t] > Oe.min[t]
                    ? (o.backAnimDestination[t] = Oe.min[t])
                    : Ke[t] < Oe.max[t] &&
                      (o.backAnimDestination[t] = Oe.max[t]),
                  void 0 !== o.backAnimDestination[t] &&
                    ((o.slowDownRatio[t] = 0.7),
                    (o.slowDownRatioReverse[t] = 1 - o.slowDownRatio[t]),
                    o.speedDecelerationRatioAbs[t] < 0.05 &&
                      ((o.lastFlickSpeed[t] = 0),
                      (o.backAnimStarted[t] = !0),
                      L(
                        "bounceZoomPan" + t,
                        Ke[t],
                        o.backAnimDestination[t],
                        e || 300,
                        f.easing.sine.out,
                        function (e) {
                          (Ke[t] = e), tt();
                        }
                      ))));
              },
              calculateAnimOffset: function (e) {
                o.backAnimStarted[e] ||
                  ((o.speedDecelerationRatio[e] =
                    o.speedDecelerationRatio[e] *
                    (o.slowDownRatio[e] +
                      o.slowDownRatioReverse[e] -
                      (o.slowDownRatioReverse[e] * o.timeDiff) / 10)),
                  (o.speedDecelerationRatioAbs[e] = Math.abs(
                    o.lastFlickSpeed[e] * o.speedDecelerationRatio[e]
                  )),
                  (o.distanceOffset[e] =
                    o.lastFlickSpeed[e] *
                    o.speedDecelerationRatio[e] *
                    o.timeDiff),
                  (Ke[e] += o.distanceOffset[e]));
              },
              panAnimLoop: function () {
                if (
                  at.zoomPan &&
                  ((at.zoomPan.raf = ue(o.panAnimLoop)),
                  (o.now = u()),
                  (o.timeDiff = o.now - o.lastNow),
                  (o.lastNow = o.now),
                  o.calculateAnimOffset("x"),
                  o.calculateAnimOffset("y"),
                  tt(),
                  o.calculateOverBoundsAnimOffset("x"),
                  o.calculateOverBoundsAnimOffset("y"),
                  o.speedDecelerationRatioAbs.x < 0.05 &&
                    o.speedDecelerationRatioAbs.y < 0.05)
                )
                  return (
                    (Ke.x = Math.round(Ke.x)),
                    (Ke.y = Math.round(Ke.y)),
                    tt(),
                    void S("zoomPan")
                  );
              },
            };
          return o;
        },
        Mt = function (e) {
          return (
            e.calculateSwipeSpeed("y"),
            (Oe = h.currItem.bounds),
            (e.backAnimDestination = {}),
            (e.backAnimStarted = {}),
            Math.abs(e.lastFlickSpeed.x) <= 0.05 &&
            Math.abs(e.lastFlickSpeed.y) <= 0.05
              ? ((e.speedDecelerationRatioAbs.x =
                  e.speedDecelerationRatioAbs.y =
                    0),
                e.calculateOverBoundsAnimOffset("x"),
                e.calculateOverBoundsAnimOffset("y"),
                !0)
              : (k("zoomPan"), (e.lastNow = u()), void e.panAnimLoop())
          );
        },
        Ot = function (e, t) {
          var n, o;
          Re || (vt = U),
            "swipe" === e &&
              ((o = dt.x - pt.x),
              (e = t.lastFlickDist.x < 10),
              30 < o && (e || 20 < t.lastFlickOffset.x)
                ? (r = -1)
                : o < -30 && (e || t.lastFlickOffset.x < -20) && (r = 1)),
            r &&
              ((U += r) < 0
                ? ((U = g.loop ? jt() - 1 : 0), (i = !0))
                : U >= jt() && ((U = g.loop ? 0 : jt() - 1), (i = !0)),
              (i && !g.loop) || ((Ve += r), (je -= r), (n = !0)));
          var i = Ge.x * je,
            r = Math.abs(i - xt.x),
            a =
              n || i > xt.x == 0 < t.lastFlickSpeed.x
                ? ((a =
                    0 < Math.abs(t.lastFlickSpeed.x)
                      ? r / Math.abs(t.lastFlickSpeed.x)
                      : 333),
                  (a = Math.min(a, 400)),
                  Math.max(a, 250))
                : 333;
          return (
            vt === U && (n = !1),
            (Re = !0),
            v("mainScrollAnimStart"),
            L("mainScroll", xt.x, i, a, f.easing.cubic.out, d, function () {
              A(),
                (Re = !1),
                (vt = -1),
                (!n && vt === U) || h.updateCurrItem(),
                v("mainScrollAnimComplete");
            }),
            n && h.updateCurrItem(!0),
            n
          );
        },
        Ft = function (e) {
          return (1 / Me) * e * X;
        },
        Rt = function () {
          var e = V,
            t = x(),
            n = b();
          V < t ? (e = t) : n < V && (e = n);
          var o,
            i = Ne;
          return (
            ze && !be && !qe && V < t
              ? h.close()
              : (ze &&
                  (o = function (e) {
                    y((1 - i) * e + i);
                  }),
                h.zoomTo(e, 0, 200, f.easing.cubic.out, o)),
            !0
          );
        };
      i("Gestures", {
        publicMethods: {
          initGestures: function () {
            function e(e, t, n, o, i) {
              (oe = e + t), (ie = e + n), (re = e + o), (ae = i ? e + i : "");
            }
            (le = ge.pointerEvent) && ge.touch && (ge.touch = !1),
              le
                ? navigator.msPointerEnabled
                  ? e("MSPointer", "Down", "Move", "Up", "Cancel")
                  : e("pointer", "down", "move", "up", "cancel")
                : ge.touch
                ? (e("touch", "start", "move", "end", "cancel"), (ce = !0))
                : e("mouse", "down", "move", "up"),
              (j = ie + " " + re + " " + ae),
              (Y = oe),
              le &&
                !ce &&
                (ce =
                  1 < navigator.maxTouchPoints ||
                  1 < navigator.msMaxTouchPoints),
              (h.likelyTouchDevice = ce),
              (G[oe] = Z),
              (G[ie] = z),
              (G[re] = N),
              ae && (G[ae] = G[re]),
              ge.touch &&
                ((Y += " mousedown"),
                (j += " mousemove mouseup"),
                (G.mousedown = G[oe]),
                (G.mousemove = G[ie]),
                (G.mouseup = G[re])),
              ce || (g.allowPanToNext = !1);
          },
        },
      });
      function Pt() {
        return {
          center: { x: 0, y: 0 },
          max: { x: 0, y: 0 },
          min: { x: 0, y: 0 },
        };
      }
      function Zt(e, t, n, o, i, r) {
        t.loadError ||
          (o &&
            ((t.imageAppended = !0),
            $t(t, o, t === h.currItem && Je),
            n.appendChild(o),
            r &&
              setTimeout(function () {
                t &&
                  t.loaded &&
                  t.placeholder &&
                  ((t.placeholder.style.display = "none"),
                  (t.placeholder = null));
              }, 500)));
      }
      function zt(e) {
        function t() {
          (e.loading = !1),
            (e.loaded = !0),
            e.loadComplete ? e.loadComplete(e) : (e.img = null),
            (n.onload = n.onerror = null),
            (n = null);
        }
        (e.loading = !0), (e.loaded = !1);
        var n = (e.img = f.createEl("pswp__img", "img"));
        return (
          (n.onload = t),
          (n.onerror = function () {
            (e.loadError = !0), t();
          }),
          (n.src = e.src),
          n
        );
      }
      function Nt(e, t) {
        return (
          e.src &&
          e.loadError &&
          e.container &&
          (t && (e.container.innerHTML = ""),
          (e.container.innerHTML = g.errorMsg.replace("%url%", e.src)),
          1)
        );
      }
      function qt() {
        if (Vt.length) {
          for (var e, t = 0; t < Vt.length; t++)
            (e = Vt[t]).holder.index === e.index &&
              Zt(e.index, e.item, e.baseDiv, e.img, 0, e.clearPlaceholder);
          Vt = [];
        }
      }
      var Bt,
        Ht,
        Ut,
        Kt,
        Wt,
        jt,
        Yt = function (a, e, s, t) {
          var l;
          Bt && clearTimeout(Bt),
            (Ut = Kt = !0),
            a.initialLayout
              ? ((l = a.initialLayout), (a.initialLayout = null))
              : (l = g.getThumbBoundsFn && g.getThumbBoundsFn(U));
          function c() {
            S("initialZoom"),
              s
                ? (h.template.removeAttribute("style"),
                  h.bg.removeAttribute("style"))
                : (y(1),
                  e && (e.style.display = "block"),
                  f.addClass(m, "pswp--animated-in"),
                  v("initialZoom" + (s ? "OutEnd" : "InEnd"))),
              t && t(),
              (Kt = !1);
          }
          var u = s ? g.hideAnimationDuration : g.showAnimationDuration;
          if (!u || !l || void 0 === l.x)
            return (
              v("initialZoom" + (s ? "Out" : "In")),
              (V = a.initialZoomLevel),
              w(Ke, a.initialPosition),
              tt(),
              (m.style.opacity = s ? 0 : 1),
              y(1),
              void (u
                ? setTimeout(function () {
                    c();
                  }, u)
                : c())
            );
          var d, p;
          (d = H),
            (p = !h.currItem.src || h.currItem.loadError || g.showHideOpacity),
            a.miniImg && (a.miniImg.style.webkitBackfaceVisibility = "hidden"),
            s ||
              ((V = l.w / a.w),
              (Ke.x = l.x),
              (Ke.y = l.y - me),
              (h[p ? "template" : "bg"].style.opacity = 0.001),
              tt()),
            k("initialZoom"),
            s && !d && f.removeClass(m, "pswp--animated-in"),
            p &&
              (s
                ? f[(d ? "remove" : "add") + "Class"](
                    m,
                    "pswp--animate_opacity"
                  )
                : setTimeout(function () {
                    f.addClass(m, "pswp--animate_opacity");
                  }, 30)),
            (Bt = setTimeout(
              function () {
                var t, n, o, i, r, e;
                v("initialZoom" + (s ? "Out" : "In")),
                  s
                    ? ((t = l.w / a.w),
                      (n = Ke.x),
                      (o = Ke.y),
                      (i = V),
                      (r = Ne),
                      (e = function (e) {
                        1 === e
                          ? ((V = t), (Ke.x = l.x), (Ke.y = l.y - he))
                          : ((V = (t - i) * e + i),
                            (Ke.x = (l.x - n) * e + n),
                            (Ke.y = (l.y - he - o) * e + o)),
                          tt(),
                          p ? (m.style.opacity = 1 - e) : y(r - e * r);
                      }),
                      d
                        ? L("initialZoom", 0, 1, u, f.easing.cubic.out, e, c)
                        : (e(1), (Bt = setTimeout(c, u + 20))))
                    : ((V = a.initialZoomLevel),
                      w(Ke, a.initialPosition),
                      tt(),
                      y(1),
                      p ? (m.style.opacity = 1) : y(1),
                      (Bt = setTimeout(c, u + 20)));
              },
              s ? 25 : 90
            ));
        },
        Gt = {},
        Vt = [],
        Xt = {
          index: 0,
          errorMsg:
            '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
          forceProgressiveLoading: !1,
          preload: [1, 1],
          getNumItemsFn: function () {
            return Ht.length;
          },
        },
        Qt = function (e, t, n) {
          if (!e.src || e.loadError)
            return (
              (e.w = e.h = 0),
              (e.initialZoomLevel = e.fitRatio = 1),
              (e.bounds = Pt()),
              (e.initialPosition = e.bounds.center),
              e.bounds
            );
          var o,
            i,
            r,
            a = !n;
          return (
            a &&
              (e.vGap || (e.vGap = { top: 0, bottom: 0 }),
              v("parseVerticalMargin", e)),
            (Gt.x = t.x),
            (Gt.y = t.y - e.vGap.top - e.vGap.bottom),
            a &&
              ((o = Gt.x / e.w),
              (i = Gt.y / e.h),
              (e.fitRatio = o < i ? o : i),
              "orig" === (r = g.scaleMode)
                ? (n = 1)
                : "fit" === r && (n = e.fitRatio),
              1 < n && (n = 1),
              (e.initialZoomLevel = n),
              e.bounds || (e.bounds = Pt())),
            n
              ? ((o = (t = e).w * n),
                (i = e.h * n),
                ((r = t.bounds).center.x = Math.round((Gt.x - o) / 2)),
                (r.center.y = Math.round((Gt.y - i) / 2) + t.vGap.top),
                (r.max.x = o > Gt.x ? Math.round(Gt.x - o) : r.center.x),
                (r.max.y =
                  i > Gt.y ? Math.round(Gt.y - i) + t.vGap.top : r.center.y),
                (r.min.x = o > Gt.x ? 0 : r.center.x),
                (r.min.y = i > Gt.y ? t.vGap.top : r.center.y),
                a &&
                  n === e.initialZoomLevel &&
                  (e.initialPosition = e.bounds.center),
                e.bounds)
              : void 0
          );
        },
        $t = function (e, t, n) {
          var o;
          e.src &&
            ((t = t || e.container.lastChild),
            (o = n ? e.w : Math.round(e.w * e.fitRatio)),
            (n = n ? e.h : Math.round(e.h * e.fitRatio)),
            e.placeholder &&
              !e.loaded &&
              ((e.placeholder.style.width = o + "px"),
              (e.placeholder.style.height = n + "px")),
            (t.style.width = o + "px"),
            (t.style.height = n + "px"));
        };
      i("Controller", {
        publicMethods: {
          lazyLoadItem: function (e) {
            e = a(e);
            var t = Wt(e);
            t &&
              ((!t.loaded && !t.loading) || ee) &&
              (v("gettingData", e, t), t.src && zt(t));
          },
          initController: function () {
            f.extend(g, Xt, !0),
              (h.items = Ht = e),
              (Wt = h.getItemAt),
              (jt = g.getNumItemsFn),
              g.loop,
              jt() < 3 && (g.loop = !1),
              r("beforeChange", function (e) {
                for (
                  var t = g.preload,
                    n = null === e || 0 <= e,
                    o = Math.min(t[0], jt()),
                    i = Math.min(t[1], jt()),
                    r = 1;
                  r <= (n ? i : o);
                  r++
                )
                  h.lazyLoadItem(U + r);
                for (r = 1; r <= (n ? o : i); r++) h.lazyLoadItem(U - r);
              }),
              r("initialLayout", function () {
                h.currItem.initialLayout =
                  g.getThumbBoundsFn && g.getThumbBoundsFn(U);
              }),
              r("mainScrollAnimComplete", qt),
              r("initialZoomInEnd", qt),
              r("destroy", function () {
                for (var e, t = 0; t < Ht.length; t++)
                  (e = Ht[t]).container && (e.container = null),
                    e.placeholder && (e.placeholder = null),
                    e.img && (e.img = null),
                    e.preloader && (e.preloader = null),
                    e.loadError && (e.loaded = e.loadError = !1);
                Vt = null;
              });
          },
          getItemAt: function (e) {
            return 0 <= e && void 0 !== Ht[e] && Ht[e];
          },
          allowProgressiveImg: function () {
            return (
              g.forceProgressiveLoading ||
              !ce ||
              g.mouseUsed ||
              1200 < screen.width
            );
          },
          setContent: function (t, n) {
            g.loop && (n = a(n));
            var e = h.getItemAt(t.index);
            e && (e.container = null);
            var o,
              i,
              r = h.getItemAt(n);
            r
              ? (v("gettingData", n, r),
                (t.index = n),
                (i = (t.item = r).container = f.createEl("pswp__zoom-wrap")),
                !r.src &&
                  r.html &&
                  (r.html.tagName
                    ? i.appendChild(r.html)
                    : (i.innerHTML = r.html)),
                Nt(r),
                Qt(r, We),
                !r.src || r.loadError || r.loaded
                  ? r.src &&
                    !r.loadError &&
                    (((o = f.createEl("pswp__img", "img")).style.opacity = 1),
                    (o.src = r.src),
                    $t(r, o),
                    Zt(0, r, i, o))
                  : ((r.loadComplete = function (e) {
                      if (q) {
                        if (t && t.index === n) {
                          if (Nt(e, !0))
                            return (
                              (e.loadComplete = e.img = null),
                              Qt(e, We),
                              nt(e),
                              void (t.index === U && h.updateCurrZoomItem())
                            );
                          e.imageAppended
                            ? !Kt &&
                              e.placeholder &&
                              ((e.placeholder.style.display = "none"),
                              (e.placeholder = null))
                            : ge.transform && (Re || Kt)
                            ? Vt.push({
                                item: e,
                                baseDiv: i,
                                img: e.img,
                                index: n,
                                holder: t,
                                clearPlaceholder: !0,
                              })
                            : Zt(0, e, i, e.img, 0, !0);
                        }
                        (e.loadComplete = null),
                          (e.img = null),
                          v("imageLoadComplete", n, e);
                      }
                    }),
                    f.features.transform &&
                      ((e = "pswp__img pswp__img--placeholder"),
                      (e += r.msrc ? "" : " pswp__img--placeholder--blank"),
                      (e = f.createEl(e, r.msrc ? "img" : "")),
                      r.msrc && (e.src = r.msrc),
                      $t(r, e),
                      i.appendChild(e),
                      (r.placeholder = e)),
                    r.loading || zt(r),
                    h.allowProgressiveImg() &&
                      (!Ut && ge.transform
                        ? Vt.push({
                            item: r,
                            baseDiv: i,
                            img: r.img,
                            index: n,
                            holder: t,
                          })
                        : Zt(0, r, i, r.img, 0, !0))),
                Ut || n !== U ? nt(r) : ((Fe = i.style), Yt(r, o || r.img)),
                (t.el.innerHTML = ""),
                t.el.appendChild(i))
              : (t.el.innerHTML = "");
          },
          cleanSlide: function (e) {
            e.img && (e.img.onload = e.img.onerror = null),
              (e.loaded = e.loading = e.img = e.imageAppended = !1);
          },
        },
      });
      function Jt(e, t, n) {
        var o = document.createEvent("CustomEvent"),
          n = {
            origEvent: e,
            target: e.target,
            releasePoint: t,
            pointerType: n || "touch",
          };
        o.initCustomEvent("pswpTap", !0, !0, n), e.target.dispatchEvent(o);
      }
      var en,
        tn,
        nn = {};
      i("Tap", {
        publicMethods: {
          initTap: function () {
            r("firstTouchStart", h.onTapStart),
              r("touchRelease", h.onTapRelease),
              r("destroy", function () {
                (nn = {}), (en = null);
              });
          },
          onTapStart: function (e) {
            1 < e.length && (clearTimeout(en), (en = null));
          },
          onTapRelease: function (e, t) {
            var n, o, i;
            !t ||
              ke ||
              Te ||
              st ||
              ((n = t),
              en &&
              (clearTimeout(en),
              (en = null),
              (o = n),
              (i = nn),
              Math.abs(o.x - i.x) < 25 && Math.abs(o.y - i.y) < 25)
                ? v("doubleTap", n)
                : "mouse" !== t.type
                ? "BUTTON" === e.target.tagName.toUpperCase() ||
                  f.hasClass(e.target, "pswp__single-tap")
                  ? Jt(e, t)
                  : (w(nn, n),
                    (en = setTimeout(function () {
                      Jt(e, t), (en = null);
                    }, 300)))
                : Jt(e, t, "mouse"));
          },
        },
      }),
        i("DesktopZoom", {
          publicMethods: {
            initDesktopZoom: function () {
              fe ||
                (ce
                  ? r("mouseUsed", function () {
                      h.setupDesktopZoom();
                    })
                  : h.setupDesktopZoom(!0));
            },
            setupDesktopZoom: function (e) {
              tn = {};
              var t = "wheel mousewheel DOMMouseScroll";
              r("bindEvents", function () {
                f.bind(m, t, h.handleMouseWheel);
              }),
                r("unbindEvents", function () {
                  tn && f.unbind(m, t, h.handleMouseWheel);
                }),
                (h.mouseZoomedIn = !1);
              function n() {
                h.mouseZoomedIn &&
                  (f.removeClass(m, "pswp--zoomed-in"), (h.mouseZoomedIn = !1)),
                  V < 1
                    ? f.addClass(m, "pswp--zoom-allowed")
                    : f.removeClass(m, "pswp--zoom-allowed"),
                  i();
              }
              var o,
                i = function () {
                  o && (f.removeClass(m, "pswp--dragging"), (o = !1));
                };
              r("resize", n),
                r("afterChange", n),
                r("pointerDown", function () {
                  h.mouseZoomedIn &&
                    ((o = !0), f.addClass(m, "pswp--dragging"));
                }),
                r("pointerUp", i),
                e || n();
            },
            handleMouseWheel: function (e) {
              if (V <= h.currItem.fitRatio)
                return (
                  g.modal &&
                    (!g.closeOnScroll || st || Ce
                      ? e.preventDefault()
                      : se && 2 < Math.abs(e.deltaY) && ((H = !0), h.close())),
                  !0
                );
              if ((e.stopPropagation(), (tn.x = 0), "deltaX" in e))
                1 === e.deltaMode
                  ? ((tn.x = 18 * e.deltaX), (tn.y = 18 * e.deltaY))
                  : ((tn.x = e.deltaX), (tn.y = e.deltaY));
              else if ("wheelDelta" in e)
                e.wheelDeltaX && (tn.x = -0.16 * e.wheelDeltaX),
                  e.wheelDeltaY
                    ? (tn.y = -0.16 * e.wheelDeltaY)
                    : (tn.y = -0.16 * e.wheelDelta);
              else {
                if (!("detail" in e)) return;
                tn.y = e.detail;
              }
              p(V, !0);
              var t = Ke.x - tn.x,
                n = Ke.y - tn.y;
              (g.modal ||
                (t <= Oe.min.x &&
                  t >= Oe.max.x &&
                  n <= Oe.min.y &&
                  n >= Oe.max.y)) &&
                e.preventDefault(),
                h.panTo(t, n);
            },
            toggleDesktopZoom: function (e) {
              e = e || { x: We.x / 2 + Ye.x, y: We.y / 2 + Ye.y };
              var t = g.getDoubleTapZoom(!0, h.currItem),
                n = V === t;
              (h.mouseZoomedIn = !n),
                h.zoomTo(n ? h.currItem.initialZoomLevel : t, e, 333),
                f[(n ? "remove" : "add") + "Class"](m, "pswp--zoomed-in");
            },
          },
        });
      function on() {
        return vn.hash.substring(1);
      }
      function rn() {
        sn && clearTimeout(sn), cn && clearTimeout(cn);
      }
      function an() {
        var e = on(),
          t = {};
        if (e.length < 5) return t;
        var n,
          o = e.split("&");
        for (r = 0; r < o.length; r++)
          o[r] && ((n = o[r].split("=")).length < 2 || (t[n[0]] = n[1]));
        if (g.galleryPIDs) {
          for (var i = t.pid, r = (t.pid = 0); r < Ht.length; r++)
            if (Ht[r].pid === i) {
              t.pid = r;
              break;
            }
        } else t.pid = parseInt(t.pid, 10) - 1;
        return t.pid < 0 && (t.pid = 0), t;
      }
      var sn,
        ln,
        cn,
        un,
        dn,
        pn,
        mn,
        fn,
        hn,
        gn,
        vn,
        yn,
        wn = { history: !0, galleryUID: 1 },
        xn = function () {
          var e, t;
          cn && clearTimeout(cn),
            st || Ce
              ? (cn = setTimeout(xn, 500))
              : (un ? clearTimeout(ln) : (un = !0),
                (t = U + 1),
                (e = Wt(U)).hasOwnProperty("pid") && (t = e.pid),
                (e = mn + "&gid=" + g.galleryUID + "&pid=" + t),
                fn || (-1 === vn.hash.indexOf(e) && (gn = !0)),
                (t = vn.href.split("#")[0] + "#" + e),
                yn
                  ? "#" + e !== window.location.hash &&
                    history[fn ? "replaceState" : "pushState"](
                      "",
                      document.title,
                      t
                    )
                  : fn
                  ? vn.replace(t)
                  : (vn.hash = e),
                (fn = !0),
                (ln = setTimeout(function () {
                  un = !1;
                }, 60)));
        };
      i("History", {
        publicMethods: {
          initHistory: function () {
            var e, t;
            f.extend(g, wn, !0),
              g.history &&
                ((vn = window.location),
                (fn = hn = gn = !1),
                (mn = on()),
                (yn = "pushState" in history),
                -1 < mn.indexOf("gid=") &&
                  (mn = (mn = mn.split("&gid=")[0]).split("?gid=")[0]),
                r("afterChange", h.updateURL),
                r("unbindEvents", function () {
                  f.unbind(window, "hashchange", h.onHashChange);
                }),
                (e = function () {
                  (pn = !0),
                    hn ||
                      (gn
                        ? history.back()
                        : mn
                        ? (vn.hash = mn)
                        : yn
                        ? history.pushState(
                            "",
                            document.title,
                            vn.pathname + vn.search
                          )
                        : (vn.hash = "")),
                    rn();
                }),
                r("unbindEvents", function () {
                  H && e();
                }),
                r("destroy", function () {
                  pn || e();
                }),
                r("firstUpdate", function () {
                  U = an().pid;
                }),
                -1 < (t = mn.indexOf("pid=")) &&
                  "&" === (mn = mn.substring(0, t)).slice(-1) &&
                  (mn = mn.slice(0, -1)),
                setTimeout(function () {
                  q && f.bind(window, "hashchange", h.onHashChange);
                }, 40));
          },
          onHashChange: function () {
            return on() === mn
              ? ((hn = !0), void h.close())
              : void (un || ((dn = !0), h.goTo(an().pid), (dn = !1)));
          },
          updateURL: function () {
            rn(), dn || (fn ? (sn = setTimeout(xn, 800)) : xn());
          },
        },
      }),
        f.extend(h, t);
    };
  }),
  (function () {
    var o = window.matchMedia("(max-width: 767px)");
    const e = document.querySelector(".gh-head"),
      i = e.querySelector(".gh-head-menu"),
      r = i.querySelector(".nav");
    if (r) {
      document.querySelector(".gh-head-logo");
      var a,
        t = r.innerHTML;
      if (o.matches) {
        const s = r.querySelectorAll("li");
        s.forEach(function (e, t) {
          e.style.transitionDelay = 0.03 * (t + 1) + "s";
        });
      }
      function n() {
        if (!o.matches) {
          const e = [];
          for (; r.offsetWidth + 64 > i.offsetWidth; ) {
            if (!r.lastElementChild) return;
            e.unshift(r.lastElementChild), r.lastElementChild.remove();
          }
          if (e.length) {
            const t = document.createElement("button");
            t.setAttribute("class", "nav-more-toggle"),
              t.setAttribute("aria-label", "More"),
              (t.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M21.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM13.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0zM5.333 16c0-1.473 1.194-2.667 2.667-2.667v0c1.473 0 2.667 1.194 2.667 2.667v0c0 1.473-1.194 2.667-2.667 2.667v0c-1.473 0-2.667-1.194-2.667-2.667v0z"></path></svg>');
            const n = document.createElement("div");
            n.setAttribute("class", "gh-dropdown"),
              10 <= e.length
                ? (document.body.classList.add("is-dropdown-mega"),
                  (n.style.gridTemplateRows =
                    "repeat(" + Math.ceil(e.length / 2) + ", 1fr)"))
                : document.body.classList.remove("is-dropdown-mega"),
              e.forEach(function (e) {
                n.appendChild(e);
              }),
              t.appendChild(n),
              r.appendChild(t),
              document.body.classList.add("is-dropdown-loaded"),
              t.addEventListener("click", function () {
                document.body.classList.toggle("is-dropdown-open");
              }),
              (a = function (e) {
                !t.contains(e.target) &&
                  document.body.classList.contains("is-dropdown-open") &&
                  document.body.classList.remove("is-dropdown-open");
              }),
              window.addEventListener("click", a);
          } else document.body.classList.add("is-dropdown-loaded");
        }
      }
      imagesLoaded(e, function () {
        n();
      }),
        window.addEventListener("resize", function () {
          setTimeout(function () {
            window.removeEventListener("click", a), (r.innerHTML = t), n();
          }, 1);
        });
    }
  })(),
  (function (t, n) {
    var o, i, r, a, s, l, c, u;
    function d() {
      if (404 === this.status)
        return (
          t.removeEventListener("scroll", m),
          void t.removeEventListener("resize", f)
        );
      this.response.querySelectorAll("article.post-card").forEach(function (e) {
        i.appendChild(n.importNode(e, !0));
      });
      var e = this.response.querySelector("link[rel=next]");
      e
        ? (o.href = e.href)
        : (t.removeEventListener("scroll", m),
          t.removeEventListener("resize", f)),
        (u = n.documentElement.scrollHeight),
        (s = a = !1);
    }
    function e() {
      var e;
      s ||
        (l + c <= u - r
          ? (a = !1)
          : ((s = !0),
            ((e = new t.XMLHttpRequest()).responseType = "document"),
            e.addEventListener("load", d),
            e.open("GET", o.href),
            e.send(null)));
    }
    function p() {
      a || t.requestAnimationFrame(e), (a = !0);
    }
    function m() {
      (l = t.scrollY), p();
    }
    function f() {
      (c = t.innerHeight), (u = n.documentElement.scrollHeight), p();
    }
    n.documentElement.classList.contains("no-infinite-scroll") ||
      !(o = n.querySelector("link[rel=next]")) ||
      ((i = n.querySelector(".post-feed")) &&
        ((s = a = !(r = 300)),
        (l = t.scrollY),
        (c = t.innerHeight),
        (u = n.documentElement.scrollHeight),
        t.addEventListener("scroll", m, { passive: !0 }),
        t.addEventListener("resize", f),
        p()));
  })(window, document),
  lightbox(
    ".kg-image-card > .kg-image[width][height], .kg-gallery-image > img"
  );
//# sourceMappingURL=casper.js.map
