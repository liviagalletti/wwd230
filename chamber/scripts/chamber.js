document.addEventListener('DOMContentLoaded', function() {
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
    
    
    const mainnav = document.querySelector('.navigation')
    const hambutton = document.querySelector('#menu');
    
    
    hambutton.addEventListener('click', () => {
        mainnav.classList.toggle('show');
        hambutton.classList.toggle('show');
    });
    
    
    const visitsDisplay = document.querySelector(".visits");
    let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
    if (numVisits !== 0) {
        visitsDisplay.textContent = numVisits;
    } else {
        visitsDisplay.textContent = `This is your first visit. 🥳 Welcome!`;
    }
    numVisits++;
    localStorage.setItem("numVisits-ls", numVisits);
    

document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    var form = document.getElementById('myForm');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        window.location.href = 'thankyou.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get the element for displaying the current year
    var currentYearElement = document.getElementById('current-year');
    
    // Get the current year
    var currentYear = new Date().getFullYear();
    
    // Set the current year in the HTML
    currentYearElement.textContent = currentYear;
});
