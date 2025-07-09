<script>
import { api } from '../../boot/axios'

export default {
  name: 'ProdutoList',
  data () {
    return {
      produtos: [],
      columns: [
        { name: '_id', label: 'ID', field: '_id', align: 'left' },
        { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
        { name: 'descricao', label: 'Descrição', field: 'descricao', align: 'left' },
        { name: 'preco', label: 'Preço', field: 'preco', align: 'left' },
      ],
    }
  },
  async mounted () {
    try {
      const response = await api.get('/produto')
      this.produtos = response.data
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error)
    }  
  },
}
</script>

<template>
  <div class="q-pa-sm">
    <q-table
      :rows="produtos"
      :columns="columns"
      row-key="id"
      title="Lista de Produtos"
      no-data-label="Nenhum produto encontrado"
      :loading="false"
      @row-click="(_, row) => $router.push(`/produto/form?id=${row._id}`)"
    >
      <template v-slot:top-right>
        <q-btn color="primary" label="Adicionar Produto" to="/produto/form?id=new" />
      </template>
    </q-table>
  </div>
</template>

<style lang="sass"></style>