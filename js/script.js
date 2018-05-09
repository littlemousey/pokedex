'use strict';

const api = 'https://pokeapi.co/api/v2/';
const apiQuery = 'pokemon/?limit=151';

// console.log(`${api}${apiQuery}`);

const pokemonSprites = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

//fetch(`pokemonAPI.json`)
fetch(`${api}${apiQuery}`)
	.then(function(response) {
		return response.json();
	})
	.then(function(rawData) {
		let pokemonList = rawData.results;
		pokemonDataToDOM(pokemonList);
	});


function pokemonDataToDOM (pokemonList) {
	const listDom = document.getElementById('pokemonlist');
	let pokemonStartNo = 1;

	for (let pokemon of pokemonList) {
		//console.log(pokemon);
		let div = document.createElement('div');
		div.setAttribute('class', 'select-pokemon');
		div.innerHTML = `# ${pokemonStartNo} <span onclick="showPokemon('${pokemon.url}')">${prettifyPokemonName(pokemon.name)}</span><img src="${pokemonSprites}${pokemonStartNo}.png"/>`;
		listDom.appendChild(div);
		pokemonStartNo ++;
	}
}

function prettifyPokemonName(originalName) {
	let name = originalName.charAt(0).toUpperCase() + originalName.slice(1);

	if(name.includes('Nidoran')){
		let gender = name.charAt(name.length - 1);
		name = name.slice(0, -2) + ` (${gender})`;
	}
	return name;
}

function showPokemon (pokemonUrl) {
	fetch(`${pokemonUrl}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(singlePokemon){
			console.log(singlePokemon);
			let pokemon = new Pokemon(singlePokemon);
			const domElement = document.getElementById('pokemon');
			let pokemonInfo =
			`<h1>${pokemon.name}</h1>
			<p>Type: ${pokemon.type} <i class="${pokemon.typeIcon}"></i></p>
			<img id="pokemonImage" alt="${pokemon.name}"/>
			<audio id="pokemonCry" src="${pokemon.cry}" autoplay>Your browser does not support the <code>audio</code> element.</audio>
			`;
			domElement.innerHTML= pokemonInfo;
		})

}

function Pokemon (pokemon) {
	this.name = prettifyPokemonName(pokemon.name);
	this.type = pokemon.types[0].type.name;
	this.typeIcon = determineTypeIcon(this.type);
	this.image = retrievePokemonGiphy(this.name);
	this.cry = playPokemonCry(pokemon.id);

	   //  pokemon.sprite = pokemonData.sprites.front_default;
    // pokemon.name = pokemonData.name;
    // pokemon.type = collectTypes(pokemonData);
    // pokemon.id = pokemonData.id;
    // pokemon.stats = collectStats(pokemonData);
    // pokemon.hp = pokemon.stats.hp;
    // pokemon.attack = pokemon.stats.attack;
    // pokemon.defense = pokemon.stats.defense;
    // pokemon.speed = pokemon.stats.speed;
    // pokemon.spDef = pokemon.stats.spDef;
    // pokemon.spAtt = pokemon.stats.spAtt;
}

function determineTypeIcon(type) {
	let typeIcon;
	switch (type) {
		case 'fire':
		typeIcon = 'ion-flame';
		break;

		case 'water':
		typeIcon = 'ion-waterdrop';
		break;

		case 'grass':
		typeIcon = 'ion-leaf';
		break;

		case 'electric':
		typeIcon = 'ion-flash';
		break;

		default: 
		typeIcon = 'ion-help';

	}

	return typeIcon;
}

function retrievePokemonGiphy (pokemonName) {
	const url = 'https://api.giphy.com/v1/gifs/search?';
	const apiKey = 'api_key=pHeytEtBN04WZZzVbodZiBtWuRodg9tM';
	const query = `&q=${pokemonName}&limit=1&offset=0&rating=G&lang=en`;
	let image;

	fetch(`${url}${apiKey}${query}`)
	.then(function(response) {
		return response.json();
	})
	.then(function(giphy){
		image = giphy.data[0].images.fixed_height.url;
		document.getElementById('pokemonImage').setAttribute('src', `${image}`);
		return image;
	})

}

function playPokemonCry (id) {
	const pokemonId = id;
	return `https://pokemoncries.com/cries-old/${pokemonId}.mp3`;
}