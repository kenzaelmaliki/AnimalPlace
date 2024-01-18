import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAnimalsPage } from './update-animals.page';

describe('UpdateAnimalsPage', () => {
  let component: UpdateAnimalsPage;
  let fixture: ComponentFixture<UpdateAnimalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateAnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
