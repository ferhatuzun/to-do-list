let taskList = [];

let toDoAddBtn = document.querySelector(".toDoAdd");

let toDoİnputValue = document.querySelector(".toDoİnput");
let toDoList = document.querySelector(".toDoList");
let filterMenu = document.querySelector(".filterMenu");
let allTask = document.querySelector(".allTask");
let complatedTask = document.querySelector(".complatedTask");
let notComplatedTask = document.querySelector(".notComplatedTask");
let toDoListMenu = [];
let dropDownMenu = document.getElementsByClassName("dropDownMenu");
let toDoListCheckBox = [];
let toDoDeleteButton = [];
let toDoUpdateContent = [];
let selectedTask = document.querySelector(".selectedFilter");
let deleteAllTask = document.querySelector(".deleteAllTask");
function addTask() {
  let toDoListİtem = document.querySelectorAll(".toDoListİtem");
  if (toDoİnputValue.value != "") {
    let newTaskTemplate = `<input type="checkbox" name="" id="${
      taskList.length + 1
    }" class="toDoListCheckBox" onclick="filter()"><li class="toDoListİtem">${
      toDoİnputValue.value
    }</li><div class="dropDownContainer">
    <a href="" class="toDoListMenu" id="${taskList.length + 1}">
      <i class="fa-solid fa-square-caret-down"></i>
    </a>
    <div class="dropDownMenu">
      <ul class="dropDownList">
        <li class="dropDownİtem">
          <a href="" id="${
            taskList.length + 1
          }" class="deleteButton"><i class="fa-solid fa-trash"></i>Sil</a>
        </li>
        <li class="dropDownİtem">
          <a href="" id="${
            taskList.length + 1
          }" class="updateContent"><i class="fa-solid fa-pencil"></i>Guncelle</a>
        </li>
      </ul>
    </div>
  </div>`;

    toDoList.insertAdjacentHTML("beforeend", newTaskTemplate);
    taskList.push({
      id: taskList.length + 1,
      gorev: toDoİnputValue.value,
      status: "notComplated",
    });
    localStorage.setItem("gorevler", JSON.stringify(taskList));
    toDoİnputValue.value = "";
  } else {
    alert("Lütfen bir görev giriniz.");
  }
}
function loadTask(filter) {
  toDoList.innerHTML = "";
  let control = localStorage.getItem("gorevler");
  if (control != null) {
    taskList = JSON.parse(localStorage.getItem("gorevler"));
    for (let index in taskList) {
      if (filter == taskList[index].status || filter == "all") {
        let newTaskTemplate = `<input type="checkbox" name="" id="${taskList[index].id}" class="toDoListCheckBox""><li class="toDoListİtem">${taskList[index].gorev}</li><div class="dropDownContainer">
        <a href="" class="toDoListMenu" id="${taskList[index].id}">
          <i class="fa-solid fa-square-caret-down"></i>
        </a>
        <div class="dropDownMenu">
          <ul class="dropDownList">
            <li class="dropDownİtem">
              <a href="" id="${taskList[index].id}" class="deleteButton"><i class="fa-solid fa-trash"></i>Sil</a>
            </li>
            <li class="dropDownİtem">
              <a href="" id="${taskList[index].id}" class="updateContent"><i class="fa-solid fa-pencil"></i>Guncelle</a>
            </li>
          </ul>
        </div>
      </div>`;
        toDoList.insertAdjacentHTML("beforeend", newTaskTemplate);
      }

      toDoListCheckBox = document.querySelectorAll(".toDoListCheckBox");
    }
    for (let index in taskList) {
      if (taskList[index].status == "complated") {
        for (let checkbox of toDoListCheckBox) {
          if (checkbox.getAttribute("id") == taskList[index].id) {
            checkbox.checked = true;
            checkbox.nextElementSibling.classList.add("complated");
          }
        }
      }
    }
    
  }
  updateStatus();
  showMenu();
  deleteTask();
  updateTaskContent();
}
loadTask("all");
toDoAddBtn.addEventListener("click", function (event) {
  event.preventDefault();
  selectedTask = document.querySelector(".selectedFilter");
  addTask();
  loadTask(selectedTask.getAttribute("id"))
  nullCheck();
});

