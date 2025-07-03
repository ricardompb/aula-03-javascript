const produtos = [
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
]

function carregarTable () {
  const tbody = document.getElementById('tbody');
  produtos.forEach(produto => {
    const row = document.createElement("tr");

    const id = document.createElement("td");
    id.textContent = produto.id

    const nome = document.createElement("td");
    nome.textContent = produto.nome

    const foto = document.createElement("td");
    foto.textContent = produto.foto

    const add = document.createElement("td")
    add.addEventListener('click', addCard);
    add.innerHTML = `<button id=${produto.id}>Adicionar</button>`

    const remove = document.createElement("td")
    remove.addEventListener('click', removeCard);
    remove.innerHTML = `<button id=${produto.id}>Remover</button>`

    row.appendChild(id);
    row.appendChild(nome);
    row.appendChild(foto);
    row.appendChild(add);
    row.appendChild(remove);
    tbody.appendChild(row)
  })
}

carregarTable();

function addCard (event) {
  const produto = produtos.find(p => p.id === +event.target.id)
  if (produto) {
    adicionarNoCarrinho(produto);
  }
}

function removeCard (event) {
  removerProdutoDoCarrinho(+event.target.id);
}

function adicionarNoCarrinho (produto) {
  const temProdutoNoCarrinho = localStorage.getItem(produto.id);
  if (temProdutoNoCarrinho) return
  const carrinho = { ...produto, quantidade: 1 };
  localStorage.setItem(produto.id, JSON.stringify(carrinho));
}

function removerProdutoDoCarrinho (id) {
  if (localStorage.getItem(id)) {
    localStorage.removeItem(id)
  }
}

function limparCarrinho () {
  localStorage.clear();
}

function addProdutoSessao() {
  sessionStorage.setItem(1, JSON.stringify({ nome: 'XPTO' }))
}