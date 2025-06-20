import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamDetailEditPage } from './team-detail-edit.page';

describe('TeamDetailEditPage', () => {
  let component: TeamDetailEditPage;
  let fixture: ComponentFixture<TeamDetailEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
