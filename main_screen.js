//Exectute function.
turnON();

function turnON() {
  document.addEventListener('DOMContentLoaded', function () {
    displayTeams();
    fetch('http://localhost:3000/pokemons')
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemons) {
        console.log(pokemons);
      });
  });
}

//set background image when  render
//create a new  div "team-container", and displays teams  with innerHTML.
//display all the teams
function displayTeams() {
  document.body.style.backgroundImage = "url('main2.jpg')";

  let div = document.createElement('div');
  div.className = 'team-container';

  div.innerHTML += `
    <div class="div1">
        <ul>    
        Temas  will display here
        <li data-id="$team.id">Team 1</li>
        <li data-id="$team.id">Team 2</li>
        <li data-id="$team.id">Team 3</li>
        <li data-id="$team.id">Team 4</li>
        <li data-id="$team.id">Team 5</li>
        <li data-id="$team.id">Team 6</li>
        </ul>
    </div>
    `;
  document.body.append(div);
}
