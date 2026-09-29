import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Produto } from './produto';

export interface ItemCesta {
  produtoId: number;
  nome: string;
  preco: number;
  imagem: string;
  tamanho: string;
  quantidade: number;
}

const CHAVE_STORAGE = 'hado_cesta';

@Injectable({ providedIn: 'root' })
export class CartService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  itens = signal<ItemCesta[]>(this.carregar());

  totalItens = computed(() => this.itens().reduce((soma, i) => soma + i.quantidade, 0));
  subtotal = computed(() => this.itens().reduce((soma, i) => soma + i.preco * i.quantidade, 0));

  adicionar(produto: Produto, tamanho: string, quantidade: number = 1): void {
    const lista = this.itens();
    const existe = lista.find(i => i.produtoId === produto.id && i.tamanho === tamanho);

    if (existe) {
      this.itens.set(lista.map(i =>
        i === existe ? { ...i, quantidade: i.quantidade + quantidade } : i
      ));
    } else {
      this.itens.set([
        ...lista,
        {
          produtoId: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem,
          tamanho,
          quantidade
        }
      ]);
    }
    this.salvar();
  }

  alterarQuantidade(produtoId: number, tamanho: string, delta: number): void {
    this.itens.set(
      this.itens()
        .map(i => (i.produtoId === produtoId && i.tamanho === tamanho)
          ? { ...i, quantidade: i.quantidade + delta }
          : i)
        .filter(i => i.quantidade > 0)
    );
    this.salvar();
  }

  remover(produtoId: number, tamanho: string): void {
    this.itens.set(this.itens().filter(i => !(i.produtoId === produtoId && i.tamanho === tamanho)));
    this.salvar();
  }

  limpar(): void {
    this.itens.set([]);
    this.salvar();
  }

  private salvar(): void {
    if (!this.isBrowser) { return; }
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(this.itens()));
    } catch {
      // localStorage indisponível: a cesta continua funcionando em memória
    }
  }

  private carregar(): ItemCesta[] {
    if (!this.isBrowser) { return []; }
    try {
      const dados = localStorage.getItem(CHAVE_STORAGE);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }
}