function displayTemperature () {

}

let apiKey = "613c0e173ab2e750c5de3e90ad00ac92";
let apiUnits = "imperial";
let city = "Boston";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


axios.get(apiUrl).then(displayTemperature);


console.log(apiUrl);





