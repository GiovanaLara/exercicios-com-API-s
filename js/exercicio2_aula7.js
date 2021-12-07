"use strict";
let livros = [];//vetor de livros

//função que irá ler os dados do json e armazenará na variável de livros:
function lerDados(url){
    fetch(url)
    .then((resp) => resp.json())
    .then((json) => livros = json.registros)//atribuição do json retornado para o vetor de livros. registros é o objeto raíz a ser retornado
    .catch((error) => console.log(error))
}
lerDados("dados/biblioteca.json");//endereço que esta sendo processado


//- pegar oq foi digitado
//- a classificação/tipo
//- pesquisar
$("#btn1").click(function(){
    let str_pesq =document.querySelector("#pesq").value;
    let tipo = document.querySelector("#tipo").value;
    pesquisar(str_pesq, tipo);
});

//função q pesquisa:
function pesquisar(str, tipo){
    $("#resultado").html(""); //limpa os campos
    for(let livro of livros){
        switch(tipo){
            case "1": //titulo
                if(livro.titulo.toLowerCase().indexOf(str.toLowerCase()) >= 0){
                    montaLivro(livro);
                } //pesquisa aproximada
                break;
            case "2": //classificação
                if(livro.classificacao.toLowerCase() == str.toLowerCase()){
                    montaLivro(livro);
                }
                break;
        }
    }
}

function montaLivro(livro){
    let autores = "";
    for (let autor of livro.autores){//tirando um autor por vez, acrescentando a variavel string e add <br> no final
        autores += autor.nome + "<br>";
    }
    $("#resultado").append(`<article>
                            <div>
                                <img src="${livro.capa}">
                                <strong>Título:</strong> ${livro.titulo}<br>
                                <strong>Autor(es):</strong> ${autores} <br>
                                <strong>Edição:</strong> ${livro.edicao} <br>
                            </div>
                            <strong>Assunto:</strong> ${livro.assunto}
                            </article>`);
}