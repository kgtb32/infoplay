import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WifiSettingsComponent } from './wifi-settings.component';
import { NextGenUiModule } from '../../components/next-gen-ui/next-gen-ui.module';
import { NextGenModule } from "../../layouts/next-gen/next-gen.module";



@NgModule({
  declarations: [
    WifiSettingsComponent
  ],
  imports: [
    CommonModule,
    NextGenUiModule,
    NextGenModule
  ]
})
export class WifiSettingsModule { }
