import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/foodtrucks', pathMatch: 'full' },
  { path: 'foodtrucks', loadChildren: () => import('../features/foodtrucks/foodtrucks.module').then(m => m.FoodtruckModule) },
  { path: 'reservations', loadChildren: () => import('../features/reservations/reservations.module').then(m => m.ReservationsModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
