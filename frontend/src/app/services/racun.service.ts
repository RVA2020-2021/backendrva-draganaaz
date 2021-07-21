import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Racun } from '../models/Racun';

@Injectable({
  providedIn: 'root'
})

export class RacunService {
  racunEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.racunEndpoint = `${environment.apiBaseUrl}/racun`;
  }

  getAllRacuns(): Observable<any> {
    return this.httpClient.get(this.racunEndpoint);
  }

  addRacun(racun: Racun): Observable<any> {
    return this.httpClient.post(this.racunEndpoint, racun);
  }

  updateRacun(racun: Racun): Observable<any> {
    return this.httpClient.put(this.racunEndpoint, racun);
  }

  deleteRacun(id: number): Observable<any> {
    return this.httpClient.delete(`${this.racunEndpoint}/${id}`);
  }
}

