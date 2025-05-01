import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { TableSelectorComponent } from './components/table-selector/table-selector.component';
import { SqlGeneratorService } from './services/sql-generator/sql-generator.service';
import { SqlTemplateDisplayComponent } from './components/sql-template-display/sql-template-display.component';
import { ProductTableService } from './services/table/product-table.service';
import { ColumnSelectorComponent } from './components/column-selector/column-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductComponent,
    TableSelectorComponent,
    SqlTemplateDisplayComponent,
    ColumnSelectorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'sql-editor-ui';
  selectedTable: string = '';
  selectedColumns: string[] = [];
  sqlTemplates: any = null;
  loading: boolean = false;

  constructor(
    private sqlGenerator: SqlGeneratorService,
    private productTableService: ProductTableService
  ) {}

  handleTableSelected(table: string) {
    this.selectedTable = table;
    this.sqlTemplates = null;
  }

  handleColumnsSelected(columns: string[]) {
    this.selectedColumns = columns;
  }

  generateSql() {
    if (this.selectedTable && this.selectedColumns.length > 0) {
      // Call the service to generate SQL templates
      this.sqlTemplates = this.sqlGenerator.generateSQLTemplates(
        this.selectedTable,
        this.selectedColumns
      );
    }
  }
}
