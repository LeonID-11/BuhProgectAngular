import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { CategoriasService } from '../shared/services/categorias.service';
import { EventService } from '../shared/services/event.service';
import { Category } from '../shared/models/category.model';
import { BUHEvent } from '../shared/models/buh-event.model';


@Component({
  selector: 'buh-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements OnInit,OnDestroy {

  sub1:Subscription;
  categories: Category[] = [];
  events: BUHEvent[] = [];

  isLoaded = false;
  chartData = [];

  constructor(
    private categoriesServices: CategoriasService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoriesServices.getCategories(),
      this.eventService.getEvents()
    ).subscribe( (data: [Category[], BUHEvent[] ]) =>{
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();
      

      this.isLoaded = true;
    });
  }

  calculateChartData(): void{
    this.chartData = [];

    this.categories.forEach( (cat)=>{
      const catEvents = this.events.filter((e)=> e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce( (total, e)=>{
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
  }

}
