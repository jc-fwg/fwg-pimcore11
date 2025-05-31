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
      gallery.addEventListener('click', function (event) {
        buildSlideOut(images, event.target);
      });

      /* Add event listener to images so we can jump to selected image. Coming later...
      for (let image of images) {
          image.addEventListener('click', event => {
              buildSlideOut(images, event.target);
          });
      }
       AAAAAAND.... So we can use it for arrow keys to jump to image :)
      */
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
  var _iterator2 = _createForOfIteratorHelper(images),
    _step2;
  try {
    var _loop2 = function _loop2() {
      var image = _step2.value;
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
      imageCounterElement.textContent = index + " / " + images.length;
      imageDivElement.appendChild(imageCounterElement);

      // Append image wrapper to slideout
      slideoutElement.appendChild(imageDivElement);

      // Setup full image, add listener to append it into image wrapper after it's loaded
      var imageElement = document.createElement("img");
      imageElement.classList.add("full");
      imageElement.addEventListener("load", function () {
        imageLoaderElement.parentNode.removeChild(imageLoaderElement);
        imageDivElement.classList.remove("loading");
        imageDivElement.appendChild(imageElement);
      });
      console.log(image);
      imageElement.src = image.dataset.fullsource;
      index++;
    };
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _loop2();
    }

    // Slide out and prevent body scrolling
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  slideoutElement.classList.add("show");
  console.log(slideoutElement);
  document.body.style.overflow = "hidden";
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_array-945f2e"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0IsUUFBUSxDQUFDMUYsVUFBVSxDQUFDOEYsWUFBWSxDQUFDRixhQUFhLEVBQUVGLFFBQVEsQ0FBQzs7TUFFekQ7TUFDQSxJQUFJSyxZQUFZLEdBQUcsRUFBRTtNQUNyQixJQUFJTCxRQUFRLENBQUNNLE9BQU8sQ0FBQ0MsV0FBVyxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDekNGLFlBQVksR0FBRyxvQkFBb0I7TUFDdkM7TUFFQU4sT0FBTyxJQUFJLEtBQUssR0FBR00sWUFBWSxHQUFHLGdCQUFnQixHQUFHN0IsS0FBSyxHQUFHLElBQUksR0FBR3dCLFFBQVEsQ0FBQzVCLFNBQVMsR0FBRyxXQUFXO01BQ3BHSSxLQUFLLEVBQUU7SUFDWDtFQUFDLFNBQUFaLEdBQUE7SUFBQVQsU0FBQSxDQUFBL0IsQ0FBQSxDQUFBd0MsR0FBQTtFQUFBO0lBQUFULFNBQUEsQ0FBQWpCLENBQUE7RUFBQTtFQUFBO0VBRUR4QyxRQUFRLENBQUN3RCxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ2UsU0FBUyxHQUFHOEIsT0FBTztBQUNwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL19kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9iYnhHYWxsZXJ5LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2Jsb2dwb3N0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz84ZjU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xuXG5yZXF1aXJlKCcuL3BhcnRpYWxzL19kZWZhdWx0cycpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9iYnhHYWxsZXJ5Jyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2hvbWUnKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvYmxvZ3Bvc3QnKTsiLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEhhbmRsZXIgd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZFxuICAgIHNldEhlcm9CYWNrZ3JvdW5kKCk7XG5cbiAgICBpbml0TmF2YmFyU2Nyb2xsU3B5KCk7XG59KTtcblxuLyoqXG4gKiBVcGRhdGVzIGhlcm8gYmFja2dyb3VuZCBpbWFnZSBmcm9tIHJlc3BvbnNpdmUgaW1hZ2Ugc291cmNlXG4gKi9cbmZ1bmN0aW9uIHNldEhlcm9CYWNrZ3JvdW5kKCkge1xuICAgIC8vIFVwZGF0ZSBiYWNrZ3JvdW5kIGltYWdlXG4gICAgbGV0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9cIik7XG4gICAgbGV0IGltYWdlU291cmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlcm8gcGljdHVyZSBpbWcnKS5zcmM7XG4gICAgbGV0IHBpY3R1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlcm8gcGljdHVyZScpO1xuICAgIGhlcm9Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBpbWFnZVNvdXJjZSArIFwiKVwiO1xuICAgIHBpY3R1cmVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocGljdHVyZUVsZW1lbnQpO1xuICAgIC8vIFJlbW92ZSBlbGVtZW50IGZyb20gRE9NXG4gICAgLy9oZXJvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGluaXROYXZiYXJTY3JvbGxTcHkoKSB7XG5cbiAgICBsZXQgaXNGaXhlZCA9IGZhbHNlO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgbGV0IG9mZnNldFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wQ2FwID0gNzk7XG5cbiAgICAgICAgbGV0IG5hdmlnYXRpb25NYWluQmdMYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1haW4tYmctbGF5ZXJcIik7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uTG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcblxuICAgICAgICBpZiAoIWlzRml4ZWQgJiYgb2Zmc2V0VG9wID4gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIC8vbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QuYWRkKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRml4ZWQgJiYgb2Zmc2V0VG9wIDw9IG9mZnNldFRvcENhcCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkxvZ28uY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtaW5cIik7XG4gICAgICAgICAgIC8vIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QuYWRkKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1vdXRcIik7XG4gICAgICAgICAgICBpc0ZpeGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gQkJYIGdhbGxlcnlcbiAgICBpbml0QmJ4R2FsbGVyaWVzKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0QmJ4R2FsbGVyaWVzKCkge1xuXG4gICAgbGV0IGJieEdhbGxlcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1iYngtZ2FsbGVyeVwiKTtcbiAgICBmb3IgKGxldCBnYWxsZXJ5IG9mIGJieEdhbGxlcmllcykge1xuXG4gICAgICAgIGxldCBpbWFnZXMgPSBnYWxsZXJ5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpO1xuICAgICAgICBnYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qIEFkZCBldmVudCBsaXN0ZW5lciB0byBpbWFnZXMgc28gd2UgY2FuIGp1bXAgdG8gc2VsZWN0ZWQgaW1hZ2UuIENvbWluZyBsYXRlci4uLlxuICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBBQUFBQUFORC4uLi4gU28gd2UgY2FuIHVzZSBpdCBmb3IgYXJyb3cga2V5cyB0byBqdW1wIHRvIGltYWdlIDopXG4gICAgICAgICovXG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW1hZ2VzW11cbiAqIEBwYXJhbSB0aHVtYm5haWxDbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCB0aHVtYm5haWxDbGlja2VkKSB7XG5cbiAgICAvKlxuICAgICAqIEdldCBleGlzdGluZyBzbGlkZU91dCBlbGVtZW50IG9yIGNyZWF0ZSBpZiBub3QgYXZhaWxhYmxlIHlldC5cbiAgICAgKiBSZW1vdmUgYWxsIGNvbnRlbnQgb2YgaXQuXG4gICAgICovXG4gICAgbGV0IHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIik7XG4gICAgaWYgKCFzbGlkZW91dEVsZW1lbnQpIHtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmlkID0gXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiO1xuICAgIH1cbiAgICBzbGlkZW91dEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24sIGJpbmQgY2xvc2UgZXZlbnRcbiAgICBsZXQgc2xpZGVvdXRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2wuaWQgPSBcImJieC1nYWxsZXJ5LWNvbnRyb2xcIjtcblxuICAgIGxldCBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaWQgPSBcImJieC1nYWxsZXJ5LWNsb3NlXCI7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImpzLWJieC1nYWxsZXJ5LWNsb3NlXCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGV2ZW50c1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuXG4gICAgc2xpZGVvdXRDb250cm9sLmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uKTtcbiAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sKTtcblxuICAgIC8vIEFwcGVuZCBzbGlkZSBvdXQgdG8gRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzbGlkZW91dEVsZW1lbnQpO1xuXG4gICAgLy8gQXBwZW5kIGltYWdlc1xuICAgIGxldCBpbmRleCA9IDE7XG4gICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbWctd3JhcFwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuXG4gICAgICAgIC8vIFNldHVwIGxvYWRlciB3cmFwcGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VMb2FkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9zdGF0aWMvZ2Z4L2xvYWRlci1wdWZmLnN2Z1wiIGNsYXNzPVwibG9hZGVyXCIgLz4nO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSBjb3VudGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VDb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvdW50ZXJcIik7XG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBpbmRleCArIFwiIC8gXCIgKyBpbWFnZXMubGVuZ3RoO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VDb3VudGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIGltYWdlIHdyYXBwZXIgdG8gc2xpZGVvdXRcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRGl2RWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgZnVsbCBpbWFnZSwgYWRkIGxpc3RlbmVyIHRvIGFwcGVuZCBpdCBpbnRvIGltYWdlIHdyYXBwZXIgYWZ0ZXIgaXQncyBsb2FkZWRcbiAgICAgICAgbGV0IGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZnVsbFwiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWFnZUxvYWRlckVsZW1lbnQpO1xuICAgICAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhpbWFnZSk7XG4gICAgICAgIGltYWdlRWxlbWVudC5zcmMgPSBpbWFnZS5kYXRhc2V0LmZ1bGxzb3VyY2U7XG5cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBvdXQgYW5kIHByZXZlbnQgYm9keSBzY3JvbGxpbmdcbiAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgY29uc29sZS5sb2coc2xpZGVvdXRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgICBldmVudC5rZXkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2NcIikpIHtcbiAgICAgICAgYnVpbGRUYWJsZU9mQ29udGVudCgpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEJ1aWxkcyB0YWJsZSBvZiBjb250ZW50IGZyb20gaDJcbiAqL1xuZnVuY3Rpb24gYnVpbGRUYWJsZU9mQ29udGVudCgpIHtcblxuICAgIC8vIEZldGNoIGhlYWRsaW5lc1xuICAgIGxldCBoZWFkbGluZXNIMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIikpO1xuICAgIGxldCBoZWFkbGluZXNIMyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDNcIikpO1xuICAgIGxldCBoZWFkbGluZXMgPSBoZWFkbGluZXNIMi5jb25jYXQoaGVhZGxpbmVzSDMpO1xuXG4gICAgbGV0IHRvY0h0bWwgPSBcIlwiO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGxldCBoZWFkbGluZSBvZiBoZWFkbGluZXMpIHtcblxuICAgICAgICAvLyBTa2lwIGlnbm9yZWQgaGVhZGxpbmVzXG4gICAgICAgIGlmIChoZWFkbGluZS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy10b2MtaWdub3JlXCIpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbmNob3IgYmVmb3JlIGhlYWRsaW5lXG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRvY1wiICsgaW5kZXgpO1xuICAgICAgICBoZWFkbGluZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhbmNob3JFbGVtZW50LCBoZWFkbGluZSk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzIG9uIEgzIGZvciBzaG93IG1vYmlsZSBvbmx5XG4gICAgICAgIGxldCBjbGFzc0FkZGl0b24gPSBcIlwiO1xuICAgICAgICBpZiAoaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCIpIHtcbiAgICAgICAgICAgIGNsYXNzQWRkaXRvbiA9ICcgY2xhc3M9XCJkLWxnLW5vbmVcIic7XG4gICAgICAgIH1cblxuICAgICAgICB0b2NIdG1sICs9ICc8bGknICsgY2xhc3NBZGRpdG9uICsgJz48YSBocmVmPVwiI3RvYycgKyBpbmRleCArICdcIj4nICsgaGVhZGxpbmUuaW5uZXJUZXh0ICsgJzwvYT48L2xpPic7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy10b2NcIilbMF0uaW5uZXJIVE1MID0gdG9jSHRtbDtcbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEhlcm9CYWNrZ3JvdW5kIiwiaW5pdE5hdmJhclNjcm9sbFNweSIsImhlcm9Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImltYWdlU291cmNlIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInBpY3R1cmVFbGVtZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpc0ZpeGVkIiwid2luZG93Iiwib2Zmc2V0VG9wIiwic2Nyb2xsWSIsIm9mZnNldFRvcENhcCIsIm5hdmlnYXRpb25NYWluQmdMYXllciIsIm5hdmlnYXRpb25Mb2dvIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJyIiwiZSIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsIkFycmF5IiwiaXNBcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsImxlbmd0aCIsIl9uIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZiIsIlR5cGVFcnJvciIsIm8iLCJhIiwidSIsImNhbGwiLCJuZXh0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZnJvbSIsInRlc3QiLCJpbml0QmJ4R2FsbGVyaWVzIiwiYmJ4R2FsbGVyaWVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX2xvb3AiLCJnYWxsZXJ5IiwiaW1hZ2VzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJldmVudCIsImJ1aWxkU2xpZGVPdXQiLCJ0YXJnZXQiLCJlcnIiLCJ0aHVtYm5haWxDbGlja2VkIiwic2xpZGVvdXRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiaW5uZXJIVE1MIiwic2xpZGVvdXRDb250cm9sIiwic2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24iLCJpbm5lclRleHQiLCJjbG9zZVNsaWRlT3V0IiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiaW5kZXgiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX2xvb3AyIiwiaW1hZ2UiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwidGV4dENvbnRlbnQiLCJpbWFnZUVsZW1lbnQiLCJjb25zb2xlIiwibG9nIiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImtleSIsInVuZGVmaW5lZCIsImJ1aWxkVGFibGVPZkNvbnRlbnQiLCJoZWFkbGluZXNIMiIsInByb3RvdHlwZSIsImhlYWRsaW5lc0gzIiwiaGVhZGxpbmVzIiwiY29uY2F0IiwidG9jSHRtbCIsImhlYWRsaW5lIiwiY29udGFpbnMiLCJhbmNob3JFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0QmVmb3JlIiwiY2xhc3NBZGRpdG9uIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==