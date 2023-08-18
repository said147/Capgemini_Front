import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPriseComponent } from './request-prise.component';

describe('RequestPriseComponent', () => {
  let component: RequestPriseComponent;
  let fixture: ComponentFixture<RequestPriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPriseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestPriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
