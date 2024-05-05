import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable, TemplateRef, inject } from '@angular/core';
import { LlamaDialogRef } from './llama-dialog-ref';
import { LlamaDialogContainer } from './directives/llama-dialog';

export class LlamaDialogConfig extends OverlayConfig {
  disableClose?: boolean = false;
}

@Injectable({
  providedIn: 'root',
})
export class LlamaDialog {
  private _overlay = inject(Overlay);

  open<T>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    config?: LlamaDialogConfig
  ) {
    const overlayConfig = this._getOverlayConfig(config);
    const overlayRef = this._createOverlay(overlayConfig);
    const dialogRef = new LlamaDialogRef(overlayRef, config);

    // attach container into LlamaDialog
    const dialogContainer = this._attachContainer(overlayRef);

    // attach ComponentType or TemplateRef into dialogContainer
    this._attachDialogContentInContainer(componentOrTemplate, dialogContainer);

    return dialogRef;
  }

  private _getOverlayConfig(
    config?: LlamaDialogConfig
  ): OverlayConfig | undefined {
    if (!config) return undefined;
    const positionStrategy = this._overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const newBackdropClass = (classes: string[] | string | undefined) => {
      const BLUR_CLASS = 'llama-backdrop-blur';
      if (!classes || classes.length === 0) return BLUR_CLASS;

      if (Array.isArray(classes)) {
        return [BLUR_CLASS, ...classes];
      }

      return [BLUR_CLASS, classes];
    };

    const overlayConfig = new OverlayConfig({
      ...config,
      backdropClass: newBackdropClass(config.backdropClass),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private _attachDialogContentInContainer<T>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    dialogContainer: LlamaDialogContainer
  ) {
    if (componentOrTemplate instanceof TemplateRef) {
      const template = new TemplatePortal(componentOrTemplate, null!);
      dialogContainer.attachTemplatePortal(template);
    } else {
      const portal = new ComponentPortal(componentOrTemplate);
      const contentRef = dialogContainer.attachComponentPortal(portal);
      if (contentRef) {
        this._addClassInHostDialogContent(contentRef);
      }
    }
  }

  private _addClassInHostDialogContent<T>(contentRef: ComponentRef<T>) {
    (contentRef.location.nativeElement as HTMLElement).classList.add(
      'llama-dialog-host'
    );
  }

  private _attachContainer(overlay: OverlayRef) {
    const containerPortal = new ComponentPortal(LlamaDialogContainer);
    const containerRef = overlay.attach(containerPortal);

    return containerRef.instance;
  }

  private _createOverlay(config?: OverlayConfig) {
    return this._overlay.create(config);
  }
}
