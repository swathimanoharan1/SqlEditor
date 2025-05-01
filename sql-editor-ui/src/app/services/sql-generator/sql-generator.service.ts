import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SqlGeneratorService {
  sqlTemplates: any = null;

  generateSQLTemplates(tableName: string, columns: string[]) {
    const columnList = columns.join(', ');
    const valuesList = columns.map(() => 'value').join(', ');
    const updateList = columns.map((col) => `${col} = value`).join(', ');

    return {
      select: `SELECT ${columnList} FROM ${tableName};`,
      insert: `INSERT INTO ${tableName} (${columnList}) VALUES (${valuesList});`,
      update: `UPDATE ${tableName} SET ${updateList} WHERE condition;`,
      delete: `DELETE FROM ${tableName} WHERE condition;`,
    };
  }
}
