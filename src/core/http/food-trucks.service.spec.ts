import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FoodTruck } from '../model/food-truck';
import { Reservation } from '../model/reservation';
import { API_URLS } from "../shared/api.urls";
import { FoodTrucksService } from './food-trucks.service';

describe('FoodTrucksService', () => {
  let service: FoodTrucksService;
  let httpMock: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FoodTrucksService]
    });
    service = TestBed.inject(FoodTrucksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<FoodTruck[]> when calling getFoodTrucks()', () => {
    const mockFoodTrucks: FoodTruck[] = [{ id: 1, name: 'Food Truck 1', description: 'Description 1', image: 'Image 1', location: 'Location 1', reservations: [] }, { id: 2, name: 'Food Truck 2', description: 'Description 2', image: 'Image 2', location: 'Location 2', reservations: [] }];
    service.getFoodTrucks().subscribe((foodTrucks: FoodTruck[]) => {
      expect(foodTrucks.length).toBe(2);
      expect(foodTrucks).toEqual(mockFoodTrucks);
    });
    const req = httpMock.expectOne(API_URLS.foodtrucks);
    expect(req.request.method).toBe('GET');
    req.flush(mockFoodTrucks);
  });

  it('should return an Observable<FoodTruck> when calling getFoodTruck(id: string)', () => {
    const mockFoodTruck: FoodTruck = { id: 1, name: 'Food Truck 1', description: 'Description 1', image: 'Image 1', location: 'Location 1', reservations: [] };
    const id = '1';
    service.getFoodTruck(id).subscribe((foodTruck: FoodTruck) => {
      expect(foodTruck.id).toBe(1);
      expect(foodTruck).toEqual(mockFoodTruck);
    });
    const req = httpMock.expectOne(`${API_URLS.foodtrucks}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFoodTruck);
  });

  it('should return an Observable<any> when calling addFoodtruck(foodtruck: FoodTruck)', () => {
    const mockFoodTruck: FoodTruck = { id: 1, name: 'Food Truck 1', description: 'Description 1', image: 'Image 1', location: 'Location 1', reservations: [] };
    service.addFoodtruck(mockFoodTruck).subscribe((res: any) => {
      expect(res).toBeDefined();
    });
    const req = httpMock.expectOne(API_URLS.foodtrucks);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });


  it('should return an Observable<FoodTruck> when calling updateFoodTruckWithReservation(foodTruckId: string, reservation: Reservation)', () => {
    const mockFoodTruck: FoodTruck = { id: 1, name: 'Food Truck 1', description: 'Description 1', image: 'Image 1', location: 'Location 1', reservations: [] };
    const mockReservation: Reservation = { id: 1, firstName: 'Reservation 1', lastName:'reservation 1', foodTruckId: 1, reservationDate : new Date(), time:'18:55' };

    service.updateFoodTruckWithReservation('1', mockReservation).subscribe((result: FoodTruck) => {
      expect(result).toBeDefined();
      expect(result.reservations).toContain(mockReservation.id);
    });

    const req = httpMock.expectOne(`${API_URLS.foodtrucks}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockFoodTruck);

    const putReq = httpMock.expectOne(`${API_URLS.foodtrucks}/1`);
    expect(putReq.request.method).toEqual('PUT');
    putReq.flush(mockFoodTruck);
  });
});
