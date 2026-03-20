import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.loading.set(false);
        if (err.status === 0) {
          this.errorMessage.set('Não foi possível conectar ao servidor.');
        } else if (err.status === 401 || err.status === 403) {
          this.errorMessage.set('E-mail ou senha incorretos.');
        } else {
          this.errorMessage.set('Erro ao fazer login. Tente novamente.');
        }
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
