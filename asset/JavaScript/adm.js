$(document).ready(function() {
    // Função para carregar o conteúdo do HTML e atualizar a div
    function carregarConteudo(url) {
      $('.container--conteudo').load(url);
    }

    // Lidar com o clique nos links
    $('#link-dashboard').click(function(e) {
      e.preventDefault(); // Impede o comportamento padrão do link
      var url = 'teste.html'; // URL do HTML do Dashboard
      carregarConteudo(url); // Carrega o conteúdo do HTML
    });

    $('#link-produtos').click(function(e) {
      e.preventDefault();
      var url = 'produtos.html';
      carregarConteudo(url);
    });

    $('#link-cadastro').click(function(e) {
      e.preventDefault();
      var url = 'cadastro.html';
      carregarConteudo(url);
    });

    $('#link-banner').click(function(e) {
      e.preventDefault();
      var url = 'banner.html';
      carregarConteudo(url);
    });

    $('#link-informativo').click(function(e) {
      e.preventDefault();
      var url = 'informativo.html';
      carregarConteudo(url);
    });
  });