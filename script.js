/*display date */
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
  console.log(itemsArray);
};

const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newtask input").value.length == 0) {
    alert("Please Enter a Task");
  } else {
    /*add the task html to the page */
    document.querySelector("#tasks").innerHTML += `
        <div class="task"
        <span id="taskname">
            ${document.querySelector("#newtask input").value}
        </span>
        <button class="delete">
        del <!--add icon here-->
        </button> 
        </div>
    `;
    /*add the item to the local storage array */
    createItem(document.querySelector("#newtask input"));

    /* clears the tasks input*/
    document.querySelector("#newtask input").value = "";

    /*deletes task */
    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }

    var tasks = document.querySelectorAll(".task");

    /*marks as done */
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].onclick = function () {
        this.classList.toggle(
          "completed"
        ); /* since this applies a line-through to all texts it also does it to the del button. will be fixed once it's switched into an icon*/
      };
    }
  }
};

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
}
