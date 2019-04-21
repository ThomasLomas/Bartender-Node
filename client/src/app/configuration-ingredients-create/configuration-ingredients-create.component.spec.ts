import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationIngredientsCreateComponent } from './configuration-ingredients-create.component';

describe('ConfigurationIngredientsCreateComponent', () => {
  let component: ConfigurationIngredientsCreateComponent;
  let fixture: ComponentFixture<ConfigurationIngredientsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationIngredientsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationIngredientsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
