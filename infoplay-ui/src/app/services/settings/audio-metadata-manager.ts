import { EventEmitter } from '@angular/core';
import {
    NextGenButtonProps,
    NextGenRadioProps,
    NextGenSliderProps,
    NextGenTitleProps,
    NextgenUiMetadata,
} from '../../models/core/ui/next-gen-ui-metadata';
import { Sink } from '../../models/core/audio/sink';

export function errorMetadaManager(
    backEventHandler: EventEmitter<void>
): NextgenUiMetadata {
    return {
        direction: 'vertical',
        components: [
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Paramètres Audio',
                },
            },
            {
                componentType: 'button',
                props: <NextGenButtonProps>{
                    text: 'Retour',
                    onClick: backEventHandler,
                },
            },
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Erreur: Impossible de récupérer les paramètres audio.',
                },
            },
        ]
    }
}

export function audioMetadataManager(
    backEventHandler: EventEmitter<void>,
    volumeChangedHandler: EventEmitter<number>,
    sinks: Sink[],
    defaultSinkName: string,
): NextgenUiMetadata {
    const defaultSink = sinks.find((sink) => sink.name === defaultSinkName);
    return {
        direction: 'vertical',
        components: [
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Paramètres Audio',
                },
            },
            {
                componentType: 'button',
                props: <NextGenButtonProps>{
                    text: 'Retour',
                    onClick: backEventHandler,
                },
            },
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Volume',
                },
            },
            {
                componentType: 'slider',
                props: <NextGenSliderProps>{
                    maxValue: 100,
                    step: 5,
                    value: defaultSink?.volume?.frontLeft?.valuePercent ?? 0,
                    valueChanged: volumeChangedHandler,
                },
            },
            {
                componentType: 'title',
                props: <NextGenTitleProps>{
                    text: 'Sources Audio',
                },
            },
            {
                componentType: 'radio',
                props: <NextGenRadioProps>{
                    items: <{ [key: string]: string }>(
                        sinks.reduce(
                            (prev, curr) => ({ ...prev, [curr.name]: curr.description }),
                            {},
                        )
                    ),
                },
            },
        ],
    };
}
