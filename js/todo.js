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

// const form = document.getElementById("todo-form");
// const todoList = document.getElementById("todo-list");

// const savedTodos = localStorage.getItem("todos");
// if (savedTodos) {
//   todoList.innerHTML = savedTodos;
// }

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const input = this.querySelector("input");
//   const text = input.value.trim();

//   if (text) {
//     const li = document.createElement("li");
//     li.classList.add("todo-spans");

//     const uncheckedSpan = document.createElement("span");
//     uncheckedSpan.id = "unchecked";
//     uncheckedSpan.innerHTML = '<i class="fa-regular fa-square"></i>';
//     li.appendChild(uncheckedSpan);

//     const checkedSpan = document.createElement("span");
//     checkedSpan.id = "checked";
//     checkedSpan.innerHTML = '<i class="fa-regular fa-square-check"></i>';
//     li.appendChild(checkedSpan);

//     const newTodoSpan = document.createElement("span");
//     newTodoSpan.id = "newTodo";
//     newTodoSpan.textContent = text;
//     li.appendChild(newTodoSpan);

//     const todoOptionsSpan = document.createElement("span");
//     todoOptionsSpan.id = "todoOptions";

//     const editButton = document.createElement("button");
//     editButton.id = "editButton";
//     editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
//     todoOptionsSpan.appendChild(editButton);

//     const deleteButton = document.createElement("button");
//     deleteButton.id = "deleteButton";
//     deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
//     todoOptionsSpan.appendChild(deleteButton);

//     li.appendChild(todoOptionsSpan);

//     todoList.appendChild(li);

//     localStorage.setItem("todos", todoList.innerHTML);

//     input.value = "";
//   }
// });

const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = todoForm.querySelector("input");

let todos = [];

const TODOS_KEY = "todos";

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const todoItem = deleteButton.closest("li");
  todoItem.remove();
  todos = todos.filter((toDo) => toDo.id !== parseInt(todoItem.id));
  saveTodos();
}

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;

  const checkbox = document.createElement("span");
  checkbox.classList.add("unchecked");
  checkbox.innerHTML = newTodo.completed
    ? '<i class="fa-regular fa-square-check"></i>'
    : '<i class="fa-regular fa-square"></i>';
  checkbox.addEventListener("click", function () {
    newTodo.completed = !newTodo.completed;
    checkbox.innerHTML = newTodo.completed
      ? '<i class="fa-regular fa-square-check"></i>'
      : '<i class="fa-regular fa-square"></i>';
    span.style.textDecoration = newTodo.completed ? "line-through" : "none";
    saveTodos();
  });

  const span = document.createElement("span");
  span.id = "newTodoItem";
  span.innerText = newTodo.text;
  span.style.textDecoration = newTodo.completed ? "line-through" : "none";
  span.addEventListener("dblclick", function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.innerText;
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        span.innerText = input.value;
        newTodo.text = input.value;
        saveTodos();
        input.replaceWith(span);
      }
      if (event.key === "Escape") {
        input.replaceWith(span);
      }
    });
    input.addEventListener("blur", function () {
      input.replaceWith(span);
    });
    span.replaceWith(input);
    input.focus();
  });

  const todoOptionsSpan = document.createElement("span");
  todoOptionsSpan.id = "todoOptions";

  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  editButton.id = "editButton";
  editButton.addEventListener("click", function () {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.innerText;
    input.style.outline = "none";
    input.style.border = "none";
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        span.innerText = input.value;
        newTodo.text = input.value;
        saveTodos;
        input.replaceWith(span);
      }
      if (event.key === "Escape") {
        input.replaceWith(span);
      }
    });
    input.addEventListener("blur", function () {
      input.replaceWith(span);
    });
    span.replaceWith(input);
    input.focus();
  });
  todoOptionsSpan.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.id = "deleteButton";
  deleteButton.addEventListener("click", deleteTodo);
  todoOptionsSpan.appendChild(deleteButton);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(todoOptionsSpan);

  todoList.appendChild(li);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
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
