let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison'] },
        { name: 'Pikachu', height: 0.4, types: ['electric'] },
        { name: 'Pichu', height: 0.3, types: ['electric'] },
    ];

    // Function to return all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Function to add a Pokémon to the list
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListItem(pokemon) {
        // Select the <ul> element from the DOM
        let pokemonListElement = document.querySelector('.pokemon-list');

        // Create a new <li> element
        let listItem = document.createElement('li');

        // Create a new button element
        let button = document.createElement('button');
        button.innerText = pokemon.name; // Use the parameter `pokemon` here
        button.classList.add('pokemon-button'); // Add a class for styling
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        
        // Append the button to the list item
        listItem.appendChild(button);

        // Append the list item to the <ul>
        pokemonListElement.appendChild(listItem);
    }

    function showDetails(pokemon) {
        console.log(pokemon.name)
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem, // Add addListItem to the returned object
    };
})();

// Use getAll() to iterate over the Pokémon in the repository
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon); // Call addListItem and pass each Pokémon object
});





   