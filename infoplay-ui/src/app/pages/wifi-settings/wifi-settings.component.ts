import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NextgenUiMetadata } from '../../models/core/ui/next-gen-ui-metadata';
import { Router } from '@angular/router';
import { WifiService } from '../../services/wifi.service';
import { wifiMetadataManager } from '../../services/settings/wifi-metadata-manager';

@Component({
  selector: 'app-wifi-settings',
  templateUrl: './wifi-settings.component.html',
  styleUrl: './wifi-settings.component.scss'
})
export class WifiSettingsComponent implements OnInit, OnDestroy {
  private static readonly WIFI_SEARCH_INTERVAL: number = 15000 //ms
  private readonly backCallback: EventEmitter<void> = new EventEmitter()
  private readonly wifiConnectCallback: EventEmitter<string> = new EventEmitter()

  private readonly wifiUpdateInterval = setInterval(() => this.searchWifi(), WifiSettingsComponent.WIFI_SEARCH_INTERVAL)

  metadata: NextgenUiMetadata = wifiMetadataManager(
    this.backCallback,
    this.wifiConnectCallback,
    []
  )

  constructor(
    private readonly router: Router,
    private readonly wifiService: WifiService
  ) { }

  ngOnInit(): void {
    this.searchWifi()
    this.backCallback.subscribe({
      next: () => this.back()
    })
  }

  private searchWifi() {
    this.wifiService.wifiNetworks().subscribe({
      next: wifiNetworks => {
        this.metadata = wifiMetadataManager(
          this.backCallback,
          this.wifiConnectCallback,
          wifiNetworks
        )
      }
    })
  }

  private back() {
    this.router.navigate(['/settings'])
  }

  ngOnDestroy(): void {
    clearInterval(this.wifiUpdateInterval)
  }
}
