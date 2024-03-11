import { Component, Input } from '@angular/core';
import { Pokemon, Stat } from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pokemon-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent {
  // @Input() pokemon?: Pokemon;}
  pokemon?: Pokemon;
  descripcion: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    this.getDescipcion();
  }

  async getPokemon(): Promise<void> {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.pokemon = await this.pokemonService.getPokemonByName(nombre || '');
  }

  async getDescipcion(): Promise<void> {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.descripcion = await this.pokemonService.getDescripcion(nombre || '');
  }

  getDatosArray(array: Stat[], posicion: number): number | undefined {
    return Number(array[posicion].base_stat);
  }
  

}
