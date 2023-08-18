import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHandoverComponent } from './request-handover.component';

describe('RequestHandoverComponent', () => {
  let component: RequestHandoverComponent;
  let fixture: ComponentFixture<RequestHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestHandoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
