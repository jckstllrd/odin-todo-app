import "./styles.css"


let defaultProject = {}
let myProject = {}
let activeProject;

class Todo {
    constructor(title) {
        this.title = title

    }
}

function setActiveProject(project) {
    activeProject = project
}

setActiveProject(defaultProject)


function initialiseLocalStorage() {
    
}

