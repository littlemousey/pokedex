import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PokemonImagesService {

   CSE_ID: string;
   API_KEY: string;
   API_ROOT: string;

  constructor(private http: HttpClient) {
    this.API_ROOT = 'https://www.googleapis.com/customsearch/v1'
    this.CSE_ID = '009690538093782806565:0gwn4hxn6mo';
    this.API_KEY = 'AIzaSyA4SK58-GIEDNUqJ1P5KI9an7SsXg8h-UE';  // Restricted

  }

  getImageForPokemon(pokemonName) {

    const url = `${this.API_ROOT}?key=${this.API_KEY}&cx=${this.CSE_ID}&q=${pokemonName}`; //eslint-disable-line

    return this.http.get(url);

  }

}
