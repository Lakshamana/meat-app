import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service'
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model'
import { Order } from './order.model'
import { MEAT_API } from 'app/app.api'
import { LoginService } from 'app/security/login/login.service'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

@Injectable()
export class OrderService {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  cartItems(): CartItem[] {
    return this.shoppingCartService.items
  }

  itemsValue(): number {
    return this.shoppingCartService.getTotal()
  }

  increaseQty(item: CartItem) {
    this.shoppingCartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.shoppingCartService.decreaseQty(item)
  }

  removeItem(item: CartItem) {
    this.shoppingCartService.removeItem(item)
  }

  clear() {
    this.shoppingCartService.clear()
  }

  checkOrder(order: Order): Observable<string> {
    return this.http
      .post<Order>(`${MEAT_API}/orders`, order)
      .map(order => order.id)
  }
}
