import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgCrudComponent } from './mg-crud.component';

describe('MgCrudComponent', () => {
  let component: MgCrudComponent;
  let fixture: ComponentFixture<MgCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
