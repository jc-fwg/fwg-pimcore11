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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU8sQ0FBQ2dDLEdBQUc7UUFDdkMsSUFBSUMsV0FBVyxHQUFHM0QsS0FBSyxDQUFDRSxNQUFNLENBQUN3QixPQUFPLENBQUNrQyxXQUFXO1FBQ2xELElBQUkzRSxJQUFJLEdBQUdlLEtBQUssQ0FBQ0UsTUFBTSxDQUFDd0IsT0FBTyxDQUFDekMsSUFBSTtRQUVwQyxJQUFJOEQsUUFBUSxHQUFHakgsUUFBUSxDQUFDSSxjQUFjLENBQUMsa0JBQWtCLENBQUM7UUFDMUQsSUFBSTZHLFFBQVEsRUFBRTtVQUNWQSxRQUFRLENBQUNwQyxTQUFTLEdBQUcsYUFBYSxHQUFHMUIsSUFBSTtRQUM3QztRQUVBLElBQUk0RSxXQUFXLEdBQUcvSCxRQUFRLENBQUNJLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDeEQsSUFBSTJILFdBQVcsRUFBRTtVQUNiQSxXQUFXLENBQUN4RixLQUFLLEdBQUdvRixRQUFRO1FBQ2hDO1FBRUEsSUFBSUssWUFBWSxHQUFHaEksUUFBUSxDQUFDSSxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQzFELElBQUk0SCxZQUFZLEVBQUU7VUFDZEEsWUFBWSxDQUFDekYsS0FBSyxHQUFHc0YsV0FBVztRQUNwQztNQUNKLENBQUMsQ0FBQztJQUNOO0VBQUMsU0FBQXhELEdBQUE7SUFBQU4sVUFBQSxDQUFBckMsQ0FBQSxDQUFBMkMsR0FBQTtFQUFBO0lBQUFOLFVBQUEsQ0FBQXZCLENBQUE7RUFBQTtBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUU5RUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vYXNzZXRzL3BhcnRpYWxzL2JieEdhbGxlcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvYmxvZ3Bvc3QuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9hc3NldHMvcGFydGlhbHMvaG9tZS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3M/OGY1OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcblxucmVxdWlyZSgnLi9wYXJ0aWFscy9fZGVmYXVsdHMnKTtcbnJlcXVpcmUoJy4vcGFydGlhbHMvYmJ4R2FsbGVyeScpO1xucmVxdWlyZSgnLi9wYXJ0aWFscy9ob21lJyk7XG5yZXF1aXJlKCcuL3BhcnRpYWxzL2Jsb2dwb3N0Jyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICAvLyBIYW5kbGVyIHdoZW4gdGhlIERPTSBpcyBmdWxseSBsb2FkZWRcbiAgICBzZXRIZXJvQmFja2dyb3VuZCgpO1xuXG4gICAgLy9pbml0TmF2YmFyU2Nyb2xsU3B5KCk7XG59KTtcblxuLyoqXG4gKiBVcGRhdGVzIGhlcm8gYmFja2dyb3VuZCBpbWFnZSBmcm9tIHJlc3BvbnNpdmUgaW1hZ2Ugc291cmNlXG4gKi9cbmZ1bmN0aW9uIHNldEhlcm9CYWNrZ3JvdW5kKCkge1xuICAgIC8vIFVwZGF0ZSBiYWNrZ3JvdW5kIGltYWdlXG4gICAgbGV0IGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlcm9cIik7XG4gICAgbGV0IGltYWdlU291cmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlcm8gcGljdHVyZSBpbWcnKS5zcmM7XG4gICAgbGV0IHBpY3R1cmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hlcm8gcGljdHVyZScpO1xuICAgIGhlcm9Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyBpbWFnZVNvdXJjZSArIFwiKVwiO1xuICAgIHBpY3R1cmVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocGljdHVyZUVsZW1lbnQpO1xuICAgIC8vIFJlbW92ZSBlbGVtZW50IGZyb20gRE9NXG4gICAgLy9oZXJvQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGluaXROYXZiYXJTY3JvbGxTcHkoKSB7XG5cbiAgICBsZXQgaXNGaXhlZCA9IGZhbHNlO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgbGV0IG9mZnNldFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBsZXQgb2Zmc2V0VG9wQ2FwID0gNzk7XG5cbiAgICAgICAgbGV0IG5hdmlnYXRpb25NYWluQmdMYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LW1haW4tYmctbGF5ZXJcIik7XG4gICAgICAgIGxldCBuYXZpZ2F0aW9uTG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nb1wiKTtcblxuICAgICAgICBpZiAoIWlzRml4ZWQgJiYgb2Zmc2V0VG9wID4gb2Zmc2V0VG9wQ2FwKSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTG9nby5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIC8vbmF2aWdhdGlvbk1haW5CZ0xheWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtbWFpbi1iZy1sYXllci1hbmltYXRlLW91dFwiKTtcbiAgICAgICAgICAgIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QuYWRkKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1pblwiKTtcbiAgICAgICAgICAgIGlzRml4ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRml4ZWQgJiYgb2Zmc2V0VG9wIDw9IG9mZnNldFRvcENhcCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkxvZ28uY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uTWFpbkJnTGF5ZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1tYWluLWJnLWxheWVyLWFuaW1hdGUtaW5cIik7XG4gICAgICAgICAgIC8vIG5hdmlnYXRpb25NYWluQmdMYXllci5jbGFzc0xpc3QuYWRkKFwibmF2LW1haW4tYmctbGF5ZXItYW5pbWF0ZS1vdXRcIik7XG4gICAgICAgICAgICBpc0ZpeGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gQkJYIGdhbGxlcnlcbiAgICBpbml0QmJ4R2FsbGVyaWVzKCk7XG5cbn0pO1xuXG5mdW5jdGlvbiBpbml0QmJ4R2FsbGVyaWVzKCkge1xuXG4gICAgbGV0IGJieEdhbGxlcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy1iYngtZ2FsbGVyeVwiKTtcbiAgICBmb3IgKGxldCBnYWxsZXJ5IG9mIGJieEdhbGxlcmllcykge1xuXG4gICAgICAgIGxldCBpbWFnZXMgPSBnYWxsZXJ5LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpO1xuICAgICAgICAvLyBnYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAvLyAgICAgYnVpbGRTbGlkZU91dChpbWFnZXMsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciB0byBpbWFnZXMgc28gd2UgY2FuIGp1bXAgdG8gc2VsZWN0ZWQgaW1hZ2UuIENvbWluZyBsYXRlci4uLlxuICAgICAgICBmb3IgKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGJ1aWxkU2xpZGVPdXQoaW1hZ2VzLCBldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBQUFBQUFORC4uLi4gU28gd2UgY2FuIHVzZSBpdCBmb3IgYXJyb3cga2V5cyB0byBqdW1wIHRvIGltYWdlIDopXG5cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbWFnZXNbXVxuICogQHBhcmFtIHRodW1ibmFpbENsaWNrZWRcbiAqL1xuZnVuY3Rpb24gYnVpbGRTbGlkZU91dChpbWFnZXMsIHRodW1ibmFpbENsaWNrZWQpIHtcbiAgICAvKlxuICAgICAqIEdldCBleGlzdGluZyBzbGlkZU91dCBlbGVtZW50IG9yIGNyZWF0ZSBpZiBub3QgYXZhaWxhYmxlIHlldC5cbiAgICAgKiBSZW1vdmUgYWxsIGNvbnRlbnQgb2YgaXQuXG4gICAgICovXG4gICAgbGV0IHNsaWRlb3V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmJ4LWdhbGxlcnktc2xpZGVvdXRcIik7XG4gICAgaWYgKCFzbGlkZW91dEVsZW1lbnQpIHtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc2xpZGVvdXRFbGVtZW50LmlkID0gXCJiYngtZ2FsbGVyeS1zbGlkZW91dFwiO1xuICAgIH1cbiAgICBzbGlkZW91dEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIC8vIEFkZCBjbG9zZSBidXR0b24sIGJpbmQgY2xvc2UgZXZlbnRcbiAgICBsZXQgc2xpZGVvdXRDb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzbGlkZW91dENvbnRyb2wuaWQgPSBcImJieC1nYWxsZXJ5LWNvbnRyb2xcIjtcblxuICAgIGxldCBzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uaWQgPSBcImJieC1nYWxsZXJ5LWNsb3NlXCI7XG4gICAgc2xpZGVvdXRDb250cm9sQ2xvc2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImpzLWJieC1nYWxsZXJ5LWNsb3NlXCIpO1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmlubmVyVGV4dCA9IFwiWFwiO1xuXG4gICAgLy8gQWRkIGNsb3NlIGV2ZW50c1xuICAgIHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7IGNsb3NlU2xpZGVPdXQoc2xpZGVvdXRFbGVtZW50LCBldmVudCkgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZXZlbnQgPT4geyBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIH0pO1xuXG4gICAgc2xpZGVvdXRDb250cm9sLmFwcGVuZENoaWxkKHNsaWRlb3V0Q29udHJvbENsb3NlQnV0dG9uKTtcbiAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2xpZGVvdXRDb250cm9sKTtcblxuICAgIC8vIEFwcGVuZCBzbGlkZSBvdXQgdG8gRE9NXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzbGlkZW91dEVsZW1lbnQpO1xuXG4gICAgLy8gQXBwZW5kIGltYWdlc1xuICAgIGxldCBpbmRleCA9IDE7XG4gICAgZm9yIChsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG5cbiAgICAgICAgLy8gU2V0dXAgaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJpbWctd3JhcFwiKTtcbiAgICAgICAgaW1hZ2VEaXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJsb2FkaW5nXCIpO1xuXG4gICAgICAgIC8vIFNldHVwIGxvYWRlciB3cmFwcGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VMb2FkZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LmlubmVySFRNTCA9ICc8aW1nIHNyYz1cIi9zdGF0aWMvZ2Z4L2xvYWRlci1wdWZmLnN2Z1wiIGNsYXNzPVwibG9hZGVyXCIgLz4nO1xuICAgICAgICBpbWFnZURpdkVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBpbWFnZSBjb3VudGVyLCBhcHBlbmQgdG8gaW1hZ2Ugd3JhcHBlclxuICAgICAgICBsZXQgaW1hZ2VDb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlQ291bnRlckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImNvdW50ZXJcIik7XG5cbiAgICAgICAgbGV0IGltYWdlVGl0bGUgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoXCJhbHRcIik7XG5cbiAgICAgICAgaW1hZ2VDb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGltYWdlVGl0bGUgKyBcIiAoXCIgKyBpbmRleCArIFwiIC8gXCIgKyBpbWFnZXMubGVuZ3RoICsgXCIpXCI7XG4gICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUNvdW50ZXJFbGVtZW50KTtcblxuICAgICAgICAvLyBBcHBlbmQgaW1hZ2Ugd3JhcHBlciB0byBzbGlkZW91dFxuICAgICAgICBzbGlkZW91dEVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VEaXZFbGVtZW50KTtcblxuICAgICAgICAvLyBTZXR1cCBmdWxsIGltYWdlLCBhZGQgbGlzdGVuZXIgdG8gYXBwZW5kIGl0IGludG8gaW1hZ2Ugd3JhcHBlciBhZnRlciBpdCdzIGxvYWRlZFxuICAgICAgICBsZXQgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJmdWxsXCIpO1xuICAgICAgICBpbWFnZUVsZW1lbnQuZGF0YXNldC5pbmRleCA9IGluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGltYWdlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyIChcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1hZ2VMb2FkZXJFbGVtZW50KTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICAgIGltYWdlRGl2RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaW1hZ2VFbGVtZW50LnNyYyA9IGltYWdlLmRhdGFzZXQuZnVsbHNvdXJjZTtcblxuICAgICAgICBpbmRleCsrO1xuICAgIH1cblxuICAgIC8vIFNsaWRlIG91dCBhbmQgcHJldmVudCBib2R5IHNjcm9sbGluZ1xuICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblxuICAgIC8vIEp1bXAgdG8gY2xpY2tlZCBpbWFnZVxuICAgIGlmICh0aHVtYm5haWxDbGlja2VkKSB7XG4gICAgICAgIGxldCBpbWFnZUluZGV4ID0gdGh1bWJuYWlsQ2xpY2tlZC5kYXRhc2V0LmluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgbGV0IHRyeVNjcm9sbFRvSW1hZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0SW1hZ2UgPSBzbGlkZW91dEVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nW2RhdGEtaW5kZXg9XCInICsgaW1hZ2VJbmRleCArICdcIl0nKTtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0SW1hZ2UpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0cysrO1xuXG4gICAgICAgICAgICAgICAgaWYgKGF0dGVtcHRzIDwgMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodHJ5U2Nyb2xsVG9JbWFnZSwgNTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRhcmdldEltYWdlLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcImNlbnRlclwiIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0cnlTY3JvbGxUb0ltYWdlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlT3V0KHNsaWRlb3V0RWxlbWVudCwgZXZlbnQpIHtcbiAgICBpZiAoXG4gICAgICAgIGV2ZW50LmtleSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpXG4gICAgKSB7XG4gICAgICAgIHNsaWRlb3V0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xuICAgIC8vIEhhbmRsZXIgd2hlbiB0aGUgRE9NIGlzIGZ1bGx5IGxvYWRlZFxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvY1wiKSkge1xuICAgICAgICBidWlsZFRhYmxlT2ZDb250ZW50KCk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbW1lbnRzXCIpKSB7XG4gICAgICAgIGluaXRDb21tZW50QW5zd2VycygpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIEJ1aWxkcyB0YWJsZSBvZiBjb250ZW50IGZyb20gaDJcbiAqL1xuZnVuY3Rpb24gYnVpbGRUYWJsZU9mQ29udGVudCgpIHtcblxuICAgIC8vIEZldGNoIGhlYWRsaW5lc1xuICAgIGxldCBoZWFkbGluZXNIMiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDJcIikpO1xuICAgIGxldCBoZWFkbGluZXNIMyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDNcIikpO1xuICAgIGxldCBoZWFkbGluZXMgPSBoZWFkbGluZXNIMi5jb25jYXQoaGVhZGxpbmVzSDMpO1xuXG4gICAgbGV0IHRvY0h0bWwgPSBcIlwiO1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBmb3IgKGxldCBoZWFkbGluZSBvZiBoZWFkbGluZXMpIHtcblxuICAgICAgICAvLyBTa2lwIGlnbm9yZWQgaGVhZGxpbmVzXG4gICAgICAgIGlmIChoZWFkbGluZS5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy10b2MtaWdub3JlXCIpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBhbmNob3IgYmVmb3JlIGhlYWRsaW5lXG4gICAgICAgIGxldCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInRvY1wiICsgaW5kZXgpO1xuICAgICAgICBoZWFkbGluZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhbmNob3JFbGVtZW50LCBoZWFkbGluZSk7XG5cbiAgICAgICAgLy8gQWRkIGNsYXNzIG9uIEgzIGZvciBzaG93IG1vYmlsZSBvbmx5XG4gICAgICAgIGxldCBjbGFzc0FkZGl0b24gPSBcIlwiO1xuICAgICAgICBpZiAoaGVhZGxpbmUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImgzXCIpIHtcbiAgICAgICAgICAgIGNsYXNzQWRkaXRvbiA9ICcgY2xhc3M9XCJkLWxnLW5vbmVcIic7XG4gICAgICAgIH1cblxuICAgICAgICB0b2NIdG1sICs9ICc8bGknICsgY2xhc3NBZGRpdG9uICsgJz48YSBocmVmPVwiI3RvYycgKyBpbmRleCArICdcIj4nICsgaGVhZGxpbmUuaW5uZXJUZXh0ICsgJzwvYT48L2xpPic7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJqcy10b2NcIilbMF0uaW5uZXJIVE1MID0gdG9jSHRtbDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBjb21tZW50IGFuc3dlcnNcbiAqL1xuZnVuY3Rpb24gaW5pdENvbW1lbnRBbnN3ZXJzKCkge1xuXG4gICAgbGV0IGNvbW1lbnRBbnN3ZXJCdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImpzLWNvbW1lbnQtYW5zd2VyXCIpO1xuICAgIGZvciAobGV0IGJ1dHRvbiBvZiBjb21tZW50QW5zd2VyQnV0dG9ucykge1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgbGV0IHBhcmVudElkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucGlkO1xuICAgICAgICAgICAgbGV0IHJlZmVyZW5jZUlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQucmVmZXJlbmNlaWQ7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0Lm5hbWU7XG5cbiAgICAgICAgICAgIGxldCBoZWFkbGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50LWhlYWRsaW5lJyk7XG4gICAgICAgICAgICBpZiAoaGVhZGxpbmUpIHtcbiAgICAgICAgICAgICAgICBoZWFkbGluZS5pbm5lclRleHQgPSBcIkFudHdvcnQgYW4gXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgcGFyZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbWVudC1waWQnKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHBhcmVudElucHV0LnZhbHVlID0gcGFyZW50SWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjb21tZW50SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVmZXJlbmNlLWlkJyk7XG4gICAgICAgICAgICBpZiAoY29tbWVudElucHV0KSB7XG4gICAgICAgICAgICAgICAgY29tbWVudElucHV0LnZhbHVlID0gcmVmZXJlbmNlSWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0SGVyb0JhY2tncm91bmQiLCJoZXJvQ29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbWFnZVNvdXJjZSIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJwaWN0dXJlRWxlbWVudCIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaW5pdE5hdmJhclNjcm9sbFNweSIsImlzRml4ZWQiLCJ3aW5kb3ciLCJvZmZzZXRUb3AiLCJzY3JvbGxZIiwib2Zmc2V0VG9wQ2FwIiwibmF2aWdhdGlvbk1haW5CZ0xheWVyIiwibmF2aWdhdGlvbkxvZ28iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInIiLCJlIiwidCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiQXJyYXkiLCJpc0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwibGVuZ3RoIiwiX24iLCJGIiwicyIsIm4iLCJkb25lIiwidmFsdWUiLCJmIiwiVHlwZUVycm9yIiwibyIsImEiLCJ1IiwiY2FsbCIsIm5leHQiLCJfYXJyYXlMaWtlVG9BcnJheSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImluaXRCYnhHYWxsZXJpZXMiLCJiYnhHYWxsZXJpZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfbG9vcCIsImdhbGxlcnkiLCJpbWFnZXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJpbWFnZSIsImV2ZW50IiwiYnVpbGRTbGlkZU91dCIsInRhcmdldCIsImVyciIsInRodW1ibmFpbENsaWNrZWQiLCJzbGlkZW91dEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJpbm5lckhUTUwiLCJzbGlkZW91dENvbnRyb2wiLCJzbGlkZW91dENvbnRyb2xDbG9zZUJ1dHRvbiIsImlubmVyVGV4dCIsImNsb3NlU2xpZGVPdXQiLCJhcHBlbmRDaGlsZCIsImJvZHkiLCJpbmRleCIsIl9pdGVyYXRvcjMiLCJfc3RlcDMiLCJfbG9vcDIiLCJpbWFnZURpdkVsZW1lbnQiLCJpbWFnZUxvYWRlckVsZW1lbnQiLCJpbWFnZUNvdW50ZXJFbGVtZW50IiwiaW1hZ2VUaXRsZSIsImdldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiaW1hZ2VFbGVtZW50IiwiZGF0YXNldCIsImZ1bGxzb3VyY2UiLCJvdmVyZmxvdyIsImltYWdlSW5kZXgiLCJhdHRlbXB0cyIsInRyeVNjcm9sbFRvSW1hZ2UiLCJ0YXJnZXRJbWFnZSIsInNldFRpbWVvdXQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJrZXkiLCJ1bmRlZmluZWQiLCJidWlsZFRhYmxlT2ZDb250ZW50IiwiaW5pdENvbW1lbnRBbnN3ZXJzIiwiaGVhZGxpbmVzSDIiLCJwcm90b3R5cGUiLCJoZWFkbGluZXNIMyIsImhlYWRsaW5lcyIsImNvbmNhdCIsInRvY0h0bWwiLCJoZWFkbGluZSIsImNvbnRhaW5zIiwiYW5jaG9yRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImluc2VydEJlZm9yZSIsImNsYXNzQWRkaXRvbiIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImNvbW1lbnRBbnN3ZXJCdXR0b25zIiwiYnV0dG9uIiwicGFyZW50SWQiLCJwaWQiLCJyZWZlcmVuY2VJZCIsInJlZmVyZW5jZWlkIiwicGFyZW50SW5wdXQiLCJjb21tZW50SW5wdXQiXSwic291cmNlUm9vdCI6IiJ9