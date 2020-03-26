//Exectute function.
turnON();

function turnON() {
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.backgroundImage = "url('main2.jpg')";
    fetchTeams();
    battleRender();
    addAvatarImage();
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
      choosePlayer(event.target); // Creating userPoke, oppPoke

      fetch(`http://localhost:3000/teams/${event.target.dataset.id}`)
        .then((response) => response.json())
        .then(function (json) {
          const teamsContainer = document.getElementById('teams-container');
          teamsContainer.innerHTML = ``;
          const selectedPokemonContainer = document.createElement('div');
          selectedPokemonContainer.id = 'selected-pokemon-container';

          selectedPokemonContainer.innerHTML = `
      <h1>CHOOSE A POKEMON</h1>
      <div class="poke-card" data-id="1"><img src="${json.pokemons[0].image_url}" class="image"><h3>${json.pokemons[0].name}</h3>Moves:<ul id="poke-1-list"></ul></div>
      <div class="poke-card" data-id="2"><img src="${json.pokemons[1].image_url}" class="image"><h3>${json.pokemons[1].name}</h3>Moves:<ul id="poke-2-list"></ul></div>
      <div class="poke-card" data-id="3"><img src="${json.pokemons[2].image_url}" class="image"><h3>${json.pokemons[2].name}</h3>Moves:<ul id="poke-3-list"></ul></div>
      <div class="poke-card" data-id="4"><img src="${json.pokemons[3].image_url}" class="image"><h3>${json.pokemons[3].name}</h3>Moves:<ul id="poke-4-list"></ul></div>
      <div class="poke-card" data-id="5"><img src="${json.pokemons[4].image_url}" class="image"><h3>${json.pokemons[4].name}</h3>Moves:<ul id="poke-5-list"></ul></div>
      <div class="poke-card" data-id="6"><img src="${json.pokemons[5].image_url}" class="image"><h3>${json.pokemons[5].name}</h3>Moves:<ul id="poke-6-list"></ul></div>
      `;
          document.body.appendChild(selectedPokemonContainer);

          const team1List = document.getElementById('poke-1-list');
          const team2List = document.getElementById('poke-2-list');
          const team3List = document.getElementById('poke-3-list');
          const team4List = document.getElementById('poke-4-list');
          const team5List = document.getElementById('poke-5-list');
          const team6List = document.getElementById('poke-6-list');

          json.moves.forEach((move) => {
            if (move.pokemon_id === json.pokemons[0].id) {
              const li = document.createElement('li');
              li.innerText = `${move.name} - Power: ${move.power}hp`;
              team1List.appendChild(li);
            } else if (move.pokemon_id === json.pokemons[1].id) {
              const li = document.createElement('li');
              li.innerText = `${move.name} - Power: ${move.power}hp`;
              team2List.appendChild(li);
            } else if (move.pokemon_id === json.pokemons[2].id) {
              const li = document.createElement('li');
              li.innerText = `${move.name} - Power: ${move.power}hp`;
              team3List.appendChild(li);
            } else if (move.pokemon_id === json.pokemons[3].id) {
              const li = document.createElement('li');
              li.innerText = `${move.name} - Power: ${move.power}hp`;
              team4List.appendChild(li);
            } else if (move.pokemon_id === json.pokemons[4].id) {
              const li = document.createElement('li');
              li.innerText = `${move.name} - Power: ${move.power}hp`;
              team5List.appendChild(li);
            } else {
              const li = document.createElement('li');
              li.innerText = `${move.name} - Power: ${move.power}hp`;
              team6List.appendChild(li);
            }
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

              chosenPokemon(event.target); // user choose pokemon, and create Pokemon class instance.
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

function addAvatarImage() {
  for (let i = 1; i < 7; i++) {
    let divTeam = document.getElementById(`team-${i}`);
    let img = document.createElement('img');

    img.src = `image/${i}.png`;
    img.alt = 'Avatar';
    img.className = 'avatar';
    divTeam.prepend(img);
  }
}
