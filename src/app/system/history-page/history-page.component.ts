import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

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
  filtredEvents: BUHEvent[] = [];

  isLoaded = false;
  chartData = [];

  isFilterVisible = false;

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

      this.setOriginalEvents();
      this.calculateChartData();
      

      this.isLoaded = true;
    });
  }

  private setOriginalEvents(){
    this.filtredEvents = this.events.slice();
  }
  calculateChartData(): void{
    this.chartData = [];

    this.categories.forEach( (cat)=>{
      const catEvents = this.filtredEvents.filter((e)=> e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvents.reduce( (total, e)=>{
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisible = dir;
  }

  openFilter(){
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endtPeriod = moment().endOf(filterData.period).endOf('d');
    
    this.filtredEvents = this.filtredEvents
      .filter((e)=>{
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e)=>{
        let str = e.category.toString();
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e)=>{
        const momentDate = moment(e.date, 'DD:MM:YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endtPeriod);
      });

      this.calculateChartData();
    
  }

  onFilterCancel(){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
  }

}
