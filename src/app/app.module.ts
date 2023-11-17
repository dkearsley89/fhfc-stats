import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbNavModule, NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AssociationComponent } from './association/association.component';
import { AwardsComponent } from './awards/awards.component';
import { DataService } from './data/data.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HonourComponent } from './honour/honour.component';
import { LegendComponent } from './legend/legend.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { RecordsComponent } from './records/records.component';
import { StatsComponent } from './stats/stats.component';
import { TeamOfTheDecadeComponent } from './totd/totd.component';
import { Top100Component } from './top100/top100.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StatsComponent,
    RecordsComponent,
    Top100Component,
    HonourComponent,
    LegendComponent,
    AssociationComponent,
    AwardsComponent,
    MilestonesComponent,
    TeamOfTheDecadeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbCollapseModule,
    FontAwesomeModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
