import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WheelSelectorItem } from '../models/components/wheel-selector-item';
import { Observable } from 'rxjs';
import { Platform } from '../models/api/platform';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private static readonly BASE_URL = "/api"
  private static readonly GAME_BASE_URL = GameService.BASE_URL + "/game"
  private static readonly FAVORITES_URL = GameService.GAME_BASE_URL + "/favorites"
  private static readonly GAME_BY_PLATFORM_URL = GameService.GAME_BASE_URL + "/platform/"
  private static readonly PLAY_URL = GameService.GAME_BASE_URL + "/run"
  private static readonly PLATFORMS_URL = GameService.BASE_URL + "/platform"

  constructor(private readonly httpClient: HttpClient) { }

  getFavoritesGames(): Observable<WheelSelectorItem[]> {
    return this.httpClient.get<WheelSelectorItem[]>(GameService.FAVORITES_URL)
  }

  getPlatforms(): Observable<Platform[]> {
    return this.httpClient.get<Platform[]>(GameService.PLATFORMS_URL + "/all")
  }

  getGamesByPlatformAndLetter(platformId: string, letter: string): Observable<WheelSelectorItem[]> {
    return this.httpClient.get<WheelSelectorItem[]>(GameService.GAME_BY_PLATFORM_URL + platformId, {
      params: {
        letter
      }
    })
  }

  toggleFavoritesGames(id: number): Observable<WheelSelectorItem[]> {
    return this.httpClient.put<WheelSelectorItem[]>(`${GameService.GAME_BASE_URL}/${id}/toggleFavorites`, {})
  }

  playGame(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${GameService.PLAY_URL}/${id}`)
  }
}
