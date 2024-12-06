import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    InlineListLayoutModule
  ]
})
export class SettingsModule { }
