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
