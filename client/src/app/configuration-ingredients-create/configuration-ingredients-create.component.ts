import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../configuration-ingredients/configuration-ingredients.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-configuration-ingredients-create',
  templateUrl: './configuration-ingredients-create.component.html',
  styleUrls: ['./configuration-ingredients-create.component.scss']
})
export class ConfigurationIngredientsCreateComponent implements OnInit {
  public ingredientForm: FormGroup;

  constructor(private location: Location, private http: HttpClient) { }

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
      this.http.post(`${environment.httpPath}ingredients`, ingredientFormValue).toPromise().then(resp => {
        this.location.back();
      });
    }
  }

  onCancel() {
    this.location.back();
  }
}
