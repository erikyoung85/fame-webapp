import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { UserProfile } from '../../models/UserProfile.model';
import { userProfileResolver } from './user-profile.resolver';

describe('userProfileResolver', () => {
  const executeResolver: ResolveFn<UserProfile | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      userProfileResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
