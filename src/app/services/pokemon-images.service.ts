import { Injectable } from '@angular/core';
import GoogleImageSearch from 'free-google-image-search';

@Injectable()
export class PokemonImagesService {

  // CSE_ID: string;
  // API_KEY: string;
  // client: Client;

  constructor() {
    // this.CSE_ID = '009690538093782806565:0gwn4hxn6mo';
    // this.API_KEY = 'AIzaSyA4SK58-GIEDNUqJ1P5KI9an7SsXg8h-UE';  // Restricted
    //
    // this.client = new Client(this.CSE_ID, this.API_KEY);
  }

  getImageForPokemon(pokemonName) {

    return GoogleImageSearch.searchImage(pokemonName);

    // return new Promise(resolve => {
    //   this.client.search(pokemonName)
    //     .then(results => {
    //       resolve(results[0]);
    //     });
    // });

  }

}
