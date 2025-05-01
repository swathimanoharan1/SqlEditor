import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlDataService } from '../../services/sql-data/sql-data.service';

@Component({
  selector: 'app-table-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-selector.component.html',
  styleUrl: './table-selector.component.scss',
})
export class TableSelectorComponent implements OnInit {
  tables: string[] = [];
  selectedTable = '';

  @Output() tableSelected = new EventEmitter<string>();

  constructor(private sqlServices: SqlDataService) {}

  ngOnInit(): void {
    this.sqlServices.getTables().subscribe((data) => {
      this.tables = data;
    });
  }

  onSelect(table: string) {
    this.selectedTable = table;
    this.tableSelected.emit(table);
  }
  onSelectTable(event: Event): void {
    const selectedTable  = (event.target as HTMLSelectElement).value;
    this.tableSelected.emit(selectedTable);
  }

}
