import { Component, inject } from "@angular/core";
import { AuthService } from "../../../../core/auth/services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    username = '';
    email = '';
    password = '';
    errorMessage = '';

    private authService = inject(AuthService);
    private router = inject(Router);

    onSubmit() {
        if(!this.username || !this.email || !this.password) {
            this.errorMessage = 'Preencha todos os campos obrigatórios';
            return;
        }

        this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
            next: () => {
                this.errorMessage = '';
                this.router.navigate(['/login']);
            },
            error: () => {
                this.errorMessage = 'Erro ao fazer o cadastro';
            }
        })
    }

    loginPage() {
        this.router.navigate(['/login']);
    }

}