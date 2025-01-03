import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-totd',
  imports: [RouterModule, NgbDropdownModule],
  templateUrl: './totd.component.html',
  styleUrl: './totd.component.css'
})
export class TotdComponent implements OnInit {
  totdImageSource: string = '';
  totdDropdownText: string = '';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['totdName'] == '2010-2019-Senior') {
        this.totdImageSource = '2010 - 2019 TOTD - Senior.png';
        this.totdDropdownText = 'Senior - 2010 to 2019';
      } else if (params['totdName'] == '2010-2019-Junior') {
        this.totdImageSource = '2010 - 2019 TOTD - Junior.png';
        this.totdDropdownText = 'Junior - 2010 to 2019';
      } else if (params['totdName'] == '2000-2009-Senior') {
        this.totdImageSource = '2000 - 2009 TOTD - Senior.png';
        this.totdDropdownText = 'Senior - 2000 to 2009';
      } else if (params['totdName'] == '2000-2009-Junior') {
        this.totdImageSource = '2000 - 2009 TOTD - Junior.png';
        this.totdDropdownText = 'Junior - 2000 to 2009';
      }
    });
  }
}