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
      imageElement.alt = imageTitle;
      imageElement.title = imageTitle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ3ZDLElBQUlDLFdBQVcsR0FBRzdELEtBQUssQ0FBQ0UsTUFBTSxDQUFDMEIsT0FBTyxDQUFDa0MsV0FBVztRQUNsRCxJQUFJN0UsSUFBSSxHQUFHZSxLQUFLLENBQUNFLE1BQU0sQ0FBQzBCLE9BQU8sQ0FBQzNDLElBQUk7UUFFcEMsSUFBSStELFFBQVEsR0FBRzFILFFBQVEsQ0FBQ00sY0FBYyxDQUFDLGtCQUFrQixDQUFDO1FBQzFELElBQUlvSCxRQUFRLEVBQUU7VUFDVkEsUUFBUSxDQUFDckMsU0FBUyxHQUFHLGFBQWEsR0FBRzFCLElBQUk7UUFDN0M7UUFFQSxJQUFJOEUsV0FBVyxHQUFHekksUUFBUSxDQUFDTSxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ3hELElBQUltSSxXQUFXLEVBQUU7VUFDYkEsV0FBVyxDQUFDMUYsS0FBSyxHQUFHc0YsUUFBUTtRQUNoQztRQUVBLElBQUlLLFlBQVksR0FBRzFJLFFBQVEsQ0FBQ00sY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUMxRCxJQUFJb0ksWUFBWSxFQUFFO1VBQ2RBLFlBQVksQ0FBQzNGLEtBQUssR0FBR3dGLFdBQVc7UUFDcEM7TUFDSixDQUFDLENBQUM7SUFDTjtFQUFDLFNBQUExRCxHQUFBO0lBQUFOLFVBQUEsQ0FBQTVDLENBQUEsQ0FBQWtELEdBQUE7RUFBQTtJQUFBTixVQUFBLENBQUF2QixDQUFBO0VBQUE7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL19kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9iYnhHYWxsZXJ5LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2Jsb2dwb3N0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2Nzcz84ZjU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xuXG5yZXF1aXJlKCcuL3BhcnRpYWxzL19kZWZhdWx0cycpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9iYnhHYWxsZXJ5Jyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2hvbWUnKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvYmxvZ3Bvc3QnKTsiLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEhhbmRsZXIgd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZFxuICAgIHNldEhlcm9CYWNrZ3JvdW5kKCk7XG4gICAgaW5pdFRvVG9wTGluaygpO1xuXG4gICAgLy9pbml0TmF2YmFyU2Nyb2xsU3B5KCk7XG59KTtcblxuLyoqXG4gKiBVcGRhdGVzIGhlcm8gYmFja2dyb3VuZCBpbWFnZSBmcm9tIHJlc3BvbnNpdmUgaW1hZ2Ugc291cmNlXG4gKi9cbmZ1bmN0aW9uIHNldEhlcm9CYWNrZ3JvdW5kKCkge1xuICAgIC8vIFVwZGF0ZSBiYWNrZ3JvdW5kIGltYWdlXG4gICAgbGV0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9cIik7XG4gICAgaWYgKCFoZXJvQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICBsZXQgaW1hZ2VTb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVybyBwaWN0dXJlIGltZycpPy5zcmM7XG4gICAgaWYgKCFpbWFnZVNvdXJjZSkgcmV0dXJuO1xuXG4gICAgbGV0IHBpY3R1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlcm8gcGljdHVyZScpO1xuICAgIGlmICghcGljdHVyZUVsZW1lbnQpIHJldHVybjtcblxuICAgIGhlcm9Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBpbWFnZVNvdXJjZSArIFwiKVwiO1xuICAgIHBpY3R1cmVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocGljdHVyZUVsZW1lbnQpO1xuICAgIC8vIFJlbW92ZSBlbGVtZW50IGZyb20gRE9NXG4gICAgLy9oZXJvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGluaXROYXZiYXJTY3JvbGxTcHkoKSB7XG5cbiAgICBsZXQgaXNGaXhlZCA9IGZhbHNlO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgbGV0IG9mZnNldFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wQ2FwID0gNzk7XG5cbiAgICAgICAgbGV0IG5hdmlnYXRpb25NYWluQmdMYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1haW4tYmctbGF5ZXJcIik7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uTG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcblxuICAgICAgICBpZiAoIWlzRml4ZWQgJiYgb2Zmc2V0VG9wID4gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIC8vbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QuYWRkKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRml4ZWQgJiYgb2Zmc2V0VG9wIDw9IG9mZnNldFRvcENhcCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkxvZ28uY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtaW5cIik7XG4gICAgICAgICAgIC8vIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QuYWRkKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1vdXRcIik7XG4gICAgICAgICAgICBpc0ZpeGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdFRvVG9wTGluaygpIHtcbiAgICBjb25zdCB0b1RvcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvLXRvcFwiKTtcblxuICAgIGlmICghdG9Ub3BFbGVtZW50KSByZXR1cm47XG5cbiAgICB0b1RvcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPiA0MDApIHtcbiAgICAgICAgICAgIHRvVG9wRWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcImZhZGUtaGlkZVwiLCBcImZhZGUtc2hvd1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvVG9wRWxlbWVudC5jbGFzc0xpc3QucmVwbGFjZShcImZhZGUtc2hvd1wiLCBcImZhZGUtaGlkZVwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBCQlggZ2FsbGVyeVxuICAgIGluaXRCYnhHYWxsZXJpZXMoKTtcblxufSk7XG5cbmZ1bmN0aW9uIGluaXRCYnhHYWxsZXJpZXMoKSB7XG5cbiAgICBsZXQgYmJ4R2FsbGVyaWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWJieC1nYWxsZXJ5XCIpO1xuICAgIGZvciAobGV0IGdhbGxlcnkgb2YgYmJ4R2FsbGVyaWVzKSB7XG5cbiAgICAgICAgbGV0IGltYWdlcyA9IGdhbGxlcnkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIik7XG4gICAgICAgIC8vIGdhbGxlcnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIC8vICAgICBidWlsZFNsaWRlT3V0KGltYWdlcywgZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIHRvIGltYWdlcyBzbyB3ZSBjYW4ganVtcCB0byBzZWxlY3RlZCBpbWFnZS4gQ29taW5nIGxhdGVyLi4uXG4gICAgICAgIGZvciAobGV0IGltYWdlIG9mIGltYWdlcykge1xuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFBQUFBQU5ELi4uLiBTbyB3ZSBjYW4gdXNlIGl0IGZvciBhcnJvdyBrZXlzIHRvIGp1bXAgdG8gaW1hZ2UgOilcblxuICAgIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIGltYWdlc1tdXG4gKiBAcGFyYW0gdGh1bWJuYWlsQ2xpY2tlZFxuICovXG5mdW5jdGlvbiBidWlsZFNsaWRlT3V0KGltYWdlcywgdGh1bWJuYWlsQ2xpY2tlZCkge1xuICAgIC8qXG4gICAgICogR2V0IGV4aXN0aW5nIHNsaWRlT3V0IGVsZW1lbnQgb3IgY3JlYXRlIGlmIG5vdCBhdmFpbGFibGUgeWV0LlxuICAgICAqIFJlbW92ZSBhbGwgY29udGVudCBvZiBpdC5cbiAgICAgKi9cbiAgICBsZXQgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiKTtcbiAgICBpZiAoIXNsaWRlb3V0RWxlbWVudCkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuaWQgPSBcImJieC1nYWxsZXJ5LXNsaWRlb3V0XCI7XG4gICAgfVxuICAgIHNsaWRlb3V0RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGJ1dHRvbiwgYmluZCBjbG9zZSBldmVudFxuICAgIGxldCBzbGlkZW91dENvbnRyb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbC5pZCA9IFwiYmJ4LWdhbGxlcnktY29udHJvbFwiO1xuXG4gICAgbGV0IHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5pZCA9IFwiYmJ4LWdhbGxlcnktY2xvc2VcIjtcbiAgICBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwianMtYmJ4LWdhbGxlcnktY2xvc2VcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaW5uZXJUZXh0ID0gXCJYXCI7XG5cbiAgICAvLyBBZGQgY2xvc2UgZXZlbnRzXG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHsgY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG5cbiAgICBzbGlkZW91dENvbnRyb2wuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24pO1xuICAgIHNsaWRlb3V0RWxlbWVudC5hcHBlbmRDaGlsZChzbGlkZW91dENvbnRyb2wpO1xuXG4gICAgLy8gQXBwZW5kIHNsaWRlIG91dCB0byBET01cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNsaWRlb3V0RWxlbWVudCk7XG5cbiAgICAvLyBBcHBlbmQgaW1hZ2VzXG4gICAgbGV0IGluZGV4ID0gMTtcbiAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSB3cmFwcGVyXG4gICAgICAgIGxldCBpbWFnZURpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImltZy13cmFwXCIpO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImxvYWRpbmdcIik7XG5cbiAgICAgICAgLy8gU2V0dXAgbG9hZGVyIHdyYXBwZXIsIGFwcGVuZCB0byBpbWFnZSB3cmFwcGVyXG4gICAgICAgIGxldCBpbWFnZUxvYWRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpbWFnZUxvYWRlckVsZW1lbnQuaW5uZXJIVE1MID0gJzxpbWcgc3JjPVwiL3N0YXRpYy9nZngvbG9hZGVyLXB1ZmYuc3ZnXCIgY2xhc3M9XCJsb2FkZXJcIiAvPic7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUxvYWRlckVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFNldHVwIGltYWdlIGNvdW50ZXIsIGFwcGVuZCB0byBpbWFnZSB3cmFwcGVyXG4gICAgICAgIGxldCBpbWFnZUNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VDb3VudGVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiY291bnRlclwiKTtcblxuICAgICAgICBsZXQgaW1hZ2VUaXRsZSA9IGltYWdlLmdldEF0dHJpYnV0ZShcImFsdFwiKTtcblxuICAgICAgICBpbWFnZUNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gaW1hZ2VUaXRsZSArIFwiIChcIiArIGluZGV4ICsgXCIgLyBcIiArIGltYWdlcy5sZW5ndGggKyBcIilcIjtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlQ291bnRlckVsZW1lbnQpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBpbWFnZSB3cmFwcGVyIHRvIHNsaWRlb3V0XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZURpdkVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFNldHVwIGZ1bGwgaW1hZ2UsIGFkZCBsaXN0ZW5lciB0byBhcHBlbmQgaXQgaW50byBpbWFnZSB3cmFwcGVyIGFmdGVyIGl0J3MgbG9hZGVkXG4gICAgICAgIGxldCBpbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZ1bGxcIik7XG4gICAgICAgIGltYWdlRWxlbWVudC5hbHQgPSBpbWFnZVRpdGxlO1xuICAgICAgICBpbWFnZUVsZW1lbnQudGl0bGUgPSBpbWFnZVRpdGxlO1xuICAgICAgICBpbWFnZUVsZW1lbnQuZGF0YXNldC5pbmRleCA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyIChcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlLmRhdGFzZXQuZnVsbHNvdXJjZTtcblxuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIC8vIFNsaWRlIG91dCBhbmQgcHJldmVudCBib2R5IHNjcm9sbGluZ1xuICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIC8vIEp1bXAgdG8gY2xpY2tlZCBpbWFnZVxuICAgIGlmICh0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgICAgIGxldCBpbWFnZUluZGV4ID0gdGh1bWJuYWlsQ2xpY2tlZC5kYXRhc2V0LmluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgbGV0IHRyeVNjcm9sbFRvSW1hZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0SW1hZ2UgPSBzbGlkZW91dEVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nW2RhdGEtaW5kZXg9XCInICsgaW1hZ2VJbmRleCArICdcIl0nKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0SW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHJ5U2Nyb2xsVG9JbWFnZSwgNTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldEltYWdlLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0cnlTY3JvbGxUb0ltYWdlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIHtcbiAgICBpZiAoXG4gICAgICAgIGV2ZW50LmtleSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpXG4gICAgKSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEhhbmRsZXIgd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvY1wiKSkge1xuICAgICAgICBidWlsZFRhYmxlT2ZDb250ZW50KCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzXCIpKSB7XG4gICAgICAgIGluaXRDb21tZW50QW5zd2VycygpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEJ1aWxkcyB0YWJsZSBvZiBjb250ZW50IGZyb20gaDJcbiAqL1xuZnVuY3Rpb24gYnVpbGRUYWJsZU9mQ29udGVudCgpIHtcblxuICAgIC8vIEZldGNoIGhlYWRsaW5lc1xuICAgIGxldCBoZWFkbGluZXNIMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIikpO1xuICAgIGxldCBoZWFkbGluZXNIMyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDNcIikpO1xuICAgIGxldCBoZWFkbGluZXMgPSBoZWFkbGluZXNIMi5jb25jYXQoaGVhZGxpbmVzSDMpO1xuXG4gICAgbGV0IHRvY0h0bWwgPSBcIlwiO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGxldCBoZWFkbGluZSBvZiBoZWFkbGluZXMpIHtcblxuICAgICAgICAvLyBTa2lwIGlnbm9yZWQgaGVhZGxpbmVzXG4gICAgICAgIGlmIChoZWFkbGluZS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy10b2MtaWdub3JlXCIpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbmNob3IgYmVmb3JlIGhlYWRsaW5lXG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRvY1wiICsgaW5kZXgpO1xuICAgICAgICBoZWFkbGluZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhbmNob3JFbGVtZW50LCBoZWFkbGluZSk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzIG9uIEgzIGZvciBzaG93IG1vYmlsZSBvbmx5XG4gICAgICAgIGxldCBjbGFzc0FkZGl0b24gPSBcIlwiO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBoZWFkbGluZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaDNcIlxuICAgICAgICAgICAgJiYgaGVhZGxpbmUucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJibG9ncG9zdC1jb250ZW50XCIpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNsYXNzQWRkaXRvbiA9ICcgY2xhc3M9XCJkLWxnLW5vbmVcIic7XG4gICAgICAgIH1cblxuICAgICAgICB0b2NIdG1sICs9ICc8bGknICsgY2xhc3NBZGRpdG9uICsgJz48YSBocmVmPVwiI3RvYycgKyBpbmRleCArICdcIj4nICsgaGVhZGxpbmUuaW5uZXJUZXh0ICsgJzwvYT48L2xpPic7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy10b2NcIilbMF0uaW5uZXJIVE1MID0gdG9jSHRtbDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBjb21tZW50IGFuc3dlcnNcbiAqL1xuZnVuY3Rpb24gaW5pdENvbW1lbnRBbnN3ZXJzKCkge1xuXG4gICAgbGV0IGNvbW1lbnRBbnN3ZXJCdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWNvbW1lbnQtYW5zd2VyXCIpO1xuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBjb21tZW50QW5zd2VyQnV0dG9ucykge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudElkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucGlkO1xuICAgICAgICAgICAgbGV0IHJlZmVyZW5jZUlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucmVmZXJlbmNlaWQ7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lm5hbWU7XG5cbiAgICAgICAgICAgIGxldCBoZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWhlYWRsaW5lJyk7XG4gICAgICAgICAgICBpZiAoaGVhZGxpbmUpIHtcbiAgICAgICAgICAgICAgICBoZWFkbGluZS5pbm5lclRleHQgPSBcIkFudHdvcnQgYW4gXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1waWQnKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHBhcmVudElucHV0LnZhbHVlID0gcGFyZW50SWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjb21tZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmZXJlbmNlLWlkJyk7XG4gICAgICAgICAgICBpZiAoY29tbWVudElucHV0KSB7XG4gICAgICAgICAgICAgICAgY29tbWVudElucHV0LnZhbHVlID0gcmVmZXJlbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsicmVxdWlyZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldEhlcm9CYWNrZ3JvdW5kIiwiaW5pdFRvVG9wTGluayIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsImhlcm9Db250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImltYWdlU291cmNlIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInBpY3R1cmVFbGVtZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJpbml0TmF2YmFyU2Nyb2xsU3B5IiwiaXNGaXhlZCIsIndpbmRvdyIsIm9mZnNldFRvcCIsInNjcm9sbFkiLCJvZmZzZXRUb3BDYXAiLCJuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIiLCJuYXZpZ2F0aW9uTG9nbyIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInRvVG9wRWxlbWVudCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNjcm9sbFRvIiwidG9wIiwiYmVoYXZpb3IiLCJyZXBsYWNlIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJyIiwidCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibGVuZ3RoIiwiX24iLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJmIiwiVHlwZUVycm9yIiwibyIsImEiLCJ1IiwiY2FsbCIsIm5leHQiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImluaXRCYnhHYWxsZXJpZXMiLCJiYnhHYWxsZXJpZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfbG9vcCIsImdhbGxlcnkiLCJpbWFnZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJpbWFnZSIsImV2ZW50IiwiYnVpbGRTbGlkZU91dCIsInRhcmdldCIsImVyciIsInRodW1ibmFpbENsaWNrZWQiLCJzbGlkZW91dEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJzbGlkZW91dENvbnRyb2wiLCJzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiIsImlubmVyVGV4dCIsImNsb3NlU2xpZGVPdXQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbmRleCIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJfbG9vcDIiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwiaW1hZ2VUaXRsZSIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW1hZ2VFbGVtZW50IiwiYWx0IiwidGl0bGUiLCJkYXRhc2V0IiwiZnVsbHNvdXJjZSIsIm92ZXJmbG93IiwiaW1hZ2VJbmRleCIsImF0dGVtcHRzIiwidHJ5U2Nyb2xsVG9JbWFnZSIsInRhcmdldEltYWdlIiwic2V0VGltZW91dCIsInNjcm9sbEludG9WaWV3IiwiYmxvY2siLCJrZXkiLCJ1bmRlZmluZWQiLCJidWlsZFRhYmxlT2ZDb250ZW50IiwiaW5pdENvbW1lbnRBbnN3ZXJzIiwiaGVhZGxpbmVzSDIiLCJwcm90b3R5cGUiLCJoZWFkbGluZXNIMyIsImhlYWRsaW5lcyIsImNvbmNhdCIsInRvY0h0bWwiLCJoZWFkbGluZSIsImNvbnRhaW5zIiwiYW5jaG9yRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImluc2VydEJlZm9yZSIsImNsYXNzQWRkaXRvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInBhcmVudEVsZW1lbnQiLCJjb21tZW50QW5zd2VyQnV0dG9ucyIsImJ1dHRvbiIsInBhcmVudElkIiwicGlkIiwicmVmZXJlbmNlSWQiLCJyZWZlcmVuY2VpZCIsInBhcmVudElucHV0IiwiY29tbWVudElucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==