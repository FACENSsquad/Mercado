// DATA
const hoje = new Date();
const diaSemana = hoje.getDay();

console.log(hoje);
console.log(diaSemana);

if(diaSemana == 6){ //sabado
    let span = document.querySelector(".nav--menu span").innerHTML = "07:00 as 21:00"
}else if(diaSemana == 7){//domingo
    let span = document.querySelector(".nav--menu span").innerHTML = "07:00 as 21:00"
}else{ //dias da semana 
    let span = document.querySelector(".nav--menu span").innerHTML = "07:00 as 22:00"
};


// SLIDES
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

// Sticky 
window.addEventListener("scroll", function(){
  let nav = document.querySelector('nav');
  nav.classList.toggle("sticky", window.scrollY > 30);
})


// adicionar item
const produtos = document.querySelectorAll('.produto');

// Percorra cada div de produto
produtos.forEach((produto, index) => {
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
const options = {
method: 'GET',
headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2Q0ZThjNjJmMmMzZDUyOTM4YmNhYjM4NDUwZmVjNCIsInN1YiI6IjY0OGE0ZjUzN2ViNWYyMDBhZTZhYWNlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kZ6bJ25v6Rda7BlfQ2kcT5Yz0F5bg7Xfin_GrJTteRw'
}
};

// Função para carregar as informações da API
function carregarInformacoesAPI(divId) {
// Chame a API usando o divId ou qualquer outra informação relacionada
// Exemplo de chamada da API usando o fetch:
fetch('https://api.themoviedb.org/3/tv/197588/images', options)
    .then(response => response.json())
    .then(response => {
    // Exiba as informações no modal
    const modalContent = document.getElementById('modal-content');
    modalContent.textContent = JSON.stringify(response); // Apenas para fins de exemplo, você pode exibir as informações de acordo com a estrutura do objeto retornado pela API

    // Abra o modal
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    })
    .catch(err => console.error(err));
}

// Adicione o evento de clique a cada div clicável
const divsClicaveis = document.getElementsByClassName('imagem');
for (let i = 0; i < divsClicaveis.length; i++) {
divsClicaveis[i].addEventListener('click', function() {
    const divId = this.id;
    carregarInformacoesAPI(divId);
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