import { Component } from '@angular/core';
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html'
})
export class LegendComponent {
  faTrophy = faTrophy;
  faMedal = faMedal;
}