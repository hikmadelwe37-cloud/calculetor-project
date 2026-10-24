// 1. Array to store all tasks
let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  // Validation: Don't add empty items
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // 2. Add the new text to the tasks array
  tasks.push(taskText);

  // Clear the input box for the next entry
  taskInput.value = "";

  // 3. Update the visual list on the screen
  renderTasks();
}

function deleteTask(index) {
  // Remove the item from the array using its position (index)
  tasks.splice(index, 1);

  // Refresh the visual list
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the current HTML list

  // Loop through the array and build list items dynamically
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;

    taskList.appendChild(li);
  });
}
