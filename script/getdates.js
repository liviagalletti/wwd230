document.addEventListener("DOMContentLoaded", function () {
    
    var currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    
    var lastModifiedParagraph = document.getElementById("lastModified");
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = "Last modified: " + document.lastModified;
    }
});
