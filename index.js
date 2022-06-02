let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = days[now.getDay()];
let current = document.querySelector("h3");
current.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "7462c8bafebf7d5e231ed68152a3e97e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getInformation(response) {
  console.log(response.data);
  let temp = document.querySelector("span.temperature");
  let city = document.querySelector("#city");
  let country = document.querySelector("span.country");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("span.humidity");
  let windSpeed = document.querySelector("span.wind");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;
  temp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = response.data.wind.speed;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

let celsiusTemp = null;

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-table");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<tr>
        <td>${formatDay(forecastDay.dt)}</td>
        <td><img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="50px" class="forecast-icon"/></td>
        <td><span>${Math.round(
          forecastDay.temp.max
        )}°</span> / <span>${Math.round(forecastDay.temp.min)}°</span></td>
     </tr>`;
      forecastElement.innerHTML = forecastHTML;
    }
  });
}

function searchCity(city) {
  let key = "7462c8bafebf7d5e231ed68152a3e97e";
  let linkApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(linkApi).then(getInformation);
}

function enterC(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", enterC);

function displayFahrenheitElem(event) {
  event.preventDefault();
  celsius.classList.remove("celsius");
  fahrenheit.classList.add("celsius");
  let temp = document.querySelector("span.temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheit = document.querySelector("a.fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitElem);

function displayCelsiusElem(event) {
  event.preventDefault();
  fahrenheit.classList.remove("celsius");
  celsius.classList.add("celsius");
  let temp = document.querySelector("span.temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}

let celsius = document.querySelector("a.celsius");
celsius.addEventListener("click", displayCelsiusElem);

searchCity("Kyiv");
