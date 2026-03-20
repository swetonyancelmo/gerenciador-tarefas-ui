import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, TodoItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly submitting = signal(false);

  readonly completedCount = computed(() => this.tasks().filter((t) => t.completed).length);
  readonly totalCount = computed(() => this.tasks().length);

  newTaskTitle = '';
  newTaskDescription = '';

  private readonly taskService = inject(TaskService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);
    this.error.set(null);

    this.taskService
      .getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (tasks) => {
          this.tasks.set(tasks);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Não foi possível carregar as tarefas. Verifique sua conexão.');
          this.loading.set(false);
        },
      });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    const description = this.newTaskDescription.trim();

    if (!title) return;

    this.submitting.set(true);

    this.taskService
      .createTask({ title, description })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (created) => {
          this.tasks.update((list) => [...list, created]);
          this.newTaskTitle = '';
          this.newTaskDescription = '';
          this.submitting.set(false);
        },
        error: () => {
          this.error.set('Erro ao criar tarefa. Tente novamente.');
          this.submitting.set(false);
        },
      });
  }

  toggleCompleted(taskId: number): void {
    this.taskService
      .toggleComplete(taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updated) => {
          this.tasks.update((list) =>
            list.map((t) => (t.id === taskId ? { ...t, completed: updated.completed } : t)),
          );
        },
        error: () => {
          this.error.set('Erro ao atualizar tarefa.');
        },
      });
  }

  deleteTask(taskId: number): void {
    this.taskService
      .deleteTask(taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.tasks.update((list) => list.filter((t) => t.id !== taskId));
        },
        error: () => {
          this.error.set('Erro ao excluir tarefa.');
        },
      });
  }

  dismissError(): void {
    this.error.set(null);
  }

  logout(): void {
    this.authService.logout();
  }
}
