import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Kredit } from '../models/Kredit';

@Injectable({
  providedIn: 'root'
})

export class KreditService {
  kreditEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.kreditEndpoint = `${environment.apiBaseUrl}/kredit`;
  }

  getAllKredits(): Observable<any> {
    return this.httpClient.get(this.kreditEndpoint);
  }

  addKredit(kredit: Kredit): Observable<any> {
    return this.httpClient.post(this.kreditEndpoint, kredit);
  }

  updateKredit(kredit: Kredit): Observable<any> {
    return this.httpClient.put(this.kreditEndpoint, kredit);
  }

  deleteKlijent(id: number): Observable<any> {
    return this.httpClient.delete(`${this.kreditEndpoint}/${id}`);
  }
}

