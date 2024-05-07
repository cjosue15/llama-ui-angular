import { Direction } from '@angular/cdk/bidi';
import { PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';

export class LlamaDialogConfig<D> {
  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** Optional CSS class or classes applied to the overlay panel. */
  panelClass?: string | string[] = '';

  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Optional CSS class or classes applied to the overlay backdrop. */
  backdropClass?: string | string[] = '';

  /** Whether the dialog closes with the escape key or pointer events outside the panel element. */
  disableClose?: boolean = false;

  /** Width of the dialog. */
  width?: string = '';

  /** Height of the dialog. */
  height?: string = '';

  /** Min-width of the dialog. If a number is provided, assumes pixel units. */
  minWidth?: number | string;

  /** Min-height of the dialog. If a number is provided, assumes pixel units. */
  minHeight?: number | string;

  /** Max-width of the dialog. If a number is provided, assumes pixel units. Defaults to 80vw. */
  maxWidth?: number | string;

  /** Max-height of the dialog. If a number is provided, assumes pixel units. */
  maxHeight?: number | string;

  /** Strategy to use when positioning the dialog. Defaults to centering it on the page. */
  positionStrategy?: PositionStrategy;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** Layout direction for the dialog's content. */
  direction?: Direction;

  /**
   * Scroll strategy to be used for the dialog. This determines how
   * the dialog responds to scrolling underneath the panel element.
   */
  scrollStrategy?: ScrollStrategy;

  /**
   * Whether the dialog should close when the user navigates backwards or forwards through browser
   * history. This does not apply to navigation via anchor element unless using URL-hash based
   * routing (`HashLocationStrategy` in the Angular router).
   */
  closeOnNavigation?: boolean = true;
}
