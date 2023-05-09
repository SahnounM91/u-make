import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsComponent } from './reservations.component';
import { CreateReservationComponent } from "./create/create-reservation/create-reservation.component";

const routes: Routes = [
  
  { path: '', component: ReservationsComponent },
  { path: 'new', component: CreateReservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
