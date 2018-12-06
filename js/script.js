'use strict';

const apiV2 = 'https://pokeapi.co/api/v2/';
const apiQuery = 'pokemon/?limit=251';

const pokemonSprites = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

fetch(`${apiV2}${apiQuery}`)
	.then(function(response) {
		return response.json();
	})
	.then(function(rawData) {
		let pokemonList = rawData.results.slice(0, 251);
		pokemonDataToDOM(pokemonList);
		pokemonSelect(pokemonList);
	});


function pokemonDataToDOM (pokemonList) {
	const listDom = document.getElementById('pokemonlist');
	let pokemonStartNo = 1;

	for (let pokemon of pokemonList) {
		let div = document.createElement('div');
		div.setAttribute('class', 'select-pokemon');
		div.innerHTML = `${pokemonStartNo} <span onclick="showPokemon('${pokemon.url}')">${prettifyPokemonName(pokemon.name)}<img src="${pokemonSprites}${pokemonStartNo}.png"/></span>`;
		listDom.appendChild(div);
		pokemonStartNo ++;
	}
}

function prettifyPokemonName(originalName) {
	let name = originalName.charAt(0).toUpperCase() + originalName.slice(1);

	if(name.includes('Nidoran-f')){
		name = name.slice(0, -2) + '♀️';
	} else if (name.includes('Nidoran-m')){
		name = name.slice(0, -2) + '♂️';
	}
	return name;
}

function showPokemon (pokemonUrl) {
	fetch(`${pokemonUrl}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(singlePokemon){
			let pokemon = new Pokemon(singlePokemon);
			const domElement = document.getElementById('pokemon');
			let pokemonInfo =
			`<div class="container is-dark with-title">
			<p class="title">${pokemon.name}</p>
			<div class="text-white">
			<span class="btn is-warning right-align">${pokemon.type}</span>
			<div id="description"></div>
			<img id="pokemonImage" alt="${pokemon.name}"/>
			<audio id="pokemonCry" src="${pokemon.cry}" autoplay>Your browser does not support the <code>audio</code> element.</audio>
			</div>
			</div>
			`;
			domElement.innerHTML= pokemonInfo;
		})

}

function pokemonSelect (pokemon) {
	let pokemonList = [];
	pokemon.forEach(entry => pokemonList.push(entry.name));
	var input = document.getElementById('pokemon-search');

	pokemonSearch(pokemon);
};

function pokemonSearch (pokemonList) {
	var searchPokemon = document.getElementById('pokemon-search').addEventListener('keyup', function(){
		var inputSearch = document.getElementById('pokemon-search').value;
		var filterPokemon = [];
		const listDom = document.getElementById('pokemonlist');
		listDom.innerHTML = '';

		var filterPokemon = buildPokemonList(inputSearch, pokemonList);

		for (let pokemon of filterPokemon) {
			let div = document.createElement('div');
			div.setAttribute('class', 'select-pokemon');
			div.innerHTML = `${pokemon.id} <span onclick="showPokemon('${pokemon.url}')">${prettifyPokemonName(pokemon.name)}<img src="${pokemonSprites}${pokemon.id}.png"/></span>`;
			listDom.appendChild(div);
		}
	})
}

function buildPokemonList (inputSearch, pokemonList){
	var filterPokemon = []
	for(var pokemon of pokemonList){
		if(pokemon.name.includes(inputSearch)){
			var newPokemon = {
				id: pokemon.url.split('/')[6],
				name: pokemon.name,
				url: pokemon.url
			}				
			filterPokemon.push(newPokemon);
		}
	}

	return filterPokemon;
}


function Pokemon (pokemon) {
	this.name = prettifyPokemonName(pokemon.name);
	this.type = createTypeList(pokemon.types);
	this.typeIcon = determineTypeIcon(this.type);
	this.description = getPokemonDescription(pokemon.species.url);
	this.image = retrievePokemonGiphy(this.name);
	this.cry = playPokemonCry(pokemon.id);

	// todo:
	// pokemon.sprite = pokemonData.sprites.front_default;
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
	const apiKey = 'api_key=NEt04DsuMUrv2zHDgw1jgFAP2qCX7OaN';
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

function getPokemonDescription (url) {
	fetch(url)
	.then(function(response) {
		return response.json();
	})
	.then(function(pokemondata) {
		return pokemondata.flavor_text_entries.filter(function(entry) {
		return entry.language.name === 'en';
	})
})
	.then(function(entries){
		updatePokemonDescription(entries[0].flavor_text);
	})
}

function updatePokemonDescription (description) {
	document.querySelector('#description').innerHTML = description;
}

function playPokemonCry (id) {
	const pokemonId = id;
	return `https://pokemoncries.com/cries-old/${pokemonId}.mp3`;
}

function createTypeList(types) {
	let list = [];
	types.forEach(entry => list.push(entry.type.name));
	return list;
}
