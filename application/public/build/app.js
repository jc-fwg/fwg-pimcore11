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
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_modules_es_array_concat_js-node_modules_core-js_modules_es_array-0751d7"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ0UsTUFBTSxDQUFDd0IsT0FBTyxDQUFDZ0MsR0FBRztRQUN2QyxJQUFJQyxXQUFXLEdBQUczRCxLQUFLLENBQUNFLE1BQU0sQ0FBQ3dCLE9BQU8sQ0FBQ2tDLFdBQVc7UUFDbEQsSUFBSTNFLElBQUksR0FBR2UsS0FBSyxDQUFDRSxNQUFNLENBQUN3QixPQUFPLENBQUN6QyxJQUFJO1FBRXBDLElBQUk4RCxRQUFRLEdBQUdqSCxRQUFRLENBQUNLLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztRQUMxRCxJQUFJNEcsUUFBUSxFQUFFO1VBQ1ZBLFFBQVEsQ0FBQ3BDLFNBQVMsR0FBRyxhQUFhLEdBQUcxQixJQUFJO1FBQzdDO1FBRUEsSUFBSTRFLFdBQVcsR0FBRy9ILFFBQVEsQ0FBQ0ssY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUN4RCxJQUFJMEgsV0FBVyxFQUFFO1VBQ2JBLFdBQVcsQ0FBQ3hGLEtBQUssR0FBR29GLFFBQVE7UUFDaEM7UUFFQSxJQUFJSyxZQUFZLEdBQUdoSSxRQUFRLENBQUNLLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDMUQsSUFBSTJILFlBQVksRUFBRTtVQUNkQSxZQUFZLENBQUN6RixLQUFLLEdBQUdzRixXQUFXO1FBQ3BDO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFBQyxTQUFBeEQsR0FBQTtJQUFBTixVQUFBLENBQUFyQyxDQUFBLENBQUEyQyxHQUFBO0VBQUE7SUFBQU4sVUFBQSxDQUFBdkIsQ0FBQTtFQUFBO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9fZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmJ4R2FsbGVyeS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9ibG9ncG9zdC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XG5cbnJlcXVpcmUoJy4vcGFydGlhbHMvX2RlZmF1bHRzJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2JieEdhbGxlcnknKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvaG9tZScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ibG9ncG9zdCcpOyIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXG4gICAgc2V0SGVyb0JhY2tncm91bmQoKTtcblxuICAgIGluaXROYXZiYXJTY3JvbGxTcHkoKTtcbn0pO1xuXG4vKipcbiAqIFVwZGF0ZXMgaGVybyBiYWNrZ3JvdW5kIGltYWdlIGZyb20gcmVzcG9uc2l2ZSBpbWFnZSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gc2V0SGVyb0JhY2tncm91bmQoKSB7XG4gICAgLy8gVXBkYXRlIGJhY2tncm91bmQgaW1hZ2VcbiAgICBsZXQgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb1wiKTtcbiAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlIGltZycpLnNyYztcbiAgICBsZXQgcGljdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlJyk7XG4gICAgaGVyb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGltYWdlU291cmNlICsgXCIpXCI7XG4gICAgcGljdHVyZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwaWN0dXJlRWxlbWVudCk7XG4gICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbiAgICAvL2hlcm9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaW5pdE5hdmJhclNjcm9sbFNweSgpIHtcblxuICAgIGxldCBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBsZXQgb2Zmc2V0VG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBvZmZzZXRUb3BDYXAgPSA3OTtcblxuICAgICAgICBsZXQgbmF2aWdhdGlvbk1haW5CZ0xheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtbWFpbi1iZy1sYXllclwiKTtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25Mb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuXG4gICAgICAgIGlmICghaXNGaXhlZCAmJiBvZmZzZXRUb3AgPiBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgLy9uYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGaXhlZCAmJiBvZmZzZXRUb3AgPD0gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgLy8gbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBCQlggZ2FsbGVyeVxuICAgIGluaXRCYnhHYWxsZXJpZXMoKTtcblxufSk7XG5cbmZ1bmN0aW9uIGluaXRCYnhHYWxsZXJpZXMoKSB7XG5cbiAgICBsZXQgYmJ4R2FsbGVyaWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWJieC1nYWxsZXJ5XCIpO1xuICAgIGZvciAobGV0IGdhbGxlcnkgb2YgYmJ4R2FsbGVyaWVzKSB7XG5cbiAgICAgICAgbGV0IGltYWdlcyA9IGdhbGxlcnkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIik7XG4gICAgICAgIC8vIGdhbGxlcnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIC8vICAgICBidWlsZFNsaWRlT3V0KGltYWdlcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIGltYWdlcyBzbyB3ZSBjYW4ganVtcCB0byBzZWxlY3RlZCBpbWFnZS4gQ29taW5nIGxhdGVyLi4uXG4gICAgICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFBQUFBQU5ELi4uLiBTbyB3ZSBjYW4gdXNlIGl0IGZvciBhcnJvdyBrZXlzIHRvIGp1bXAgdG8gaW1hZ2UgOilcblxuICAgIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGltYWdlc1tdXG4gKiBAcGFyYW0gdGh1bWJuYWlsQ2xpY2tlZFxuICovXG5mdW5jdGlvbiBidWlsZFNsaWRlT3V0KGltYWdlcywgdGh1bWJuYWlsQ2xpY2tlZCkge1xuICAgIC8qXG4gICAgICogR2V0IGV4aXN0aW5nIHNsaWRlT3V0IGVsZW1lbnQgb3IgY3JlYXRlIGlmIG5vdCBhdmFpbGFibGUgeWV0LlxuICAgICAqIFJlbW92ZSBhbGwgY29udGVudCBvZiBpdC5cbiAgICAgKi9cbiAgICBsZXQgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiKTtcbiAgICBpZiAoIXNsaWRlb3V0RWxlbWVudCkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuaWQgPSBcImJieC1nYWxsZXJ5LXNsaWRlb3V0XCI7XG4gICAgfVxuICAgIHNsaWRlb3V0RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGJ1dHRvbiwgYmluZCBjbG9zZSBldmVudFxuICAgIGxldCBzbGlkZW91dENvbnRyb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbC5pZCA9IFwiYmJ4LWdhbGxlcnktY29udHJvbFwiO1xuXG4gICAgbGV0IHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5pZCA9IFwiYmJ4LWdhbGxlcnktY2xvc2VcIjtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwianMtYmJ4LWdhbGxlcnktY2xvc2VcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG5cbiAgICAvLyBBZGQgY2xvc2UgZXZlbnRzXG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHsgY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG5cbiAgICBzbGlkZW91dENvbnRyb2wuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24pO1xuICAgIHNsaWRlb3V0RWxlbWVudC5hcHBlbmRDaGlsZChzbGlkZW91dENvbnRyb2wpO1xuXG4gICAgLy8gQXBwZW5kIHNsaWRlIG91dCB0byBET01cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNsaWRlb3V0RWxlbWVudCk7XG5cbiAgICAvLyBBcHBlbmQgaW1hZ2VzXG4gICAgbGV0IGluZGV4ID0gMTtcbiAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSB3cmFwcGVyXG4gICAgICAgIGxldCBpbWFnZURpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImltZy13cmFwXCIpO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImxvYWRpbmdcIik7XG5cbiAgICAgICAgLy8gU2V0dXAgbG9hZGVyIHdyYXBwZXIsIGFwcGVuZCB0byBpbWFnZSB3cmFwcGVyXG4gICAgICAgIGxldCBpbWFnZUxvYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZUxvYWRlckVsZW1lbnQuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiL3N0YXRpYy9nZngvbG9hZGVyLXB1ZmYuc3ZnXCIgY2xhc3M9XCJsb2FkZXJcIiAvPic7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUxvYWRlckVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFNldHVwIGltYWdlIGNvdW50ZXIsIGFwcGVuZCB0byBpbWFnZSB3cmFwcGVyXG4gICAgICAgIGxldCBpbWFnZUNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VDb3VudGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY291bnRlclwiKTtcblxuICAgICAgICBsZXQgaW1hZ2VUaXRsZSA9IGltYWdlLmdldEF0dHJpYnV0ZShcImFsdFwiKTtcblxuICAgICAgICBpbWFnZUNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gaW1hZ2VUaXRsZSArIFwiIChcIiArIGluZGV4ICsgXCIgLyBcIiArIGltYWdlcy5sZW5ndGggKyBcIilcIjtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlQ291bnRlckVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBpbWFnZSB3cmFwcGVyIHRvIHNsaWRlb3V0XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZURpdkVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFNldHVwIGZ1bGwgaW1hZ2UsIGFkZCBsaXN0ZW5lciB0byBhcHBlbmQgaXQgaW50byBpbWFnZSB3cmFwcGVyIGFmdGVyIGl0J3MgbG9hZGVkXG4gICAgICAgIGxldCBpbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZ1bGxcIik7XG4gICAgICAgIGltYWdlRWxlbWVudC5kYXRhc2V0LmluZGV4ID0gaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIgKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWFnZUxvYWRlckVsZW1lbnQpO1xuICAgICAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIpO1xuICAgICAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbWFnZUVsZW1lbnQuc3JjID0gaW1hZ2UuZGF0YXNldC5mdWxsc291cmNlO1xuXG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuXG4gICAgLy8gU2xpZGUgb3V0IGFuZCBwcmV2ZW50IGJvZHkgc2Nyb2xsaW5nXG4gICAgc2xpZGVvdXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuXG4gICAgLy8gSnVtcCB0byBjbGlja2VkIGltYWdlXG4gICAgaWYgKHRodW1ibmFpbENsaWNrZWQpIHtcbiAgICAgICAgbGV0IGltYWdlSW5kZXggPSB0aHVtYm5haWxDbGlja2VkLmRhdGFzZXQuaW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcblxuICAgICAgICBsZXQgdHJ5U2Nyb2xsVG9JbWFnZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB0YXJnZXRJbWFnZSA9IHNsaWRlb3V0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbWdbZGF0YS1pbmRleD1cIicgKyBpbWFnZUluZGV4ICsgJ1wiXScpO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRJbWFnZSkge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRzKys7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPCAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCh0cnlTY3JvbGxUb0ltYWdlLCA1MCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGFyZ2V0SW1hZ2Uuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwiY2VudGVyXCIgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRyeVNjcm9sbFRvSW1hZ2UoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkge1xuICAgIGlmIChcbiAgICAgICAgZXZlbnQua2V5ID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIilcbiAgICApIHtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJhdXRvXCI7XG4gICAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9jXCIpKSB7XG4gICAgICAgIGJ1aWxkVGFibGVPZkNvbnRlbnQoKTtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29tbWVudHNcIikpIHtcbiAgICAgICAgaW5pdENvbW1lbnRBbnN3ZXJzKCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQnVpbGRzIHRhYmxlIG9mIGNvbnRlbnQgZnJvbSBoMlxuICovXG5mdW5jdGlvbiBidWlsZFRhYmxlT2ZDb250ZW50KCkge1xuXG4gICAgLy8gRmV0Y2ggaGVhZGxpbmVzXG4gICAgbGV0IGhlYWRsaW5lc0gyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoMlwiKSk7XG4gICAgbGV0IGhlYWRsaW5lc0gzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoM1wiKSk7XG4gICAgbGV0IGhlYWRsaW5lcyA9IGhlYWRsaW5lc0gyLmNvbmNhdChoZWFkbGluZXNIMyk7XG5cbiAgICBsZXQgdG9jSHRtbCA9IFwiXCI7XG4gICAgbGV0IGluZGV4ID0gMDtcblxuICAgIGZvciAobGV0IGhlYWRsaW5lIG9mIGhlYWRsaW5lcykge1xuXG4gICAgICAgIC8vIFNraXAgaWdub3JlZCBoZWFkbGluZXNcbiAgICAgICAgaWYgKGhlYWRsaW5lLmNsYXNzTGlzdC5jb250YWlucyhcImpzLXRvYy1pZ25vcmVcIikpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGFuY2hvciBiZWZvcmUgaGVhZGxpbmVcbiAgICAgICAgbGV0IGFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgYW5jaG9yRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwidG9jXCIgKyBpbmRleCk7XG4gICAgICAgIGhlYWRsaW5lLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGFuY2hvckVsZW1lbnQsIGhlYWRsaW5lKTtcblxuICAgICAgICAvLyBBZGQgY2xhc3Mgb24gSDMgZm9yIHNob3cgbW9iaWxlIG9ubHlcbiAgICAgICAgbGV0IGNsYXNzQWRkaXRvbiA9IFwiXCI7XG4gICAgICAgIGlmIChoZWFkbGluZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaDNcIikge1xuICAgICAgICAgICAgY2xhc3NBZGRpdG9uID0gJyBjbGFzcz1cImQtbGctbm9uZVwiJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRvY0h0bWwgKz0gJzxsaScgKyBjbGFzc0FkZGl0b24gKyAnPjxhIGhyZWY9XCIjdG9jJyArIGluZGV4ICsgJ1wiPicgKyBoZWFkbGluZS5pbm5lclRleHQgKyAnPC9hPjwvbGk+JztcbiAgICAgICAgaW5kZXgrKztcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLXRvY1wiKVswXS5pbm5lckhUTUwgPSB0b2NIdG1sO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGNvbW1lbnQgYW5zd2Vyc1xuICovXG5mdW5jdGlvbiBpbml0Q29tbWVudEFuc3dlcnMoKSB7XG5cbiAgICBsZXQgY29tbWVudEFuc3dlckJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtY29tbWVudC1hbnN3ZXJcIik7XG4gICAgZm9yIChsZXQgYnV0dG9uIG9mIGNvbW1lbnRBbnN3ZXJCdXR0b25zKSB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50SWQgPSBldmVudC50YXJnZXQuZGF0YXNldC5waWQ7XG4gICAgICAgICAgICBsZXQgcmVmZXJlbmNlSWQgPSBldmVudC50YXJnZXQuZGF0YXNldC5yZWZlcmVuY2VpZDtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQubmFtZTtcblxuICAgICAgICAgICAgbGV0IGhlYWRsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtaGVhZGxpbmUnKTtcbiAgICAgICAgICAgIGlmIChoZWFkbGluZSkge1xuICAgICAgICAgICAgICAgIGhlYWRsaW5lLmlubmVyVGV4dCA9IFwiQW50d29ydCBhbiBcIiArIG5hbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBwYXJlbnRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LXBpZCcpO1xuICAgICAgICAgICAgaWYgKHBhcmVudElucHV0KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50SW5wdXQudmFsdWUgPSBwYXJlbnRJZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGNvbW1lbnRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWZlcmVuY2UtaWQnKTtcbiAgICAgICAgICAgIGlmIChjb21tZW50SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBjb21tZW50SW5wdXQudmFsdWUgPSByZWZlcmVuY2VJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0SGVyb0JhY2tncm91bmQiLCJpbml0TmF2YmFyU2Nyb2xsU3B5IiwiaGVyb0NvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiaW1hZ2VTb3VyY2UiLCJxdWVyeVNlbGVjdG9yIiwic3JjIiwicGljdHVyZUVsZW1lbnQiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImlzRml4ZWQiLCJ3aW5kb3ciLCJvZmZzZXRUb3AiLCJzY3JvbGxZIiwib2Zmc2V0VG9wQ2FwIiwibmF2aWdhdGlvbk1haW5CZ0xheWVyIiwibmF2aWdhdGlvbkxvZ28iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInIiLCJlIiwidCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibGVuZ3RoIiwiX24iLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJmIiwiVHlwZUVycm9yIiwibyIsImEiLCJ1IiwiY2FsbCIsIm5leHQiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImluaXRCYnhHYWxsZXJpZXMiLCJiYnhHYWxsZXJpZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfbG9vcCIsImdhbGxlcnkiLCJpbWFnZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJpbWFnZSIsImV2ZW50IiwiYnVpbGRTbGlkZU91dCIsInRhcmdldCIsImVyciIsInRodW1ibmFpbENsaWNrZWQiLCJzbGlkZW91dEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJzbGlkZW91dENvbnRyb2wiLCJzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiIsImlubmVyVGV4dCIsImNsb3NlU2xpZGVPdXQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbmRleCIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJfbG9vcDIiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwiaW1hZ2VUaXRsZSIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW1hZ2VFbGVtZW50IiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImltYWdlSW5kZXgiLCJhdHRlbXB0cyIsInRyeVNjcm9sbFRvSW1hZ2UiLCJ0YXJnZXRJbWFnZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJrZXkiLCJ1bmRlZmluZWQiLCJidWlsZFRhYmxlT2ZDb250ZW50IiwiaW5pdENvbW1lbnRBbnN3ZXJzIiwiaGVhZGxpbmVzSDIiLCJwcm90b3R5cGUiLCJoZWFkbGluZXNIMyIsImhlYWRsaW5lcyIsImNvbmNhdCIsInRvY0h0bWwiLCJoZWFkbGluZSIsImNvbnRhaW5zIiwiYW5jaG9yRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImluc2VydEJlZm9yZSIsImNsYXNzQWRkaXRvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbW1lbnRBbnN3ZXJCdXR0b25zIiwiYnV0dG9uIiwicGFyZW50SWQiLCJwaWQiLCJyZWZlcmVuY2VJZCIsInJlZmVyZW5jZWlkIiwicGFyZW50SW5wdXQiLCJjb21tZW50SW5wdXQiXSwic291cmNlUm9vdCI6IiJ9