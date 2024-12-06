import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiSettingsComponent } from './wifi-settings.component';
import { provideHttpClient } from '@angular/common/http';
import { InlineListLayoutModule } from '../../layouts/inline-list-layout/inline-list-layout.module';
import { NextGenModule } from '../../layouts/next-gen/next-gen.module';
import { WifiService } from '../../services/wifi.service';
import { of } from 'rxjs';
import { WifiNetwork } from '../../models/core/wifi/wifi-network';
import { NextGenButtonProps } from '../../models/core/ui/next-gen-ui-metadata';
import { Router } from '@angular/router';

const mockedWifis: WifiNetwork[] = [
  {
    ssid: 'Test',
    bssid: 'BA-12-A3-F6-04-14',
    freq: '5220 MHz',
    rate: '270 Mbit/s',
    bandwidth: '80 MHz',
    signal: 94,
    security: 'WPA1 WPA2 802.1X',
    device: 'wlp1s0',
    active: false,
    inUse: false,
  },
  {
    ssid: 'Test 2',
    bssid: 'BA-12-A3-F6-04-15',
    freq: '5280 MHz',
    rate: '270 Mbit/s',
    bandwidth: '80 MHz',
    signal: 100,
    security: 'WPA1 WPA2 802.1X',
    device: 'wlp1s0',
    active: true,
    inUse: true,
  },
];

const defaultComponentLength = 4

describe('WifiSettingsComponent', () => {
  let component: WifiSettingsComponent;
  let fixture: ComponentFixture<WifiSettingsComponent>;

  let wifiService: WifiService;
  let router: Router

  let wifiUpdateSpy: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WifiSettingsComponent],
      imports: [InlineListLayoutModule, NextGenModule],
      providers: [provideHttpClient()],
    }).compileComponents();
    jasmine.clock().uninstall();
    jasmine.clock().install()

    wifiService = TestBed.inject(WifiService);
    router = TestBed.inject(Router)

    wifiUpdateSpy = spyOn(wifiService, 'wifiNetworks').and.returnValue(of(mockedWifis));
    fixture = TestBed.createComponent(WifiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for wifi', () => {
    expect(component.metadata).toBeDefined()
    expect(component.metadata.components.length).toBe(defaultComponentLength + mockedWifis.length)
    for (let i = defaultComponentLength; i < component.metadata.components.length - 1; i++) {
      expect(component.metadata.components.at(i)?.componentType).toEqual('button')
      const componentProps: NextGenButtonProps = component.metadata.components.at(i)?.props as NextGenButtonProps
      expect(componentProps.text).toEqual(mockedWifis.at(i - defaultComponentLength)?.ssid!)
    }
  });

  it("should go back when back button is clicked", () => {
    const componentProps: NextGenButtonProps = component.metadata.components.at(1)?.props as NextGenButtonProps
    const spy = spyOn(router, "navigate")
    componentProps.onClick?.next()
    expect(spy).toHaveBeenCalledOnceWith(["/settings"])
  })

  it("should clear interval on destroy", () => {
    const spy = spyOn(window, "clearInterval").and.callFake(() => void 0)
    component.ngOnDestroy()
    expect(spy).toHaveBeenCalled()
  })

  it("should periodicaly search wifi networks", () => {
    expect(wifiUpdateSpy).toHaveBeenCalledTimes(1) //ngInit
    jasmine.clock().tick(15001)
    expect(wifiUpdateSpy).toHaveBeenCalledTimes(2)
  })
});
