// file: city-picker.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular/standalone';
import {
  catchError,
  debounceTime,
  filter,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { TypedControlValueAccessor } from 'src/app/core/interfaces/typed-control-value-accessor.interface';
import { CityResponseDtoV1 } from './services/dtos/city.response.dto.v1';
import { GeoCityService } from './services/geo-city.service';

@Component({
  selector: 'shared-city-picker',
  templateUrl: './city-picker.component.html',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityPickerComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class CityPickerComponent
  implements OnInit, OnDestroy, TypedControlValueAccessor<string | undefined>
{
  private readonly unsubscribe$ = new Subject<void>();
  private readonly geoCityService = inject(GeoCityService);

  @ViewChild('modal') modal!: IonModal;

  readonly searchText = new FormControl<string>('', {
    nonNullable: true,
  });
  readonly isLoading = signal<boolean>(false);
  readonly results = signal<CityResponseDtoV1[]>([]);
  readonly selectedCity = signal<CityResponseDtoV1 | undefined>(undefined);
  nextPageLink: string | undefined = undefined;

  readonly error = signal<string | undefined>(undefined);

  readonly _value = signal<string | undefined>(undefined);
  readonly _isDisabled = signal<boolean>(false);

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
        return of();
      })
    );
  }

  retrySearch() {
    this.searchCities(this.searchText.value);
  }

  onCitySelected(city: CityResponseDtoV1) {
    this.selectedCity.set(city);
    this._value.set(`${city.city}, ${city.regionCode}`);
    this._onTouched();
    this._onChange(this._value());
    this.modal.dismiss();
  }

  onCloseClicked() {
    this.modal.dismiss();
  }

  // ControlValueAccessor methods
  writeValue(newValue: string | undefined): void {
    this._value.set(newValue);
  }

  private _onChange = (_: string | undefined) => {};
  registerOnChange(fn: (_: string | undefined) => void): void {
    this._onChange = fn;
  }

  private _onTouched = () => {};
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }
}
