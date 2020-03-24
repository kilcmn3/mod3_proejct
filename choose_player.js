let user; // undefined;
let opponent;

//Call this function  when "click", event occurs. Please pass argumnet as "event.target". ex) choosePlayer(event.target)
const choosePlayer = (bttn) => { 
    userChoose(bttn);//set up user
    opponentChoose(bttn)//set up computer
}

const userChoose = (bttn) => {
  fetch(`${TeamsURL}/${bttn.parentNode.dataset.id}`)
  .then(response => response.json())
  .then(team => {
    userTeam(team)
  })
};

const userTeam = (team) => {
    user = new Player(team.name, team.pokemons) // check Player.js file. Now can use as user.hp => 100, user.pokemons => [poke1, poke2, poke3]
    console.log(user)
    return user
}

const opponentChoose= (bttn)=>{
    let teamNumbers = ["1","2","3","4","5","6"] // Array of team  numbers
    let number = bttn.parentNode.dataset.id
    let removeNum = teamNumbers.indexOf(number)

    teamNumbers.splice(removeNum,1) //  Subtract user's choice number ex) if user choose "1", then  splice will cut and return ["2","3","4","5","6"]

    let result = teamNumbers[Math.floor(Math.random() * teamNumbers.length)]; //returns randon array elements.
    
    fetch(`${TeamsURL}/${result}`)
    .then(response => response.json())
    .then(team => {
        opponentTeam(team)
    })
}

const opponentTeam = (team)=>{
    opponent = new Player(team.name, team.pokemons) // check Player.js file.
    console.log(opponent)
    return opponent
}

