import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'llama-card',
  template: `<ng-content />`,
  styleUrl: './llama-card.scss',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'llama-card',
  },
})
export class LlamaCard {}

@Directive({
  selector: 'llama-card-content',
  host: { class: 'llama-card-content' },
  standalone: true,
})
export class LlamaCardContent {}
