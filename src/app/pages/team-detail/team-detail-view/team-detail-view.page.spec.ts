import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamDetailViewPage } from './team-detail-view.page';

describe('TeamDetailViewPage', () => {
  let component: TeamDetailViewPage;
  let fixture: ComponentFixture<TeamDetailViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
