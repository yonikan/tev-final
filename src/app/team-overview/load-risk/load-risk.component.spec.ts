import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadRiskComponent } from './load-risk.component';

describe('LoadRiskComponent', () => {
  let component: LoadRiskComponent;
  let fixture: ComponentFixture<LoadRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
