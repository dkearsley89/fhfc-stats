import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

import { Records } from '../model/record.model';

@Injectable()
export class DataService {
  recordsData: Records = { records: null } as Records;

  constructor(private http: HttpClient) { }

  getRecordsTop5Data() {
    return this.http.get<Records>('/assets/json/records.json?noCache=' + Math.random())
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getRecordsTop100Data() {
    return this.http.get<Records>('/assets/json/recordsTop100.json?noCache=' + Math.random())
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an ErrorObservable with a user-facing error message
    //return new throwError(
    //  'Something bad happened; please try again later.');
    return null;
  };
}