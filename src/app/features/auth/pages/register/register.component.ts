import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onSubmit(): void {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage.set('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage.set('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService
      .register({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.successMessage.set('Conta criada com sucesso! Redirecionando...');
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: (err) => {
          this.loading.set(false);
          if (err.status === 0) {
            this.errorMessage.set('Não foi possível conectar ao servidor.');
          } else if (err.status === 409) {
            this.errorMessage.set('Este e-mail já está cadastrado.');
          } else {
            this.errorMessage.set('Erro ao criar conta. Tente novamente.');
          }
        },
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
