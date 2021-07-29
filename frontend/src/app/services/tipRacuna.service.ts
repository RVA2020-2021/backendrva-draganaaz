import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TipRacuna } from '../models/TipRacuna';

@Injectable({
  providedIn: 'root'
})

export class TipRacunaService {
  tipRacunaEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.tipRacunaEndpoint = `${environment.apiBaseUrl}/tipRacuna`;
  }

  getAllTipRacunas(): Observable<any> {
    return this.httpClient.get(this.tipRacunaEndpoint);
  }

  addTipRacuna(tipRacuna: TipRacuna): Observable<any> {
    tipRacuna.id=0;
    return this.httpClient.post(this.tipRacunaEndpoint, tipRacuna);
  }

  updateTipRacuna(tipRacuna: TipRacuna): Observable<any> {
    return this.httpClient.put(this.tipRacunaEndpoint, tipRacuna);
  }

  deleteTipRacuna(id: number): Observable<any> {
    return this.httpClient.delete(`${this.tipRacunaEndpoint}/${id}`);
  }
}

