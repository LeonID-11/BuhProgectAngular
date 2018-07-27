import { Component, OnInit, Input } from '@angular/core';

import { Bill } from '../../shared/models/bill.modul';

@Component({
  selector: 'buh-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    this.dollar = this.bill.value / this.currency[26].rate;
    this.euro = this.bill.value / this.currency[32].rate;
    console.log(this.currency);
  }

}
