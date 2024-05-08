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

@Component({
  selector: `llama-core-dialog-container`,
  template: ` <ng-template cdkPortalOutlet /> `,
  standalone: true,
  host: {
    class: 'llama-dialog__container',
  },
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
})
export class DialogContainer {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  get hostElement() {
    return this.elementRef.nativeElement as HTMLDivElement;
  }

  constructor(
    private elementRef: ElementRef,
    @Inject(DialogConfig) readonly config: DialogConfig
  ) {}

  protected _contentAttached() {
    // TODO: focus when the dialog is opened
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
}

export function parseCssTime(time: string | number | undefined): number | null {
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
