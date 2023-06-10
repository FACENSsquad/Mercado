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

// ----------------- Slides botões
const btnAnterior = document.querySelector('.anterior');
const btnProximo = document.querySelector('.proximo');

btnAnterior.addEventListener('click', prevSlide);
btnProximo.addEventListener('click', nextSlide);
