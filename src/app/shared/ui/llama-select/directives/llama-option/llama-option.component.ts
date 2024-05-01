import {
  Component,
  ElementRef,
  HostListener,
  ViewEncapsulation,
  inject,
  Output,
  viewChild,
  EventEmitter,
  input,
  booleanAttribute,
} from '@angular/core';

import { LlamaSelect } from '../../llama-select';

/** Event object emitted by MatOption when selected or deselected. */
export class LlamaOptionSelectionChange<T = any> {
  constructor(public source: LlamaOption<T>) {}
}

let _uniqueIdCounter = 0;

@Component({
  selector: 'llama-option',
  template: `
    @if (multiple) {
      <input
        type="checkbox"
        class="llama-option--checkbox"
        [checked]="selected" />
    }

    <span class="llama-option--text" #text>
      <ng-content />
    </span>
  `,
  standalone: true,
  host: {
    role: 'option',
    class: 'llama-option',
    '[class.llama-option--selected]': 'selected',
    '[class.llama-option--multiple]': 'multiple',
    '[class.llama-option--disabled]': 'disabled()',
    '[id]': 'id()',
    '[attr.aria-selected]': 'selected',
    '[attr.aria-disabled]': 'disabled().toString()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class LlamaOption<T = any> {
  value = input<T>();

  id = input<string>(`llama-option-${_uniqueIdCounter++}`);

  @Output() selectionChange = new EventEmitter<LlamaOptionSelectionChange<T>>();

  text = viewChild<ElementRef<HTMLSpanElement>>('text');

  selected = false;

  disabled = input<any, boolean>(false, {
    transform: booleanAttribute,
  });

  get multiple() {
    return this.parentSelect.multiple();
  }

  private parentSelect = inject(LlamaSelect);

  @HostListener('click')
  _onClickOption() {
    if (this.disabled()) return;
    this.selected = this.multiple ? !this.selected : true;
    this.selectionChange.emit(new LlamaOptionSelectionChange(this));
  }

  get viewValue() {
    if (this.text() === null) return '';
    return (this.text()!.nativeElement.textContent || '').trim();
  }

  select() {
    if (this.disabled()) return;

    this.selected = true;
  }

  deselect() {
    if (this.disabled()) return;

    this.selected = false;
  }
}
