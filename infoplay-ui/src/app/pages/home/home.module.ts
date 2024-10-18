import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeListModule } from '../../components/home-list/home-list.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeListModule
  ]
})
export class HomeModule { }
