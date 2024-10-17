import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelSelectorComponent } from './wheel-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    WheelSelectorComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    WheelSelectorComponent
  ]
})
export class WheelSelectorModule { }
