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
  if (toTopElement === null) {
    return;
  }

  // toTopElement.addEventListener("click", function() {
  //     window.scrollTo({
  //         top: 0,
  //         behavior: 'smooth'
  //     })
  // });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      toTopElement.classList.replace('fade-hide', 'fade-show');
    } else {
      toTopElement.classList.replace('fade-show', 'fade-hide');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM7UUFDMUQsSUFBSThILFlBQVksRUFBRTtVQUNkQSxZQUFZLENBQUN6RixLQUFLLEdBQUdzRixXQUFXO1FBQ3BDO01BQ0osQ0FBQyxDQUFDO0lBQ047RUFBQyxTQUFBeEQsR0FBQTtJQUFBTixVQUFBLENBQUFyQyxDQUFBLENBQUEyQyxHQUFBO0VBQUE7SUFBQU4sVUFBQSxDQUFBdkIsQ0FBQTtFQUFBO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9fZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmJ4R2FsbGVyeS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9ibG9ncG9zdC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XG5cbnJlcXVpcmUoJy4vcGFydGlhbHMvX2RlZmF1bHRzJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2JieEdhbGxlcnknKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvaG9tZScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ibG9ncG9zdCcpOyIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gSGFuZGxlciB3aGVuIHRoZSBET00gaXMgZnVsbHkgbG9hZGVkXG4gICAgc2V0SGVyb0JhY2tncm91bmQoKTtcbiAgICBpbml0VG9Ub3BMaW5rKCk7XG5cbiAgICAvL2luaXROYXZiYXJTY3JvbGxTcHkoKTtcbn0pO1xuXG4vKipcbiAqIFVwZGF0ZXMgaGVybyBiYWNrZ3JvdW5kIGltYWdlIGZyb20gcmVzcG9uc2l2ZSBpbWFnZSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gc2V0SGVyb0JhY2tncm91bmQoKSB7XG4gICAgLy8gVXBkYXRlIGJhY2tncm91bmQgaW1hZ2VcbiAgICBsZXQgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVyb1wiKTtcbiAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlIGltZycpLnNyYztcbiAgICBsZXQgcGljdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlJyk7XG4gICAgaGVyb0NvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybChcIiArIGltYWdlU291cmNlICsgXCIpXCI7XG4gICAgcGljdHVyZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwaWN0dXJlRWxlbWVudCk7XG4gICAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbiAgICAvL2hlcm9Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gaW5pdE5hdmJhclNjcm9sbFNweSgpIHtcblxuICAgIGxldCBpc0ZpeGVkID0gZmFsc2U7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICBsZXQgb2Zmc2V0VG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxldCBvZmZzZXRUb3BDYXAgPSA3OTtcblxuICAgICAgICBsZXQgbmF2aWdhdGlvbk1haW5CZ0xheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtbWFpbi1iZy1sYXllclwiKTtcbiAgICAgICAgbGV0IG5hdmlnYXRpb25Mb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dvXCIpO1xuXG4gICAgICAgIGlmICghaXNGaXhlZCAmJiBvZmZzZXRUb3AgPiBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgLy9uYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGaXhlZCAmJiBvZmZzZXRUb3AgPD0gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgLy8gbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5hZGQoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0VG9Ub3BMaW5rKCkge1xuICAgIGxldCB0b1RvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvLXRvcFwiKTtcblxuICAgIGlmICh0b1RvcEVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRvVG9wRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgLy8gICAgICAgICB0b3A6IDAsXG4gICAgLy8gICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAvLyAgICAgfSlcbiAgICAvLyB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPiA0MDApIHtcbiAgICAgICAgICAgIHRvVG9wRWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZSgnZmFkZS1oaWRlJywgJ2ZhZGUtc2hvdycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9Ub3BFbGVtZW50LmNsYXNzTGlzdC5yZXBsYWNlKCdmYWRlLXNob3cnLCAnZmFkZS1oaWRlJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gQkJYIGdhbGxlcnlcbiAgICBpbml0QmJ4R2FsbGVyaWVzKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0QmJ4R2FsbGVyaWVzKCkge1xuXG4gICAgbGV0IGJieEdhbGxlcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1iYngtZ2FsbGVyeVwiKTtcbiAgICBmb3IgKGxldCBnYWxsZXJ5IG9mIGJieEdhbGxlcmllcykge1xuXG4gICAgICAgIGxldCBpbWFnZXMgPSBnYWxsZXJ5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpO1xuICAgICAgICAvLyBnYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBpbWFnZXMgc28gd2UgY2FuIGp1bXAgdG8gc2VsZWN0ZWQgaW1hZ2UuIENvbWluZyBsYXRlci4uLlxuICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBQUFBQUFORC4uLi4gU28gd2UgY2FuIHVzZSBpdCBmb3IgYXJyb3cga2V5cyB0byBqdW1wIHRvIGltYWdlIDopXG5cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbWFnZXNbXVxuICogQHBhcmFtIHRodW1ibmFpbENsaWNrZWRcbiAqL1xuZnVuY3Rpb24gYnVpbGRTbGlkZU91dChpbWFnZXMsIHRodW1ibmFpbENsaWNrZWQpIHtcbiAgICAvKlxuICAgICAqIEdldCBleGlzdGluZyBzbGlkZU91dCBlbGVtZW50IG9yIGNyZWF0ZSBpZiBub3QgYXZhaWxhYmxlIHlldC5cbiAgICAgKiBSZW1vdmUgYWxsIGNvbnRlbnQgb2YgaXQuXG4gICAgICovXG4gICAgbGV0IHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIik7XG4gICAgaWYgKCFzbGlkZW91dEVsZW1lbnQpIHtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmlkID0gXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiO1xuICAgIH1cbiAgICBzbGlkZW91dEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24sIGJpbmQgY2xvc2UgZXZlbnRcbiAgICBsZXQgc2xpZGVvdXRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2wuaWQgPSBcImJieC1nYWxsZXJ5LWNvbnRyb2xcIjtcblxuICAgIGxldCBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaWQgPSBcImJieC1nYWxsZXJ5LWNsb3NlXCI7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImpzLWJieC1nYWxsZXJ5LWNsb3NlXCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGV2ZW50c1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuXG4gICAgc2xpZGVvdXRDb250cm9sLmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uKTtcbiAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sKTtcblxuICAgIC8vIEFwcGVuZCBzbGlkZSBvdXQgdG8gRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzbGlkZW91dEVsZW1lbnQpO1xuXG4gICAgLy8gQXBwZW5kIGltYWdlc1xuICAgIGxldCBpbmRleCA9IDE7XG4gICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbWctd3JhcFwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuXG4gICAgICAgIC8vIFNldHVwIGxvYWRlciB3cmFwcGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VMb2FkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9zdGF0aWMvZ2Z4L2xvYWRlci1wdWZmLnN2Z1wiIGNsYXNzPVwibG9hZGVyXCIgLz4nO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSBjb3VudGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VDb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvdW50ZXJcIik7XG5cbiAgICAgICAgbGV0IGltYWdlVGl0bGUgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoXCJhbHRcIik7XG5cbiAgICAgICAgaW1hZ2VDb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGltYWdlVGl0bGUgKyBcIiAoXCIgKyBpbmRleCArIFwiIC8gXCIgKyBpbWFnZXMubGVuZ3RoICsgXCIpXCI7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUNvdW50ZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBlbmQgaW1hZ2Ugd3JhcHBlciB0byBzbGlkZW91dFxuICAgICAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VEaXZFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBmdWxsIGltYWdlLCBhZGQgbGlzdGVuZXIgdG8gYXBwZW5kIGl0IGludG8gaW1hZ2Ugd3JhcHBlciBhZnRlciBpdCdzIGxvYWRlZFxuICAgICAgICBsZXQgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmdWxsXCIpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuZGF0YXNldC5pbmRleCA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyIChcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlLmRhdGFzZXQuZnVsbHNvdXJjZTtcblxuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIC8vIFNsaWRlIG91dCBhbmQgcHJldmVudCBib2R5IHNjcm9sbGluZ1xuICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIC8vIEp1bXAgdG8gY2xpY2tlZCBpbWFnZVxuICAgIGlmICh0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgICAgIGxldCBpbWFnZUluZGV4ID0gdGh1bWJuYWlsQ2xpY2tlZC5kYXRhc2V0LmluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgbGV0IHRyeVNjcm9sbFRvSW1hZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0SW1hZ2UgPSBzbGlkZW91dEVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nW2RhdGEtaW5kZXg9XCInICsgaW1hZ2VJbmRleCArICdcIl0nKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0SW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHJ5U2Nyb2xsVG9JbWFnZSwgNTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldEltYWdlLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0cnlTY3JvbGxUb0ltYWdlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIHtcbiAgICBpZiAoXG4gICAgICAgIGV2ZW50LmtleSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpXG4gICAgKSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEhhbmRsZXIgd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvY1wiKSkge1xuICAgICAgICBidWlsZFRhYmxlT2ZDb250ZW50KCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzXCIpKSB7XG4gICAgICAgIGluaXRDb21tZW50QW5zd2VycygpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEJ1aWxkcyB0YWJsZSBvZiBjb250ZW50IGZyb20gaDJcbiAqL1xuZnVuY3Rpb24gYnVpbGRUYWJsZU9mQ29udGVudCgpIHtcblxuICAgIC8vIEZldGNoIGhlYWRsaW5lc1xuICAgIGxldCBoZWFkbGluZXNIMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIikpO1xuICAgIGxldCBoZWFkbGluZXNIMyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDNcIikpO1xuICAgIGxldCBoZWFkbGluZXMgPSBoZWFkbGluZXNIMi5jb25jYXQoaGVhZGxpbmVzSDMpO1xuXG4gICAgbGV0IHRvY0h0bWwgPSBcIlwiO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGxldCBoZWFkbGluZSBvZiBoZWFkbGluZXMpIHtcblxuICAgICAgICAvLyBTa2lwIGlnbm9yZWQgaGVhZGxpbmVzXG4gICAgICAgIGlmIChoZWFkbGluZS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy10b2MtaWdub3JlXCIpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbmNob3IgYmVmb3JlIGhlYWRsaW5lXG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRvY1wiICsgaW5kZXgpO1xuICAgICAgICBoZWFkbGluZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhbmNob3JFbGVtZW50LCBoZWFkbGluZSk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzIG9uIEgzIGZvciBzaG93IG1vYmlsZSBvbmx5XG4gICAgICAgIGxldCBjbGFzc0FkZGl0b24gPSBcIlwiO1xuICAgICAgICBpZiAoaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCIpIHtcbiAgICAgICAgICAgIGNsYXNzQWRkaXRvbiA9ICcgY2xhc3M9XCJkLWxnLW5vbmVcIic7XG4gICAgICAgIH1cblxuICAgICAgICB0b2NIdG1sICs9ICc8bGknICsgY2xhc3NBZGRpdG9uICsgJz48YSBocmVmPVwiI3RvYycgKyBpbmRleCArICdcIj4nICsgaGVhZGxpbmUuaW5uZXJUZXh0ICsgJzwvYT48L2xpPic7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy10b2NcIilbMF0uaW5uZXJIVE1MID0gdG9jSHRtbDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBjb21tZW50IGFuc3dlcnNcbiAqL1xuZnVuY3Rpb24gaW5pdENvbW1lbnRBbnN3ZXJzKCkge1xuXG4gICAgbGV0IGNvbW1lbnRBbnN3ZXJCdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWNvbW1lbnQtYW5zd2VyXCIpO1xuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBjb21tZW50QW5zd2VyQnV0dG9ucykge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudElkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucGlkO1xuICAgICAgICAgICAgbGV0IHJlZmVyZW5jZUlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucmVmZXJlbmNlaWQ7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lm5hbWU7XG5cbiAgICAgICAgICAgIGxldCBoZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWhlYWRsaW5lJyk7XG4gICAgICAgICAgICBpZiAoaGVhZGxpbmUpIHtcbiAgICAgICAgICAgICAgICBoZWFkbGluZS5pbm5lclRleHQgPSBcIkFudHdvcnQgYW4gXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1waWQnKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHBhcmVudElucHV0LnZhbHVlID0gcGFyZW50SWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjb21tZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmZXJlbmNlLWlkJyk7XG4gICAgICAgICAgICBpZiAoY29tbWVudElucHV0KSB7XG4gICAgICAgICAgICAgICAgY29tbWVudElucHV0LnZhbHVlID0gcmVmZXJlbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEhlcm9CYWNrZ3JvdW5kIiwiaW5pdFRvVG9wTGluayIsImhlcm9Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImltYWdlU291cmNlIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInBpY3R1cmVFbGVtZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpbml0TmF2YmFyU2Nyb2xsU3B5IiwiaXNGaXhlZCIsIndpbmRvdyIsIm9mZnNldFRvcCIsInNjcm9sbFkiLCJvZmZzZXRUb3BDYXAiLCJuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIiLCJuYXZpZ2F0aW9uTG9nbyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInRvVG9wRWxlbWVudCIsInJlcGxhY2UiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInIiLCJlIiwidCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibGVuZ3RoIiwiX24iLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJmIiwiVHlwZUVycm9yIiwibyIsImEiLCJ1IiwiY2FsbCIsIm5leHQiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImluaXRCYnhHYWxsZXJpZXMiLCJiYnhHYWxsZXJpZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfbG9vcCIsImdhbGxlcnkiLCJpbWFnZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJpbWFnZSIsImV2ZW50IiwiYnVpbGRTbGlkZU91dCIsInRhcmdldCIsImVyciIsInRodW1ibmFpbENsaWNrZWQiLCJzbGlkZW91dEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJzbGlkZW91dENvbnRyb2wiLCJzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiIsImlubmVyVGV4dCIsImNsb3NlU2xpZGVPdXQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbmRleCIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJfbG9vcDIiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwiaW1hZ2VUaXRsZSIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW1hZ2VFbGVtZW50IiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImltYWdlSW5kZXgiLCJhdHRlbXB0cyIsInRyeVNjcm9sbFRvSW1hZ2UiLCJ0YXJnZXRJbWFnZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJrZXkiLCJ1bmRlZmluZWQiLCJidWlsZFRhYmxlT2ZDb250ZW50IiwiaW5pdENvbW1lbnRBbnN3ZXJzIiwiaGVhZGxpbmVzSDIiLCJwcm90b3R5cGUiLCJoZWFkbGluZXNIMyIsImhlYWRsaW5lcyIsImNvbmNhdCIsInRvY0h0bWwiLCJoZWFkbGluZSIsImNvbnRhaW5zIiwiYW5jaG9yRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImluc2VydEJlZm9yZSIsImNsYXNzQWRkaXRvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbW1lbnRBbnN3ZXJCdXR0b25zIiwiYnV0dG9uIiwicGFyZW50SWQiLCJwaWQiLCJyZWZlcmVuY2VJZCIsInJlZmVyZW5jZWlkIiwicGFyZW50SW5wdXQiLCJjb21tZW50SW5wdXQiXSwic291cmNlUm9vdCI6IiJ9