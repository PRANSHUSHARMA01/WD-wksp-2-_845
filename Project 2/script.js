const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyState = document.getElementById("emptyState");
const clearCompleted = document.getElementById("clearCompleted");
const filters = document.getElementById("filters");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let currentFilter = "all";

const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));
const escapeHtml = (text) => text.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

function renderTasks() {
  const visibleTasks = tasks.filter(({ done }) => {
    if (currentFilter === "active") return !done;
    if (currentFilter === "done") return done;
    return true;
  });

  taskList.innerHTML = visibleTasks.map((task) => `
    <li class="task-item ${task.done ? "done" : ""}">
      <label class="task-main">
        <input type="checkbox" data-action="toggle" data-id="${task.id}" ${task.done ? "checked" : ""}>
        <p>${escapeHtml(task.text)}</p>
      </label>
      <button class="delete-btn" data-action="delete" data-id="${task.id}" type="button">Delete</button>
    </li>
  `).join("");

  const activeCount = tasks.filter((task) => !task.done).length;
  taskCount.textContent = `${activeCount} ${activeCount === 1 ? "task" : "tasks"} left`;
  emptyState.style.display = visibleTasks.length ? "none" : "block";
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) return;

  tasks.unshift({ id: Date.now(), text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

taskList.addEventListener("click", (event) => {
  const target = event.target;
  const id = Number(target.dataset.id);
  const action = target.dataset.action;

  if (action === "delete") {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }
});

taskList.addEventListener("change", (event) => {
  const target = event.target;
  const id = Number(target.dataset.id);

  if (target.dataset.action !== "toggle") return;

  tasks = tasks.map((task) => task.id === id ? { ...task, done: target.checked } : task);
  saveTasks();
  renderTasks();
});

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  currentFilter = button.dataset.filter;
  [...filters.children].forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  renderTasks();
});

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  saveTasks();
  renderTasks();
});

renderTasks();