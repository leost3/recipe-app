import { Subscription } from "rxjs";
import { Ingredient } from "./../../shared/ingredient.model";
import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild
} from "@angular/core";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl: "./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild("editForm", { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServe: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListServe.editIngredient.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListServe.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  addIngredient(form: NgForm) {
    console.log(form.value);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.editMode
      ? this.shoppingListServe.updateIngredient(
          this.editedItemIndex,
          newIngredient
        )
      : this.shoppingListServe.addIngredient(newIngredient);

    this.editMode = false;
    form.reset();
    // this.ingredientAdded.emit(newIngredient);
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    this.onClear();
    this.shoppingListServe.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
