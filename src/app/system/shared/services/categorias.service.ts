import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriasService extends BaseApi {

  constructor(
    public http: HttpClient
  ) { 
    super(http);
  }

  addCategory(category: Category): Observable<Category>{
    return this.http.post<Category>(this.getUrl('/categories'), category);
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.getUrl('/categories'));
  }
  updateCategory(category: Category): Observable<Category>{
    return this.http.put<Category>(this.getUrl(`/categories/${category.id}`), category);
  }
}
