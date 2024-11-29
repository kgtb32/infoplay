import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Type,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { isUndefined } from 'lodash';
import { nanoid } from 'nanoid';
import { filter } from 'rxjs';
import { NextGenButtonComponent } from '../../components/next-gen-ui/next-gen-button/next-gen-button.component';
import { NextGenCheckboxComponent } from '../../components/next-gen-ui/next-gen-checkbox/next-gen-checkbox.component';
import { NextGenComboboxComponent } from '../../components/next-gen-ui/next-gen-combobox/next-gen-combobox.component';
import { NextGenInfiniteLoaderComponent } from '../../components/next-gen-ui/next-gen-infinite-loader/next-gen-infinite-loader.component';
import { NextGenInputTextComponent } from '../../components/next-gen-ui/next-gen-input-text/next-gen-input-text.component';
import { NextGenRadioComponent } from '../../components/next-gen-ui/next-gen-radio/next-gen-radio.component';
import { NextGenSliderComponent } from '../../components/next-gen-ui/next-gen-slider/next-gen-slider.component';
import { NextGenTitleComponent } from '../../components/next-gen-ui/next-gen-title/next-gen-title.component';
import { MovementDirection } from '../../models/core/joypad/joypad-connect-event';
import {
  NextGenComponentWrapper,
  NextGenRadioProps,
  NextgenUiMetadata
} from '../../models/core/ui/next-gen-ui-metadata';
import { JoypadService } from '../../services/joypad.service';

@Component({
  selector: 'app-next-gen',
  templateUrl: './next-gen.component.html'
})
export class NextGenComponent implements AfterViewInit {
  private static readonly THREESHOLD = 350;
  private static readonly JOYPAD_SCENE_ID = nanoid(16);

  private lastUpdate = new Date().getTime();

  public readonly positionChangeEvent: EventEmitter<number> = new EventEmitter();
  public readonly clickedEvent: EventEmitter<void> = new EventEmitter();

  _current = 0;

  get isThreesholdPassed() {
    return new Date().getTime() - this.lastUpdate > NextGenComponent.THREESHOLD;
  }

  get maxItems() {
    return this._metadata?.components
      .filter((component) => !isUndefined(component.props.currentPosition))
      .reduce((prev, curr) => curr.componentType === 'radio'
        ? prev + Object.keys((curr.props as NextGenRadioProps).items).length
        : prev + 1,
        0,
      );
  }

  private readonly componentAssociations: { [key: string]: Type<unknown> } = {
    button: NextGenButtonComponent,
    radio: NextGenRadioComponent,
    combobox: NextGenComboboxComponent,
    checkbox: NextGenCheckboxComponent,
    text: NextGenInputTextComponent,
    title: NextGenTitleComponent,
    slider: NextGenSliderComponent,
    infiniteLoader: NextGenInfiniteLoaderComponent,
  };

  constructor(
    private readonly joypadService: JoypadService,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.joypadService
      .buttonPressEventFiltered(NextGenComponent.JOYPAD_SCENE_ID)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => this.clickedEvent.next(),
      });

    this.joypadService
      .axisMoveEventFiltered(NextGenComponent.JOYPAD_SCENE_ID)
      .pipe(takeUntilDestroyed())
      .pipe(
        filter((details) =>
          ['top', 'bottom'].includes(details.directionOfMovement),
        ),
      )
      .subscribe({
        next: (details) => this.axisMoved(details.directionOfMovement),
      });
  }

  ngAfterViewInit(): void {
    this.positionChangeEvent.next(0);
  }

  axisMoved(direction: MovementDirection) {
    if (
      (this._current == 0 && direction == 'top') ||
      (this._current == (this.maxItems ?? 1) - 1 && direction == 'bottom') ||
      !this.isThreesholdPassed
    ) {
      return;
    }
    this.lastUpdate = new Date().getTime();
    if (direction === 'bottom') {
      this._current++;
    } else {
      this._current--;
    }
    this.positionChangeEvent.next(this._current);
    this.cd.detectChanges();
  }

  _metadata?: NextgenUiMetadata

  private mapComponent(index: number, current: NextGenComponentWrapper, previous?: NextGenComponentWrapper): NextGenComponentWrapper {
    const newPos = previous?.componentType === 'radio' ? Object.keys((previous.props as NextGenRadioProps).items).length - 1 + index : index
    return {
      ...current,
      props: {
        ...current.props,
        clickedEvent: this.clickedEvent,
        positionChanged: this.positionChangeEvent,
        currentPosition: newPos,
      }
    }
  }

  @Input()
  set metadata(metadata: NextgenUiMetadata) {
    this._metadata = {
      ...metadata,
      components: metadata.components.reduce((previous: NextGenComponentWrapper[], current: NextGenComponentWrapper, index: number) => (
        previous.length === 0 ? [this.mapComponent(index, current)] : previous.concat([this.mapComponent(index, current, previous[index - 1])])
      ), [])
    }
  }

  getComponent(index: number) {
    const component = this._metadata?.components?.at(index);
    return {
      component: this.componentAssociations[component?.componentType!],
      props: component?.props as unknown as Record<string, unknown>,
    };
  }
}
