import { Component, inject } from "@angular/core";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    email = '';
    password = '';
    errorMessage = '';

    private authService = inject(AuthService);
    private router = inject(Router);

    onSubmit() {
        if(!this.email || !this.password) {
            this.errorMessage = 'Preencha todos os campos obrigatórios';
            return;
        }

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: () => {
                this.errorMessage = '';
                this.router.navigate(['/tasks']);
                alert("Login realizado com sucesso!");
            },
            error: () => {
                this.errorMessage = 'E-mail ou senha incorretos';
            }
        })
    }

    registerPage() {
        this.router.navigate(['/register']);
    }

}