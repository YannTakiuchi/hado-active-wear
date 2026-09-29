import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProdutoService, Produto } from '../../services/produto';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './busca.html'
})
export class BuscaComponent {
  private route = inject(ActivatedRoute);
  private produtoService = inject(ProdutoService);
  private cart = inject(CartService);

  categorias = this.produtoService.categorias();
  termo = signal('');
  categoria = signal('');
  resultados = signal<Produto[]>([]);
  aviso = signal('');

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.termo.set(params.get('q') ?? '');
      this.categoria.set(params.get('categoria') ?? '');
      this.resultados.set(this.produtoService.buscar(this.termo(), this.categoria()));
    });
  }

  adicionar(produto: Produto): void {
    this.cart.adicionar(produto, produto.tamanhos[0], 1);
    this.aviso.set(produto.nome + ' (tam. ' + produto.tamanhos[0] + ') foi adicionado à cesta!');
    setTimeout(() => this.aviso.set(''), 2500);
  }
}