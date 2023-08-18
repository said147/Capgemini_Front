import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseTeleworkComponent } from './reponse-telework.component';

describe('ReponseTeleworkComponent', () => {
  let component: ReponseTeleworkComponent;
  let fixture: ComponentFixture<ReponseTeleworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseTeleworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseTeleworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
