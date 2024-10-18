import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    InlineListLayoutModule
  ]
})
export class HomeModule { }
