import { NgModule } from '@angular/core';
import { LlamaTable } from './table';

const LLAMA_TABLE_DIRECTIVES = [LlamaTable];

@NgModule({
  imports: [...LLAMA_TABLE_DIRECTIVES],
  exports: [LLAMA_TABLE_DIRECTIVES],
})
export class LlamaTableModule {}
