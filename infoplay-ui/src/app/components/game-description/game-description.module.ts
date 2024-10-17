import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameDescriptionComponent } from './game-description.component';
import { IconDeviceGamepad2, IconTags } from 'angular-tabler-icons/icons'
import { TablerIconsModule } from 'angular-tabler-icons'

const icons = {
  IconDeviceGamepad2,
  IconTags
}

@NgModule({
  declarations: [
    GameDescriptionComponent,
  ],
  imports: [
    CommonModule,
    TablerIconsModule.pick(icons)
  ],
  exports: [
    GameDescriptionComponent
  ]
})
export class GameDescriptionModule { }
