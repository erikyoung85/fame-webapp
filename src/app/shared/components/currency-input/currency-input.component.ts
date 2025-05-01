import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  signal,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonInput, IonText } from '@ionic/angular/standalone';
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { TypedControlValueAccessor } from 'src/app/core/interfaces/typed-control-value-accessor.interface';
import { IonInputAutoGrowDirective } from '../../directives/ion-input-autogrow.directive';
import { IonInputMaskDirective } from '../../directives/ion-input-mask.directive';
import { currencyMaskOptions } from '../../masks/currency.mask';
import safeParseFloat from '../../utils/safeParseFloat.util';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
  imports: [
    IonText,
    IonInput,
    IonInputMaskDirective,
    ReactiveFormsModule,
    FormsModule,
    IonInputAutoGrowDirective,
  ],
})
export class CurrencyInputComponent
  implements TypedControlValueAccessor<number | undefined>
{
  protected readonly currencyMask: MaskitoOptions = currencyMaskOptions;

  protected readonly _value = signal<string>('');
  protected readonly _isDisabled = signal<boolean>(false);

  protected onInputChange(newValue: string): void {
    this._value.set(newValue);
    const parsedValue = this.parseStringToNumber(newValue);
    this._onChange(parsedValue);
  }

  // ControlValueAccessor methods
  writeValue(value: unknown): void {
    const valueString = value?.toString() ?? '';
    const transformedValue = maskitoTransform(valueString, this.currencyMask);
    this._value.set(transformedValue);
  }

  protected _onChange = (_: number | undefined) => {};
  registerOnChange(fn: (_: number | undefined) => void): void {
    this._onChange = fn;
  }

  protected _onTouched = () => {};
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  private parseStringToNumber(value: string): number | undefined {
    const numberString = value.replace(/[^0-9.-]+/g, '');
    const parsedValue = safeParseFloat(numberString);
    return parsedValue;
  }
}
