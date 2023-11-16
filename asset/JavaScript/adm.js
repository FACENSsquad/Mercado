

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
      getBanners()

      // INSERT
      const imagem2 = document.querySelector('input[type="file"]');
      const btnImgBack = document.querySelector('.form--img div');
      const infoArquivo = document.createElement('p');
      imagem2.addEventListener('change', function(event) {
        const arquivo = event.target.files[0];
        if(arquivo != 0){
          const span = document.querySelector('.span--selecionar');
          span.textContent = "selecionado";
          span.style.color = "#fff";
          btnImgBack.style.background = '#2db61b';
          btnImgBack.appendChild(infoArquivo);
          infoArquivo.textContent = arquivo.name;
      }
      console.log(arquivo.name);
      });
    }
    };
    xhr.send();
}

// MONGO ABAIXO -------------------- PRODUTOS -------------------- 
async function getProdutos() {
    try {
      const response = await fetch('http://localhost:3000/produtos');
      const produtos = await response.json();
      
      const produtosList = document.querySelector('#section--produtos table tbody');
      let produtos_pesq_qtd = document.querySelector('.produtos--pesq--qtd span');
      console.log(produtos);
      produtos_pesq_qtd.textContent = produtos.length;
      
      produtos.forEach(produto => {
        const row = document.createElement('tr');
        row.classList.add('row')

        const tdIdProduto = document.createElement('td');
        const IdProduto = document.createElement('span');
        IdProduto.textContent = produto._id;
        tdIdProduto.appendChild(IdProduto);
        row.appendChild(tdIdProduto);

        const tddescricao = document.createElement('td');
        const descricao = document.createElement('span');
        descricao.textContent = produto.Descricao;
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
}getProdutos();

// MONGO ABAIXO -------------------- BANNER -------------------- 
async function getBanners() {
  try {
    const response = await fetch('http://localhost:3000/banner');
    const banners = await response.json();
    
    const bannerList = document.querySelector('.banner--slides table tbody');
    const bannerSlide = document.querySelector('.banner--visual');
    console.log(bannerSlide);

    banners.forEach(slide =>{
      const banner_slide = document.createElement('div');
      const banner_slide_main = document.createElement('div');
      const img = document.createElement('div');
      const informacao = document.createElement('div');
      const codigo = document.createElement('div');
      const descricao = document.createElement('div');
      const marca = document.createElement('div');
      const title = document.createElement('div');
      const info = document.createElement('div');
      const imagem = document.createElement('img');
      const span = document.createElement('span');
      imagem.src = slide.imagem;

      banner_slide.classList.add('banner--slide');
      banner_slide_main.classList.add('banner--slide--main');
      banner_slide.appendChild(banner_slide_main);
      img.classList.add('img');
      img.appendChild(imagem);
      banner_slide_main.appendChild(img);
      informacao.classList.add('informacao');

      banner_slide_main.appendChild(title);
      title.classList.add('title');
      title.textContent = 'Informativo';

      codigo.classList.add('codigo');
      codigo.textContent = 'Codigo:';
      span.textContent = slide.codigo;
      codigo.appendChild(span);
      informacao.appendChild(codigo);

      marca.classList.add('marca');
      marca.textContent = `Marca: ${slide.Marca}`;
      informacao.appendChild(marca);

      descricao.classList.add('descricao');
      descricao.textContent = `Descrição: ${slide.Descrição}`;
      informacao.appendChild(descricao);
      

      banner_slide_main.appendChild(informacao);
      
      banner_slide_main.appendChild(info);
      info.classList.add('info');
      info.textContent = 'Cada card representa seu slide no inicio da loja virtual, tomar cuidado na hora de atualizar pois vai sabir para produção';


      bannerSlide.appendChild(banner_slide);
    })

    banners.forEach(banner =>{
      const row = document.createElement('tr');

      const tdcodigo = document.createElement('td');
      const Idcodigo = document.createElement('span');
      Idcodigo.textContent = banner.codigo;
      tdcodigo.appendChild(Idcodigo);
      row.appendChild(tdcodigo);

      
      const tdmarca = document.createElement('td');
      const Idmarca = document.createElement('span');
      Idmarca.textContent = banner.Marca;
      tdmarca.appendChild(Idmarca);
      row.appendChild(tdmarca);
      
      const tddescricao = document.createElement('td');
      const Iddescricao = document.createElement('span');
      Iddescricao.textContent = banner.Descrição;
      tddescricao.appendChild(Iddescricao);
      row.appendChild(tddescricao);

      bannerList.appendChild(row);

    })   
    
  } catch (err) {
    console.log(err);
  }
}getBanners();

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

  console.log(formData);
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


// ----------------------------------------- BANNER -----------------------------------------
// API DOLAR
