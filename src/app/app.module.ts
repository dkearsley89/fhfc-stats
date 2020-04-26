import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule, NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { RecordsComponent } from './records/records.component';

import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data/data.service';
import { Top100Component } from './top100/top100.component';
import { HonourComponent } from './honour/honour.component';
import { LegendComponent } from './legend/legend.component';
import { AssociationComponent } from './association/association.component';
import { AwardsComponent } from './awards/awards.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatsComponent,
    RecordsComponent,
    HomeComponent,
    FooterComponent,
    Top100Component,
    HonourComponent,
    LegendComponent,
    AssociationComponent,
    AwardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbDropdownModule,
    NgbTypeaheadModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
