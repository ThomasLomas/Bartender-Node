import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationIngredientsComponent } from './configuration-ingredients.component';

describe('ConfigurationIngredientsComponent', () => {
  let component: ConfigurationIngredientsComponent;
  let fixture: ComponentFixture<ConfigurationIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
