import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './esqueci.html'
})
export class EsqueciComponent {
  private fb = inject(FormBuilder);

  enviado = false;
  sucesso = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get email() { return this.form.controls.email; }

  recuperar(): void {
    this.enviado = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sucesso = true;
  }
}