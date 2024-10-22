import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLoadComponent } from './game-load.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { GameDescriptionModule } from "../../components/game-description/game-description.module";

@NgModule({
  declarations: [
    GameLoadComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    GameDescriptionModule
  ]
})
export class GameLoadModule { }
