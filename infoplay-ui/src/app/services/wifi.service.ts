import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WifiNetwork } from '../models/core/wifi/wifi-network';

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  constructor() { }

  wifiNetworks(): Observable<WifiNetwork[]> {
    return of(Array(12).fill(
      {
        inUse: true,
        bssid: "02:67:44:10:14:6A",
        mode: "Infra",
        chan: 12,
        rate: "270 Mbit/s",
        signal: 70,
        security: 'WPA1 WPA2',
        ssid: 'DUMMY NETWORK'
      }
    ))
  }
}
