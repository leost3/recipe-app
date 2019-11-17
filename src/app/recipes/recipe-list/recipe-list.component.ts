import { RecipesResolverService } from "./../recipes-resolver.service";
import { DataStorageService } from "./../../shared/data-storage.service";
import { Subscription } from "rxjs";
import { ShoppingListService } from "./../../shopping-list/shopping-list.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../recipe.service";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  constructor(
    private dataStorage: DataStorageService,
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    this.dataStorage.fetchRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.subscription = this.recipeService.editedRecipe.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
        console.log(this.recipes);
      }
    );

    // this.dataStorageService.fetchRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
