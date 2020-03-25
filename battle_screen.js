document.addEventListener('click', (event) => {
  if (event.target.className === 'team-button') {
    choosePlayer(event.target).then(() => displayPokemonsImage());
  } else if (event.target.className === 'image') {
    console.log('You image!');
  }
});

const displayPokemonsImage = () => {
  document.body.innerHTML = '';
  user.pokemons.forEach((pokemon) => {
    return (document.body.innerHTML += `
    <ul> 
    <li><img src=${pokemon.image_url} class="image" data-id=${pokemon.id}></li>
    </ul>
    `);
  });
};
