import { CartItem } from "./shopping-cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {
    
    items: CartItem[] = []

    clear() { 
        this.items = []
    }

    getTotal(): number {
        return this.items
            .map(item => item.getValue())
            .reduce((i1, i2) => i1 + i2, 0)
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find(arrayItem => arrayItem.menuItem.id === item.id)
        if(foundItem)
            this.increaseQty(foundItem)
        else 
            this.items.push(new CartItem(item))
        console.log(this.items)
    }

    removeItem(item: any) {
        this.items.splice(this.items.indexOf(item), 1)
    }

    increaseQty(item: CartItem) {
        item.quantity++
    }

    decreaseQty(item: CartItem) {
        item.quantity--
        if(item.quantity == 0) {
            this.removeItem(item)
        }
    }
}