import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Ingredient, IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-configuration-ingredients-create',
  templateUrl: './configuration-ingredients-create.component.html',
  styleUrls: ['./configuration-ingredients-create.component.scss']
})
export class ConfigurationIngredientsCreateComponent implements OnInit {
  public ingredientForm: FormGroup;

  constructor(private location: Location, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.maxLength(100) ])
    });
  }

  hasError(controlName, errorName) {
    return this.ingredientForm.controls[controlName].hasError(errorName);
  }

  createIngredient(ingredientFormValue: Ingredient) {
    if (this.ingredientForm.valid) {
      this.ingredientService.create(ingredientFormValue).then(() => {
        this.location.back();
      });
    }
  }

  onCancel() {
    this.location.back();
  }
}
