import { AuthService } from "./../auth/auth.service";
import { Recipe } from "./../recipes/recipe.model";
import { RecipeService } from "./../recipes/recipe.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipe() {
    const recipes = this.recipeServices.getRecipes();
    this.http
      .put(
        "https://angular-recipe-app-c6b58.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe(resp => {
        console.log(resp);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        "https://angular-recipe-app-c6b58.firebaseio.com/recipes.json"
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeServices.loadRecipes(recipes);
        })
      );

    // .subscribe(recipes => {
    //   this.recipeServices.loadRecipes(recipes);
    // });
  }
}
