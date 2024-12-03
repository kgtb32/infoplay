import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Sink } from '../../models/core/audio/sink';
import { NextGenButtonProps, NextGenSliderProps } from '../../models/core/ui/next-gen-ui-metadata';
import { AudioService } from '../../services/audio.service';
import { AudioSettingsComponent } from './audio-settings.component';
import { Router } from '@angular/router';

const mockedSinks: Sink[] = [
  {
    index: 52,
    state: 'SUSPENDED',
    name: 'alsa_output.pci-0000_03_00.1.hdmi-stereo',
    description:
      'Renoir Radeon High Definition Audio Controller Digital Stereo (HDMI)',
    driver: 'PipeWire',
    sampleSpecification: 's32le 2ch 48000Hz',
    channelMap: 'front-left,front-right',
    ownerModule: 4294967295,
    mute: true,
    volume: {
      frontLeft: {
        value: 0,
        valuePercent: 0,
        db: '-inf dB',
      },
      frontRight: {
        value: 0,
        valuePercent: 0,
        db: '-inf dB',
      },
    },
    balance: 0,
    baseVolume: {
      value: 65536,
      valuePercent: 100,
      db: '0.00 dB',
    },
    latency: {
      actual: 0,
      configured: 0,
    },
    flags: ['HARDWARE', 'DECIBEL_VOLUME', 'LATENCY', 'SET_FORMATS'],
    properties: {
      'alsa.card': '0',
      'alsa.card_name': 'HD-Audio Generic',
      'alsa.class': 'generic',
      'alsa.components': 'HDA:1002aa01,00aa0100,00100700',
      'alsa.device': '3',
      'alsa.driver_name': 'snd_hda_intel',
      'alsa.id': 'Generic',
      'alsa.long_card_name': 'HD-Audio Generic at 0xd03c8000 irq 74',
      'alsa.mixer_name': 'ATI R6xx HDMI',
      'alsa.name': 'VX2457',
      'alsa.resolution_bits': '16',
      'alsa.subclass': 'generic-mix',
      'alsa.subdevice': '0',
      'alsa.subdevice_name': 'subdevice #0',
      'api.alsa.card.longname': 'HD-Audio Generic at 0xd03c8000 irq 74',
      'api.alsa.card.name': 'HD-Audio Generic',
      'api.alsa.path': 'hdmi:0',
      'api.alsa.pcm.card': '0',
      'api.alsa.pcm.stream': 'playback',
      'audio.channels': '2',
      'audio.position': 'FL,FR',
      'card.profile.device': '2',
      'device.api': 'alsa',
      'device.class': 'sound',
      'device.id': '44',
      'device.profile.description': 'Digital Stereo (HDMI)',
      'device.profile.name': 'hdmi-stereo',
      'device.routes': '1',
      'factory.name': 'api.alsa.pcm.sink',
      'media.class': 'Audio/Sink',
      'device.description': 'Renoir Radeon High Definition Audio Controller',
      'node.name': 'alsa_output.pci-0000_03_00.1.hdmi-stereo',
      'node.nick': 'VX2457',
      'node.pause-on-idle': 'false',
      'object.path': 'alsa:pcm:0:hdmi:0:playback',
      'priority.driver': '696',
      'priority.session': '696',
      'factory.id': '18',
      'clock.quantum-limit': '8192',
      'client.id': '35',
      'node.driver': 'true',
      'factory.mode': 'merge',
      'audio.adapt.follower': '',
      'library.name': 'audioconvert/libspa-audioconvert',
      'object.id': '52',
      'object.serial': '52',
      'api.acp.auto-port': 'false',
      'api.acp.auto-profile': 'false',
      'api.alsa.card': '0',
      'api.alsa.use-acp': 'true',
      'api.dbus.ReserveDevice1': 'Audio0',
      'device.bus': 'pci',
      'device.bus_path': 'pci-0000:03:00.1',
      'device.enum.api': 'udev',
      'device.icon_name': 'audio-card-analog-pci',
      'device.name': 'alsa_card.pci-0000_03_00.1',
      'device.nick': 'HD-Audio Generic',
      'device.plugged.usec': '2208947',
      'device.product.id': '0x1637',
      'device.product.name': 'Renoir Radeon High Definition Audio Controller',
      'device.subsystem': 'sound',
      'sysfs.path': '/devices/pci0000:00/0000:00:08.1/0000:03:00.1/sound/card0',
      'device.vendor.id': '0x1002',
      'device.vendor.name': 'Advanced Micro Devices, Inc. [AMD/ATI]',
      'device.string': '0',
    },
    activePort: 'hdmi-output-0',
    formats: ['pcm'],
  },
  {
    index: 53,
    state: 'RUNNING',
    name: 'alsa_output.pci-0000_03_00.6.analog-stereo',
    description: 'Family 17h/19h HD Audio Controller Analog Stereo',
    driver: 'PipeWire',
    sampleSpecification: 's32le 2ch 48000Hz',
    channelMap: 'front-left,front-right',
    ownerModule: 4294967295,
    mute: false,
    volume: {
      frontLeft: {
        value: 28836,
        valuePercent: 44,
        db: '-21.39 dB',
      },
      frontRight: {
        value: 28836,
        valuePercent: 44,
        db: '-21.39 dB',
      },
    },
    balance: 0,
    baseVolume: {
      value: 65536,
      valuePercent: 100,
      db: '0.00 dB',
    },
    latency: {
      actual: 0,
      configured: 0,
    },
    flags: [
      'HARDWARE',
      'HW_MUTE_CTRL',
      'HW_VOLUME_CTRL',
      'DECIBEL_VOLUME',
      'LATENCY',
    ],
    properties: {
      'alsa.card': '1',
      'alsa.card_name': 'HD-Audio Generic',
      'alsa.class': 'generic',
      'alsa.components': 'HDA:10ec0256,152d127c,00100002',
      'alsa.device': '0',
      'alsa.driver_name': 'snd_hda_intel',
      'alsa.id': 'Generic_1',
      'alsa.long_card_name': 'HD-Audio Generic at 0xd03c0000 irq 75',
      'alsa.mixer_name': 'Realtek ALC256',
      'alsa.name': 'ALC256 Analog',
      'alsa.resolution_bits': '16',
      'alsa.subclass': 'generic-mix',
      'alsa.subdevice': '0',
      'alsa.subdevice_name': 'subdevice #0',
      'api.alsa.card.longname': 'HD-Audio Generic at 0xd03c0000 irq 75',
      'api.alsa.card.name': 'HD-Audio Generic',
      'api.alsa.path': 'front:1',
      'api.alsa.pcm.card': '1',
      'api.alsa.pcm.stream': 'playback',
      'audio.channels': '2',
      'audio.position': 'FL,FR',
      'card.profile.device': '3',
      'device.api': 'alsa',
      'device.class': 'sound',
      'device.id': '45',
      'device.profile.description': 'Analog Stereo',
      'device.profile.name': 'analog-stereo',
      'device.routes': '2',
      'factory.name': 'api.alsa.pcm.sink',
      'media.class': 'Audio/Sink',
      'device.description': 'Family 17h/19h HD Audio Controller',
      'node.name': 'alsa_output.pci-0000_03_00.6.analog-stereo',
      'node.nick': 'ALC256 Analog',
      'node.pause-on-idle': 'false',
      'object.path': 'alsa:pcm:1:front:1:playback',
      'priority.driver': '1009',
      'priority.session': '1009',
      'factory.id': '18',
      'clock.quantum-limit': '8192',
      'client.id': '35',
      'node.driver': 'true',
      'factory.mode': 'merge',
      'audio.adapt.follower': '',
      'library.name': 'audioconvert/libspa-audioconvert',
      'object.id': '33',
      'object.serial': '53',
      'node.max-latency': '16384/48000',
      'api.alsa.period-size': '1024',
      'api.alsa.period-num': '32',
      'api.alsa.headroom': '0',
      'api.acp.auto-port': 'false',
      'api.acp.auto-profile': 'false',
      'api.alsa.card': '1',
      'api.alsa.use-acp': 'true',
      'api.dbus.ReserveDevice1': 'Audio1',
      'device.bus': 'pci',
      'device.bus_path': 'pci-0000:03:00.6',
      'device.enum.api': 'udev',
      'device.icon_name': 'audio-card-analog-pci',
      'device.name': 'alsa_card.pci-0000_03_00.6',
      'device.nick': 'HD-Audio Generic',
      'device.plugged.usec': '2259999',
      'device.product.id': '0x15e3',
      'device.product.name': 'Family 17h/19h HD Audio Controller',
      'device.subsystem': 'sound',
      'sysfs.path': '/devices/pci0000:00/0000:00:08.1/0000:03:00.6/sound/card1',
      'device.vendor.id': '0x1022',
      'device.vendor.name': 'Advanced Micro Devices, Inc. [AMD]',
      'device.string': '1',
    },
    activePort: 'analog-output-headphones',
    formats: ['pcm'],
  },
];

