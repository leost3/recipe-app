import { AuthGuardService } from "./auth-guard.service";
import { AuthComponent } from "./auth/auth.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "auth", component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
