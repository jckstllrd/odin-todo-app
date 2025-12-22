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

let todoDialog = document.querySelector(".todo-dialog");
let openTodoDialog = document.querySelector(".open-todo-dialog");
let closeTodoDialog = document.querySelector(".close-todo-dialog");
let submitTodoBtn = document.querySelector(".submit-todo");

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

console.log(todoDialog);

openTodoDialog.addEventListener("click", () => {
  todoDialog.showModal();
  console.log("opening dialog");
});

closeTodoDialog.addEventListener("click", () => {
  todoDialog.close();
});

submitTodoBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let form = e.target.form
    let title = form.title.value 
    let description = form.description.value
    let dueDate = form.dueDate.value 
    let priority = form.priority.value 
    console.log(title, description, dueDate, priority);
    
    console.log(e.target.form.title.value);
    todoDialog.close()
})