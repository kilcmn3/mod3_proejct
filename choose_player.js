let userTeam; // undefined;
let opponentTeam;

//Call this function  when "click", event occurs.
async function choosePlayer(bttn) {
  //set up a user
  await userChoose(bttn);
  await opponentChoose(bttn); //set up an opponent
  console.log('User Team', userTeam);
  console.log('Opponent Team', opponentTeam);
}

function userChoose(bttn) {
  return fetch(`http://localhost:3000/teams/${bttn.parentNode.dataset.id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (team) {
      userTeam = new Player(team.name, team.pokemons); // check Player.js file. Now can use as user.hp => 100, user.pokemons => [poke1, poke2, poke3]
    });
}

function opponentChoose(bttn) {
  let teamNumbers = ['1', '2', '3', '4', '5', '6']; // Array of team  numbers
  let number = bttn.parentNode.dataset.id;
  let removeNum = teamNumbers.indexOf(number);

  teamNumbers.splice(removeNum, 1); //  Subtract user's choice number ex) if user choose "1", then  splice will remove "1" and return ["2","3","4","5","6"]

  let result = teamNumbers[Math.floor(Math.random() * teamNumbers.length)]; //returns randon array elements.

  return fetch(`http://localhost:3000/teams/${result}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (team) {
      opponentTeam = new Player(team.name, team.pokemons); // check Player.js file.
      opponentTeam.id = team.id;
    });
}
