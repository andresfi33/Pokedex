import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pokemon } from '../../models/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
    selector: 'pokemon',
    standalone: true,
    templateUrl: './pokemon.component.html',
    styleUrl: './pokemon.component.css',
    imports: [
        CommonModule,
        FormsModule,
        NgFor,
        PokemonDetailComponent,
        RouterModule,
        LoadingComponent
    ]
})
export class PokemonComponent implements OnInit {
  pokemones: Pokemon[] = [];
  selectedPokemon?: Pokemon;
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  loading: boolean = true;
  page: number = 1;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService
      .getPokemones()
      .then(({ pokemon, hasNextPage, hasPreviousPage, page, loading }) => {
        this.pokemones = pokemon;
        this.hasNextPage = hasNextPage;
        this.hasPreviousPage = hasPreviousPage;
        this.page = page;
        this.loading = loading;
      });
      
  }

  onSelect(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

  async goToPrev() {
    if (this.loading) return;

    this.loading = true;
    //Recuperamos los datos de la página anterior
    this.pokemonService.setPage(-1);
    const { pokemon, hasNextPage, hasPreviousPage, page, loading } =
      await this.pokemonService.getPokemones();

    this.pokemones = pokemon;
    this.hasNextPage = hasNextPage;
    this.hasPreviousPage = hasPreviousPage;
    this.page = page;
    this.loading = loading;
  }

  async goToNext() {
    if (this.loading) return;

    this.loading = true;
    //Recuperamos los datos de la página siguiente
    this.pokemonService.setPage(1);
    const { pokemon, hasNextPage, hasPreviousPage, page } =
      await this.pokemonService.getPokemones();

    this.pokemones = pokemon;
    this.hasNextPage = hasNextPage;
    this.hasPreviousPage = hasPreviousPage;
    this.page = page;
    this.loading = false;
  }
}
