import {
  AfterContentInit,
  Component,
  ContentChild,
  InjectionToken,
  ViewEncapsulation,
} from '@angular/core';
import { LlamaLabel } from './directives/llama-label';
import { LlamaFormFieldControl } from './directives/llama-form-field-control';
import { getLlamaFormFieldMissingControlError } from './directives/llama-form-field-errors';
import { AbstractControlDirective } from '@angular/forms';
import { NgClass } from '@angular/common';

export const LLAMA_FORM_FIELD = new InjectionToken<LlamaFormField>(
  'LlamaFormField'
);

@Component({
  selector: 'llama-form-field',
  templateUrl: './llama-form-field.html',
  styleUrl: './llama-form-field.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'llama-form-field',
    '[class.llama-form-field-invalid]': 'errorState',
  },
  standalone: true,
  imports: [NgClass],
})
export class LlamaFormField implements AfterContentInit {
  @ContentChild(LlamaLabel) label: LlamaLabel | null = null;
  @ContentChild(LlamaFormFieldControl)
  _formFieldControl!: LlamaFormFieldControl<any>;

  get _control(): LlamaFormFieldControl<any> {
    return this._formFieldControl;
  }

  get errorState() {
    const control = this._control.ngControl;
    return !!(control && control.invalid && control.touched);
  }

  ngAfterContentInit() {
    this._assertFormFieldControl();
  }

  wrapperClass() {
    return {
      'llama-form-field-focused': this._control.focused,

      'ng-untouched': this.getStateInControl('untouched'),
      'ng-touched': this.getStateInControl('touched'),
      'ng-pristine': this.getStateInControl('pristine'),
      'ng-dirty': this.getStateInControl('dirty'),
      'ng-valid': this.getStateInControl('valid'),
      'ng-invalid': this.getStateInControl('invalid'),
      'ng-pending': this.getStateInControl('pending'),
    };
  }

  getStateInControl(prop: keyof AbstractControlDirective) {
    const control = this._control ? this._control.ngControl : null;
    return control && control[prop];
  }

  private _assertFormFieldControl() {
    if (!this._control) {
      throw getLlamaFormFieldMissingControlError();
    }
  }
}
