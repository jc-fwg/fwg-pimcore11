"use strict";
(self["webpackChunkapplication"] = self["webpackChunkapplication"] || []).push([["app"],{

/***/ "./assets/app.js":
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");

__webpack_require__(/*! ./partials/_defaults */ "./assets/partials/_defaults.js");
__webpack_require__(/*! ./partials/bbxGallery */ "./assets/partials/bbxGallery.js");
__webpack_require__(/*! ./partials/home */ "./assets/partials/home.js");
__webpack_require__(/*! ./partials/blogpost */ "./assets/partials/blogpost.js");

/***/ }),

/***/ "./assets/partials/_defaults.js":
/*!**************************************!*\
  !*** ./assets/partials/_defaults.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
document.addEventListener("DOMContentLoaded", function () {
  // Handler when the DOM is fully loaded
  setHeroBackground();
  initToTopLink();

  //initNavbarScrollSpy();
});

/**
 * Updates hero background image from responsive image source
 */
function setHeroBackground() {
  // Update background image
  var heroContainer = document.getElementById("hero");
  var imageSource = document.querySelector('#hero picture img').src;
  var pictureElement = document.querySelector('#hero picture');
  heroContainer.style.backgroundImage = "url(" + imageSource + ")";
  pictureElement.parentNode.removeChild(pictureElement);
  // Remove element from DOM
  //heroContainer.innerHTML = "";
}
function initNavbarScrollSpy() {
  var isFixed = false;
  window.addEventListener("scroll", function () {
    var offsetTop = window.scrollY;
    var offsetTopCap = 79;
    var navigationMainBgLayer = document.getElementById("nav-main-bg-layer");
    var navigationLogo = document.getElementById("logo");
    if (!isFixed && offsetTop > offsetTopCap) {
      navigationLogo.classList.add('d-none');
      //navigationMainBgLayer.classList.remove("nav-main-bg-layer-animate-out");
      navigationMainBgLayer.classList.add("nav-main-bg-layer-animate-in");
      isFixed = true;
    }
    if (isFixed && offsetTop <= offsetTopCap) {
      navigationLogo.classList.remove('d-none');
      navigationMainBgLayer.classList.remove("nav-main-bg-layer-animate-in");
      // navigationMainBgLayer.classList.add("nav-main-bg-layer-animate-out");
      isFixed = false;
    }
  });
}
function initToTopLink() {
  var toTopElement = document.getElementById("to-top");
  if (!toTopElement) return;

  // Klickverhalten: immer sanft nach oben scrollen
  toTopElement.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Sichtbarkeit je nach Scrollposition steuern
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      toTopElement.classList.replace("fade-hide", "fade-show");
    } else {
      toTopElement.classList.replace("fade-show", "fade-hide");
    }
  });
}

/***/ }),

/***/ "./assets/partials/bbxGallery.js":
/*!***************************************!*\
  !*** ./assets/partials/bbxGallery.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
document.addEventListener("DOMContentLoaded", function () {
  // BBX gallery
  initBbxGalleries();
});
function initBbxGalleries() {
  var bbxGalleries = document.getElementsByClassName("js-bbx-gallery");
  var _iterator = _createForOfIteratorHelper(bbxGalleries),
    _step;
  try {
    var _loop = function _loop() {
      var gallery = _step.value;
      var images = gallery.getElementsByTagName("img");
      // gallery.addEventListener('click', event => {
      //     buildSlideOut(images, event.target);
      // });

      // Add event listener to images so we can jump to selected image. Coming later...
      var _iterator2 = _createForOfIteratorHelper(images),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var image = _step2.value;
          image.addEventListener('click', function (event) {
            buildSlideOut(images, event.target);
          });
        }

        // AAAAAAND.... So we can use it for arrow keys to jump to image :)
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

/**
 *
 * @param images[]
 * @param thumbnailClicked
 */
