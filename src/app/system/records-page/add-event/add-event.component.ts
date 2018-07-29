import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Category } from '../../shared/models/category.model';
import { BUHEvent } from '../../shared/models/buh-event.model';
import { EventService } from '../../shared/services/event.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.modul';
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'buh-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  @Input() categories: Category[] = [];

  types=[
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  massage: Message;

  constructor(
    private eventsService: EventService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.massage = new Message('danger', '');
  }

  private showMessage(text: string){
    this.massage.text = text;
    window.setTimeout(()=>this.massage.text = '', 5000);
  }

  onSubmit(form: NgForm){
    let {amount, description, type, category} = form.value;
    if(amount<0) amount *= -1;

    const event = new BUHEvent(
      type, amount, +category, 
      moment().format('DD.MM.YYYY HH:mm:ss'), description
    );

    this.sub1=this.billService.getBill()
      .subscribe((bill: Bill)=>{
        let value = 0;
        if(type === "outcome"){
          if(amount>bill.value){
            this.showMessage(`На счету не достаточно средств. Вам не хватает ${amount - bill.value}`);
            return;
          }else{
            value = bill.value - amount;
          }
        }else{
          value = bill.value + amount;
        }

        this.sub2=this.billService.updateBill({value: value, currency: bill.currency})
          .pipe( 
            mergeMap( ()=>this.eventsService.addEvent(event) ) 
          )
          .subscribe(()=>{
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            });
          });
      });
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
  }
}
