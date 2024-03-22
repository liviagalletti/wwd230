const apiKey = "3c931e01b408736408c6cbb8823da90e";
const lat =  -7.115;
const lon = -34.8631;  

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly&appid=${apiKey}`;

async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayCurrentWeather(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

fetchCurrentWeather();
fetchForecast();

function displayCurrentWeather(data) {
    const location = document.querySelector("#location");
    const currentTemp = document.querySelector("#current-temp");
    const weatherIcon = document.querySelector("#weather-icon");
    const captionDesc = document.querySelector("#weather-description");
    const feelsLike = document.querySelector("#feels-like");
    const windSpeed = document.querySelector("#wind-speed");
    const humidity = document.querySelector("#humidity");

    location.innerHTML = data.name;
    const formattedTemp = data.main.temp.toFixed(0);
    currentTemp.innerHTML = `${formattedTemp}&deg;F`;
    feelsLike.innerHTML = `${data.main.feels_like.toFixed(0)}&deg;F`;
    windSpeed.innerHTML = `${data.wind.speed.toFixed(0)}mph`;
    humidity.innerHTML = `${data.main.humidity}%`;

    data.weather.forEach((weatherEvent) => {
        const iconsrc = `https://openweathermap.org/img/wn/${weatherEvent.icon}.png`;
        let desc = weatherEvent.description;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", desc);
        captionDesc.innerHTML = `${desc}`;
    });
}

function displayForecast(data) {
    const forecastDiv = document.querySelector("#forecast");
    forecastDiv.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
        const forecastItem = data.daily[i];
        const forecastDate = new Date(forecastItem.dt * 1000);
        const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
        const formattedDate = forecastDate.toLocaleDateString(undefined, dateOptions);
        const minTemp = forecastItem.temp.min.toFixed(0);
        const maxTemp = forecastItem.temp.max.toFixed(0);
        const description = forecastItem.weather[0].description;
        
        const forecastElement = document.createElement("div");
        forecastElement.classList.add("forecast-item");
        forecastElement.innerHTML = `
            <div class="forecast-date">${formattedDate}</div>
            <div class="forecast-temp">${minTemp}&deg;F - ${maxTemp}&deg;F</div>
            <div class="forecast-description">${description}</div>
        `;
        forecastDiv.appendChild(forecastElement);
    }
}
