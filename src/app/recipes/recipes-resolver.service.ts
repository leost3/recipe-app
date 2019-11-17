import { RecipeService } from "./recipe.service";
import { RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { DataStorageService } from "./../shared/data-storage.service";
import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}
  resolve(
    route?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot
  ): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    if (!this.recipeService.getRecipes().length)
      return this.dataStorageService.fetchRecipes();
    return this.recipeService.getRecipes();
  }
}
