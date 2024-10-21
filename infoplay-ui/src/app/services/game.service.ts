import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private static readonly FAVORITES_URL = "/api/game/favorites"

  constructor(private readonly httpClient: HttpClient) { }

  getFavoritesGames() {
    return this.httpClient.get(GameService.FAVORITES_URL)
  }
}
