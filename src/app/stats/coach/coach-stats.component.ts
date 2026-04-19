import { Component, inject } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { filter, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Coach, Coaches } from '../../model/model';

@Component({
  selector: 'app-coach-stats',
  imports: [NgbTypeaheadModule],
  templateUrl: './coach-stats.component.html',
  styleUrl: './coach-stats.component.css'
})
export class CoachStatsComponent {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly listOfCoaches = toSignal(this.dataService.getCoachesData(), { initialValue: { coaches: [] } as Coaches });
  readonly selectedCoachId = toSignal(this.route.paramMap.pipe(map(p => p.get('id')), filter((id): id is string => !!id && id !== '0'), distinctUntilChanged()), { initialValue: '' });
  readonly coachData = toSignal(toObservable(this.selectedCoachId).pipe(filter(id => id !== ''), switchMap(id => this.dataService.getCoachData(id))), { initialValue: null });

  readonly search = (text$: any) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term: string) => term.length < 2 ? []
        : this.listOfCoaches().coaches.filter(c => c.name.toLowerCase().includes(term.toLowerCase())).slice(0, 12))
    );

  readonly formatMatches = (coach: Coach) => coach.name ?? '';

  selectedItem(event: any, input: HTMLInputElement) {
    event.preventDefault();
    this.router.navigate(['stats/coach/', event.item.id]);
    input.value = '';
    input.blur();
  }

  updateUrl(event: any) {
    event.target.src = '/img/NoImage.jpg';
  }

  getYearsCoachedString(minYear: string, maxYear: string, seasons: number) {
    return seasons === 1
      ? `${minYear} (${seasons} Season)`
      : `${minYear} - ${maxYear} (${seasons} Seasons)`;
  }

  formatValue(value: number) {
    return value === 0 ? '-' : value;
  }

  getTotalGames(year: any) {
    let total = 0;
    for (const prop in year) {
      if (prop.includes('Games')) {
        total += year[prop];
      }
    }
    return total;
  }
}