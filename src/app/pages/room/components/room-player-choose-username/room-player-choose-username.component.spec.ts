import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPlayerChooseUsernameComponent } from './room-player-choose-username.component';

describe('RoomPlayerChooseUsernameComponent', () => {
  let component: RoomPlayerChooseUsernameComponent;
  let fixture: ComponentFixture<RoomPlayerChooseUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomPlayerChooseUsernameComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPlayerChooseUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
