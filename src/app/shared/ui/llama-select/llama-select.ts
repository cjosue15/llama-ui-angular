import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  CdkOverlayOrigin,
  CdkConnectedOverlay,
  ConnectedPosition,
  Overlay,
} from '@angular/cdk/overlay';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  Validators,
} from '@angular/forms';
import { Subject, merge, startWith, takeUntil } from 'rxjs';

import { LLAMA_FORM_FIELD, LlamaFormField } from '../llama-form-field';
import { LlamaFormFieldControl } from '../llama-form-field/directives/llama-form-field-control';
import {
  LlamaOption,
  LlamaOptionSelectionChange,
} from './directives/llama-option/llama-option.component';
import { LlamaSelectionModel, SelectionChange } from './llama-selection-model';
import { getSelectNonArrayValueError } from './llama-select-errors';

export const LLAMA_SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LlamaSelect),
  multi: true,
};

export class LlamaSelectChange {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: LlamaSelect,
    /** Current value of the select that emitted the event. */
    public value: any
  ) {}
}

// const nextUniqueId = 0;

@Component({
  selector: 'llama-select',
  templateUrl: './llama-select.html',
  styleUrl: './llama-select.scss',
  standalone: true,
  imports: [CdkOverlayOrigin, CdkConnectedOverlay, LlamaOption],
  providers: [
    LLAMA_SELECT_VALUE_ACCESSOR,
    { provide: LlamaFormFieldControl, useExisting: LlamaSelect },
  ],
  host: {
    class: 'llama-select',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class LlamaSelect
  implements
    OnInit,
    AfterViewInit,
    OnDestroy,
    ControlValueAccessor,
    LlamaFormFieldControl<any>
{
  @ContentChildren(LlamaOption) options!: QueryList<LlamaOption>;

  multiple = input<boolean>(false);

  open = signal<boolean>(false);

  isOpen = computed(() => this.open());

  overlayOrigin!: ElementRef;

  overlayWidth: number = 0;

  overlayScrollStrategy = inject(Overlay).scrollStrategies.block();

  valueToDisplay = '';

  get selected(): LlamaOption | LlamaOption[] {
    return this.multiple()
      ? this._selectionModel?.selected || []
      : this._selectionModel?.selected[0];
  }

  public ngControl: NgControl | null = null;

  _onChange: (value: any) => void = () => {};

  _onTouched = () => {};

  /** Event emitted when the selected value has been changed by the user. */
  readonly selectionChange = output<LlamaSelectChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  // @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();
  readonly valueChange = output<any>();

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  private _selectionModel!: LlamaSelectionModel<LlamaOption>;

  private _destroy$ = new Subject<void>();

  /**
   * This position config ensures that the top "start" corner of the overlay
   * is aligned with with the top "start" of the origin by default (overlapping
   * the trigger completely). If the panel cannot fit below the trigger, it
   * will fall back to a position above the trigger.
   */
  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      panelClass: 'mat-mdc-select-panel-above',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      panelClass: 'mat-mdc-select-panel-above',
    },
  ];
  /**
   * Implemented as part of LlamaFormFieldControl.
   */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    const hasAssigned = this._assignValue(newValue);

    if (hasAssigned) {
      this._onChange(newValue);
    }
  }
  private _value: any;

  id: string = '';

  @Input() placeholder = '';

  get focused(): boolean {
    return this._focused || this.isOpen();
  }
  private _focused = false;

  get empty() {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }

  @Input() get required() {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }
  set required(value: boolean) {
    this._required = value;
  }
  private _required = false;

  @Input() disabled = false;

  controlType = 'llama-select';
  /**
   * Implemented as part of LlamaFormFieldControl.
   */

  constructor(
    readonly _elementRef: ElementRef,
    // @Optional() @Self() public ngControl: NgControl,
    @Inject(Injector) private injector: Injector,
    @Optional() @Inject(LLAMA_FORM_FIELD) protected _formField?: LlamaFormField
  ) {}

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
  }

  ngAfterViewInit() {
    this._selectionModel = new LlamaSelectionModel<LlamaOption>(
      this.multiple()
    );

    this._selectionModel.changed
      .pipe(takeUntil(this._destroy$))
      .subscribe((event: SelectionChange<LlamaOption>) => {
        event.added.forEach(option => option.select());
        event.removed.forEach(option => option.deselect());
        this.valueToDisplay = this.setValueToDisplay();
      });

    this.options.changes
      .pipe(startWith(null), takeUntil(this._destroy$))
      .subscribe(() => {
        this._resetOptions();
        this._initializeSelection();
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  writeValue(value: any): void {
    this._assignValue(value);
  }
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectOption(option: LlamaOption) {
    this._selectionModel.select(option);
  }

  deselectOption(option: LlamaOption) {
    this._selectionModel.deselect(option);
  }

  protected _canOpen(): boolean {
    return !this.isOpen() && !this.disabled && this.options?.length > 0;
  }

  toggleDropdown() {
    this.isOpen() ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    if (!this._canOpen()) return;

    if (this._formField) {
      this.overlayOrigin = this._formField.getConnectedOverlayOrigin();
    }

    this.overlayWidth = this._getOverlayWidth();

    this.open.set(true);
  }

  closeDropdown() {
    if (this.isOpen()) {
      this.open.set(false);
      this._onTouched();
    }
  }

  onFocus() {
    if (!this.disabled) {
      this._focused = true;
    }
  }

  onBlur() {
    this._focused = false;

    if (!this.disabled && !this.isOpen()) {
      this._onTouched();
    }
  }

  /** Focuses the select element. */
  focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  onContainerClick(): void {
    this.focus();
    this.openDropdown();
  }

  private _resetOptions() {
    const destroy = merge(this._destroy$, this.options.changes);

    merge(...this.options.map(option => option.selectionChange))
      .pipe(takeUntil(destroy))
      .subscribe((event: LlamaOptionSelectionChange) => {
        this._onSelect(event.source);

        if (!this.multiple()) {
          this.closeDropdown();
        }
      });
  }

  /** Assigns a specific value to the select. Returns whether the value has changed. */
  private _assignValue(newValue: any | any[]): boolean {
    // Always re-assign an array, because it might have been mutated.
    if (
      newValue !== this._value ||
      (this.multiple() && Array.isArray(newValue))
    ) {
      if (this.options) {
        this._setSelectionByValue(newValue);
      }

      this._value = newValue;
      return true;
    }
    return false;
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    this._selectionModel.clear();

    if (this.multiple() && value) {
      if (!Array.isArray(value)) {
        throw getSelectNonArrayValueError();
      }

      value.forEach((currentValue: any) =>
        this._selectOptionByValue(currentValue)
      );
      // this._sortValues();
    } else {
      this._selectOptionByValue(value);
    }
  }

  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectOptionByValue(value: any): LlamaOption | undefined {
    const correspondingOption = this.options.find((option: LlamaOption) => {
      // Skip options that are already in the model. This allows us to handle cases
      // where the same primitive value is selected multiple times.
      if (this._selectionModel.isSelected(option)) {
        return false;
      }

      try {
        return !!option.value() && this._compareWith(option.value(), value);
      } catch (error) {
        return false;
      }
    });

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);
    }

    return correspondingOption;
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    // TODO: check new value in control
    Promise.resolve().then(() => {
      if (this.ngControl) {
        this._value = this.ngControl.value;
      }

      this._setSelectionByValue(this._value);
    });
  }

  private setValueToDisplay() {
    if (this.empty) return '';

    const selected = this._selectionModel.selected;

    if (this.multiple()) {
      return selected.map(option => option.viewValue).join(', ');
    }

    return selected[0].viewValue;
  }

  private _onSelect(option: LlamaOption) {
    const wasSelected = this._selectionModel.isSelected(option);
    const selected = option.selected;

    if (!option.value() && !this.multiple()) {
      option.deselect();
      this._selectionModel.clear();

      if (this.value) {
        this._emitChanges(option.value);
      }
    } else {
      if (wasSelected !== selected) {
        selected ? this.selectOption(option) : this.deselectOption(option);
      }
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._emitChanges();
    }
  }

  /** Emits change event to set the model value. */
  private _emitChanges(fallbackValue?: any): void {
    let valueToEmit: any;

    if (this.multiple()) {
      valueToEmit = (this.selected as LlamaOption[]).map(option =>
        option.value()
      );
    } else {
      valueToEmit = this.selected
        ? (this.selected as LlamaOption).value()
        : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new LlamaSelectChange(this, valueToEmit));
  }

  private _getOverlayWidth() {
    return this.overlayOrigin.nativeElement.getBoundingClientRect().width;
  }
}
