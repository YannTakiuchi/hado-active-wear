# HADO Active Wear

Frontend de uma loja virtual de roupas esportivas e outdoor, feito como entrega da P1 na FATEC.

Site no ar: https://SEU-SITE.netlify.app

## Sobre o projeto

A HADO é uma loja fictícia de roupas para corrida, treino e atividades ao ar livre. O projeto reúne as telas principais de um e-commerce, todas responsivas (desktop e celular).

## Páginas

- **Vitrine (Home):** banner, categorias e produtos em destaque
- **Detalhe do produto:** escolha de tamanho e quantidade
- **Busca:** pesquisa por nome e filtro por categoria
- **Cesta:** alterar quantidade, remover itens, ver subtotal, frete e total
- **Login:** formulário com validação
- **Esqueci a senha:** formulário com validação

## O que foi usado

- Angular 20 com standalone components
- TypeScript
- Bootstrap 5 (via CDN) e CSS próprio com as cores da marca
- Reactive Forms nos formulários de login e recuperação de senha
- LocalStorage para guardar a cesta (ela continua ali ao recarregar a página)

## Como rodar na sua máquina

Precisa do Node.js e do Angular CLI instalados.

```bash
git clone https://github.com/SEU-USUARIO/hado-active-wear.git
cd hado-active-wear
npm install
ng serve
```

Depois é só abrir http://localhost:4200 no navegador.

## Estrutura

```
src/app/
  pages/       vitrine, detalhe, busca, cesta, login, esqueci
  services/    produto.ts (lista de produtos) e cart.ts (cesta)
public/img/    fotos dos produtos
```

## Observações

- Os produtos ficam numa lista dentro do código (`produto.ts`), não há banco de dados nem API.
- O login e a recuperação de senha só validam os campos. Não existe autenticação de verdade, já que a P1 é apenas o frontend.
- As fotos vieram do Unsplash/Pexels.

## Autor

SEU NOME - Curso de SEU CURSO, FATEC SUA-CIDADE