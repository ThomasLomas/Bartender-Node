import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface Ingredient {
  name: string;
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  create(ingredient: Ingredient): Promise<Ingredient> {
    return this.http.post<Ingredient>(`${environment.httpPath}/ingredients`, ingredient).toPromise();
  }

  delete(ingredient: Ingredient): Promise<any> {
    return this.http.delete(`${environment.httpPath}/ingredients/${ingredient._id}`).toPromise();
  }
}
