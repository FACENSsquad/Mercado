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
    }
    };
    xhr.send();
}