import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('ingredientNameInput', { static: true }) nameInputRef: ElementRef;
  @ViewChild('ingredientAmountInput', { static: true })
  amountInputRef: ElementRef;

  // @Output('ingredientAdded') ingredientAdded = new EventEmitter();
  constructor(private shoppingListServe: ShoppingListService) {}

  ngOnInit() {}

  addIngredient() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.shoppingListServe.addIngredient(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
  }
}
