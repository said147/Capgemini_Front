import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTeleworkComponent } from './details-telework.component';

describe('DetailsTeleworkComponent', () => {
  let component: DetailsTeleworkComponent;
  let fixture: ComponentFixture<DetailsTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
