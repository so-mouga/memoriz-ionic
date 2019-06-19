import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderExitComponent } from './header-exit.component';

describe('HeaderExitComponent', () => {
  let component: HeaderExitComponent;
  let fixture: ComponentFixture<HeaderExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderExitComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
