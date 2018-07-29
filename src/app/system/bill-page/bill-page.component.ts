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

  sub1: Subscription;
  sub2: Subscription;

  currency: any;
  bill: Bill;

  isLoaded = false;

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCarrency()
    ).subscribe( (data: [Bill, any]) =>{
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh(){
    this.isLoaded = false;
    this.sub2 = this.billService.getCarrency()
      .subscribe((currency: any) =>{
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    if(this.sub2){
      this.sub2.unsubscribe();
    }
      
  }
}
