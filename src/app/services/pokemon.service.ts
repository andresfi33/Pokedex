import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import {PokemonSpecies} from '../models/pokemon-species'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

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
    if(this.pokemon.length > 0) return this.pokemon;
    console.log('🧐 this.pokemon', this.pokemon);
    
    for (let i = 0; i < this.pokemonNames.length; i++) {
      const nombre = this.pokemonNames[i];
      this.http.get<Pokemon>(`${this.baseUrl}pokemon/${nombre}`).subscribe(
        (response: Pokemon) => {
          this.pokemon.push(response);
        },
        (e) => console.log(e)
      );
    }

    return this.pokemon;
  }

  async getPokemonByName(nombre: string): Promise<Pokemon | undefined> {
    const response = await this.http
      .get<Pokemon>(`${this.baseUrl}pokemon/${nombre}`)
      .toPromise();

    return response;
  }

  async getDescripcion(nombre: string): Promise<string> {
    let response = await this.http
      .get<PokemonSpecies>(`${this.baseUrl}pokemon-species/${nombre}`)
      .toPromise();

      const descripcion = response?.flavor_text_entries.find((entry: any) => entry.language.name === 'es');

      return descripcion ? descripcion.flavor_text : 'Descripción no encontrada';
  }
}
