import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Vehicle {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getVeiculos() {

    return this.http
      .get<any>(`${this.apiUrl}/vehicles`)
      .pipe(
        pluck('vehicles'),
        map((veiculos: any[]) => veiculos)
      );

  }

  getVehicleData(vin: string) {

    return this.http
      .post<any>(
        `${this.apiUrl}/vehicleData`,
        { vin }
      )
      .pipe(
        map(dados => dados)
      );

  }

}