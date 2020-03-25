let user; // undefined;
let opponent;

//Call this function  when "click", event occurs. Please pass argumnet as "event.target". ex) choosePlayer(event.target)
const choosePlayer = async (bttn) => {
  //set up a user
  await userChoose(bttn);
  await opponentChoose(bttn); //set up an opponent
  return 'Hey!';
};

const userChoose = (bttn) => {
  return fetch(`${TeamsURL}/${bttn.parentNode.dataset.id}`)
    .then((response) => response.json())
    .then((team) => {
      user = new Player(team.name, team.pokemons); // check Player.js file. Now can use as user.hp => 100, user.pokemons => [poke1, poke2, poke3]
    });
};

const opponentChoose = (bttn) => {
  let teamNumbers = ['1', '2', '3', '4', '5', '6']; // Array of team  numbers
  let number = bttn.parentNode.dataset.id;
  let removeNum = teamNumbers.indexOf(number);

  teamNumbers.splice(removeNum, 1); //  Subtract user's choice number ex) if user choose "1", then  splice will remove "1" and return ["2","3","4","5","6"]

  let result = teamNumbers[Math.floor(Math.random() * teamNumbers.length)]; //returns randon array elements.

  return fetch(`${TeamsURL}/${result}`)
    .then((response) => response.json())
    .then((team) => {
      opponent = new Player(team.name, team.pokemons); // check Player.js file.
    });
};
