import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDepartComponent } from './request-depart.component';

describe('RequestDepartComponent', () => {
  let component: RequestDepartComponent;
  let fixture: ComponentFixture<RequestDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDepartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
