import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DialogConfig } from './dialog-config';
import { DialogContainer } from './dialog-container';

export class DialogRef<D = any, R = any> {
  _containerInstance: DialogContainer | null = null;

  readonly disableClose: boolean;

  /** Emits when the backdrop of the dialog is clicked. */
  readonly backdropClick$: Observable<MouseEvent>;

  /** Emits when on keyboard events within the dialog. */
  readonly keydownEvents$: Observable<KeyboardEvent>;

  get afterClosed$() {
    return this.closed.asObservable();
  }

  /** Emits when the dialog has been closed. */
  private readonly closed: Subject<R | undefined> = new Subject<
    R | undefined
  >();

  private _destroy$ = new Subject<void>();

  constructor(
    readonly _overlayRef: OverlayRef,
    readonly _config: DialogConfig<D, DialogRef<D, R>>
  ) {
    this.disableClose = Boolean(_config?.disableClose);
    this.backdropClick$ = _overlayRef.backdropClick();
    this.keydownEvents$ = _overlayRef.keydownEvents();
    this.addPanelClass('llama-dialog-panel');

    this.keydownEvents$.pipe(takeUntil(this._destroy$)).subscribe(event => {
      if (event.code === 'Escape' && !this.disableClose) {
        event.preventDefault();
        this.close();
      }
    });

    this.backdropClick$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (!this.disableClose) {
        this.close();
      }
    });
  }

  close(result?: R): void {
    this._overlayRef.detachBackdrop();
    this._containerInstance?._startExitAnimation();

    setTimeout(() => {
      this._destroy$.next();
      this._destroy$.complete();
      this._overlayRef.dispose();

      this.closed.next(result);
      this.closed.complete();
      this._containerInstance = null;
    }, this._containerInstance!.exitAnimationDuration);
  }

  /** Updates the position of the dialog based on the current position strategy. */
  updatePosition(): this {
    this._overlayRef.updatePosition();
    return this;
  }

  /**
   * Updates the dialog's width and height.
   * @param width New width of the dialog.
   * @param height New height of the dialog.
   */
  updateSize(width: string | number = '', height: string | number = ''): this {
    this._overlayRef.updateSize({ width, height });
    return this;
  }

  /** Add a CSS class or an array of classes to the overlay pane. */
  addPanelClass(classes: string | string[]): this {
    this._overlayRef.addPanelClass(classes);
    return this;
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  removePanelClass(classes: string | string[]): this {
    this._overlayRef.removePanelClass(classes);
    return this;
  }
}
