import { Component, inject } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, distinctUntilChanged, switchMap, filter } from 'rxjs';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../services/data.service';
import { LegendComponent } from '../legend/legend.component';

@Component({
  selector: 'app-honour',
  imports: [FontAwesomeModule, RouterModule, LegendComponent, NgbDropdownModule],
  templateUrl: './honour.component.html',
  styleUrl: './honour.component.css'
})
export class HonourComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);

  readonly honourType = toSignal(this.route.paramMap.pipe(map(p => p.get('honourType')), filter((honourType): honourType is string => honourType !== null), distinctUntilChanged()), { initialValue: '' });
  readonly honourBoardData = toSignal(toObservable(this.honourType).pipe(switchMap(honourType => this.dataService.getHonourBoardData(honourType))));

  faTrophy = faTrophy;
  faMedal = faMedal;
}