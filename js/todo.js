const todo = document.querySelector("#todo");
const todoMenu = document.querySelector("#todo-container");
const todoCloseButton = document.querySelector("#todo-close-button");

function showTodoMenu() {
  todoMenu.classList.toggle("open-menu");
}

function closeTodoMenu() {
  todoMenu.classList.remove("open-menu");
}

todoCloseButton.addEventListener("click", closeTodoMenu);

const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = todoForm.querySelector("input");

let todos = [];

const TODOS_KEY = "todos";

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.addEventListener("click", function () {
    span.classList.toggle("completed");
  });

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "🗑️";
  button.style = "border: none";
  button.addEventListener("click", deleteTodo);

  li.appendChild(circle);
  li.appendChild(span);
  li.appendChild(button);

  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value.trim();
  if (newTodo === "") {
    return;
  }
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodo = JSON.parse(savedTodos);
  todos = parsedTodo;
  parsedTodo.forEach(paintTodo);
}
