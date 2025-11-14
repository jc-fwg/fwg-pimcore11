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
  var _document$querySelect;
  // Update background image
  var heroContainer = document.getElementById("hero");
  if (!heroContainer) return;
  var imageSource = (_document$querySelect = document.querySelector('#hero picture img')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.src;
  if (!imageSource) return;
  var pictureElement = document.querySelector('#hero picture');
  if (!pictureElement) return;
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
  toTopElement.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
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
      if (headline.tagName.toLowerCase() === "h3" && headline.parentElement.classList.contains("blogpost-content") === false) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bEQsSUFBSTNFLElBQUksR0FBR2UsS0FBSyxDQUFDRSxNQUFNLENBQUN3QixPQUFPLENBQUN6QyxJQUFJO1FBRXBDLElBQUk2RCxRQUFRLEdBQUd4SCxRQUFRLENBQUNNLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQztRQUMxRCxJQUFJa0gsUUFBUSxFQUFFO1VBQ1ZBLFFBQVEsQ0FBQ25DLFNBQVMsR0FBRyxhQUFhLEdBQUcxQixJQUFJO1FBQzdDO1FBRUEsSUFBSTRFLFdBQVcsR0FBR3ZJLFFBQVEsQ0FBQ00sY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUN4RCxJQUFJaUksV0FBVyxFQUFFO1VBQ2JBLFdBQVcsQ0FBQ3hGLEtBQUssR0FBR29GLFFBQVE7UUFDaEM7UUFFQSxJQUFJSyxZQUFZLEdBQUd4SSxRQUFRLENBQUNNLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDMUQsSUFBSWtJLFlBQVksRUFBRTtVQUNkQSxZQUFZLENBQUN6RixLQUFLLEdBQUdzRixXQUFXO1FBQ3BDO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFBQyxTQUFBeEQsR0FBQTtJQUFBTixVQUFBLENBQUE1QyxDQUFBLENBQUFrRCxHQUFBO0VBQUE7SUFBQU4sVUFBQSxDQUFBdkIsQ0FBQTtFQUFBO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9fZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmJ4R2FsbGVyeS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9ibG9ncG9zdC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XG5cbnJlcXVpcmUoJy4vcGFydGlhbHMvX2RlZmF1bHRzJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2JieEdhbGxlcnknKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvaG9tZScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ibG9ncG9zdCcpOyIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXG4gICAgc2V0SGVyb0JhY2tncm91bmQoKTtcbiAgICBpbml0VG9Ub3BMaW5rKCk7XG5cbiAgICAvL2luaXROYXZiYXJTY3JvbGxTcHkoKTtcbn0pO1xuXG4vKipcbiAqIFVwZGF0ZXMgaGVybyBiYWNrZ3JvdW5kIGltYWdlIGZyb20gcmVzcG9uc2l2ZSBpbWFnZSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gc2V0SGVyb0JhY2tncm91bmQoKSB7XG4gICAgLy8gVXBkYXRlIGJhY2tncm91bmQgaW1hZ2VcbiAgICBsZXQgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb1wiKTtcbiAgICBpZiAoIWhlcm9Db250YWluZXIpIHJldHVybjtcblxuICAgIGxldCBpbWFnZVNvdXJjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZXJvIHBpY3R1cmUgaW1nJyk/LnNyYztcbiAgICBpZiAoIWltYWdlU291cmNlKSByZXR1cm47XG5cbiAgICBsZXQgcGljdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlJyk7XG4gICAgaWYgKCFwaWN0dXJlRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgaGVyb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGltYWdlU291cmNlICsgXCIpXCI7XG4gICAgcGljdHVyZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwaWN0dXJlRWxlbWVudCk7XG4gICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbiAgICAvL2hlcm9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaW5pdE5hdmJhclNjcm9sbFNweSgpIHtcblxuICAgIGxldCBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBsZXQgb2Zmc2V0VG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBvZmZzZXRUb3BDYXAgPSA3OTtcblxuICAgICAgICBsZXQgbmF2aWdhdGlvbk1haW5CZ0xheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtbWFpbi1iZy1sYXllclwiKTtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25Mb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuXG4gICAgICAgIGlmICghaXNGaXhlZCAmJiBvZmZzZXRUb3AgPiBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgLy9uYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGaXhlZCAmJiBvZmZzZXRUb3AgPD0gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgLy8gbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0VG9Ub3BMaW5rKCkge1xuICAgIGNvbnN0IHRvVG9wRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG8tdG9wXCIpO1xuXG4gICAgaWYgKCF0b1RvcEVsZW1lbnQpIHJldHVybjtcblxuICAgIHRvVG9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCJcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cuc2Nyb2xsWSA+IDQwMCkge1xuICAgICAgICAgICAgdG9Ub3BFbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKFwiZmFkZS1oaWRlXCIsIFwiZmFkZS1zaG93XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9Ub3BFbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKFwiZmFkZS1zaG93XCIsIFwiZmFkZS1oaWRlXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEJCWCBnYWxsZXJ5XG4gICAgaW5pdEJieEdhbGxlcmllcygpO1xuXG59KTtcblxuZnVuY3Rpb24gaW5pdEJieEdhbGxlcmllcygpIHtcblxuICAgIGxldCBiYnhHYWxsZXJpZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtYmJ4LWdhbGxlcnlcIik7XG4gICAgZm9yIChsZXQgZ2FsbGVyeSBvZiBiYnhHYWxsZXJpZXMpIHtcblxuICAgICAgICBsZXQgaW1hZ2VzID0gZ2FsbGVyeS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKTtcbiAgICAgICAgLy8gZ2FsbGVyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gaW1hZ2VzIHNvIHdlIGNhbiBqdW1wIHRvIHNlbGVjdGVkIGltYWdlLiBDb21pbmcgbGF0ZXIuLi5cbiAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBidWlsZFNsaWRlT3V0KGltYWdlcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQUFBQUFBTkQuLi4uIFNvIHdlIGNhbiB1c2UgaXQgZm9yIGFycm93IGtleXMgdG8ganVtcCB0byBpbWFnZSA6KVxuXG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW1hZ2VzW11cbiAqIEBwYXJhbSB0aHVtYm5haWxDbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCB0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgLypcbiAgICAgKiBHZXQgZXhpc3Rpbmcgc2xpZGVPdXQgZWxlbWVudCBvciBjcmVhdGUgaWYgbm90IGF2YWlsYWJsZSB5ZXQuXG4gICAgICogUmVtb3ZlIGFsbCBjb250ZW50IG9mIGl0LlxuICAgICAqL1xuICAgIGxldCBzbGlkZW91dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJieC1nYWxsZXJ5LXNsaWRlb3V0XCIpO1xuICAgIGlmICghc2xpZGVvdXRFbGVtZW50KSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5pZCA9IFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIjtcbiAgICB9XG4gICAgc2xpZGVvdXRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uLCBiaW5kIGNsb3NlIGV2ZW50XG4gICAgbGV0IHNsaWRlb3V0Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sLmlkID0gXCJiYngtZ2FsbGVyeS1jb250cm9sXCI7XG5cbiAgICBsZXQgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlkID0gXCJiYngtZ2FsbGVyeS1jbG9zZVwiO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJqcy1iYngtZ2FsbGVyeS1jbG9zZVwiKTtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBldmVudHNcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHsgY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB9KTtcblxuICAgIHNsaWRlb3V0Q29udHJvbC5hcHBlbmRDaGlsZChzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbik7XG4gICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbCk7XG5cbiAgICAvLyBBcHBlbmQgc2xpZGUgb3V0IHRvIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVvdXRFbGVtZW50KTtcblxuICAgIC8vIEFwcGVuZCBpbWFnZXNcbiAgICBsZXQgaW5kZXggPSAxO1xuICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xuXG4gICAgICAgIC8vIFNldHVwIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW1nLXdyYXBcIik7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibG9hZGluZ1wiKTtcblxuICAgICAgICAvLyBTZXR1cCBsb2FkZXIgd3JhcHBlciwgYXBwZW5kIHRvIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlTG9hZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIvc3RhdGljL2dmeC9sb2FkZXItcHVmZi5zdmdcIiBjbGFzcz1cImxvYWRlclwiIC8+JztcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2UgY291bnRlciwgYXBwZW5kIHRvIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlQ291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZUNvdW50ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb3VudGVyXCIpO1xuXG4gICAgICAgIGxldCBpbWFnZVRpdGxlID0gaW1hZ2UuZ2V0QXR0cmlidXRlKFwiYWx0XCIpO1xuXG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBpbWFnZVRpdGxlICsgXCIgKFwiICsgaW5kZXggKyBcIiAvIFwiICsgaW1hZ2VzLmxlbmd0aCArIFwiKVwiO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VDb3VudGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIGltYWdlIHdyYXBwZXIgdG8gc2xpZGVvdXRcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRGl2RWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgZnVsbCBpbWFnZSwgYWRkIGxpc3RlbmVyIHRvIGFwcGVuZCBpdCBpbnRvIGltYWdlIHdyYXBwZXIgYWZ0ZXIgaXQncyBsb2FkZWRcbiAgICAgICAgbGV0IGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZnVsbFwiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmRhdGFzZXQuaW5kZXggPSBpbmRleC50b1N0cmluZygpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltYWdlRWxlbWVudC5zcmMgPSBpbWFnZS5kYXRhc2V0LmZ1bGxzb3VyY2U7XG5cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBvdXQgYW5kIHByZXZlbnQgYm9keSBzY3JvbGxpbmdcbiAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICAvLyBKdW1wIHRvIGNsaWNrZWQgaW1hZ2VcbiAgICBpZiAodGh1bWJuYWlsQ2xpY2tlZCkge1xuICAgICAgICBsZXQgaW1hZ2VJbmRleCA9IHRodW1ibmFpbENsaWNrZWQuZGF0YXNldC5pbmRleC50b1N0cmluZygpO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuXG4gICAgICAgIGxldCB0cnlTY3JvbGxUb0ltYWdlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhcmdldEltYWdlID0gc2xpZGVvdXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZ1tkYXRhLWluZGV4PVwiJyArIGltYWdlSW5kZXggKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoIXRhcmdldEltYWdlKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRyeVNjcm9sbFRvSW1hZ2UsIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXRJbWFnZS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5U2Nyb2xsVG9JbWFnZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgICBldmVudC5rZXkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2NcIikpIHtcbiAgICAgICAgYnVpbGRUYWJsZU9mQ29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50c1wiKSkge1xuICAgICAgICBpbml0Q29tbWVudEFuc3dlcnMoKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBCdWlsZHMgdGFibGUgb2YgY29udGVudCBmcm9tIGgyXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVGFibGVPZkNvbnRlbnQoKSB7XG5cbiAgICAvLyBGZXRjaCBoZWFkbGluZXNcbiAgICBsZXQgaGVhZGxpbmVzSDIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgyXCIpKTtcbiAgICBsZXQgaGVhZGxpbmVzSDMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgzXCIpKTtcbiAgICBsZXQgaGVhZGxpbmVzID0gaGVhZGxpbmVzSDIuY29uY2F0KGhlYWRsaW5lc0gzKTtcblxuICAgIGxldCB0b2NIdG1sID0gXCJcIjtcbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChsZXQgaGVhZGxpbmUgb2YgaGVhZGxpbmVzKSB7XG5cbiAgICAgICAgLy8gU2tpcCBpZ25vcmVkIGhlYWRsaW5lc1xuICAgICAgICBpZiAoaGVhZGxpbmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtdG9jLWlnbm9yZVwiKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgYW5jaG9yIGJlZm9yZSBoZWFkbGluZVxuICAgICAgICBsZXQgYW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBhbmNob3JFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ0b2NcIiArIGluZGV4KTtcbiAgICAgICAgaGVhZGxpbmUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYW5jaG9yRWxlbWVudCwgaGVhZGxpbmUpO1xuXG4gICAgICAgIC8vIEFkZCBjbGFzcyBvbiBIMyBmb3Igc2hvdyBtb2JpbGUgb25seVxuICAgICAgICBsZXQgY2xhc3NBZGRpdG9uID0gXCJcIjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCJcbiAgICAgICAgICAgICYmIGhlYWRsaW5lLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmxvZ3Bvc3QtY29udGVudFwiKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjbGFzc0FkZGl0b24gPSAnIGNsYXNzPVwiZC1sZy1ub25lXCInO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9jSHRtbCArPSAnPGxpJyArIGNsYXNzQWRkaXRvbiArICc+PGEgaHJlZj1cIiN0b2MnICsgaW5kZXggKyAnXCI+JyArIGhlYWRsaW5lLmlubmVyVGV4dCArICc8L2E+PC9saT4nO1xuICAgICAgICBpbmRleCsrO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtdG9jXCIpWzBdLmlubmVySFRNTCA9IHRvY0h0bWw7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgY29tbWVudCBhbnN3ZXJzXG4gKi9cbmZ1bmN0aW9uIGluaXRDb21tZW50QW5zd2VycygpIHtcblxuICAgIGxldCBjb21tZW50QW5zd2VyQnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1jb21tZW50LWFuc3dlclwiKTtcbiAgICBmb3IgKGxldCBidXR0b24gb2YgY29tbWVudEFuc3dlckJ1dHRvbnMpIHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnBpZDtcbiAgICAgICAgICAgIGxldCByZWZlcmVuY2VJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnJlZmVyZW5jZWlkO1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBldmVudC50YXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgICAgICAgICBsZXQgaGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1oZWFkbGluZScpO1xuICAgICAgICAgICAgaWYgKGhlYWRsaW5lKSB7XG4gICAgICAgICAgICAgICAgaGVhZGxpbmUuaW5uZXJUZXh0ID0gXCJBbnR3b3J0IGFuIFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBhcmVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtcGlkJyk7XG4gICAgICAgICAgICBpZiAocGFyZW50SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRJbnB1dC52YWx1ZSA9IHBhcmVudElkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY29tbWVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZmVyZW5jZS1pZCcpO1xuICAgICAgICAgICAgaWYgKGNvbW1lbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRJbnB1dC52YWx1ZSA9IHJlZmVyZW5jZUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRIZXJvQmFja2dyb3VuZCIsImluaXRUb1RvcExpbmsiLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJoZXJvQ29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbWFnZVNvdXJjZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJwaWN0dXJlRWxlbWVudCIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW5pdE5hdmJhclNjcm9sbFNweSIsImlzRml4ZWQiLCJ3aW5kb3ciLCJvZmZzZXRUb3AiLCJzY3JvbGxZIiwib2Zmc2V0VG9wQ2FwIiwibmF2aWdhdGlvbk1haW5CZ0xheWVyIiwibmF2aWdhdGlvbkxvZ28iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJ0b1RvcEVsZW1lbnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJzY3JvbGxUbyIsInRvcCIsImJlaGF2aW9yIiwicmVwbGFjZSIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiciIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsIkFycmF5IiwiaXNBcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsImxlbmd0aCIsIl9uIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZiIsIlR5cGVFcnJvciIsIm8iLCJhIiwidSIsImNhbGwiLCJuZXh0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZnJvbSIsInRlc3QiLCJpbml0QmJ4R2FsbGVyaWVzIiwiYmJ4R2FsbGVyaWVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX2xvb3AiLCJnYWxsZXJ5IiwiaW1hZ2VzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiaW1hZ2UiLCJldmVudCIsImJ1aWxkU2xpZGVPdXQiLCJ0YXJnZXQiLCJlcnIiLCJ0aHVtYm5haWxDbGlja2VkIiwic2xpZGVvdXRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiaW5uZXJIVE1MIiwic2xpZGVvdXRDb250cm9sIiwic2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24iLCJpbm5lclRleHQiLCJjbG9zZVNsaWRlT3V0IiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiaW5kZXgiLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwiX2xvb3AyIiwiaW1hZ2VEaXZFbGVtZW50IiwiaW1hZ2VMb2FkZXJFbGVtZW50IiwiaW1hZ2VDb3VudGVyRWxlbWVudCIsImltYWdlVGl0bGUiLCJnZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImltYWdlRWxlbWVudCIsImRhdGFzZXQiLCJmdWxsc291cmNlIiwib3ZlcmZsb3ciLCJpbWFnZUluZGV4IiwiYXR0ZW1wdHMiLCJ0cnlTY3JvbGxUb0ltYWdlIiwidGFyZ2V0SW1hZ2UiLCJzZXRUaW1lb3V0Iiwic2Nyb2xsSW50b1ZpZXciLCJibG9jayIsImtleSIsInVuZGVmaW5lZCIsImJ1aWxkVGFibGVPZkNvbnRlbnQiLCJpbml0Q29tbWVudEFuc3dlcnMiLCJoZWFkbGluZXNIMiIsInByb3RvdHlwZSIsImhlYWRsaW5lc0gzIiwiaGVhZGxpbmVzIiwiY29uY2F0IiwidG9jSHRtbCIsImhlYWRsaW5lIiwiY29udGFpbnMiLCJhbmNob3JFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0QmVmb3JlIiwiY2xhc3NBZGRpdG9uIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwicGFyZW50RWxlbWVudCIsImNvbW1lbnRBbnN3ZXJCdXR0b25zIiwiYnV0dG9uIiwicGFyZW50SWQiLCJwaWQiLCJyZWZlcmVuY2VJZCIsInJlZmVyZW5jZWlkIiwicGFyZW50SW5wdXQiLCJjb21tZW50SW5wdXQiXSwic291cmNlUm9vdCI6IiJ9