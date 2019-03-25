import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  deliveryCost: number = 10
  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de débito', value: 'DEB'},
    {label: 'Vale-refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {}

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  removeItem(item: CartItem) {
    this.orderService.removeItem(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map(cartItem => new OrderItem(cartItem.quantity, cartItem.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe(orderId => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
    console.log(order)
  }
}
