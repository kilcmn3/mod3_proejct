//Exectute function.
turnON();

function turnON() {
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.backgroundImage = "url('main2.jpg')";
    fetchTeams();
    battleRender();

    fetch('http://localhost:3000/pokemons')
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemons) {
        console.log(pokemons);
      });
  });
}

//set background image when  render
//create a new  div "team-container", and displays teams  with innerHTML.
//display all the teams

function fetchTeams() {
  fetch('http://localhost:3000/teams')
    .then((response) => response.json())
    .then((json) => displayTeams(json));
}

function displayTeams(teams) {
  const team1List = document.getElementById('team-1-list');
  const team2List = document.getElementById('team-2-list');
  const team3List = document.getElementById('team-3-list');
  const team4List = document.getElementById('team-4-list');
  const team5List = document.getElementById('team-5-list');
  const team6List = document.getElementById('team-6-list');

  teams[0].pokemons.forEach((pokemon) => {
    const li = document.createElement('li');
    li.innerText = pokemon.name;
    team1List.appendChild(li);
  });

  teams[1].pokemons.forEach((pokemon) => {
    const li = document.createElement('li');
    li.innerText = pokemon.name;
    team2List.appendChild(li);
  });

  teams[2].pokemons.forEach((pokemon) => {
    const li = document.createElement('li');
    li.innerText = pokemon.name;
    team3List.appendChild(li);
  });

  teams[3].pokemons.forEach((pokemon) => {
    const li = document.createElement('li');
    li.innerText = pokemon.name;
    team4List.appendChild(li);
  });

  teams[4].pokemons.forEach((pokemon) => {
    const li = document.createElement('li');
    li.innerText = pokemon.name;
    team5List.appendChild(li);
  });

  teams[5].pokemons.forEach((pokemon) => {
    const li = document.createElement('li');
    li.innerText = pokemon.name;
    team6List.appendChild(li);
  });
}

function battleRender() {
  document.addEventListener('click', function (event) {
    if (event.target.className === 'team-button') {
      const teamsContainer = document.getElementById('teams-container');
      teamsContainer.innerHTML = ``;
    }
  });
}
