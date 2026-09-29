import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produto';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './vitrine.html'
})
export class VitrineComponent {
  private produtoService = inject(ProdutoService);
  private cart = inject(CartService);

  destaques = this.produtoService.destaques();
  categorias = this.produtoService.categorias();
  aviso = signal('');

  adicionar(produto: Produto): void {
    this.cart.adicionar(produto, produto.tamanhos[0], 1);
    this.aviso.set(produto.nome + ' (tam. ' + produto.tamanhos[0] + ') foi adicionado à cesta!');
    setTimeout(() => this.aviso.set(''), 2500);
  }
}