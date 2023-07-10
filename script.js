/*display date */
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

/*run functions when loading */
window.onload = function () {
  //displayDate();
  //displayItems();
  loadFromLocalStorage();
  console.log(itemsArray);
};

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newtask input").value.length == 0) {
    alert("Please Enter a Task");
  } else {
    /*add the item to the local storage array */
    createItem(document.querySelector("#newtask input"));

    /* clears the tasks input*/
    document.querySelector("#newtask input").value = "";

    var tasks = document.querySelectorAll(".task");

    /*reloads the list */
    displayItems();
  }
};

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  //location.reload();
}

//loops thru the items array and creates HTML for each task
function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    const currentItem = `
    <div class="task">
    
    <span id="taskname">
      ${itemsArray[i]}
    </span>
    <input type="number" class="task-number" data-index="${i}" placeholder="0">
    <button class="delete" data-index="${i}">
      del
    </button> 
  </div>`;
    items += currentItem;
  }
  document.querySelector("#tasks").innerHTML = `<div>${items}</div>`;

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });

  //add event listeners to number inputs
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
  itemsArray[taskIndex] = `${taskNumber} ${itemsArray[taskIndex]}`;
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

function setTaskNumbers(taskNumbers) {
  const taskNumberInputs = document.querySelectorAll(".task-number");
  taskNumberInputs.forEach((input, index) => {
    input.value = taskNumbers[index];
  });
}
