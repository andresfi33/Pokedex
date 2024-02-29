import { Pokemon } from './models/pokemon';
//import { PokeapiPokemon } from './pokemon/pokemon.component';
//import { Component, OnInit } from '@angular/core';

export const POKEMON: Pokemon[] = [
  { id: 1, name: 'Charmander'},
  { id: 2, name: 'Dr. Nice' },
  { id: 3, name: 'Bombasto' },
  { id: 4, name: 'Celeritas' },
  { id: 5, name: 'Magneta' },
  { id: 6, name: 'RubberMan' },
  { id: 7, name: 'Dynama' },
  { id: 8, name: 'Dr. IQ' },
  { id: 9, name: 'Magma' },
  { id: 10, name: 'Tornado' },
];

/*@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon/pokemon.component.html',
  styleUrls: ['./pokemon/pokemon.component.css']
})

export class PokemonComponent implements OnInit {
  pokemon: any;

  constructor(private pokeapiPokemon: PokeapiPokemon) { }

  ngOnInit(): void {
    this.getPokemonData(1); // Obtener datos del Pokémon con ID 1
  }

  getPokemonData(id: number): void {
    this.pokeapiPokemon.getPokemon(id)
      .subscribe(data => {
        this.pokemon = data;
        console.log(this.pokemon);
      });
  }
}*/