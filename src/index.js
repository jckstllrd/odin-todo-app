import "./styles.css";


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

let projectArray = localStorage.getItem("projects")
  ? JSON.parse(localStorage.getItem("projects"))
  : [];


console.log(projectArray.todos.length);
  

// let activeProject;

if (projectArray.length == 0) {
    console.log('no projects: adding default');
    
    let defaultProject = new Project('default')
    defaultProject.toggleActive()
    projectArray.push(defaultProject)
}

console.log('hereo;in');
console.log(projectArray);


for(let i = 0; i < projectArray.length; i++) {
    console.log('here now');
    
    console.log('projects exist, finding active');
    
    if (projectArray[i].active) {
        activeProject = projectArray[i]
        console.log('found active project', activeProject);
    }
}

console.log(projectArray);

let todosDOM = document.querySelector(".todo-list");


function setActiveProject(project) {
    activeProject.toggleActive()
    project.toggleActive()
    activeProject = project;
}




function displayTodo(todo) {
    console.log(todo);
    
  console.log("displaying todo");
      const todoDiv = document.createElement("div");
    todoDiv.classList.toggle("todo");

  const todoItem = document.createElement("div");
  todoItem.classList.toggle("todo-item");

  const todoContent = document.createElement("div");
  todoContent.classList.toggle("todo-content");

  const todoDue = document.createElement("div");
  todoDue.classList.toggle("todo-due");

  const todoDel = document.createElement("div");
  todoDel.classList.toggle("todo-delete-div");

  const title = document.createElement("h3");
  title.textContent = todo.title;

  const desc = document.createElement("p");
  desc.textContent = todo.description;

  todoContent.appendChild(title);
  todoContent.appendChild(desc);
  todoItem.appendChild(todoContent);

  const due = document.createElement("p");
  due.classList.toggle("due");
  due.textContent = "Due: ";

  const date = document.createElement("p");
  date.classList.toggle("date");
  date.textContent = todo.dueDate;

  todoDue.appendChild(due);
  todoDue.appendChild(date);
  todoItem.appendChild(todoDue);

  const delBtn = document.createElement("button");
  delBtn.classList.toggle("todo-delete");
  delBtn.classList.toggle("btn");
  delBtn.textContent = "x";
  delBtn.addEventListener("click", (e) => {removeTodo(e)})

  todoDel.appendChild(delBtn)
  todoItem.appendChild(todoDel)
  todoDiv.appendChild(todoItem)
  todosDOM.appendChild(todoDiv)


  //   const title = document.createElement("p");
  //   title.textContent = todo.title;
  //   todoDiv.appendChild(title);

  //   const description = document.createElement("p");
  //   description.textContent = todo.description;
  //   todoDiv.appendChild(description);

  //   const dueDate = document.createElement("p");
  //   dueDate.textContent = todo.dueDate;
  //   todoDiv.appendChild(dueDate);

  //   const priority = document.createElement("p");
  //   priority.textContent = todo.priority;
  //   todoDiv.appendChild(priority);

  //   todosDOM.appendChild(todoDiv);
}

function removeTodo(e) {
    console.log(e);
    
}


function createNewTodo(title, description, dueDate, priority, project) {
  let todo = new Todo(title, description, dueDate, priority);
  project.todos.push(todo);
  console.log("creating todo");
    localStorage.setItem("projects", JSON.stringify(project))
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
  createNewTodo(title, description, dueDate, priority, activeProject);
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

function createProject(title, description) {

}

submitProjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = e.target.form;
  let title = form.title.value;
  let description = form.description.value;

  console.log(title, description);
  createProject()
  form.reset();
  projectDialog.close();
});


