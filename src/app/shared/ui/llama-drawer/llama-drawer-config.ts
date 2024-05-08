import { LlamaDialogConfig } from '../llama-dialog/llama-dialog-config';

export interface LlamaDrawerPosition {
  /** Override for the dialog's left position. */
  left?: string;

  /** Override for the dialog's right position. */
  right?: string;
}

export class LlamaDrawerConfig<D> extends LlamaDialogConfig<D> {
  override position?: LlamaDrawerPosition = { right: '0px' };
}
