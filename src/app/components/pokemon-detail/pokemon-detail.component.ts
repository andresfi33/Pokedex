import { Component, Input } from '@angular/core';
import {
  GenerationI,
  GenerationIi,
  GenerationIii,
  GenerationIv,
  GenerationV,
  GenerationVi,
  GenerationVii,
  GenerationViii,
  Other,
  Pokemon,
  Stat,
  Versions,
} from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { PokemonSpecies } from '../../models/pokemon-species';

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
  pokemonSpecies?: PokemonSpecies;
  descripcion: string = '';
  tipos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    this.getPokemonSpecies();
    this.getDescipcion();
  }

  async getPokemon(): Promise<void> {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.pokemon = await this.pokemonService.getPokemonByName(nombre || '');
    await this.getTipos();
  }

  async getPokemonSpecies(): Promise<void> {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.pokemonSpecies = await this.pokemonService.getPokemonSpeciesByName(
      nombre || ''
    );
  }

  async getDescipcion(): Promise<void> {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.descripcion = await this.pokemonService.getDescripcion(nombre || '');
  }

  getCategoria(): string | undefined {
    return this.pokemonSpecies?.genera.find(
      (genera) => genera.language.name === 'es'
    )?.genus;
  }

  getHabilidades(): string | undefined {
    if (!this.pokemon) return '';
    if (this.pokemon.abilities.length === 0) return 'No tiene habilidades';

    const pokemonAbilitiesNames = this.pokemon.abilities.map((ability) => {
      return ability.ability.name;
    });

    return pokemonAbilitiesNames.join(', ');
  }

  async getTipos(): Promise<void> {
    const tiposPokemon = this.pokemon?.types.map((tipo) => {
      return tipo.type.name;
    });

    console.log(tiposPokemon);

    this.tipos = tiposPokemon || [];
  }

  getDatosArray(array: Stat[], posicion: number): number | undefined {
    return Number(array[posicion].base_stat);
  }

  getFrontImage(pokemon: Pokemon): string | undefined {
    if (pokemon?.sprites?.other) {
      const otherSprites = Object.keys(
        pokemon?.sprites?.other
      ) as (keyof Other)[];

      for (const sprite of otherSprites) {
        if (pokemon?.sprites?.other[sprite]?.front_default) {
          return pokemon?.sprites?.other[sprite]?.front_default;
        }
      }
    }

    if (pokemon?.sprites?.versions) {
      const versionsSprites = Object.keys(
        pokemon?.sprites?.versions
      ).reverse() as (keyof Versions)[];

      for (const versions of versionsSprites) {
        const version = pokemon?.sprites?.versions[versions];

        const subVersions: any = Object.keys(version);
        for (let i = 0; i < subVersions.length; i++) {
          const sprite = subVersions[0];
          const versionTmp: any = { ...version };
          if (versionTmp[sprite]?.front_default) {
            return versionTmp[sprite]?.front_default;
          }
        }
      }
    }

    if (pokemon.sprites?.front_default) {
      return pokemon?.sprites?.front_default;
    }

    return '';
  }

  getColor(tipo: string): string {
    let color = '';
    console.log(tipo);

    switch (tipo) {
      case 'steel':
        color = '#6C8582';
        break;
      case 'water':
        color = '#4C55E7';
        break;
      case 'bug':
        color = '#4FE556';
        break;
      case 'dragon':
        color = '#4F38C4';
        break;
      case 'electric':
        color = '#F2F237';
        break;
      case 'ghost':
        color = '#5716A4';
        break;
      case 'fire':
        color = '#EC3425';
        break;
      case 'fairy':
        color = '#F355DD';
        break;
      case 'ice':
        color = '#55ECF3';
        break;
      case 'fight':
        color = '#F48B05';
        break;
      case 'normal':
        color = '#D5B2AB';
        break;
      case 'grass':
        color = '#44A005';
        break;
      case 'psychic':
        color = '#F85C9E';
        break;
      case 'rock':
        color = '#C6AD87';
        break;
      case 'dark':
        color = '#31302E';
        break;
      case 'ground':
        color = '#8B5708';
        break;
      case 'poison':
        color = '#B61CD2';
        break;
      case 'flying':
        color = '#86D0F2';
        break;
      default:
        color = '#D5B2AB';
        break;
    }

    return color;
  }
}
