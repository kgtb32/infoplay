import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private readonly selectAudioInstance: HTMLAudioElement = new Audio()
  private readonly validAudioInstance: HTMLAudioElement = new Audio()

  constructor() {
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
}
