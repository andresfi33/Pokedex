import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pokemon-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css',
})
export class PokemonDetailComponent {
  @Input() pokemon?: Pokemon;
}
