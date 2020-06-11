$(document).ready(function () {

    // Controle da sessao do professor
    NomeProfessor = localStorage.getItem('NomeProfessor');
    IDProfessor = localStorage.getItem('IDProfessor');

    // Página de Login/Cadastro
    if ((location.pathname).includes('index.html') || (location.pathname).includes('CadastroProfessor.html')) {
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
            event.preventDefault();
            Login_Professor();
        });
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Cadastro_Professor"
    if (typeof ($('#CadastroForm')) != 'undefined' && $('#CadastroForm') != null) {
        $('#CadastroForm').submit(function () {
            event.preventDefault();
            Cadastrar_Professor();
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

    // Alimenta os campos "select" com o banco
    if ((location.pathname).includes('CadastroProfessor.html') || (location.pathname).includes('CadastroQuest')) {

        if (typeof (txtInstituicao) != 'undefined' && txtInstituicao != null) {
            PreecherIntituicoes();
        }

        if (typeof (txtCurso) != 'undefined' && txtCurso != null) {
            PreecherCursos();
        }

        if (typeof (txtMateria) != 'undefined' && txtMateria != null) {
            PreecherMaterias();
        }

        if (typeof (txtDificuldade) != 'undefined' && txtDificuldade != null) {
            PreecherDificuldades();
        }

    }

});

// Função de Login
function Login_Professor() {
    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/post_LoginProfessor',
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

    document.getElementById('txtInfo').innerHTML = '';

    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/post_Professor',
        dataType: 'json',
        data: JSON.stringify({
            "email": document.getElementById("email").value,
            "senha": document.getElementById("senha").value,
            "nome": document.getElementById("nome").value,
            "dataNascimento": document.getElementById("dataNascimento").value,
            "curso": document.getElementById("txtCurso").value,
            "instituicao": document.getElementById("txtInstituicao").value
        }),
        success: function (msg) {

            if (msg == 'Professor cadastrado com sucesso!') {
                document.getElementById('txtInfo').innerHTML = '';
                alert(msg);
                location.replace('index.html');
            } else if (msg == 'Esse e-mail já está cadastrado, utilize outro, por favor!') {
                document.getElementById('txtInfo').innerHTML = 'Esse e-mail já está cadastrado, utilize outro, por favor!';
                document.getElementById("email").focus();
            }

        }, error: function (msg) {
            document.getElementById('txtInfo').innerHTML = msg;
            document.getElementById("email").focus();
        },
        contentType: "application/json"
    });

}

// Função de busca de Questões
function Buscar_Questoes() {

    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Questoes',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            var qteQuestoes = (msg.length);

            if (qteQuestoes > 0) {
                $(function () {
                    $.each(response, function (i, item) {

                        i++;

                        var $tr = $('<tr class="questao">').append(
                            $('<td class="info-questao text-primary pergunta" id="btnPergunta">').text(item.pergunta),
                            $('<td class="info-alterCorreta">').text(item.respostaCorreta),
                            $('<td class="info-materia">').text(item.materia),
                            $('<td class="info-nivelDificuldade">').text(item.dificuldade)
                        ).appendTo('#tabela-questoes');



                    });
                });

                ConfigurarTabelaParaAceitarClicks();

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
        }
    });

}

// Função de busca de Curso
function Buscar_Cursos() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Cursos',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            var qteQuestoes = (msg.length);

            if (qteQuestoes > 0) {
                $(function () {
                    $.each(response, function (i, item) {

                        i++;

                        var $tr = $('<tr>').append(
                            $('<td class="text-primary pergunta" id="btnPergunta">').text(item._id.$oid),
                            $('<td>').text(item.nome)
                        ).appendTo('#tabela-curso');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
        }
    });
}

// Função de busca de Materia
function Buscar_Materias() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Materias',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            var qteQuestoes = (msg.length);

            if (qteQuestoes > 0) {
                $(function () {
                    $.each(response, function (i, item) {

                        i++;

                        var $tr = $('<tr class="questao">').append(
                            $('<td class="info-questao text-primary pergunta" id="btnPergunta">').text(item._id.$oid),
                            $('<td class="info-alterCorreta">').text(item.nome)
                        ).appendTo('#tabela-materia');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
        }
    });
}

// Função de busca de Instituição
function Buscar_Instituicoes() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Instituicoes',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            var qteQuestoes = (msg.length);

            if (qteQuestoes > 0) {
                $(function () {
                    $.each(response, function (i, item) {

                        i++;

                        var $tr = $('<tr class="questao">').append(
                            $('<td class="info-questao text-primary pergunta" id="btnPergunta">').text(item._id.$oid),
                            $('<td class="info-alterCorreta">').text(item.nome)
                        ).appendTo('#tabela-instituicao');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
        }
    });
}

// Função de busca de Dificuldade
function Buscar_Dificuldades() {

    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Dificuldades',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            var qteQuestoes = (msg.length);

            if (qteQuestoes > 0) {
                $(function () {
                    $.each(response, function (i, item) {

                        i++;

                        var $tr = $('<tr>').append(
                            $('<td class="info-questao text-primary" id="btnPergunta">').text(item._id.$oid),
                            $('<td>').text(item.nome),
                            $('<td>').text(item.dificuldade)
                        ).appendTo('#tabela-dificuldade');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
        }
    });

}

// Verifica se uma Questao existe (faz a busca pela Pergunta)
function VerificarQuestao() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Questoes_Pergunta?pergunta=' + arguments[0],
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
                        txtResposta.value = item.respostaCorreta;
                        txtRespostaIncorreta1.value = item.resposta1;
                        txtRespostaIncorreta2.value = item.resposta2;
                        txtRespostaIncorreta3.value = item.resposta3;
                        txtRespostaIncorreta4.value = item.resposta4;
                        txtMateria.value = item.materia;
                        txtDificuldade.value = item.dificuldade;
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

// Preenche os campos "select" com as Instituicoes do banco de dados
function PreecherIntituicoes() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Instituicoes',
        data: null,
        dataType: 'json',
        success: function (msg) {
            var inner_html = '';
            for (i = 0; i < msg.length; i++) {
                inner_html += '<option>' + msg[i].nome + '</option>';
            }
            txtInstituicao.innerHTML = inner_html;
        }
    });
}

// Preenche os campos "select" com os Cursos do banco de dados
function PreecherCursos() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Cursos',
        data: null,
        dataType: 'json',
        success: function (msg) {
            var inner_html = '';
            for (i = 0; i < msg.length; i++) {
                inner_html += '<option>' + msg[i].nome + '</option>';
            }
            txtCurso.innerHTML = inner_html;
        }
    });
}

// Preenche os campos "select" com as Materias do banco de dados
function PreecherMaterias() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Materias',
        data: null,
        dataType: 'json',
        success: function (msg) {
            var inner_html = '';
            for (i = 0; i < msg.length; i++) {
                inner_html += '<option>' + msg[i].nome + '</option>';
            }
            txtMateria.innerHTML = inner_html;
        }
    });
}

// Preenche os campos "select" com as Dificuldades do banco de dados
function PreecherDificuldades() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Dificuldades',
        data: null,
        dataType: 'json',
        success: function (msg) {
            var inner_html = '';
            for (i = 0; i < msg.length; i++) {
                inner_html += '<option>' + msg[i].nome + '</option>';
            }
            txtDificuldade.innerHTML = inner_html;
        }
    });
}