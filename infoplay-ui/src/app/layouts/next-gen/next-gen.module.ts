import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgComponentOutlet } from '@angular/common';
import { NextGenComponent } from './next-gen.component';
import { NextGenUiModule } from '../../components/next-gen-ui/next-gen-ui.module';



@NgModule({
  declarations: [
    NextGenComponent
  ],
  imports: [
    CommonModule,
    NextGenUiModule,
    AsyncPipe,
    NgComponentOutlet,
  ],
  exports: [
    NextGenComponent
  ]
})
export class NextGenModule { }
