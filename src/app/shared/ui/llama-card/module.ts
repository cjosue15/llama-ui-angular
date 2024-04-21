import { NgModule } from '@angular/core';
import { LlamaCard, LlamaCardContent } from './llama-card';

const LLAMA_CARD_DIRECTIVES = [LlamaCard, LlamaCardContent];

@NgModule({
  imports: [...LLAMA_CARD_DIRECTIVES],
  exports: [LLAMA_CARD_DIRECTIVES],
})
export class LlamaCardModule {}
