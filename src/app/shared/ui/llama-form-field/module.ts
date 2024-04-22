import { NgModule } from '@angular/core';
import { LlamaFormField } from './llama-form-field';
import { LlamaLabel } from './directives/llama-label';

const LLAMA_FORM_FIELD_DIRECTIVES = [LlamaFormField, LlamaLabel];

@NgModule({
  imports: [...LLAMA_FORM_FIELD_DIRECTIVES],
  exports: [LLAMA_FORM_FIELD_DIRECTIVES],
})
export class LlamaFormFieldModule {}
