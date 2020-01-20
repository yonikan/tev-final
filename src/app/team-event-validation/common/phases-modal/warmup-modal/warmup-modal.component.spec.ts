import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarmupModalComponent } from './warmup-modal.component';

describe('WarmupModalComponent', () => {
  let component: WarmupModalComponent;
  let fixture: ComponentFixture<WarmupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarmupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarmupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
