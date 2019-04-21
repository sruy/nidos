import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsLoginComponent } from './us-login.component';

describe('UsLoginComponent', () => {
  let component: UsLoginComponent;
  let fixture: ComponentFixture<UsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
