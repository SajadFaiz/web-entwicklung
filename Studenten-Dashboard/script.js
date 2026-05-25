const themeToggle = document.getElementById("themeToggle");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const completedTasks = document.getElementById("completedTasks");
const taskProgress = document.getElementById("taskProgress");

let tasks = JSON.parse(localStorage.getItem("dashboardTasks")) || [
  { id: 1, text: "HTML-Aufgabe fertigstellen", completed: true },
  { id: 2, text: "CSS-Flexbox üben", completed: false },
  { id: 3, text: "JavaScript-Arrays lernen", completed: false },
  { id: 4, text: "Mini-Projekt abgeben", completed: true }
];

function speichereAufgaben() {
  localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
}

function speichereThema() {
  if (document.body.classList.contains("light")) {
    localStorage.setItem("dashboardTheme", "light");
  } else {
    localStorage.setItem("dashboardTheme", "dark");
  }
}

function ladeThema() {
  const gespeichertesThema = localStorage.getItem("dashboardTheme");

  if (gespeichertesThema === "light") {
    document.body.classList.add("light");
  }
}

function aktualisiereAufgabenStatistik() {
  let erledigteAnzahl = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      erledigteAnzahl++;
    }
  }

  const gesamtAufgaben = tasks.length;
  let fortschritt = 0;

  if (gesamtAufgaben > 0) {
    fortschritt = Math.round((erledigteAnzahl / gesamtAufgaben) * 100);
  }

  completedTasks.textContent = erledigteAnzahl;
  taskProgress.textContent = fortschritt + "%";
}

function wechsleAufgabenStatus(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].completed = !tasks[i].completed;
    }
  }

  speichereAufgaben();
  rendereAufgaben();
}

function loescheAufgabe(taskId) {
  let neueAufgaben = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== taskId) {
      neueAufgaben.push(tasks[i]);
    }
  }

  tasks = neueAufgaben;
  speichereAufgaben();
  rendereAufgaben();
}

function fuegeAufgabeHinzu(taskText) {
  const neueAufgabe = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(neueAufgabe);
  speichereAufgaben();
  rendereAufgaben();
}

function rendereAufgaben() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = "<li>Noch keine Aufgaben. Füge oben eine hinzu.</li>";
    aktualisiereAufgabenStatistik();
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
      </div>
      <button class="delete-btn" type="button">Löschen</button>
    `;

    const checkbox = listItem.querySelector("input");
    const deleteButton = listItem.querySelector(".delete-btn");

    checkbox.addEventListener("change", function () {
      wechsleAufgabenStatus(task.id);
    });

    deleteButton.addEventListener("click", function () {
      loescheAufgabe(task.id);
    });

    taskList.appendChild(listItem);
  }

  aktualisiereAufgabenStatistik();
}

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("light");
  speichereThema();
});

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const neuerAufgabenText = taskInput.value.trim();

  if (neuerAufgabenText === "") {
    return;
  }

  fuegeAufgabeHinzu(neuerAufgabenText);
  taskInput.value = "";
});

ladeThema();
rendereAufgaben();