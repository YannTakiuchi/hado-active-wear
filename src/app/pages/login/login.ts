import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  enviado = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  get email() { return this.form.controls.email; }
  get senha() { return this.form.controls.senha; }

  entrar(): void {
    this.enviado = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      localStorage.setItem('hado_usuario', this.email.value ?? '');
    } catch {
      // ignora falha de armazenamento
    }
    this.router.navigate(['/']);
  }
}