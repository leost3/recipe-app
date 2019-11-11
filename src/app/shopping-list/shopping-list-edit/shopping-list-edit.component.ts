import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  // Ingredient = {};
  // ingredientName: string = '';
  // ingredientAmount: number;
  @ViewChild('ingredientNameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('ingredientAmountInput', { static: true })
  amountInputRef: ElementRef;

  @Output('ingredientAdded') ingredientAdded = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  addIngredient() {
    // this.Ingredient = {
    // name: this.nameInputRef.nativeElement.value,
    // amount: this.amountInputRef.nativeElement.value
    // name: this.ingredientName,
    // amount: +this.ingredientAmount
    // };

    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
  }
}