const metadataFixedComponentLength = 5

describe('AudioSettingsComponent', () => {
  let component: AudioSettingsComponent;
  let fixture: ComponentFixture<AudioSettingsComponent>;

  let audioService: AudioService;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioSettingsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    audioService = TestBed.inject(AudioService);
    router = TestBed.inject(Router)

    fixture = TestBed.createComponent(AudioSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get sinks and update the metadata to display sink list', () => {
    spyOn(audioService, 'sinks').and.returnValue(of(mockedSinks));
    component.ngOnInit()
    expect(component.metadata).toBeDefined()
    expect(component.metadata?.components.length).toEqual(mockedSinks.length + metadataFixedComponentLength - 1)
    for (let i = metadataFixedComponentLength; i < component.metadata?.components?.length! - 1; i++) {
      expect(component.metadata?.components?.at(i)?.componentType).toEqual('button')
      const props: NextGenButtonProps = component.metadata?.components?.at(i)?.props! as NextGenButtonProps
      expect(props.text).toEqual(mockedSinks[i - metadataFixedComponentLength].description)
    }
  });

  it("should handle error case in sink lists", () => {
    spyOn(audioService, "sinks").and.returnValue(throwError(() => "error"))
    component.ngOnInit()
    expect(component.metadata).toBeDefined()
    expect(component.metadata?.components.length).toEqual(metadataFixedComponentLength - 2)
  })

  it("should go back on button click event on the back button", () => {
    const spy = spyOn(router, "navigate")
    spyOn(audioService, "sinks").and.returnValue(of(mockedSinks))
    component.ngOnInit()
    const componentProps: NextGenButtonProps = component?.metadata?.components?.at(1)?.props! as NextGenButtonProps
    componentProps.onClick?.next()
    expect(spy).toHaveBeenCalledOnceWith(["/settings"])
  })

  it("should update the volume", () => {
    spyOn(audioService, "sinks").and.returnValue(of(mockedSinks))
    component.ngOnInit()
    const spy = spyOn(audioService, "setSinkVolume").and.returnValue(of(true))
    spyOn(window, "alert").and.callFake(() => void 0)
    const componentProps: NextGenSliderProps = component.metadata?.components?.at(3)?.props! as NextGenSliderProps
    (component as any).defaultSink = 42
    componentProps?.valueChanged?.next(50)
    expect(spy).toHaveBeenCalledWith(42, 50)
  })
});
