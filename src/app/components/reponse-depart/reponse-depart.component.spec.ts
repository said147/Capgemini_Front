import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseDepartComponent } from './reponse-depart.component';

describe('ReponseDepartComponent', () => {
  let component: ReponseDepartComponent;
  let fixture: ComponentFixture<ReponseDepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseDepartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseDepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
