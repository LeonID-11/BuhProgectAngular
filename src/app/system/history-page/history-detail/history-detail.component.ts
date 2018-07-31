import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { flatMap } from 'rxjs/operators'

import { EventService } from '../../shared/services/event.service';
import { CategoriasService } from '../../shared/services/categorias.service';
import { BUHEvent } from '../../shared/models/buh-event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'buh-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.sass']
})
export class HistoryDetailComponent implements OnInit,OnDestroy {

  event: BUHEvent;
  category: Category;
  isLoaded = false;
  s1: Subscription;

  constructor(
    private rout: ActivatedRoute,
    private eventService: EventService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit() {
    this.s1 = this.rout.params
      .subscribe( (params: Params) => {
          this.eventService.getEventById(params['id'])
            .subscribe((event: BUHEvent)=>{
              this.event = event;
              return this.categoriasService.getCategoryById(event.category)
                .subscribe((category: Category)=>{
                  this.category = category;
                  this.isLoaded = true;
                });
            });
      });
  }
  ngOnDestroy(){
    if(this.s1) this.s1.unsubscribe(); 
  }

}
