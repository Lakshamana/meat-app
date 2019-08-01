import { RadioOption } from 'app/shared/radio/radio-option.model'
import { OrderService } from './order.service'
import { CartItem } from 'app/restaurant-detail/shopping-cart/shopping-cart-item.model'
import { Order, OrderItem } from './order.model'
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  emailPattern = /^(([^<>()\[\]\.,:\s@\"]+(\.[^<>()\[\]\.,:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,:\s@\"]+\.)+[^<>()[\]\.,:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/
  orderForm: FormGroup
  placeholder = 'Nome'
  deliveryCost = 10
  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de débito', value: 'DEB' },
    { label: 'Vale-refeição', value: 'REF' }
  ]
  orderCompleted = false

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }
    return undefined
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = new FormGroup(
      {
        name: new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)],
          updateOn: 'blur'
        }),
        email: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.emailPattern)
        ]),
        emailConfirmation: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.emailPattern)
        ]),
        address: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        number: this.formBuilder.control('', [
          Validators.required,
          Validators.pattern(this.numberPattern)
        ]),
        optionalAddress: this.formBuilder.control(''),
        paymentOption: this.formBuilder.control('', [Validators.required])
      },
      {
        validators: [OrderComponent.equalsTo],
        updateOn: 'blur'
      }
    )
  }

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
    order.orderItems = this.cartItems().map(
      cartItem => new OrderItem(cartItem.quantity, cartItem.menuItem.id)
    )
    this.orderService.checkOrder(order).subscribe(orderId => {
      this.orderCompleted = true
      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })
  }

  isOrderCompleted() {
    return this.orderCompleted
  }
}
