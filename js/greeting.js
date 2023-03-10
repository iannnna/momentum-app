const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const timeFormatButton = document.querySelector("#time-format-button");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

let isClockHovered = false;
let is24HourFormat = false;

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreeting(username);
}

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good Evening";
  }
}

function paintGreeting(username) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const greetingText = getGreeting(hours);

  const clock = document.querySelector("#clock");
  const greetingContainer = document.querySelector("#greeting-container");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  greeting.innerText = `${greetingText}, ${username}`;
  greetingContainer.classList.remove(HIDDEN_CLASSNAME);
  clock.style.display = "inline-block";
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}

const clock = document.querySelector("#clock");

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds} `;
}

getClock();
setInterval(getClock, 1000);
