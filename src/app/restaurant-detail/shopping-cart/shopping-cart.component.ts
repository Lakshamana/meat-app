import { Component, OnInit } from '@angular/core'
import { ShoppingCartService } from './shopping-cart.service'
import { CartItem } from './shopping-cart-item.model'
import { MenuItem } from '../menu-item/menu-item.model'

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  total() {
    return this.shoppingCartService.getTotal()
  }

  items() {
    return this.shoppingCartService.items
  }

  clear() {
    this.shoppingCartService.clear()
  }

  removeItem(item: any) {
    this.shoppingCartService.removeItem(item)
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item)
  }
}
