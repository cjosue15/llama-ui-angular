import { ComponentType } from '@angular/cdk/overlay';
import { Injectable, InjectionToken, TemplateRef, inject } from '@angular/core';

import { Dialog } from '@shared/ui/core/dialog/dialog.service';

import { LlamaDialogConfig } from './llama-dialog-config';
import { LlamaDialogRef } from './llama-dialog-ref';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LLAMA_DIALOG_DATA = new InjectionToken<any>('LlamaDialogData');

@Injectable({
  providedIn: 'root',
})
export class LlamaDialog {
  private _dialog = inject(Dialog);

  open<T, D = any, R = any>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    config?: LlamaDialogConfig<D>
  ): LlamaDialogRef<D, R> {
    let llamaDialogRef: LlamaDialogRef<D, R>;
    this._dialog.open<T, D, R>(componentOrTemplate, {
      ...config,
      type: 'dialog',
      providers(dialogRef, config) {
        llamaDialogRef = new LlamaDialogRef<D, R>(dialogRef);
        return [
          { provide: LLAMA_DIALOG_DATA, useValue: config.data },
          { provide: LlamaDialogRef, useValue: llamaDialogRef },
        ];
      },
    });

    return llamaDialogRef!;
  }
}
