import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cattle } from '../models/cattle.model';

@Injectable({
  providedIn: 'root'
})
export class CattleService {
  private apiUrl = 'http://localhost:3001/cattle';

  constructor(private http: HttpClient) {}

  getCattleList(): Observable<Cattle[]> {
    return this.http.get<Cattle[]>(this.apiUrl);
  }

  addCattle(cattle: Omit<Cattle, 'id'>): Observable<Cattle> {
    return this.http.post<Cattle>(this.apiUrl, cattle);
  }

  updateCattleStatus(id: number, status: 'available' | 'sold'): Observable<Cattle> {
    return this.http.patch<Cattle>(`${this.apiUrl}/${id}`, { status });
  }
}