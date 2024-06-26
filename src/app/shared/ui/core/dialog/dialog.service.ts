import {
  ComponentRef,
  Injectable,
  Injector,
  StaticProvider,
  TemplateRef,
  inject,
} from '@angular/core';
import {
  ComponentPortal,
  ComponentType,
  TemplatePortal,
} from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { DialogContainer } from '@shared/ui/core/dialog/dialog-container';

import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Injectable({
  providedIn: 'root',
})
export class Dialog {
  private _overlay = inject(Overlay);

  private _injector = inject(Injector);

  open<T, D, R, C extends DialogContainer>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    config: DialogConfig<D, DialogRef<D, R, C>, C>
  ): DialogRef<D, R, C> {
    const overlayConfig = this._getOverlayConfig(config);
    const overlayRef = this._createOverlay(overlayConfig);
    const dialogRef = new DialogRef<D, R, C>(overlayRef, config);

    // attach container into LlamaDialog
    const dialogContainer = this._attachContainer(overlayRef, config);
    dialogRef._containerInstance = dialogContainer;

    // attach ComponentType or TemplateRef into dialogContainer
    this._attachDialogContentInContainer(
      componentOrTemplate,
      dialogRef,
      dialogContainer,
      config
    );

    return dialogRef;
  }

  /**
   * Creates an overlay config from a dialog config.
   * @param config The dialog configuration.
   * @returns The overlay configuration.
   */
  private _getOverlayConfig<D, R, C extends DialogContainer>(
    config: DialogConfig<D, R, C>
  ): OverlayConfig {
    const newBackdropClass = (classes: string[] | string | undefined) => {
      const BLUR_CLASS = 'llama-backdrop-blur';
      if (!classes || classes.length === 0) return BLUR_CLASS;

      if (Array.isArray(classes)) {
        return [BLUR_CLASS, ...classes];
      }

      return [BLUR_CLASS, classes];
    };
    const state = new OverlayConfig({
      positionStrategy:
        config.positionStrategy ||
        this._overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      direction: config.direction,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      width: config.width,
      height: config.height,
      disposeOnNavigation: config.closeOnNavigation,
    });

    if (config.backdropClass) {
      state.backdropClass = newBackdropClass(config.backdropClass);
    }

    return state;
  }

  private _attachDialogContentInContainer<T, D, R, C extends DialogContainer>(
    componentOrTemplate: ComponentType<T> | TemplateRef<T>,
    dialogRef: DialogRef<D, R, C>,
    dialogContainer: C,
    config: DialogConfig<D, DialogRef<D, R, C>, C>
  ) {
    if (componentOrTemplate instanceof TemplateRef) {
      const template = new TemplatePortal(componentOrTemplate, null!);
      dialogContainer.attachTemplatePortal(template);
    } else {
      const injector = this._createInjector(dialogRef, config);
      const portal = new ComponentPortal(componentOrTemplate, null, injector);
      const contentRef = dialogContainer.attachComponentPortal(portal);
      if (contentRef) {
        this._addClassInHostDialogContent(contentRef);
      }
    }
  }

  private _createInjector<D, R, C extends DialogContainer>(
    dialogRef: DialogRef<D, R, C>,
    config: DialogConfig<D, DialogRef<D, R, C>, C>
  ): Injector {
    const providers: StaticProvider[] = [
      ...config.providers(dialogRef, config),
    ];

    return Injector.create({ parent: this._injector, providers });
  }

  private _addClassInHostDialogContent<T>(contentRef: ComponentRef<T>) {
    (contentRef.location.nativeElement as HTMLElement).classList.add(
      'llama-dialog-component-host'
    );
  }

  private _attachContainer<D, R, C extends DialogContainer>(
    overlay: OverlayRef,
    config: DialogConfig<D, DialogRef<D, R, C>, C>
  ): C {
    const providers: StaticProvider[] = [...config.container.providers(config)];
    const injector = Injector.create({ parent: this._injector, providers });
    const containerPortal = new ComponentPortal(
      config.container!.type,
      null,
      injector
    );
    const containerRef = overlay.attach(containerPortal);

    return containerRef.instance;
  }

  private _createOverlay(config?: OverlayConfig) {
    return this._overlay.create(config);
  }
}
