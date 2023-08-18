import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChangeComponent } from './edit-change.component';

describe('EditChangeComponent', () => {
  let component: EditChangeComponent;
  let fixture: ComponentFixture<EditChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
