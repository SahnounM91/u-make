import { FoodTruck } from './food-truck';

export interface Reservation {
  id: number;
  foodTruckId: number;
  foodTruck?: FoodTruck;
  firstName: string;
  lastName: string;
  reservationDate: Date;
  time: string
}