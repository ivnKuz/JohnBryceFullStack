"use strict"
//publicly initialized constants for use.
const tasks_container = document.querySelector('.tasksContainer');
const task_description = document.getElementById('taskDesc');
const task_date = document.getElementById('untilDate');
const task_time = document.getElementById('untilHours');


//button for saving new tasks. if fields are empty shows custom popUp I made in html and hid it in css.
function createNewTask(e) {
    e.preventDefault();

    if (checkFields()) {
        newTask(task_description.value, task_date.value, task_time.value);
        createTasks();
        addAnimation();
    } else {
        showOrClosePoP(true);
    }
}

//when application is loaded, remove all the animation on cards and show tasks saved in local storage.
function onLoad() {
    createTasks();
    removeAnimation();
}