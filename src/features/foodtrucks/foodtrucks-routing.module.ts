import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodtrucksComponent } from '../foodtrucks/foodtrucks.component';
import { CreateFoodtruckComponent } from './create/create-foodtruck.component'

const routes: Routes = [
  
  { path: '', component: FoodtrucksComponent },
  { path: 'createfood', component: CreateFoodtruckComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodtruckRoutingModule { }
