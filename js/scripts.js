let pokemonRepository = (function () {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid Pokémon object:', pokemon);
        }
    }

    function loadList() {
        return fetch(apiURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                pokemonList = json.results.map(item => ({
                    name: item.name,
                    detailsUrl: item.url
                }));
            })
            .catch(error => console.error('Error loading Pokémon list:', error));
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('#itemList');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.textContent = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-block');

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    function loadDetails(pokemon) {
        return fetch(pokemon.detailsUrl)
            .then(response => response.json())
            .then(details => {
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.types = details.types.map(typeInfo => typeInfo.type.name);
            })
            .catch(error => console.error('Error loading Pokémon details:', error));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon.name, `Height: ${pokemon.height}m\nTypes: ${pokemon.types.join(', ')}`, pokemon.imageUrl);
        });
    }

    function showModal(title, text, imageUrl) {
        let modalTitle = document.querySelector('#pokemonModalLabel');
        let modalImage = document.querySelector('#pokemonImage');
        let modalDetails = document.querySelector('#pokemonDetails');

        modalTitle.innerText = title;
        modalImage.src = imageUrl;
        modalDetails.innerText = text;

        $('#pokemonModal').modal('show');
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem
    };
})();

// Load Pokémon list and display it
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Ensure modal can be closed with 'Escape' key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        $("#pokemonModal").modal("hide");
      }
    });
  
    // Focus on the modal when opened
    $('#pokemonModal').on('shown.bs.modal', function () {
      $('#pokemonModalLabel').focus();
    });
  });
