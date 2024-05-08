import {
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import { DialogConfig } from './dialog-config';
import { coerceNumberProperty } from '@angular/cdk/coercion';

export function throwDialogContentAlreadyAttachedError() {
  throw Error(
    'Attempting to attach dialog content after content is already attached'
  );
}

const TRANSITION_DURATION_PROPERTY = '--llama-dialog-transition-duration';
const OPEN_CLASS = 'llama-dialog--open';
const CLOSE_CLASS = 'llama-dialog--close';

/** Duration of the opening animation in milliseconds. */
export const OPEN_ANIMATION_DURATION = 150;

/** Duration of the closing animation in milliseconds. */
export const CLOSE_ANIMATION_DURATION = 150;

@Component({
  selector: `llama-dialog-container`,
  template: `
    <div class="llama-dialog-container">
      <div class="llama-dialog__surface">
        <ng-template cdkPortalOutlet />
      </div>
    </div>
  `,
  styleUrl: './dialog.scss',
  standalone: true,
  host: {
    class: 'llama-dialog__container',
    '[class.llama-dialog-type-dialog]': "config.type ==='dialog'",
    '[class.llama-dialog-type-drawer]': "config.type ==='drawer'",
  },
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
})
export class DialogContainer {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  get hostElement() {
    return this.elementRef.nativeElement as HTMLDivElement;
  }

  get startAnimationDuration() {
    return (
      parseCssTime(this.config.startAnimationDuration) ??
      OPEN_ANIMATION_DURATION
    );
  }

  get exitAnimationDuration() {
    return (
      parseCssTime(this.config.exitAnimationDuration) ??
      CLOSE_ANIMATION_DURATION
    );
  }

  constructor(
    private elementRef: ElementRef,
    @Inject(DialogConfig) readonly config: DialogConfig
  ) {}

  protected _contentAttached() {
    this._startOpenAnimation();
  }

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    const result = this.portalOutlet.attachComponentPortal(portal);
    this._contentAttached();
    return result;
  }

  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    const result = this.portalOutlet.attachTemplatePortal(portal);
    this._contentAttached();
    return result;
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

function parseCssTime(time: string | number | undefined): number | null {
  if (time == null) {
    return null;
  }
  if (typeof time === 'number') {
    return time;
  }
  if (time.endsWith('ms')) {
    return coerceNumberProperty(time.substring(0, time.length - 2));
  }
  if (time.endsWith('s')) {
    return coerceNumberProperty(time.substring(0, time.length - 1)) * 1000;
  }
  if (time === '0') {
    return 0;
  }
  return null; // anything else is invalid.
}
