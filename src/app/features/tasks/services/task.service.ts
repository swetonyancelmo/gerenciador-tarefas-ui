import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";

export class TaskService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/tasks';

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    createTask(task: Partial<Task>): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    completeTask(id: number): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, {});
    }

    deleteTask(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
