import { Routes } from '@angular/router';
import { PokemonPageComponent } from './pages/pokemon/pokemon-page/pokemon-page.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: 'pokemon', component: PokemonPageComponent },
  { path: '', component: PokemonComponent },
  { path: ':nombre', component: PokemonDetailComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  //   { path: '', redirectTo: '/', pathMatch: 'full' },
];
