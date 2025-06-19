import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthleteDetailEditPage } from './athlete-detail-edit.page';

describe('AthleteDetailEditPage', () => {
  let component: AthleteDetailEditPage;
  let fixture: ComponentFixture<AthleteDetailEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteDetailEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
