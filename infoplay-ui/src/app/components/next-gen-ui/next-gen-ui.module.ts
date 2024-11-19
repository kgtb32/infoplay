import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextGenButtonComponent } from './next-gen-button/next-gen-button.component';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [
    NextGenButtonComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule
  ],
  exports: [
    NextGenButtonComponent
  ]
})
export class NextGenUiModule { }
