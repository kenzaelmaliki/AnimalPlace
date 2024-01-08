import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetingPage } from './meeting.page';

describe('MeetingPage', () => {
  let component: MeetingPage;
  let fixture: ComponentFixture<MeetingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeetingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
