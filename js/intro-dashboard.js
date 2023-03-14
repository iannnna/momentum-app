// Intro + Greeting

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const clockHide = document.querySelector("#clock");
const quotesHide = document.querySelector("#quotes");
const todoHide = document.querySelector("#todo-container");
const weatherHide = document.querySelector("#weather");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

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
  } else if (hour > +12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good Evening";
  }
}

function paintGreeting(username) {
  const greetingText = `${getGreeting()}, ${username}`;
  greeting.innerText = greetingText;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  clockHide.classList.remove(HIDDEN_CLASSNAME);
  quotesHide.classList.remove(HIDDEN_CLASSNAME);
  todoHide.classList.remove(HIDDEN_CLASSNAME);
  weatherHide.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}

// Clock option
const clock = document.querySelector("#clock");
const clockFormatButton = document.getElementById("clock-format");
const clockOption = document.getElementById("clockOption");
const toggleOff = document.querySelector(".toggleOff");
const timeFormatText = document.querySelector(".clock-option p");
const updateNameButton = document.getElementById("greeting-option");
const updateName = document.getElementById("updateName");

let is24HourFormat = true;

function toggleMenu() {
  clockOption.classList.toggle("open-menu");
  updateName.classList.toggle("open-menu");
}

document.addEventListener("click", (event) => {
  if (
    !clockOption.contains(event.target) &&
    !clockFormatButton.contains(event.target)
  ) {
    clockOption.classList.remove("open-menu");
    clockFormatButton.classList.remove("active");
  }
});

toggleOff.addEventListener("click", () => {
  is24HourFormat = !is24HourFormat;
});

function getClock() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (!is24HourFormat) {
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");
    toggleOff.classList.add("toggleOn");
    toggleOff.querySelector(".toggleBoxOff").classList.add("toggleBoxOn");
  } else {
    toggleOff.classList.remove("toggleOn");
    toggleOff.querySelector(".toggleBoxOff").classList.remove("toggleBoxOn");
  }
  clock.innerText = `${hours}:${minutes}:${seconds} `;
}

getClock();
setInterval(getClock, 1000);

// name option

document.addEventListener("click", (event) => {
  if (
    !updateName.contains(event.target) &&
    !updateNameButton.contains(event.target)
  ) {
    updateName.classList.remove("open-menu");
    updateNameButton.classList.remove("active");
  }
});
