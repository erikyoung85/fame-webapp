import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthleteDetailViewPage } from './athlete-detail-view.page';

describe('AthleteDetailViewPage', () => {
  let component: AthleteDetailViewPage;
  let fixture: ComponentFixture<AthleteDetailViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteDetailViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
