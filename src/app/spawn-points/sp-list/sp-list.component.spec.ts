import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpListComponent } from './sp-list.component';

describe('SpListComponent', () => {
  let component: SpListComponent;
  let fixture: ComponentFixture<SpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
