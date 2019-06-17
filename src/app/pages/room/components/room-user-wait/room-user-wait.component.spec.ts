import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUserWaitComponent } from './room-user-wait.component';

describe('RoomUserWaitComponent', () => {
  let component: RoomUserWaitComponent;
  let fixture: ComponentFixture<RoomUserWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomUserWaitComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUserWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
