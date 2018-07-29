import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { BillService } from './bill.service';
import { BUHEvent } from '../models/buh-event.model';


@Injectable()
export class EventService extends BillService  {

  constructor(
    public http:HttpClient
  ){
    super(http);
  }

  addEvent(event: BUHEvent): Observable<BUHEvent>{
    return this.http.post<BUHEvent>(this.getUrl('/events'), event);
  }

  getEvents(): Observable<BUHEvent[]>{
    return this.http.get<BUHEvent[]>(this.getUrl('/events'));
  }
}
