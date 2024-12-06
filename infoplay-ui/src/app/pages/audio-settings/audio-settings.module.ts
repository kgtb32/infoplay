import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioSettingsComponent } from './audio-settings.component';
import { NextGenModule } from "../../layouts/next-gen/next-gen.module";



@NgModule({
  declarations: [
    AudioSettingsComponent
  ],
  imports: [
    CommonModule,
    NextGenModule
  ]
})
export class AudioSettingsModule { }
