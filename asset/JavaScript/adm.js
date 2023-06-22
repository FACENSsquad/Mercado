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

// MONGO ABAIXO -------------------- PRODUTOS -------------------- 

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

// -------------------- CADASTRO --------------------
const inputValor = document.getElementById('input-valor');
const inputValorPromo = document.getElementById('input-valorPromo');


function formatt(params) {
  params.addEventListener('input', () => {
    const value = params.value.replace(/[^\d,]/g, '');
    const parts = value.split(',');
  
    let formattedValue = '';
  
    if (parts.length > 0) {
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      formattedValue = integerPart;
  
      if (parts.length > 1) {
        const decimalPart = parts[1].substring(0, 2);
        formattedValue += ',' + decimalPart;
      }
    }
  
    params.value = formattedValue;
  });
}

formatt(inputValor);
formatt(inputValorPromo);

// valor checkbox 
const checkbox = document.getElementById('meuCheckbox');

checkbox.addEventListener('change', () => {
  const isChecked = checkbox.checked;
  console.log(isChecked);
});

// INSERT
function cadastrarProduto() {
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('input-valor').value;
  const marca = document.getElementById('marca').value;
  const embalagem = document.getElementById('embalagem').value;
  const valorPromo = document.getElementById('input-valorPromo').value;
  const promocao = document.getElementById('meuCheckbox').checked;

  const data = {
    descricao: descricao,
    valor: valor,
    marca: marca,
    embalagem: embalagem,
    valorPromo: valorPromo,
    promocao: promocao
  };

  const documento = {
    "Descrição": data.descricao,
    "Valor": data.valor,
    "Marca": data.marca,
    "Embalagem": data.embalagem,
    "Valor promocional": data.valorPromo,
    "Promoção": data.promocao
  };

  console.log(documento);

  fetch('http://localhost:3000/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(documento)
  })
  .then(response => {
    if (response.ok) {
      console.log('Produto cadastrado com sucesso');
      // Faça algo com a resposta, se necessário
    } else {
      console.error('Erro ao cadastrar o produto');
      // Trate o erro, se necessário
    }
  })
  .catch(error => {
    console.error('Erro ao cadastrar o produto:', error);
    // Trate o erro, se necessário
  });
}