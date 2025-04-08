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
                        </div>
                        <div class="update-control">
                                <button id="save">Save</button>
                                <button id="cancel">Cancel</button>
                        </div>
                        <div class="buttons">
                            <button id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button id="delete"><i class="fa-solid fa-check"></i></button>
                        </div>
                    </div> `;
    }

    document.querySelector(".content").innerHTML = tasks;
    console.log(taskArray);
    activateAllListeners();
}

function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll("#delete");
    deleteBtn.forEach((db, i) => {
        db.addEventListener("click", () =>{ deleteTask(i) })
    })
}

function activateEditListeners(){
    let editBtn = document.querySelectorAll("#edit");
    let updateControls = document.querySelectorAll(".update-control");
    let taskText = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i) => {
        eb.addEventListener("click", () =>{ 

            updateControls[i].style.display = "flex";
            taskText[i].disabled = false;
        })
    })
}

function activateSaveListeners(){
    let saveBtn = document.querySelectorAll("#save");
    let taskText = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () =>{updateTask(taskText[i].value, i)})
    })
}

function activateCancelListeners(){
    let cancelBtn = document.querySelectorAll("#cancel");
    let updateControls = document.querySelectorAll(".update-control");
    let taskText = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb, i) =>{
        cb.addEventListener("click", () => {
            updateControls[i].style.display = "none";
            taskText[i].disabled = true;
            taskText[i].value = taskArray[i];
        })
    })
}

function updateTask(text, i){
    taskArray[i] = text;
    localStorage.setItem("task", JSON.stringify(taskArray))
    location.reload();
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