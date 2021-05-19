import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/recipes/recipes.service';
import { Recipe } from '../../models/recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() index: number;
  @Input() recipe: Recipe;
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  handleClick(recipe: Recipe) {
    this.router.navigate([recipe.id], {relativeTo: this.route})
  }
}
