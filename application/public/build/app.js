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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sQ0FBQ2dDLEdBQUc7UUFDdkMsSUFBSUMsV0FBVyxHQUFHM0QsS0FBSyxDQUFDRSxNQUFNLENBQUN3QixPQUFPLENBQUNrQyxXQUFXO1FBQ2xELElBQUkzRSxJQUFJLEdBQUdlLEtBQUssQ0FBQ0UsTUFBTSxDQUFDd0IsT0FBTyxDQUFDekMsSUFBSTtRQUVwQyxJQUFJOEQsUUFBUSxHQUFHakgsUUFBUSxDQUFDSSxjQUFjLENBQUMsa0JBQWtCLENBQUM7UUFDMUQsSUFBSTZHLFFBQVEsRUFBRTtVQUNWQSxRQUFRLENBQUNwQyxTQUFTLEdBQUcsYUFBYSxHQUFHMUIsSUFBSTtRQUM3QztRQUVBLElBQUk0RSxXQUFXLEdBQUcvSCxRQUFRLENBQUNJLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDeEQsSUFBSTJILFdBQVcsRUFBRTtVQUNiQSxXQUFXLENBQUN4RixLQUFLLEdBQUdvRixRQUFRO1FBQ2hDO1FBRUEsSUFBSUssWUFBWSxHQUFHaEksUUFBUSxDQUFDSSxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQzFELElBQUk0SCxZQUFZLEVBQUU7VUFDZEEsWUFBWSxDQUFDekYsS0FBSyxHQUFHc0YsV0FBVztRQUNwQztNQUNKLENBQUMsQ0FBQztJQUNOO0VBQUMsU0FBQXhELEdBQUE7SUFBQU4sVUFBQSxDQUFBckMsQ0FBQSxDQUFBMkMsR0FBQTtFQUFBO0lBQUFOLFVBQUEsQ0FBQXZCLENBQUE7RUFBQTtBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2JieEdhbGxlcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmxvZ3Bvc3QuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzPzhmNTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XG5cbnJlcXVpcmUoJy4vcGFydGlhbHMvX2RlZmF1bHRzJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2JieEdhbGxlcnknKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvaG9tZScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ibG9ncG9zdCcpOyIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXG4gICAgc2V0SGVyb0JhY2tncm91bmQoKTtcblxuICAgIC8vaW5pdE5hdmJhclNjcm9sbFNweSgpO1xufSk7XG5cbi8qKlxuICogVXBkYXRlcyBoZXJvIGJhY2tncm91bmQgaW1hZ2UgZnJvbSByZXNwb25zaXZlIGltYWdlIHNvdXJjZVxuICovXG5mdW5jdGlvbiBzZXRIZXJvQmFja2dyb3VuZCgpIHtcbiAgICAvLyBVcGRhdGUgYmFja2dyb3VuZCBpbWFnZVxuICAgIGxldCBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvXCIpO1xuICAgIGxldCBpbWFnZVNvdXJjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZXJvIHBpY3R1cmUgaW1nJykuc3JjO1xuICAgIGxldCBwaWN0dXJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZXJvIHBpY3R1cmUnKTtcbiAgICBoZXJvQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgaW1hZ2VTb3VyY2UgKyBcIilcIjtcbiAgICBwaWN0dXJlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHBpY3R1cmVFbGVtZW50KTtcbiAgICAvLyBSZW1vdmUgZWxlbWVudCBmcm9tIERPTVxuICAgIC8vaGVyb0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBpbml0TmF2YmFyU2Nyb2xsU3B5KCkge1xuXG4gICAgbGV0IGlzRml4ZWQgPSBmYWxzZTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGxldCBvZmZzZXRUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGV0IG9mZnNldFRvcENhcCA9IDc5O1xuXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYWluLWJnLWxheWVyXCIpO1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29cIik7XG5cbiAgICAgICAgaWYgKCFpc0ZpeGVkICYmIG9mZnNldFRvcCA+IG9mZnNldFRvcENhcCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkxvZ28uY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgICAgICAgICAvL25hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1vdXRcIik7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtaW5cIik7XG4gICAgICAgICAgICBpc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZpeGVkICYmIG9mZnNldFRvcCA8PSBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAvLyBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblxuICAgIC8vIEJCWCBnYWxsZXJ5XG4gICAgaW5pdEJieEdhbGxlcmllcygpO1xuXG59KTtcblxuZnVuY3Rpb24gaW5pdEJieEdhbGxlcmllcygpIHtcblxuICAgIGxldCBiYnhHYWxsZXJpZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtYmJ4LWdhbGxlcnlcIik7XG4gICAgZm9yIChsZXQgZ2FsbGVyeSBvZiBiYnhHYWxsZXJpZXMpIHtcblxuICAgICAgICBsZXQgaW1hZ2VzID0gZ2FsbGVyeS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKTtcbiAgICAgICAgLy8gZ2FsbGVyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgdG8gaW1hZ2VzIHNvIHdlIGNhbiBqdW1wIHRvIHNlbGVjdGVkIGltYWdlLiBDb21pbmcgbGF0ZXIuLi5cbiAgICAgICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBidWlsZFNsaWRlT3V0KGltYWdlcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQUFBQUFBTkQuLi4uIFNvIHdlIGNhbiB1c2UgaXQgZm9yIGFycm93IGtleXMgdG8ganVtcCB0byBpbWFnZSA6KVxuXG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW1hZ2VzW11cbiAqIEBwYXJhbSB0aHVtYm5haWxDbGlja2VkXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCB0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgLypcbiAgICAgKiBHZXQgZXhpc3Rpbmcgc2xpZGVPdXQgZWxlbWVudCBvciBjcmVhdGUgaWYgbm90IGF2YWlsYWJsZSB5ZXQuXG4gICAgICogUmVtb3ZlIGFsbCBjb250ZW50IG9mIGl0LlxuICAgICAqL1xuICAgIGxldCBzbGlkZW91dEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJieC1nYWxsZXJ5LXNsaWRlb3V0XCIpO1xuICAgIGlmICghc2xpZGVvdXRFbGVtZW50KSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5pZCA9IFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIjtcbiAgICB9XG4gICAgc2xpZGVvdXRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAvLyBBZGQgY2xvc2UgYnV0dG9uLCBiaW5kIGNsb3NlIGV2ZW50XG4gICAgbGV0IHNsaWRlb3V0Q29udHJvbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sLmlkID0gXCJiYngtZ2FsbGVyeS1jb250cm9sXCI7XG5cbiAgICBsZXQgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlkID0gXCJiYngtZ2FsbGVyeS1jbG9zZVwiO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJqcy1iYngtZ2FsbGVyeS1jbG9zZVwiKTtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5pbm5lclRleHQgPSBcIlhcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBldmVudHNcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHsgY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB9KTtcblxuICAgIHNsaWRlb3V0Q29udHJvbC5hcHBlbmRDaGlsZChzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbik7XG4gICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbCk7XG5cbiAgICAvLyBBcHBlbmQgc2xpZGUgb3V0IHRvIERPTVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVvdXRFbGVtZW50KTtcblxuICAgIC8vIEFwcGVuZCBpbWFnZXNcbiAgICBsZXQgaW5kZXggPSAxO1xuICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xuXG4gICAgICAgIC8vIFNldHVwIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaW1nLXdyYXBcIik7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibG9hZGluZ1wiKTtcblxuICAgICAgICAvLyBTZXR1cCBsb2FkZXIgd3JhcHBlciwgYXBwZW5kIHRvIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlTG9hZGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5pbm5lckhUTUwgPSAnPGltZyBzcmM9XCIvc3RhdGljL2dmeC9sb2FkZXItcHVmZi5zdmdcIiBjbGFzcz1cImxvYWRlclwiIC8+JztcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2UgY291bnRlciwgYXBwZW5kIHRvIGltYWdlIHdyYXBwZXJcbiAgICAgICAgbGV0IGltYWdlQ291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZUNvdW50ZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJjb3VudGVyXCIpO1xuXG4gICAgICAgIGxldCBpbWFnZVRpdGxlID0gaW1hZ2UuZ2V0QXR0cmlidXRlKFwiYWx0XCIpO1xuXG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBpbWFnZVRpdGxlICsgXCIgKFwiICsgaW5kZXggKyBcIiAvIFwiICsgaW1hZ2VzLmxlbmd0aCArIFwiKVwiO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VDb3VudGVyRWxlbWVudCk7XG5cbiAgICAgICAgLy8gQXBwZW5kIGltYWdlIHdyYXBwZXIgdG8gc2xpZGVvdXRcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRGl2RWxlbWVudCk7XG5cbiAgICAgICAgLy8gU2V0dXAgZnVsbCBpbWFnZSwgYWRkIGxpc3RlbmVyIHRvIGFwcGVuZCBpdCBpbnRvIGltYWdlIHdyYXBwZXIgYWZ0ZXIgaXQncyBsb2FkZWRcbiAgICAgICAgbGV0IGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIGltYWdlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZnVsbFwiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmRhdGFzZXQuaW5kZXggPSBpbmRleC50b1N0cmluZygpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltYWdlRWxlbWVudC5zcmMgPSBpbWFnZS5kYXRhc2V0LmZ1bGxzb3VyY2U7XG5cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBvdXQgYW5kIHByZXZlbnQgYm9keSBzY3JvbGxpbmdcbiAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICAvLyBKdW1wIHRvIGNsaWNrZWQgaW1hZ2VcbiAgICBpZiAodGh1bWJuYWlsQ2xpY2tlZCkge1xuICAgICAgICBsZXQgaW1hZ2VJbmRleCA9IHRodW1ibmFpbENsaWNrZWQuZGF0YXNldC5pbmRleC50b1N0cmluZygpO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuXG4gICAgICAgIGxldCB0cnlTY3JvbGxUb0ltYWdlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhcmdldEltYWdlID0gc2xpZGVvdXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZ1tkYXRhLWluZGV4PVwiJyArIGltYWdlSW5kZXggKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoIXRhcmdldEltYWdlKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRyeVNjcm9sbFRvSW1hZ2UsIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXRJbWFnZS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5U2Nyb2xsVG9JbWFnZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgICBldmVudC5rZXkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2NcIikpIHtcbiAgICAgICAgYnVpbGRUYWJsZU9mQ29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50c1wiKSkge1xuICAgICAgICBpbml0Q29tbWVudEFuc3dlcnMoKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBCdWlsZHMgdGFibGUgb2YgY29udGVudCBmcm9tIGgyXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVGFibGVPZkNvbnRlbnQoKSB7XG5cbiAgICAvLyBGZXRjaCBoZWFkbGluZXNcbiAgICBsZXQgaGVhZGxpbmVzSDIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgyXCIpKTtcbiAgICBsZXQgaGVhZGxpbmVzSDMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgzXCIpKTtcbiAgICBsZXQgaGVhZGxpbmVzID0gaGVhZGxpbmVzSDIuY29uY2F0KGhlYWRsaW5lc0gzKTtcblxuICAgIGxldCB0b2NIdG1sID0gXCJcIjtcbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChsZXQgaGVhZGxpbmUgb2YgaGVhZGxpbmVzKSB7XG5cbiAgICAgICAgLy8gU2tpcCBpZ25vcmVkIGhlYWRsaW5lc1xuICAgICAgICBpZiAoaGVhZGxpbmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtdG9jLWlnbm9yZVwiKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgYW5jaG9yIGJlZm9yZSBoZWFkbGluZVxuICAgICAgICBsZXQgYW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBhbmNob3JFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ0b2NcIiArIGluZGV4KTtcbiAgICAgICAgaGVhZGxpbmUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYW5jaG9yRWxlbWVudCwgaGVhZGxpbmUpO1xuXG4gICAgICAgIC8vIEFkZCBjbGFzcyBvbiBIMyBmb3Igc2hvdyBtb2JpbGUgb25seVxuICAgICAgICBsZXQgY2xhc3NBZGRpdG9uID0gXCJcIjtcbiAgICAgICAgaWYgKGhlYWRsaW5lLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJoM1wiKSB7XG4gICAgICAgICAgICBjbGFzc0FkZGl0b24gPSAnIGNsYXNzPVwiZC1sZy1ub25lXCInO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9jSHRtbCArPSAnPGxpJyArIGNsYXNzQWRkaXRvbiArICc+PGEgaHJlZj1cIiN0b2MnICsgaW5kZXggKyAnXCI+JyArIGhlYWRsaW5lLmlubmVyVGV4dCArICc8L2E+PC9saT4nO1xuICAgICAgICBpbmRleCsrO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtdG9jXCIpWzBdLmlubmVySFRNTCA9IHRvY0h0bWw7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgY29tbWVudCBhbnN3ZXJzXG4gKi9cbmZ1bmN0aW9uIGluaXRDb21tZW50QW5zd2VycygpIHtcblxuICAgIGxldCBjb21tZW50QW5zd2VyQnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1jb21tZW50LWFuc3dlclwiKTtcbiAgICBmb3IgKGxldCBidXR0b24gb2YgY29tbWVudEFuc3dlckJ1dHRvbnMpIHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnBpZDtcbiAgICAgICAgICAgIGxldCByZWZlcmVuY2VJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnJlZmVyZW5jZWlkO1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBldmVudC50YXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgICAgICAgICBsZXQgaGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1oZWFkbGluZScpO1xuICAgICAgICAgICAgaWYgKGhlYWRsaW5lKSB7XG4gICAgICAgICAgICAgICAgaGVhZGxpbmUuaW5uZXJUZXh0ID0gXCJBbnR3b3J0IGFuIFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBhcmVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtcGlkJyk7XG4gICAgICAgICAgICBpZiAocGFyZW50SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRJbnB1dC52YWx1ZSA9IHBhcmVudElkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY29tbWVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZmVyZW5jZS1pZCcpO1xuICAgICAgICAgICAgaWYgKGNvbW1lbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRJbnB1dC52YWx1ZSA9IHJlZmVyZW5jZUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRIZXJvQmFja2dyb3VuZCIsImhlcm9Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImltYWdlU291cmNlIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInBpY3R1cmVFbGVtZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpbml0TmF2YmFyU2Nyb2xsU3B5IiwiaXNGaXhlZCIsIndpbmRvdyIsIm9mZnNldFRvcCIsInNjcm9sbFkiLCJvZmZzZXRUb3BDYXAiLCJuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIiLCJuYXZpZ2F0aW9uTG9nbyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiciIsImUiLCJ0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJfbiIsIkYiLCJzIiwibiIsImRvbmUiLCJ2YWx1ZSIsImYiLCJUeXBlRXJyb3IiLCJvIiwiYSIsInUiLCJjYWxsIiwibmV4dCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsImZyb20iLCJ0ZXN0IiwiaW5pdEJieEdhbGxlcmllcyIsImJieEdhbGxlcmllcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJfaXRlcmF0b3IiLCJfc3RlcCIsIl9sb29wIiwiZ2FsbGVyeSIsImltYWdlcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsImltYWdlIiwiZXZlbnQiLCJidWlsZFNsaWRlT3V0IiwidGFyZ2V0IiwiZXJyIiwidGh1bWJuYWlsQ2xpY2tlZCIsInNsaWRlb3V0RWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImlubmVySFRNTCIsInNsaWRlb3V0Q29udHJvbCIsInNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uIiwiaW5uZXJUZXh0IiwiY2xvc2VTbGlkZU91dCIsImFwcGVuZENoaWxkIiwiYm9keSIsImluZGV4IiwiX2l0ZXJhdG9yMyIsIl9zdGVwMyIsIl9sb29wMiIsImltYWdlRGl2RWxlbWVudCIsImltYWdlTG9hZGVyRWxlbWVudCIsImltYWdlQ291bnRlckVsZW1lbnQiLCJpbWFnZVRpdGxlIiwiZ2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJpbWFnZUVsZW1lbnQiLCJkYXRhc2V0IiwiZnVsbHNvdXJjZSIsIm92ZXJmbG93IiwiaW1hZ2VJbmRleCIsImF0dGVtcHRzIiwidHJ5U2Nyb2xsVG9JbWFnZSIsInRhcmdldEltYWdlIiwic2V0VGltZW91dCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsImtleSIsInVuZGVmaW5lZCIsImJ1aWxkVGFibGVPZkNvbnRlbnQiLCJpbml0Q29tbWVudEFuc3dlcnMiLCJoZWFkbGluZXNIMiIsInByb3RvdHlwZSIsImhlYWRsaW5lc0gzIiwiaGVhZGxpbmVzIiwiY29uY2F0IiwidG9jSHRtbCIsImhlYWRsaW5lIiwiY29udGFpbnMiLCJhbmNob3JFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0QmVmb3JlIiwiY2xhc3NBZGRpdG9uIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiY29tbWVudEFuc3dlckJ1dHRvbnMiLCJidXR0b24iLCJwYXJlbnRJZCIsInBpZCIsInJlZmVyZW5jZUlkIiwicmVmZXJlbmNlaWQiLCJwYXJlbnRJbnB1dCIsImNvbW1lbnRJbnB1dCJdLCJzb3VyY2VSb290IjoiIn0=