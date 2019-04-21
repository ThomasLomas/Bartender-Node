import { Injectable } from '@angular/core';

export interface Recipe {
  name: string;
  _id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }
}
