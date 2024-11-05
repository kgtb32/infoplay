import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineListLayoutComponent } from './inline-list-layout.component';
import { CategoriesHeaderModule } from "../../components/categories-header/categories-header.module";
import { GameDescriptionModule } from "../../components/game-description/game-description.module";
import { InlineListModule } from '../../components/inline-list/inline-list.module';
import { LetterFilterModule } from '../../components/letter-filter/letter-filter.module';



@NgModule({
  declarations: [
    InlineListLayoutComponent
  ],
  imports: [
    CommonModule,
    CategoriesHeaderModule,
    GameDescriptionModule,
    InlineListModule,
    LetterFilterModule
  ],
  exports: [
    InlineListLayoutComponent
  ]
})
export class InlineListLayoutModule { }
