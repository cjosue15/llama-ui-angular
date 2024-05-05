import { NgModule } from '@angular/core';
import {
  LlamaDialogContent,
  LlamaDialogContainer,
} from './directives/llama-dialog';

const LLAMA_DIALOG_DIRECTIVES = [LlamaDialogContainer, LlamaDialogContent];

@NgModule({
  imports: [...LLAMA_DIALOG_DIRECTIVES],
  exports: [LLAMA_DIALOG_DIRECTIVES],
})
export class LlamaDialogModule {}
