import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  @Output() emitNewIngredient = new EventEmitter<Ingredient>();
  constructor() { }

  ngOnInit(): void {
  }

  onClickAddClick(e: Event) {
    const nameInputElement = this.nameInput.nativeElement;
    const amountInputElement = this.amountInput.nativeElement;
    if (nameInputElement.value !== '' && amountInputElement.value !== '') {
      const newIngredient = new Ingredient(nameInputElement.value, amountInputElement.value);
      this.emitNewIngredient.emit(newIngredient);
    }
  }

  onClickDeleteClick(e: Event) {
    console.log('e =', e);
  }
  
  onClickClearClick(e: Event) {
    console.log('e =', e);
  }

}
