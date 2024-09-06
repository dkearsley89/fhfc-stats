import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.css'
})
export class LegendComponent {
  faTrophy = faTrophy;
  faMedal = faMedal;
}