import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Injectable, InjectionToken, TemplateRef, inject } from '@angular/core';

import { Dialog } from '@shared/ui/core/dialog/dialog.service';
import { DialogConfig } from '@shared/ui/core/dialog/dialog-config';

import { LlamaDialogConfig } from './llama-dialog-config';
import { LlamaDialogRef } from './llama-dialog-ref';
import { LlamaDialogContainer } from './llama-dialog-container';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LLAMA_DIALOG_DATA = new InjectionToken<any>('LlamaDialogData');

@Injectable({
  providedIn: 'root',
})
export class LlamaDialog {
  private _dialog = inject(Dialog);

  private _overlay = inject(Overlay);

  open<T, D = any, R = any>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    config?: LlamaDialogConfig<D>
  ): LlamaDialogRef<D, R> {
    let llamaDialogRef: LlamaDialogRef<D, R>;
    this._dialog.open<T, D, R, LlamaDialogContainer>(componentOrTemplate, {
      hasBackdrop: true,
      ...config,
      positionStrategy: this._overlay
        .position()
        .global()
        .centerVertically()
        .centerHorizontally(),
      container: {
        type: LlamaDialogContainer,
        providers(dialogConfig) {
          return [
            { provide: DialogConfig, useValue: dialogConfig },
            { provide: LlamaDialogConfig, useValue: config },
          ];
        },
      },
      providers(dialogRef, cdkConfig) {
        llamaDialogRef = new LlamaDialogRef<D, R>(dialogRef);
        llamaDialogRef.updatePosition(config?.position);
        return [
          { provide: LLAMA_DIALOG_DATA, useValue: cdkConfig.data },
          { provide: LlamaDialogRef, useValue: llamaDialogRef },
        ];
      },
    });

    return llamaDialogRef!;
  }
}
