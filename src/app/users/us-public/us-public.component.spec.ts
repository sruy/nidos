import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsPublicComponent } from './us-public.component';

describe('UsPublicComponent', () => {
  let component: UsPublicComponent;
  let fixture: ComponentFixture<UsPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
