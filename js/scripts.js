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
            .then(response => response.json())
            .then(json => {
                json.results.forEach(item => {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(e => console.error(e));
    }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

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
            .catch(e => console.error(e));
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon.name, `Height: ${pokemon.height}m\nTypes: ${pokemon.types.join(', ')}`, pokemon.imageUrl);
        });
    }

    function showModal(title, text, imageUrl) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = ''; // Clear previous content

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.alt = title;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    document.querySelector('#modal-container').addEventListener('click', function (event) {
        if (event.target === document.querySelector('#modal-container')) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        addListItem: addListItem,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
