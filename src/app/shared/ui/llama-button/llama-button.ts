import {
  Component,
  HostBinding,
  ViewEncapsulation,
  input,
} from '@angular/core';

export type LlamaButtonSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[llama-button]',
  template: `<ng-content />`,
  styleUrl: './llama-button.scss',
  standalone: true,
  imports: [],
  encapsulation: ViewEncapsulation.None,
})
export class LlamaButton {
  size = input<LlamaButtonSize>('md');

  @HostBinding('class')
  get elementClass() {
    return `llama-button llama-button--size_${this.size()}`;
  }
}
