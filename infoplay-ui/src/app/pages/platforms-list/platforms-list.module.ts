import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformsListComponent } from './platforms-list.component';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';



@NgModule({
  declarations: [
    PlatformsListComponent
  ],
  imports: [
    CommonModule,
    InlineListLayoutModule
  ],
  exports: [
    PlatformsListComponent
  ]
})
export class PlatformsListModule { }
