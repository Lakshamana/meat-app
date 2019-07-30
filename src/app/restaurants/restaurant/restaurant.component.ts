import { Component, OnInit, Input } from '@angular/core'
import { trigger, style, transition, animate, state } from '@angular/animations'
import { Restaurant } from './restaurant.model'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => readyLeft', [
        style({ opacity: 0, transform: 'translate(-30px, -10px)' }),
        animate('300ms 0s ease-in-out')
      ]),
      transition('void => readyRight', [
        style({ opacity: 0, transform: 'translate(30px, -10px)' }),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant
  restaurantState: string
  @Input() restaurantKey: number

  constructor() {}

  ngOnInit() {
    this.restaurantState =
      this.restaurantKey % 2 === 0 ? 'readyLeft' : 'readyRight'
  }
}
