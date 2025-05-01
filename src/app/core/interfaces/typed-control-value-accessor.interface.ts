import { ControlValueAccessor } from '@angular/forms';

export interface TypedControlValueAccessor<TData> extends ControlValueAccessor {
  writeValue(obj: unknown): void;
  registerOnChange(fn: (_: TData) => void): void;
  registerOnTouched(fn: () => void): void;
  setDisabledState?(isDisabled: boolean): void;
}
