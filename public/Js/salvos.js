var resultado = [];
var onzePontos = 0,
    dozePontos = 0,
    trezePontos = 0,
    quatorzePontos = 0,
    quinzePontos = 0;

function gerarTabela(Jogos) {
    if (resultado.length == 15) {
        onzePontos = 0,
            dozePontos = 0,
            trezePontos = 0,
            quatorzePontos = 0,
            quinzePontos = 0;
        for (let i = 0; i < Jogos.length; i++) {
            finalizar(JSON.parse(Jogos[i]));
        }
        let table = document.getElementById("table");
        let coluna = table.getElementsByTagName("tr");
        for (let i = 0; i < coluna.length; i++) {
            const atual = coluna[i];
            if (i > 0 && i < 6) {
                linha = atual.getElementsByTagName("td");
                if (i == 1) {
                    linha[1].innerText = onzePontos;
                } else if (i == 2) {
                    linha[1].innerText = dozePontos;
                } else if (i == 3) {
                    linha[1].innerText = trezePontos;
                } else if (i == 4) {
                    linha[1].innerText = quatorzePontos;
                } else if (i == 5) {
                    linha[1].innerText = quinzePontos;
                }
                document.getElementById("mascara").style.display = "none";
                document.getElementById("a").style.display = "none";
            } else if (i == 6) {
                linha = atual.getElementsByTagName("th")[1];
                linha.innerText = (onzePontos * 11) + (dozePontos * 12) + (trezePontos * 13) + (quinzePontos * 15) + (quatorzePontos * 14);
            }

        }
        return true;
    } else {
        alert("digite todos os valores")
        return false;
    }
}

function finalizar(atual) {
    let valoresIguais = 0;
    for (let j = 0; j < resultado.length; j++) {
        const testeAtualz = resultado[j];
        for (let i = 0; i < atual.length; i++) {
            if (parseInt(testeAtualz) == atual[i]) {
                valoresIguais++;
            }
        }
    }
    if (valoresIguais == 11) {
        onzePontos++;
    }
    if (valoresIguais == 12) {
        dozePontos++;
    }
    if (valoresIguais == 13) {
        trezePontos++;
    }
    if (valoresIguais == 14) {
        quatorzePontos++;
    }
    if (valoresIguais == 15) {
        quinzePontos++;
    }
}

function salvarJogos() {

}

function novaHora() {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');
}