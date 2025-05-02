import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ionInputAutoGrow]',
  standalone: true,
})
export class IonInputAutoGrowDirective implements AfterViewInit {
  @Input() placeholder: string = '';

  private readonly renderer = inject(Renderer2);

  private readonly ionInput: HTMLIonInputElement =
    inject(ElementRef).nativeElement;
  private inputEl!: HTMLInputElement;
  private sizer!: HTMLElement;

  constructor() {
    if (this.ionInput.tagName !== 'ION-INPUT') {
      throw new Error(
        'ionInputAutoGrow directive can only be used on ion-input elements'
      );
    }
    this.sizer = this.renderer.createElement('span');
  }

  async ngAfterViewInit() {
    this.inputEl = await this.ionInput.getInputElement();
    this.initSizer();
    this.updateSizerValue();

    // Observe sizer element changes and update the ion-input width
    const resizeObserver = new ResizeObserver(() => {
      const width = this.sizer.scrollWidth + 2; // Add small buffer
      this.renderer.setStyle(this.ionInput, 'width', `${width}px`);
    });
    resizeObserver.observe(this.sizer);
  }

  @HostListener('input')
  onInput(): void {
    this.updateSizerValue();
  }

  private initSizer(): void {
    const style = this.sizer.style;
    style.position = 'absolute';
    style.visibility = 'hidden';
    style.height = '0';
    style.whiteSpace = 'pre';
    style.font = getComputedStyle(this.ionInput).font || 'inherit';

    this.renderer.appendChild(this.ionInput.parentElement, this.sizer);
  }

  private updateSizerValue(): void {
    if (!this.inputEl) return;

    const value = this.inputEl.value || this.placeholder || '';
    this.sizer.textContent = value;
  }
}
