import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NextgenUiMetadata } from '../../models/core/ui/next-gen-ui-metadata';
import { AudioService } from '../../services/audio.service';
import { audioMetadataManager, errorMetadaManager } from '../../services/settings/audio-metadata-manager';

@Component({
  selector: 'app-audio-settings',
  templateUrl: './audio-settings.component.html',
  styleUrl: './audio-settings.component.scss'
})
export class AudioSettingsComponent implements OnInit {
  private readonly backCallback: EventEmitter<void> = new EventEmitter()
  private readonly volumeChangedCallback: EventEmitter<number> = new EventEmitter()

  private defaultSink?: number

  metadata?: NextgenUiMetadata

  constructor(
    private readonly audioService: AudioService,
    private readonly router: Router
  ) {
    this.initEventListeners()
  }

  ngOnInit(): void {
    this.audioService.sinks().subscribe({
      next: sinks => {
        this.defaultSink = sinks.find((sink) => sink.name === "")?.index;
        this.metadata = audioMetadataManager(
          this.backCallback,
          this.volumeChangedCallback,
          sinks,
          "alsa_output.pci-0000_03_00.6.analog-stereo"
        )
      },
      error: () => {
        this.metadata = errorMetadaManager(this.backCallback)
      }
    })
  }

  private initEventListeners() {
    this.backCallback
      .asObservable()
      .subscribe({
        next: () => this.back()
      })
    this.volumeChangedCallback
      .asObservable()
      .subscribe({
        next: volume => this.volumeChanged(volume)
      })
  }

  private volumeChanged(volume: number) {
    if (this.defaultSink) {
      this.audioService.setSinkVolume(this.defaultSink, volume).subscribe({
        next: () => alert("changed !"),
      })
    }
  }

  private back() {
    this.router.navigate(["/settings"])
  }
}
