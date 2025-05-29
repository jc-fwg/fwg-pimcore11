'use strict';

document.addEventListener("DOMContentLoaded", function() {
    // Handler when the DOM is fully loaded
    setHeroBackground();

    initNavbarScrollSpy();
});

/**
 * Updates hero background image from responsive image source
 */
function setHeroBackground() {
    // Update background image
    let heroContainer = document.getElementById("hero");
    let imageSource = document.querySelector('#hero picture img').src;
    let pictureElement = document.querySelector('#hero picture');
    heroContainer.style.backgroundImage = "url(" + imageSource + ")";
    pictureElement.parentNode.removeChild(pictureElement);
    // Remove element from DOM
    //heroContainer.innerHTML = "";
}

function initNavbarScrollSpy() {

    let isFixed = false;

    window.addEventListener("scroll", function() {

        let offsetTop = window.scrollY;
        let offsetTopCap = 79;

        let navigationMainBgLayer = document.getElementById("nav-main-bg-layer");
        let navigationLogo = document.getElementById("logo");

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