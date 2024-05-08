import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { Injectable, InjectionToken, TemplateRef, inject } from '@angular/core';

import { Dialog } from '@shared/ui/core/dialog/dialog.service';
import { DialogConfig } from '@shared/ui/core/dialog/dialog-config';

import { LlamaDrawerConfig } from './llama-drawer-config';
import { LlamaDrawerRef } from './llama-drawer-ref';
import { LlamaDrawerContainer } from './llama-drawer-container';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const LLAMA_DRAWER_DATA = new InjectionToken<any>('LlamaDrawerData');

@Injectable({
  providedIn: 'root',
})
export class LlamaDrawer {
  private _dialog = inject(Dialog);

  private _overlay = inject(Overlay);

  open<T, D = any, R = any>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    config?: LlamaDrawerConfig<D>
  ): LlamaDrawerRef<D, R> {
    let llamaDrawerRef: LlamaDrawerRef<D, R>;
    this._dialog.open<T, D, R, LlamaDrawerContainer>(componentOrTemplate, {
      ...config,
      positionStrategy: this._overlay.position().global().end().right('0px'),
      container: {
        type: LlamaDrawerContainer,
        providers(dialogConfig) {
          return [
            { provide: DialogConfig, useValue: dialogConfig },
            { provide: LlamaDrawerConfig, useValue: config },
          ];
        },
      },
      providers(drawerRef, cdkConfig) {
        llamaDrawerRef = new LlamaDrawerRef<D, R>(drawerRef);
        llamaDrawerRef.updatePosition(config?.position);
        return [
          { provide: LLAMA_DRAWER_DATA, useValue: cdkConfig.data },
          { provide: LlamaDrawerRef, useValue: llamaDrawerRef },
        ];
      },
    });

    return llamaDrawerRef!;
  }
}
