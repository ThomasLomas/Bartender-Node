import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Pump {
  name: string;
  pin: number;
  ingredient: string;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PumpService {

  constructor(private http: HttpClient) { }

  create(pump: Pump): Promise<Pump> {
    return this.http.post<Pump>(`${environment.httpPath}/pumps`, pump).toPromise();
  }

  delete(pump: Pump): Promise<any> {
    return this.http.delete(`${environment.httpPath}/pumps/${pump._id}`).toPromise();
  }
}
