import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Ingredient } from "./../shared/ingredient.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  sendIngredientsToShoppingList = new EventEmitter<Ingredient[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty veggie stuff",
      "delicious green thing",
      "https://images.unsplash.com/photo-1468777675496-5782faaea55b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
      [new Ingredient("tomatoes", 20), new Ingredient("potatoes", 5)]
    ),
    new Recipe(
      "Super Bacon Burger",
      "Tasty baconator mega burger",
      "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
      [new Ingredient("bacon", 10), new Ingredient("chicken", 5)]
    )
  ];
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }
}
