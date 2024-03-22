const apiKey = "3c931e01b408736408c6cbb8823da90e";
const lat =  -7.115;
const lon = -34.8631;  



const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const urlOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={hourly,minutely,alerts}&appid=${apiKey}`;

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
apiFetch();

function displayResults(data) {
    const location =    document.querySelector("#location");
    const currentTemp = document.querySelector("#current-temp");
    const weatherIcon = document.querySelector("#weather-icon");
    const captionDesc = document.querySelector("#weather-description");
    const feelsLike =   document.querySelector("#feels-like");
    const windSpeed =   document.querySelector("#wind-speed");
    const humidity =    document.querySelector("#humidity");


    location.innerHTML = data.name;
    // Format temperature to show zero decimal points
    const formattedTemp = data.main.temp.toFixed(0);
    // Display current temperature
    currentTemp.innerHTML = `${formattedTemp}&deg;F`;
    feelsLike.innerHTML = `${data.main.feels_like.toFixed(0)}&deg;F`;
    windSpeed.innerHTML = `${data.wind.speed.toFixed(0)}mph`;
    humidity.innerHTML = `${data.main.humidity}%`;

    // Display weather icon and description
    data.weather.forEach((weatherEvent) => {
        const iconsrc = `https://openweathermap.org/img/wn/${weatherEvent.icon}@2x.png`;
        let desc = weatherEvent.description;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", desc);
        captionDesc.innerHTML = `${desc}`;
    });
}

async function apiFetchForecast(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayForecastResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
apiFetchForecast(urlForecast);

async function apiFetchOpenWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayOneCallResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}
apiFetchOpenWeather(urlOpenWeather);

function displayWeatherResults(data) {
    const location = document.querySelector("#location");
    const tempArea = document.querySelector(".temp-area");
    const captionDesc = document.querySelector("#weather-description");
    const feelsLike = document.querySelector("#feels-like");
    const windSpeed = document.querySelector("#wind-speed");
    const humidity = document.querySelector("#humidity");

    const weatherIcon = document.createElement("img");
    tempArea.appendChild(weatherIcon);

    const currentTemp = document.createElement("span");
    currentTemp.setAttribute("id", "current-temp");
    tempArea.appendChild(currentTemp);

    location.innerHTML = data.name;

    const formattedTemp = data.main.temp.toFixed(0);
    currentTemp.innerHTML = `${formattedTemp}&deg;F`;
    feelsLike.innerHTML = `${data.main.feels_like.toFixed(0)}&deg;F`;
    windSpeed.innerHTML = `${data.wind.speed.toFixed(0)}mph`;
    humidity.innerHTML = `${data.main.humidity}%`;

    // Move this code outside of the loop
    const weatherEvent = data.weather[0];
    const iconsrc = `https://openweathermap.org/img/wn/${weatherEvent.icon}@2x.png`;
    let desc = weatherEvent.description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    weatherIcon.setAttribute("width", "100");
    weatherIcon.setAttribute("height", "100");
    captionDesc.innerHTML = `${desc}`;
}


