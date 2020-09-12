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


}

let apiKey = "613c0e173ab2e750c5de3e90ad00ac92";
let apiUnits = "imperial";
let city = "New York";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;


axios.get(apiUrl).then(displayTemperature);






