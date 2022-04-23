var selectedNumbers = [];
var resultado = [];
var sequencias = [];
var jogosGerados = [];
var onzePontos,
    dozePontos,
    trezePontos,
    quatorzePontos,
    quinzePontos;
var joguei = false;
var user;
//a = firebase.auth().currentUser.photoURL
firebase.auth().onAuthStateChanged(() => {
    if (firebase.auth().currentUser) {
        user = firebase.auth().currentUser.toJSON();
        let profile = document.createElement("img");
        profile.src = user.photoURL;
        profile.style.width = "50px";
        profile.style.height = "50px";
        profile.style.borderRadius = "100%";
        let newString = "";
        for (let i = 0; i < 30; i++) {
            if (user.displayName[i] != " ") {
                newString = newString + user.displayName[i];
            } else {
                break;
            }
        }
        document.getElementById("NomeConta").innerHTML = newString;
        document.getElementById("nav").appendChild(profile);
    }
})

function generateTable() {
    var a = document.getElementById("numeroDeJogos");
    if (a.value > 0 && a.value <= 15504) {
        if (selectedNumbers.length == 5) {
            if (user) {
                sequencias = [];
                jogosGerados = [];
                onzePontos = 0,
                    dozePontos = 0,
                    trezePontos = 0,
                    quatorzePontos = 0,
                    quinzePontos = 0;
                var buttonDiv = document.getElementById("buttons");
                var buttons = buttonDiv.getElementsByTagName("button");
                let table = document.getElementById("table");
                let coluna = table.getElementsByTagName("tr");
                if (resultado.length > 0) {
                    if (resultado.length == 15) {
                        gerarLista(15);
                        shuffle(sequencias);
                        gerarJogos(parseInt(a.value));
                        joguei = true;
                        alert("        Jogos Gerados!\n Clique agora em 'Salvar Jogos' Para adicionar os mesmos a sua lista");
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
                    } else {
                        alert("para gerar uma tabela comparatoria escolha 15 numeros na lista abaixo, se não deseja desmarque todos os da mesma");
                    }
                } else {
                    sequencias = [];
                    jogosGerados = [];
                    onzePontos = 0,
                        dozePontos = 0,
                        trezePontos = 0,
                        quatorzePontos = 0,
                        quinzePontos = 0;
                    gerarLista(15);
                    shuffle(sequencias);
                    gerarJogos(parseInt(a.value));
                    joguei = true;
                    alert("        Jogos Gerados!");
                    salvarJogos();
                }
            } else {
                alert("Você precisa estar Logado para acessar!")
            }

        } else {
            alert("Escolha todos os 5 numeros");
        }
    } else {
        alert("informe um nuemero valido entre 1 e 15504");
    }
}


function gerarLista(m) {
    var caracteresUsaveis = gerarUsaveis(25);
    var used = [];
    let sequenciaAtual = [];
    let x;
    for (let i = 0; i < m; i++) {
        sequenciaAtual.push(caracteresUsaveis[i]);
    }
    sequencias.push(JSON.stringify(sequenciaAtual));
    while (sequencias.length - 1 != calcualrPossibilidade(m, caracteresUsaveis.length)) {
        let y = 0;

        for (let i = m - 1; i >= 0; i--) {
            let test = false;
            let h = 0;
            for (let j = sequenciaAtual.length - 1; j >= 0; j++) {
                if (sequenciaAtual[j] == caracteresUsaveis[(caracteresUsaveis.length - 1) - h]) {
                    test = true;
                } else {
                    test = false;

                    break;
                }
                h++;
            }
            if (test) {
                return;
            }
            if (i != sequenciaAtual.length - 1) {
                if (sequenciaAtual[i + 1] == caracteresUsaveis[caracteresUsaveis.length - (y - 1) - 1]) {
                    if (sequenciaAtual[0] != caracteresUsaveis[(caracteresUsaveis.length - 1) - (sequenciaAtual.length - 1)]) {
                        sequenciaAtual[i] = caracteresUsaveis[caracteresUsaveis.indexOf(sequenciaAtual[i]) + 1];
                        for (let j = i + 1; j < sequenciaAtual.length; j++) {
                            sequenciaAtual[j] = caracteresUsaveis[caracteresUsaveis.indexOf(sequenciaAtual[i]) + j - i];
                        }
                        sequencias.push(JSON.stringify(sequenciaAtual));
                    } else if (sequenciaAtual[0] == caracteresUsaveis[(caracteresUsaveis.length - 1) - (sequenciaAtual.length - 1)] && sequenciaAtual[sequenciaAtual.length - 1] == caracteresUsaveis[caracteresUsaveis.length - 1]) {
                        return;
                    }
                }
            } else {
                if (sequenciaAtual[i] != caracteresUsaveis[caracteresUsaveis.length - 1]) {
                    sequenciaAtual[i] = caracteresUsaveis[caracteresUsaveis.indexOf(sequenciaAtual[i]) + 1];
                    sequencias.push(JSON.stringify(sequenciaAtual));
                }
            }
            y++;
        }
        x++;
    }
}

