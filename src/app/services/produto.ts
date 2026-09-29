import { Injectable } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  descricao: string;
  imagem: string;
  tamanhos: string[];
  destaque: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private produtos: Produto[] = [
    {
      id: 1, nome: 'Jaqueta Corta-Vento Trail', categoria: 'Outdoor', preco: 289.9, destaque: true,
      descricao: 'Jaqueta leve e impermeável, ideal para trilhas e dias de chuva. Possui capuz ajustável e bolsos com zíper.',
      imagem: 'img/jaqueta-trail.jpg', tamanhos: ['P', 'M', 'G', 'GG']
    },
    {
      id: 2, nome: 'Camiseta Dry-Fit Run', categoria: 'Corrida', preco: 89.9, destaque: true,
      descricao: 'Camiseta com tecnologia dry-fit que seca rápido e mantém o conforto durante toda a corrida.',
      imagem: 'img/camiseta-run.jpg', tamanhos: ['P', 'M', 'G', 'GG']
    },
    {
      id: 3, nome: 'Legging Compressão Power', categoria: 'Treino', preco: 139.9, destaque: true,
      descricao: 'Legging de alta compressão com cintura alta, perfeita para treinos intensos na academia.',
      imagem: 'img/legging-power.jpg', tamanhos: ['P', 'M', 'G']
    },
    {
      id: 4, nome: 'Bermuda Trekking Flex', categoria: 'Outdoor', preco: 159.9, destaque: true,
      descricao: 'Bermuda resistente com elastano, secagem rápida e bolsos reforçados para aventuras ao ar livre.',
      imagem: 'img/bermuda-trekking.jpg', tamanhos: ['P', 'M', 'G', 'GG']
    },
    {
      id: 5, nome: 'Shorts Running Ultra', categoria: 'Corrida', preco: 99.9, destaque: false,
      descricao: 'Shorts ultraleve com forro interno e tecido respirável para corridas de longa distância.',
      imagem: 'img/shorts-running.jpg', tamanhos: ['P', 'M', 'G', 'GG']
    },
    {
      id: 6, nome: 'Fleece Térmico Summit', categoria: 'Outdoor', preco: 249.9, destaque: false,
      descricao: 'Blusa de fleece com isolamento térmico para montanhas e climas frios. Macia e muito leve.',
      imagem: 'img/fleece-summit.jpg', tamanhos: ['M', 'G', 'GG']
    },
    {
      id: 7, nome: 'Top Sport Impact', categoria: 'Treino', preco: 79.9, destaque: false,
      descricao: 'Top de sustentação média com alças reforçadas e tecido com proteção UV.',
      imagem: 'img/top-sport.jpg', tamanhos: ['P', 'M', 'G']
    },
    {
      id: 8, nome: 'Regata Performance', categoria: 'Treino', preco: 69.9, destaque: false,
      descricao: 'Regata leve com modelagem atlética, ótima para musculação e treinos funcionais.',
      imagem: 'img/regata-performance.jpg', tamanhos: ['P', 'M', 'G', 'GG']
    }
  ];

  listar(): Produto[] {
    return this.produtos;
  }

  destaques(): Produto[] {
    return this.produtos.filter(p => p.destaque);
  }

  categorias(): string[] {
    return ['Corrida', 'Treino', 'Outdoor'];
  }

  buscarPorId(id: number): Produto | undefined {
    return this.produtos.find(p => p.id === id);
  }

  buscar(termo: string, categoria: string): Produto[] {
    const t = termo.trim().toLowerCase();
    return this.produtos.filter(p => {
      const bateTermo = !t || p.nome.toLowerCase().includes(t) || p.descricao.toLowerCase().includes(t);
      const bateCategoria = !categoria || p.categoria === categoria;
      return bateTermo && bateCategoria;
    });
  }
}