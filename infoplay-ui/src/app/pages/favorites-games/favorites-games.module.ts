import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesGamesComponent } from './favorites-games.component';
import { InlineListModule } from '../../components/inline-list/inline-list.module';
import { InlineListLayoutModule } from "../../layouts/inline-list-layout/inline-list-layout.module";
import { MenuModule } from '../../services/menu/menu.module';



@NgModule({
  declarations: [
    FavoritesGamesComponent
  ],
  imports: [
    CommonModule,
    InlineListModule,
    InlineListLayoutModule,
    MenuModule,
  ],
  exports: [
    FavoritesGamesComponent
  ]
})
export class FavoritesGamesModule { }
