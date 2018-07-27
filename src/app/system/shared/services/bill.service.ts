import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { Bill } from '../models/bill.modul';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

constructor(public http:HttpClient) { 
  super(http);
}
  getBill(): Observable<Bill>{
    return this.http.get<Bill>(this.getUrl('/bill'));
  }

  getCarrency(){
    return this.http.get<any>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
  }
}
