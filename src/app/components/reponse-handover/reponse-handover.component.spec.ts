import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseHandoverComponent } from './reponse-handover.component';

describe('ReponseHandoverComponent', () => {
  let component: ReponseHandoverComponent;
  let fixture: ComponentFixture<ReponseHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseHandoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
