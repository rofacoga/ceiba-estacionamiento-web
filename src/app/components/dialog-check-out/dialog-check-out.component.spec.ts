import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckOutComponent } from './dialog-check-out.component';

describe('DialogCheckOutComponent', () => {
  let component: DialogCheckOutComponent;
  let fixture: ComponentFixture<DialogCheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCheckOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
