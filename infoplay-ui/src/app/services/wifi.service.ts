import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WifiNetwork } from '../models/core/wifi/wifi-network';

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  private readonly baseUrl = '/api/wifi'

  private readonly wifiListUrl = this.baseUrl + '/networks'

  constructor(private readonly httpClient: HttpClient) { }

  wifiNetworks(): Observable<WifiNetwork[]> {
    return this.httpClient.get<WifiNetwork[]>(this.wifiListUrl)
  }
}
