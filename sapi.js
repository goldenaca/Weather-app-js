// VARIABLES
const apiKey = "58b232f4b2f853f4b3538e0ca4a12819";
const loc = document.getElementById("location");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const feelTemp = document.getElementById("feelTemp");
const humidity = document.getElementById("humidity");

const weatherData = {
  zone: null,
  temp: null,
  feeling: null,
  humidity: null,
  country: null,
  sky: null,
  icon: null,
};

// CHECK GEOLOCATION ON BROWSER
if ("geolocation" in navigator);
else alert("Your broweser do not support geolocation");

// FUNCTIONS

const geoLocationSuccess = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  sendRequest(lat, lon);
};

const geoLocationError = (err) => {
  alert(err.message);
};

const sendRequest = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  const data = await res.json();
  selectData(data);
  displayData();
};

const selectData = (data) => {
  console.log(data);
  weatherData.zone = data.name;
  weatherData.temp = Math.round(data.main.temp - 273);
  weatherData.feeling = Math.round(data.main.feels_like - 273);
  weatherData.humidity = data.main.humidity;
  weatherData.country = data.sys.country;
  weatherData.sky = data.weather[0].description;
  weatherData.icon = data.weather[0].icon;
};

const displayData = () => {
  loc.textContent = `${weatherData.zone} - ${weatherData.country}`;
  description.textContent = weatherData.sky;
  weatherIcon.innerHTML = `<img class="icon" id="icon" src="icons/${weatherData.icon}.png" />`;
  temp.textContent = `${weatherData.temp} °C`;
  feelTemp.textContent = `feels like : ${weatherData.feeling} °C`;
  humidity.textContent = `humidity : ${weatherData.humidity} %`;
};

// Get location

navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError);
