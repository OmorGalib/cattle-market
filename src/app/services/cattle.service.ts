import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CattleModel } from '../models/cattle.model';

@Injectable({
  providedIn: 'root',
})
export class CattleService {
  private apiUrl = 'http://localhost:3001/cattle';

  constructor(private http: HttpClient) {}

  getCattleList(): Observable<CattleModel[]> {
    return this.http.get<CattleModel[]>(this.apiUrl);
  }

  addCattle(cattle: Omit<CattleModel, 'id'>): Observable<CattleModel> {
    return this.http.post<CattleModel>(this.apiUrl, cattle);
  }

  updateCattleStatus(
    id: number,
    status: 'available' | 'sold'
  ): Observable<CattleModel> {
    return this.http.patch<CattleModel>(`${this.apiUrl}/${id}`, { status });
  }
}
