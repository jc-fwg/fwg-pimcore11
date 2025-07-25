'use strict';

document.addEventListener("DOMContentLoaded", function() {
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
    let headlinesH2 = Array.prototype.slice.call(document.getElementsByTagName("h2"));
    let headlinesH3 = Array.prototype.slice.call(document.getElementsByTagName("h3"));
    let headlines = headlinesH2.concat(headlinesH3);

    let tocHtml = "";
    let index = 0;

    for (let headline of headlines) {

        // Skip ignored headlines
        if (headline.classList.contains("js-toc-ignore")) {
            continue;
        }

        // Add anchor before headline
        let anchorElement = document.createElement("a");
        anchorElement.setAttribute("name", "toc" + index);
        headline.parentNode.insertBefore(anchorElement, headline);

        // Add class on H3 for show mobile only
        let classAdditon = "";
        if (headline.tagName.toLowerCase() === "h3") {
            classAdditon = ' class="d-lg-none"';
        }

        tocHtml += '<li' + classAdditon + '><a href="#toc' + index + '">' + headline.innerText + '</a></li>';
        index++;
    };

    document.getElementsByClassName("js-toc")[0].innerHTML = tocHtml;
}

/**
 * Initializes comment answers
 */
function initCommentAnswers() {

    let commentAnswerButtons = document.getElementsByClassName("js-comment-answer");
    for (let button of commentAnswerButtons) {
        button.addEventListener("click", function (event) {
            let parentId = event.target.dataset.pid;
            let referenceId = event.target.dataset.referenceid;
            let name = event.target.dataset.name;

            let headline = document.getElementById('comment-headline');
            if (headline) {
                headline.innerText = "Antwort an " + name;
            }

            let parentInput = document.getElementById('comment-pid');
            if (parentInput) {
                parentInput.value = parentId;
            }

            let commentInput = document.getElementById('reference-id');
            if (commentInput) {
                commentInput.value = referenceId;
            }
        });
    }
}