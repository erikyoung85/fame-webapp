import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSignupPage } from './user-signup.page';

describe('UserSignupPage', () => {
  let component: UserSignupPage;
  let fixture: ComponentFixture<UserSignupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
