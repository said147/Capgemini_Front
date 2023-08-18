import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHandoverComponent } from './edit-handover.component';

describe('EditHandoverComponent', () => {
  let component: EditHandoverComponent;
  let fixture: ComponentFixture<EditHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHandoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
