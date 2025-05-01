import { Directive, Input } from '@angular/core';
import { MaskitoDirective } from '@maskito/angular';
import { MaskitoOptions } from '@maskito/core';

@Directive({
  selector: '[IonInputMask]',
})
export class IonInputMaskDirective extends MaskitoDirective {
  // Override the elementPredicate input to default to the input element of IonInput
  override elementPredicate = async (el: HTMLElement) =>
    (el as HTMLIonInputElement).getInputElement();

  // Override the options input alias to 'appIonMaskito'
  @Input({ alias: 'IonInputMask', required: false })
  override options: MaskitoOptions | null = null;
}
