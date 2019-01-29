import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrShareableComponent } from './nr-shareable.component';

describe('NrShareableComponent', () => {
  let component: NrShareableComponent;
  let fixture: ComponentFixture<NrShareableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrShareableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrShareableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
