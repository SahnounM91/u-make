import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsComponent } from './reservations.component';
import { ReservationsService } from '../../core/http/reservations.service';
import { of } from 'rxjs';
import { Reservation } from 'src/core/model/reservation';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;
  let reservationsService: jasmine.SpyObj<ReservationsService>;

  beforeEach(async () => {
    reservationsService = jasmine.createSpyObj('ReservationsService', ['getReservations', 'deleteReservation']);

    await TestBed.configureTestingModule({
      declarations: [ReservationsComponent],
      providers: [
        { provide: ReservationsService, useValue: reservationsService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
  });

  it('should fetch reservations on initialization', () => {
    const date = new Date()
    reservationsService.getReservations.and.returnValue(of([{ id: 1, foodTruckId: 1, firstName: 'test', lastName: 'test', time: '15:55', reservationDate: date },
    ]));
    fixture.detectChanges();
    expect(component.reservations).toEqual([{ id: 1, foodTruckId: 1, firstName: 'test', lastName: 'test', time: '15:55', reservationDate: date },
    ]);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should delete a reservation', () => {
    const reservations: Reservation[] = [
      { id: 1, foodTruckId: 1, lastName: 'test', firstName: 'test', reservationDate: new Date(), time: '18:55' },
      { id: 2, foodTruckId: 2, lastName: 'Jane', firstName: 'humo', reservationDate: new Date(), time: '15:22' }
    ];
    const reservation: Reservation = { id: 1, foodTruckId: 1, firstName: 'John', lastName: 'toto', reservationDate: new Date(), time: '14:33' };
    component.reservations = [reservation];

    reservationsService.getReservations.and.returnValue(of(reservations));
    spyOn(component, 'getReservations').and.callThrough();

    component.ngOnInit();

    reservationsService.deleteReservation.and.returnValue(of({ id: 0, foodTruckId: 0, lastName: '', firstName: '', time: '15:55', reservationDate: new Date() }));
    component.onDeleteReservation(reservation);

    expect(reservationsService.deleteReservation).toHaveBeenCalledWith(reservation.id);
    expect(component.getReservations).toHaveBeenCalled();
  });
});