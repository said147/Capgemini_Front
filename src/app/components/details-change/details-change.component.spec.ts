import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsChangeComponent } from './details-change.component';

describe('DetailsChangeComponent', () => {
  let component: DetailsChangeComponent;
  let fixture: ComponentFixture<DetailsChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
