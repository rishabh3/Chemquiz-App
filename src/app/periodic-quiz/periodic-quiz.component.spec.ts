import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodicQuizComponent } from './periodic-quiz.component';

describe('PeriodicQuizComponent', () => {
  let component: PeriodicQuizComponent;
  let fixture: ComponentFixture<PeriodicQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodicQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodicQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
