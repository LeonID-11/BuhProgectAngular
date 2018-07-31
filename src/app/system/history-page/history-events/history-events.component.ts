import { Component, OnInit, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';
import { BUHEvent } from '../../shared/models/buh-event.model';

@Component({
  selector: 'buh-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.sass']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: BUHEvent[] = [];
  searchValue = '';
  searchPlaseholder = 'Сумма';
  searchField = 'amount';

  constructor() { }

  ngOnInit() {
    this.events.forEach((e)=>{
      e.catName = this.categories.find((c)=>c.id === e.category).name;
    });
  }

  getEventClass(e: BUHEvent){
    return{
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }

  changeCriteria(field: string){
    const nameMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaseholder = nameMap[field];
    this.searchField = field;
  }

}
