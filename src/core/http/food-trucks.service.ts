import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { FoodTruck } from '../model/food-truck';
import { Reservation } from '../model/reservation';
import { API_URLS } from "../shared/api.urls";

@Injectable({
  providedIn: 'root'
})
export class FoodTrucksService {
  constructor(private http: HttpClient) {

  }

  addFoodtruck(foodtruck: FoodTruck): Observable<any> {
    return this.http.post(API_URLS.foodtrucks, foodtruck);
  }

  getFoodTrucks(): Observable<FoodTruck[]> {
    return this.http.get<FoodTruck[]>(API_URLS.foodtrucks);
  }

  getFoodTruck(id: string): Observable<FoodTruck> {
    
    return this.http.get<FoodTruck>(`${API_URLS.foodtrucks}/${id}`);
  }

  updateFoodTruckWithReservation(foodTruckId: string, reservation: Reservation): Observable<FoodTruck> {
    return this.getFoodTruck(foodTruckId)
      .pipe(
        switchMap(foodTruck => {
          const updatedFoodTruck = { ...foodTruck };
          updatedFoodTruck.reservations.push(reservation.id);
          return this.http.put<FoodTruck>(`${API_URLS.foodtrucks}/${foodTruckId}`, updatedFoodTruck);
        })
      );
  }
}
