import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';

/**
 * Sapphire search input field.
 */
@Directive({
  selector: 'input[spSearchFieldInput]',
  host: {
    class: 'sapphire-search-field__input',
    type: 'search',
    '[placeholder]': 'placeholder || " "',
  },
  exportAs: 'spSearchFieldInput',
})
export class SearchFieldInputDirective {
  /**
   * Whether the input is disabled
   */
  @HostBinding('class.is-disabled')
  @Input()
  disabled?: BooleanInput;

  /**
   * Emitted when `Enter` is pressed to submit the search
   */
  @Output('spSearchFieldSubmitted')
  submitted = new EventEmitter<string>();

  /**
   * Input's placeholder
   */
  @Input()
  placeholder?: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('keydown', ['$event'])
  _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clear();
    } else if (event.key === 'Enter') {
      this.submitted.emit(this.elementRef.nativeElement.value);
    }
  }

  clear() {
    const element: HTMLInputElement | undefined = this.elementRef.nativeElement;
    if (element) {
      element.value = '';
    }
  }
}
