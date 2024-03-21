document.addEventListener('DOMContentLoaded', function() {
    const visitsDisplay = document.querySelector(".visits");
    let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
    
    if (numVisits !== 0) {
        visitsDisplay.textContent = numVisits;
    } else {
        visitsDisplay.textContent = `Welcome! Let us know if you have any questions`;
    }
    
    numVisits++;
    localStorage.setItem("numVisits-ls", numVisits);
});

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
