function carregarConteudo(url, element) {

    // Remove a classe 'active' de todos os links
    var links = document.querySelectorAll('.menu--list a');
    links.forEach(function(link) {
        link.classList.remove('active');
    });

    // Adiciona a classe 'active' ao link clicado
    element.classList.add('active');

    // Carrega o conteúdo do HTML na div 'container--conteudo'
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        document.querySelector('.container--conteudo').innerHTML = xhr.responseText;
        getProdutos();
    }
    };
    xhr.send();
}

// MONBO ABAIXO

async function getProdutos() {
    try {
      const response = await fetch('http://localhost:3000/produtos');
      const produtos = await response.json();
      
      // console.log(produtos.length)
      
      const produtosList = document.querySelector('table tbody');
      let produtos_pesq_qtd = document.querySelector('.produtos--pesq--qtd span');
      console.log(produtos_pesq_qtd)
      produtos_pesq_qtd.textContent = produtos.length;
      
      produtos.forEach(produto => {
        const row = document.createElement('tr');

        const tdIdProduto = document.createElement('td');
        const IdProduto = document.createElement('span');
        IdProduto.textContent = produto._id;
        tdIdProduto.appendChild(IdProduto);
        row.appendChild(tdIdProduto);

        const tddescricao = document.createElement('td');
        const descricao = document.createElement('span');
        descricao.textContent = produto.Descrição;
        tddescricao.appendChild(descricao);
        row.appendChild(tddescricao);

        const valor = document.createElement('td');
        valor.textContent = produto.Valor;
        row.appendChild(valor);

        const marca = document.createElement('td');
        marca.textContent = produto.Marca;
        row.appendChild(marca);

        const valorPromo = document.createElement('td');
        valorPromo.textContent = produto['Valor promocional'];
        row.appendChild(valorPromo);

        produtosList.appendChild(row);
      });
    } catch (err) {
      console.log(err);
    }
  }

  getProdutos();