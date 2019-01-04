import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrCrudComponent } from './nr-crud.component';

describe('NrCrudComponent', () => {
  let component: NrCrudComponent;
  let fixture: ComponentFixture<NrCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
