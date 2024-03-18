// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather';

// Trier, Germany coordinates
const latitude = 49.75;
const longitude = 6.64;

// API key - Replace '[enter your key here]' with your actual API key
const apiKey = 'a886292e0b9ceb35b9e703b554ef7d7c';

// Define asynchronous function apiFetch()
async function apiFetch() {
  try {
    const response = await fetch(`${url}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// Invoke the apiFetch function
apiFetch();

// Build the displayResults function
function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = `${desc}`;
}

