import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteTeamPage } from './favorite-team.page';

describe('FavoriteTeamPage', () => {
  let component: FavoriteTeamPage;
  let fixture: ComponentFixture<FavoriteTeamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
