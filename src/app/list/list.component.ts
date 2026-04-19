import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, switchMap, shareReplay } from 'rxjs';
import { DataService } from '../services/data.service';
import { LegendComponent } from '../legend/legend.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleDot, faCircleInfo, faStar } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  imports: [RouterModule, FontAwesomeModule, NgbTooltipModule, NgbPaginationModule, LegendComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(DataService);

  faCircleDot = faCircleDot;
  faCircleInfo = faCircleInfo;
  faStar = faStar;

  readonly page = signal(1);
  readonly pageSize = 25;

  readonly recordData$ = this.route.paramMap.pipe(
    map(params => params.get('name')!),
    switchMap(name => this.dataService.getRecordsListData(name)),
    shareReplay(1)
  );

  readonly recordData = toSignal(this.recordData$);

  readonly recordCount = computed(() => this.recordData()?.data.length ?? 0);

  readonly paginatedData = computed(() => {
    const data = this.recordData()?.data ?? [];
    const start = (this.page() - 1) * this.pageSize;
    return data.slice(start, start + this.pageSize);
  });
}