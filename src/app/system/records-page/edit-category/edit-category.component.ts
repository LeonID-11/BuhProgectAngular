import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriasService } from '../../shared/services/categorias.service';
import { Message } from '../../../shared/models/message.model';
import { Subscription } from '../../../../../node_modules/rxjs';

@Component({
  selector: 'buh-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] =[];
  @Output() onCategoryEddit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  sub1: Subscription;

  constructor(private categoriesServic: CategoriasService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onSubmit(form: NgForm){
    let {name, capacity} = form.value;
    if(capacity < 0) capacity *= -1;

    const category = new Category(name, capacity, +this.currentCategoryId);
    this.sub1 = this.categoriesServic.updateCategory(category)
      .subscribe((category: Category)=>{
        this.onCategoryEddit.emit(category);
        this.message.text = "Категория успешно отредактирована";
        window.setTimeout( ()=>this.message.text = "", 5000);
      });
  }

  onCategoryChange(){
    this.currentCategory = this.categories
      .find(cat=> cat.id === +this.currentCategoryId);
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
  }
}
