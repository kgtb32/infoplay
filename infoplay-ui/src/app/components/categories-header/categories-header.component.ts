import { Component, OnDestroy } from '@angular/core';
import dayjs from 'dayjs'

@Component({
  selector: 'app-categories-header',
  templateUrl: './categories-header.component.html',
  styleUrl: './categories-header.component.scss'
})
export class CategoriesHeaderComponent implements OnDestroy {
  readonly categories: string[] = [
    "Favoris",
    "Jeux",
    "Paramètres",
    "Applications",
    "Playlists"
  ]

  readonly selected: string = "Favoris"

  date: string = this.currentDate

  get currentDate() {
    return dayjs().format("HH:mm")
  }

  interval = setInterval(() => this.date = this.currentDate, 1000)

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
