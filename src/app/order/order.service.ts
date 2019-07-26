import { Injectable } from "@angular/core"
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service"
import { CartItem } from "app/restaurant-detail/shopping-cart/shopping-cart-item.model"
import { Order } from "./order.model"
import { Http, RequestOptions, Headers } from "@angular/http"
import { Observable } from "rxjs/Observable"
import { MEAT_API } from "app/app.api"

@Injectable()
export class OrderService {

    constructor(private shoppingCartService: ShoppingCartService, private http: Http){}

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
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`,
                JSON.stringify(order),
                new RequestOptions({headers: headers}))
            .map(response => response.json().id)
    }
}
