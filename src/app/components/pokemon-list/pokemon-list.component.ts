import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
    selector: 'app-pokemon-list',
    templateUrl: './pokemon-list.component.html',
    styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {

    pokemonlist: {};

    constructor(private pokemonService: PokemonService) {
    }

    ngOnInit() {

        this.pokemonService.retrieveAllPokemonNames().subscribe(
            (response) => this.pokemonlist = this.getPokemonNamesFromResponse(response)
        );
    }

    getPokemonNamesFromResponse(response) {
        return response.results.map(pokemon => pokemon.name);
    }

}
