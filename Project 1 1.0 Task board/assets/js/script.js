"use strict"

//pushing new tasks either into saved array from local storage or an empty one, and saving it back again to local storage by same name.
function newTask(description, date, time) {
    const task = {
        description,
        date,
        time
    };
    const tasksArr = getTasks();
    tasksArr.push(task);
    saveTasks(tasksArr);
}

//saving all the tasks in local storage.
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//retrieving all the tasks from local storage
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

//offset is obtained by inserting index of current card in createTask() for loop. Deleting from local storage by removing it from local array and saving it
//in local storage again. then recreating tasks with new array.
function deleteTaskAt(offset) {
    const tasksArr = getTasks();
    tasksArr.splice(offset, 1);
    saveTasks(tasksArr);
    createTasks();
}

//creating new cards with tasks, with rquired classes I wrote style for in css
function createTasks() {
    let taskCards = '';
    for (let i = 0; i < getTasks().length; i++) {
        taskCards += `
        <div  onmouseover="showCloseBtn(this)" onmouseout="hide(this)" class="task__card">
        <img id='noteImg' src="assets/images/notebg.png" alt="">
        <span class="close" onclick="deleteTaskAt(${i})"><i class="bi bi-x-square-fill"></i></span>
        <textarea readonly class="note">${getTasks()[i].description}</textarea>
        <p class="date">${getTasks()[i].date}</p>
        <p class="hour">${getTasks()[i].time}</p>
    </div>
        `
    }
    //tasks_container is div container with display grid which contains every card in it, declared in main.js
    tasks_container.innerHTML = taskCards;
}

//getting last card and applying animation for it, in this case I use it on button create, so last one is always new.
function addAnimation() {
    let allCards = document.querySelectorAll('.task__card');
    allCards[allCards.length - 1].classList.add('animatedCard');
}

//removing animations once page loaded, we only need it for new ones
function removeAnimation() {
    const allCards = document.querySelectorAll(".task__card");
    for (let i of allCards) {
        i.classList.remove('animatedCard');
    }
}

//passing current element and hiding or showing on its [1]child which is close button by adding a class
function showCloseBtn(element) {
    element.children[1].classList.add('visible');
}

function hide(element) {
    element.children[1].classList.remove('visible');
}

function clearFields() {
    task_description.value = '';
    task_date.value = '';
    task_time.value = '';
}

//simple check if fields are not empty.
function checkFields() {
    if (task_description.value == ''
        || task_date.value == ''
        || task_time.value == '') {
        return false;
    }
    return true;
}

//if true will show popUp if false will close it, sending false from a button close on popup and true from the button submit if fields
//are empty
function showOrClosePoP(toggle) {
    const popup = document.querySelector('.wrongPopup');
    toggle ? popup.classList.add('showPopUp') : popup.classList.remove('showPopUp');
}