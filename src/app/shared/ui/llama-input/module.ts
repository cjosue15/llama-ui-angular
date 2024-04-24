import { NgModule } from '@angular/core';
import { LlamaInput } from './llama-input';

const LLAMA_INPUT_DIRECTIVES = [LlamaInput];

@NgModule({
  imports: [...LLAMA_INPUT_DIRECTIVES],
  exports: [LLAMA_INPUT_DIRECTIVES],
})
export class LlamaInputModule {}
