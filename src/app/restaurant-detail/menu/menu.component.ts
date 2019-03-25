import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'app/restaurants/resturant.service';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menu-item/menu-item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantService: RestaurantsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.restaurantService
      .restaurantMenu(this.route.parent.snapshot.params['id'])
  }
}
