import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { EventService } from '../shared/services/event.service';
import { CategoriasService } from '../shared/services/categorias.service';
import { Bill } from '../shared/models/bill.modul';
import { Category } from '../shared/models/category.model';
import { BUHEvent } from '../shared/models/buh-event.model';


@Component({
  selector: 'buh-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.sass']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  s1: Subscription;
  bill: Bill;
  categories: Category[] = [];
  events: BUHEvent[] = [];

  constructor(
    private billService: BillService,
    private eventService: EventService,
    private categoriesService: CategoriasService
  ) { }

  ngOnInit() {
    this.s1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventService.getEvents()      
    ).subscribe( (data:[Bill, Category[], BUHEvent[] ])=>{
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number{
    const catEvents = this.events.filter(e=> e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e)=>{
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number{
    const percent = (100*this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string{
    return this.getPercent(cat) + '%';
  }

  ngOnDestroy(){
    if(this.s1) this.s1.unsubscribe();
  }
  
  getCatColorClass(cat: Category): string{
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success': percent >= 100 ? 'danger' : 'warning';
  }

}
