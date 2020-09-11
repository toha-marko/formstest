import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({ selector: '[onlyCyrillic]' })
export class OnlyCyrillicDirective implements OnInit {
  @Input() onlyCyrillic: boolean;
  @Output() updateValue = new EventEmitter<string>();

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return (/^[а-яё ]/i).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }
  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (!this.onlyCyrillic) {
      this.onKeyPress = (_: any) => true;
      this.blockPaste = (_: any) => true;
    }
  }

  validateFields(event): void {
    setTimeout(() => {
      const filteredValue = this.el.nativeElement.value.replace(/[^а-яё]/gi,
        '').replace(/\s/g, '');
      event.preventDefault();
      this.updateValue.emit(filteredValue);
    }, 100);
  }
}
