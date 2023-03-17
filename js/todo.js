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

const form = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todoList.innerHTML = savedTodos;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = this.querySelector("input");
  const text = input.value.trim();

  if (text) {
    const li = document.createElement("li");
    li.classList.add("todo-spans");

    const uncheckedSpan = document.createElement("span");
    uncheckedSpan.id = "unchecked";
    uncheckedSpan.innerHTML = '<i class="fa-regular fa-square"></i>';
    li.appendChild(uncheckedSpan);

    const checkedSpan = document.createElement("span");
    checkedSpan.id = "checked";
    checkedSpan.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    li.appendChild(checkedSpan);

    const newTodoSpan = document.createElement("span");
    newTodoSpan.id = "newTodo";
    newTodoSpan.textContent = text;
    li.appendChild(newTodoSpan);

    const todoOptionsSpan = document.createElement("span");
    todoOptionsSpan.id = "todoOptions";

    const editButton = document.createElement("button");
    editButton.id = "editButton";
    editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    todoOptionsSpan.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoOptionsSpan.appendChild(deleteButton);

    li.appendChild(todoOptionsSpan);

    todoList.appendChild(li);

    localStorage.setItem("todos", todoList.innerHTML);

    input.value = "";
  }
});
