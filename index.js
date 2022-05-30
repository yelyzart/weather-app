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

let day = days[now.getDay()];
let current = document.querySelector("h3");
current.innerHTML = `${day} ${hour}:${minutes}`;

function getInformation(response) {
  console.log(response.data);
  let temp = document.querySelector("span.temperature");
  let city = document.querySelector("#city");
  let country = document.querySelector("span.country");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("span.humidity");
  let windspeed = document.querySelector("span.wind");
  let weatherIcon = document.querySelector("#weather-icon");

  celsiusTemp = response.data.main.temp;
  temp.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windspeed.innerHTML = response.data.wind.speed;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function displayfahrenheitElem(event) {
  event.preventDefault();
  celsius.classList.remove("celsius");
  fahrenheit.classList.add("celsius");
  let temp = document.querySelector("span.temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}
function displaycelsiusElem(event) {
  event.preventDefault();
  fahrenheit.classList.remove("celsius");
  celsius.classList.add("celsius");
  let temp = document.querySelector("span.temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", enterC);

let fahrenheit = document.querySelector("a.fahrenheit");
fahrenheit.addEventListener("click", displayfahrenheitElem);

let celsius = document.querySelector("a.celsius");
celsius.addEventListener("click", displaycelsiusElem);
