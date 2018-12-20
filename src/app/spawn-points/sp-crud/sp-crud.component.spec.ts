import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCrudComponent } from './sp-crud.component';

describe('SpCrudComponent', () => {
  let component: SpCrudComponent;
  let fixture: ComponentFixture<SpCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
