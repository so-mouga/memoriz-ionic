import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddChipComponent } from './input-add-chip.component';

describe('InputAddChipComponent', () => {
  let component: InputAddChipComponent;
  let fixture: ComponentFixture<InputAddChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputAddChipComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAddChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
