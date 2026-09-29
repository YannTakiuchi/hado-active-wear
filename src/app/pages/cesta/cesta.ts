import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cesta.html'
})
export class CestaComponent {
  cart = inject(CartService);
  finalizado = signal(false);

  get frete(): number {
    const sub = this.cart.subtotal();
    return sub === 0 || sub >= 300 ? 0 : 19.9;
  }

  get total(): number {
    return this.cart.subtotal() + this.frete;
  }

  aumentar(produtoId: number, tamanho: string): void {
    this.cart.alterarQuantidade(produtoId, tamanho, 1);
  }

  diminuir(produtoId: number, tamanho: string): void {
    this.cart.alterarQuantidade(produtoId, tamanho, -1);
  }

  remover(produtoId: number, tamanho: string): void {
    this.cart.remover(produtoId, tamanho);
  }

  limpar(): void {
    this.cart.limpar();
  }

  finalizar(): void {
    this.cart.limpar();
    this.finalizado.set(true);
  }
}