toDoİnputValue.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    selectedTask = document.querySelector(".selectedFilter");
    addTask();
    loadTask(selectedTask.getAttribute("id"))
    nullCheck();
  }
});

deleteAllTask.addEventListener("click",function(e){
  e.preventDefault();
  taskList = [];
  localStorage.setItem("gorevler", JSON.stringify(taskList))
  loadTask("all")
})

function showMenu() {
  toDoListMenu = document.querySelectorAll(".toDoListMenu");
  for (let element of toDoListMenu) {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      let targetElement = e.target;
      let dropDownMenu = targetElement.parentElement.nextElementSibling;
      dropDownMenu.classList.toggle("active");
    });
  }
}

function updateStatus() {
  for (let checkbox of toDoListCheckBox) {
    checkbox.addEventListener("click", function (e) {
      for (let index in taskList) {
        if (taskList[index].id == checkbox.getAttribute("id")) {
          if (checkbox.checked) {
            taskList[index].status = "complated";
            localStorage.setItem("gorevler", JSON.stringify(taskList));
            checkbox.nextElementSibling.classList.add("complated");
            if (selectedTask.getAttribute("id") != "all") {
              loadTask("notComplated");
            }
          } else {
            taskList[index].status = "notComplated";
            localStorage.setItem("gorevler", JSON.stringify(taskList));
            checkbox.nextElementSibling.classList.remove("complated");
            if (selectedTask.getAttribute("id") !== "all") {
              loadTask("complated");
            }
          }
        }
      }
    });
  }
}
//updateStatus();

function deleteTask() {
  toDoDeleteButton = document.querySelectorAll(".deleteButton");
  for (let button of toDoDeleteButton) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      for (let index in taskList) {
        if (e.target.getAttribute("id") == taskList[index].id) {
          taskList.splice(index, 1);
          localStorage.setItem("gorevler", JSON.stringify(taskList));
          // location.reload()
          toDoList.innerHTML = "";

          selectedTask = document.querySelector(".selectedFilter");

          loadTask(selectedTask.getAttribute("id"));
        }
      }
    });
  }
  nullCheck();
}

function updateTaskContent() {
  toDoUpdateContent = document.querySelectorAll(".updateContent");
  for (let button of toDoUpdateContent) {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      for (let index in taskList) {
        if (e.target.getAttribute("id") == taskList[index].id) {
          if (toDoİnputValue.value != "") {
            taskList[index].gorev = toDoİnputValue.value;

            localStorage.setItem("gorevler", JSON.stringify(taskList));
            if (taskList[index].status == "complated") {
              loadTask("complated");
            } else if (taskList[index].status == "not complated") {
              loadTask("not complated");
            } else {
              loadTask("all");
            }
            toDoİnputValue.value = "";
          } else {
            alert("Lütfen bir bilgi giriniz.");
          }
        }
      }
    });
  }
}

function filter() {
  filterMenu.addEventListener("click", function (e) {
    e.preventDefault();
    e.target.classList.add;

    if (e.target.getAttribute("id") == "all") {
      loadTask("all");
      document
        .querySelector(".selectedFilter")
        .classList.remove("selectedFilter");
      e.target.classList.add("selectedFilter");

      selectedTask = document.querySelector(".selectedFilter");
    } else if (e.target.getAttribute("id") == "complated") {
      loadTask("complated");
      document
        .querySelector(".selectedFilter")
        .classList.remove("selectedFilter");
      e.target.classList.add("selectedFilter");

      selectedTask = document.querySelector(".selectedFilter");
    } else if (e.target.getAttribute("id") == "notComplated") {
      loadTask("notComplated");
      document
        .querySelector(".selectedFilter")
        .classList.remove("selectedFilter");
      e.target.classList.add("selectedFilter");

      selectedTask = document.querySelector(".selectedFilter");
    }
  });
}
filter();


function nullCheck(){
  let control = localStorage.getItem("gorevler");
  toDoListCheckBox = document.querySelectorAll(".toDoListCheckBox");
  if(control==null || toDoListCheckBox.length==0){
    document.querySelector(".null").style.display="block"
  }else{
    document.querySelector(".null").style.display="none"
  }
  console.log(control)
}
nullCheck()