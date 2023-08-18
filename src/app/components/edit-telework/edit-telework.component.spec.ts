import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeleworkComponent } from './edit-telework.component';

describe('EditTeleworkComponent', () => {
  let component: EditTeleworkComponent;
  let fixture: ComponentFixture<EditTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
