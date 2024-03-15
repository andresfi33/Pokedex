import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonSpecies } from '../models/pokemon-species';
import { HttpClient } from '@angular/common/http';
import { max } from 'rxjs';

export interface DatosPokemon {
  pokemon: Pokemon[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';

  private maxNumPokemon = 1025;
  private pokemon: Pokemon[] = [];

  private page: number = 1;
  private numItemsPage: number = 25;

  constructor(private http: HttpClient) {}

  async getPokemones(): Promise<DatosPokemon> {
    this.pokemon = [];

    const initialNumber = (this.page - 1) * this.numItemsPage + 1;
    const maxNumber = this.numItemsPage * this.page + 1;

    for (let i = initialNumber; i < maxNumber; i++) {
      const response = await this.http
        .get<Pokemon>(`${this.baseUrl}pokemon/${i}`)
        .toPromise();

      if (response) this.pokemon.push(response);
    }

    const hasPreviousPage = this.page > 1;
    const hasNextPage = this.page <= (this.maxNumPokemon / this.numItemsPage) - 1;

    return { pokemon: this.pokemon, hasPreviousPage, hasNextPage, page: this.page };
  }

  async getPokemonByName(nombre: string): Promise<Pokemon | undefined> {
    const response = await this.http
      .get<Pokemon>(`${this.baseUrl}pokemon/${nombre}`)
      .toPromise();

    return response;
  }

  async getPokemonSpeciesByName(nombre: string): Promise<PokemonSpecies | undefined> {
    const response = await this.http
      .get<PokemonSpecies>(`${this.baseUrl}pokemon-species/${nombre}`)
      .toPromise();

    return response;
  }

  async getDescripcion(nombre: string): Promise<string> {
    let response = await this.http
      .get<PokemonSpecies>(`${this.baseUrl}pokemon-species/${nombre}`)
      .toPromise();

    const descripcion = response?.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'es'
    );

    return descripcion ? descripcion.flavor_text : 'Descripción no encontrada';
  }

  async setPage(paginaSumar: number) {
    this.page += paginaSumar;
  }
}
