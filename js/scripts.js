// Array-list of Pokemons
let pokemonList = [
    {name: 'Bulbasaur', height: '0.7', types: ['grass', 'poison']},
    {name: 'Pikachu', height: '0.4', types: ['electric']},
    {name: 'Pichu', height: '0.3', types: ['electric']},
];
for (let i = 0; i < pokemonList.length; i++) {
    let pokemon = pokemonList[i];
    console.log('name:', pokemon.name);
    console.log('height:', pokemon.height);
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')' + '</p>');
    if (pokemon.height >= 0.7) {
        document.write(' - Wow, that`s big!');
    } else if (pokemon.height >= 0.4 && pokemon.height<= 0.6) {
        document.write(' - This is average.');
    } else {
        document.write(' - Wow, that`s tiny!');
    }
}
