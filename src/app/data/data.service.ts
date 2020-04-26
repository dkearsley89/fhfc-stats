import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssociationRecords, HonourBoard, LastUpdated, Record, Records, YearlyAwards } from '../model/model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  getPlayerData(id: string): Observable<any> {
    return this.http.get<any>('/assets/json/' + id + '.json?noCache=' + Math.random());
  }

  getPlayersData(): Observable<any> {
    return this.http.get<any>('/assets/json/players.json?noCache=' + Math.random());
  }

  getLastUpdatedDate(): Observable<LastUpdated> {
    return this.http.get<LastUpdated>('/assets/json/lastUpdated.json?noCache=' + Math.random());
  }

  getHomeRecords(): Observable<Records> {
    return this.http.get<Records>('/assets/json/homeRecords.json?noCache=' + Math.random());
  }

  getRecordsTop5Data(): Observable<Records> {
    return this.http.get<Records>('/assets/json/records.json?noCache=' + Math.random());
  }

  getRecordsTop100Data(recordName: string): Observable<Record> {
    return this.http.get<Record>('/assets/json/' + recordName + '.json?noCache=' + Math.random());
  }

  getHonourBoardData(boardName: string): Observable<HonourBoard> {
    return this.http.get<HonourBoard>('/assets/json/Honour Board - ' + boardName + '.json?noCache=' + Math.random());
  }

  getAssociationRecordData(): Observable<AssociationRecords> {
    return this.http.get<AssociationRecords>('/assets/json/association.json?noCache=' + Math.random());
  }

  getYearlyAwardsdData(year: string): Observable<YearlyAwards> {
    return this.http.get<YearlyAwards>('/assets/json/Yearly Awards - ' + year + '.json?noCache=' + Math.random());
  }
}