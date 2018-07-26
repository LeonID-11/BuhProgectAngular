import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Bill } from '../models/bill.modul';

@Injectable()
export class BillService {

constructor(private http:HttpClient) { }
  getBill(): Observable<Bill>{
    return this.http.get<Bill>('http://localhost:2000/bill');
  }

  getCarrency(){
    return this.http.get<any>('http://data.fixer.io/api/latest?access_key=8b53ec7d3bb83e3aeb57544d44a04827&symbols=UAH,USD,EUR');
  }
}
