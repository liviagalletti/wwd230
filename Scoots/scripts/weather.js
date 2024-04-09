
        const apiKey = "3c931e01b408736408c6cbb8823da90e";
        const lat = 20.5083;
        const lon = -86.9458;

        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        const urlOpenWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude={hourly,minutely,alerts}&appid=${apiKey}`;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        async function apiFetch() {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
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

            const weatherEvent = data.weather[0];
            const iconsrc = `https://openweathermap.org/img/wn/${weatherEvent.icon}.png`;
            let desc = weatherEvent.description;
            weatherIcon.setAttribute("src", iconsrc);
            weatherIcon.setAttribute("alt", desc);
            captionDesc.innerHTML = `${desc}`;
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

        function displayForecastResults(data) {
            const fiveDayResults = data.list
                .filter((fc) => fc.dt_txt.includes("15:00:00")) // Selecting 3:00pm forecast
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
            const nextDay = data.daily[1]; // Selecting next day's forecast
            const timestamp = nextDay.dt * 1000;
            const weekday = dayOfTheWeek(timestamp);

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

            const iconsrc = `https://openweathermap.org/img/wn/${nextDay.weather[0].icon}.png`;
            weatherIcon.setAttribute("src", iconsrc);
            weatherIcon.setAttribute("alt", nextDay.weather[0].description);
            weatherIcon.setAttribute("width", "50");
            weatherIcon.setAttribute("height", "50");
            weatherCaption.innerHTML = `${nextDay.weather[0].description}`;

            weatherDay.appendChild(maxTempDiv);
            maxTempDiv.appendChild(maxTemp);
            maxTemp.innerHTML = `${nextDay.temp.max.toFixed(0)}&deg;F`;

            weatherDay.appendChild(minTempDiv);
            minTempDiv.appendChild(minTemp);
            minTemp.innerHTML = `${nextDay.temp.min.toFixed(0)}&deg;F`;

            const forecast = document.querySelector("#forecast");
            forecast.appendChild(weatherDay);
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
 
