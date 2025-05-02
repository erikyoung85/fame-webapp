import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[forceFocusAtEnd]',
  standalone: true,
})
export class IonInputForceFocusAtEndDirective {
  private readonly ionInput: HTMLIonInputElement =
    inject(ElementRef).nativeElement;

  constructor() {
    if (this.ionInput.tagName !== 'ION-INPUT') {
      throw new Error(
        'focusAtEnd directive can only be used on ion-input elements'
      );
    }
  }

  @HostListener('ionFocus')
  onFocus(): void {
    this.moveCursorToEnd(this.ionInput);
  }

  moveCursorToEnd(ionInput: HTMLIonInputElement) {
    setTimeout(async () => {
      const inputElement = await ionInput.getInputElement();
      const length = inputElement.value.length;
      inputElement.setSelectionRange(length, length);
    }, 0);
  }
}
