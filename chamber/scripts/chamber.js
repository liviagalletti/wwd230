function displayVisitMessage() {
    // Retrieve last visit date from localStorage
    const lastVisit = localStorage.getItem('lastVisit');

    // If this is the user's first visit
    if (!lastVisit) {
        document.getElementById('visitMessage').innerText = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the difference in days between last visit and current visit
        const today = new Date();
        const diffTime = Math.abs(today - new Date(lastVisit));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Display appropriate message based on the difference in days
        if (diffDays < 1) {
            document.getElementById('visitMessage').innerText = "Back so soon! Awesome!";
        } else {
            const message = `You last visited ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago.`;
            document.getElementById('visitMessage').innerText = message;
        }
    }

    // Store current visit date in localStorage
    localStorage.setItem('lastVisit', new Date().toISOString());
}

// Call the function to display the visit message when the page loads
displayVisitMessage();