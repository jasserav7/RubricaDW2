const container = document.getElementById('cardContainer');
const select = document.getElementById('pokemonSelect');

const dittoData = {
  name: "ditto",
  abilities: ["limber", "imposter"],
  images: [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/132.gif",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/132.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/132.png"
  ]
};

let allCards = [];

async function loadCards() {
  allCards = dittoData.images.map((img, i) => {
    return {
      name: dittoData.name,
      image: img,
      ability: dittoData.abilities[i % dittoData.abilities.length],
      id: `ditto-${i}`
    };
  });

  allCards.forEach((card, i) => {
    const option = document.createElement('option');
    option.value = card.id;
    option.textContent = `Variante ${i + 1}`;
    select.appendChild(option);
  });

  renderCards(allCards);
}

function renderCards(cards) {
  container.innerHTML = '';
  cards.forEach(poke => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${poke.image}" alt="${poke.name}" />
      <h2>${poke.name.toUpperCase()}</h2>
      <p>Habilidad: ${poke.ability}</p>
    `;
    container.appendChild(card);
  });
}

select.addEventListener('change', () => {
  const selected = select.value;
  if (selected === 'all') {
    renderCards(allCards);
  } else {
    const filtered = allCards.filter(p => p.id === selected);
    renderCards(filtered);
  }
});

loadCards();
