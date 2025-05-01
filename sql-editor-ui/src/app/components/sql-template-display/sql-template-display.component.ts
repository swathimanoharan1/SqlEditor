import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sql-template-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sql-template-display.component.html',
  styleUrl: './sql-template-display.component.scss',
})
export class SqlTemplateDisplayComponent {
  @Input() tableName: string = '';
  @Input() sqlTemplates: { [key: string]: string } = {};

    // Method to copy SQL to clipboard
    copyToClipboard(query: string): void {
      const textArea = document.createElement('textarea');
      textArea.value = query;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('SQL copied to clipboard!');
    }
}
