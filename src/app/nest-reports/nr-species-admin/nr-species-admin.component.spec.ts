import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrSpeciesAdminComponent } from './nr-species-admin.component';

describe('NrSpeciesAdminComponent', () => {
  let component: NrSpeciesAdminComponent;
  let fixture: ComponentFixture<NrSpeciesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrSpeciesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrSpeciesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
