import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-next-gen-base-button',
  templateUrl: './next-gen-base-button.component.html',
  styleUrl: './next-gen-base-button.component.scss'
})
export class NextGenBaseButtonComponent {
  public readonly iconSize = '2em'

  @Input()
  clickedEvent?: EventEmitter<void>

  @Input()
  selected!: boolean

  @Input()
  text!: string

  @Input()
  leftIcon?: string

  @Input()
  rightIcon?: string
}
