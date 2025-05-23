const userList = document.getElementById('user-list');
const sortSelect = document.getElementById('sort');
const errorDiv = document.getElementById('error');

let usersData = [];

async function fetchUsers() {
  try {
    errorDiv.textContent = '';
    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);

    usersData = await res.json();
    renderUsers(usersData);
  } catch (error) {
    errorDiv.textContent = error.message;
    userList.innerHTML = '';
  }
}

function renderUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
    userList.appendChild(card);
  });
}

function sortUsersBy(criteria) {
  const sortedUsers = [...usersData].sort((a, b) =>
    a[criteria].localeCompare(b[criteria])
  );
  renderUsers(sortedUsers);
}

sortSelect.addEventListener('change', () => {
  sortUsersBy(sortSelect.value);
});

fetchUsers();