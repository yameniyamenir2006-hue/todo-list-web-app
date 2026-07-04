const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    document.getElementById("totalTask").textContent = tasks.length;

    const completed = tasks.filter(task => task.completed).length;
    document.getElementById("completedTask").textContent = completed;
    document.getElementById("pendingTask").textContent = tasks.length - completed;
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;

    });

    const keyword = searchTask.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>

                <button class="action-btn edit"
                onclick="editTask(${index})">
                Edit
                </button>

                <button class="action-btn delete"
                onclick="deleteTask(${index})">
                Delete
                </button>

                <button class="action-btn"
                onclick="toggleTask(${index})">
                ✔️
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateCounter();
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
    text: text,
    completed: false,
    priority: document.getElementById("priority").value,
    dueDate: document.getElementById("dueDate").value
});

    taskInput.value = "";

    saveTasks();
    renderTasks();

});

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();

}

function editTask(index) {

    const newTask = prompt("Edit Task", tasks[index].text);

    if (newTask) {

        tasks[index].text = newTask;

        saveTasks();
        renderTasks();

    }

}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();

}

searchTask.addEventListener("keyup", renderTasks);

document.querySelectorAll(".filter").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".active").classList.remove("active");

        btn.classList.add("active");

        filter = btn.dataset.filter;

        renderTasks();

    });

});

document.getElementById("clearAll").addEventListener("click", () => {

    if (confirm("Delete all tasks?")) {

        tasks = [];

        saveTasks();
        renderTasks();

    }

});

setInterval(() => {

    const now = new Date();

    document.getElementById("date").textContent =
        now.toLocaleDateString();

    document.getElementById("time").textContent =
        now.toLocaleTimeString();

}, 1000);
// Enter key support
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addBtn.click();
    }
});

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerText = "☀️ Light Mode";
    }else{
        themeBtn.innerText = "🌙 Dark Mode";
    }

});

li.innerHTML = `
<div>

<h3 class="${task.completed ? "completed" : ""}">
${task.text}
</h3>

<p>Priority: ${task.priority}</p>

<p>Due: ${task.dueDate || "No Date"}</p>

</div>

<div>

<button class="action-btn edit"
onclick="editTask(${index})">
Edit
</button>

<button class="action-btn delete"
onclick="deleteTask(${index})">
Delete
</button>

<button class="action-btn"
onclick="toggleTask(${index})">
✔️
</button>

</div>
`;