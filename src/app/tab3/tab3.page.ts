import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  imageSrc: string = 'https://iili.io/FFXS2je.png';
  gifSrc: string = 'https://iili.io/FFXwzsp.gif';
  private pngSrc: string = 'https://iili.io/FFXS2je.png';
  private gifDuration: number = 1120;

  salario: number = 0;
  gastos: number[] = [0, 0, 0, 0];
  gastos_totais: number = 0;
  alertButtons = ['Entendido'];

  constructor(private alertController: AlertController) { }

  async calc() {
    this.imageSrc = this.gifSrc;

    setTimeout(() => {
      this.imageSrc = this.pngSrc;
    }, this.gifDuration);

    this.gastos_totais = this.gastos.reduce((sum, expense) => sum + (expense || 0), 0);

    if (this.gastos_totais > this.salario) {
      const suggestions = this.diminuiEssesGastosAi();
      await this.presentAlert(suggestions);
    }
  }

  diminuiEssesGastosAi(): string {
    const categories = ['Moradia', 'Alimentação', 'Transporte', 'Lazer'];
    const sortedGastos = [...this.gastos]
      .map((expense, index) => ({ value: expense || 0, category: categories[index] }))
      .sort((a, b) => b.value - a.value);

    const topCategories = sortedGastos.slice(0, 2).map(item => item.category);
    return `Para equilibrar seu orçamento, considere reduzir gastos em: ${topCategories.join(' e ')}.`;
  }

  async presentAlert(suggestions: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Suas despesas (R$ ${this.gastos_totais.toFixed(2)}) excedem sua renda mensal (R$ ${this.salario.toFixed(2)}). ${suggestions}`,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  resetForm() {
    this.salario = 0;
    this.gastos = [0, 0, 0, 0];
    this.gastos_totais = 0;
    this.imageSrc = this.pngSrc;
  }
}
