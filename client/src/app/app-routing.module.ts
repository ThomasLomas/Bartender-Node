import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CustomComponent } from './custom/custom.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationIngredientsCreateComponent } from './configuration-ingredients-create/configuration-ingredients-create.component';
import { ConfigurationPumpsEditComponent } from './configuration-pumps-edit/configuration-pumps-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'custom', component: CustomComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'configuration/ingredients/create', component: ConfigurationIngredientsCreateComponent },
  { path: 'configuration/pumps/:id', component: ConfigurationPumpsEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
