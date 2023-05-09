import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { API_URLS } from "../shared/api.urls";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  addReservation(reservation: Reservation): Observable<any> {
    return this.http.post(API_URLS.reservations, reservation);
  }

  getReservations(): Observable<Reservation[]> {   
    return this.http.get<Reservation[] >(API_URLS.reservations)
  }

  getReservation(id: number): Observable<Reservation> {

    return this.http.get<Reservation>(`${API_URLS.reservations}/${id}`);
  }

  deleteReservation(id: number): Observable<Reservation> {
    return this.http.delete<Reservation>(`${API_URLS.reservations}/${id}`);
  }

}
