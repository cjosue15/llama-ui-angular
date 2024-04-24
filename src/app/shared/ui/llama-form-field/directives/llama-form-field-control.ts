import { AbstractControlDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

export abstract class LlamaFormFieldControl<T> {
  value: T | null = null;

  /**
   * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
   * needs to run change detection.
   */
  // readonly stateChanges: Observable<void>;

  /** The element ID for this control. */
  readonly id: string = '';

  /** The placeholder for this control. */
  readonly placeholder: string = '';

  /** Gets the AbstractControlDirective for this control. */
  readonly ngControl: NgControl | AbstractControlDirective | null = null;

  /** Whether the control is focused. */
  readonly focused: boolean = false;

  /** Whether the control is empty. */
  readonly empty: boolean = true;

  /** Whether the control is required. */
  readonly required: boolean = false;

  /** Whether the control is disabled. */
  readonly disabled: boolean = false;

  /** Whether the control is in an error state. */
  // readonly errorState: boolean;

  /**
   * An optional name for the control type that can be used to distinguish `llama-form-field` elements
   * based on their control type. The form field will add a class,
   * `llama-form-field-type-{{controlType}}` to its root element.
   */
  readonly controlType?: string;

  /**
   * Whether the input is currently in an autofilled state. If property is not present on the
   * control it is assumed to be false.
   */
  // readonly autofilled?: boolean;

  abstract onContainerClick(event: MouseEvent): void;
}
