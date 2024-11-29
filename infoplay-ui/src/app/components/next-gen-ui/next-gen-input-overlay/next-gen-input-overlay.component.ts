import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { VirtualKeyboardService } from '../../../services/core/virtual-keyboard.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-next-gen-input-overlay',
  templateUrl: './next-gen-input-overlay.component.html',
  styleUrl: './next-gen-input-overlay.component.scss'
})
export class NextGenInputOverlayComponent {

  @Output()
  closed: EventEmitter<string | undefined> = new EventEmitter()

  @Input()
  type!: 'number' | 'text' | 'password'

  @Input()
  text!: string

  get _text() {
    return this.type == 'password' ? `${this.text.replaceAll(/./g, '*') ?? ''}${this.text[this.text.length - 1] ?? ''}` : this.text
  }

  constructor(
    readonly virtualKeyboardService: VirtualKeyboardService,
    readonly cd: ChangeDetectorRef
  ) {
    virtualKeyboardService
      .keyPressed
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: letter => {
          this.text = `${this.text}${letter}`
          cd.detectChanges()
        }
      })
    virtualKeyboardService.actionButtonPressed.subscribe({
      next: action => {
        if (action === 'DEL') {
          this.text = this.text.substring(0, this.text.length - 1)
          cd.detectChanges()
        }
        else {
          this.closed.next(action === 'OK' ? this.text : undefined)
        }
      }
    })
  }
}
