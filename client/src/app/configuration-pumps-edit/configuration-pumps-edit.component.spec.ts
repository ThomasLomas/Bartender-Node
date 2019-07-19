import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPumpsEditComponent } from './configuration-pumps-edit.component';

describe('ConfigurationPumpsEditComponent', () => {
  let component: ConfigurationPumpsEditComponent;
  let fixture: ComponentFixture<ConfigurationPumpsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationPumpsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPumpsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
