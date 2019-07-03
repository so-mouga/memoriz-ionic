import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDisplayScoreComponent } from './room-display-score.component';

describe('RoomDisplayScoreComponent', () => {
  let component: RoomDisplayScoreComponent;
  let fixture: ComponentFixture<RoomDisplayScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomDisplayScoreComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDisplayScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
