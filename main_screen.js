const divRow = document.querySelector('.row.justify-content-center');

document.addEventListener('DOMContentLoaded', function () {
  fetchTeams();
});

document.addEventListener('click', function (event) {
  if (event.target.className === 'team-button') {
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
  } else if (event.target.id === 'attack') {
    chosenPokemon(event.target).then(function () {
      console.log(`user:" ${userPokemon.name}, oppn:${opponentPokemon.name}`);

      return battleStart(event.target);
    });
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
    ulReturn = displayPokemons(team);

    const divCol = document.createElement('div');
    divCol.className = 'col-lg-4 col-md-6 p-4';
    divCol.innerHTML =
      `
    <div id="team-${team.id}" data-id="${team.id}">
    <button class="team-button" data-id="${team.id}">Team ${team.id}</button>
    ` +
      ulReturn.innerHTML +
      `</div>`;
    divRow.append(divCol);
  });
  addAvatarImage();
}

function displayPokemons(team) {
  let ul = document.createElement('ul');

  team.pokemons.forEach(function (pokemon) {
    ul.innerHTML += `
    <li>${pokemon.name}</li>
    `;
  });
  return ul;
}

function addAvatarImage() {
  for (let i = 1; i < 7; i++) {
    let divTeam = document.getElementById(`team-${i}`);
    let img = document.createElement('img');

    img.src = `image/${i}.png`;
    img.alt = 'Avatar';
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
        divRow.innerHTML += `
      <div id='selected-pokemon-container'>
      <div class="poke-card" data-id="${num}"><img src="${pokemon.image_url}" class="image" id="attack" data-id="${pokemon.id}">
      <h3>${pokemon.name}</h3>Moves:<ul id="poke-${pokeNum}-list">
          <li>${pokemon.moves[0].name} - Power: ${pokemon.moves[0].power}hp</li>
          <li>${pokemon.moves[1].name} - Power: ${pokemon.moves[1].power}hp</li>
          <li>${pokemon.moves[2].name} - Power: ${pokemon.moves[2].power}hp</li>
      </ul>
      </div>
      </div>
    `;
        // document.body.append(selectedPokemonContainer)
        num++;
        pokeNum++;
      });
  });
}
