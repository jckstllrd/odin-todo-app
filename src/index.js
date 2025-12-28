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
}

function toggleActive(project) {
  project.active = project.active ? false : true;
}

function setActiveProject(project) {
  if (activeProject === undefined) {
    toggleActive(project);
    activeProject = project;
  } else {
    toggleActive(activeProject);

    toggleActive(project);
    activeProject = project;
    projectsDOM.textContent = "";
    todosDOM.textContent = "";
    projectArray.forEach((project) => {
      displayProject(project);
    });
  }
  activeProject.todos.forEach((todo) => {
    displayTodo(todo);
  });
  localStorage.setItem("projects", JSON.stringify(projectArray));
}

function displayTodo(todo) {
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
  delBtn.addEventListener("click", (e) => {
    removeTodo(e);
  });

  todoDel.appendChild(delBtn);
  todoItem.appendChild(todoDel);
  todoDiv.appendChild(todoItem);
  todosDOM.appendChild(todoDiv);
}

function removeTodo(e) {
  let todoDiv = e.target.parentNode.parentNode.parentNode;
  let todoList = todoDiv.parentNode;

  let todoTitle =
    e.target.parentNode.parentNode.firstChild.firstChild.innerHTML;

  activeProject.todos.forEach((todo) => {
    if (todo.title == todoTitle) {
      let index = activeProject.todos.indexOf(todo);
      activeProject.todos.splice(index, 1);
    }
  });

  localStorage.setItem("projects", JSON.stringify(projectArray));
  setActiveProject(activeProject);
}

function createNewTodo(title, description, dueDate, priority, project) {
  let todo = new Todo(title, description, dueDate, priority);
  project.todos.push(todo);

  localStorage.setItem("projects", JSON.stringify(projectArray));
  displayTodo(todo);
}

function initialiseDOM() {
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

  openTodoDialog.addEventListener("click", () => {
    todoDialog.showModal();
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
    createNewTodo(title, description, dueDate, priority, activeProject);
    form.reset();
    todoDialog.close();
  });

  submitProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let form = e.target.form;
    let title = form.title.value;
    let description = form.description.value;

    createProject(title);
    form.reset();
    projectDialog.close();
  });

  openProjectDialog.addEventListener("click", () => {
    projectDialog.showModal();
  });

  closeProjectDialog.addEventListener("click", () => {
    projectDialog.close();
  });
}

function deleteProject(projectTitle) {
  let index;

  for (let i = 0; i < projectArray.length; i++) {
    if (projectTitle == projectArray[i].title) {
      index = i;
    }
  }

  projectArray.splice(index, 1);
  localStorage.setItem("projects", projectArray);
  setActiveProject(projectArray[0]);
}

function displayProject(project) {
  const projectDiv = document.createElement("div");
  projectDiv.classList.toggle("project");

  const activeDiv = document.createElement("div");
  activeDiv.classList.toggle("active-div");

  const activeSign = document.createElement("h2");
  activeSign.textContent = "//";
  activeDiv.appendChild(activeSign);

  const projectTitle = document.createElement("h2");
  projectTitle.classList.toggle("project-title");
  projectTitle.textContent = project.title;

  const delBtn = document.createElement("button");
  delBtn.classList.toggle("project-del");
  delBtn.textContent = "x";

  delBtn.addEventListener("click", (e) => {
    let title = e.target.parentElement.childNodes[0].innerHTML;
    if (e.target.parentElement.children.length == 3) {
      title = e.target.parentElement.childNodes[1].innerHTML;
    }
    deleteProject(title);
  });

  if (project.active) {
    projectDiv.appendChild(activeDiv);
  }
  projectTitle.addEventListener("click", (e) => {
    setActiveProject(project);
  });
  projectDiv.appendChild(projectTitle);
  if (project.title != "default") {
    projectDiv.appendChild(delBtn);
  }

  projectsDOM.appendChild(projectDiv);
}

function createProject(title) {
  let project = new Project(title);
  projectArray.push(project);
  setActiveProject(project);
  localStorage.setItem("projects", JSON.stringify(projectArray));
}

function initialiseLocalStorage() {
  projectArray = localStorage.getItem("projects")
    ? JSON.parse(localStorage.getItem("projects"))
    : [];

  if (projectArray.length == 0) {
    let defaultProject = new Project("default");
    setActiveProject(defaultProject);
    projectArray.push(defaultProject);
  }

  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i].active) {
      activeProject = projectArray[i];
    }
  }
}

function refreshPage() {
  if (activeProject) {
    activeProject.todos.forEach((todo) => {
      displayTodo(todo);
    });
  }

  projectArray.forEach((project) => {
    displayProject(project);
  });
}

// Running the app
let activeProject;
let projectArray;
let todosDOM = document.querySelector(".todo-list");
let projectsDOM = document.querySelector(".project-list");

// localStorage.clear()
initialiseDOM();
initialiseLocalStorage();
refreshPage();

console.log(projectArray);

