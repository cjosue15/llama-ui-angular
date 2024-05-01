import { Subject } from 'rxjs';

export interface SelectionChange<T> {
  /** Model that dispatched the event. */
  source: LlamaSelectionModel<T>;
  /** Options that were added to the model. */
  added: T[];
  /** Options that were removed from the model. */
  removed: T[];
}

export class LlamaSelectionModel<T> {
  get selected() {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }
    return this._selected;
  }
  // selected = computed(() => Array.from(this._selection().values()));

  changed = new Subject<SelectionChange<T>>();

  /** Keeps track of the deselected options that haven't been emitted by the change event. */
  private _deselectedToEmit: T[] = [];

  /** Keeps track of the selected options that haven't been emitted by the change event. */
  private _selectedToEmit: T[] = [];

  private _selected: T[] | null = null;

  // private _selection = signal(new Set<T>());
  private _selection = new Set<T>();

  constructor(private _multiple = false) {}

  select(...values: T[]): void {
    values.forEach(value => this._markSelected(value));
    this._emitChangeEvent();
  }

  deselect(...values: T[]): void {
    values.forEach(value => this._unmarkSelected(value));
    this._emitChangeEvent();
  }

  clear(): void {
    this._unmarkAll();
    this._emitChangeEvent();
  }

  isSelected(value: T): boolean {
    return this._selection.has(value);
  }

  isEmpty(): boolean {
    return this._selection.size === 0;
  }

  private _markSelected(value: T): void {
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }

      if (!this.isSelected(value)) {
        this._selection.add(value);
      }

      this._selectedToEmit = [...this._selectedToEmit, value];
    }
  }

  private _unmarkAll(): void {
    if (!this.isEmpty()) {
      this._selection.forEach(value => this._unmarkSelected(value));
    }
  }

  private _unmarkSelected(value: T) {
    if (this.isSelected(value)) {
      this._selection.delete(value);

      this._deselectedToEmit = [...this._deselectedToEmit, value];
    }
  }

  /** Emits a change event and clears the records of selected and deselected values. */
  private _emitChangeEvent() {
    // Clear the selected values so they can be re-cached.
    this._selected = null;

    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit,
      });

      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }
}
