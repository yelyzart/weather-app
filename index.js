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

function scan(response) {
  let temp = document.querySelector("span");
  temp.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("h2");
  city.innerHTML = response.data.name;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = response.data.main.humidity;
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let key = "7462c8bafebf7d5e231ed68152a3e97e";
  let linkApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(linkApi).then(scan);
}

function enterC(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");
  let city = document.querySelector("h2");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
let inputForm = document.querySelector("form");
inputForm.addEventListener("submit", enterC);

function layout(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "7462c8bafebf7d5e231ed68152a3e97e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(scan);
}
function push() {
  navigator.geolocation.getCurrentPosition(layout);
}

let geobutton = document.querySelector("button");
geobutton.addEventListener("click", push);
