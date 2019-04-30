import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgCountdownComponent } from './mg-countdown.component';

describe('MgCountdownComponent', () => {
  let component: MgCountdownComponent;
  let fixture: ComponentFixture<MgCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
