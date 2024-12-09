import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeRecords, LastUpdated, AssociationRecords, YearlyAwards, HonourBoard, Milestones, Record, Records, Players, Coaches } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getHomeRecords(): Observable<HomeRecords> {
    return this.http.get<HomeRecords>('/json/homeRecords.json?noCache=' + Math.random());
  }

  getLastUpdatedDate(): Observable<LastUpdated> {
    return this.http.get<LastUpdated>('/json/lastUpdated.json?noCache=' + Math.random());
  }

  getAssociationRecordData(): Observable<AssociationRecords> {
    return this.http.get<AssociationRecords>('/json/association.json?noCache=' + Math.random());
  }

  getYearlyAwardsdData(year: string): Observable<YearlyAwards> {
    return this.http.get<YearlyAwards>('/json/Yearly Awards - ' + year + '.json?noCache=' + Math.random());
  }

  getPlayerData(id: string): Observable<any> {
    return this.http.get<any>('/json/' + id + '.json?noCache=' + Math.random());
  }

  getCoachData(id: string): Observable<any> {
    return this.http.get<any>('/json/' + id + '-coach.json?noCache=' + Math.random());
  }

  getPlayersData(): Observable<Players> {
    return this.http.get<any>('/json/players.json?noCache=' + Math.random());
  }

  getCoachesData(): Observable<Coaches> {
    return this.http.get<any>('/json/coaches.json?noCache=' + Math.random());
  }

  getRecordsTop5Data(): Observable<Records> {
    return this.http.get<Records>('/json/records.json?noCache=' + Math.random());
  }

  getRecordsTop100Data(recordName: string): Observable<Record> {
    return this.http.get<Record>('/json/' + recordName + '.json?noCache=' + Math.random());
  }

  getHonourBoardData(boardName: string): Observable<HonourBoard> {
    return this.http.get<HonourBoard>('/json/Honour Board - ' + boardName + '.json?noCache=' + Math.random());
  }

  getMilestonesData(): Observable<Milestones> {
    return this.http.get<Milestones>('/json/milestones.json?noCache=' + Math.random());
  }
}