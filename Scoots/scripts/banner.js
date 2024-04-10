const apiKey = "3c931e01b408736408c6cbb8823da90e";
const lat = 20.5083;
const lon = -86.9458;

// weatherBanner.js

// Function to fetch weather data and display the banner
async function fetchAndDisplayBanner(apiKey, lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayBanner(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to display the banner
function displayBanner(data) {
    const maxTemp = data.main.temp_max.toFixed(0);
    document.getElementById('maxTemp').textContent = maxTemp;
    document.getElementById('#scootsBanner').style.display = 'block';
}

// Function to close the banner
function closeBanner() {
    document.getElementById('#scootsBanner').style.display = 'none';
}