function calcualrPossibilidade(m, n) {
    return factorial(n) / (factorial((n - m)) * factorial(m));
}

function factorial(n) {
    var vn = n;
    for (let i = n - 1; i > 0; i--) {
        vn = vn * i;
    }
    return vn;
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

function gerarUsaveis(quantos) {
    var nuk = [];
    var ajeitado = [];
    for (let i = 0; i < selectedNumbers.length; i++) {
        nuk.push(parseInt(selectedNumbers[i]));
    }
    for (let i = 1; i <= quantos; i++) {
        if (nuk.indexOf(i) == -1) {
            ajeitado.push(i);
        }
    }
    return ajeitado;
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function salvarJogos() {
    if (joguei) {
        var data = new Date();

        // Guarda cada pedaço em uma variável
        var dia = data.getDate(); // 1-31
        var dia_sem = data.getDay(); // 0-6 (zero=domingo)
        var mes = data.getMonth(); // 0-11 (zero=janeiro)
        var ano2 = data.getYear(); // 2 dígitos
        var ano4 = data.getFullYear(); // 4 dígitos
        var hora = data.getHours(); // 0-23
        var min = data.getMinutes(); // 0-59
        var seg = data.getSeconds(); // 0-59
        var mseg = data.getMilliseconds(); // 0-999
        var tz = data.getTimezoneOffset(); // em minutos
        var dataGeral = "";
        dataGeral += dia;
        dataGeral += " ";
        dataGeral += "0";
        dataGeral += (mes + 1);
        dataGeral += " ";
        dataGeral += (ano4);
        dataGeral += " as ";
        dataGeral += novaHora();
        firebase.database().ref("usuarios/" + user.uid + "/jogos").once("value").then(function(snapshot) {
            var x = 0;
            try {
                x = Object.keys(snapshot.val()).length
                jogosGerados.push(dataGeral);
                firebase.database().ref("usuarios").child(user.uid).child("jogos").child("" + x).set(jogosGerados).then(() => {
                    alert("jogo salvo com sucesso")
                }).catch((erro) => {
                    alert("Você precisa logar para salvar no sistema");
                });
            } catch (erro) {
                jogosGerados.push(dataGeral);
                firebase.database().ref("usuarios").child(user.uid).child("jogos").child("0").set(jogosGerados).then(() => {
                    alert("jogo salvo com sucesso")
                }).catch((erro) => {
                    alert("Você precisa logar para salvar no sistema");
                });
            }
        });
    } else {
        alert("para salvar os jogos primeiro efetue um jogo")
    }
}
// por algum motivo satânico essa funçãi bugou
function gerarJogos(a) {
    for (let i = 0; i < a; i++) {
        const jogo = sequencias[i];
        finalizar(JSON.parse(jogo));
        jogosGerados.push(jogo);
    }
}

function novaHora() {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(':');
}