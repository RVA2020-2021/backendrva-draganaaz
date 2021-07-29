import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Klijent } from '../models/Klijent';

@Injectable({
  providedIn: 'root'
})

export class KlijentService {
  klijentEndpoint: string;

  constructor(private httpClient: HttpClient) {
    this.klijentEndpoint = `${environment.apiBaseUrl}/klijent`;
  }

  getAllKlijents(): Observable<any> {
    return this.httpClient.get(this.klijentEndpoint);
  }

  addKlijent(klijent: Klijent): Observable<any> {
    klijent.id=0;
    return this.httpClient.post(this.klijentEndpoint, klijent);
  }

  updateKlijent(klijent: Klijent): Observable<any> {
    return this.httpClient.put(this.klijentEndpoint, klijent);
  }

  deleteKlijent(id: number): Observable<any> {
    return this.httpClient.delete(`${this.klijentEndpoint}/${id}`);
  }
}

