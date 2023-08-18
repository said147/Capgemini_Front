import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseChangeComponent } from './reponse-change.component';

describe('ReponseChangeComponent', () => {
  let component: ReponseChangeComponent;
  let fixture: ComponentFixture<ReponseChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponseChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
