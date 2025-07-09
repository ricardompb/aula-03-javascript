<template>
  <div class="q-pa-sm">
    <q-card>
      <q-card-section>
        <b>Produto:</b> 
        <div class="row q-col-gutter-sm">
          <q-input v-model="produto.nome" label="Nome" class="col" />
          <q-input v-model="produto.preco" label="Preço" type="number" class="col" />
          <div class="row col-12">
            <q-uploader
              v-if="showCommandDelete"
              class="col-md-12"
              :url="`http://localhost:3000/produto/upload/${$route.query.id}`"
              field-name="file"
              accept="image/*"
              style="max-width: 300px"/>
          </div>          
          <q-input v-model="produto.descricao" label="Descrição" type="textarea" class="col-md-12" rows="10" />          
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" label="Salvar" @click="salvarDadosProduto" :loading="loading" />
        <q-btn color="secondary" label="Cancelar" @click="$router.push('/produto/list')" :loading="loading" />
        <q-btn color="negative" label="Excluir" @click="excluirProduto" :loading="loading" v-if="showCommandDelete" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { api } from '../../boot/axios'

export default {
  name: 'ProdutoForm',
  data() {
    return {
      produto: {},
      loading: false,
      showCommandDelete: false
    }
  },
  async mounted() {
    if (this.$route.query.id === 'new') {
      this.produto = {}
      return
    }
    this.showCommandDelete = true
    const response = await api.get(`/produto/${this.$route.query.id}`)
    this.produto = response?.data
  },
  methods: {
    async excluirProduto() {
      try {
        this.loading = true
        await api.delete(`/produto/${this.$route.query.id}`)
        this.loading = false
        this.$router.push('/produto/list')
      } catch (error) {
        this.loading = false
        console.error('Erro ao excluir o produto:', error)
      }
    },
    async salvarDadosProduto() {
      try {
        this.loading = true
        if (this.$route.query.id !== 'new') {
          await api.put(`/produto/${this.$route.query.id}`, this.produto)
        } else {
          await api.post('/produto', this.produto)
        }
        this.loading = false
        this.$router.push('/produto/list')                
      } catch (error) {
        this.loading = false
        console.error('Erro ao salvar o produto:', error)
      }
    },
  },
}
</script>