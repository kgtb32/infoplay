import { AfterViewInit, Component, EventEmitter, Input } from '@angular/core';
import anime from 'animejs';
import { NextGenBaseComponent } from '../next-gen-base/next-gen-base.component';

@Component({
  selector: 'app-next-gen-infinite-loader',
  templateUrl: './next-gen-infinite-loader.component.html',
  styleUrl: './next-gen-infinite-loader.component.scss'
})
export class NextGenInfiniteLoaderComponent extends NextGenBaseComponent implements AfterViewInit {
  @Input()
  text: string = ""

  @Input()
  icon?: string

  @Input()
  rotateAnimation: boolean = false

  ngAfterViewInit(): void {
    if (this.rotateAnimation) {
      anime({
        targets: ".animate",
        keyframes: [
          { rotate: '360deg' },
        ],
        easing: 'linear',
        duration: 1000,
        loop: true,
        autoplay: true,
      })
    }
  }

  override afterPositionChanged(_positionChanged: EventEmitter<number>): void {
    return
  }
  override afterClickedEventChanged(_clickedEvent: EventEmitter<void>): void {
    return
  }
}
