import {
  Component,
  ComponentRef,
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

export function throwDialogContentAlreadyAttachedError() {
  throw Error(
    'Attempting to attach dialog content after content is already attached'
  );
}

@Component({
  selector: `llama-dialog-container`,
  template: `
    <div class="llama-dialog-surface llama-dialog__surface">
      <ng-template cdkPortalOutlet />
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

  constructor(@Inject(DialogConfig) readonly config: DialogConfig) {}

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    const result = this.portalOutlet.attachComponentPortal(portal);
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
    return result;
  }
}
