import { DefaultBack } from '../../../../menus/default-back';
import { WheelSelectorItem } from '../../../../models/components/wheel-selector-item';
import { Sink } from '../../../../models/core/audio/sink';

export const mockedSinks: Sink[] = [
    {
        index: 52,
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
                value: 32113,
                valuePercent: 49,
                db: '-18.59 dB',
            },
            frontRight: {
                value: 32113,
                valuePercent: 49,
                db: '-18.59 dB',
            },
        },
        balance: 0.0,
        baseVolume: {
            value: 65536,
            valuePercent: 100,
            db: '0.00 dB',
        },
        latency: {
            actual: 0.0,
            configured: 0.0,
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
            'object.id': '52',
            'object.serial': '52',
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
            'device.plugged.usec': '2656107',
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
    {
        index: 74,
        state: 'SUSPENDED',
        name: 'alsa_output.pci-0000_03_00.1.hdmi-stereo-extra1',
        description:
            'Renoir Radeon High Definition Audio Controller Digital Stereo (HDMI 2)',
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
        balance: 0.0,
        baseVolume: {
            value: 65536,
            valuePercent: 100,
            db: '0.00 dB',
        },
        latency: {
            actual: 0.0,
            configured: 0.0,
        },
        flags: ['HARDWARE', 'DECIBEL_VOLUME', 'LATENCY', 'SET_FORMATS'],
        properties: {
            'alsa.card': '0',
            'alsa.card_name': 'HD-Audio Generic',
            'alsa.class': 'generic',
            'alsa.components': 'HDA:1002aa01,00aa0100,00100700',
            'alsa.device': '7',
            'alsa.driver_name': 'snd_hda_intel',
            'alsa.id': 'Generic',
            'alsa.long_card_name': 'HD-Audio Generic at 0xd03c8000 irq 74',
            'alsa.mixer_name': 'ATI R6xx HDMI',
            'alsa.name': 'HDMI 1',
            'alsa.resolution_bits': '16',
            'alsa.subclass': 'generic-mix',
            'alsa.subdevice': '0',
            'alsa.subdevice_name': 'subdevice #0',
            'api.alsa.card.longname': 'HD-Audio Generic at 0xd03c8000 irq 74',
            'api.alsa.card.name': 'HD-Audio Generic',
            'api.alsa.path': 'hdmi:0,1',
            'api.alsa.pcm.card': '0',
            'api.alsa.pcm.stream': 'playback',
            'audio.channels': '2',
            'audio.position': 'FL,FR',
            'card.profile.device': '5',
            'device.api': 'alsa',
            'device.class': 'sound',
            'device.id': '44',
            'device.profile.description': 'Digital Stereo (HDMI 2)',
            'device.profile.name': 'hdmi-stereo-extra1',
            'device.routes': '1',
            'factory.name': 'api.alsa.pcm.sink',
            'media.class': 'Audio/Sink',
            'device.description': 'Renoir Radeon High Definition Audio Controller',
            'node.name': 'alsa_output.pci-0000_03_00.1.hdmi-stereo-extra1',
            'node.nick': 'HDMI 1',
            'node.pause-on-idle': 'false',
            'object.path': 'alsa:pcm:0:hdmi:0,1:playback',
            'priority.driver': '632',
            'priority.session': '632',
            'factory.id': '18',
            'clock.quantum-limit': '8192',
            'client.id': '35',
            'node.driver': 'true',
            'factory.mode': 'merge',
            'audio.adapt.follower': '',
            'library.name': 'audioconvert/libspa-audioconvert',
            'object.id': '58',
            'object.serial': '74',
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
            'device.plugged.usec': '2603869',
            'device.product.id': '0x1637',
            'device.product.name': 'Renoir Radeon High Definition Audio Controller',
            'device.subsystem': 'sound',
            'sysfs.path': '/devices/pci0000:00/0000:00:08.1/0000:03:00.1/sound/card0',
            'device.vendor.id': '0x1002',
            'device.vendor.name': 'Advanced Micro Devices, Inc. [AMD/ATI]',
            'device.string': '0',
        },
        activePort: 'hdmi-output-1',
        formats: ['pcm'],
    },
];

export const sinksAsWheelSelectorItem: WheelSelectorItem[] = [
    DefaultBack,
    ...Array(mockedSinks.length)
        .fill(null)
        .map((_, index) => ({
            id: mockedSinks[index].index,
            name: mockedSinks[index].description,
            description: {
                description: `
            volume: ${mockedSinks[index].baseVolume.valuePercent}%\n
            actif: ${mockedSinks[index].state === 'RUNNING'}
            `,
            },
            icon: 'tablerVolume',
        }))
]

