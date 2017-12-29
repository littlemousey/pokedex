import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PokemonService {

  baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  retrievePokemonInformation(id: number) {
    return this.http.get(this.baseUrl + 'pokemon/' + id);
  }

}
