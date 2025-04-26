const cardContainer = document.getElementById("cardContainer");
const pokemonFilter = document.getElementById("pokemonFilter");

let pokemons = [];

// Cargar múltiples pokemones por ID
async function fetchPokemons() {
  const ids = [132, 25, 1, 4, 7, 39, 94, 143, 149, 6, 150, 151, 3, 9, 65];
  const promises = ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
  pokemons = await Promise.all(promises);
  displayCards(pokemons);
  populateFilter(pokemons);
}

function displayCards(pokemonList) {
  cardContainer.innerHTML = "";
  pokemonList.forEach(pokemon => {
    const ability = pokemon.abilities[0]?.ability.name || "N/A";
    const card = document.createElement("div");
    card.className = "col-12 col-md-4";
    card.innerHTML = `
      <div class="card h-100 text-center">
        <img src="${pokemon.sprites.front_default}" class="card-img-top mx-auto" alt="${pokemon.name}" />
        <div class="card-body">
          <h5 class="card-title text-capitalize">${pokemon.name}</h5>
          <p class="card-text">Habilidad: ${ability}</p>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

function populateFilter(pokemonList) {
  pokemonList.forEach(pokemon => {
    const option = document.createElement("option");
    option.value = pokemon.name;
    option.textContent = pokemon.name;
    pokemonFilter.appendChild(option);
  });
}

pokemonFilter.addEventListener("change", () => {
  const selected = pokemonFilter.value;
  if (selected === "all") {
    displayCards(pokemons);
  } else {
    const filtered = pokemons.filter(p => p.name === selected);
    displayCards(filtered);
  }
});

// Inicializar
fetchPokemons();
