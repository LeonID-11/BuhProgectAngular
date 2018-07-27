import { Component, Input } from '@angular/core';

@Component({
  selector: 'buh-carrency-card',
  templateUrl: './carrency-card.component.html',
  styleUrls: ['./carrency-card.component.sass']
})
export class CarrencyCardComponent {

  @Input() currency: any;

  date = new Date;

  currencies: string[] = ['26', '32'];

}
