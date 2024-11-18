import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sink } from '../models/core/audio/sink';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private readonly selectAudioInstance: HTMLAudioElement = new Audio()
  private readonly validAudioInstance: HTMLAudioElement = new Audio()

  private static readonly PULSEAUDIO_SINKS_LIST_ENDPOINT = "/api/audio/sinks"
  private static readonly PULSEAUDIO_SET_DEFAULT_SINK_ENDPOINT = "/api/audio/setDefault"
  private static readonly PULSEAUDIO_SET_SINK_VOLUME_ENDPOINT = "/api/audio/setVolume"

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.selectAudioInstance.src = "/select.ogg"
    this.selectAudioInstance.volume = 1
    this.validAudioInstance.src = "/valid.ogg"
  }

  select() {
    this.playAudio(this.selectAudioInstance)
  }

  valid() {
    this.playAudio(this.validAudioInstance)
  }

  playAudio(instance: HTMLAudioElement) {
    instance.play()
  }

  sinks(): Observable<Sink[]> {
    return this.httpClient.get<Sink[]>(AudioService.PULSEAUDIO_SINKS_LIST_ENDPOINT)
  }

  setDefaultSink(index: number): Observable<boolean> {
    return this.httpClient.post<boolean>(`${AudioService.PULSEAUDIO_SET_DEFAULT_SINK_ENDPOINT}/${index}`, {})
  }

  setSinkVolume(index: number, volume: number): Observable<boolean> {
    return this.httpClient.post<boolean>(`${AudioService.PULSEAUDIO_SET_SINK_VOLUME_ENDPOINT}/${index}/${volume}`, {})
  }
}
