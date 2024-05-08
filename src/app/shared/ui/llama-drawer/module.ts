import { NgModule } from '@angular/core';
import {
  LlamaDrawerContent,
  LlamaDrawerHeader,
  LlamaDrawerActions,
} from './directives/llama-drawer-directives';

const LLAMA_DRAWER_DIRECTIVES = [
  LlamaDrawerHeader,
  LlamaDrawerContent,
  LlamaDrawerActions,
];

@NgModule({
  imports: [...LLAMA_DRAWER_DIRECTIVES],
  exports: [LLAMA_DRAWER_DIRECTIVES],
})
export class LlamaDrawerModule {}
