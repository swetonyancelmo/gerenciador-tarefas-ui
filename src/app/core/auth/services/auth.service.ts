import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../models/auth.model";
import { UserCreate, UserLogin } from "../models/user.model";
import { tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080';

    register(userCreate: UserCreate) {
        return this.http.post(`${this.apiUrl}/auth/register`, { userCreate });
    }

    login(userLogin: UserLogin) {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { userLogin })
            .pipe(
                tap(response => {
                    this.saveToken(response.token);
                })
            );
    }

    private saveToken(token: string) {
        localStorage.setItem('jwt_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('jwt_token');
    }

    isLoggedIn(): boolean {
        return this.getToken() != null;
    }

    logout() {
        localStorage.removeItem('jwt_item');
    }

}