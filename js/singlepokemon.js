async function getData() {
  const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    const newPokemon = createPokemon(json);
    console.log(newPokemon);
    showPokemonData(newPokemon);
  } catch (error) {
    console.error(error.message);
  }
}

getData();


// var xhr = new XMLHttpRequest();
// xhr.open("GET", 'https://pokeapi.co/api/v2/pokemon/25', true); // pikachu id = 25

// const promise = new Promise( (resolve, reject) => {
//   xhr.onload = function (e) {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       var json = JSON.parse(xhr.response);
//       resolve(json);
//     } else {
//       reject(xhr.statusText);
//     }
//   }
// };

// })

// promise.then(function (json) { 
//   var pokemon = createPokemon(json);
//   showPokemonData(pokemon);
//   return Promise.reject();
// }).then((pokemon) => {
//   pokemon
// }).catch(function (message) {
//   console.error('Error: ', xhr.statusText);
// })


// xhr.send(null);

function createPokemon (pokemonData) {
    const pokemon = new Object();
    pokemon.sprite = pokemonData.sprites.front_default;
    pokemon.name = pokemonData.name;
    pokemon.type = collectTypes(pokemonData);
    pokemon.id = pokemonData.id;
    pokemon.stats = collectStats(pokemonData);
    pokemon.hp = pokemon.stats.hp;
    pokemon.attack = pokemon.stats.attack;
    pokemon.defense = pokemon.stats.defense;
    pokemon.speed = pokemon.stats.speed;
    pokemon.spDef = pokemon.stats.spDef;
    pokemon.spAtt = pokemon.stats.spAtt;
    pokemon.image = pokemonData.sprites.other["official-artwork"]["front_default"];

    // //hier verder
    // pokemon.moves = collectMoves(pokemonData);

    return pokemon;
}

function collectTypes (pokemonData){
	var list = [];
	for (counter of pokemonData.types){
		list.push(counter.type.name);
	}
	return list;
}

// function collectMoves (pokemonData) {
//   const list = [];
//   for (const counter of pokemonData.moves){
//     if (isFirstGeneration(counter)) {
// 	      list.push(counter.move.name);
// 	    }
// 	}

// 	return list;
// }

function collectStats (pokemonData) {
	// return an array of stats with value
	const result = {};

	pokemonData.stats
		.map(statObject => {
			return {
				name: statObject.stat.name,
				value: statObject.base_stat
			}
		})
		.forEach(stat => {
			result[stat.name] = stat.value;
		});

	return result;
}

// function isFirstGeneration(counter) {
//   const acceptedGroups = ['red-blue', 'yellow'];
//   for (const version of counter.version_group_details){
//     if (acceptedGroups.includes(version.version_group.name)){
//       return true;
//     }
//   }

//   return false;
// }


function showPokemonData (pokemon) {
  document.getElementById('img-pokemon').setAttribute('src', pokemon.image);
	document.getElementById('name').innerHTML = pokemon.name;
	document.getElementById('type').innerHTML = pokemon.type;
	document.getElementById('id').innerHTML = pokemon.id;
	document.getElementById('hp').innerHTML = pokemon.hp;
	document.getElementById('att').innerHTML = pokemon.attack;
	document.getElementById('hp').innerHTML = pokemon.hp;
	document.getElementById('def').innerHTML = pokemon.defense;
	document.getElementById('spd').innerHTML = pokemon.speed;
	document.getElementById('spdef').innerHTML = pokemon.spDef;
	document.getElementById('spatt').innerHTML = pokemon.spAtt;


  // creating the moves list
  var list = document.getElementById('moves');
  var moves = document.createDocumentFragment();
  pokemon.moves.forEach(function (item) {
    var li = document.createElement('li');
    li.textContent = item;
    moves.appendChild(li);
  });
  list.appendChild(moves);
}