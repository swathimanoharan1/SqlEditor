import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductTableService } from '../../services/table/product-table.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-column-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './column-selector.component.html',
  styleUrl: './column-selector.component.scss',
})
export class ColumnSelectorComponent implements OnChanges {
  @Input() tableName: string = '';
  @Output() columnsSelected = new EventEmitter<string[]>();

  columns: string[] = [];
  selectedColumns: string[] = [];
  columnSearchTerm: string = '';

  constructor(private productTableService: ProductTableService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableName'] && this.tableName) {
      this.fetchColumns();
    }
  }

  fetchColumns() {
    this.productTableService.getColumns(this.tableName).subscribe((cols) => {
      this.columns = cols;
      this.selectedColumns = [];
      this.columnSearchTerm = '';
    });
  }

  toggleColumn(column: string, isChecked: boolean) {
    if (isChecked && !this.selectedColumns.includes(column)) {
      this.selectedColumns.push(column);
    } else {
      this.selectedColumns = this.selectedColumns.filter(c => c !== column);
    }
    this.columnsSelected.emit(this.selectedColumns);
  }
  

  toggleSelectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    if (isChecked) {
      this.selectedColumns = [...this.columns];
    } else {
      this.selectedColumns = [];
    }
    this.columnsSelected.emit(this.selectedColumns);
  }

  allSelected(): boolean {
    return (
      this.selectedColumns.length === this.columns.length &&
      this.columns.length > 0
    );
  }

  filteredColumns(): string[] {
    if (!this.columnSearchTerm.trim()) {
      return this.columns;
    }
    const searchTerm = this.columnSearchTerm.toLowerCase();
    return this.columns.filter(col => col.toLowerCase().includes(searchTerm));
  }
  

  onCheckboxChange(event: Event, column: string) {
    const input = event.target as HTMLInputElement;
    const isChecked = input.checked;
    this.toggleColumn(column, isChecked);
  }
}
