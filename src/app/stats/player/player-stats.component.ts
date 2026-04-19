import { Component, inject, computed } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { filter, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Player, Players } from '../../model/model';

@Component({
  selector: 'app-player-stats',
  imports: [NgbTypeaheadModule],
  templateUrl: './player-stats.component.html',
  styleUrl: './player-stats.component.css'
})
export class PlayerStatsComponent {
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly listOfPlayers = toSignal(this.dataService.getPlayersData(), { initialValue: { players: [] } as Players });
  readonly selectedPlayerId = toSignal(this.route.paramMap.pipe(map(p => p.get('id')), filter((id): id is string => !!id && id !== '0'), distinctUntilChanged()), { initialValue: '' });
  readonly playerData = toSignal(toObservable(this.selectedPlayerId).pipe(filter(id => id !== ''), switchMap(id => this.dataService.getPlayerData(id))), { initialValue: null });

  readonly search = (text$: any) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map((term: string) => term.length < 2 ? []
        : this.listOfPlayers().players.filter(p => p.name.toLowerCase().includes(term.toLowerCase())).slice(0, 12))
    );

  readonly formatMatches = (player: Player) => player.name ?? '';

  selectedItem(event: any, input: HTMLInputElement) {
    event.preventDefault();
    this.router.navigate(['stats/player/', event.item.id]);
    input.value = '';
    input.blur();
  }

  updateUrl(event: any) {
    event.target.src = '/img/NoImage.jpg';
  }

  getYearsPlayedString(minYear: string, maxYear: string, seasons: number) {
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

  getTotalGoals(year: any) {
    let total = 0;
    for (const prop in year) {
      if (prop.includes('Goals')) {
        total += year[prop];
      }
    }
    return total;
  }

  readonly gradeColumns = [
    { key: 'a', label: 'A Grade' },
    { key: 'b', label: 'B Grade' },
    { key: 'c', label: 'C Grade' },
    { key: 'w', label: 'Open Women' },
    { key: 'u', label: 'Unknown Senior' },
    { key: 'u18', label: 'Under 18' },
    { key: 'u175', label: 'Under 17.5' },
    { key: 'u17', label: 'Under 17' },
    { key: 'u16', label: 'Under 16' },
    { key: 'u15', label: 'Under 15' },
    { key: 'u14', label: 'Under 14' },
    { key: 'u13', label: 'Under 13' },
    { key: 'u165sun', label: 'Under 16.5 Sun' },
    { key: 'u16sun', label: 'Under 16 Sun' },
    { key: 'u15sun', label: 'Under 15 Sun' },
    { key: 'u14sun', label: 'Under 14 Sun' },
    { key: 'u13sun', label: 'Under 13 Sun' },
    { key: 'u17girls', label: 'Under 17 Girls' },
    { key: 'u16girls', label: 'Under 16 Girls' },
    { key: 'u14girls', label: 'Under 14 Girls' },
    { key: 'uj', label: 'Unknown Junior' }
  ] as const;

  readonly latestYear = computed(() =>
    this.playerData()?.years?.at(-1)
  );

  readonly visibleGrades = computed(() => {
    const year = this.latestYear();
    if (!year) return [];

    return this.gradeColumns.filter(
      g => (year as any)[`${g.key}Games`]
    );
  });

  hasGames(year: any, gradeKey: string): boolean {
    return (year[`${gradeKey}Games`] ?? 0) > 0;
  }
}