import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  private pokemon: Pokemon[] = [];

  pokemonNames = [
    'ditto',
    'corsola',
    'ribombee',
    'kangaskhan',
    'rhydon',
    'pikachu',
    'arceus',
    'yveltal',
    'bidoof',
    'garbodor',
  ];
  constructor(private http: HttpClient) {}

  getPokemones(): Pokemon[] {
    this.pokemon = [];

    for (let i = 0; i < this.pokemonNames.length; i++) {
      const nombre = this.pokemonNames[i];
      this.http.get<Pokemon>(`${this.baseUrl}${nombre}`).subscribe(
        (response: Pokemon) => {
          this.pokemon.push(response);
        },
        (e) => console.log(e)
      );
    }

    return this.pokemon;
  }
}
