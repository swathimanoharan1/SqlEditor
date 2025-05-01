import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ProductComponent } from './components/product/product.component';
import { TableSelectorComponent } from './components/table-selector/table-selector.component';
import { SqlGeneratorService } from './services/sql-generator/sql-generator.service';
import { SqlTemplateDisplayComponent } from './components/sql-template-display/sql-template-display.component';
import { ProductTableService } from './services/table/product-table.service';
import { ColumnSelectorComponent } from './components/column-selector/column-selector.component';
import { ConditionBuilderComponent } from './components/condition-builder/condition-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableSelectorComponent,
    SqlTemplateDisplayComponent,
    ColumnSelectorComponent,
    ConditionBuilderComponent,
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

  conditions: any[] = [];

  handleConditionsChanged(updatedConditions: any[]) {
    this.conditions = updatedConditions;
  }

  generateSql() {
    this.loading = true;

    this.sqlTemplates = this.sqlGenerator.generateSqlTemplates(
      this.selectedTable,
      this.selectedColumns,
      this.conditions
    );

    this.loading = false;
  }
}
