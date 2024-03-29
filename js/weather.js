const API = "07ea8ec2602384af676b3bd1bec9e685";

function onGeoOk(position) {
  const lng = position.coords.longitude;
  const lat = position.coords.latitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      const iconImg = document.createElement("img");
      iconImg.src = iconUrl;
      city.innerText = data.name;
      weather.innerText = data.weather[0].main;
      weather.appendChild(iconImg);
    });
}

function onGeoFailure() {
  alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoFailure);
