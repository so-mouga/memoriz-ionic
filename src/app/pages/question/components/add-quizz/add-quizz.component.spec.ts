import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizzComponent } from './add-quizz.component';

describe('AddQuizzComponent', () => {
  let component: AddQuizzComponent;
  let fixture: ComponentFixture<AddQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuizzComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
