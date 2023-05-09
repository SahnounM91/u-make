import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation } from 'src/core/model/reservation';
import { ReservationsService } from "../../../../core/http/reservations.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FoodTrucksService } from 'src/core/http/food-trucks.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit {


  reservationForm!: FormGroup;
  foodTruck: any;
  foodTruckId: any;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private reservationsService: ReservationsService,
    private route: ActivatedRoute,
    private foodTrucksService: FoodTrucksService,
    private router: Router) { }

  ngOnInit(): void {
    this.foodTruckId = this.route.snapshot.queryParamMap.get('foodtruckId');
    this.http.get<any>(`/api/foodtrucks/${this.foodTruckId}`).subscribe(
      data => {
        this.foodTruck = data;
      },
      error => {
        console.log(error);
      }
    );
    this.reservationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      date: [''],
      time: ['']
    });
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      return;
    }
    const newReservation: Reservation = {
      id: Math.floor(1000 + Math.random() * 9000),
      foodTruckId: this.foodTruckId,
      firstName: this.reservationForm.value.firstName,
      lastName: this.reservationForm.value.lastName,
      reservationDate: new Date(),
      time: this.reservationForm.value.time

    };
    this.reservationsService.addReservation(newReservation).subscribe(() => {
      this.router.navigate(['/reservations']);
      this.reservationForm.reset();
    }, (error: any) => {
      console.error(error);
      console.error('Erreur lors de la création du food truck');
    });
    this.foodTrucksService.updateFoodTruckWithReservation(this.foodTruckId, newReservation);


  }

}
