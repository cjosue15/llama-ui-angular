import { NgModule } from '@angular/core';
import { LlamaSelect } from './llama-select';
import { LlamaOption } from './directives/llama-option/llama-option.component';

const LLAMA_SELECT_DIRECTIVES = [LlamaSelect, LlamaOption];

@NgModule({
  imports: [...LLAMA_SELECT_DIRECTIVES],
  exports: [LLAMA_SELECT_DIRECTIVES],
})
export class LlamaSelectModule {}
