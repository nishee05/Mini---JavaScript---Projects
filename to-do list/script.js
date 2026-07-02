const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const taskInput = document.getElementById('taskInput');
const showCompletedButton = document.querySelector('.showList'); 

let completedTasks = [];
let tasks = [];

showCompletedButton.disabled = true;

function addTask() {
    const taskText = taskInput.value.trim();
    const task = {
        id: Date.now(),
        taskText: taskText
    };

    if (taskText !== "") {
        tasks.push(task);
        showTaskList();
        taskInput.value = ""; 
    }
}

function showTaskList() {
    taskList.innerHTML = ''; 

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.taskText; 

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => completeTask(task.id);

        li.appendChild(completeButton);
        taskList.appendChild(li);
    });
}

function completeTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        const [completedTask] = tasks.splice(taskIndex, 1); 
        completedTasks.push(completedTask); 
        showTaskList();  
          

        showCompletedButton.disabled = false;
    }
}

function showCompletedList() {
    completedTaskList.innerHTML = '';

    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteCompletedTask(task.id);
        li.appendChild(deleteButton);
        completedTaskList.appendChild(li);
    });
}


function deleteCompletedTask(taskId) {
    const taskIndex = completedTasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        completedTasks.splice(taskIndex, 1);  
        showCompletedList();  
    }
}

function toggleCompletedList() {
    const completedListDiv = document.querySelector('.completed-list');
    // const currentDisplay = completedListDiv.style.display;

    // if (currentDisplay === 'none' || currentDisplay === '') {
        completedListDiv.style.display = 'block';  
        showCompletedList(); 
        showCompletedButton.disabled = true;
    // }
}

