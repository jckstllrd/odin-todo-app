import "./styles.css";

let projectArray = localStorage.getItem("projects")
  ? JSON.parse(localStorage.getItem("projects"))
  : [];
let todosDOM = document.querySelector(".todo-list");
let activeProject;
class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
    this.active = false;
  }

  toggleActive() {
    this.active = this.active ? false : true;
  }
}

function setActiveProject(project) {
  activeProject = project;
}


function displayTodo(todo) {
    console.log('displaying todo');
    
  const todoDiv = document.createElement("div");
  todoDiv.classList.toggle("todo");
  const title = document.createElement("p");
  title.textContent = todo.title;
  todoDiv.appendChild(title);

  const description = document.createElement("p");
  description.textContent = todo.description;
  todoDiv.appendChild(description);

  const dueDate = document.createElement("p");
  dueDate.textContent = todo.dueDate;
  todoDiv.appendChild(dueDate);

  const priority = document.createElement("p");
  priority.textContent = todo.priority;
  todoDiv.appendChild(priority);

  todosDOM.appendChild(todoDiv);
}

function createNewTodo(title, description, dueDate, priority, project) {
  let todo = new Todo(title, description, dueDate, priority);
  project.todos.push(todo);
  console.log('creating todo');
  
  displayTodo(todo);
}

let content = document.querySelector(".content");

// Create todo buttons and dialog
let todoDialog = document.querySelector(".todo-dialog");
let openTodoDialog = document.querySelector(".open-todo-dialog");
let closeTodoDialog = document.querySelector(".close-todo-dialog");
let submitTodoBtn = document.querySelector(".create-todo");

// Create project buttons and dialog
let projectDialog = document.querySelector(".project-dialog");
let openProjectDialog = document.querySelector(".open-project-dialog");
let closeProjectDialog = document.querySelector(".close-project-dialog");
let submitProjectBtn = document.querySelector(".create-project");

todoDialog.addEventListener("click", (e) => {
  const dialogDimensions = todoDialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    todoDialog.close();
  }
});

projectDialog.addEventListener("click", (e) => {
  const dialogDimensions = projectDialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    projectDialog.close();
  }
});

console.log(todoDialog);

openTodoDialog.addEventListener("click", () => {
  todoDialog.showModal();
  console.log("opening dialog");
});

closeTodoDialog.addEventListener("click", () => {
  todoDialog.close();
});

submitTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.form;
  let title = form.title.value;
  let description = form.description.value;
  let dueDate = form.dueDate.value;
  let priority = form.priority.value;
  console.log(title, description, dueDate, priority);
  createNewTodo(title, description, dueDate, priority, activeProject)
  form.reset();
  todoDialog.close();
});

openProjectDialog.addEventListener("click", () => {
  projectDialog.showModal();
  console.log("opening dialog");
});

closeProjectDialog.addEventListener("click", () => {
  projectDialog.close();
});

submitProjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.form;
  let title = form.title.value;
  let description = form.description.value;
  console.log(title, description);
  form.reset();
  projectDialog.close();
});

const defaultProject = new Project('default')

setActiveProject(defaultProject)