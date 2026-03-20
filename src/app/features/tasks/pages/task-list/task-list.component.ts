import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-task-list',
    imports: [FormsModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

    tasks: Task[] = [];
    newTaskTitle: string = '';
    newTaskDescription: string = '';

    private taskService = inject(TaskService);
    private authService = inject(AuthService);
    private router = inject(Router);

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    loadTasks() {
        this.taskService.getTasks().subscribe({
            next: (apiData) => {
                this.tasks = apiData;
            },
            error: (erro) => console.error('Erro ao buscar tarefas: ', erro)
        });
    }

    addTask() {
        if(this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
            const newTask: Partial<Task> = { title: this.newTaskTitle, description: this.newTaskDescription };

            this.taskService.createTask(newTask).subscribe({
                next: (taskCreated) => {
                    this.tasks.push(taskCreated);
                    this.newTaskTitle = '';
                    this.newTaskDescription = '';
                },
                error: (erro) => console.error('Erro ao criar tarefa: ', erro)
            });
        }
    }

    toggleCompleted(task: Task) {
        if(task.id) {
            this.taskService.completeTask(task.id).subscribe({
                next: () => {
                    task.completed = !task.completed;
                },
                error: (erro) => console.error('Erro ao atualizar: ', erro)
            });
        }
    }

    deleteTask(id: number) {
        this.taskService.deleteTask(id).subscribe({
            next: () => {
                this.tasks = this.tasks.filter(t => t.id !== id);
            },
            error: (erro) => console.error('Erro ao deletar: ', erro)
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}