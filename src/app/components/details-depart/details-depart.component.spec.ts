import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDepartComponent } from './details-depart.component';

describe('DetailsDepartComponent', () => {
  let component: DetailsDepartComponent;
  let fixture: ComponentFixture<DetailsDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDepartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
