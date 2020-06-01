import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent implements OnInit {
  playersData;
  playerData;
  selectedPlayerId: string;
  error: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPlayersData()
      .subscribe(data => {
        this.playersData = { ...data }
      },
        error => this.error = error
      );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.playersData.players.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 12))
    )

  formatMatches = (value: any) => value.name || '';

  selectedItem(event: any, input: any) {
    event.preventDefault();
    this.selectedPlayerId = event.item.id;
    this.dataService.getPlayerData(this.selectedPlayerId)
      .subscribe(data => {
        this.playerData = { ...data }
      },
        error => this.error = error
      );
    input.value = '';
  }

  updateUrl(event) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }

  getYearsPlayedString(minYear, maxYear, seasons) {
    if (seasons == 1) {
      return minYear + " (" + seasons + " Season)";
    }
    return minYear + " - " + maxYear + " (" + seasons + " Seasons)";
  }

  formatValue(value) {
    if (value == 0) {
      return "-";
    }
    return value;
  }

  getTotalGames(year) {
    var totalGames = 0;
    for (var propertyName in year) {
      if (propertyName.includes('Games')) {
        totalGames += year[propertyName];
      }
    }
    return totalGames;
  }

  getTotalGoals(year) {
    var totalGoals = 0;
    for (var propertyName in year) {
      if (propertyName.includes('Goals')) {
        totalGoals += year[propertyName];
      }
    }
    return totalGoals;
  }
}