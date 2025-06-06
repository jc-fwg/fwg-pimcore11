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
/***/ (() => {



document.addEventListener("DOMContentLoaded", function () {
  // Handler when the DOM is fully loaded
  setHeroBackground();
  initNavbarScrollSpy();
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_array-0751d7"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YSxFQUFFRixRQUFRLENBQUM7O01BRXpEO01BQ0EsSUFBSUssWUFBWSxHQUFHLEVBQUU7TUFDckIsSUFBSUwsUUFBUSxDQUFDTSxPQUFPLENBQUNDLFdBQVcsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3pDRixZQUFZLEdBQUcsb0JBQW9CO01BQ3ZDO01BRUFOLE9BQU8sSUFBSSxLQUFLLEdBQUdNLFlBQVksR0FBRyxnQkFBZ0IsR0FBR3BDLEtBQUssR0FBRyxJQUFJLEdBQUcrQixRQUFRLENBQUNuQyxTQUFTLEdBQUcsV0FBVztNQUNwR0ksS0FBSyxFQUFFO0lBQ1g7RUFBQyxTQUFBWixHQUFBO0lBQUFaLFNBQUEsQ0FBQS9CLENBQUEsQ0FBQTJDLEdBQUE7RUFBQTtJQUFBWixTQUFBLENBQUFqQixDQUFBO0VBQUE7RUFBQTtFQUVEeEMsUUFBUSxDQUFDd0Qsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNrQixTQUFTLEdBQUdxQyxPQUFPO0FBQ3BFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUU3Q0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2JieEdhbGxlcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmxvZ3Bvc3QuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvaG9tZS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3M/OGY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxucmVxdWlyZSgnLi9wYXJ0aWFscy9fZGVmYXVsdHMnKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvYmJ4R2FsbGVyeScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ob21lJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2Jsb2dwb3N0Jyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBzZXRIZXJvQmFja2dyb3VuZCgpO1xuXG4gICAgaW5pdE5hdmJhclNjcm9sbFNweSgpO1xufSk7XG5cbi8qKlxuICogVXBkYXRlcyBoZXJvIGJhY2tncm91bmQgaW1hZ2UgZnJvbSByZXNwb25zaXZlIGltYWdlIHNvdXJjZVxuICovXG5mdW5jdGlvbiBzZXRIZXJvQmFja2dyb3VuZCgpIHtcbiAgICAvLyBVcGRhdGUgYmFja2dyb3VuZCBpbWFnZVxuICAgIGxldCBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvXCIpO1xuICAgIGxldCBpbWFnZVNvdXJjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZXJvIHBpY3R1cmUgaW1nJykuc3JjO1xuICAgIGxldCBwaWN0dXJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZXJvIHBpY3R1cmUnKTtcbiAgICBoZXJvQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgaW1hZ2VTb3VyY2UgKyBcIilcIjtcbiAgICBwaWN0dXJlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHBpY3R1cmVFbGVtZW50KTtcbiAgICAvLyBSZW1vdmUgZWxlbWVudCBmcm9tIERPTVxuICAgIC8vaGVyb0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBpbml0TmF2YmFyU2Nyb2xsU3B5KCkge1xuXG4gICAgbGV0IGlzRml4ZWQgPSBmYWxzZTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGxldCBvZmZzZXRUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGV0IG9mZnNldFRvcENhcCA9IDc5O1xuXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYWluLWJnLWxheWVyXCIpO1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29cIik7XG5cbiAgICAgICAgaWYgKCFpc0ZpeGVkICYmIG9mZnNldFRvcCA+IG9mZnNldFRvcENhcCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkxvZ28uY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgICAgICAgICAvL25hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1vdXRcIik7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtaW5cIik7XG4gICAgICAgICAgICBpc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZpeGVkICYmIG9mZnNldFRvcCA8PSBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAvLyBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEJCWCBnYWxsZXJ5XG4gICAgaW5pdEJieEdhbGxlcmllcygpO1xuXG59KTtcblxuZnVuY3Rpb24gaW5pdEJieEdhbGxlcmllcygpIHtcblxuICAgIGxldCBiYnhHYWxsZXJpZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtYmJ4LWdhbGxlcnlcIik7XG4gICAgZm9yIChsZXQgZ2FsbGVyeSBvZiBiYnhHYWxsZXJpZXMpIHtcblxuICAgICAgICBsZXQgaW1hZ2VzID0gZ2FsbGVyeS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKTtcbiAgICAgICAgLy8gZ2FsbGVyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gaW1hZ2VzIHNvIHdlIGNhbiBqdW1wIHRvIHNlbGVjdGVkIGltYWdlLiBDb21pbmcgbGF0ZXIuLi5cbiAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBidWlsZFNsaWRlT3V0KGltYWdlcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQUFBQUFBTkQuLi4uIFNvIHdlIGNhbiB1c2UgaXQgZm9yIGFycm93IGtleXMgdG8ganVtcCB0byBpbWFnZSA6KVxuXG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW1hZ2VzW11cbiAqIEBwYXJhbSB0aHVtYm5haWxDbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCB0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgLypcbiAgICAgKiBHZXQgZXhpc3Rpbmcgc2xpZGVPdXQgZWxlbWVudCBvciBjcmVhdGUgaWYgbm90IGF2YWlsYWJsZSB5ZXQuXG4gICAgICogUmVtb3ZlIGFsbCBjb250ZW50IG9mIGl0LlxuICAgICAqL1xuICAgIGxldCBzbGlkZW91dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJieC1nYWxsZXJ5LXNsaWRlb3V0XCIpO1xuICAgIGlmICghc2xpZGVvdXRFbGVtZW50KSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5pZCA9IFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIjtcbiAgICB9XG4gICAgc2xpZGVvdXRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uLCBiaW5kIGNsb3NlIGV2ZW50XG4gICAgbGV0IHNsaWRlb3V0Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sLmlkID0gXCJiYngtZ2FsbGVyeS1jb250cm9sXCI7XG5cbiAgICBsZXQgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlkID0gXCJiYngtZ2FsbGVyeS1jbG9zZVwiO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJqcy1iYngtZ2FsbGVyeS1jbG9zZVwiKTtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBldmVudHNcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHsgY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB9KTtcblxuICAgIHNsaWRlb3V0Q29udHJvbC5hcHBlbmRDaGlsZChzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbik7XG4gICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbCk7XG5cbiAgICAvLyBBcHBlbmQgc2xpZGUgb3V0IHRvIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVvdXRFbGVtZW50KTtcblxuICAgIC8vIEFwcGVuZCBpbWFnZXNcbiAgICBsZXQgaW5kZXggPSAxO1xuICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xuXG4gICAgICAgIC8vIFNldHVwIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW1nLXdyYXBcIik7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibG9hZGluZ1wiKTtcblxuICAgICAgICAvLyBTZXR1cCBsb2FkZXIgd3JhcHBlciwgYXBwZW5kIHRvIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlTG9hZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIvc3RhdGljL2dmeC9sb2FkZXItcHVmZi5zdmdcIiBjbGFzcz1cImxvYWRlclwiIC8+JztcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2UgY291bnRlciwgYXBwZW5kIHRvIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlQ291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZUNvdW50ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb3VudGVyXCIpO1xuXG4gICAgICAgIGxldCBpbWFnZVRpdGxlID0gaW1hZ2UuZ2V0QXR0cmlidXRlKFwiYWx0XCIpO1xuXG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBpbWFnZVRpdGxlICsgXCIgKFwiICsgaW5kZXggKyBcIiAvIFwiICsgaW1hZ2VzLmxlbmd0aCArIFwiKVwiO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VDb3VudGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIGltYWdlIHdyYXBwZXIgdG8gc2xpZGVvdXRcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRGl2RWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgZnVsbCBpbWFnZSwgYWRkIGxpc3RlbmVyIHRvIGFwcGVuZCBpdCBpbnRvIGltYWdlIHdyYXBwZXIgYWZ0ZXIgaXQncyBsb2FkZWRcbiAgICAgICAgbGV0IGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZnVsbFwiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmRhdGFzZXQuaW5kZXggPSBpbmRleC50b1N0cmluZygpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltYWdlRWxlbWVudC5zcmMgPSBpbWFnZS5kYXRhc2V0LmZ1bGxzb3VyY2U7XG5cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBvdXQgYW5kIHByZXZlbnQgYm9keSBzY3JvbGxpbmdcbiAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICAvLyBKdW1wIHRvIGNsaWNrZWQgaW1hZ2VcbiAgICBpZiAodGh1bWJuYWlsQ2xpY2tlZCkge1xuICAgICAgICBsZXQgaW1hZ2VJbmRleCA9IHRodW1ibmFpbENsaWNrZWQuZGF0YXNldC5pbmRleC50b1N0cmluZygpO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuXG4gICAgICAgIGxldCB0cnlTY3JvbGxUb0ltYWdlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhcmdldEltYWdlID0gc2xpZGVvdXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZ1tkYXRhLWluZGV4PVwiJyArIGltYWdlSW5kZXggKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoIXRhcmdldEltYWdlKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRyeVNjcm9sbFRvSW1hZ2UsIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXRJbWFnZS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5U2Nyb2xsVG9JbWFnZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgICBldmVudC5rZXkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2NcIikpIHtcbiAgICAgICAgYnVpbGRUYWJsZU9mQ29udGVudCgpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEJ1aWxkcyB0YWJsZSBvZiBjb250ZW50IGZyb20gaDJcbiAqL1xuZnVuY3Rpb24gYnVpbGRUYWJsZU9mQ29udGVudCgpIHtcblxuICAgIC8vIEZldGNoIGhlYWRsaW5lc1xuICAgIGxldCBoZWFkbGluZXNIMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIikpO1xuICAgIGxldCBoZWFkbGluZXNIMyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDNcIikpO1xuICAgIGxldCBoZWFkbGluZXMgPSBoZWFkbGluZXNIMi5jb25jYXQoaGVhZGxpbmVzSDMpO1xuXG4gICAgbGV0IHRvY0h0bWwgPSBcIlwiO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGxldCBoZWFkbGluZSBvZiBoZWFkbGluZXMpIHtcblxuICAgICAgICAvLyBTa2lwIGlnbm9yZWQgaGVhZGxpbmVzXG4gICAgICAgIGlmIChoZWFkbGluZS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy10b2MtaWdub3JlXCIpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbmNob3IgYmVmb3JlIGhlYWRsaW5lXG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRvY1wiICsgaW5kZXgpO1xuICAgICAgICBoZWFkbGluZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhbmNob3JFbGVtZW50LCBoZWFkbGluZSk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzIG9uIEgzIGZvciBzaG93IG1vYmlsZSBvbmx5XG4gICAgICAgIGxldCBjbGFzc0FkZGl0b24gPSBcIlwiO1xuICAgICAgICBpZiAoaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCIpIHtcbiAgICAgICAgICAgIGNsYXNzQWRkaXRvbiA9ICcgY2xhc3M9XCJkLWxnLW5vbmVcIic7XG4gICAgICAgIH1cblxuICAgICAgICB0b2NIdG1sICs9ICc8bGknICsgY2xhc3NBZGRpdG9uICsgJz48YSBocmVmPVwiI3RvYycgKyBpbmRleCArICdcIj4nICsgaGVhZGxpbmUuaW5uZXJUZXh0ICsgJzwvYT48L2xpPic7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy10b2NcIilbMF0uaW5uZXJIVE1MID0gdG9jSHRtbDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0SGVyb0JhY2tncm91bmQiLCJpbml0TmF2YmFyU2Nyb2xsU3B5IiwiaGVyb0NvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiaW1hZ2VTb3VyY2UiLCJxdWVyeVNlbGVjdG9yIiwic3JjIiwicGljdHVyZUVsZW1lbnQiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImlzRml4ZWQiLCJ3aW5kb3ciLCJvZmZzZXRUb3AiLCJzY3JvbGxZIiwib2Zmc2V0VG9wQ2FwIiwibmF2aWdhdGlvbk1haW5CZ0xheWVyIiwibmF2aWdhdGlvbkxvZ28iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInIiLCJlIiwidCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibGVuZ3RoIiwiX24iLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJmIiwiVHlwZUVycm9yIiwibyIsImEiLCJ1IiwiY2FsbCIsIm5leHQiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImluaXRCYnhHYWxsZXJpZXMiLCJiYnhHYWxsZXJpZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfbG9vcCIsImdhbGxlcnkiLCJpbWFnZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJpbWFnZSIsImV2ZW50IiwiYnVpbGRTbGlkZU91dCIsInRhcmdldCIsImVyciIsInRodW1ibmFpbENsaWNrZWQiLCJzbGlkZW91dEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJzbGlkZW91dENvbnRyb2wiLCJzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiIsImlubmVyVGV4dCIsImNsb3NlU2xpZGVPdXQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbmRleCIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJfbG9vcDIiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwiaW1hZ2VUaXRsZSIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW1hZ2VFbGVtZW50IiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImltYWdlSW5kZXgiLCJhdHRlbXB0cyIsInRyeVNjcm9sbFRvSW1hZ2UiLCJ0YXJnZXRJbWFnZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJrZXkiLCJ1bmRlZmluZWQiLCJidWlsZFRhYmxlT2ZDb250ZW50IiwiaGVhZGxpbmVzSDIiLCJwcm90b3R5cGUiLCJoZWFkbGluZXNIMyIsImhlYWRsaW5lcyIsImNvbmNhdCIsInRvY0h0bWwiLCJoZWFkbGluZSIsImNvbnRhaW5zIiwiYW5jaG9yRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImluc2VydEJlZm9yZSIsImNsYXNzQWRkaXRvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSJdLCJzb3VyY2VSb290IjoiIn0=