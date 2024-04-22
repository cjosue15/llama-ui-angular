import { NgModule } from '@angular/core';
import { LlamaButton } from './llama-button';

const LLAMA_BUTTON_DIRECTIVES = [LlamaButton];

@NgModule({
  imports: [...LLAMA_BUTTON_DIRECTIVES],
  exports: [LLAMA_BUTTON_DIRECTIVES],
})
export class LlamaButtonModule {}
