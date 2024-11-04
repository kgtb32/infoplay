import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WheelSelectorItem } from '../models/components/wheel-selector-item';
import { Observable } from 'rxjs';
import { Platform } from '../models/api/platform';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private static readonly FAVORITES_URL = "/api/game/favorites"
  private static readonly GAME_BY_PLATFORM_URL = "/api/game/platform/"
  private static readonly PLAY_URL = "/api/game/run"
  private static readonly PLATFORMS_URL = "/api/platform"

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

  playGame(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${GameService.PLAY_URL}/${id}`)
  }
}
