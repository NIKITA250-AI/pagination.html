const userContainer = document.getElementById("user-container");
const pagination = document.getElementById("pagination");
const errorDiv = document.getElementById("error");

const USERS_PER_PAGE = 6;
let currentPage = 1;

async function fetchUsers(page = 1) {
  try {
    errorDiv.textContent = ""; // Clear errors
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${USERS_PER_PAGE}`);

    if (!response.ok) {
      throw new Error("Failed to fetch users. Status: " + response.status);
    }

    const users = await response.json();
    renderUsers(users);
    renderPagination(2); // Hardcoded because the /users endpoint only returns 10 users
  } catch (error) {
    errorDiv.textContent = error.message;
    userContainer.innerHTML = "";
  }
}

function renderUsers(users) {
  userContainer.innerHTML = "";

  users.forEach(user => {
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    userCard.innerHTML = `
      <strong>${user.name}</strong><br>
      Email: ${user.email}<br>
      Phone: ${user.phone}<br>
      Website: ${user.website}
    `;
    userContainer.appendChild(userCard);
  });
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.addEventListener("click", () => {
      currentPage = i;
      fetchUsers(currentPage);
    });
    pagination.appendChild(btn);
  }
}