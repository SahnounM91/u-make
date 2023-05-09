import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReservationsService } from './reservations.service';
import { Reservation } from '../model/reservation';
import { API_URLS } from "../shared/api.urls";

describe('ReservationsService', () => {
  let service: ReservationsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservationsService]
    });

    service = TestBed.inject(ReservationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getReservations', () => {
    it('should return an Observable<Reservation[]>', () => {
      const dummyReservations: Reservation[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', foodTruckId: 1, reservationDate: new Date(), time:"18:30" },
        { id: 2, firstName: 'Jane', lastName: 'Doe', foodTruckId: 2, reservationDate: new Date(), time:"17:55" }
      ];

      service.getReservations().subscribe(reservations => {
        expect(reservations.length).toBe(2);
        expect(reservations).toEqual(dummyReservations);
      });

      const request = httpMock.expectOne(`${API_URLS.reservations}`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyReservations);
    });
  });

  describe('getReservation', () => {
    it('should return an Observable<Reservation>', () => {
      const dummyReservation: Reservation = { id: 1, firstName: 'John', lastName: 'Doe', foodTruckId: 1, reservationDate: new Date(), time:"17:55" };

      service.getReservation(1).subscribe(reservation => {
        expect(reservation).toEqual(dummyReservation);
      });

      const request = httpMock.expectOne(`${API_URLS.reservations}/1`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyReservation);
    });
  });

  describe('addReservation', () => {
    it('should return an Observable<any>', () => {
      const dummyReservation: Reservation = { id: 555, firstName: 'John', lastName: 'Doe', foodTruckId: 1, reservationDate: new Date(), time:"13:55" };

      service.addReservation(dummyReservation).subscribe(response => {
        expect(response).toBeDefined();
      });

      const request = httpMock.expectOne(`${API_URLS.reservations}`);
      expect(request.request.method).toBe('POST');
      request.flush({});
    });
  });

  describe('deleteReservation', () => {
    it('should return an Observable<Reservation>', () => {
      const dummyReservation: Reservation = { id: 1, firstName: 'John', lastName: 'Doe', foodTruckId: 1, reservationDate: new Date(), time:"18:55" };

      service.deleteReservation(1).subscribe(reservation => {
        expect(reservation).toEqual(dummyReservation);
      });

      const request = httpMock.expectOne(`${API_URLS.reservations}/1`);
      expect(request.request.method).toBe('DELETE');
      request.flush(dummyReservation);
    });
  });
});
