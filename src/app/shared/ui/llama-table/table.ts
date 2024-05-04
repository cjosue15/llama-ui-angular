import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'table[llama-table]',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'llama-table',
  },
})
export class LlamaTable {
  @Input() data!: any[];

  @ContentChild('headers') headers: TemplateRef<any> | undefined;

  @ContentChild('rows') rows: TemplateRef<any> | undefined;
}
