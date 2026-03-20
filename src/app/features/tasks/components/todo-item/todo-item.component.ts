import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  readonly task = input.required<Task>();
  readonly toggle = output<number>();
  readonly remove = output<number>();

  onToggle(): void {
    this.toggle.emit(this.task().id);
  }

  onRemove(): void {
    this.remove.emit(this.task().id);
  }
}