function buildSlideOut(images, thumbnailClicked) {
  /*
   * Get existing slideOut element or create if not available yet.
   * Remove all content of it.
   */
  var slideoutElement = document.getElementById("bbx-gallery-slideout");
  if (!slideoutElement) {
    slideoutElement = document.createElement("div");
    slideoutElement.id = "bbx-gallery-slideout";
  }
  slideoutElement.innerHTML = "";

  // Add close button, bind close event
  var slideoutControl = document.createElement("div");
  slideoutControl.id = "bbx-gallery-control";
  var slideoutControlCloseButton = document.createElement("div");
  slideoutControlCloseButton.id = "bbx-gallery-close";
  slideoutControlCloseButton.classList.add("js-bbx-gallery-close");
  slideoutControlCloseButton.innerText = "X";

  // Add close events
  slideoutControlCloseButton.addEventListener("click", function (event) {
    closeSlideOut(slideoutElement, event);
  });
  document.addEventListener("keydown", function (event) {
    closeSlideOut(slideoutElement, event);
  });
  slideoutControl.appendChild(slideoutControlCloseButton);
  slideoutElement.appendChild(slideoutControl);

  // Append slide out to DOM
  document.body.appendChild(slideoutElement);

  // Append images
  var index = 1;
  var _iterator3 = _createForOfIteratorHelper(images),
    _step3;
  try {
    var _loop2 = function _loop2() {
      var image = _step3.value;
      // Setup image wrapper
      var imageDivElement = document.createElement("div");
      imageDivElement.classList.add("img-wrap");
      imageDivElement.classList.add("loading");

      // Setup loader wrapper, append to image wrapper
      var imageLoaderElement = document.createElement("div");
      imageLoaderElement.innerHTML = '<img src="/static/gfx/loader-puff.svg" class="loader" />';
      imageDivElement.appendChild(imageLoaderElement);

      // Setup image counter, append to image wrapper
      var imageCounterElement = document.createElement("div");
      imageCounterElement.classList.add("counter");
      var imageTitle = image.getAttribute("alt");
      imageCounterElement.textContent = imageTitle + " (" + index + " / " + images.length + ")";
      imageDivElement.appendChild(imageCounterElement);

      // Append image wrapper to slideout
      slideoutElement.appendChild(imageDivElement);

      // Setup full image, add listener to append it into image wrapper after it's loaded
      var imageElement = document.createElement("img");
      imageElement.classList.add("full");
      imageElement.dataset.index = index.toString();
      imageElement.addEventListener("load", function () {
        imageLoaderElement.parentNode.removeChild(imageLoaderElement);
        imageDivElement.classList.remove("loading");
        imageDivElement.appendChild(imageElement);
      });
      imageElement.src = image.dataset.fullsource;
      index++;
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop2();
    }

    // Slide out and prevent body scrolling
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  slideoutElement.classList.add("show");
  document.body.style.overflow = "hidden";

  // Jump to clicked image
  if (thumbnailClicked) {
    var imageIndex = thumbnailClicked.dataset.index.toString();
    var attempts = 0;
    var _tryScrollToImage = function tryScrollToImage() {
      var targetImage = slideoutElement.querySelector('img[data-index="' + imageIndex + '"]');
      if (!targetImage) {
        attempts++;
        if (attempts < 100) {
          setTimeout(_tryScrollToImage, 50);
        }
        return;
      }
      targetImage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    };
    _tryScrollToImage();
  }
}
function closeSlideOut(slideoutElement, event) {
  if (event.key === undefined || event.key === "Escape") {
    slideoutElement.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

/***/ }),

/***/ "./assets/partials/blogpost.js":
/*!*************************************!*\
  !*** ./assets/partials/blogpost.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
__webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
__webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
__webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
__webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
__webpack_require__(/*! core-js/modules/es.array.is-array.js */ "./node_modules/core-js/modules/es.array.is-array.js");
__webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
__webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
__webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
document.addEventListener("DOMContentLoaded", function () {
  // Handler when the DOM is fully loaded
  if (document.getElementById("toc")) {
    buildTableOfContent();
  }
  if (document.getElementById("comments")) {
    initCommentAnswers();
  }
});

/**
 * Builds table of content from h2
 */
