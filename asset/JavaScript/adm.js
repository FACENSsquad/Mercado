

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
      produtos_pesq_qtd.textContent = produtos.length;
      console.log(produtos)
      
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
const imagem2 = document.querySelector('input[type="file"]');
imagem2.addEventListener('change', function(event) {
  const arquivo = event.target.files[0];
  if(arquivo != 0){
      const span = document.querySelector('.span--selecionar');
      span.textContent = "selecionado";
  }
  console.log(arquivo);
});

function cadastrarProduto() {
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('input-valor').value;
  const marca = document.getElementById('marca').value;
  const embalagem = document.getElementById('embalagem').value;
  const valorPromo = document.getElementById('input-valorPromo').value;
  const promocao = document.getElementById('meuCheckbox').checked;
  const imagem = document.getElementById('input-imagem').files[0];
  if ( //Ao chamar trim() em uma string, todos os espaços em branco iniciais e finais são removidos, resultando em uma nova string sem esses espaços em branco adicionais
    descricao.trim() === '' ||
    valor.trim() === '' ||
    marca.trim() === '' ||
    embalagem.trim() === '' ||
    valorPromo.trim() === ''
  ) {
    alert('Por favor, preencha todos os campos, obrigado!!!');
    return; // Impede o envio do formulário
  }

  const formData = new FormData();
  formData.append('Descricao', descricao);
  formData.append('Valor', valor);
  formData.append('Marca', marca);
  formData.append('Embalagem', embalagem);
  formData.append('Valor promocional',valorPromo);
  formData.append('Promocao', promocao);
  formData.append('imagem', imagem);
  formData.append('Economia', 0);
  const dataAtual = new Date();
  const dataFormatada = `${dataAtual.getDate()}-${dataAtual.getMonth() + 1}-${dataAtual.getFullYear()}`;

  formData.append('Data de Cadastro', dataFormatada);

  fetch('http://localhost:3000/cadastrar', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log('Produto cadastrado com sucesso');
      alert("CADASTRO EFETUADO COM SUCESSO");
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



