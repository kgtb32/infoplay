import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineListComponent } from './inline-list.component';



@NgModule({
  declarations: [
    InlineListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InlineListComponent
  ]
})
export class InlineListModule { }
