import "./styles.css";

let defaultProject = {};
let myProject = {};
let activeProject;

class Todo {
  constructor(title) {
    this.title = title;
  }
}

function setActiveProject(project) {
  activeProject = project;
}

setActiveProject(defaultProject);

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
  form.reset();
  todoDialog.close();
});

openProjectDialog.addEventListener("click", () => {
  projectDialog.showModal();
  console.log("opening dialog");
});

closeProjectDialog.addEventListener("click", () => {
  ProjectDialog.close();
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
