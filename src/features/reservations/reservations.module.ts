import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { CreateReservationComponent } from './create/create-reservation/create-reservation.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReservationsComponent,
    CreateReservationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReservationsRoutingModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    ReactiveFormsModule
  ]
})
export class ReservationsModule { }
