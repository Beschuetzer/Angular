import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  public id: number;
  public editMode = false;
  public form: FormGroup;
  public hasSaved = false;
  private canSave = true;
  private canSaveInterval = 2500;
  private autoSaveTimeoutId;
  private timeOfLastSave: number;
  private initialRecipeState: Recipe;

  get ingredientControls() {
    const ingredientsFormArray = this.form.get('ingredients') as FormArray;
    return ingredientsFormArray.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private dataStorageService: DataStorageService,
  ) { }

  checkCanHandleValueChange() {
    if (this.autoSaveTimeoutId) clearTimeout(this.autoSaveTimeoutId);
    if (!this.form.valid || this.canSave === false) {
      this.hasSaved = false;
      this.autoSaveTimeoutId = setTimeout(() => {
        this.handleFormValueChange();
      }, (Date.now() - this.timeOfLastSave));
      return null;
    }

    this.canSave = false;
    setTimeout(() => {
      this.canSave = true;
    }, this.canSaveInterval)
    return 1;
  }

  handleFormValueChange(){
    const shouldContinue = this.checkCanHandleValueChange();
    if (!shouldContinue) return;

    const paramId = this.route.snapshot.params.id;
    if (paramId) {
      this.updateSavedForm();
    } else {
      this.saveNewForm();
      this.router.navigate(['/recipes', (this.recipesService.getRecipesLength() - 1), 'edit']);
    }
    this.dataStorageService.storeAllRecipes();
  }

  getNewRecipe() {
    const { name, description, imagePath, ingredients } = this.form.value;
    const newRecipe = new Recipe(name, description, imagePath, []);
    
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      newRecipe.ingredients.push(
        new Ingredient(ingredient.name, ingredient.amount)
      )
    }

    this.hasSaved = true;
    this.timeOfLastSave = Date.now();
    return newRecipe;
  }

  saveNewForm() {
    const newRecipe = this.getNewRecipe();
    this.recipesService.addRecipe(newRecipe);

  }

  updateSavedForm() {
    const newRecipe = this.getNewRecipe();
    this.recipesService.updateRecipe(this.id, newRecipe);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (!this.recipesService.getIsValidId(+this.id)) return this.router.navigate(['/recipes']);
    this.initializeForm();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.editMode = params.id ? true : false;
      this.initializeForm();
    });
    this.initialRecipeState = this.recipesService.getRecipe(this.id);
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
    this.handleFormValueChange();
  }
  

  onFormSubmit() {
    console.log(this.form);
  }

  onUndoFormChanges() {
    this.recipesService.updateRecipe(this.id, this.initialRecipeState);
    this.initializeForm();
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
