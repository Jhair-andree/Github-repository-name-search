let inputUsername = document.getElementById("input-username");
let btnBuscar = document.getElementById("btn-buscar");
let userList = document.getElementById("user-list");

btnBuscar.addEventListener("click", function(){
  let username = inputUsername.value;
  if (username) {
    let url = `https://api.github.com/search/users?q=${username}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        userList.innerHTML = "";

        data.items.forEach(item => {
          let userUrl = item.url;
          fetch(userUrl)
            .then(response => response.json())
            .then(userData => {
              let li = document.createElement("li");
              li.className = "user-item";
              let a = document.createElement("a");
              a.href = item.html_url;
              a.target = "_blank";
              a.textContent = item.login;
              let img = document.createElement("img");
              img.src = item.avatar_url;
              img.alt = `${item.login} avatar`;
              let repos = document.createElement("p");
              repos.className = "repos";
              repos.textContent = `Public repositories: ${userData.public_repos}`;
              let bio = document.createElement("p");
              bio.textContent = userData.bio;
              bio.className = "bio"; // Agrega una clase
              bio.textContent = userData.bio;
              let location = document.createElement("p");
              location.textContent = `Location: ${userData.location}`;
    
             

              li.appendChild(img);
              li.appendChild(a);
              li.appendChild(bio);
              li.appendChild(location);
              li.appendChild(repos);
              userList.appendChild(li);

              
            })
            .catch(error => {
              console.error(error);
            });
        });
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    alert("Introduce un nombre de usuario válido");
  }
});
