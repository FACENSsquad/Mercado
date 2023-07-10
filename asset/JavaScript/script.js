// DATA
function dataReal() {
  const hoje = new Date();
  const diaSemana = hoje.getDay();
  
  if(diaSemana == 6){ //sabado
      let span = document.querySelector(".nav--menu span").innerHTML = "07:00 as 21:00"
  }else if(diaSemana == 7){//domingo
      let span = document.querySelector(".nav--menu span").innerHTML = "07:00 as 21:00"
  }else{ //dias da semana 
      let span = document.querySelector(".nav--menu span").innerHTML = "07:00 as 22:00"
  };
  
}dataReal();

// SLIDES
function slideBanner() {
  
  const slides = document.querySelector('.slides--container .slides');
  const slide = document.querySelectorAll('.slides--container .slides .slide');
  const intervalTime = 2000; // tempo em milissegundos
  
  let slideInterval = setInterval(nextSlide, intervalTime);
  
  function nextSlide() {
    slides.scrollBy({
      left: slide[0].offsetWidth,
      behavior: 'smooth'
    });
  
    if (slides.scrollLeft + slides.offsetWidth >= slides.scrollWidth) {
      slides.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  
  function prevSlide() {
    slides.scrollBy({
      left: -slide[0].offsetWidth,
      behavior: 'smooth'
    });
  
    if (slides.scrollLeft === 0) {
      slides.scrollTo({
        left: slides.scrollWidth,
        behavior: 'smooth'
      });
    }
  }
  
  function goToSlide(index) {
    slides.scrollTo({
      left: slide[index].offsetLeft,
      behavior: 'smooth'
    });
  }
}slideBanner();


// -------------------- ITENS TELA INICIAL -------------------- 
async function getProdutos() {
  try {
      const response = await fetch('http://localhost:3000/produtos');
      const produtos = await response.json();
      console.log(produtos);
      
      produtos.forEach(produtoo => {
        
        const mainProduto = document.querySelector('.main--produto');
        const produto = document.createElement('div');
        produto.classList.add('produto');
        //subs produto
        const produtoImg = document.createElement('div');
        produtoImg.className = 'produto--img';
        const imgTop = document.createElement('div');
        imgTop.className = 'img--top';
        const emoDtq = document.createElement('div');
        emoDtq.className = 'emo--qtd';
        const favorit = document.createElement('div');
        favorit.className = 'favorit prd--icon--padrao';
        const favoritImg = document.createElement('img');
        favoritImg.src = '../../asset/img/coracao.png';
        favorit.appendChild(favoritImg);
        const produtoQtd = document.createElement('div');
        produtoQtd.className = 'produto--qtd prd--icon--padrao';
              emoDtq.append(favorit, produtoQtd);
            const embalagem = document.createElement('div');
            embalagem.className = 'embalagem';
              const prdIconPadrao = document.createElement('span');
              prdIconPadrao.textContent = produtoo.Embalagem;
              prdIconPadrao.className = 'prd--icon--padrao';
              embalagem.append(prdIconPadrao);
              imgTop.append(emoDtq, embalagem);
              const imagem = document.createElement('div');
              imagem.className = 'imagem';
              const imagemImg = document.createElement('img');
              imagemImg.src = '../../'+produtoo.imagem;
              imagem.appendChild(imagemImg);
              
              const valor = document.createElement('div');
              valor.className = 'valor';
              const valorAnt = document.createElement('div');
              valorAnt.className = 'valor--ant';
              valorAnt.textContent = produtoo['Valor promocional'];
              const valorReal = document.createElement('div');
              valorReal.className = 'valor--real';
              valorReal.textContent = produtoo.Valor;
              valor.append(valorAnt, valorReal);
              produtoImg.append(imgTop, imagem, valor);
              
              const economia = document.createElement('div');
              economia.className = 'economia';
              const ecoDescricao = document.createElement('div');
          ecoDescricao.textContent = 'Economia ';
          ecoDescricao.className = 'eco--descricao';
          const ecoDescricaoSpan = document.createElement('span');
          ecoDescricaoSpan.textContent = produtoo.Economia;
          ecoDescricao.appendChild(ecoDescricaoSpan);
          economia.append(ecoDescricao);
          
          const produtoDescricao = document.createElement('div');
          produtoDescricao.className = 'produto--descricao';
          const informativo = document.createElement('div');
          informativo.className = 'informativo';
          informativo.textContent = ' Un maxima por cliente';
          const informativoSpan = document.createElement('span');
          informativoSpan.textContent = '5';
          informativo.appendChild(informativoSpan);
          const descriProd = document.createElement('div');
          descriProd.className = 'descri--prod';
          descriProd.textContent = produtoo.Descricao;
          const marca = document.createElement('span');
          marca.className = 'marca';
          marca.textContent = produtoo.Marca;
          descriProd.appendChild(marca);
          produtoDescricao.append(informativo, descriProd);
          
          const comprar = document.createElement('div');
        comprar.className = 'comprar';
        const comprarBtn = document.createElement('div');
        comprarBtn.className = 'comprar--btn';
        const comprarBtnInput = document.createElement('input');
        comprarBtnInput.type = 'button';
        comprarBtnInput.value = 'adicionar';
        comprarBtn.append(comprarBtnInput);
        const comprarQtd = document.createElement('div');
        comprarQtd.className = 'comprar--qtd';
        const comprarQtdInput = document.createElement('input');
        comprarQtd.append(comprarQtdInput);
        comprarQtdInput.type = 'number';
        comprarQtdInput.min = '0';
        comprarQtdInput.max = '10';
        comprar.append(comprarBtn, comprarQtd);
        const infoPreco = document.createElement('div');
        infoPreco.className = 'info--preco';
        infoPreco.textContent = 'preço exclusivo na loja online';
        produto.append(produtoImg, economia, produtoDescricao, comprar, infoPreco);
        mainProduto.appendChild(produto);
        
        //  ---------------------------- adicionar item ----------------------------
        const produtooos = document.querySelectorAll('.produto');
        
        // Percorra cada div de produto
        produtooos.forEach((produto, index) => {
          // Obtenha o input de quantidade do produto atual
          const quantidadeInput = produto.querySelector('input[type="number"]');
          
          // Obtenha a div produto--qtd do produto atual
          const produtoQtd = produto.querySelector('.produto--qtd');
          
          // Adicione um ouvinte de evento de mudança ao input de quantidade
          quantidadeInput.addEventListener('change', () => {
            const quantidade = quantidadeInput.value;
            produtoQtd.textContent = quantidade > 0 ? quantidade : '';
          });
        });

        // ----------------------------------------- MODAL -----------------------------------------
        // chave
        
        function carregarInformacoesAPI(divId) {
          // Exiba as informações no modal
          const modalContent = document.getElementById('modal-content');
          modalContent.textContent = JSON.stringify(produtoo); // Apenas para fins de exemplo, você pode exibir as informações de acordo com a estrutura do objeto retornado pela API
          
          // Abra o modal
          const modal = document.getElementById('modal');
          modal.style.display = 'block';
        }
        
        
        // Adicione o evento de clique a cada div clicável
        const divsClicaveis = document.getElementsByClassName('imagem');
        for (let i = 0; i < divsClicaveis.length; i++) {
          divsClicaveis[i].addEventListener('click', function() {
            const divId = this.id;
            const produtoClicado = divId;
            carregarInformacoesAPI(produtoClicado);
          });
        }
          
        // Feche o modal ao clicar fora dele ou no botão de fechamento
        const modal = document.getElementById('modal');
        const modalCloseButton = document.getElementById('modal-close');
        modal.addEventListener('click', function(event) {
          if (event.target === modal || event.target === modalCloseButton) {
            modal.style.display = 'none';
          }
        });
        });
      
        
        console.log(mainProduto);
      } catch (err) {
        console.log(err);
      }
    }getProdutos();
    
// -------------------- POST PEDIDOS -------------------- 
function PedidoVenda() {
      const dados = {
        "nome": "João da Silva",
        "email": "joao@example.com",
        "endereco": "Rua A, 123",
        "pedidos": [
          {
            "produtos": [
              {
                "nome": "Produto 1",
                "quantidade": 2,
            "preco": 10.99
          }
        ],
        "status": "Pendente",
        "data": "2023-06-30T12:00:00Z"
      }
    ]
  };
  
  console.log(dados);
  
}PedidoVenda();

// Sticky 
window.addEventListener("scroll", function(){
  let nav = document.querySelector('nav');
  nav.classList.toggle("sticky", window.scrollY > 30);
})


$(document).ready(function() {
  $("#carrinhoOP").click(function() {
    fetch("/src/html/carrinho.html")
      .then(response => response.text())
      .then(data => {
        $("#main").html(data);
      })
      .catch(error => {
        console.error("Erro ao carregar o conteúdo do carrinho:", error);
      });
  });

  $("#volta").click(function() {
    $("#main").html("");
  });
});



