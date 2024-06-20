
const urlFullList = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const imgContainer = document.getElementById("img-container");

const typeColors = {
    "normal": "#A8A878",
    "fire": "#F08030",
    "water": "#6890F0",
    "electric": "#F8D030",
    "grass": "#78C850",
    "ice": "#98D8D8",
    "fighting": "#C03028",
    "poison": "#A040A0",
    "ground": "#E0C068",
    "flying": "#A890F0",
    "psychic": "#F85888",
    "bug": "#A8B820",
    "rock": "#B8A038",
    "ghost": "#705898",
    "dragon": "#7038F8",
    "dark": "#705848",
    "steel": "#B8B8D0",
    "fairy": "#F0B6BC",
}

searchButton.addEventListener("click", () => {
    if (!searchInput.value) {
        alert("Please enter a Pokémon name or id");
        return;
    }
    retrievePokemon();
})

searchInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter" ) {
        if (!searchInput.value) {
            alert("Please enter a Pokémon name or id");
            return;
        } else {
            retrievePokemon();
        }
    }
})

const fetchData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

const retrievePokemon = async () => {
    try { 
        const data = await fetchData(urlFullList);
        let pokemon = "";
        const searchInputValue = searchInput.value.trim();
        if ( isFinite(searchInputValue) ) {
            pokemon = data.results.find( (obj) => obj.id === Number(searchInputValue) );
        } else {
            pokemon = data.results.find( (obj) => obj.name === searchInputValue.toLowerCase() );
        }
        if (!pokemon) {
            alert("Pokémon not found");
            return;
        }
        const urlPokemonData = urlFullList.concat(`/${pokemon.id}`);
        await populateWithPokemonData(urlPokemonData);
    } catch (err) {
        console.log(err);
    } 
}; 

const populateWithPokemonData = async (url) => {
    try {
        const pokemonData = await fetchData(url);
        pokemonName.textContent = pokemonData.name.toUpperCase();
        pokemonId.textContent = `#${pokemonData.id}`;
        weight.textContent = `Weight: ${pokemonData.weight}`;
        height.textContent = `Height: ${pokemonData.height}`;
        changeVisibility(pokemonName, pokemonId, weight, height);
        hp.textContent = findBaseStat(pokemonData, "hp");
        attack.textContent = findBaseStat(pokemonData, "attack");
        defense.textContent = findBaseStat(pokemonData, "defense");
        specialAttack.textContent = findBaseStat(pokemonData, "special-attack");
        specialDefense.textContent = findBaseStat(pokemonData, "special-defense");
        speed.textContent = findBaseStat(pokemonData, "speed");
        appendImage(pokemonData.sprites["front_default"]);
        populateTypes(pokemonData);
    } catch (err) {
        console.log(err);
    }
};

const findBaseStat = (data, base_stat) => {
    return Number( data.stats.find( (obj) => obj.stat.name === base_stat ).base_stat );
};

const appendImage = (spriteUrl) => {
    imgContainer.innerHTML =   `
        <img src="${spriteUrl}" alt="pokemon sprite" id="sprite">
    `;
};

const populateTypes = (data) => {
    types.innerHTML = ``;
    data.types.forEach( (obj) => {
        const typeDiv = document.createElement("div");
        types.appendChild(typeDiv);
        typeDiv.setAttribute("class", "pokemon-types")
        const name = obj.type.name;
        typeDiv.style.backgroundColor = typeColors[name];
        typeDiv.textContent = name.toUpperCase();
    } );
}

const changeVisibility = (...args) => {
    for (let i = 0; i < args.length; i++) {
        args[i].style.visibility = "visible";
    }
}

