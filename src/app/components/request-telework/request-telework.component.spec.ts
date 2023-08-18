import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTeleworkComponent } from './request-telework.component';

describe('RequestTeleworkComponent', () => {
  let component: RequestTeleworkComponent;
  let fixture: ComponentFixture<RequestTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
