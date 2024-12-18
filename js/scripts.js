// Array-list of Pokemons
let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
    { name: 'Pikachu', height: 0.4, types: ['electric'] },
    { name: 'Pichu', height: 0.3, types: ['electric'] },
];

pokemonList.forEach(pokemon => {
    console.log('name:', pokemon.name);
    console.log('height:', pokemon.height);

    let message = '';
    if (pokemon.height >= 0.7) {
        message = ' - Wow, that\'s big!';
    } else if (pokemon.height >= 0.4 && pokemon.height <= 0.6) {
        message = ' - This is average.';
    } else {
        message = ' - Wow, that\'s tiny!';
    }

    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + message + '</p>');
});

