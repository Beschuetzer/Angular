import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode = false;
  public form: FormGroup;

  get ingredientControls() {
    console.log('this.form =', this.form);
    const ingredientsFormArray = this.form.get('ingredients') as FormArray;
    console.log('ingredientsFormArray =', ingredientsFormArray);
    return ingredientsFormArray.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.editMode = params.id ? true : false;
      this.initializeForm();
    });
  }

  onFormSubmit() {
    console.log('form submit------------------------------------------------');
  }

  private initializeForm() {
    let name = '';
    let description = '';
    let imagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const currentRecipe = this.recipesService.getRecipe(this.id);
      name = currentRecipe.name;
      imagePath = currentRecipe.imagePath;
      description = currentRecipe.description;

      if (currentRecipe.ingredients?.length > 0) {
        for (let ingredient of currentRecipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
      // ingredients = currentRecipe.ingredients;
    }

    this.form = new FormGroup({
      name: new FormControl(name),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
      ingredients: recipeIngredients,
    });
  }
}
