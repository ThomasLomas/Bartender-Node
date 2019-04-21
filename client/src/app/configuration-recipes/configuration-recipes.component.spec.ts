import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationRecipesComponent } from './configuration-recipes.component';

describe('ConfigurationRecipesComponent', () => {
  let component: ConfigurationRecipesComponent;
  let fixture: ComponentFixture<ConfigurationRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
