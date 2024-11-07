import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';



@NgModule({
  declarations: [
    VirtualKeyboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VirtualKeyboardComponent
  ]
})
export class VirtualKeyboardModule { }
