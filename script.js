/*display date UNUSED*/
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

/*run functions when loading */
window.onload = function () {
  loadFromLocalStorage();
  console.log(itemsArray);
};

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#push").onclick = function () {
  const input = document.querySelector("#newTaskInput").value;
  const tasks = input
    .split("\n")
    .map((item) => item.trim())
    .filter((item) => item !== "");

  if (tasks.length === 0) {
    alert("please enter a task.");
    return;
  }

  tasks.forEach((task) => {
    const [taskName, taskMaxNumber] = task.split(" ");
    createItem(taskName, parseInt(taskMaxNumber, 10));
  });

  document.querySelector("#newTaskInput").value = "";
  displayItems();
};

function createItem(taskName, taskMaxNumber) {
  const newItem = {
    taskName: taskName,
    taskNumber: 0,
    taskMaxNumber: taskMaxNumber,
  };
  itemsArray.push(newItem);
  saveToLocalStorage();
}

//loops thru the items array and creates HTML for each task
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    const currentItem = `
    <div class="task">
        <button class="delete" data-index="${i}">
          del
        </button>
        <span class="task-name">
          ${itemsArray[i].taskName}
        </span>
        <span class="task-number">
          ${itemsArray[i].taskNumber}
        </span>
        ${itemsArray[i].taskMaxNumber}
      </div>`;
    items += currentItem;
  }
  document.querySelector("#tasks").innerHTML = `<div>${items}</div>`;

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });

  // Add event listeners to number inputs
  const taskNumberInputs = document.querySelectorAll(".task-number");
  taskNumberInputs.forEach((input) => {
    input.addEventListener("input", updateTaskNumber);
  });

  saveToLocalStorage();
}

function saveToLocalStorage() {
  const tasksData = {
    tasks: itemsArray,
    numbers: getTaskNumbers(),
  };
  localStorage.setItem("tasksData", JSON.stringify(tasksData));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem("tasksData");
  if (savedData) {
    const tasksData = JSON.parse(savedData);
    itemsArray = tasksData.tasks;
    displayItems();
    setTaskNumbers(tasksData.numbers);
  }
}

function updateTaskNumber(event) {
  const input = event.target;
  const taskIndex = input.dataset.index;
  const taskNumber = input.value;
  itemsArray[taskIndex].taskNumber = taskNumber;
  saveToLocalStorage();
}

function deleteTask(event) {
  const button = event.target;
  const taskDiv = button.parentNode;
  const taskIndex = button.dataset.index;
  taskDiv.remove();
  // Remove the corresponding task from the itemsArray
  itemsArray.splice(taskIndex, 1);
  saveToLocalStorage();
}

function getTaskNumbers() {
  const taskNumberInputs = document.querySelectorAll(".task-number");
  const taskNumbers = Array.from(taskNumberInputs).map((input) =>
    input.value.trim()
  );
  return taskNumbers;
}

function setTaskNumbers() {
  const taskNumberInputs = document.querySelectorAll(".task-number");
  taskNumberInputs.forEach((input, index) => {
    itemsArray[index].taskNumber = input.value;
  });
}

function exportTasks() {
  let textOutput = "";

  for (let i = 0; i < itemsArray.length; i++) {
    const taskName = itemsArray[i].taskName;
    const taskNumber =
      itemsArray[i].taskNumber !== "" ? itemsArray[i].taskNumber : 0;
    // Append task name and number to the text output
    textOutput += `${taskName} ${taskNumber}\n`;
  }
  navigator.clipboard.writeText(textOutput);
  console.log(textOutput);
}

document.querySelector("#export").onclick = function () {
  exportTasks();
};
