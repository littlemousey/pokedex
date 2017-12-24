import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemonData: object;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {

    this.pokemonService.retrievePokemonInformation(25).subscribe(
      (response) => this.pokemonData = response
    );

  }

}
