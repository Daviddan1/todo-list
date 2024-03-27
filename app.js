// select submit button
const submitBtnEl = document.querySelector(".button");
const ul = document.querySelector("ul");
const errorEl = document.querySelector(".error");

// add event listener to the button
submitBtnEl.addEventListener("click", addTodoHandler);
ul.addEventListener("click", removeTodo);

// todo array
const todos = [];
initialize();

// function that is executed upon listened event
function addTodoHandler(event) {
  event.preventDefault();

  const todoEl = document.getElementById("todo_name");
  const todoName = todoEl.value;

  const todoDate = document.getElementById("todo_date").value;

  if (todoName === "") {
    errorEl.classList.add("active");
    return;
  } else {
    errorEl.classList.remove("active");
  }


  const todo = {
    id: Date.now(),
    name: todoName,
    date: todoDate,
  };

  todos.push(todo);

  buildTodoHandler(todo);
  initialize();



}


function buildTodoHandler(todo) {
  const addedTodoEl = `
  <p>${todo.name}  ${todo.date}</p>
  <span>x</span>
  `;

  const li = document.createElement("li");
  li.id = todo.id;
  li.innerHTML = addedTodoEl;

  ul.appendChild(li);

  
}






function initialize() {
  if (todos.length === 0) {
    const noEl = `<p id='empty'>No todos found</p>`;
    ul.innerHTML = noEl;
  } else if (todos.length === 1) {
    ul.querySelector("#empty").remove();
  }
}

function removeTodo(event) {
  const target = event.target;
  if (target.tagName !== "SPAN") {
    return;
  }

  const todoId = parseInt(target.parentElement.id);

  //  removes the parent element from the dom
  target.parentElement.remove();

  //   checks if element is in array and returns the index
  const idInTodos = todos.findIndex(function (el) {
    return el.id === todoId;
  });

  //   uses the index to remove the element if it's in the array
  todos.splice(idInTodos, 1);
  initialize();
}


