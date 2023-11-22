// -------------------- PRODUTOS -------------------- 
async function getPedidos() {
    try {
      const response = await fetch('http://localhost:3000/produtos');
      const pedidos = await response.json();
      
      const produtosList = document.querySelector('#section--pedidos table tbody');
      let produtos_pesq_qtd = document.querySelector('.pedidos--pesq--qtd span');
      console.log(produtos);
      produtos_pesq_qtd.textContent = produtos.length;
      
      // produtos.forEach(produto => {
      //   const row = document.createElement('tr');
      //   row.classList.add('row')

      //   const tdIdProduto = document.createElement('td');
      //   const IdProduto = document.createElement('span');
      //   IdProduto.textContent = produto._id;
      //   tdIdProduto.appendChild(IdProduto);
      //   row.appendChild(tdIdProduto);

      //   const tddescricao = document.createElement('td');
      //   const descricao = document.createElement('span');
      //   descricao.textContent = produto.Descricao;
      //   tddescricao.appendChild(descricao);
      //   row.appendChild(tddescricao);

      //   const valor = document.createElement('td');
      //   valor.textContent = produto.Valor;
      //   row.appendChild(valor);

      //   const marca = document.createElement('td');
      //   marca.textContent = produto.Marca;
      //   row.appendChild(marca);

      //   const valorPromo = document.createElement('td');
      //   valorPromo.textContent = produto['Valor promocional'];
      //   row.appendChild(valorPromo);

      //   produtosList.appendChild(row);
      // });
    } catch (err) {
      console.log(err);
    }
}getPedidos();