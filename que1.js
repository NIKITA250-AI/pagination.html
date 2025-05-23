const todosContainer = document.getElementById("todos");
const paginationContainer = document.getElementById("pagination");

let currentPage = 1;
const todosPerPage = 10;
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

async function fetchTodos(page) {
const response = await fetch(API_URL);
const data = await response.json();

const start = (page - 1) * todosPerPage;
const end = start + todosPerPage;
const paginatedTodos = data.slice(start, end);

renderTodos(paginatedTodos);
renderPagination(data.length);
}

function renderTodos(todos) {
todosContainer.innerHTML = "";
todos.forEach(todo => {
const todoDiv = document.createElement("div");
todoDiv.className = "todo";
todoDiv.textContent = `${todo.id}. ${todo.title}`;
todosContainer.appendChild(todoDiv);
});
}
function renderPagination(totalTodos) {
const totalPages = Math.ceil(totalTodos / todosPerPage);
paginationContainer.innerHTML = "";

for (let i = 1; i <= totalPages; i++) { const btn=document.createElement("button"); btn.textContent=i;
    btn.disabled=i===currentPage; btn.addEventListener("click", ()=> {
    currentPage = i;
    fetchTodos(currentPage);
    });
    paginationContainer.appendChild(btn);
    }
    }