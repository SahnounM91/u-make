import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodTrucksService } from '../../../core/http/food-trucks.service';
import { FoodTruck } from "../../../core/model/food-truck";

@Component({
  selector: 'app-create-foodtruck',
  templateUrl: './create-foodtruck.component.html',
  styleUrls: ['./create-foodtruck.component.scss']
})
export class CreateFoodtruckComponent implements OnInit {

  constructor(private fb: FormBuilder, private foodTrucksService: FoodTrucksService, private router: Router) { }
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      image: [''],
      location: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log(this.form);
      return;
    }
    const newFoodTruck: FoodTruck = {
      id:Math.floor(1000 + Math.random() * 9000),
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
      location: this.form.value.location,
      reservations: [], // no reservations yet
    };
    this.foodTrucksService.addFoodtruck(newFoodTruck).subscribe(() => {
      this.router.navigate(['/foodtrucks']);
      this.form.reset();
    }, (error) => {
      console.error(error);
    });
  }
}
