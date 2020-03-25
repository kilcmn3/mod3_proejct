let userPokemon;
let opponentPokemon;
let div = document.getElementById('teams-container');

document.addEventListener('click', (event) => {
  if (event.target.className === 'team-button') {
    choosePlayer(event.target).then(() => displayPokemonsImage());
  } else if (event.target.className === 'image') {
    div.innerHTML = '';
    chosenPokemon(event.target);
  } else if (event.target.className === 'attack') {
    battleStart(event.target);
  }
});

const displayPokemonsImage = () => {
  div.innerHTML = '';
  userTeam.pokemons.forEach((pokemon) => {
    return (div.innerHTML += `
    <ul> 
    <li><img src=${pokemon.image_url} class="image" data-id=${pokemon.id}></li>
    </ul>
    `);
  });
};

const chosenPokemon = (image) => {
  fetch(`${PokemonsURL}/${image.dataset.id}`)
    .then((response) => response.json())
    .then((pokemon) => {
      userPokemon = new Pokemon(pokemon.hp, pokemon.name, pokemon.moves);
      displayMoves(userPokemon);
      opponentPokemonChosen();
    });
};

const opponentPokemonChosen = () => {
  fetch(`${PokemonsURL}/${opponentTeam.id}`)
    .then((response) => response.json())
    .then((pokemon) => {
      opponentPokemon = new Pokemon(pokemon.hp, pokemon.name, pokemon.moves);
      displayMoves(opponentPokemon);
    });
};

const displayMoves = (team) => {
  team.moves.forEach((move) => {
    div.innerHTML += `
    <div>
    ${move.name}<li class="attack">${move.power}</li>
    </div>
  `;
  });
  div.innerHTML += '==========================';
};

const battleStart = (list) => {
  let num = parseInt(list.innerText);
  let result = opponentPokemon.attack(num);
  alert(`opponent now has ${result}`);
};
