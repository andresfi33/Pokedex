import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { POKEMON } from '../../mock-pokemon';
/*import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';*/
import { Pokemon } from '../../models/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'pokemon',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, PokemonDetailComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  pokemones: Pokemon[] = POKEMON;
  selectedPokemon?: Pokemon;

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }
}

/* export class PokeapiPokemon {
  apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) {}

  getPokemon(id: number): Observable<any> {
    return this.http.get('${apiUrl}/pokemon/${id}')
  }
}*/