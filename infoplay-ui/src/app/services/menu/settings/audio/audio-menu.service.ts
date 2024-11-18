import { Injectable } from '@angular/core';
import { MenuStateService } from '../../menu-state.service';
import { AudioService } from '../../../audio.service';
import { DefaultBack } from '../../../../menus/default-back';
import { WheelSelectorItem } from '../../../../models/components/wheel-selector-item';
import { SettingsMenuService } from '../settings-menu.service';
import { mapSinksToWheelSelectorItems } from '../../../mappers/sink-mapper';

@Injectable({
  providedIn: 'root',
})
export class AudioMenuService {
  public static readonly ID = 'audio-configuration-menu';

  private readonly backMenu: WheelSelectorItem = {
    ...DefaultBack,
    action: () => this.back(),
  };

  constructor(
    private readonly menuStateService: MenuStateService,
    private readonly audioService: AudioService
  ) {
    this.menuStateService.menuOpenedFiltered(AudioMenuService.ID).subscribe({
      next: () => this.openAudioConfigurationMenu(),
    });
  }

  openAudioConfigurationMenu() {
    this.audioService.sinks().subscribe({
      next: (sinks) => this.menuStateService.menuChanged.next({
        items: [
          this.backMenu,
          ...mapSinksToWheelSelectorItems(sinks).map((sink) => ({
            ...sink,
            action: () => this.setDefaultSink(sink),
          })),
        ],
      }),
    });
  }

  setDefaultSink(sink: WheelSelectorItem) {
    this.audioService.setDefaultSink(sink.id).subscribe({
      next: () => this.openAudioConfigurationMenu()
    })
  }

  back() {
    this.menuStateService.menuOpen.next({ menuId: SettingsMenuService.ID });
  }
}
