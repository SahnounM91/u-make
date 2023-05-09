import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FoodTrucksService } from '../../../core/http/food-trucks.service';
import { CreateFoodtruckComponent } from './create-foodtruck.component';
import { of } from 'rxjs';

describe('CreateFoodtruckComponent', () => {
  let component: CreateFoodtruckComponent;
  let fixture: ComponentFixture<CreateFoodtruckComponent>;
  let foodTrucksServiceSpy: jasmine.SpyObj<FoodTrucksService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const foodTrucksSpy = jasmine.createSpyObj('FoodTrucksService', ['addFoodtruck']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreateFoodtruckComponent],
      providers: [
        FormBuilder,
        { provide: FoodTrucksService, useValue: foodTrucksSpy },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    foodTrucksServiceSpy = TestBed.inject(FoodTrucksService) as jasmine.SpyObj<FoodTrucksService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFoodtruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should add a new food truck and navigate to the food trucks list', () => {
      const newFoodTruck = {
        id: 1234,
        name: 'Test Food Truck',
        description: 'Test description',
        image: 'test-image.jpg',
        location: 'Test location',
        reservations: []
      };
      foodTrucksServiceSpy.addFoodtruck.and.returnValue(of(newFoodTruck));

      component.form.setValue({
        name: 'Test Food Truck',
        description: 'Test description',
        image: 'test-image.jpg',
        location: 'Test location'
      });
      component.onSubmit();

      expect(foodTrucksServiceSpy.addFoodtruck).toHaveBeenCalledWith(jasmine.objectContaining({
        name: 'Test Food Truck',
        description: 'Test description',
        image: 'test-image.jpg',
        location: 'Test location'
      }));
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/foodtrucks']);
    });

    it('should not add a new food truck if the form is invalid', () => {
      component.form.setValue({
        name: '',
        description: '',
        image: '',
        location: ''
      });
      component.onSubmit();

      expect(foodTrucksServiceSpy.addFoodtruck).not.toHaveBeenCalled();
      expect(routerSpy.navigate).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalse();
    });
  });
});
