import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-condition-builder',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './condition-builder.component.html',
  styleUrl: './condition-builder.component.scss'
})
export class ConditionBuilderComponent {

  @Input() columns: string[] = [];
  @Output() conditionsChanged = new EventEmitter<any[]>();

  conditions: any[] = [];

  addCondition() {
    this.conditions.push({ column: '', operator: '=', value: '' });
    this.emitChanges();
  }

  removeCondition(index: number) {
    this.conditions.splice(index, 1);
    this.emitChanges();
  }

  emitChanges() {
    this.conditionsChanged.emit(this.conditions);
  }
}
