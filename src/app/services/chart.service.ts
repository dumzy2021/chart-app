import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CoinData } from '../models/coins.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-My-Custom-Header': `${environment.API_KEY}`,
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private baseUrl = 'https://api.coinranking.com/v2/coins';

  constructor(private http: HttpClient) {}

  coinsData() {
    const url = `${this.baseUrl}`;
    return this.http.get<{ data: CoinData }>(url, httpOptions);
  }
}
