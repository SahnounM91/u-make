import { Component, OnInit } from '@angular/core';
import { FoodTrucksService } from '../../core/http/food-trucks.service';
import { FoodTruck } from '../../core/model/food-truck';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodtrucks',
  templateUrl: './foodtrucks.component.html',
  styleUrls: ['./foodtrucks.component.scss']
})
export class FoodtrucksComponent implements OnInit {

  foodtrucks$: Observable<FoodTruck[]> | undefined;
  foodtrucks: FoodTruck[] = []
  pagedFoodTrucks: FoodTruck[] | undefined;
  totalPages: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  pages: number[] = [];


  constructor(private router: Router, private foodTrucksService: FoodTrucksService) { }

  ngOnInit(): void {
    this.getFoodTrucks();
  }

  getFoodTrucks(): void {
    this.foodtrucks$ = this.foodTrucksService.getFoodTrucks();
    this.foodtrucks$.subscribe((foodTrucks: FoodTruck[]) => {
      this.totalPages = Math.ceil(foodTrucks.length / this.itemsPerPage);
      this.setCurrentPage(1);
    });
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.foodtrucks$?.subscribe((foodTrucks: FoodTruck[]) => {
      this.pagedFoodTrucks = foodTrucks.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    });
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.foodtrucks.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  reserveFoodtruck(foodTruckId: number) {
    this.router.navigate(['/reservations/new'], { queryParams: { foodTruckId } });
  }
}
