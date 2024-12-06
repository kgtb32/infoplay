import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps.component';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';



@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    InlineListLayoutModule
  ]
})
export class AppsModule { }
