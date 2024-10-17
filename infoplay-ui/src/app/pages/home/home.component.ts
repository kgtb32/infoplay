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
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129805-1.jpg"
    }),
    {
      name: '30-in-1 Game Collection: Volume 2',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129842-1.jpg",
      description: {
        description: `
Six exotic islands filled with games and trophies are waiting for adventurers of all skill levels! Explore the islands solo, invite a group of friends over for some local co-op and competitive gameplay, or round up the troops for some wholesome family gaming! Race across island maps in a quest to be crowned Island Ruler

Unlock trophies to customize the look of your Welcome Screen! Topple the scores of your friends and players from around the world to gain online leaderboard fame, and in the process, unlock new islands filled with a variety of new games. Become the ultimate master of 30-in-1 Game Collection Volume 2

Features:
- Tons of Games! Climb, run, jump, blast, rocket, and even dance your way through 30 games spread out across six fun-filled islands
- Explore and Collect! Earn stars by playing games to unlock new islands, and even more games
- Island Hop with Friends! Join up to three other players for friendly competitive or cooperative play with just one console and one copy of the game
- Claim the Crown! Discover trophies and climb atop the leaderboards to be crowned Island
        `,
        genres: ['action', 'puzzle', 'party'],
        platform: 'Nintendo Switch',
        players: 4,
        releaseYear: '2019',
        company: 'Nintendo'
      }
    },
    {
      name: 'Démo item 2',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129805-1.jpg",
    },
    {
      name: 'Démo item 3',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129804-1.jpg",
    },
    {
      name: 'Démo item 4',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129803-1.jpg",
    },
    {
      name: 'Démo item 5',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129802-1.jpg",
    },
    {
      name: 'Démo item 6',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129801-1.jpg",
    },
    {
      name: 'Démo item 7',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129799-1.jpg",
    },
    {
      name: 'Démo item 8',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129797-1.jpg",
    },
    {
      name: 'Démo item 9',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129795-1.jpg",
    },
    {
      name: 'Démo item 10',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129793-1.jpg",
    },
    {
      name: 'Démo item 11',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129788-1.jpg",
    },
    {
      name: 'Démo item 12',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129787-1.jpg",
    },
    {
      name: 'Démo item 13',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129785-1.jpg",
    },
    {
      name: 'Démo item 14',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129784-1.jpg",
    },
    {
      name: 'Démo item 15',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129782-1.jpg",
    },
    {
      name: 'Démo item 16',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129779-1.jpg",
    },
    {
      name: 'Démo item 17',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129777-1.jpg",
    },
    {
      name: 'Démo item 18',
      image: "https://cdn.thegamesdb.net/images/thumb/boxart/front/129776-1.jpg",
    }
  ]
}
