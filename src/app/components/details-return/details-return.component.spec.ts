import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReturnComponent } from './details-return.component';

describe('DetailsReturnComponent', () => {
  let component: DetailsReturnComponent;
  let fixture: ComponentFixture<DetailsReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReturnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
