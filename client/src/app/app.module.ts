import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressBarModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatusComponent } from './status/status.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CustomComponent } from './custom/custom.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationIngredientsComponent } from './configuration-ingredients/configuration-ingredients.component';
import { ConfigurationIngredientsCreateComponent } from './configuration-ingredients-create/configuration-ingredients-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationPumpsComponent } from './configuration-pumps/configuration-pumps.component';
import { ConfigurationRecipesComponent } from './configuration-recipes/configuration-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StatusComponent,
    RecipesComponent,
    CustomComponent,
    ConfigurationComponent,
    ConfigurationIngredientsComponent,
    ConfigurationIngredientsCreateComponent,
    ConfigurationPumpsComponent,
    ConfigurationRecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
