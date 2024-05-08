import { GlobalPositionStrategy } from '@angular/cdk/overlay';

import { LlamaDrawerPosition } from './llama-drawer-config';
import { LlamaDrawerContainer } from './llama-drawer-container';
import { DialogContainer } from '@shared/ui/core/dialog/dialog-container';
import { Observable } from 'rxjs';
import { DialogRef } from '../core/dialog/dialog-ref';

export class LlamaDrawerRef<
  D = any,
  R = any,
  C extends DialogContainer = LlamaDrawerContainer,
> {
  private closeRef: (result?: R) => void = () => {};

  /** Emits when the backdrop of the drawer is clicked. */
  get backdropClick$(): Observable<MouseEvent> {
    return this._dialogRef.backdropClick$;
  }

  /** Emits when on keyboard events within the drawer. */
  get keydownEvents$(): Observable<KeyboardEvent> {
    return this._dialogRef.keydownEvents$;
  }

  get afterClosed$() {
    return this._dialogRef.afterClosed$;
  }

  constructor(readonly _dialogRef: DialogRef<D, R, C>) {
    this.addPanelClass('llama-drawer-panel');
    this.closeRef = this._dialogRef.close;
    this._dialogRef.close = () => this.close();
  }

  close(result?: R): void {
    this._dialogRef._overlayRef.detachBackdrop();
    const container = this._dialogRef
      ._containerInstance as unknown as LlamaDrawerContainer;
    container._startExitAnimation();

    setTimeout(() => {
      this.closeRef.call(this._dialogRef, result);
    }, container.exitAnimationDuration);
  }

  /**
   * Updates the drawer's position.
   * @param position New dialog position.
   */
  updatePosition(position?: LlamaDrawerPosition): this {
    const strategy = this._dialogRef._config
      .positionStrategy as GlobalPositionStrategy;

    if (position && (position.left || position.right)) {
      position.left
        ? strategy.start().left(position.left)
        : strategy.end().right(position.right);
    } else {
      strategy.end().right();
    }

    this._dialogRef.updatePosition();

    return this;
  }

  /**
   * Updates the drawer's width and height.
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
