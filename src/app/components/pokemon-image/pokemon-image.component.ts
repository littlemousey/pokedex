import { Component, OnInit } from '@angular/core';
import { PokemonImagesService} from '../../services/pokemon-images.service';


@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.scss']
})
export class PokemonImageComponent implements OnInit {

  imgPath: string;

  constructor(private pokemonImageService: PokemonImagesService) { }

  ngOnInit() {
    this.getImgPathForPokemon('pikachu');
  }

  getImgPathForPokemon(pokemonName) {

    this.pokemonImageService.getImageForPokemon(pokemonName)
      .then((response) => {
        console.log(response);
      });
  }

}
