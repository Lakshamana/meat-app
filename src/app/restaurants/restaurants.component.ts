import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'

import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './resturant.service'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/observable/from'
import { ErrorHandler } from 'app/app.error-handler'
import { NotificationService } from 'app/shared/messages/notification.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state(
        'hidden',
        style({
          opacity: 0,
          'max-height': '0px'
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          'max-height': '70px',
          'margin-top': '20px'
        })
      ),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[]
  searchBarState = 'hidden'
  searchForm: FormGroup
  searchControl: FormControl

  constructor(
    private restaurantService: RestaurantsService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm =>
        this.restaurantService
          .restaurants(searchTerm)
          .catch(err => {
            this.notificationService.notify('Ocorreu um erro no servidor')
            return Observable.from([])
          })
      )
      .subscribe(restaurants => (this.restaurants = restaurants))

    this.restaurantService
      .restaurants()
      .subscribe(restaurants => (this.restaurants = restaurants))
  }

  toggleSearchBar(iptSearch: HTMLInputElement) {
    this.searchBarState =
      this.searchBarState === 'hidden' ? 'visible' : 'hidden'
    if (this.searchBarState === 'visible') {
      iptSearch.focus()
    }
  }
}
