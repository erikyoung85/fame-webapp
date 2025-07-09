import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileViewPage } from './user-profile-view.page';

describe('UserProfileViewPage', () => {
  let component: UserProfileViewPage;
  let fixture: ComponentFixture<UserProfileViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
