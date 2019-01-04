import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrListComponent } from './nr-list.component';

describe('NrListComponent', () => {
  let component: NrListComponent;
  let fixture: ComponentFixture<NrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
