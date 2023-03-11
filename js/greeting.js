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
