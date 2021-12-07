"use strict";

let url = "dados/receita_federal.xml";//onde pegará os dados
let div = document.querySelector("#cards");//onde vai exibir os dados


/*entendendo esse fetch: (.then( (resp) => resp.text() ))
- após ser carregado (fetch), este é executado retornando a resposta (.then( (resp))
- desta resposta, é retornado o texto (=> resp.text() )
- quando tiver o texto extraído (mega string), ele joga para a variável str
- new DOMParser().parseFromString(str, "text/xml : etrutura básica que converte para string
*/

fetch(url) //fetch carrega a url, lê o arquivo e joga em memória/o processo é lento. é uma promessa de resposta
    .then( (resp) => resp.text() ) 
    .then( (str) => (new DOMParser().parseFromString(str, "text/xml"))) //converter para xml
    .then ((xml) => {
        div.innerHTML = "";
        console.log(xml);
        let pessoas = xml.querySelectorAll("contribuinte"); //extraiu essa pessoas e jogou no vetor
        for (let pessoa of pessoas ){
            montaCarta(pessoa);
        }
    })
    .catch((error) => console.log(error));//se der algum erro, ele mostrará qual foi

/*ChildNodes resgata a posição que a info está, no cado a foto. a contagem dos "filhos" começa em 0
*/

function montaCarta(pessoa){
    div.innerHTML += `<div class= "card">
                    <img src="${pessoa.childNodes[7].childNodes[0].nodeValue}">
                    <h3>${pessoa.childNodes[2].childNodes[0].nodeValue}
                    <p>
                    CPF: ${pessoa.childNodes[0].childNodes[0].nodeValue}</br>
                    <strong>${pessoa.childNodes[4].childNodes[4].childNodes[0].nodeValue}</strong>
                    <div class="contato">
                    Cel: ${pessoa.childNodes[5].childNodes[1].childNodes[0].nodeValue}
                    Email: ${pessoa.childNodes[5].childNodes[2].childNodes[0].nodeValue}
                    </div>
                    </div>
                    `
}