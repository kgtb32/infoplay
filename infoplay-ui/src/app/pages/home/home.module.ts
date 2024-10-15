import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { WheelSelectorModule } from "../../components/wheel-selector/wheel-selector.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    WheelSelectorModule
  ]
})
export class HomeModule { }
