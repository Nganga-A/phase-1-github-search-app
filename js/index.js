document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchInput = document.getElementById('search');
    const username = searchInput.value.trim();

    if (username === '') {
      alert('Please enter a GitHub username');
      return; // Added return statement to exit the function if username is empty
    }

    const accessToken = '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';

    fetch(`https://api.github.com/search/users?q=${username}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const users = data.items;
        displayUsers(users);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const repos = data;
        displayRepo(repos);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  function displayUsers(users) {
    const resultsUl = document.getElementById("user-list");
    resultsUl.innerHTML = "";

    users.forEach(user => {
      const resultsli = document.createElement('li');
      resultsli.innerHTML = `
        <div> 
          <p> ${user.login} </p> <!-- Changed username to user.login -->
          <img src="${user.avatar_url}" style="width:50px; height:50px;"> <!-- Fixed style syntax -->
          <a href="https://github.com/${user.login}" target="_blank">Github Account</a> <!-- Added target="_blank" attribute -->
        </div>
      `;
      resultsUl.appendChild(resultsli);
    });
  }

  function displayRepo(repos) {
    const repoUl = document.getElementById('repos-list');
    repoUl.innerHTML = "";

    repos.forEach(repo => {
      const repoLi = document.createElement('li');
      repoLi.textContent = repo.name; // Changed innerHTML to textContent for security
      repoUl.appendChild(repoLi);
    });
  }
});
