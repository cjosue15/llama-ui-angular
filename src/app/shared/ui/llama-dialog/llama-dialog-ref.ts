import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject, takeUntil } from 'rxjs';

import { LlamaDialogConfig } from './llama-dialog.service';

export class LlamaDialogRef {
  readonly disableClose: boolean;

  /** Emits when the backdrop of the dialog is clicked. */
  readonly backdropClick: Observable<MouseEvent>;

  /** Emits when on keyboard events within the dialog. */
  readonly keydownEvents: Observable<KeyboardEvent>;

  private _destroy$ = new Subject<void>();

  constructor(
    readonly _overlayRef: OverlayRef,
    readonly _config?: LlamaDialogConfig
  ) {
    this.disableClose = Boolean(_config?.disableClose);
    this.backdropClick = _overlayRef.backdropClick();
    this.keydownEvents = _overlayRef.keydownEvents();

    this.keydownEvents.pipe(takeUntil(this._destroy$)).subscribe(event => {
      if (event.code === 'Escape' && !this.disableClose) {
        event.preventDefault();
        this.close();
      }
    });

    this.backdropClick.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (!this.disableClose) {
        this.close();
      }
    });
  }

  close(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._overlayRef.dispose();
  }
}
