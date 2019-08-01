import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  rates = [1, 2, 3, 4, 5]
  tmpRate = 0

  @Input() rate = 0
  @Output() rated = new EventEmitter<number>()

  constructor() {}

  ngOnInit() {}

  setRate(r: number) {
    this.rate = r
    this.tmpRate = undefined
    this.rated.emit(this.rate)
  }

  setTmpRate(r: number) {
    if (!this.tmpRate) {
      this.tmpRate = this.rate
    }
    this.rate = r
  }

  clearTmpRate() {
    if (this.tmpRate) {
      this.rate = this.tmpRate
      this.tmpRate = undefined
    }
  }
}
