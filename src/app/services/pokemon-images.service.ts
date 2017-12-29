import { Injectable } from '@angular/core';

@Injectable()
export class PokemonImagesService {

   CSE_ID: string;
   API_KEY: string;

  constructor() {
     this.CSE_ID = '009690538093782806565:0gwn4hxn6mo';
     this.API_KEY = 'AIzaSyA4SK58-GIEDNUqJ1P5KI9an7SsXg8h-UE';  // Restricted

  }

  getImageForPokemon(pokemonName) {



  }

}
