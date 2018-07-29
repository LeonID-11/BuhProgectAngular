import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { CategoriasService } from '../shared/services/categorias.service';

@Component({
  selector: 'buh-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.sass']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[] = [];
  isLoaded = false;

  constructor(
    private categoriesService: CategoriasService
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[])=>{
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category){
    this.categories.push(category);
  }

  categoryWasEdited(category:Category){
    const idx = this.categories
      .findIndex(cat => cat.id === category.id);
    this.categories[idx] = category;
  }
}
