import { defineStore } from 'pinia'

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    produtos: []
  }),

  actions: {
    adicionarProduto (produto) {
      const temProdutoNoCarrinho = this.produtos.find(p => p.id === produto.id);
      if (temProdutoNoCarrinho) return;
      this.produtos.push({ ...produto, quantidade: 1 });
    },
    removerProduto (id) {
      const index = this.produtos.findIndex(p => p.id === id);
      if (index !== -1) {
        this.produtos.splice(index, 1);
      }
    },
    quantidadeNoCarrinho (id) {
      const produto = this.produtos.find(p => p.id === id);
      return produto?.quantidade || 0;
    },
    incrementarQuantidade (id) {
      const produto = this.produtos.find(p => p.id === id);
      if (produto) {
        produto.quantidade++;
      }
    },
    decrementarQuantidade (id) {
      const produto = this.produtos.find(p => p.id === id);
      if (produto?.quantidade > 1) {
        produto.quantidade--;
      }
    },
    removerProdutoDoCarrinho (id) {
      this.removerProduto(id);
    }
  },

  persist: {
    key: 'pinia-carrinho',
    path: ['produtos'],
    storage: localStorage,
  }
});