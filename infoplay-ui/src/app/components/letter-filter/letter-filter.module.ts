import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterFilterComponent } from './letter-filter.component';



@NgModule({
  declarations: [
    LetterFilterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LetterFilterComponent
  ]
})
export class LetterFilterModule { }
