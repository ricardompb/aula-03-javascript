<template>
  <div class="q-pa-md" v-if="produto">
    <q-toolbar>
      <q-toolbar-title>
        <div class="text-h6">{{ produto.nome }}</div>
      </q-toolbar-title>

      <q-btn 
        flat 
        dense 
        color="negative" 
        icon="delete"
        @click="removerProdutoDoCarrinho"
      />
    </q-toolbar>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12">
        <div class="row justify-center">
          <img :src="produto.foto" style="width: 350px; height: 350px;"/>
        </div>        
        <div class="row justify-center items-center" v-if="quantidadeNoCarrinho > 0">
          <q-btn flat dense icon="add" color="primary" @click="incrementarQuantidade"/>
          <span class="q-pl-sm q-pr-sm">{{ quantidadeNoCarrinho }}</span>          
          <q-btn 
            flat 
            dense 
            icon="remove" 
            color="primary" 
            :disable="quantidadeNoCarrinho === 1"
            @click="decrementarQuantidade"/>
        </div>
        <div v-else class="row justify-center items-center">
          <q-btn
            class="col-12" 
            color="primary" 
            label="Adicionar ao carrinho" 
            @click="adicionarProdutoCarrinho"
          />          
        </div>
      </div>
      <div class="col-md-9 col-xs-12">        
        <div class="text-subtitle2">{{ produto.descricao }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import produtos from './produto.model';
import { useCarrinhoStore } from '../stores/carrinho';

export default {
  name: 'DetalhamentoProduto',
  setup() {
    const carrinhoStore = useCarrinhoStore();
    return { carrinhoStore };
  },
  data() {
    return {
      produto: null,
    };
  },
  computed: {
    quantidadeNoCarrinho() {
      return this.carrinhoStore.quantidadeNoCarrinho(this.produto.id);
    }
  },  
  methods: {
    adicionarProdutoCarrinho () {
      this.carrinhoStore.adicionarProduto(this.produto);
    },
    incrementarQuantidade() {
      this.carrinhoStore.incrementarQuantidade(this.produto.id);
    },
    decrementarQuantidade() {
      this.carrinhoStore.decrementarQuantidade(this.produto.id);
    },
    removerProdutoDoCarrinho () {
      this.carrinhoStore.removerProdutoDoCarrinho(this.produto.id);
      this.$router.push('/');
    }
  },
  mounted() {
    const produto = produtos.find(p => p.id === +this.$route.params.id);
    if (produto) {
      this.produto = produto;
    }
  },
}
</script>