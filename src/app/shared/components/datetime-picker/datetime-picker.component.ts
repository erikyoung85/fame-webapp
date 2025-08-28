import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/angular/standalone';
import { formatISO, parseISO } from 'date-fns';
import { isNotNil } from 'ramda';
import { TypedControlValueAccessor } from 'src/app/core/interfaces/typed-control-value-accessor.interface';
import { generateUUID } from '../../utils/generate-uuid.util';

@Component({
  selector: 'shared-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
  imports: [IonDatetimeButton, IonDatetime, IonModal],
})
export class DatetimePickerComponent
  implements TypedControlValueAccessor<string | undefined>
{
  protected readonly _id = `datetime-${generateUUID()}`;

  protected readonly _value = signal<string | undefined>(formatISO(new Date()));
  protected readonly _isDisabled = signal<boolean>(false);
  protected readonly _isTouched = signal<boolean>(false);

  protected valueSubmitted(newValue: string | string[] | null | undefined) {
    if (this._isDisabled() || Array.isArray(newValue)) {
      return;
    }

    if (isNotNil(newValue)) {
      newValue = formatISO(parseISO(newValue));
    }

    this._isTouched.set(true);
    this._onTouched();

    this._value.set(newValue ?? undefined);
    this._onChange(this._value());
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
