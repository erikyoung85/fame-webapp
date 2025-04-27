import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { TeamDetail } from '../../models/TeamDetail.model';
import { favoriteTeamResolver } from './favorite-team.resolver';

describe('favoriteTeamResolver', () => {
  const executeResolver: ResolveFn<TeamDetail | undefined> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      favoriteTeamResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
