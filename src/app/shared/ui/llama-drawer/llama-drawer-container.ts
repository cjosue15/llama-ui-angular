import {
  Component,
  ElementRef,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';

import {
  DialogContainer,
  parseCssTime,
} from '@shared/ui/core/dialog/dialog-container';
import { DialogConfig } from '../core/dialog/dialog-config';
import { LlamaDrawerConfig } from './llama-drawer-config';

const TRANSITION_DURATION_PROPERTY = '--llama-dialog-transition-duration';
const OPEN_CLASS = 'llama-dialog--open';
const CLOSE_CLASS = 'llama-dialog--close';

/** Duration of the opening animation in milliseconds. */
export const OPEN_ANIMATION_DURATION = 400;

/** Duration of the closing animation in milliseconds. */
export const CLOSE_ANIMATION_DURATION = 200;

@Component({
  selector: `llama-drawer-container`,
  template: `
    <div class="llama-dialog-container">
      <div class="llama-dialog__surface">
        <ng-template cdkPortalOutlet />
      </div>
    </div>
  `,
  styleUrl: './llama-drawer-container.scss',
  standalone: true,
  host: {
    class: 'llama-dialog__container',
    '[class.llama-drawer-variant-right]':
      '!llamaConfig?.position || llamaConfig?.position?.right',
    '[class.llama-drawer-variant-left]':
      'llamaConfig?.position && llamaConfig?.position?.left',
  },
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
})
export class LlamaDrawerContainer extends DialogContainer {
  get startAnimationDuration() {
    return (
      parseCssTime(this.llamaConfig?.startAnimationDuration) ??
      OPEN_ANIMATION_DURATION
    );
  }

  get exitAnimationDuration() {
    return (
      parseCssTime(this.llamaConfig?.exitAnimationDuration) ??
      CLOSE_ANIMATION_DURATION
    );
  }

  constructor(
    elementRef: ElementRef,
    @Inject(DialogConfig) config: DialogConfig,
    @Inject(LlamaDrawerConfig) readonly llamaConfig?: LlamaDrawerConfig<any>
  ) {
    super(elementRef, config);
  }

  protected override _contentAttached(): void {
    super._contentAttached();

    this._startOpenAnimation();
  }

  /** Starts the dialog open animation if enabled. */
  private _startOpenAnimation() {
    this.hostElement.style.setProperty(
      TRANSITION_DURATION_PROPERTY,
      `${this.startAnimationDuration}ms`
    );

    this.hostElement.classList.add(OPEN_CLASS);
  }

  _startExitAnimation() {
    this.hostElement.classList.remove(OPEN_CLASS);

    this.hostElement.style.setProperty(
      TRANSITION_DURATION_PROPERTY,
      `${this.exitAnimationDuration}ms`
    );

    this.hostElement.classList.add(CLOSE_CLASS);
  }
}
