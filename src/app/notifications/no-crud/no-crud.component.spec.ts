import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCrudComponent } from './no-crud.component';

describe('NoCrudComponent', () => {
  let component: NoCrudComponent;
  let fixture: ComponentFixture<NoCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
