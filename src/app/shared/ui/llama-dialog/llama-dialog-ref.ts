import { Observable } from 'rxjs';

import { DialogRef } from '../core/dialog/dialog-ref';

export class LlamaDialogRef<D = any, R = any> {
  /** Emits when the backdrop of the dialog is clicked. */
  get backdropClick$(): Observable<MouseEvent> {
    return this._dialogRef.backdropClick$;
  }

  /** Emits when on keyboard events within the dialog. */
  get keydownEvents$(): Observable<KeyboardEvent> {
    return this._dialogRef.keydownEvents$;
  }

  get afterClosed$() {
    return this._dialogRef.afterClosed$;
  }

  constructor(readonly _dialogRef: DialogRef<D, R>) {}

  close(result?: R): void {
    this._dialogRef.close(result);
  }

  /** Updates the position of the dialog based on the current position strategy. */
  updatePosition(): this {
    this._dialogRef.updatePosition();
    return this;
  }

  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width: string | number = '', height: string | number = ''): this {
    this._dialogRef.updateSize(width, height);
    return this;
  }

  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this {
    this._dialogRef.addPanelClass(classes);
    return this;
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this {
    this._dialogRef.removePanelClass(classes);
    return this;
  }
}
