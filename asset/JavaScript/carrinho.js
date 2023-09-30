function valorDecimal(opcoesDeL) {              
    opcoesDeL = {
      style:'decimal',
      minimumFractionDigits:2,
      maximumFractionDigits:2
    };
  }

// -------------------- POST PEDIDOS -------------------- 

function pedidos() {
    document.addEventListener('DOMContentLoaded', function () {

        const pedidosObj = {};

        Object.keys(localStorage).forEach(function (chave) {
            const itemJSON = localStorage.getItem(chave);
            const itemObj = JSON.parse(itemJSON);
            pedidosObj[chave] = itemObj;
        });

        // Transformar os valores do objeto pedidosObj em um array
        const pedidosArray = Object.values(pedidosObj);

        console.log(pedidosArray);
        pedidosArray.forEach(item => {
            const seuCarrinhoProdutos = document.querySelector('.seuCarrinhoo--produtos');

            const seuProdutos = document.createElement('div');
            seuProdutos.classList.add('seuProduto');
            seuProdutos.id = item.id;
            const img = document.createElement('img');
            img.src = item.img;
            const produtoDescricao = document.createElement('div');
            produtoDescricao.classList.add('produtoDescricao');
            const p = document.createElement('p');
            p.textContent = item.nome;
            const span = document.createElement('span');
            span.textContent = item.nomeEmbalagem;
            span.style.textTransform= 'uppercase';

            const imgProduto = document.createElement('div');
            imgProduto.classList.add('imgProduto');
            imgProduto.append(img, produtoDescricao);
            produtoDescricao.append(p, span);

            const qtdProduto = document.createElement('div');
            qtdProduto.classList.add('qtdProduto');
            qtdProduto.textContent = item.quantidade;
            const span1 = document.createElement('span');
            span1.textContent = ' Un';
            qtdProduto.append(span1);

            const valorProdutoUn = document.createElement('div');
            valorProdutoUn.classList.add('valorProduto--un');
            valorProdutoUn.textContent = item.precoUnitario;

            const valorProdutoTotal = document.createElement('div');
            valorProdutoTotal.classList.add('valorProduto--total');
            valorProdutoTotal.textContent = item.precoTotal;

            const deliteProduto = document.createElement('div');
            deliteProduto.classList.add('deliteProduto');
            const inputBtnD = document.createElement('input');
            deliteProduto.setAttribute('data-chave', item.id);
            inputBtnD.type = 'button'
            inputBtnD.value = 'X'
            deliteProduto.appendChild(inputBtnD);

            seuCarrinhoProdutos.appendChild(seuProdutos);
            seuProdutos.append(imgProduto, qtdProduto, valorProdutoUn, valorProdutoTotal, deliteProduto);
        })

        function qunatidadeCompra() {
            const compraObservacoes = document.querySelectorAll('.seuProduto');
            const quantidadeProd = document.querySelector('.quantidadeProd');
            quantidadeProd.innerHTML = compraObservacoes.length;


            const valorProdutoTotal = document.querySelectorAll('.valorProduto--total'); 
            const valorTotal = document.querySelector('.valorTotal')
            let soma = 0;
            valorProdutoTotal.forEach(elemento => {
                const valorTexto = elemento.textContent;
                const valorNumerico = parseFloat(valorTexto);                 
                
                if (!isNaN(valorNumerico)) {
                    soma += valorNumerico;
                }
                valorTotal.innerHTML = soma;
            });
            

        }qunatidadeCompra();


        function deletarItem() {
            const itemD = document.querySelectorAll('.deliteProduto');
            itemD.forEach(function (button) {
                button.addEventListener('click', function () {
                    const chave = button.getAttribute('data-chave');
                    localStorage.removeItem(chave);
                    location.reload();
                })
            })

        } deletarItem();

    })
} pedidos();


