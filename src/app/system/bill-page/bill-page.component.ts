import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.modul';

@Component({
  selector: 'buh-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.sass']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(
    private billService: BillService
  ) { }

  subscription: Subscription;

  ngOnInit() {
    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCarrency()
    ).subscribe( (data: [Bill, any]) =>{
      console.log(data);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
