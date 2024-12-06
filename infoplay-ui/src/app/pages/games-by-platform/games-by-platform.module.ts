import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { GamesByPlatformComponent } from './games-by-platform.component';

@NgModule({
  declarations: [
    GamesByPlatformComponent
  ],
  imports: [
    CommonModule,
    InlineListLayoutModule
  ]
})
export class GamesByPlatformModule { }
