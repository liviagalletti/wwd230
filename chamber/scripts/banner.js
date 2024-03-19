// Function to check if it's Monday, Tuesday, or Wednesday
function isBannerDay() {
    var today = new Date();
    var day = today.getDay(); // 0 is Sunday, 1 is Monday, and so on
    return (day >= 1 && day <= 3); // Only show the banner on Monday, Tuesday, and Wednesday
}

// Function to close the banner
function closeBanner() {
    document.getElementById("chamberBanner").style.display = "none";
}

// Function to display the banner if it's the right day
function displayBanner() {
    if (isBannerDay()) {
        document.getElementById("chamberBanner").classList.add("show");
    }
}

// Call displayBanner() when the page loads
window.onload = displayBanner;
