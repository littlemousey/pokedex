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

  async ngOnInit() {
    this.imgPath = await this.getImgPathForPokemon('pikachu');
  }

  async getImgPathForPokemon(pokemonName) {
    const response = await this.pokemonImageService.getImageForPokemon(pokemonName).toPromise();
    return response.items[0].link;
  }

}
