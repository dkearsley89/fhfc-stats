import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  playersData: any;
  playerData: any;
  selectedPlayerId: string = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlayersData()
      .subscribe(data => {
        this.playersData = { ...data }
        if (this.route.snapshot.params['id']) {
          this.loadPlayer(this.route.snapshot.params['id']);
        }
      },
        error => this.error = error
      );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.playersData.players.filter((v: { name: string; }) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 12))
    )

  formatMatches = (value: any) => value.name || '';

  selectedItem(event: any, input: any) {
    event.preventDefault();
    this.loadPlayer(event.item.id);
    this.router.navigate(['stats/player/' + event.item.id]);
    input.value = '';
    input.blur();
  }

  loadPlayer(idToLoad: string) {
    this.selectedPlayerId = idToLoad;
    this.dataService.getPlayerData(this.selectedPlayerId)
      .subscribe(data => {
        this.playerData = { ...data }
      },
        error => this.error = error
      );
  }

  updateUrl(event: any) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }

  getYearsPlayedString(minYear: string, maxYear: string, seasons: number) {
    if (seasons == 1) {
      return minYear + " (" + seasons + " Season)";
    }
    return minYear + " - " + maxYear + " (" + seasons + " Seasons)";
  }

  formatValue(value: number) {
    if (value == 0) {
      return "-";
    }
    return value;
  }

  getTotalGames(year: any) {
    var totalGames = 0;
    for (var propertyName in year) {
      if (propertyName.includes('Games')) {
        totalGames += year[propertyName];
      }
    }
    return totalGames;
  }

  getTotalGoals(year: any) {
    var totalGoals = 0;
    for (var propertyName in year) {
      if (propertyName.includes('Goals')) {
        totalGoals += year[propertyName];
      }
    }
    return totalGoals;
  }
}