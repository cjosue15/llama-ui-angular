import { Directive, Input, Optional, input } from '@angular/core';

import { LlamaDialogRef } from '../llama-dialog-ref';

export function throwDialogContentAlreadyAttachedError() {
  throw Error(
    'Attempting to attach dialog content after content is already attached'
  );
}

type CloseType = 'submit' | 'button' | 'reset';

@Directive({
  selector: '[llama-dialog-close], [llamaDialogClose]',
  exportAs: 'llamaDialogClose',
  standalone: true,
  host: {
    '(click)': '_onButtonClick($event)',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.type]': 'type()',
  },
})
export class LlamaDialogClose {
  /** Screen-reader label for the button. */
  ariaLabel = input(null, { alias: 'aria-label' });

  /** Default to "button" to prevents accidental form submits. */
  type = input<CloseType>('button');

  /** Dialog close input. */
  @Input('llama-dialog-close') dialogResult: any;

  @Input('llamaDialogClose') _llamaDialogClose: any;

  constructor(@Optional() public dialogRef: LlamaDialogRef<any>) {}

  _onButtonClick(event: MouseEvent) {
    event.preventDefault();
    this.dialogRef.close(this.dialogResult ?? this._llamaDialogClose);
  }
}

@Directive({
  selector: `[llama-dialog-content], llama-dialog-content, [llamaDialogContent]`,
  host: { class: 'llama-dialog__content' },
  standalone: true,
})
export class LlamaDialogContent {}

/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[llama-dialog-actions], llama-dialog-actions, [llamaDialogActions]`,
  standalone: true,
  host: {
    class: 'llama-dialog__actions',
    '[class.llama-dialog__actions-align-start]': 'align === "start"',
    '[class.llama-dialog__actions-align-center]': 'align === "center"',
    '[class.llama-dialog__actions-align-end]': 'align === "end"',
  },
})
export class LlamaDialogActions {
  /**
   * Horizontal alignment of action buttons.
   */
  @Input() align?: 'start' | 'center' | 'end';
}