function displayForecastResults(data) {
    const fiveDayResults = data.list
        .filter((fc) => fc.dt_txt.includes("21:00:00"))
        .map((fc) => {
            const timestamp = fc.dt * 1000;

            return {
                unixTimestamp: timestamp,
                date: dateFormate(timestamp),
                day: dayOfTheWeek(timestamp),
                maxTemp: fc.main.temp_max,
                minTemp: fc.main.temp_min,
                weatherDesc: fc.weather[0].description,
                weatherIcon: fc.weather[0].icon,
                precipChance: fc.pop,
            };
        });

    const forecast = document.querySelector("#forecast");

    fiveDayResults.forEach((day) => {
        const weatherDay = document.createElement("div");
        weatherDay.setAttribute("class", "weather-day");
        const weekDay = document.createElement("h5");
        const weatherFigure = document.createElement("figure");
        const weatherCaption = document.createElement("figcaption");
        const weatherIcon = document.createElement("img");
        const maxTempDiv = document.createElement("div");
        const minTempDiv = document.createElement("div");
        maxTempDiv.setAttribute("class", "temp-div");
        minTempDiv.setAttribute("class", "temp-div");
        const maxTempT = document.createElement("p");
        const minTempT = document.createElement("p");
        const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");

        weatherDay.appendChild(weekDay);
        weekDay.textContent = day.day;

        weatherDay.appendChild(weatherFigure);
        weatherFigure.appendChild(weatherIcon);
        weatherFigure.appendChild(weatherCaption);

        const iconsrc = `https://openweathermap.org/img/wn/${day.weatherIcon}.png`;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", day.weatherDesc);
        weatherIcon.setAttribute("width", "50");
        weatherIcon.setAttribute("height", "50");
        weatherCaption.innerHTML = `${day.weatherDesc}`;

        weatherDay.appendChild(maxTempDiv);
        maxTempDiv.appendChild(maxTempT);
        maxTempT.textContent = `High:`;
        maxTempDiv.appendChild(maxTemp);
        maxTemp.innerHTML = `${day.maxTemp.toFixed(0)}&deg;F`;

        weatherDay.appendChild(minTempDiv);
        minTempDiv.appendChild(minTempT);
        minTempT.textContent = `Low:`;
        minTempDiv.appendChild(minTemp);
        minTemp.innerHTML = `${day.minTemp.toFixed(0)}&deg;F`;

        forecast.appendChild(weatherDay);
    });
}

function displayOneCallResults(data) {
    const dailyResults = data.daily.slice(0, 5);

    const forecast = document.querySelector("#forecast");

    dailyResults.forEach((day) => {
        const timestamp = day.dt * 1000;
        let weekday = dayOfTheWeek(timestamp);

        const weatherDay = document.createElement("div");
        weatherDay.setAttribute("class", "weather-day");
        const weekDay = document.createElement("h5");
        const weatherFigure = document.createElement("figure");
        const weatherCaption = document.createElement("figcaption");
        const weatherIcon = document.createElement("img");
        const maxTempDiv = document.createElement("div");
        const minTempDiv = document.createElement("div");
        maxTempDiv.setAttribute("class", "temp-div");
        minTempDiv.setAttribute("class", "temp-div");
         const maxTemp = document.createElement("p");
        const minTemp = document.createElement("p");

        weatherDay.appendChild(weekDay);
        weekDay.textContent = weekday;

        weatherDay.appendChild(weatherFigure);
        weatherFigure.appendChild(weatherIcon);
        weatherFigure.appendChild(weatherCaption);

        const iconsrc = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        weatherIcon.setAttribute("src", iconsrc);
        weatherIcon.setAttribute("alt", day.weather[0].description);
        weatherIcon.setAttribute("width", "50");
        weatherIcon.setAttribute("height", "50");
        weatherCaption.innerHTML = `${day.weather[0].description}`;

        weatherDay.appendChild(maxTempDiv);
        maxTempDiv.appendChild(maxTempT);
        maxTempT.textContent = `High:`;
        maxTempDiv.appendChild(maxTemp);
        maxTemp.innerHTML = `${day.temp.max.toFixed(0)}&deg;F`;

        weatherDay.appendChild(minTempDiv);
        minTempDiv.appendChild(minTempT);
        minTempT.textContent = `Low:`;
        minTempDiv.appendChild(minTemp);
        minTemp.innerHTML = `${day.temp.min.toFixed(0)}&deg;F`;

        forecast.appendChild(weatherDay);
    });
}

function dayOfTheWeek(timestamp) {
    const options = {
        weekday: "long",
    };
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", options);
}

function dateFormate(timestamp) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "America/Phoenix",
        timeZoneName: "short",
    };
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", options);
}