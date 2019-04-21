import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPumpsComponent } from './configuration-pumps.component';

describe('ConfigurationPumpsComponent', () => {
  let component: ConfigurationPumpsComponent;
  let fixture: ComponentFixture<ConfigurationPumpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationPumpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPumpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
