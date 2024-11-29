import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import {
  tablerArrowBadgeDown,
  tablerArrowBadgeRight,
  tablerCheckbox,
  tablerCircle,
  tablerInputAi,
  tablerLockPassword,
  tablerNumber123,
  tablerRefresh,
  tablerSquare,
} from '@ng-icons/tabler-icons';
import { tablerCircleDotFill } from '@ng-icons/tabler-icons/fill';
import { VirtualKeyboardModule } from "../virtual-keyboard/virtual-keyboard.module";
import { NextGenBaseButtonComponent } from './next-gen-base-button/next-gen-base-button.component';
import { NextGenBaseOverlayComponent } from './next-gen-base-overlay/next-gen-base-overlay.component';
import { NextGenButtonComponent } from './next-gen-button/next-gen-button.component';
import { NextGenCheckboxComponent } from './next-gen-checkbox/next-gen-checkbox.component';
import { NextGenComboboxOverlayComponent } from './next-gen-combobox-overlay/next-gen-combobox-overlay.component';
import { NextGenComboboxComponent } from './next-gen-combobox/next-gen-combobox.component';
import { NextGenInputOverlayComponent } from './next-gen-input-overlay/next-gen-input-overlay.component';
import { NextGenInputTextComponent } from './next-gen-input-text/next-gen-input-text.component';
import { NextGenRadioComponent } from './next-gen-radio/next-gen-radio.component';
import { NextGenTitleComponent } from './next-gen-title/next-gen-title.component';
import { NextGenSliderComponent } from './next-gen-slider/next-gen-slider.component';
import { NextGenInfiniteLoaderComponent } from './next-gen-infinite-loader/next-gen-infinite-loader.component';

@NgModule({
  declarations: [
    NextGenButtonComponent,
    NextGenRadioComponent,
    NextGenComboboxComponent,
    NextGenBaseButtonComponent,
    NextGenComboboxOverlayComponent,
    NextGenCheckboxComponent,
    NextGenInputTextComponent,
    NextGenInputOverlayComponent,
    NextGenBaseOverlayComponent,
    NextGenTitleComponent,
    NextGenSliderComponent,
    NextGenInfiniteLoaderComponent,
  ],
  imports: [CommonModule, NgIconsModule, VirtualKeyboardModule, VirtualKeyboardModule],
  exports: [
    NextGenButtonComponent,
    NextGenRadioComponent,
    NextGenComboboxComponent,
  ],
  providers: [
    provideIcons({
      tablerArrowBadgeDown,
      tablerArrowBadgeRight,
      tablerCheckbox,
      tablerSquare,
      tablerCircle,
      tablerCircleDotFill,
      tablerInputAi,
      tablerNumber123,
      tablerLockPassword,
      tablerRefresh
    }),
  ],
})
export class NextGenUiModule { }
