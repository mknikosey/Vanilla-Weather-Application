function formatDate (timestamp) {
    let date = new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${formatHours(timestamp)}`;

}

 function formatHours(timestamp) {
     let date = new Date(timestamp);
     let hours = date.getHours();
     if (hours < 10) {
         hours = `0${hours}`
     };
     let minutes = date.getMinutes();
     if (minutes < 10) {
         minutes = `0${minutes}`
     };
     return `${hours}:${minutes}`;
 }

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#day");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);

    fahrenheitTemperature = response.data.main.temp;
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index <6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
         <h3>
             ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
        <div class="weather-forecast-temperature">
        <strong>
        ${Math.round(forecast.main.temp_max)}°
        </strong> 
        </div>
    </div>
    `; }
}

function search(city) {
    let apiKey = "613c0e173ab2e750c5de3e90ad00ac92";
    let units = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
    
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast); }

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let celciusTemperature = ((fahrenheitTemperature - 32) * 5 / 9);
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Boston");