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
  let temp = document.querySelector("span");
  temp.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("h2");
  city.innerHTML = response.data.name;
  let humidity = document.querySelector("span.hum");
  humidity.innerHTML = response.data.main.humidity;
  let windspeed = document.querySelector("span.wind");
  windspeed.innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let key = "7462c8bafebf7d5e231ed68152a3e97e";
  let linkApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(linkApi).then(getInformation);
}

function enterC(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let city = document.querySelector("h2");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", enterC);
