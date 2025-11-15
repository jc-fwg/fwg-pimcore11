'use strict';

document.addEventListener("DOMContentLoaded", function() {

    // BBX gallery
    initBbxGalleries();

});

function initBbxGalleries() {

    let bbxGalleries = document.getElementsByClassName("js-bbx-gallery");
    for (let gallery of bbxGalleries) {

        let images = gallery.getElementsByTagName("img");
        // gallery.addEventListener('click', event => {
        //     buildSlideOut(images, event.target);
        // });

        // Add event listener to images so we can jump to selected image. Coming later...
        for (let image of images) {
            image.addEventListener('click', event => {
                buildSlideOut(images, event.target);
            });
        }

        // AAAAAAND.... So we can use it for arrow keys to jump to image :)

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
    let slideoutElement = document.getElementById("bbx-gallery-slideout");
    if (!slideoutElement) {
        slideoutElement = document.createElement("div");
        slideoutElement.id = "bbx-gallery-slideout";
    }
    slideoutElement.innerHTML = "";

    // Add close button, bind close event
    let slideoutControl = document.createElement("div");
    slideoutControl.id = "bbx-gallery-control";

    let slideoutControlCloseButton = document.createElement("div");
    slideoutControlCloseButton.id = "bbx-gallery-close";
    slideoutControlCloseButton.classList.add("js-bbx-gallery-close");
    slideoutControlCloseButton.innerText = "X";

    // Add close events
    slideoutControlCloseButton.addEventListener("click", event => { closeSlideOut(slideoutElement, event) });
    document.addEventListener("keydown", event => { closeSlideOut(slideoutElement, event) });

    slideoutControl.appendChild(slideoutControlCloseButton);
    slideoutElement.appendChild(slideoutControl);

    // Append slide out to DOM
    document.body.appendChild(slideoutElement);

    // Append images
    let index = 1;
    for (let image of images) {

        // Setup image wrapper
        let imageDivElement = document.createElement("div");
        imageDivElement.classList.add("img-wrap");
        imageDivElement.classList.add("loading");

        // Setup loader wrapper, append to image wrapper
        let imageLoaderElement = document.createElement("div");
        imageLoaderElement.innerHTML = '<img src="/static/gfx/loader-puff.svg" class="loader" />';
        imageDivElement.appendChild(imageLoaderElement);

        // Setup image counter, append to image wrapper
        let imageCounterElement = document.createElement("div");
        imageCounterElement.classList.add("counter");

        let imageTitle = image.getAttribute("alt");

        imageCounterElement.textContent = imageTitle + " (" + index + " / " + images.length + ")";
        imageDivElement.appendChild(imageCounterElement);

        // Append image wrapper to slideout
        slideoutElement.appendChild(imageDivElement);

        // Setup full image, add listener to append it into image wrapper after it's loaded
        let imageElement = document.createElement("img");
        imageElement.classList.add("full");
        imageElement.alt = imageTitle;
        imageElement.title = imageTitle;
        imageElement.dataset.index = index.toString();
        imageElement.addEventListener ("load", function () {
            imageLoaderElement.parentNode.removeChild(imageLoaderElement);
            imageDivElement.classList.remove("loading");
            imageDivElement.appendChild(imageElement);
        });
        imageElement.src = image.dataset.fullsource;

        index++;
    }

    // Slide out and prevent body scrolling
    slideoutElement.classList.add("show");
    document.body.style.overflow = "hidden";

    // Jump to clicked image
    if (thumbnailClicked) {
        let imageIndex = thumbnailClicked.dataset.index.toString();
        let attempts = 0;

        let tryScrollToImage = () => {
            let targetImage = slideoutElement.querySelector('img[data-index="' + imageIndex + '"]');
            if (!targetImage) {
                attempts++;

                if (attempts < 100) {
                    setTimeout(tryScrollToImage, 50);
                }
                return;
            }

            targetImage.scrollIntoView({ behavior: "smooth", block: "center" });
        };
        tryScrollToImage();
    }
}

function closeSlideOut(slideoutElement, event) {
    if (
        event.key === undefined ||
        (event.key === "Escape")
    ) {
        slideoutElement.classList.remove("show");
        document.body.style.overflow = "auto";
    }
}