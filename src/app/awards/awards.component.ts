import { Component, inject, signal, computed, effect } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, distinctUntilChanged, switchMap, filter } from 'rxjs';
import { DataService } from '../services/data.service';

import { NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-awards',
  imports: [RouterModule, TitleCasePipe, NgbNavModule, NgbDropdownModule],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.css'
})
export class AwardsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);

  readonly active = signal<string>('A Grade');
  readonly yearsToShow = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];
  readonly awardsYear = toSignal(this.route.paramMap.pipe(map(p => p.get('awardsYear')), filter((year): year is string => year !== null), distinctUntilChanged()), { initialValue: '' });
  readonly yearlyAwardsData = toSignal(toObservable(this.awardsYear).pipe(switchMap(year => this.dataService.getYearlyAwardsdData(year))));
  readonly yearlyAwardsTitle = computed(() => {
    const year = this.awardsYear();
    const grade = this.active();
    return year && grade ? `${year} ${grade} Awards` : '';
  });

  constructor() {
    effect(() => {
      this.awardsYear();
      this.active.set('A Grade');
    });
  }

  updateUrl(event: Event) {
    (event.target as HTMLImageElement).src = '/img/NoImage.jpg';
  }

  changeGrade(grade: string) {
    this.active.set(grade);
  }
}