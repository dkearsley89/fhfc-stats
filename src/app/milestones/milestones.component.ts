import { Component, signal, computed } from '@angular/core';
import { DataService } from '../services/data.service';
import { Milestones } from '../model/model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-milestones',
  imports: [RouterModule, FormsModule],
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.css'
})
export class MilestonesComponent {
  readonly milestonesOriginal = signal<Milestones | null>(null);

  readonly showRecent = signal(false);
  readonly showSenior = signal(true);
  readonly showJunior = signal(true);
  readonly showClub = signal(true);

  constructor(private dataService: DataService) {
    this.dataService.getMilestonesData().subscribe(data => {
      this.milestonesOriginal.set(data);
    });
  }

  readonly milestonesToDisplay = computed(() => {
    const data = this.milestonesOriginal();
    if (!data) return [];

    const result: {
      playerId: string;
      playerName: string;
      name: string;
      grade: string;
      type: string;
      amount: number;
    }[] = [];

    for (const group of data.milestones) {

      const showByGrade =
        (group.grade === 'Club' && this.showClub()) ||
        (
          ['Senior', 'A Grade', 'B Grade', 'C Grade', 'Open Women'].includes(group.grade)
          && this.showSenior()
        ) ||
        (group.grade === 'Junior' && this.showJunior());

      if (!showByGrade) continue;

      const list = this.showRecent()
        ? group.recent
        : group.upcoming;

      if (!list) continue;

      for (const m of list) {
        result.push({
          playerId: m.id,
          playerName: m.n,
          name: group.name,
          grade: group.grade,
          type: group.type,
          amount: m.a
        });
      }
    }

    return result.sort((a, b) =>
      a.playerName.localeCompare(b.playerName)
    );
  });

  readonly milestonesToDisplayCount = computed(
    () => this.milestonesToDisplay().length
  );

  readonly title = computed(() =>
    this.showRecent() ? 'Past Milestones' : 'Upcoming Milestones'
  );

  updateUrl(event: Event) {
    (event.target as HTMLImageElement).src = '/img/NoImage.jpg';
  }
}