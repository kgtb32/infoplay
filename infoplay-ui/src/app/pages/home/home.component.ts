import { Component } from '@angular/core';
import { WheelSelectorItem } from '../../models/components/wheel-selector-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  readonly wheelItems: WheelSelectorItem[] = [
    ...Array<WheelSelectorItem>(16).fill({
      name: 'test',
      description: 'test',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129805-1.jpg",
    }),
    {
      name: 'Démo item',
      description: "Démo item description",
      image: "https://i.etsystatic.com/22552185/r/il/140ba2/3595463454/il_570xN.3595463454_jky1.jpg",
    },
    {
      name: 'Démo item 2',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129805-1.jpg",
    },
    {
      name: 'Démo item 3',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129804-1.jpg",
    },
    {
      name: 'Démo item 4',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129803-1.jpg",
    },
    {
      name: 'Démo item 5',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129802-1.jpg",
    },
    {
      name: 'Démo item 6',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129801-1.jpg",
    },
    {
      name: 'Démo item 7',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129799-1.jpg",
    },
    {
      name: 'Démo item 8',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129797-1.jpg",
    },
    {
      name: 'Démo item 9',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129795-1.jpg",
    },
    {
      name: 'Démo item 10',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129793-1.jpg",
    },
    {
      name: 'Démo item 11',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129788-1.jpg",
    },
    {
      name: 'Démo item 12',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129787-1.jpg",
    },
    {
      name: 'Démo item 13',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129785-1.jpg",
    },
    {
      name: 'Démo item 14',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129784-1.jpg",
    },
    {
      name: 'Démo item 15',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129782-1.jpg",
    },
    {
      name: 'Démo item 16',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129779-1.jpg",
    },
    {
      name: 'Démo item 17',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129777-1.jpg",
    },
    {
      name: 'Démo item 18',
      description: "Démo item description",
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129776-1.jpg",
    }
  ]
}
