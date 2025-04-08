const taskArray = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) :
[]

const addTaskBtn = document.querySelector("#enterTask");
const task = document.querySelector("#taskInput");

addTaskBtn.addEventListener("click", () => {
    createTask(task);
});

task.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        createTask(taskInput);
    }
});

function displayTasks(){
    let tasks = "";

    for(let i = 0; i < taskArray.length; i++){
        tasks += `<div class="task">
                        <div class="input-controller">
                            <textarea id="taskName" disabled>${taskArray[i]}</textarea>
                            <div class="update-control">
                                <button id="save">Save</button>
                                <button id="cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="buttons">
                            <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="delete"><i class="fa-solid fa-trash"></i></button>
                            <button id="done"><i class="fa-solid fa-check"></i></button>
                        </div>
                    </div> `;
    }

    document.querySelector(".content").innerHTML = tasks;
    console.log(taskArray);
    activateDeleteListeners();
    activateMarkAsDoneListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll("#delete");
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () =>{ deleteTask(i) })
    })
}

function activateMarkAsDoneListeners(){
    let doneBtn = document.querySelectorAll("#done");
    doneBtn.forEach((db, i) => {
        db.addEventListener("click", () => {markAsDone(i) })
    })
}

let doneTasks = "";
function markAsDone(i){
    let tasks = "";

    doneTasks +=`<div class="task">
                        <div class="input-controller">
                            <textarea style="text-decoration: line-through;" disabled>${taskArray[i]}</textarea>
                            <div class="update-control">
                                <button id="save">Save</button>
                                <button id="cancel">Cancel</button>
                            </div>
                        </div>
                    </div> `;

    taskArray.splice(i, 1);

    for(let a = 0; a < taskArray.length; a++){
        tasks += `<div class="task">
                        <div class="input-controller">
                            <textarea disabled>${taskArray[a]}</textarea>
                            <div class="update-control">
                                <button id="save">Save</button>
                                <button id="cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="buttons">
                            <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="delete"><i class="fa-solid fa-trash"></i></button>
                            <button id="done"><i class="fa-solid fa-check"></i></button>
                        </div>
                    </div> `;
    }

    document.querySelector(".content").innerHTML = doneTasks + tasks;
    localStorage.setItem("task", JSON.stringify(taskArray));
    
    activateDeleteListeners();
    activateMarkAsDoneListeners();
    activateEditListeners();
    activateSaveListeners();
    activateCancelListeners();
}

function deleteTask(i){
    taskArray.splice(i, 1);
    localStorage.setItem("task", JSON.stringify(taskArray));
    location.reload();
}

function createTask(task){
    let inputValue = task.value.trim();
    if(inputValue === ""){
        window.alert("You CANNOT input an EMPTY TASK!")
    } else{
        taskArray.push(task.value);
        localStorage.setItem("task", JSON.stringify(taskArray));
        location.reload();
    }
}


 
function displayDate(){
    let date = new Date();
    date = date.toString().split(" ");
    date[1] = date[1].toLowerCase();

    switch(date[1]){
        case"jan":
            date[1] = 1;
            break;
        case"feb":
            date[1] = 2;
            break;
        case"mar":
            date[1] = 3;
            break;
        case"apr":
            date[1] = 4;
            break;
        case "may":
            date[1] = 5;
            break;
        case "jun":
            date[1] = 6;
            break;
        case "jul":
            date[1] = 7;
            break;
        case "aug":
            date[1] = 8;
            break;
        case "sep":
            date[1] = 9;
            break;
        case "oct":
            date[1] = 10;
            break;
        case "nov":
            date[1] = 11;
            break;
        case "dec":
            date[1] = 12;
            break;
    }
    if(date[1] < 10){
        document.querySelector("#date").textContent = `${date[2]}.0${date[1]}.${date[3]}`;
    } else{
        document.querySelector("#date").textContent = `${date[2]}.${date[1]}.${date[3]}`;
    }
}

window.onload = function(){
    displayDate();
    displayTasks();
}

//done