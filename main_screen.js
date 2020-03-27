//Exectute function.
turnON();

function turnON() {
  document.addEventListener('DOMContentLoaded', function () {
    fetchTeams();
    battleRender();
  });
}

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
  const divRow = document.querySelector('.row.justify-content-center');
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

function battleRender() {
  document.addEventListener('click', function (event) {
    if (event.target.className === 'team-button') {
      choosePlayer(event.target); // Creating userPoke, oppPoke

      fetch(`http://localhost:3000/teams/${event.target.dataset.id}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          const teamsContainer = document.getElementById('teams-container');
          teamsContainer.innerHTML = ``;
          // const selectedPokemonContainer = document.createElement('div');
          // selectedPokemonContainer.id = 'selected-pokemon-container';

          document.body.innerHTML = `<h1>CHOOSE A POKEMON</h1>`;
          debugger;
          let num = 0;
          let pokeNum = 1;
          json.pokemons.forEach(function (pokemon) {
            document.body.innerHTML += `
              <div id='selected-pokemon-container'>
             
              <div class="poke-card" data-id="${num}"><img src="${pokemon.image_url}" class="image" data-id="${pokemon.id}">
              <h3>${pokemon.name}</h3>Moves:<ul id="poke-${pokeNum}-list">
              <li>${pokemon.moves[0]}</li><li>${pokemon.moves[1]}</li><li>${pokemon.moves[2]}</li>
              </ul>
              </div>
              </div>
            `;
            // document.body.append(selectedPokemonContainer)
            num++;
            pokeNum++;
          });

          const opponentContainer = document.createElement('div');
          opponentContainer.id = 'opponent-pokemon-container';

          document.body.appendChild(opponentContainer);
          //after created userPok
          document.addEventListener('click', function (event) {
            if (event.target.className === 'image') {
              const userContainer = document.createElement('div');
              userContainer.id = 'user-container';
              userContainer.dataset.id =
                json.pokemons[event.target.parentNode.dataset.id].id;
              console.log(userContainer.dataset.id);
              userContainer.innerHTML = `
          <img src="${
            json.pokemons[event.target.parentNode.dataset.id].image_url
          }" class="user-image"><h3>${
                json.pokemons[event.target.parentNode.dataset.id].name
              }</h3>Moves:<ul id="user-moves-list"></ul>
          `;
              document.body.appendChild(userContainer);
              const userMovesList = document.getElementById('user-moves-list');
              json.moves.forEach((move) => {
                if (move.pokemon_id === parseInt(userContainer.dataset.id)) {
                  const newLi = document.createElement('button');
                  newLi.className = 'attack';
                  newLi.innerText = `${move.name} - Power: ${move.power}hp`;
                  userMovesList.appendChild(newLi);
                }
              });
              selectedPokemonContainer.innerHTML = ``;

              chosenPokemon(event.target);
              console.log(event.target.dataset.id); // user choose pokemon, and create Pokemon class instance.
            } else if (event.target.className === 'attack') {
              console.log(
                `user:" ${userPokemon.name}, oppn:${opponentPokemon.name}`,
              );

              battleStart(event.target);
            }
          });
        });
    }
  });
}
