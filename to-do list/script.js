const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");
const completedTaskList = document.getElementById("completedTaskList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingSummary = document.getElementById("pendingSummary");
const completedSummary = document.getElementById("completedSummary");

const completedCard = document.querySelector(".completed-card");
const showBtn = document.querySelector(".showList");

let tasks = [];
let completedTasks = [];

/* ----------------------- ADD TASK ----------------------- */

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text
    };

    tasks.push(task);
    saveToLocalStorage();
    taskInput.value = "";

    renderTasks();
}

/* ----------------------- RENDER TASKS ----------------------- */

function renderTasks() {

    taskList.innerHTML = "";

if(tasks.length===0){

taskList.innerHTML=`
<li class="empty">

No Pending Tasks

</li>
`;

}

    tasks.forEach((task) => {

        const li = document.createElement("li");

        /* Left Section */

        const left = document.createElement("div");

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.onclick = () => completeTask(task.id);

        const span = document.createElement("span");

        span.textContent = task.text;

        left.appendChild(checkbox);
        left.appendChild(span);

        /* Right Section */

        const right = document.createElement("div");

        const editBtn = document.createElement("button");

        editBtn.innerHTML = "✏️";

        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");

        deleteBtn.innerHTML = "🗑️";

        deleteBtn.onclick = () => deleteTask(task.id);

        right.appendChild(editBtn);
        right.appendChild(deleteBtn);

        li.appendChild(left);
        li.appendChild(right);

        taskList.appendChild(li);

    });

    updateCounters();

}

/* ----------------------- COMPLETE TASK ----------------------- */

function completeTask(id) {

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) return;

    completedTasks.push(tasks[index]);

    tasks.splice(index, 1);
    saveToLocalStorage();

    renderTasks();

    renderCompleted();

}

/* ----------------------- RENDER COMPLETED ----------------------- */

function renderCompleted() {

    completedTaskList.innerHTML="";

if(completedTasks.length===0){

completedTaskList.innerHTML=`
<li class="empty">

No Completed Tasks

</li>
`;

}
    completedTasks.forEach((task) => {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.text;

        const deleteBtn = document.createElement("button");

        deleteBtn.innerHTML = "🗑️";

        deleteBtn.onclick = () => deleteCompletedTask(task.id);

        li.appendChild(span);

        li.appendChild(deleteBtn);

        completedTaskList.appendChild(li);

    });

    updateCounters();

}

/* ----------------------- EDIT TASK ----------------------- */

function editTask(id) {

    const task = tasks.find(task => task.id === id);

    const updated = prompt("Edit Task", task.text);

    if (updated === null) return;

    if (updated.trim() === "") return;

    task.text = updated.trim();
    saveToLocalStorage();

    renderTasks();

}

/* ----------------------- DELETE PENDING ----------------------- */

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();

    renderTasks();

}

/* ----------------------- DELETE COMPLETED ----------------------- */

function deleteCompletedTask(id) {

    if (!confirm("Delete this completed task?")) return;

    completedTasks = completedTasks.filter(task => task.id !== id);
    saveToLocalStorage();

    renderCompleted();

}

/* ----------------------- COUNTERS ----------------------- */

function updateCounters() {

    pendingCount.textContent = `${tasks.length} Task(s)`;

    completedCount.textContent = `${completedTasks.length} Task(s)`;

    pendingSummary.textContent = tasks.length;

    completedSummary.textContent = completedTasks.length;

}

/* ----------------------- SHOW / HIDE COMPLETED ----------------------- */

function toggleCompletedList() {

    if (completedCard.style.display === "block") {

        completedCard.style.display = "none";

        showBtn.innerHTML = "👁 Show Completed Tasks";

    }

    else {

        completedCard.style.display = "block";

        showBtn.innerHTML = "🙈 Hide Completed Tasks";

    }

}
/* ----------------------- LOCAL STORAGE ----------------------- */

function saveToLocalStorage() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

}

function loadFromLocalStorage() {

    const storedTasks = localStorage.getItem("tasks");

    const storedCompleted = localStorage.getItem("completedTasks");

    if (storedTasks) {

        tasks = JSON.parse(storedTasks);

    }

    if (storedCompleted) {

        completedTasks = JSON.parse(storedCompleted);

    }

    renderTasks();

    renderCompleted();

}
loadFromLocalStorage();