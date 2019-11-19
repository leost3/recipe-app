import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuardService as AuthGuard } from "./auth-guard.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { ShoppingListEditComponent } from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { LoadSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AlertComponent } from "./shared/alert/alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent]
})
export class AppModule {}
