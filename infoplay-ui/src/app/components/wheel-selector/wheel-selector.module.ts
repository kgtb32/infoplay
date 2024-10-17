import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelSelectorComponent } from './wheel-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { GameDescriptionModule } from '../game-description/game-description.module';


@NgModule({
  declarations: [
    WheelSelectorComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    GameDescriptionModule,
  ],
  exports: [
    WheelSelectorComponent
  ]
})
export class WheelSelectorModule { }
