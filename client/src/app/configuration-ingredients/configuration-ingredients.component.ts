import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';
import { filter } from 'rxjs/operators';
import { Ingredient, IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-configuration-ingredients',
  templateUrl: './configuration-ingredients.component.html',
  styleUrls: ['./configuration-ingredients.component.scss']
})
export class ConfigurationIngredientsComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  private statusSubscription: Subscription;
  constructor(private socketService: SocketService, private ingredientService: IngredientService) { }

  ngOnInit() {
    this.socketService.send({ type: 'IngredientsListRequest' });
    this.statusSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'IngredientsList')).subscribe(message => {
      this.ingredients = message.data['ingredients'];
    });
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredientService.delete(ingredient);
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }
}