function buildTableOfContent() {
  // Fetch headlines
  var headlinesH2 = Array.prototype.slice.call(document.getElementsByTagName("h2"));
  var headlinesH3 = Array.prototype.slice.call(document.getElementsByTagName("h3"));
  var headlines = headlinesH2.concat(headlinesH3);
  var tocHtml = "";
  var index = 0;
  var _iterator = _createForOfIteratorHelper(headlines),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var headline = _step.value;
      // Skip ignored headlines
      if (headline.classList.contains("js-toc-ignore")) {
        continue;
      }

      // Add anchor before headline
      var anchorElement = document.createElement("a");
      anchorElement.setAttribute("name", "toc" + index);
      headline.parentNode.insertBefore(anchorElement, headline);

      // Add class on H3 for show mobile only
      var classAdditon = "";
      if (headline.tagName.toLowerCase() === "h3") {
        classAdditon = ' class="d-lg-none"';
      }
      tocHtml += '<li' + classAdditon + '><a href="#toc' + index + '">' + headline.innerText + '</a></li>';
      index++;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  ;
  document.getElementsByClassName("js-toc")[0].innerHTML = tocHtml;
}

/**
 * Initializes comment answers
 */
function initCommentAnswers() {
  var commentAnswerButtons = document.getElementsByClassName("js-comment-answer");
  var _iterator2 = _createForOfIteratorHelper(commentAnswerButtons),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var button = _step2.value;
      button.addEventListener("click", function (event) {
        var parentId = event.target.dataset.pid;
        var referenceId = event.target.dataset.referenceid;
        var name = event.target.dataset.name;
        var headline = document.getElementById('comment-headline');
        if (headline) {
          headline.innerText = "Antwort an " + name;
        }
        var parentInput = document.getElementById('comment-pid');
        if (parentInput) {
          parentInput.value = parentId;
        }
        var commentInput = document.getElementById('reference-id');
        if (commentInput) {
          commentInput.value = referenceId;
        }
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

/***/ }),

/***/ "./assets/partials/home.js":
/*!*********************************!*\
  !*** ./assets/partials/home.js ***!
  \*********************************/
/***/ (() => {



/***/ }),

/***/ "./assets/styles/app.scss":
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_array-54d880"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxXQUFXLEdBQUdySSxRQUFRLENBQUNLLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDeEQsSUFBSWdJLFdBQVcsRUFBRTtVQUNiQSxXQUFXLENBQUN2RixLQUFLLEdBQUdtRixRQUFRO1FBQ2hDO1FBRUEsSUFBSUssWUFBWSxHQUFHdEksUUFBUSxDQUFDSyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQzFELElBQUlpSSxZQUFZLEVBQUU7VUFDZEEsWUFBWSxDQUFDeEYsS0FBSyxHQUFHcUYsV0FBVztRQUNwQztNQUNKLENBQUMsQ0FBQztJQUNOO0VBQUMsU0FBQXZELEdBQUE7SUFBQU4sVUFBQSxDQUFBNUMsQ0FBQSxDQUFBa0QsR0FBQTtFQUFBO0lBQUFOLFVBQUEsQ0FBQXZCLENBQUE7RUFBQTtBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2JieEdhbGxlcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmxvZ3Bvc3QuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzPzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XG5cbnJlcXVpcmUoJy4vcGFydGlhbHMvX2RlZmF1bHRzJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2JieEdhbGxlcnknKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvaG9tZScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ibG9ncG9zdCcpOyIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXG4gICAgc2V0SGVyb0JhY2tncm91bmQoKTtcbiAgICBpbml0VG9Ub3BMaW5rKCk7XG5cbiAgICAvL2luaXROYXZiYXJTY3JvbGxTcHkoKTtcbn0pO1xuXG4vKipcbiAqIFVwZGF0ZXMgaGVybyBiYWNrZ3JvdW5kIGltYWdlIGZyb20gcmVzcG9uc2l2ZSBpbWFnZSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gc2V0SGVyb0JhY2tncm91bmQoKSB7XG4gICAgLy8gVXBkYXRlIGJhY2tncm91bmQgaW1hZ2VcbiAgICBsZXQgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb1wiKTtcbiAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlIGltZycpLnNyYztcbiAgICBsZXQgcGljdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlJyk7XG4gICAgaGVyb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGltYWdlU291cmNlICsgXCIpXCI7XG4gICAgcGljdHVyZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwaWN0dXJlRWxlbWVudCk7XG4gICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbiAgICAvL2hlcm9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaW5pdE5hdmJhclNjcm9sbFNweSgpIHtcblxuICAgIGxldCBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBsZXQgb2Zmc2V0VG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBvZmZzZXRUb3BDYXAgPSA3OTtcblxuICAgICAgICBsZXQgbmF2aWdhdGlvbk1haW5CZ0xheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtbWFpbi1iZy1sYXllclwiKTtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25Mb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuXG4gICAgICAgIGlmICghaXNGaXhlZCAmJiBvZmZzZXRUb3AgPiBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgLy9uYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGaXhlZCAmJiBvZmZzZXRUb3AgPD0gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgLy8gbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0VG9Ub3BMaW5rKCkge1xuICAgIGNvbnN0IHRvVG9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG8tdG9wXCIpO1xuXG4gICAgaWYgKCF0b1RvcEVsZW1lbnQpIHJldHVybjtcblxuICAgIC8vIEtsaWNrdmVyaGFsdGVuOiBpbW1lciBzYW5mdCBuYWNoIG9iZW4gc2Nyb2xsZW5cbiAgICB0b1RvcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gU2ljaHRiYXJrZWl0IGplIG5hY2ggU2Nyb2xscG9zaXRpb24gc3RldWVyblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gNDAwKSB7XG4gICAgICAgICAgICB0b1RvcEVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJmYWRlLWhpZGVcIiwgXCJmYWRlLXNob3dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1RvcEVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJmYWRlLXNob3dcIiwgXCJmYWRlLWhpZGVcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gQkJYIGdhbGxlcnlcbiAgICBpbml0QmJ4R2FsbGVyaWVzKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0QmJ4R2FsbGVyaWVzKCkge1xuXG4gICAgbGV0IGJieEdhbGxlcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1iYngtZ2FsbGVyeVwiKTtcbiAgICBmb3IgKGxldCBnYWxsZXJ5IG9mIGJieEdhbGxlcmllcykge1xuXG4gICAgICAgIGxldCBpbWFnZXMgPSBnYWxsZXJ5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpO1xuICAgICAgICAvLyBnYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBpbWFnZXMgc28gd2UgY2FuIGp1bXAgdG8gc2VsZWN0ZWQgaW1hZ2UuIENvbWluZyBsYXRlci4uLlxuICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBQUFBQUFORC4uLi4gU28gd2UgY2FuIHVzZSBpdCBmb3IgYXJyb3cga2V5cyB0byBqdW1wIHRvIGltYWdlIDopXG5cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbWFnZXNbXVxuICogQHBhcmFtIHRodW1ibmFpbENsaWNrZWRcbiAqL1xuZnVuY3Rpb24gYnVpbGRTbGlkZU91dChpbWFnZXMsIHRodW1ibmFpbENsaWNrZWQpIHtcbiAgICAvKlxuICAgICAqIEdldCBleGlzdGluZyBzbGlkZU91dCBlbGVtZW50IG9yIGNyZWF0ZSBpZiBub3QgYXZhaWxhYmxlIHlldC5cbiAgICAgKiBSZW1vdmUgYWxsIGNvbnRlbnQgb2YgaXQuXG4gICAgICovXG4gICAgbGV0IHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIik7XG4gICAgaWYgKCFzbGlkZW91dEVsZW1lbnQpIHtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmlkID0gXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiO1xuICAgIH1cbiAgICBzbGlkZW91dEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24sIGJpbmQgY2xvc2UgZXZlbnRcbiAgICBsZXQgc2xpZGVvdXRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2wuaWQgPSBcImJieC1nYWxsZXJ5LWNvbnRyb2xcIjtcblxuICAgIGxldCBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaWQgPSBcImJieC1nYWxsZXJ5LWNsb3NlXCI7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImpzLWJieC1nYWxsZXJ5LWNsb3NlXCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGV2ZW50c1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuXG4gICAgc2xpZGVvdXRDb250cm9sLmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uKTtcbiAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sKTtcblxuICAgIC8vIEFwcGVuZCBzbGlkZSBvdXQgdG8gRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzbGlkZW91dEVsZW1lbnQpO1xuXG4gICAgLy8gQXBwZW5kIGltYWdlc1xuICAgIGxldCBpbmRleCA9IDE7XG4gICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbWctd3JhcFwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuXG4gICAgICAgIC8vIFNldHVwIGxvYWRlciB3cmFwcGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VMb2FkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9zdGF0aWMvZ2Z4L2xvYWRlci1wdWZmLnN2Z1wiIGNsYXNzPVwibG9hZGVyXCIgLz4nO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSBjb3VudGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VDb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvdW50ZXJcIik7XG5cbiAgICAgICAgbGV0IGltYWdlVGl0bGUgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoXCJhbHRcIik7XG5cbiAgICAgICAgaW1hZ2VDb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGltYWdlVGl0bGUgKyBcIiAoXCIgKyBpbmRleCArIFwiIC8gXCIgKyBpbWFnZXMubGVuZ3RoICsgXCIpXCI7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUNvdW50ZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBlbmQgaW1hZ2Ugd3JhcHBlciB0byBzbGlkZW91dFxuICAgICAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VEaXZFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBmdWxsIGltYWdlLCBhZGQgbGlzdGVuZXIgdG8gYXBwZW5kIGl0IGludG8gaW1hZ2Ugd3JhcHBlciBhZnRlciBpdCdzIGxvYWRlZFxuICAgICAgICBsZXQgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmdWxsXCIpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuZGF0YXNldC5pbmRleCA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyIChcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlLmRhdGFzZXQuZnVsbHNvdXJjZTtcblxuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIC8vIFNsaWRlIG91dCBhbmQgcHJldmVudCBib2R5IHNjcm9sbGluZ1xuICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIC8vIEp1bXAgdG8gY2xpY2tlZCBpbWFnZVxuICAgIGlmICh0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgICAgIGxldCBpbWFnZUluZGV4ID0gdGh1bWJuYWlsQ2xpY2tlZC5kYXRhc2V0LmluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgbGV0IHRyeVNjcm9sbFRvSW1hZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0SW1hZ2UgPSBzbGlkZW91dEVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nW2RhdGEtaW5kZXg9XCInICsgaW1hZ2VJbmRleCArICdcIl0nKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0SW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHJ5U2Nyb2xsVG9JbWFnZSwgNTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldEltYWdlLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0cnlTY3JvbGxUb0ltYWdlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIHtcbiAgICBpZiAoXG4gICAgICAgIGV2ZW50LmtleSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpXG4gICAgKSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEhhbmRsZXIgd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvY1wiKSkge1xuICAgICAgICBidWlsZFRhYmxlT2ZDb250ZW50KCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzXCIpKSB7XG4gICAgICAgIGluaXRDb21tZW50QW5zd2VycygpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEJ1aWxkcyB0YWJsZSBvZiBjb250ZW50IGZyb20gaDJcbiAqL1xuZnVuY3Rpb24gYnVpbGRUYWJsZU9mQ29udGVudCgpIHtcblxuICAgIC8vIEZldGNoIGhlYWRsaW5lc1xuICAgIGxldCBoZWFkbGluZXNIMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIikpO1xuICAgIGxldCBoZWFkbGluZXNIMyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDNcIikpO1xuICAgIGxldCBoZWFkbGluZXMgPSBoZWFkbGluZXNIMi5jb25jYXQoaGVhZGxpbmVzSDMpO1xuXG4gICAgbGV0IHRvY0h0bWwgPSBcIlwiO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGxldCBoZWFkbGluZSBvZiBoZWFkbGluZXMpIHtcblxuICAgICAgICAvLyBTa2lwIGlnbm9yZWQgaGVhZGxpbmVzXG4gICAgICAgIGlmIChoZWFkbGluZS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy10b2MtaWdub3JlXCIpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbmNob3IgYmVmb3JlIGhlYWRsaW5lXG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRvY1wiICsgaW5kZXgpO1xuICAgICAgICBoZWFkbGluZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhbmNob3JFbGVtZW50LCBoZWFkbGluZSk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzIG9uIEgzIGZvciBzaG93IG1vYmlsZSBvbmx5XG4gICAgICAgIGxldCBjbGFzc0FkZGl0b24gPSBcIlwiO1xuICAgICAgICBpZiAoaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCIpIHtcbiAgICAgICAgICAgIGNsYXNzQWRkaXRvbiA9ICcgY2xhc3M9XCJkLWxnLW5vbmVcIic7XG4gICAgICAgIH1cblxuICAgICAgICB0b2NIdG1sICs9ICc8bGknICsgY2xhc3NBZGRpdG9uICsgJz48YSBocmVmPVwiI3RvYycgKyBpbmRleCArICdcIj4nICsgaGVhZGxpbmUuaW5uZXJUZXh0ICsgJzwvYT48L2xpPic7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy10b2NcIilbMF0uaW5uZXJIVE1MID0gdG9jSHRtbDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBjb21tZW50IGFuc3dlcnNcbiAqL1xuZnVuY3Rpb24gaW5pdENvbW1lbnRBbnN3ZXJzKCkge1xuXG4gICAgbGV0IGNvbW1lbnRBbnN3ZXJCdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWNvbW1lbnQtYW5zd2VyXCIpO1xuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBjb21tZW50QW5zd2VyQnV0dG9ucykge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudElkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucGlkO1xuICAgICAgICAgICAgbGV0IHJlZmVyZW5jZUlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucmVmZXJlbmNlaWQ7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lm5hbWU7XG5cbiAgICAgICAgICAgIGxldCBoZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWhlYWRsaW5lJyk7XG4gICAgICAgICAgICBpZiAoaGVhZGxpbmUpIHtcbiAgICAgICAgICAgICAgICBoZWFkbGluZS5pbm5lclRleHQgPSBcIkFudHdvcnQgYW4gXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1waWQnKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHBhcmVudElucHV0LnZhbHVlID0gcGFyZW50SWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjb21tZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmZXJlbmNlLWlkJyk7XG4gICAgICAgICAgICBpZiAoY29tbWVudElucHV0KSB7XG4gICAgICAgICAgICAgICAgY29tbWVudElucHV0LnZhbHVlID0gcmVmZXJlbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEhlcm9CYWNrZ3JvdW5kIiwiaW5pdFRvVG9wTGluayIsImhlcm9Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImltYWdlU291cmNlIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInBpY3R1cmVFbGVtZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpbml0TmF2YmFyU2Nyb2xsU3B5IiwiaXNGaXhlZCIsIndpbmRvdyIsIm9mZnNldFRvcCIsInNjcm9sbFkiLCJvZmZzZXRUb3BDYXAiLCJuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIiLCJuYXZpZ2F0aW9uTG9nbyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInRvVG9wRWxlbWVudCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNjcm9sbFRvIiwidG9wIiwiYmVoYXZpb3IiLCJyZXBsYWNlIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJyIiwidCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibGVuZ3RoIiwiX24iLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJmIiwiVHlwZUVycm9yIiwibyIsImEiLCJ1IiwiY2FsbCIsIm5leHQiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImluaXRCYnhHYWxsZXJpZXMiLCJiYnhHYWxsZXJpZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfbG9vcCIsImdhbGxlcnkiLCJpbWFnZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJpbWFnZSIsImV2ZW50IiwiYnVpbGRTbGlkZU91dCIsInRhcmdldCIsImVyciIsInRodW1ibmFpbENsaWNrZWQiLCJzbGlkZW91dEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJzbGlkZW91dENvbnRyb2wiLCJzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiIsImlubmVyVGV4dCIsImNsb3NlU2xpZGVPdXQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbmRleCIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJfbG9vcDIiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwiaW1hZ2VUaXRsZSIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW1hZ2VFbGVtZW50IiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImltYWdlSW5kZXgiLCJhdHRlbXB0cyIsInRyeVNjcm9sbFRvSW1hZ2UiLCJ0YXJnZXRJbWFnZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJbnRvVmlldyIsImJsb2NrIiwia2V5IiwidW5kZWZpbmVkIiwiYnVpbGRUYWJsZU9mQ29udGVudCIsImluaXRDb21tZW50QW5zd2VycyIsImhlYWRsaW5lc0gyIiwicHJvdG90eXBlIiwiaGVhZGxpbmVzSDMiLCJoZWFkbGluZXMiLCJjb25jYXQiLCJ0b2NIdG1sIiwiaGVhZGxpbmUiLCJjb250YWlucyIsImFuY2hvckVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJpbnNlcnRCZWZvcmUiLCJjbGFzc0FkZGl0b24iLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjb21tZW50QW5zd2VyQnV0dG9ucyIsImJ1dHRvbiIsInBhcmVudElkIiwicGlkIiwicmVmZXJlbmNlSWQiLCJyZWZlcmVuY2VpZCIsInBhcmVudElucHV0IiwiY29tbWVudElucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==