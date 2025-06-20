// file: city-picker.component.ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import {
  catchError,
  debounceTime,
  filter,
  map,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { CityResponseDtoV1 } from 'src/app/core/services/geo-city/dtos/city.response.dto.v1';
import { GeoCityService } from 'src/app/core/services/geo-city/geo-city.service';
import { ModalDismissRole } from 'src/app/core/services/modalService/city-picker.service';

@Component({
  templateUrl: './pick-city.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class PickCityModalComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  private readonly geoCityService = inject(GeoCityService);
  private readonly modalController = inject(ModalController);

  readonly searchText = new FormControl<string>('', {
    nonNullable: true,
  });
  readonly isLoading = signal<boolean>(false);
  readonly results = signal<CityResponseDtoV1[]>([]);
  nextPageLink: string | undefined = undefined;

  readonly error = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map((searchText) => searchText.trim()),
        debounceTime(500),
        filter((searchText) => searchText.length >= 3),
        switchMap((searchText) => {
          return this.searchCities(searchText);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private searchCities(searchText: string) {
    console.log('Searching for cities:', searchText);
    this.isLoading.set(true);

    return this.geoCityService.getCities(searchText).pipe(
      map((response) => {
        this.results.set(response.data);

        const nextPageLink = response.links.find((link) => link.rel === 'next');
        this.nextPageLink = nextPageLink?.href;

        this.error.set(undefined);
        this.isLoading.set(false);
      }),
      catchError((err) => {
        this.results.set([]);
        this.error.set('Error fetching cities');
        this.isLoading.set(false);
        return of(undefined);
      })
    );
  }

  retrySearch() {
    this.searchCities(this.searchText.value).pipe(take(1)).subscribe();
  }

  onCitySelected(city: CityResponseDtoV1) {
    this.modalController.dismiss(city, ModalDismissRole.Confirm);
  }

  onCloseClicked() {
    this.modalController.dismiss(undefined, ModalDismissRole.Cancel);
  }
}
