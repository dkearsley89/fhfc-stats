import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, distinctUntilChanged } from 'rxjs';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-totd',
  imports: [RouterModule, NgbDropdownModule],
  templateUrl: './totd.component.html',
  styleUrl: './totd.component.css'
})
export class TotdComponent {
  private readonly route = inject(ActivatedRoute);

  readonly totdName = toSignal(this.route.paramMap.pipe(map(p => p.get('totdName')!), distinctUntilChanged()));

  readonly totdConfig = computed(() => {
    switch (this.totdName()) {
      case '2010-2019-Senior':
        return {
          image: '2010 - 2019 TOTD - Senior.png',
          text: 'Senior - 2010 to 2019'
        };

      case '2010-2019-Junior':
        return {
          image: '2010 - 2019 TOTD - Junior.png',
          text: 'Junior - 2010 to 2019'
        };

      case '2000-2009-Senior':
        return {
          image: '2000 - 2009 TOTD - Senior.png',
          text: 'Senior - 2000 to 2009'
        };

      case '2000-2009-Junior':
        return {
          image: '2000 - 2009 TOTD - Junior.png',
          text: 'Junior - 2000 to 2009'
        };

      default:
        return {
          image: '',
          text: ''
        };
    }
  });
}