<template>
  <div class="row justify-center q-pa-md row items-start q-gutter-md">
    <div class="row col-12 justify-end">
      <q-avatar color="primary" text-color="white">{{ contador }}</q-avatar>
    </div>

    <template v-for="produto in produtos" :key="produto._id">
      <q-card class="my-card q-pa-sm">
        <div style="cursor: pointer;" @click="$router.push(`/produto/${produto._id}`)">
          <img :src="produto.foto" style="width: 230px; height: 256px;">

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
import { useCarrinhoStore } from '../stores/carrinho';
import { api } from '../boot/axios';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const carrinhoStore = useCarrinhoStore();
    return { carrinhoStore };
  },
  data () {
    return {
      produtos: [],
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
  },
  async mounted () {
    const resposta = await api.get('/produto');
    this.produtos = resposta.data;
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>