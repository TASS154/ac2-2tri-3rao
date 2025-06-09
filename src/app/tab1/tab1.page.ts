import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor() { }

  V = 0
  i = 0
  n = 0
  P = 0
  R = 0
  showAlert: boolean = false;

  calc() {
    this.P = this.V * (this.i/100) / (1 - (1 + (this.i/100))**-this.n)
    this.R = Math.round(this.P)
    console.log(this.V)
    console.log(this.P)
    console.log(this.i)
    console.log(this.n)
  }

  //puxar alert se i for maior que 20%
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.i = 0; // Reseta a taxa de juros
        this.calc();
      },
    },
    {
      text: 'Estou ciente',
      role: 'confirm',
      handler: () => {
        this.calc();
      },
    },
  ];

  setLoanValue(value: number) {
    this.V = value;
    this.calc();
  }

  onValueChange() {
    if (this.i > 20) {
      this.showAlert = true;
    } else {
      this.calc();
    }
  }

  onAlertDismiss() {
    this.showAlert = false;
  }

}

