import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AppState } from 'src/app/store/app.reducer';
import { RecipesService } from '../recipes.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipes.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  public id: number;
  public editMode = false;
  public form: FormGroup;
  public hasSaved = false;
  private canSave = true;
  private canSaveInterval = 2500;
  private autoSaveTimeoutId;
  private timeOfLastSave: number;
  private initialRecipeState: Recipe;
  private storeSub: Subscription;

  get ingredientControls() {
    const ingredientsFormArray = this.form.get('ingredients') as FormArray;
    return ingredientsFormArray.controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private store: Store<AppState>
  ) {}

  checkCanHandleValueChange() {
    if (this.autoSaveTimeoutId) clearTimeout(this.autoSaveTimeoutId);
    if (!this.form.valid || this.canSave === false) {
      this.hasSaved = false;
      this.autoSaveTimeoutId = setTimeout(() => {
        this.handleFormValueChange();
      }, Date.now() - this.timeOfLastSave);
      return null;
    }

    this.canSave = false;
    setTimeout(() => {
      this.canSave = true;
    }, this.canSaveInterval);
    return 1;
  }

  handleFormValueChange() {
    const shouldContinue = this.checkCanHandleValueChange();
    if (!shouldContinue) return;

    const paramId = this.route.snapshot.params.id;
    if (paramId) {
      this.updateSavedForm();
    } else {
      this.saveNewForm();
      this.router.navigate([
        '/recipes',
        this.recipesService.getRecipesLength() - 1,
        'edit',
      ]);
    }
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  getNewRecipe() {
    const { name, description, imagePath, ingredients } = this.form.value;
    const newRecipe = new Recipe(name, description, imagePath, []);

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];
      newRecipe.ingredients.push(
        new Ingredient(ingredient.name, ingredient.amount)
      );
    }

    this.hasSaved = true;
    this.timeOfLastSave = Date.now();
    return newRecipe;
  }

  saveNewForm() {
    const newRecipe = this.getNewRecipe();
    this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
  }

  updateSavedForm() {
    const newRecipe = this.getNewRecipe();
    this.store.dispatch(new RecipeActions.UpdateRecipe({index: +this.id, newRecipe: newRecipe}));
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (!this.recipesService.getIsValidId(+this.id) && this.id !== undefined)
      return this.router.navigate(['/recipes']);
    this.initializeForm();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.editMode = params.id ? true : false;
      this.initializeForm();
    });
    this.initialRecipeState = this.recipesService.getRecipe(this.id);
  }

  ngOnDestroy() {
    if(this.storeSub) this.storeSub.unsubscribe();
  }

  onAddIngredient() {
    (this.form.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(0, [Validators.required, Validators.min(1)]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.form.get('ingredients') as FormArray).removeAt(index);
    this.handleFormValueChange();
  }

  onFormSubmit() {
    console.log(this.form);
  }

  onUndoFormChanges() {
    this.store.dispatch(new RecipeActions.UpdateRecipe({index: +this.id, newRecipe: this.initialRecipeState}))
    this.initializeForm();
  }

  private initializeForm() {
    let name = '';
    let description = '';
    let imagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index === +this.id;
            });
          })
        )
        .subscribe((currentRecipe) => {
          name = currentRecipe.name;
          imagePath = currentRecipe.imagePath;
          description = currentRecipe.description;
    
          if (currentRecipe.ingredients?.length > 0) {
            for (let ingredient of currentRecipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern(/^[1-9]+[0-9]*$/i),
                  ]),
                })
              );
            }
          }
        });
      
      // ingredients = currentRecipe.ingredients;
    }

    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, [
        Validators.required,
        Validators.pattern(/^http[s]*:\/\//i),
      ]),
      description: new FormControl(description, [
        Validators.required,
        Validators.minLength(1),
      ]),
      ingredients: recipeIngredients,
    });
  }
}
