import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

import { DialogRef } from '@shared/ui/core/dialog/dialog-ref';

import { LlamaDialogPosition } from './llama-dialog-config';
import { DialogContainer } from '../core/dialog/dialog-container';
import { LlamaDialogContainer } from './llama-dialog-container';

export class LlamaDialogRef<
  D = any,
  R = any,
  C extends DialogContainer = LlamaDialogContainer,
> {
  private closeRef: (result?: R) => void = () => {};

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

  constructor(readonly _dialogRef: DialogRef<D, R, C>) {
    this.addPanelClass('llama-dialog-panel');
    this.closeRef = this._dialogRef.close;
    this._dialogRef.close = () => this.close();
  }

  close(result?: R): void {
    this._dialogRef._overlayRef.detachBackdrop();
    const container = this._dialogRef
      ._containerInstance as unknown as LlamaDialogContainer;
    container._startExitAnimation();

    setTimeout(() => {
      this.closeRef.call(this._dialogRef, result);
    }, container.exitAnimationDuration);
  }

  /**
   * Updates the dialog's position.
   * @param position New dialog position.
   */
  updatePosition(position?: LlamaDialogPosition): this {
    const strategy = this._dialogRef._config
      .positionStrategy as GlobalPositionStrategy;

    if (position && (position.left || position.right)) {
      position.left
        ? strategy.left(position.left)
        : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top
        ? strategy.top(position.top)
        : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

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
