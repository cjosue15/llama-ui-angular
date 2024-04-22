import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { LlamaLabel } from './directives/llama-label';

@Component({
  selector: 'llama-form-field',
  templateUrl: './llama-form-field.html',
  styleUrl: './llama-form-field.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'llama-form-field',
  },
  standalone: true,
})
export class LlamaFormField {
  @ContentChild(LlamaLabel) label: LlamaLabel | null = null;
}
