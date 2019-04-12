import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddTagComponent } from './input-add-tag.component';

describe('InputAddTagComponent', () => {
  let component: InputAddTagComponent;
  let fixture: ComponentFixture<InputAddTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputAddTagComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
