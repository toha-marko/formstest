import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[onlyCyrillic]' })
export class OnlyCyrillicDirective {

  constructor(private el: ElementRef) { }

  @Output() updateValue = new EventEmitter<string>();

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return (/^[а-яё ]/i).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {
      const filteredValue = this.el.nativeElement.value.replace(/[^а-яё]/gi,
        '').replace(/\s/g, '');
      event.preventDefault();
      this.updateValue.emit(filteredValue);
    }, 100);
  }
}
