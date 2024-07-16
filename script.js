// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = getTaskList();
        taskList.push({ text: taskText, completed: false });
        saveTaskList(taskList);
        renderTaskList();
        taskInput.value = '';
    }
}

function toggleTaskCompletion(index) {
    const taskList = getTaskList();
    taskList[index].completed = !taskList[index].completed;
    saveTaskList(taskList);
    renderTaskList();

    if (taskList[index].completed) {
        showAlert('Task Completed', 'You have successfully completed a task!');
    } else {
        showAlert('Task Unmarked', 'Task has been unmarked as completed.');
    }
}

function editTask(index) {
    const taskList = getTaskList();
    const newTaskText = prompt('Edit your task:', taskList[index].text);

    if (newTaskText !== null) {
        taskList[index].text = newTaskText.trim();
        saveTaskList(taskList);
        renderTaskList();
    }
}

function deleteTask(index) {
    const taskList = getTaskList();
    taskList.splice(index, 1);
    saveTaskList(taskList);
    renderTaskList();
}

function getTaskList() {
    return JSON.parse(localStorage.getItem('taskList')) || [];
}

function saveTaskList(taskList) {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function renderTaskList() {
    const taskList = getTaskList();
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';

    taskList.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskItem.appendChild(taskText);

        const markCompletedButton = document.createElement('button');
        markCompletedButton.textContent = task.completed ? 'Unmark' : 'Mark as Completed';
        markCompletedButton.className = 'mark-completed';
        markCompletedButton.addEventListener('click', () => toggleTaskCompletion(index));
        taskItem.appendChild(markCompletedButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(index));
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        taskItem.appendChild(deleteButton);

        taskListElement.appendChild(taskItem);
    });
}

function showAlert(title, message) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';

    const alertTitle = document.createElement('h2');
    alertTitle.textContent = title;
    alertBox.appendChild(alertTitle);

    const alertMessage = document.createElement('p');
    alertMessage.textContent = message;
    alertBox.appendChild(alertMessage);

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => alertBox.remove());
    alertBox.appendChild(closeButton);

    document.body.appendChild(alertBox);
}

function loadTasks() {
    renderTaskList();
}
