import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produto';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './detalhe.html'
})
export class DetalheComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private produtoService = inject(ProdutoService);
  private cart = inject(CartService);

  produto = signal<Produto | undefined>(undefined);
  tamanho = signal('');
  quantidade = signal(1);
  adicionado = signal(false);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const encontrado = this.produtoService.buscarPorId(id);
      this.produto.set(encontrado);
      this.tamanho.set(encontrado ? encontrado.tamanhos[0] : '');
      this.quantidade.set(1);
      this.adicionado.set(false);
    });
  }

  escolherTamanho(t: string): void {
    this.tamanho.set(t);
  }

  alterarQuantidade(delta: number): void {
    const nova = this.quantidade() + delta;
    if (nova >= 1 && nova <= 10) {
      this.quantidade.set(nova);
    }
  }

  adicionar(): void {
    const p = this.produto();
    if (!p) { return; }
    this.cart.adicionar(p, this.tamanho(), this.quantidade());
    this.adicionado.set(true);
  }

  comprarAgora(): void {
    this.adicionar();
    this.router.navigate(['/cesta']);
  }
}