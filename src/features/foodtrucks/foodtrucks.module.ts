import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FoodtrucksComponent } from '../foodtrucks/foodtrucks.component';
import { FoodtruckRoutingModule } from './foodtrucks-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { CreateFoodtruckComponent } from './create/create-foodtruck.component';


@NgModule({
  declarations: [
    FoodtrucksComponent,
    CreateFoodtruckComponent,
    


  ],
  imports: [
    CommonModule,
    FormsModule,
    FoodtruckRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
    
  ]
})
export class FoodtruckModule { }