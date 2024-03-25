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
import { ActivatedRoute, Router } from '@angular/router';
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
  nextPokemon?: string;
  previousPokemon?: string;
  pokemonSpecies?: PokemonSpecies;
  descripcion: string = '';
  tipos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    // subscribe to url changes
    this.route.params.subscribe(() => {
      this.getPokemon();
      this.getPokemonSpecies();
      this.getDescipcion();
    });
  }

  async getPokemon(): Promise<void> {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    this.pokemon = await this.pokemonService.getPokemonByName(nombre || '');
    await this.getTipos();
    await this.getAnteriorPokemon();
    await this.getSiguientePokemon();
  }

  async salir(): Promise<void> {
      this.router.navigateByUrl(`/`);
  }

  async anteriorPokemon(): Promise<void> {
    if (this.pokemon!.id > 1) {
      const siguientePokemon = await this.getPokemonName(this.pokemon!.id - 1);
      this.router.navigateByUrl(`/${siguientePokemon}`);
    }
  }

  async siguientePokemon(): Promise<void> {
    const siguientePokemon = await this.getPokemonName(this.pokemon!.id + 1);
    this.router.navigateByUrl(`/${siguientePokemon}`);
  }

  async getAnteriorPokemon(): Promise<void> {
    if (this.pokemon!.id > 1) {
      this.previousPokemon = await this.getPokemonName(this.pokemon!.id - 1);
    } else{
      this.previousPokemon = '🌚';
    }
  }

  async getSiguientePokemon(): Promise<void> {
      this.nextPokemon = await this.getPokemonName(this.pokemon!.id + 1);
  }

  async getPokemonName(id: number): Promise<string> {
    const nuevoPokemon = await this.pokemonService.getPokemonByName(
      id.toString() || ''
    );

    return nuevoPokemon!.name;
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
}
