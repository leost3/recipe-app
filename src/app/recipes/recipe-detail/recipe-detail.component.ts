import { Recipe } from "./../recipe.model";
import { RecipeService } from "./../recipe.service";
import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe;
  recipe: Recipe;
  id: number;
  constructor(
    private recipeService: RecipeService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = +params.id;
      // const selectedRrecipe = this.recipeService.getRecipes().find(recipe => {
      //   return recipe.id === this.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  sendIngredientsToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
