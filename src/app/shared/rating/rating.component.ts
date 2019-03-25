import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1, 2, 3, 4, 5]
  rate: number = 0
  tmpRate: number = 0

  @Output() rated = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {}

  setRate(r: number) {
    this.rate = r
    this.tmpRate = 0
    this.rated.emit(this.rate)
  }

  setTmpRate(r: number) {
    if(this.tmpRate === 0) {
      this.tmpRate = r
    }
    this.rate = r
  }

  clearTmpRate(){
    if (this.tmpRate !== 0) {
      this.rate = this.tmpRate
      this.tmpRate = 0
    }
  }

}
