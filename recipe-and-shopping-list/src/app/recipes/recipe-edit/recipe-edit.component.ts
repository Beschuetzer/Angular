import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    const ingredientsFormArray = this.form.get('ingredients') as FormArray;
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

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl("", Validators.required),
        amount: new FormControl(0, 
          [Validators.required, Validators.min(1)],
        ),
      })
    )
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
  }

  onFormSubmit() {
    console.log(this.form);
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(
                ingredient.amount,
                [Validators.required, Validators.min(1),
                Validators.pattern(/^[1-9]+[0-9]*$/i)]
              ),
            })
          );
        }
      }
      // ingredients = currentRecipe.ingredients;
    }

    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, 
        [
          Validators.required, Validators.pattern(/^http[s]*:\/\//i),
        ],
      ),
      description: new FormControl(
        description, 
        [
          Validators.required, Validators.minLength(1)
        ],
      ),
      ingredients: recipeIngredients,
    });
  }
}
