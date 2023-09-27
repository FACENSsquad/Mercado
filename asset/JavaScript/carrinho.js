// -------------------- POST PEDIDOS -------------------- 
function pedidos() {

    document.addEventListener('DOMContentLoaded', function(){
        
        const pedidosObj = {};
        
        Object.keys(localStorage).forEach(function (chave) {
            const itemJSON = localStorage.getItem(chave);
            const itemObj = JSON.parse(itemJSON);
            pedidosObj[chave] = itemObj;
        });
        
        // Transformar os valores do objeto pedidosObj em um array
        const pedidosArray = Object.values(pedidosObj);
        
        console.log(pedidosArray);
        pedidosArray.forEach(item =>{
        const seuCarrinhoProdutos = document.querySelector('.seuCarrinhoo--produtos');
            
        const seuProdutos = document.createElement('div');
        seuProdutos.classList.add('seuProduto');
        seuProdutos.id = item.id;
        const img = document.createElement('img');
        img.src = item.img;
        img.style.width = '100px';
        const produtoDescricao = document.createElement('div');
        const p = document.createElement('p');
        const span = document.createElement('span');

        const imgProduto = document.createElement('div');
        imgProduto.classList.add('imgProduto');
        imgProduto.append(img, produtoDescricao);
        produtoDescricao.append(p, span);
        

        const qtdProduto = document.createElement('div');
        qtdProduto.classList.add('qtdProduto');
        
        const valorProdutoUn = document.createElement('div');
        valorProdutoUn.classList.add('valorProdutoUn');
        
        const valorProdutoTotal = document.createElement('div');
        valorProdutoTotal.classList.add('valorProdutoTotal');
        
        const deliteProduto = document.createElement('div');
        deliteProduto.classList.add('deliteProduto');

        seuCarrinhoProdutos.appendChild(seuProdutos);
        seuProdutos.append(imgProduto, qtdProduto, valorProdutoUn, valorProdutoTotal, deliteProduto);
        
    })
})
  }pedidos();