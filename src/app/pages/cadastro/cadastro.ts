import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

function cpfValido(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '').replace(/\D/g, '');
  if (!valor) { return null; }
  if (valor.length !== 11 || /^(\d)\1{10}$/.test(valor)) { return { cpfInvalido: true }; }

  const calcularDigito = (quantidade: number): number => {
    let soma = 0;
    for (let i = 0; i < quantidade; i++) {
      soma += Number(valor[i]) * (quantidade + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  if (calcularDigito(9) !== Number(valor[9]) || calcularDigito(10) !== Number(valor[10])) {
    return { cpfInvalido: true };
  }
  return null;
}

function maiorDeIdade(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) { return null; }

  const nascimento = new Date(valor + 'T00:00:00');
  if (isNaN(nascimento.getTime()) || nascimento.getFullYear() < 1900) { return { dataInvalida: true }; }

  const hoje = new Date();
  if (nascimento > hoje) { return { dataFutura: true }; }

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade < 18 ? { menorDeIdade: true } : null;
}

function nomeComSobrenome(control: AbstractControl): ValidationErrors | null {
  const partes = String(control.value ?? '').trim().split(/\s+/).filter(p => p.length > 0);
  if (partes.length === 0) { return null; }
  return partes.length < 2 ? { semSobrenome: true } : null;
}

function senhasIguais(grupo: AbstractControl): ValidationErrors | null {
  const senha = grupo.get('senha')?.value;
  const confirmar = grupo.get('confirmarSenha')?.value;
  return senha && confirmar && senha !== confirmar ? { senhasDiferentes: true } : null;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html'
})
export class CadastroComponent {
  private fb = inject(FormBuilder);

  enviado = false;
  concluido = signal(false);
  nomeCadastrado = signal('');
  mostrarSenha = signal(false);
  hoje = new Date().toISOString().split('T')[0];

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), nomeComSobrenome]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, cpfValido]],
    nascimento: ['', [Validators.required, maiorDeIdade]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)]],
    senha: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]],
    confirmarSenha: ['', [Validators.required]],
    termos: [false, [Validators.requiredTrue]],
    newsletter: [false]
  }, { validators: [senhasIguais] });

  get f() { return this.form.controls; }

  invalido(campo: AbstractControl): boolean {
    return campo.invalid && (campo.touched || this.enviado);
  }

  senhasDiferentes(): boolean {
    return !!this.form.errors?.['senhasDiferentes'] && (this.f.confirmarSenha.touched || this.enviado);
  }

  alternarSenha(): void {
    this.mostrarSenha.set(!this.mostrarSenha());
  }

  mascararCpf(): void {
    const d = String(this.f.cpf.value ?? '').replace(/\D/g, '').slice(0, 11);
    let r = d;
    if (d.length > 9) {
      r = d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6, 9) + '-' + d.slice(9);
    } else if (d.length > 6) {
      r = d.slice(0, 3) + '.' + d.slice(3, 6) + '.' + d.slice(6);
    } else if (d.length > 3) {
      r = d.slice(0, 3) + '.' + d.slice(3);
    }
    this.f.cpf.setValue(r, { emitEvent: false });
  }

  mascararTelefone(): void {
    const d = String(this.f.telefone.value ?? '').replace(/\D/g, '').slice(0, 11);
    let r = d;
    if (d.length > 10) {
      r = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    } else if (d.length > 6) {
      r = '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    } else if (d.length > 2) {
      r = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    }
    this.f.telefone.setValue(r, { emitEvent: false });
  }

  cadastrar(): void {
    this.enviado = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    try {
      localStorage.setItem('hado_usuario', JSON.stringify({ nome: v.nome, email: v.email }));
    } catch {
      // ignora falha de armazenamento
    }

    this.nomeCadastrado.set((v.nome ?? '').trim().split(/\s+/)[0]);
    this.concluido.set(true);
    window.scrollTo({ top: 0 });
  }
}