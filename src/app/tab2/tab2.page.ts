import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor() { }

  P = 0
  r = 0.00
  n = 0
  M = 0
  t = 0
  R = 0

  calc() {
    this.M = this.P * (1 + (this.r/100 / this.n)) ** (this.n * this.t)
    this.R = Math.round(this.M)
  }
  resetForm() {
    this.P = 0;
    this.r = 0.00;
    this.n = 0;
    this.M = 0;
    this.t = 0;
  }



  //puxar alert se r for maior que 15%
  alertButtons = 'Estou ciente disto'

}
