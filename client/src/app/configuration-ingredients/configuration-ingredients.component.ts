import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';
import { filter } from 'rxjs/operators';

interface Ingredient {
  name: 'string';
}

@Component({
  selector: 'app-configuration-ingredients',
  templateUrl: './configuration-ingredients.component.html',
  styleUrls: ['./configuration-ingredients.component.scss']
})
export class ConfigurationIngredientsComponent implements OnInit {

  ingredients: Ingredient[] = [];
  displayedColumns: string[] = ['name', 'actions'];

  private statusSubscription: Subscription;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.send({ type: 'IngredientsListRequest' });
    this.statusSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'IngredientsList')).subscribe(message => {
      console.log('IngredientsList received', message.data);
      this.ingredients = message.data['ingredients'];
    });
  }

}
