import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() emitClickedRecipeName = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeClick () {
    console.log('recipeClicked on item------------------------------------------------');
    this.emitClickedRecipeName.emit();
  }

}
