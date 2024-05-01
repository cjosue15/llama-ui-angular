import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  Optional,
  forwardRef,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';

import { LlamaFormFieldControl } from '../llama-form-field/directives/llama-form-field-control';
import { LLAMA_FORM_FIELD, LlamaFormField } from '../llama-form-field';

export const LLAMA_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LlamaInput),
  multi: true,
};

let nextUniqueId = 0;

@Directive({
  selector: 'input[llamaInput]',
  exportAs: 'llamaInput',
  standalone: true,
  providers: [
    LLAMA_INPUT_VALUE_ACCESSOR,
    { provide: LlamaFormFieldControl, useExisting: LlamaInput },
  ],
  host: {
    class: 'llama-input-element',

    '[id]': 'id',
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.name]': 'name()',
    '[attr.readonly]': 'readonly || null',
    '[attr.id]': 'id',

    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)',
    '(input)': '_onChange($event.target.value)',
  },
})
export class LlamaInput
  implements OnInit, ControlValueAccessor, LlamaFormFieldControl<string>
{
  protected _uid = `llama-input-${nextUniqueId++}`;
  readonly _isTextarea: boolean = false;
  readonly _isInFormField: boolean = false;

  name = input<string>('');

  focused = false;

  public ngControl: NgControl | null = null;

  public _onTouched = () => {};

  public _onChange: (value: string) => void = () => {};

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    if (value !== this.value) {
      this._value = value;
    }
  }
  protected _value: string = '';

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  controlType = 'llama-input';

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value || this._uid;
  }
  protected _id = '';

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  @Input() placeholder = '';

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  get empty(): boolean {
    return !this._elementRef.nativeElement.value;
  }

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  @Input()
  get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  /**
   * Implemented as part of LlamaFormFieldControl.
   * @docs-private
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);

    if (this.focused) {
      this.focused = false;
    }
  }
  protected _disabled = false;

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Inject(Injector) private injector: Injector,
    @Optional() @Inject(LLAMA_FORM_FIELD) protected _formField?: LlamaFormField

    // @Optional() @Self() public ngControl: NgControl
  ) {
    // eslint-disable-next-line no-self-assign
    this.id = this.id;

    this._isInFormField = !!_formField;
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: string): void {
    this.value = value;
    this._elementRef.nativeElement.value = value;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor.
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _focusChanged(isFocused: boolean): void {
    if (isFocused !== this.focused) {
      this.focused = isFocused;

      if (!this.focused) {
        this._onTouched();
      }
    }
  }

  focus() {
    this._elementRef.nativeElement.focus();
  }

  onContainerClick(): void {
    if (!this.focused) {
      this.focus();
    }
  }
}
