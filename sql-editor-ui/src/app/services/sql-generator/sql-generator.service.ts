import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SqlGeneratorService {
  sqlTemplates: any = null;

  private buildWhereClause(conditions: any[]): string {
    if (!conditions || conditions.length === 0) return 'WHERE condition';

    const parts = conditions.map((cond) => {
      const val = isNaN(cond.value) ? `'${cond.value}'` : cond.value;
      return `${cond.column} ${cond.operator} ${val}`;
    });

    return 'WHERE ' + parts.join(' AND ');
  }

  generateSqlTemplates(
    tableName: string,
    columns: string[],
    conditions: any[]
  ): any {
    const cols = columns.join(', ');
    const where = this.buildWhereClause(conditions);

    return {
      SELECT: `SELECT ${cols} FROM ${tableName} ${where};`,
      INSERT: `INSERT INTO ${tableName} (${cols}) VALUES (${columns
        .map(() => 'value')
        .join(', ')});`,
      UPDATE: `UPDATE ${tableName} SET ${columns
        .map((col) => `${col} = value`)
        .join(', ')} ${where};`,
      DELETE: `DELETE FROM ${tableName} ${where};`,
    };
  }
}
