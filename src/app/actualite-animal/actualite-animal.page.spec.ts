import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActualiteAnimalPage } from './actualite-animal.page';

describe('ActualiteAnimalPage', () => {
  let component: ActualiteAnimalPage;
  let fixture: ComponentFixture<ActualiteAnimalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActualiteAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
