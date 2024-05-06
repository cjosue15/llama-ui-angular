import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';

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
  styleUrl: './llama-dialog.scss',
  standalone: true,
  host: { class: 'llama-dialog__container' },
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
})
export class LlamaDialogContainer {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwDialogContentAlreadyAttachedError();
    }

    const result = this.portalOutlet.attachComponentPortal(portal);
    // this._contentAttached();
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
    // this._contentAttached();
    return result;
  }
}
