import { Component, ViewEncapsulation } from '@angular/core';
import { CdkPortalOutlet } from '@angular/cdk/portal';

import { DialogContainer } from '@shared/ui/core/dialog/dialog-container';

/** Duration of the opening animation in milliseconds. */
export const OPEN_ANIMATION_DURATION = 150;

/** Duration of the closing animation in milliseconds. */
export const CLOSE_ANIMATION_DURATION = 150;

@Component({
  selector: `llama-dialog-container`,
  template: ` <ng-template cdkPortalOutlet /> `,
  standalone: true,
  host: {
    class: 'llama-dialog__container',
  },
  encapsulation: ViewEncapsulation.None,
  imports: [CdkPortalOutlet],
})
export class LlamaDialogContainer extends DialogContainer {}
