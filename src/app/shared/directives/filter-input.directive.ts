import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({ selector: '[filterInput]' })
export class FilterInputDirective implements OnInit {
  @Input() filterInput: { cyrillic: boolean, number: boolean };
  @Output() updateValue = new EventEmitter<string>();

  @HostListener('keypress', ['$event']) onKeyPress(event) { return this.onKeyPressIterator(event); }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) { return this.onPasteIterator(event); }

  private onKeyPressIterator = (_: any) => true;
  private onPasteIterator = (_: any) => { };

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this.filterInput?.number) {
      this.onKeyPressIterator = this.numericKeyPress;
      return;
    }
    if (this.filterInput?.cyrillic) {
      this.onKeyPressIterator = this.cyrillicKeyPless;
      this.onPasteIterator = this.validateCyrillicField;
    }
  }

  private validateCyrillicField(event): void {
    setTimeout(() => {
      const filteredValue = this.el.nativeElement.value.replace(/[^а-яё,. ]/gi,
        '');
      event.preventDefault();
      this.updateValue.emit(filteredValue);
    }, 100);
  }

  private validateNumberActionField(event): boolean {
    if (event === 43) { // check Plus
      this.updateValue.emit(`${Number(this.el.nativeElement.value) + 1}`);
      return false;
    }
    if (event === 45) { // check Minus
      const value = Number(this.el.nativeElement.value);
      if (value > 0) {
        this.updateValue.emit(`${value - 1}`);
      }
      return false;
    }
    return true;
  }

  private cyrillicKeyPless(event): boolean {
    return (/^[а-яё ,.]/i).test(event.key);
  }

  private numericKeyPress(event): boolean {
    return this.validateNumberActionField(event.keyCode);
  }
}
