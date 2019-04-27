import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsNotAuthorizedComponent } from './us-not-authorized.component';

describe('UsNotAuthorizedComponent', () => {
  let component: UsNotAuthorizedComponent;
  let fixture: ComponentFixture<UsNotAuthorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsNotAuthorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsNotAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
