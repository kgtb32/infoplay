import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineListComponent } from './inline-list.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerBluetooth, tablerVolume, tablerWifi } from '@ng-icons/tabler-icons'

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
    provideIcons({ tablerWifi, tablerVolume, tablerBluetooth })
  ]
})
export class InlineListModule { }
