import { CartItem } from "./shopping-cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { NotificationService } from "app/shared/messages/notification.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ShoppingCartService {
  items: CartItem[] = [];

  constructor(private notificationService: NotificationService) {}

  clear() {
    this.items = [];
  }

  getTotal(): number {
    return this.items
      .map(item => item.getValue())
      .reduce((i1, i2) => i1 + i2, 0);
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(
      arrayItem => arrayItem.menuItem.id === item.id
    );
    if (foundItem) this.increaseQty(foundItem);
    else this.items.push(new CartItem(item));
    this.notificationService.notify(`Você adicionou ${item.name} ao carrinho!`);
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notificationService.notify(
      `Você adicionou ${item.menuItem.name} ao carrinho!`
    );
  }

  increaseQty(item: CartItem) {
    item.quantity++;
  }

  decreaseQty(item: CartItem) {
    item.quantity--;
    if (item.quantity == 0) {
      this.removeItem(item);
    }
  }
}
