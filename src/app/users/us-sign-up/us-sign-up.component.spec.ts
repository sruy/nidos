import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsSignUpComponent } from './us-sign-up.component';

describe('UsSignUpComponent', () => {
  let component: UsSignUpComponent;
  let fixture: ComponentFixture<UsSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
