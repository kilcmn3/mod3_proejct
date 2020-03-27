const divRow = document.querySelector('.row.justify-content-center');

document.addEventListener('DOMContentLoaded', function () {
  fetchTeams();
});

document.addEventListener('click', function (event) {
  if (event.target.id === 'team-button') {
    document.getElementById('h1').innerText = 'CHOOSE A POKEMON';

    choosePlayer(event.target)
      .then(function () {
        fetchingPokemons();
      }) // Creating userPoke, oppPoke
      .then(function () {
        const opponentContainer = document.createElement('div');
        opponentContainer.id = 'opponent-pokemon-container';

        document.body.appendChild(opponentContainer);
        // user choose pokemon, and create Pokemon class instance.
      });
  } else if (event.target.id === 'image') {
    chosenPokemon(event.target).then(function () {
      console.log(`user:" ${userPokemon.name}, oppn:${opponentPokemon.name}`);
    });
  } else if (event.target.className === 'attack') {
    battleStart(event.target);
  }
});

//set background image when  render
//create a new  div "team-container", and displays teams  with innerHTML.
//display all the teams

function fetchTeams() {
  fetch('http://localhost:3000/teams')
    .then(function (response) {
      return response.json();
    })
    .then(function (teams) {
      displayTeams(teams);
    });
}

function displayTeams(teams) {
  let ulReturn;

  teams.forEach(function (team) {
    pReturn = displayPokemons(team);

    const divCol = document.createElement('div');
    divCol.className = 'col-lg-4 col-md-6 p-4';
    divCol.innerHTML =
      `
    <div id="team-${team.id}" data-id="${team.id}">
    <a href="#" class="btn btn-primary" id="team-button" data-id=${team.id}><span class="glyphicon glyphicon-user"></span> Team ${team.id}</a>
    <div class="w-50 p-3">
    <ul class="list-group">
    ` +
      pReturn.innerHTML +
      `</ul>
      </div>
      </div>`;
    divRow.append(divCol);
  });

  addAvatarImage();
}

function displayPokemons(team) {
  let p = document.createElement('p');

  team.pokemons.forEach(function (pokemon) {
    p.innerHTML += `
    <li class="list-group-item">${pokemon.name}</li>
    `;
  });
  return p;
}

function addAvatarImage() {
  for (let i = 1; i < 7; i++) {
    let divTeam = document.getElementById(`team-${i}`);
    let img = document.createElement('img');

    img.src = `image/${i}.png`;
    img.alt = 'Responsive image';

    img.className = 'avatar avatar-32 img-circle';
    divTeam.prepend(img);
  }
}

async function fetchingPokemons() {
  let num = 0;
  let pokeNum = 1;

  divRow.innerHTML = '';
  userTeam.pokemons.forEach(function (pokemon) {
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemon) {
        const divCol = document.createElement('div');
        divCol.className = 'col-lg-4 col-md-6 p-4';

        divCol.innerHTML += `
      <div class="poke-card" data-id="${num}">
      <div class="col-md-5">
      <img src="${pokemon.image_url}" class="img-thumbnail" id="image" data-id="${pokemon.id}">
      <h3 class="text-left">${pokemon.name}</h3>
      <ul class="list-group" id="poke-${pokeNum}-list">
      </div>
      <div class="w-75 p-3">
      <p class="text-left">Moves:</p>
          <li class="list-group-item">${pokemon.moves[0].name} - Power: ${pokemon.moves[0].power}hp</li>
          <li class="list-group-item">${pokemon.moves[1].name} - Power: ${pokemon.moves[1].power}hp</li>
          <li class="list-group-item">${pokemon.moves[2].name} - Power: ${pokemon.moves[2].power}hp</li>
          </div>
      </ul>
      </div>
    `;
        // document.body.append(selectedPokemonContainer)
        num++;
        pokeNum++;
        divRow.append(divCol);
      });
  });
}
