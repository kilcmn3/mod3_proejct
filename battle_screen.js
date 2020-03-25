let userPokemon;
let opponentPokemon;
let div = document.getElementById('teams-container');
let paragraph = document.createElement('p');

document.addEventListener('click', (event) => {
  if (event.target.className === 'team-button') {
    choosePlayer(event.target).then(() => displayPokemonsImage()); // displayPokemonsImage will display all the pokemons image ,after  choosePlayer() invoke.
  } else if (event.target.className === 'image') {
    div.innerHTML = '';
    chosenPokemon(event.target); // Player choose pokemon
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
    })
    .then(() => {
      paragraph.innerHTML = `
      User's HP: <progress value=${userPokemon.hp} max=${userPokemon.hp}></progress>
      <p>${userPokemon.hp}/${userPokemon.hp}</p>
      <br>
      Opponent's HP: <progress value=${opponentPokemon.hp} max=${opponentPokemon.hp}></progress>
      <p>${opponentPokemon.hp}/${opponentPokemon.hp}</p>
      `;
      div.append(paragraph); //  Init HP bar for user & opponent
    });
};

// List of pokemons move.
const displayMoves = (team) => {
  team.moves.forEach((move) => {
    div.innerHTML += `
    <div>
    ${move.name}<li class="attack">${move.power}</li>
    </div>
  `;
  });
};

const battleStart = (list) => {
  div.append(paragraph);

  let num = parseInt(list.innerText);
  let opAttack = opponentAttack(); //Return opponent attack damage. ex) "power" => 30
  let usHP = userPokemon.minusHP(opAttack); // Minus user HP from opponent attack
  let opHP = opponentPokemon.minusHP(num); // Minus opponent HP from user attack.

  //prevent user or opponent HP to go below  0 HP.
  if (opHP < 1) {
    opHP = 0;
    alert('You Won!');
    return location.reload();
  } else if (usHP < 0) {
    usHP = 0;
    alert('You Lost!');
    return location.reload();
  }
  paragraph.innerHTML = `
  User's HP: <progress value=${usHP} max=${userPokemon.hp}></progress>
  <p>${usHP}/${userPokemon.hp}</p>
  <br>
  Opponent's HP: <progress value=${opHP} max=${opponentPokemon.hp}></progress>
  <p>${opHP}/${opponentPokemon.hp}</p>
  `;
};

//Randomly choose moves from  opponent.
const opponentAttack = () => {
  let attackMove =
    opponentPokemon.moves[
      Math.floor(Math.random() * opponentPokemon.moves.length)
    ];
  return attackMove.power;
};
