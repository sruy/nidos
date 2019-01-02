import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgListComponent } from './mg-list.component';

describe('MgListComponent', () => {
  let component: MgListComponent;
  let fixture: ComponentFixture<MgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
