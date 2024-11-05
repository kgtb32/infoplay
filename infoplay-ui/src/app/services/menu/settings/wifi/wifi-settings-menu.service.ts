import { Injectable } from '@angular/core';
import { WheelSelectorItem } from '../../../../models/components/wheel-selector-item';
import { WifiNetwork } from '../../../../models/core/wifi/wifi-network';
import { WifiService } from '../../../wifi.service';
import { MenuStateService } from '../../menu-state.service';
import { SettingsMenuService } from '../settings-menu.service';
import { DefaultBack } from '../../../../menus/default-back';

@Injectable({
  providedIn: 'root'
})
export class WifiSettingsMenuService {
  public static readonly ID = "wifi-settings-menu"

  constructor(
    private readonly wifiService: WifiService,
    private readonly menuStateService: MenuStateService,
  ) {
    this.menuStateService.menuOpenedFiltered(WifiSettingsMenuService.ID).subscribe({
      next: () => this.wifiMenu()
    })
  }

  wifiMenu() {
    this.menuStateService.menuChanged.next({
      items: [
        {
          ...DefaultBack,
          action: () => this.menuStateService.menuOpen.next({ menuId: SettingsMenuService.ID })
        },
      ]
    })
    this.wifiService.wifiNetworks().subscribe({
      next: networks => this.wifiNetworksRetrieven(networks)
    })
  }

  private wifiNetworksRetrieven(networks: WifiNetwork[]) {
    this.menuStateService.menuChanged.next({
      items: [
        {
          ...DefaultBack,
          action: () => this.menuStateService.menuOpen.next({ menuId: SettingsMenuService.ID })
        },
        ...networks
          .filter(network => !!network.ssid)
          .map((network, index) => this.mapWifiNetworkToWheelSelectorItem(network, index))
      ]
    })
  }

  private bars(signal: number) {
    if (signal > 0 && signal < 25) {
      return 'tablerWifi0'
    }
    else if (signal >= 25 && signal < 50) {
      return 'tablerWifi1'
    }
    else if (signal >= 50 && signal < 75) {
      return 'tablerWifi2'
    }
    return 'tablerWifi'
  }

  private mapWifiNetworkToWheelSelectorItem(network: WifiNetwork, index: number): WheelSelectorItem {
    return {
      id: index + 1,
      name: network.ssid,
      icon: this.bars(network.signal)
    }
  }
}
