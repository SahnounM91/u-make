import { Reservation } from "./reservation";

export interface FoodTruck {
    id: number;
    name: string;
    description: string,
    image: string,
    location: string,
    reservations: number[];

  }