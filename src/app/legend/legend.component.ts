import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faMedal, faCircleDot, faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-legend',
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.css'
})
export class LegendComponent {
  @Input() showPremiers: boolean = false;
  @Input() showAssociation: boolean = false;
  @Input() showCurrentPlayer: boolean = false;
  @Input() showLifeMember: boolean = false;
  @Input() showInfo: boolean = false;
  @Input() showBottomHr: boolean = false;
  faTrophy = faTrophy;
  faMedal = faMedal;
  faCircleDot = faCircleDot;
  faCircleInfo = faCircleInfo;
  faStar = faStar;
}