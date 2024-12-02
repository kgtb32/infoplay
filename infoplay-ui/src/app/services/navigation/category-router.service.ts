import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryRouterService {

  private readonly routesCategoriesAssociation: { [key: string]: string } = {
    'Favoris': '',
    'Jeux': 'games',
    'Paramètres': 'settings',
    'Applications': 'apps',
    'Playlists': 'playlists'
  }

  constructor(private readonly router: Router) { }

  categoryChanged(categoryName: string) {
    this.router.navigate([this.routesCategoriesAssociation[categoryName]])
  }
}
