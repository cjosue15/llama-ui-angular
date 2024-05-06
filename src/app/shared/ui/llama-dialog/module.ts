import { NgModule } from '@angular/core';
import {
  LlamaDialogContent,
  LlamaDialogClose,
  LlamaDialogActions,
} from './directives/llama-dialog-directives';

const LLAMA_DIALOG_DIRECTIVES = [
  LlamaDialogContent,
  LlamaDialogClose,
  LlamaDialogActions,
];

@NgModule({
  imports: [...LLAMA_DIALOG_DIRECTIVES],
  exports: [LLAMA_DIALOG_DIRECTIVES],
})
export class LlamaDialogModule {}
