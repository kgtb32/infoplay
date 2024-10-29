import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { MenuModule } from '../../services/menu/menu.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    InlineListLayoutModule,
  ]
})
export class HomeModule { }
