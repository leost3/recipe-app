import { ShoppingListService } from "./../../../shopping-list/shopping-list.service";
import { RecipeService } from "../../recipe.service";
import { Recipe } from "./../../recipe.model";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"]
})
export class RecipeItemComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private shoppingListServe: ShoppingListService
  ) {}
  @Input("myRecipes") recipe: Recipe;
  @Input() index: number;
  ngOnInit() {}

  onClick() {
    console.log(this.recipe);
    // this.recipeService.recipeSelected.emit(this.recipe);
  }
}
