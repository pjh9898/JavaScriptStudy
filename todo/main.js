let addButton = document.getElementById("addButton");
let tapUnderline = document.getElementById("tapUnderline");
let allButton = document.getElementById("AllButton");
let ongoingButton = document.getElementById("ongoingButton");
let doneButton = document.getElementById("DoneButton");
let taskInput = document.getElementById("taskInput");

let taskList = [];
let lastEvent = "";
let resultHTML = "";

addButton.addEventListener("click", addTask);
allButton.addEventListener("click", (e) => clickMenu(e, "all"));
ongoingButton.addEventListener("click", (e) => clickMenu(e, "ongoing"));
doneButton.addEventListener("click", (e) => clickMenu(e, "done"));
taskInput.addEventListener("focus", () => {
  taskInput.value = "";
});

function underline(e) {
  tapUnderline.style.left = e.currentTarget.offsetLeft + "px";
  tapUnderline.style.width = e.currentTarget.offsetWidth + "px";
  tapUnderline.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 4 + "px";
}
function render(filteredTaskList) {
  let resultHTML = "";
  for (let i = 0; i < filteredTaskList.length; i++) {
    if (filteredTaskList[i].isComplete) {
      resultHTML +=
        `<div class="taskDone">
          <span class="taskName">${filteredTaskList[i].taskContent}</span>
          <div class="flexEnd">
            <button onclick="clickCheck(${i})" class="checkButton">
              <i class="fa fa-undo-alt"></i>
            </button>
            <button onclick="clickDelete(${i})" class="deleteButton">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>`;
    } else {
      resultHTML +=
        `<div class="task">
          <span class="taskName">${filteredTaskList[i].taskContent}</span>
          <div class="flexEnd">
            <button onclick="clickCheck(${i})" class="checkButton">
              <i class="fa fa-check"></i>
            </button>
            <button onclick="clickDelete(${i})" class="deleteButton">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>`;
    }
  }
  console.log(taskList);
  document.getElementById("taskBoard").innerHTML = resultHTML;
}
function addTask() {
  let task = {
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);

  let filteredTaskList = filter(lastEvent);
  render(filteredTaskList);
}
function filter(menu) {
  let tempTaskList = taskList;
  if (menu == "all") {
    tempTaskList = taskList;
  } else if (menu == "ongoing") {
    tempTaskList = taskList.filter((x) => x.isComplete == false);
  } else if (menu == "done") {
    tempTaskList = taskList.filter((x) => x.isComplete == true);
  }
  return tempTaskList;
}
function clickMenu(e, menu) {
  let filteredTaskList = [];

  underline(e);
  filteredTaskList = filter(menu);
  render(filteredTaskList);

  lastEvent = menu;
}
function clickCheck(i) {
  taskList[i].isComplete = !taskList[i].isComplete;

  let filteredTaskList = filter(lastEvent);
  render(filteredTaskList);
}
function clickDelete(i) {
  taskList.splice(i, 1);

  let filteredTaskList = filter(lastEvent);
  render(filteredTaskList);
}
