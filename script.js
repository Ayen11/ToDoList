document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newtask input").value.length == 0) {
    alert("Please Enter a Task");
  } else {
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
    document.querySelector("#newtask input").value = "";
    /* clears the tasks input*/

    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }

    var tasks = document.querySelectorAll(".task");

    for (var i = 0; i < tasks.length; i++) {
      tasks[i].onclick = function () {
        this.classList.toggle(
          "completed"
        ); /* since this applies a line-through to all texts it also does it to the del button. will be fixed once it's switched into an icon*/
      };
    }
  }
};
