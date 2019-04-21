import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';
import { RecipeService, Recipe } from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private statusSubscription: Subscription;

  constructor(private socketService: SocketService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.socketService.send({ type: 'RecipesListRequest' });
    this.statusSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'RecipesList')).subscribe(message => {
      this.recipes = message.data['recipes'];
    });
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

  pour(recipe: Recipe) {
    this.socketService.send({ type: 'PourRequest', data: { recipeId: recipe._id } });
  }
}
