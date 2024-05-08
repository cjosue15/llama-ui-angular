import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { LlamaCardModule } from '@shared/ui/llama-card';
import { LlamaButtonModule } from '@shared/ui/llama-button';
import { LlamaFormFieldModule } from '@shared/ui/llama-form-field';
import { LlamaInputModule } from '@shared/ui/llama-input/module';
import { LlamaSelectModule } from '@shared/ui/llama-select/module';
import { LlamaTableModule } from '@shared/ui/llama-table/module';
import { CurrencyPipe } from '@angular/common';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'llama-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LlamaCardModule,
    LlamaButtonModule,
    LlamaFormFieldModule,
    LlamaInputModule,
    LlamaSelectModule,
    LlamaTableModule,
    CurrencyPipe,
  ],
})
export default class DashboardAnalyticsComponent {
  control = new FormControl({ value: '', disabled: false }, [
    Validators.required,
  ]);

  selectFormControl = new FormControl('', Validators.required);

  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];

  selected = this.animals[0];

  animalControl = new FormControl<Animal | null>(
    this.selected,
    Validators.required
  );

  selectedMultiples: Animal[] = [
    // { name: 'Cat', sound: 'Meow!' },
    // { name: 'Cow', sound: 'Moo!' },
    this.animals[0],
    this.animals[2],
  ];

  employees = [
    { firstName: 'Employee', lastName: 'One' },
    { firstName: 'Amployee', lastName: 'Two' },
    { firstName: 'Employee', lastName: 'Three' },
    { firstName: 'Employee', lastName: 'Four' },
    { firstName: 'Employee', lastName: 'Five' },
  ];

  inventory = [
    {
      plu: 110,
      supplier: 'X Corp',
      name: 'Table extender',
      inStock: 500,
      price: 50,
      currency: 'USD',
    },
    {
      plu: 120,
      supplier: 'X Corp',
      name: 'Heated toilet seat',
      inStock: 0,
      price: 80,
      currency: 'PEN',
    },
    {
      plu: 155,
      supplier: 'Y Corp',
      name: 'Really good pencil',
      inStock: 1,
      price: 8000,
      currency: 'AUD',
    },
  ];

  purchaseItem(plu: number) {
    console.log('handle purchase for', plu);
  }

  constructor() {
    console.log('DashboardAnalyticsComponent');
    this.control.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.animalControl.valueChanges.subscribe(value => console.log(value));
  }
}
