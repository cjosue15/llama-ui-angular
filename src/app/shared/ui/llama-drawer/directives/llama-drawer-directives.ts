import { Directive } from '@angular/core';

@Directive({
  selector: `[llama-drawer-header], llama-drawer-header, [llamaDrawerHeader]`,
  host: { class: 'llama-drawer__header' },
  standalone: true,
})
export class LlamaDrawerHeader {}

@Directive({
  selector: `[llama-drawer-content], llama-drawer-content, [llamaDrawerContent]`,
  host: { class: 'llama-drawer__content' },
  standalone: true,
})
export class LlamaDrawerContent {}

@Directive({
  selector: `[llama-drawer-actions], llama-drawer-actions, [LlamaDrawerActions]`,
  host: { class: 'llama-drawer__actions' },
  standalone: true,
})
export class LlamaDrawerActions {}
