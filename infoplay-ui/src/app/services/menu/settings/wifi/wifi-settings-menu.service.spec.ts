import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { InlineListMetadata } from '../../../../models/components/inline-list-metadata';
import { MenuOpenState } from '../../../../models/core/state/menu-open-state';
import { WifiNetwork } from '../../../../models/core/wifi/wifi-network';
import { WifiService } from '../../../wifi.service';
import { MenuStateService } from '../../menu-state.service';
import { SettingsMenuService } from '../settings-menu.service';
import { WifiSettingsMenuService } from './wifi-settings-menu.service';

describe('WifiSettingsMenuService', () => {
  let service: WifiSettingsMenuService;

  let menuStateService: MenuStateService;
  let wifiService: WifiService;

  const wifiNetworks: WifiNetwork[] = [
    {
      active: true,
      bandwidth: '80 Mhz',
      bssid: '02:67:44:10:14:69',
      ssid: 'Test Network',
      freq: '5200 MHz',
      rate: '270 Mbit/s',
      signal: 80,
      security: 'WPA2',
      device: 'wlp1s0',
      inUse: false,
    },
    {
      active: false,
      bandwidth: '80 Mhz',
      bssid: '02:67:44:10:14:70',
      ssid: 'Test Network 2',
      freq: '5200 MHz',
      rate: '270 Mbit/s',
      signal: 40,
      security: 'WPA2',
      device: 'wlp1s0',
      inUse: false,
    },
    {
      active: false,
      bandwidth: '80 Mhz',
      bssid: '02:67:44:10:14:71',
      ssid: 'Test Network 3',
      freq: '5200 MHz',
      rate: '270 Mbit/s',
      signal: 65,
      security: 'WPA2',
      device: 'wlp1s0',
      inUse: false,
    },
    {
      active: false,
      bandwidth: '80 Mhz',
      bssid: '02:67:44:10:14:70',
      ssid: 'Test Network 4',
      freq: '5200 MHz',
      rate: '270 Mbit/s',
      signal: 10,
      security: 'WPA2',
      device: 'wlp1s0',
      inUse: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    menuStateService = TestBed.inject(MenuStateService);
    wifiService = TestBed.inject(WifiService);
    service = TestBed.inject(WifiSettingsMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the wifi menu when requested', () => {
    let index = 0
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => {
        if (index == 0) {
          expect(state.items.length).toBe(1)
          index++
        }
        else {
          const expectedIcons = ["tablerArrowBackUp", "tablerWifi", "tablerWifi1", "tablerWifi2", "tablerWifi0"]
          expect(state.items.length).toBe(wifiNetworks.length + 1);
          state.items.forEach((item, index) => {
            if (index !== 0) {
              expect(item.name).toEqual(wifiNetworks[index - 1].ssid)
            }
            expect(item.icon).toEqual(expectedIcons[index])
          })
        }
      }
    })
    spyOn(wifiService, 'wifiNetworks').and.returnValue(of(wifiNetworks));
    menuStateService.menuOpen.next({ menuId: WifiSettingsMenuService.ID });
  });

  it("should go back to the settings menu when back is clicked", () => {
    spyOn(wifiService, "wifiNetworks").and.returnValue(of(wifiNetworks))
    menuStateService.menuChanged.subscribe({
      next: (state: InlineListMetadata) => state?.items?.[0]?.action?.(state?.items?.[0])
    })
    menuStateService.menuOpen.subscribe({
      next: (state: MenuOpenState) => expect(state.menuId).toEqual(SettingsMenuService.ID)
    })
    service.wifiMenu()
  })
});
