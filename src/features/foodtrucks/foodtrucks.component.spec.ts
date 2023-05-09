import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FoodtrucksComponent } from './foodtrucks.component';
import { FoodTrucksService } from '../../core/http/food-trucks.service';
import { FoodTruck } from '../../core/model/food-truck';
import { Router } from '@angular/router';

describe('FoodtrucksComponent', () => {
  let component: FoodtrucksComponent;
  let fixture: ComponentFixture<FoodtrucksComponent>;
  let foodTrucksService: jasmine.SpyObj<FoodTrucksService>;

  beforeEach(async () => {
    const foodTrucksServiceSpy = jasmine.createSpyObj('FoodTrucksService', ['getFoodTrucks']);

    await TestBed.configureTestingModule({
      declarations: [FoodtrucksComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: FoodTrucksService, useValue: foodTrucksServiceSpy }]
    }).compileComponents();

    foodTrucksService = TestBed.inject(FoodTrucksService) as jasmine.SpyObj<FoodTrucksService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodtrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should navigate to /reservations/new with the correct query params when reserveFoodtruck is invoked', () => {
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');
    const foodTruckId = 1234;
    component.reserveFoodtruck(foodTruckId);
    expect(routerSpy).toHaveBeenCalledWith(['/reservations/new'], { queryParams: { foodtruckId: foodTruckId } });
  });

})