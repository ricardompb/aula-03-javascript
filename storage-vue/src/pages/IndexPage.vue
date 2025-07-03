<template>
  <div class="q-pa-md">
    <q-avatar color="primary" text-color="white">{{ contador }}</q-avatar>
    <q-table
      title="Produtos"
      flat
      :rows="rows"
      :columns="columns"
      row-key="name">
      <template #body-cell-acao="props">
        <div class="row q-gutter-sm q-pa-sm">
          <q-btn color="primary" @click="adicionarProdutoCarrinho(props.row)">Adicionar</q-btn>
          <q-btn color="primary" @click="removeProdutoCarrinho(props.row.id)">Remover</q-btn>
        </div>
      </template>
  </q-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      contador: 0,
      rows: [
        {
          id: 1,
          nome: 'Furadeira',
          foto: '',
        },
        {
          id: 2,
          nome: 'Celular',
          foto: '',
        },
        {
          id: 3,
          nome: 'Notebook',
          foto: '',
        },
      ],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Identificador',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        }, 
        {
          name: 'nome',
          required: true,
          label: 'Nome do produto',
          align: 'left',
          field: row => row.nome,
          format: val => `${val}`,
          sortable: true
        }, 
        {
          name: 'foto',
          required: true,
          label: 'Foto do produto',
          align: 'left',
          field: row => row.foto,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'acao',
          label: 'Ações',
          align: 'left',
          field: row => row.foto,
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },
  methods: {
    adicionarProdutoCarrinho (produto) {
      const temProdutoNoCarrinho = localStorage.getItem(produto.id);
      if (temProdutoNoCarrinho) return
      this.contador++
      const carrinho = { ...produto, quantidade: 1 };
      localStorage.setItem(produto.id, JSON.stringify(carrinho));
    },
    removeProdutoCarrinho (id) {
      if (localStorage.getItem(id)) {
        localStorage.removeItem(id)
        this.contador--
      }
    }
  }
});
</script>
