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
  displayItems();
  console.log(itemsArray);
};

const itemsArray = localStorage.getItem("items")
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

  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

function deleteTask(event) {
  const button = event.target;
  const taskDiv = button.parentNode;
  const taskIndex = button.dataset.index;

  taskDiv.remove();
  // Remove the corresponding task from the itemsArray
  itemsArray.splice(taskIndex, 1);
}
