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
            foundItem.quantity++
        else 
            this.items.push(new CartItem(item))
        console.log(this.items)
    }

    removeItem(item: any) {
        console.log("ITEMS: ", this.items)
        console.log("ITEM: ", item)
        console.log(`ITEM INDEX: ${this.items.indexOf(item)}`)
        this.items.splice(this.items.indexOf(item), 1)
    }
}