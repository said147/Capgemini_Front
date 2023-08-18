import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVoucherComponent } from './request-voucher.component';

describe('RequestVoucherComponent', () => {
  let component: RequestVoucherComponent;
  let fixture: ComponentFixture<RequestVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
