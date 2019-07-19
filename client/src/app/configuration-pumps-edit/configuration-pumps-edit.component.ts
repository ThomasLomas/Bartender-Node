import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredient } from '../ingredient.service';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Pump } from '../pump.service';

@Component({
  selector: 'app-configuration-pumps-edit',
  templateUrl: './configuration-pumps-edit.component.html',
  styleUrls: ['./configuration-pumps-edit.component.scss']
})
export class ConfigurationPumpsEditComponent implements OnInit {
  pumpForm: FormGroup;
  ingredients: Ingredient[];
  ingredientsSubscription: Subscription;
  pumpsSubscription: Subscription;
  pump: Pump;

  constructor(private router:Router, private route: ActivatedRoute, private socketService: SocketService) { }

  ngOnInit() {
    this.pumpForm = new FormGroup({
      ingredient: new FormControl('', [])
    });

    this.ingredientsSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'IngredientsList')).subscribe(message => {
      this.ingredients = message.data['ingredients'];
    });

    this.route.params.subscribe(params => {
      if(this.pumpsSubscription) {
        this.pumpsSubscription.unsubscribe();
      }

      this.pumpsSubscription = this.socketService.onNewMessage().pipe(filter(message => message.type === 'PumpsList')).subscribe(message => {
        const findPump = message.data['pumps'].find(p => p._id == params['id']);

        if(!findPump) {
          return this.router.navigate(['/configuration']);        
        }

        this.pump = findPump;
//        this.pumpForm.setValue({ ingredient: this.pump.value });
      });
    })

    
    this.socketService.send({ type: 'PumpsListRequest' });
    this.socketService.send({ type: 'IngredientsListRequest' });
  }

  editPump(pump) {
    console.log(pump);
  }

  onCancel() {
    this.router.navigate(['/configuration']);
    this.ingredientsSubscription.unsubscribe();
    this.pumpsSubscription.unsubscribe();
  }
}
