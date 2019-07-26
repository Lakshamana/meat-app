import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import {
  trigger,
  style,
  transition,
  animate,
  state
} from "@angular/animations"
import { MenuItem } from "./menu-item.model"

@Component({
  selector: "mt-menu-item",
  templateUrl: "./menu-item.component.html",
  animations: [
    trigger("restaurantAppeared", [
      state("ready", style({ opacity: 1 })),
      transition("void => ready", [
        style({ opacity: 0, transform: "translate(-30px, -10px)" }),
        animate("300ms 0s ease-in-out")
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {
  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  emitAddEvent() {
    this.add.emit(this.menuItem)
  }
}
