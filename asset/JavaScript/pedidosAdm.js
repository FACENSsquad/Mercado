// -------------------- PEDIDOS -------------------- 
async function getPedidosAdm () {
    try {
      const response = await fetch('http://localhost:3000/pedidosAdm');
      const pedidos = await response.json();

      const pedidosList = document.querySelector('#section--pedidos table tbody');
      let pedidos_pesq_qtd = document.querySelector('.pedidos--pesq--qtd span');
      pedidos_pesq_qtd.textContent = pedidos.length;
      

      pedidos.forEach(pedido => {
        const row = document.createElement('tr');
        row.classList.add('row')

        const tdIdPedidos = document.createElement('td');
        const IdPedidos = document.createElement('span');
        IdPedidos.textContent = pedido._id;
        tdIdPedidos.appendChild(IdPedidos);
        row.appendChild(tdIdPedidos);

        const tddescricao = document.createElement('td');
        const descricao = document.createElement('span');
        descricao.textContent = pedido.quantidadeItens;;
        tddescricao.appendChild(descricao);
        row.appendChild(tddescricao);

        const valor = document.createElement('td');
        valor.textContent = pedido.quantidadeItens;
        row.appendChild(valor);

        const marca = document.createElement('td');
        marca.textContent = pedido.cliente;
        row.appendChild(marca);

        const valorPromo = document.createElement('td');
        valorPromo.textContent = pedido.dataCadastro;
        row.appendChild(valorPromo);

        pedidosList.appendChild(row);
      });
    } catch (err) {
      console.log(err);
    }
}getPedidosAdm();


