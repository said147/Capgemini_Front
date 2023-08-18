import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseVoucherComponent } from './reponse-voucher.component';

describe('ReponseVoucherComponent', () => {
  let component: ReponseVoucherComponent;
  let fixture: ComponentFixture<ReponseVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
