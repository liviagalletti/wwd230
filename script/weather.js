// Select HTML elements in the document
const currentWeather = document.getElementById('#current-weather');

const latitude = -7.115;
const longitude = -34.8631;
const apiKey = '3c931e01b408736408c6cbb8823da90e';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

// Define asynchronous function apiFetch()
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Testing only
      displayWeather(data); // Uncomment when ready
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Invoke the apiFetch function
apiFetch();

// Build the displayWeather function
function displayWeather(data) {
  const temperature = `${data.main.temp}&deg;F`;
  const description = data.weather[0].description;
  currentWeather.innerHTML = `${temperature}, ${description}`;
}
