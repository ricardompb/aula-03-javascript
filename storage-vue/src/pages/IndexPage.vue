<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="row col-12">
      <q-avatar color="primary" text-color="white">{{ contador }}</q-avatar>
    </div>

    <template v-for="produto in produtos" :key="produto.id">
      <q-card class="my-card q-pa-sm">
        <div style="cursor: pointer;" @click="$router.push(`/produto/${produto.id}`)">
          <img :src="produto.foto">

          <q-card-section>
            <div class="text-h6">{{ produto.nome }}</div>
            <div v-if="false" class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </div>

        <q-card-actions>
          <q-btn
            class="col-12" 
            color="primary" 
            label="Adicionar ao carrinho" 
            @click="adicionarProdutoCarrinho(produto)"
          />
        </q-card-actions>
      </q-card>
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import produtos from './produto.model';
import { useCarrinhoStore } from '../stores/carrinho';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const carrinhoStore = useCarrinhoStore();
    return { carrinhoStore };
  },
  data () {
    return {
      produtos,
    }
  },
  computed: {
    contador () {
      return this.carrinhoStore.produtos.length
    }
  },
  methods: {
    adicionarProdutoCarrinho (produto) {
      this.carrinhoStore.adicionarProduto(produto);
    },
    removeProdutoCarrinho (id) {
      this.carrinhoStore.removerProduto(id);
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>