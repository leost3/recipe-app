import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() sendRecipes = new EventEmitter();
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is a test',
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80'
    ),
    new Recipe(
      'Anothercipe',
      'This is anotjer test',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    )
  ];
  constructor() {}

  ngOnInit() {}

  getRecipes(recipes) {
    this.sendRecipes.emit(recipes);
  }
}
