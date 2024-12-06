import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineListComponent } from './inline-list.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowBackUp, tablerBluetooth, tablerCloudBolt, tablerMovie, tablerRadio, tablerRefresh, tablerVolume, tablerWifi, tablerWifi0, tablerWifi1, tablerWifi2 } from '@ng-icons/tabler-icons'

@NgModule({
  declarations: [
    InlineListComponent
  ],
  imports: [
    CommonModule,
    NgIconComponent
  ],
  exports: [
    InlineListComponent,
  ],
  providers: [
    provideIcons({ tablerWifi0, tablerWifi1, tablerWifi2, tablerWifi, tablerVolume, tablerBluetooth, tablerMovie, tablerCloudBolt, tablerRadio, tablerArrowBackUp, tablerRefresh })
  ]
})
export class InlineListModule { }
