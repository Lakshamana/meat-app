import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snackbar-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello World!'
  snackbarVisibility: string = 'hidden'

  constructor() { }

  ngOnInit() {}

  toggleSnackbarVisibility() {
    this.snackbarVisibility = this.snackbarVisibility === 'visible' ? 'hidden' : 'visible'
  }
}
