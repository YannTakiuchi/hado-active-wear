# KABUTO-HAKI Fitness Lifestyle

Frontend de uma loja virtual de roupas esportivas e outdoor, desenvolvido como entrega da P1 na FATEC.

**Site no ar:** https://hado-active-wear.vercel.app

## Sobre o projeto

A KABUTO-HAKI é uma loja fictícia de roupas para corrida, treino e atividades ao ar livre. O projeto reúne as telas principais de um e-commerce, todas responsivas para desktop e celular.

## Páginas

- **Vitrine (Home):** banner, categorias e produtos em destaque
- **Detalhe do produto:** escolha de tamanho e quantidade
- **Busca:** pesquisa por nome e filtro por categoria
- **Cesta:** alterar quantidade, remover itens, ver subtotal, frete e total
- **Login:** formulário com validação
- **Esqueci a senha:** formulário com validação

## Tecnologias

- Angular com standalone components
- TypeScript
- Bootstrap 5 (via CDN) e CSS próprio com as cores da marca
- Reactive Forms no login e na recuperação de senha
- LocalStorage para guardar a cesta, que continua salva ao recarregar a página

## Como rodar na sua máquina

É preciso ter o Node.js e o Angular CLI instalados.

1. Nesta página do GitHub, clique no botão verde **Code** e depois em **Download ZIP** (ou clone o repositório pelo GitHub Desktop).
2. Extraia a pasta, abra o terminal dentro dela e rode:

```bash
npm install
ng serve
```

3. Abra http://localhost:4200 no navegador.

## Estrutura

```
src/app/
  pages/       vitrine, detalhe, busca, cesta, login, esqueci
  services/    produto.ts (lista de produtos) e cart.ts (cesta)
public/img/    fotos dos produtos
```

## Observações

- Os produtos ficam em uma lista dentro do código (`produto.ts`). Não há banco de dados nem API.
- O login e a recuperação de senha apenas validam os campos, sem autenticação real, já que a P1 cobre só o frontend.
- As fotos são de bancos de imagens gratuitos (Unsplash e Pexels).
- O site está publicado na Vercel e é atualizado automaticamente a cada envio para o GitHub.