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
            
            const btnMM = document.createElement('div');
            btnMM.classList.add('btn--mm');
            const unCampo = document.createElement('div')
            unCampo.textContent = item.quantidade;
            const span1 = document.createElement('span');
            const btnMenos = document.createElement('div');
            btnMenos.classList.add('btn--dtd', 'btnMenos');
            btnMenos.setAttribute('data-chave', item.id);
            const btnMenosIcon = document.createElement('i');
            btnMenosIcon.classList.add('uil','uil-minus');
            span1.textContent = ' Un';
            const btnMais = document.createElement('div');
            btnMais.classList.add('btn--dtd', 'btnMais');
            btnMais.setAttribute('data-chave', item.id);
            const btnMaisIcon = document.createElement('i');
            btnMaisIcon.classList.add('uil','uil-plus');
            btnMais.append(btnMaisIcon);
            btnMenos.append(btnMenosIcon);
            unCampo.append(span1);
            btnMM.append( btnMenos, unCampo,btnMais);
            qtdProduto.append( btnMM);


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

        function btnMais() {
          const btnMa = document.querySelectorAll('.btnMais');
          btnMa.forEach(function (button){
            button.addEventListener('click', function () {
              const chave = button.getAttribute('data-chave');
              const dados = localStorage.getItem(chave);
              const objMais = JSON.parse(dados);
              objMais.quantidade++;

              localStorage.setItem(chave, JSON.stringify(objMais));
              location.reload();
            })
          })
        }btnMais();

        function btnMenos() {
          const btnMa = document.querySelectorAll('.btnMenos');
          btnMa.forEach(function (button){
            button.addEventListener('click', function () {
              const chave = button.getAttribute('data-chave');
              const dados = localStorage.getItem(chave);
              const objMais = JSON.parse(dados);
              objMais.quantidade--;

              objMais.precoTotal * 10;

              localStorage.setItem(chave, JSON.stringify(objMais));
              location.reload();
            })
          })
        }btnMenos();
    })
} pedidos();

const btnComprar = document.querySelector('.comprarBtn');
btnComprar.addEventListener('click', async function () {
  try {

    //array 
    const localStorageItems = Object.keys(localStorage).map(key => {
      return JSON.parse(localStorage.getItem(key));
    });
    
    //objeto
    const localStoragepedidoDB = Object.keys(localStorage).reduce((acc, key) => {
      acc[key] = JSON.parse(localStorage.getItem(key));
      return acc;
    }, {});

    const itemsForStripe = localStorageItems.map(item => {
      console.log(item.nome)
      return {
        name: item.nome,
        amount: parseFloat(item.precoTotal.replace(',', '.')) * 100,
        currency: 'usd',
        quantity: parseInt(item.quantidade),
      };
    });
          
    if(localStorageItems.length > 0){

        const response = await fetch('http://localhost:3000/processarPagamento',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: itemsForStripe }), // Envie o pedido no corpo da solicitação
        })
        .then(res =>{
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
      })
      .then(({url}) => {
        console.log(url)
        console.log(localStoragepedidoDB)
        window.location = url;
        console.log("ooiii")
          fetch('http://localhost:3000/pedidos',{
            method: 'POST',
            body: localStoragepedidoDB
          })
          .then(response =>{
            if(response.ok){
              console.log("Pedido cadastradogit");
            }else{
              console.log("Erro ao cadastrar o pedido");
            }
          })
        })
        .catch(e =>{
          console.log(e.error)
        })
      }
    
    
    }
  
    catch (error) {
      console.error('Erro ao processar pagamento:', error);
    }
});
