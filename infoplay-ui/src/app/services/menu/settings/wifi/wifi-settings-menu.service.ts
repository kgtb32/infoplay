import { Injectable } from '@angular/core';
import { WheelSelectorItem } from '../../../../models/components/wheel-selector-item';
import { WifiNetwork } from '../../../../models/core/wifi/wifi-network';
import { WifiService } from '../../../wifi.service';
import { MenuStateService } from '../../menu-state.service';
import { SettingsMenuService } from '../settings-menu.service';

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
    this.wifiService.wifiNetworks().subscribe({
      next: networks => this.wifiNetworksRetrieven(networks)
    })
  }

  private wifiNetworksRetrieven(networks: WifiNetwork[]) {
    this.menuStateService.menuChanged.next([
      {
        id: 0,
        name: 'Retour',
        icon: 'tablerArrowBackUp',
        action: () => this.menuStateService.menuOpen.next(SettingsMenuService.ID)
      },
      ...networks.map((network, index) => this.mapWifiNetworkToWheelSelectorItem(network, index))
    ])
  }

  private mapWifiNetworkToWheelSelectorItem(network: WifiNetwork, index: number): WheelSelectorItem {
    return {
      id: index + 1,
      name: network.ssid,
      icon: 'tablerWifi',
    }
  }
}
