// Intro + Greeting

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const clockHide = document.querySelector("#clock");
const quotesHide = document.querySelector("#quotes");
const todoHide = document.querySelector("#todo-container");
const weatherHide = document.querySelector("#weather");
const timeGreet = document.querySelector("#time-greeting");

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
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good Evening";
  }
}

function addEditNameEventListener() {
  const editNameButton = document.querySelector(".update-name");
  const extraSpace = document.querySelector("#extra-space");
  const updateName = document.querySelector("#updateName");

  editNameButton.addEventListener("click", () => {
    extraSpace.classList.toggle(HIDDEN_CLASSNAME);
    updateName.classList.toggle("open-menu");
    const userGreeting = document.querySelector("#user-greeting");
    userGreeting.focus();
  });
}

function paintGreeting(username) {
  const timeGreeting = getGreeting();
  const greetingText = `${timeGreeting}, <span contenteditable id="user-greeting">${username}</span>`;
  greeting.innerHTML = greetingText;
  timeGreet.innerText = timeGreeting;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  clockHide.classList.remove(HIDDEN_CLASSNAME);
  quotesHide.classList.remove(HIDDEN_CLASSNAME);
  todoHide.classList.remove(HIDDEN_CLASSNAME);
  weatherHide.classList.remove(HIDDEN_CLASSNAME);

  const userGreeting = document.querySelector("#user-greeting");
  userGreeting.addEventListener("blur", () => {
    const newName = userGreeting.innerText.trim();
    if (newName === "") {
      const savedUsername = localStorage.getItem(USERNAME_KEY);
      userGreeting.innerText = savedUsername;
    } else {
      localStorage.setItem(USERNAME_KEY, newName);
    }
  });
  userGreeting.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      userGreeting.blur();
    }
  });
  addEditNameEventListener();
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreeting(savedUsername);
}

//name option
document.addEventListener("click", (event) => {
  if (
    !updateName.contains(event.target) &&
    !updateNameButton.contains(event.target)
  ) {
    updateName.classList.remove("open-menu");
    updateNameButton.classList.remove("active");
  }
});

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
