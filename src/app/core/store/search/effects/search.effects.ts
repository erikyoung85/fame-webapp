import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SearchItemFactory } from 'src/app/core/models/SearchItem.model';
import { RaffleService } from 'src/app/core/services/raffle/raffle.service';
import { SearchService } from 'src/app/core/services/search/search.service';
import { searchActions } from '../actions/search.actions';

@Injectable()
export class SearchEffects {
  private readonly actions$ = inject(Actions);
  private readonly searchService = inject(SearchService);
  private readonly raffleService = inject(RaffleService);

  fetchGlobalSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchActions.fetchGlobalSearch),
      switchMap((action) => {
        if (action.searchQuery === '') {
          return of(searchActions.clearGlobalSearch());
        }

        return this.searchService.search(action.searchQuery).pipe(
          map((response) => {
            if (response.error !== null) {
              return searchActions.fetchGlobalSearchFailure({
                message: response.error.message,
                paging: action.paging,
              });
            }

            return searchActions.fetchGlobalSearchSuccess({
              searchItems: response.data.map(SearchItemFactory.fromDtoV1),
              paging: {
                page: action.paging.page,
                size: action.paging.size,
                totalCount: response.data.length,
              },
            });
          }),
          catchError((error: Error) => {
            return of(
              searchActions.fetchGlobalSearchFailure({
                message: error.message,
                paging: action.paging,
              })
            );
          })
        );
      })
    )
  );
}
