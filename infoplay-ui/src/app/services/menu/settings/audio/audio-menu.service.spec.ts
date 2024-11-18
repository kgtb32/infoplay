import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { InlineListMetadata } from '../../../../models/components/inline-list-metadata';
import { AudioService } from '../../../audio.service';
import { MenuStateService } from '../../menu-state.service';
import { AudioMenuService } from './audio-menu.service';
import { mockedSinks, sinksAsWheelSelectorItem } from './audio-sinks-mocks.spec';
import { SettingsMenuService } from '../settings-menu.service';
import { MenuOpenState } from '../../../../models/core/state/menu-open-state';

describe('AudioMenuService', () => {
  let menuStateService: MenuStateService
  let audioService: AudioService

  let service: AudioMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    audioService = TestBed.inject(AudioService)
    menuStateService = TestBed.inject(MenuStateService)
    service = TestBed.inject(AudioMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should open audio configuration menu when requested", () => {
    const spy = spyOn(service, "openAudioConfigurationMenu")
    menuStateService.menuOpen.next({ menuId: AudioMenuService.ID })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should get sinks and update the audio configuration menu", () => {
    spyOn(audioService, "sinks").and.returnValue(of(mockedSinks))
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => {
        expect(state.items.length).toBe(mockedSinks.length + 1)
        state.items.forEach((val, index) => {
          expect(val.description?.description?.trim()).toEqual(sinksAsWheelSelectorItem[index].description?.description?.trim())
          expect(val.id).toEqual(sinksAsWheelSelectorItem[index].id)
          expect(val.name).toEqual(sinksAsWheelSelectorItem[index].name)
          expect(val.icon).toEqual(sinksAsWheelSelectorItem[index].icon)
        })
      }
    })
    service.openAudioConfigurationMenu()
  })

  it("should go back", () => {
    menuStateService.menuOpen.subscribe({
      next: (menuState: MenuOpenState) => expect(menuState.menuId).toEqual(SettingsMenuService.ID)
    })
    service.back()
  })

  it("should refresh the audio configuration menu after default sink updated", () => {
    spyOn(audioService, "setDefaultSink").and.returnValue(of(true))
    const spy = spyOn(service, "openAudioConfigurationMenu")
    service.setDefaultSink({ id: 42, name: 'test' })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it("should handle actions on item click", () => {
    spyOn(audioService, "sinks").and.returnValue(of(mockedSinks))
    const backSpy = spyOn(service, "back")
    const setDefaultSinkSpy = spyOn(service, "setDefaultSink").and.callFake(() => void 0)

    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => {
        state.items[0].action?.(state?.items[0])
        expect(backSpy).toHaveBeenCalledTimes(1)
        state.items.slice(1).forEach(item => item.action?.(item))
        expect(setDefaultSinkSpy).toHaveBeenCalledTimes(state.items.length - 1)
      }
    })
    service.openAudioConfigurationMenu()
  })
});

