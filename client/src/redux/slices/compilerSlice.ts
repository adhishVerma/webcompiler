import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
    html: string;
    css: string;
    javascript: string;
    currentLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
    html: `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Advanced To-Do List</title>
    </head>
    <body>
        <div class="container">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Add new task">
        <button onclick="addTask()">Add</button>
        <ul id="taskList"></ul>
        </div>
    </body>
</html>
    `,
    css: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
}
.container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1, input, button {
    margin-bottom: 10px;
}
input[type="text"] {
    width: calc(100% - 80px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    padding: 10px;
    background-color: #fafafa;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
li:last-child {
    border-bottom: none;
}
li:hover {
    background-color: #f0f0f0;
}
.completed {
    text-decoration: line-through;
    color: #999;
}
.delete-btn {
    float: right;
    background-color: #ff5555;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.delete-btn:hover {
    background-color: #cc0000;
}
    `,
    javascript: `// Load tasks from local storage on page load
window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
    addTaskToUI(task);
    });
};

// Add task to the list
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText === "") {
    alert("Please enter a task.");
    return;
    }

    var task = {
    text: taskText,
    completed: false
};

addTaskToUI(task);
saveTask(task);

taskInput.value = "";
}

// Add task to the UI
function addTaskToUI(task) {
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
        li.classList.add("completed");
    }
    li.addEventListener("click", function() {
        toggleCompleted(li, task);
    });
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        deleteTask(li, task);
    });
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Toggle task completion
function toggleCompleted(li, task) {
    li.classList.toggle("completed");
    task.completed = !task.completed;
    saveTasksToLocalStorage();
}

// Delete task
function deleteTask(li, task) {
    var taskList = document.getElementById("taskList");
    taskList.removeChild(li);
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(function(t) {
        return t.text !== task.text;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Save task to local storage
function saveTask(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    var tasks = [];
    var taskList = document.getElementById("taskList");
    taskList.childNodes.forEach(function(li) {
        var task = {
            text: li.textContent.trim(),
            completed: li.classList.contains("completed")
        };
            tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
    `,
    currentLanguage: "html"
}

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState: initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<CompilerSliceStateType["currentLanguage"]>) => {
            state.currentLanguage = action.payload;
        },
        updateCode: (state, action: PayloadAction<string>) => {
            const code = action.payload;
            state[state.currentLanguage] = code;
        },
        saveFullCode: (state, action: PayloadAction<{ css: string, javascript: string, html: string }>) => {
            const code = action.payload;
            state.css = code.css;
            state.javascript = code.javascript;
            state.html = code.html;
        }
    }
})

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCode, saveFullCode } = compilerSlice.actions;