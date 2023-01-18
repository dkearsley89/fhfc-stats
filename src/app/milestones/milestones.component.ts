import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Milestones } from '../model/model';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html'
})
export class MilestonesComponent implements OnInit {
  milestonesOriginal!: Milestones;
  milestonesToDisplay: { playerId: string, playerName: string, name: string, grade: string, type: string, amount: number }[] = [];
  milestonesToDisplayCount: number = 0;
  title: string = 'Upcoming Milestones';
  showRecent: boolean = false;
  showSenior: boolean = true;
  showJunior: boolean = true;
  showClub: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMilestonesData()
      .subscribe(data => {
        this.milestonesOriginal = { ...data };
        this.getMilestonesToShow();
      });
  }

  updateUrl(event: any) {
    event.target.src = "/assets/img/players/NoImage.jpg";
  }

  getMilestonesToShow() {
    var milestonesToReturn: { playerId: string, playerName: string, name: string, grade: string, type: string, amount: number }[] = [];
    if (this.milestonesOriginal.milestones.length > 0) {
      for (var milestoneGroup of this.milestonesOriginal.milestones) {
        if ((milestoneGroup.grade == 'Club' && this.showClub) || ((milestoneGroup.grade == 'Senior' || milestoneGroup.grade == 'A Grade' || milestoneGroup.grade == 'B Grade' ||
          milestoneGroup.grade == 'C Grade' || milestoneGroup.grade == 'Open Women') && this.showSenior) || (milestoneGroup.grade == 'Junior' && this.showJunior)) {
          if (milestoneGroup.upcoming && !this.showRecent) {
            for (var milestone of milestoneGroup.upcoming) {
              milestonesToReturn.push({ playerId: milestone.Id, playerName: milestone.n, name: milestoneGroup.name, grade: milestoneGroup.grade, type: milestoneGroup.type, amount: milestone.a })
            }
          }
          if (milestoneGroup.recent && this.showRecent) {
            for (var milestone of milestoneGroup.recent) {
              milestonesToReturn.push({ playerId: milestone.Id, playerName: milestone.n, name: milestoneGroup.name, grade: milestoneGroup.grade, type: milestoneGroup.type, amount: milestone.a })
            }
          }
        }
      }
    }
    milestonesToReturn.sort((a, b) => a.playerName.localeCompare(b.playerName));
    this.milestonesToDisplayCount = milestonesToReturn.length;
    this.milestonesToDisplay = milestonesToReturn;
    this.setTitle();
  }

  setTitle() {
    if (this.showRecent) {
      this.title = 'Past Milestones';
    } else {
      this.title = 'Upcoming Milestones';
    }
  }
}