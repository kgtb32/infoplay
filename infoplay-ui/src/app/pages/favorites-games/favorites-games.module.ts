import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineListModule } from '../../components/inline-list/inline-list.module';
import { InlineListLayoutModule } from "../../layouts/inline-list-layout/inline-list-layout.module";
import { FavoritesGamesComponent } from './favorites-games.component';



@NgModule({
  declarations: [
    FavoritesGamesComponent
  ],
  imports: [
    CommonModule,
    InlineListModule,
    InlineListLayoutModule,
  ],
  exports: [
    FavoritesGamesComponent
  ]
})
export class FavoritesGamesModule { }
