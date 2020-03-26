let userPokemon;
let opponentPokemon;
let divCont = document.createElement('div');

function chosenPokemon(element) {
  fetch(`http://localhost:3000/pokemons/${element.parentElement.dataset.id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      userPokemon = new Pokemon(pokemon.hp, pokemon.name, pokemon.moves);
      // displayMoves(userPokemon);
      opponentPokemonChosen();
    });
}

function opponentPokemonChosen() {
  fetch(`http://localhost:3000/pokemons/${opponentTeam.id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (pokemon) {
      opponentPokemon = new Pokemon(pokemon.hp, pokemon.name, pokemon.moves);
    });
}

function battleStart(list) {
  divCont.innerHTML = '';

  let num = splitSting(list.innerText);
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
  divCont.innerHTML = `
  User's HP: <progress value=${usHP} max=${userPokemon.hp}></progress>
  <p>${usHP}/${userPokemon.hp}</p>
  <br>
  Opponent's HP: <progress value=${opHP} max=${opponentPokemon.hp}></progress>
  <p>${opHP}/${opponentPokemon.hp}</p>
  `;

  document.body.append(divCont);
}

//Randomly choose moves from  opponent.
function opponentAttack() {
  let attackMove =
    opponentPokemon.moves[
      Math.floor(Math.random() * opponentPokemon.moves.length)
    ];
  return attackMove.power;
}

function splitSting(str) {
  let splitWord = str.split(' ');
  let lastElement = splitWord[splitWord.length - 1];
  let result = lastElement.split('hp');
  return parseInt(result[0]);
}
