$(document).ready(function () {

    // Controle da sessao do professor
    NomeProfessor = localStorage.getItem('NomeProfessor');
    IDProfessor = localStorage.getItem('IDProfessor');

    // Página de Login
    if ((location.pathname).includes('index.html')) {
        if (IDProfessor != null) {
            window.location.href = ('Principal.html');
        }
    }
    // Outras Páginas
    else {
        if (IDProfessor == null) {
            window.location.href = ('index.html');
        }
        // Adiciona o nome do professor na navbar
        txtNomeProfessor.innerHTML = NomeProfessor;
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Login_Professor"
    if (typeof ($('#LoginForm')) != 'undefined' && $('#LoginForm') != null) {
        $('#LoginForm').submit(function () {
            Login_Professor();
            return false;
        });
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Cadastro_Professor"
    if (typeof ($('#CadastroForm')) != 'undefined' && $('#CadastroForm') != null) {
        $('#CadastroForm').submit(function () {
            Cadastrar_Professor();
            return false;
        });
    }

    // Faz a busca de Questões
    var campoFiltro = document.querySelector("#filtrar-tabela-materia");
    if (typeof (campoFiltro) != 'undefined' && campoFiltro != null) {
        campoFiltro.addEventListener("input", function () {
            var questoes = document.querySelectorAll(".questao");

            if (this.value.length > 0) {
                for (var i = 0; i < questoes.length; i++) {
                    var questao = questoes[i];
                    var tdMateria = questao.querySelector(".info-materia");
                    var materia = tdMateria.textContent;
                    var expressao = RegExp(this.value, "i");// Expressão Regular

                    if (!expressao.test(materia)) {
                        questao.classList.add("invisivel");
                    } else {
                        questao.classList.remove("invisivel");
                    }
                }
            } else {
                for (var i = 0; i < questoes.length; i++) {
                    var questao = questoes[i];
                    questao.classList.remove("invisivel");
                }
            }
        });

        var campoFiltro = document.querySelector("#filtrar-tabela-dificuldade");

        campoFiltro.addEventListener("input", function () {
            var questoes = document.querySelectorAll(".questao");

            if (this.value.length > 0) {
                for (var i = 0; i < questoes.length; i++) {
                    var questao = questoes[i];
                    var tdDificuldade = questao.querySelector(".info-nivelDificuldade");
                    var dificuldade = tdDificuldade.textContent;
                    var expressao = RegExp(this.value, "i");// Expressão Regular

                    if (!expressao.test(dificuldade)) {
                        questao.classList.add("invisivel");
                    } else {
                        questao.classList.remove("invisivel");
                    }
                }
            } else {
                for (var i = 0; i < questoes.length; i++) {
                    var questao = questoes[i];
                    questao.classList.remove("invisivel");
                }
            }
        });
    }

});

// Função de Login
function Login_Professor() {
    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/loginProfessor',
        dataType: 'json',
        data: JSON.stringify({
            "email": document.getElementById("email").value,
            "senha": document.getElementById("senha").value
        }),
        success: function (msg) {
            if (msg == 'Bem Vindo !') {

                IniciarSessao();

            } else {
                document.getElementById('txtInfo').innerHTML = 'Credenciais inválidas!';
                document.getElementById("senha").value = '';
                document.getElementById("email").value = '';
                document.getElementById("email").focus();
            }
        }, error: function (msg) {
            document.getElementById('txtInfo').innerHTML = 'Ocorreu um erro, por favor tente novamente ...';
        },
        contentType: "application/json"
    });

}

// Função de Cadastro de Professores
function Cadastrar_Professor() {
    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/cadastrarProfessor',
        dataType: 'json',
        data: JSON.stringify({
            "email": document.getElementById("email").value,
            "senha": document.getElementById("senha").value,
            "nome": document.getElementById("nome").value,
            "curso": document.getElementById("curso").value,
            "instituicao": document.getElementById("instituicao").value
        }),
        success: function (msg) {
            document.getElementById("email").text = "";
            document.getElementById("senha").text = "";
            document.getElementById("nome").text = "";
            document.getElementById("curso").text = "";
            document.getElementById("instituicao").text = "";
            alert(msg);
            location.replace('index.html');
        }, error: function (msg) {
            alert(msg);
        },
        contentType: "application/json"
    });

}

// Função de busca de Questões
function Buscar_Questoes() {

    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            console.log();

            $(function () {
                $.each(response, function (i, item) {
                    var $tr = $('<tr class="questao">').append(
                        $('<td class="info-questao text-primary pergunta" id="btnPergunta">').text(item.pergunta),
                        $('<td class="info-alterCorreta">').text(item.resposta_correta),
                        $('<td class="info-materia">').text(item.materia),
                        $('<td class="info-nivelDificuldade">').text(item.semestre)
                    ).appendTo('#tabela-questoes');

                });
            });

            ConfigurarTabelaParaAceitarClicks();

        }
    });

}

// Verifica se uma Questao existe (faz a busca pela Pergunta)
function VerificarQuestao() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas_Pergunta?pergunta=' + arguments[0],
        data: null,
        dataType: 'json',
        success: function (msg) {
            if (msg == "" || msg == null) {
                $('#QuestaoModal').modal('hide');
            } else {
                var response = JSON.stringify(msg);
                response = $.parseJSON(response);

                $(function () {
                    $.each(response, function (i, item) {
                        txtResposta.value = item.resposta_correta;
                        txtRespostaIncorreta1.value = item.resposta_incorreta1;
                        txtRespostaIncorreta2.value = item.resposta_incorreta2;
                        txtRespostaIncorreta3.value = item.resposta_incorreta3;
                        txtRespostaIncorreta4.value = item.resposta_incorreta4;
                        txtMateria.value = item.materia;
                        txtSemestre.value = item.semestre;
                    });
                });

                $(".resizable").css({ 'resize': 'both', 'max-width': '100%', 'width': '100%', 'height': '8vh' });
                $('#QuestaoModal').modal('show');

            }
        }, error: function () {

        }
    });
}

// Função de deletar Questões
function DeletarQuestao() {

}

// Função de deletar Questões
function EditarQuestao() {

}

// Serve para criar o clique na tabela de Questões
function ConfigurarTabelaParaAceitarClicks() {
    // Serve para identificar o click nas questões da tabela
    if (typeof ($('#tabela-questoes')) != 'undefined' && $('#tabela-questoes') != null) {
        $('#tabela-questoes').ready(function () {
            var tbl = document.getElementById("tabela-questoes");
            for (var i = 0; i < tbl.rows.length; i++) {
                for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                    tbl.rows[i].cells[j].onclick = function () {
                        txtPergunta.value = this.innerHTML;
                        VerificarQuestao(this.innerHTML);
                    };
                }
            }
        });
    }
}

// Cria a sessao quando o Professor efetuar Login
function IniciarSessao() {
    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Professor',
        dataType: 'json',
        data: JSON.stringify({
            "email": document.getElementById("email").value,
            "senha": document.getElementById("senha").value
        }),
        success: function (msg) {

            localStorage.setItem('NomeProfessor', msg[0].nome);
            localStorage.setItem('IDProfessor', msg[0]._id.$oid);
            window.location.href = ('Principal.html');

        }, error: function (msg) {
            alert('error');
        },
        contentType: "application/json"
    });
}

// Faz Logout, e finaliza a sessao do Professor
function Logout() {
    localStorage.removeItem('NomeProfessor');
    localStorage.removeItem('IDProfessor');
    localStorage.clear();
    location.replace('index.html');
}