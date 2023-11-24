// -------------------- PEDIDOS -------------------- 
async function getPedidosAdm () {
    try {
      const response = await fetch('http://localhost:3000/pedidosAdm');
      const pedidos = await response.json();
      const seusPedidosList = document.querySelector('.pedido--produtos .seuCarrinhoo--produtos');

      pedidos.forEach(pedido => {
          const seuPedido = document.createElement('div');
          seuPedido.classList.add('seuPedido');
          seuPedido.innerHTML = pedido._id;
          
          const dataPedido = document.createElement('span');
          dataPedido.textContent = pedido.dataCadastro;
          dataPedido.classList.add('dtPedido');
          seuPedido.appendChild(dataPedido);
          
          const qtdItens = document.createElement('span');
          qtdItens.textContent = pedido.quantidadeItens;
          qtdItens.classList.add('dtItens');
          seuPedido.appendChild(qtdItens);

          seusPedidosList.append(seuPedido);
          
          const seuPedidoCd = document.querySelectorAll('.seuCarrinhoo--produtos .seuPedido');
          const seuPedidoQtd = document.querySelector('.seuCarrinho--top span');
          seuPedidoQtd.textContent = seuPedidoCd.length;
          console.log(seuPedidoCd.length);
        }
        
        );
    } catch (err) {
        console.log(err);
    }
}getPedidosAdm();
