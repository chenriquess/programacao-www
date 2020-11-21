function abrirJogo(jogoId) {
    getJogo(jogoId);
}

const urlApi = "http://localhost:5000/";

function getJogos(){
    let request = new XMLHttpRequest()

    request.open('GET', urlApi + 'jogos/') 
    request.responseType = 'json'
    request.send()

    request.onload = function(){
        updateListaJogos(request.response)
    }
}

function getDestaque(){
    let request = new XMLHttpRequest()

    request.open('GET', urlApi + 'jogos/destaque/') 
    request.responseType = 'json'
    request.send()

    request.onload = function(){
        updateDestaque(request.response)
    }
}

function getJogo(id){
    let request = new XMLHttpRequest()

    request.open('GET', urlApi + `jogos/${id}`) 
    request.responseType = 'json'
    request.send()

    request.onload = function(){
        updateModalInfo(request.response);
    }
}


function updateDestaque(jogo) {
    $('#destaque').append(`
    <div class="col-12 col-md-9" onclick="abrirJogo(${jogo.id})">
        <div class="img-banner">
            <img src="${jogo.imgUrl}" alt="Banner Principal">
        </div>
    </div>
    <div class="col-12 col-md-3 banner-side py-3 px-4 text-center" onclick="abrirJogo(${jogo.id})">
        <span>${jogo.titulo}</span>

        <div class="row">
            <div class="col p-1">
                <img src="${jogo.imgsExemplo[0]}" alt="Exemplo do jogo">
            </div>
            <div class="col p-1">
                <img src="${jogo.imgsExemplo[1]}" alt="Exemplo do jogo">
            </div>
        </div>
        <div class="row">
            <div class="col p-1">
                <img src="${jogo.imgsExemplo[2]}" alt="Exemplo do jogo">
            </div>
            <div class="col p-1">
                <img src="${jogo.imgsExemplo[3]}" alt="Exemplo do jogo">
            </div>
        </div>

        <div class="row mb-5 text-left pt-3">
            ${jogo.descricao}
        </div>

        <div class="banner-buy">
            <a href="#" class="btn-buy">Comprar</a>
        </div>
    </div>`);
}

function updateListaJogos(listaJogos) {
    listaJogos.forEach(jogo => {
        $('#rowJogos').append(`
        <div class="col mb-4">
                <a href="#" class="game-link" onclick="abrirJogo(${jogo.id})">

                    <div class="game-cover">
                        <img src="${jogo.imgUrl}" width="100%" alt="Jumanji">

                        <div class="overlay"></div>

                        <div class="game-info">
                            <div class="row">
                                <div class="col-12 mb-5">
                                    <span class="price" title="Preço do jogo">R$ ${jogo.preco}</span>
                                    <button class="add-to-cart" title="Adicionar ao carrinho">🛒</button>
                                </div>
                                <div class="col-12">
                                    <div class="info">
                                        <div>
                                            <span class="game-title">${jogo.titulo}</span>
                                        </div>
                                        <div>
                                            <span class="game-description">${jogo.descricao}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </a>
            </div>
            `)
    });
}

function updateModalInfo(jogo) {
    $('#modalJogo .modal-body').html(`
    <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Titulo:</strong> <span class="float-right">${jogo.titulo}</span></li>
    <li class="list-group-item"><strong>Valor atual:</strong> <span class="float-right">R$ ${jogo.preco}</span></li>
    <li class="list-group-item"><strong>Total de vendas:</strong> <span class="float-right">${jogo.vendas}</span></li>
    <li class="list-group-item"><strong>Data de lançamento:</strong> <span class="float-right">${jogo.dataLancamento}</span></li>
    <li class="list-group-item"><strong>Valor mais baixo:</strong> <span class="float-right">R$ ${jogo.valorMaisBarato}</span></li>
    <li class="list-group-item"><strong>Plataformas:</strong> <span class="float-right">${jogo.plataformas}</span></li>
    <li class="list-group-item"><strong>Resolução:</strong> <span class="float-right">${jogo.resolucao}</span></li>
    <li class="list-group-item"><strong>Desenvolvedora:</strong> <span class="float-right">${jogo.desenvolvedora}</span></li>
  </ul>`);

  $('.modal-title').text(jogo.titulo);
  $('#modalJogo').modal();
}

$(document).ready(function(){
    getDestaque();
    getJogos();
});