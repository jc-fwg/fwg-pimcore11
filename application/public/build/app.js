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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1FBQ3ZDLElBQUlDLFdBQVcsR0FBRzdELEtBQUssQ0FBQ0UsTUFBTSxDQUFDMEIsT0FBTyxDQUFDa0MsV0FBVztRQUNsRCxJQUFJN0UsSUFBSSxHQUFHZSxLQUFLLENBQUNFLE1BQU0sQ0FBQzBCLE9BQU8sQ0FBQzNDLElBQUk7UUFFcEMsSUFBSStELFFBQVEsR0FBRzFILFFBQVEsQ0FBQ00sY0FBYyxDQUFDLGtCQUFrQixDQUFDO1FBQzFELElBQUlvSCxRQUFRLEVBQUU7VUFDVkEsUUFBUSxDQUFDckMsU0FBUyxHQUFHLGFBQWEsR0FBRzFCLElBQUk7UUFDN0M7UUFFQSxJQUFJOEUsV0FBVyxHQUFHekksUUFBUSxDQUFDTSxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQ3hELElBQUltSSxXQUFXLEVBQUU7VUFDYkEsV0FBVyxDQUFDMUYsS0FBSyxHQUFHc0YsUUFBUTtRQUNoQztRQUVBLElBQUlLLFlBQVksR0FBRzFJLFFBQVEsQ0FBQ00sY0FBYyxDQUFDLGNBQWMsQ0FBQztRQUMxRCxJQUFJb0ksWUFBWSxFQUFFO1VBQ2RBLFlBQVksQ0FBQzNGLEtBQUssR0FBR3dGLFdBQVc7UUFDcEM7TUFDSixDQUFDLENBQUM7SUFDTjtFQUFDLFNBQUExRCxHQUFBO0lBQUFOLFVBQUEsQ0FBQTVDLENBQUEsQ0FBQWtELEdBQUE7RUFBQTtJQUFBTixVQUFBLENBQUF2QixDQUFBO0VBQUE7QUFDTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL19kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9wYXJ0aWFscy9iYnhHYWxsZXJ5LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2Jsb2dwb3N0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxucmVxdWlyZSgnLi9wYXJ0aWFscy9fZGVmYXVsdHMnKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvYmJ4R2FsbGVyeScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ob21lJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2Jsb2dwb3N0Jyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBzZXRIZXJvQmFja2dyb3VuZCgpO1xuICAgIGluaXRUb1RvcExpbmsoKTtcblxuICAgIC8vaW5pdE5hdmJhclNjcm9sbFNweSgpO1xufSk7XG5cbi8qKlxuICogVXBkYXRlcyBoZXJvIGJhY2tncm91bmQgaW1hZ2UgZnJvbSByZXNwb25zaXZlIGltYWdlIHNvdXJjZVxuICovXG5mdW5jdGlvbiBzZXRIZXJvQmFja2dyb3VuZCgpIHtcbiAgICAvLyBVcGRhdGUgYmFja2dyb3VuZCBpbWFnZVxuICAgIGxldCBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoZXJvXCIpO1xuICAgIGlmICghaGVyb0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgbGV0IGltYWdlU291cmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlcm8gcGljdHVyZSBpbWcnKT8uc3JjO1xuICAgIGlmICghaW1hZ2VTb3VyY2UpIHJldHVybjtcblxuICAgIGxldCBwaWN0dXJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZXJvIHBpY3R1cmUnKTtcbiAgICBpZiAoIXBpY3R1cmVFbGVtZW50KSByZXR1cm47XG5cbiAgICBoZXJvQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgaW1hZ2VTb3VyY2UgKyBcIilcIjtcbiAgICBwaWN0dXJlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHBpY3R1cmVFbGVtZW50KTtcbiAgICAvLyBSZW1vdmUgZWxlbWVudCBmcm9tIERPTVxuICAgIC8vaGVyb0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBpbml0TmF2YmFyU2Nyb2xsU3B5KCkge1xuXG4gICAgbGV0IGlzRml4ZWQgPSBmYWxzZTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGxldCBvZmZzZXRUb3AgPSB3aW5kb3cuc2Nyb2xsWTtcbiAgICAgICAgbGV0IG9mZnNldFRvcENhcCA9IDc5O1xuXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi1tYWluLWJnLWxheWVyXCIpO1xuICAgICAgICBsZXQgbmF2aWdhdGlvbkxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29cIik7XG5cbiAgICAgICAgaWYgKCFpc0ZpeGVkICYmIG9mZnNldFRvcCA+IG9mZnNldFRvcENhcCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkxvZ28uY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgICAgICAgICAvL25hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1vdXRcIik7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtaW5cIik7XG4gICAgICAgICAgICBpc0ZpeGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZpeGVkICYmIG9mZnNldFRvcCA8PSBvZmZzZXRUb3BDYXApIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25Mb2dvLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLWluXCIpO1xuICAgICAgICAgICAvLyBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LmFkZChcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtb3V0XCIpO1xuICAgICAgICAgICAgaXNGaXhlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRUb1RvcExpbmsoKSB7XG4gICAgY29uc3QgdG9Ub3BFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0by10b3BcIik7XG5cbiAgICBpZiAoIXRvVG9wRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgdG9Ub3BFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIlxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gNDAwKSB7XG4gICAgICAgICAgICB0b1RvcEVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJmYWRlLWhpZGVcIiwgXCJmYWRlLXNob3dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1RvcEVsZW1lbnQuY2xhc3NMaXN0LnJlcGxhY2UoXCJmYWRlLXNob3dcIiwgXCJmYWRlLWhpZGVcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gQkJYIGdhbGxlcnlcbiAgICBpbml0QmJ4R2FsbGVyaWVzKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0QmJ4R2FsbGVyaWVzKCkge1xuXG4gICAgbGV0IGJieEdhbGxlcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1iYngtZ2FsbGVyeVwiKTtcbiAgICBmb3IgKGxldCBnYWxsZXJ5IG9mIGJieEdhbGxlcmllcykge1xuXG4gICAgICAgIGxldCBpbWFnZXMgPSBnYWxsZXJ5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpO1xuICAgICAgICAvLyBnYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBpbWFnZXMgc28gd2UgY2FuIGp1bXAgdG8gc2VsZWN0ZWQgaW1hZ2UuIENvbWluZyBsYXRlci4uLlxuICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBQUFBQUFORC4uLi4gU28gd2UgY2FuIHVzZSBpdCBmb3IgYXJyb3cga2V5cyB0byBqdW1wIHRvIGltYWdlIDopXG5cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbWFnZXNbXVxuICogQHBhcmFtIHRodW1ibmFpbENsaWNrZWRcbiAqL1xuZnVuY3Rpb24gYnVpbGRTbGlkZU91dChpbWFnZXMsIHRodW1ibmFpbENsaWNrZWQpIHtcbiAgICAvKlxuICAgICAqIEdldCBleGlzdGluZyBzbGlkZU91dCBlbGVtZW50IG9yIGNyZWF0ZSBpZiBub3QgYXZhaWxhYmxlIHlldC5cbiAgICAgKiBSZW1vdmUgYWxsIGNvbnRlbnQgb2YgaXQuXG4gICAgICovXG4gICAgbGV0IHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIik7XG4gICAgaWYgKCFzbGlkZW91dEVsZW1lbnQpIHtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmlkID0gXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiO1xuICAgIH1cbiAgICBzbGlkZW91dEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24sIGJpbmQgY2xvc2UgZXZlbnRcbiAgICBsZXQgc2xpZGVvdXRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2wuaWQgPSBcImJieC1nYWxsZXJ5LWNvbnRyb2xcIjtcblxuICAgIGxldCBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaWQgPSBcImJieC1nYWxsZXJ5LWNsb3NlXCI7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImpzLWJieC1nYWxsZXJ5LWNsb3NlXCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGV2ZW50c1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuXG4gICAgc2xpZGVvdXRDb250cm9sLmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uKTtcbiAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sKTtcblxuICAgIC8vIEFwcGVuZCBzbGlkZSBvdXQgdG8gRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzbGlkZW91dEVsZW1lbnQpO1xuXG4gICAgLy8gQXBwZW5kIGltYWdlc1xuICAgIGxldCBpbmRleCA9IDE7XG4gICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbWctd3JhcFwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuXG4gICAgICAgIC8vIFNldHVwIGxvYWRlciB3cmFwcGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VMb2FkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9zdGF0aWMvZ2Z4L2xvYWRlci1wdWZmLnN2Z1wiIGNsYXNzPVwibG9hZGVyXCIgLz4nO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSBjb3VudGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VDb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvdW50ZXJcIik7XG5cbiAgICAgICAgbGV0IGltYWdlVGl0bGUgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoXCJhbHRcIik7XG5cbiAgICAgICAgaW1hZ2VDb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGltYWdlVGl0bGUgKyBcIiAoXCIgKyBpbmRleCArIFwiIC8gXCIgKyBpbWFnZXMubGVuZ3RoICsgXCIpXCI7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUNvdW50ZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBlbmQgaW1hZ2Ugd3JhcHBlciB0byBzbGlkZW91dFxuICAgICAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VEaXZFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBmdWxsIGltYWdlLCBhZGQgbGlzdGVuZXIgdG8gYXBwZW5kIGl0IGludG8gaW1hZ2Ugd3JhcHBlciBhZnRlciBpdCdzIGxvYWRlZFxuICAgICAgICBsZXQgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmdWxsXCIpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuYWx0ID0gaW1hZ2VUaXRsZTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LnRpdGxlID0gaW1hZ2VUaXRsZTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmRhdGFzZXQuaW5kZXggPSBpbmRleC50b1N0cmluZygpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltYWdlTG9hZGVyRWxlbWVudCk7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gICAgICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGltYWdlRWxlbWVudC5zcmMgPSBpbWFnZS5kYXRhc2V0LmZ1bGxzb3VyY2U7XG5cbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBvdXQgYW5kIHByZXZlbnQgYm9keSBzY3JvbGxpbmdcbiAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG5cbiAgICAvLyBKdW1wIHRvIGNsaWNrZWQgaW1hZ2VcbiAgICBpZiAodGh1bWJuYWlsQ2xpY2tlZCkge1xuICAgICAgICBsZXQgaW1hZ2VJbmRleCA9IHRodW1ibmFpbENsaWNrZWQuZGF0YXNldC5pbmRleC50b1N0cmluZygpO1xuICAgICAgICBsZXQgYXR0ZW1wdHMgPSAwO1xuXG4gICAgICAgIGxldCB0cnlTY3JvbGxUb0ltYWdlID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRhcmdldEltYWdlID0gc2xpZGVvdXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZ1tkYXRhLWluZGV4PVwiJyArIGltYWdlSW5kZXggKyAnXCJdJyk7XG4gICAgICAgICAgICBpZiAoIXRhcmdldEltYWdlKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcblxuICAgICAgICAgICAgICAgIGlmIChhdHRlbXB0cyA8IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRyeVNjcm9sbFRvSW1hZ2UsIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXRJbWFnZS5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5U2Nyb2xsVG9JbWFnZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZU91dChzbGlkZW91dEVsZW1lbnQsIGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgICBldmVudC5rZXkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKVxuICAgICkge1xuICAgICAgICBzbGlkZW91dEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImF1dG9cIjtcbiAgICB9XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2NcIikpIHtcbiAgICAgICAgYnVpbGRUYWJsZU9mQ29udGVudCgpO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21tZW50c1wiKSkge1xuICAgICAgICBpbml0Q29tbWVudEFuc3dlcnMoKTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiBCdWlsZHMgdGFibGUgb2YgY29udGVudCBmcm9tIGgyXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkVGFibGVPZkNvbnRlbnQoKSB7XG5cbiAgICAvLyBGZXRjaCBoZWFkbGluZXNcbiAgICBsZXQgaGVhZGxpbmVzSDIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgyXCIpKTtcbiAgICBsZXQgaGVhZGxpbmVzSDMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgzXCIpKTtcbiAgICBsZXQgaGVhZGxpbmVzID0gaGVhZGxpbmVzSDIuY29uY2F0KGhlYWRsaW5lc0gzKTtcblxuICAgIGxldCB0b2NIdG1sID0gXCJcIjtcbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChsZXQgaGVhZGxpbmUgb2YgaGVhZGxpbmVzKSB7XG5cbiAgICAgICAgLy8gU2tpcCBpZ25vcmVkIGhlYWRsaW5lc1xuICAgICAgICBpZiAoaGVhZGxpbmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtdG9jLWlnbm9yZVwiKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgYW5jaG9yIGJlZm9yZSBoZWFkbGluZVxuICAgICAgICBsZXQgYW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBhbmNob3JFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ0b2NcIiArIGluZGV4KTtcbiAgICAgICAgaGVhZGxpbmUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYW5jaG9yRWxlbWVudCwgaGVhZGxpbmUpO1xuXG4gICAgICAgIC8vIEFkZCBjbGFzcyBvbiBIMyBmb3Igc2hvdyBtb2JpbGUgb25seVxuICAgICAgICBsZXQgY2xhc3NBZGRpdG9uID0gXCJcIjtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCJcbiAgICAgICAgICAgICYmIGhlYWRsaW5lLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYmxvZ3Bvc3QtY29udGVudFwiKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjbGFzc0FkZGl0b24gPSAnIGNsYXNzPVwiZC1sZy1ub25lXCInO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9jSHRtbCArPSAnPGxpJyArIGNsYXNzQWRkaXRvbiArICc+PGEgaHJlZj1cIiN0b2MnICsgaW5kZXggKyAnXCI+JyArIGhlYWRsaW5lLmlubmVyVGV4dCArICc8L2E+PC9saT4nO1xuICAgICAgICBpbmRleCsrO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwianMtdG9jXCIpWzBdLmlubmVySFRNTCA9IHRvY0h0bWw7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgY29tbWVudCBhbnN3ZXJzXG4gKi9cbmZ1bmN0aW9uIGluaXRDb21tZW50QW5zd2VycygpIHtcblxuICAgIGxldCBjb21tZW50QW5zd2VyQnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1jb21tZW50LWFuc3dlclwiKTtcbiAgICBmb3IgKGxldCBidXR0b24gb2YgY29tbWVudEFuc3dlckJ1dHRvbnMpIHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGxldCBwYXJlbnRJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnBpZDtcbiAgICAgICAgICAgIGxldCByZWZlcmVuY2VJZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnJlZmVyZW5jZWlkO1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBldmVudC50YXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgICAgICAgICBsZXQgaGVhZGxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1oZWFkbGluZScpO1xuICAgICAgICAgICAgaWYgKGhlYWRsaW5lKSB7XG4gICAgICAgICAgICAgICAgaGVhZGxpbmUuaW5uZXJUZXh0ID0gXCJBbnR3b3J0IGFuIFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBhcmVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQtcGlkJyk7XG4gICAgICAgICAgICBpZiAocGFyZW50SW5wdXQpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRJbnB1dC52YWx1ZSA9IHBhcmVudElkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY29tbWVudElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlZmVyZW5jZS1pZCcpO1xuICAgICAgICAgICAgaWYgKGNvbW1lbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIGNvbW1lbnRJbnB1dC52YWx1ZSA9IHJlZmVyZW5jZUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRIZXJvQmFja2dyb3VuZCIsImluaXRUb1RvcExpbmsiLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJoZXJvQ29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbWFnZVNvdXJjZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJwaWN0dXJlRWxlbWVudCIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW5pdE5hdmJhclNjcm9sbFNweSIsImlzRml4ZWQiLCJ3aW5kb3ciLCJvZmZzZXRUb3AiLCJzY3JvbGxZIiwib2Zmc2V0VG9wQ2FwIiwibmF2aWdhdGlvbk1haW5CZ0xheWVyIiwibmF2aWdhdGlvbkxvZ28iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJ0b1RvcEVsZW1lbnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJzY3JvbGxUbyIsInRvcCIsImJlaGF2aW9yIiwicmVwbGFjZSIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiciIsInQiLCJTeW1ib2wiLCJpdGVyYXRvciIsIkFycmF5IiwiaXNBcnJheSIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsImxlbmd0aCIsIl9uIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZiIsIlR5cGVFcnJvciIsIm8iLCJhIiwidSIsImNhbGwiLCJuZXh0IiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZnJvbSIsInRlc3QiLCJpbml0QmJ4R2FsbGVyaWVzIiwiYmJ4R2FsbGVyaWVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIl9pdGVyYXRvciIsIl9zdGVwIiwiX2xvb3AiLCJnYWxsZXJ5IiwiaW1hZ2VzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiaW1hZ2UiLCJldmVudCIsImJ1aWxkU2xpZGVPdXQiLCJ0YXJnZXQiLCJlcnIiLCJ0aHVtYm5haWxDbGlja2VkIiwic2xpZGVvdXRFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImlkIiwiaW5uZXJIVE1MIiwic2xpZGVvdXRDb250cm9sIiwic2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24iLCJpbm5lclRleHQiLCJjbG9zZVNsaWRlT3V0IiwiYXBwZW5kQ2hpbGQiLCJib2R5IiwiaW5kZXgiLCJfaXRlcmF0b3IzIiwiX3N0ZXAzIiwiX2xvb3AyIiwiaW1hZ2VEaXZFbGVtZW50IiwiaW1hZ2VMb2FkZXJFbGVtZW50IiwiaW1hZ2VDb3VudGVyRWxlbWVudCIsImltYWdlVGl0bGUiLCJnZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImltYWdlRWxlbWVudCIsImFsdCIsInRpdGxlIiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImltYWdlSW5kZXgiLCJhdHRlbXB0cyIsInRyeVNjcm9sbFRvSW1hZ2UiLCJ0YXJnZXRJbWFnZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJbnRvVmlldyIsImJsb2NrIiwia2V5IiwidW5kZWZpbmVkIiwiYnVpbGRUYWJsZU9mQ29udGVudCIsImluaXRDb21tZW50QW5zd2VycyIsImhlYWRsaW5lc0gyIiwicHJvdG90eXBlIiwiaGVhZGxpbmVzSDMiLCJoZWFkbGluZXMiLCJjb25jYXQiLCJ0b2NIdG1sIiwiaGVhZGxpbmUiLCJjb250YWlucyIsImFuY2hvckVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJpbnNlcnRCZWZvcmUiLCJjbGFzc0FkZGl0b24iLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJwYXJlbnRFbGVtZW50IiwiY29tbWVudEFuc3dlckJ1dHRvbnMiLCJidXR0b24iLCJwYXJlbnRJZCIsInBpZCIsInJlZmVyZW5jZUlkIiwicmVmZXJlbmNlaWQiLCJwYXJlbnRJbnB1dCIsImNvbW1lbnRJbnB1dCJdLCJzb3VyY2VSb290IjoiIn0=