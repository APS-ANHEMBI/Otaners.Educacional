// Serve para armazenar o emai do Professor quando sua conta for editada.
var Email;

// Variavéis utilizadas para determinar quais Collections serão utilizadas
// São utilizadas para atualizar o nome de Matérias, Cursos, Instituiçoes e Dificuldades
var _collection;
var _nome;

$(document).ready(function () {

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Cadastro" dos itens auxiliares
    if (typeof ($('#CadastroForm')) != 'undefined' && $('#CadastroForm') != null) {
        $('#CadastroForm').submit(function () {
            event.preventDefault();
            if (location.pathname.includes('Curso')) {
                Cadastrar_Curso();
            } else if (location.pathname.includes('Materia')) {
                Cadastrar_Materia();
            } else if (location.pathname.includes('Instituicao')) {
                Cadastrar_Instituicao();
            } else if (location.pathname.includes('Dificuldade')) {
                Cadastrar_Dificuldade();
            }
        });
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Autenticar_Professor"
    if (typeof ($('#AutenticacaoForm')) != 'undefined' && $('#AutenticacaoForm') != null) {
        $('#AutenticacaoForm').submit(function () {
            event.preventDefault();
            Autenticar_Professor();
        });
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Login_Professor"
    if (typeof ($('#LoginForm')) != 'undefined' && $('#LoginForm') != null) {
        $('#LoginForm').submit(function () {
            event.preventDefault();
            Login_Professor();
        });
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Cadastro_Professor"
    if (typeof ($('#CadastroProfessorForm')) != 'undefined' && $('#CadastroProfessorForm') != null) {
        $('#CadastroProfessorForm').submit(function () {
            event.preventDefault();
            Cadastrar_Professor();
        });
    }

    // Impede o FORM de dar submit, e obriga ele executar o Metodo "Cadastro_Professor"
    if (typeof ($('#CadastroQuestaoForm')) != 'undefined' && $('#CadastroQuestaoForm') != null) {
        $('#CadastroQuestaoForm').submit(function () {
            event.preventDefault();
            Cadastrar_Questao();
        });
    }

    // Faz o filtro de Questões
    var campoFiltro = document.querySelector("#filtrar-tabela-materia");
    if (typeof (campoFiltro) != 'undefined' && campoFiltro != null) {
        
        campoFiltro.addEventListener("input", function () {

            document.getElementById('filtrar-tabela-dificuldade').value = '';

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

            document.getElementById('filtrar-tabela-materia').value = '';

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


// PROFESSOR --------------------------------------
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

// Função utilizada nas Páginas de Login e Cadastro, verifica se já existe uma sessão
function EntrarAutomaticamente() {
    IDProfessor = localStorage.getItem('IDProfessor');

    if (IDProfessor != null) {
        // Redireciona para a página Principal
        window.location.href = ('Principal.html');
    }
}

// Verifica se o usuario está tentando acessar um página sem permissão (sem login)
function VerificarSessao() {
    NomeProfessor = localStorage.getItem('NomeProfessor');
    IDProfessor = localStorage.getItem('IDProfessor');

    if (IDProfessor == null) {
        // Retorna para a página de Login
        window.location.href = ('index.html');
    } else {
        // Adiciona o nome do professor na navbar
        txtNomeProfessor.innerHTML = NomeProfessor;
    }
}

// Verifica as credencias do Professor para dar acesso a página de Edição de Perfil
function Autenticar_Professor() {

    Email = document.getElementById("email").value;
    var Senha = document.getElementById("senha").value;

    // Requisição para efetuar Login (funciona para qualquer conta que existir)
    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/post_LoginProfessor',
        dataType: 'json',
        data: JSON.stringify({
            "email": Email,
            "senha": Senha
        }),
        success: function (msg) {
            if (msg == 'Bem Vindo !') {

                // Requisição para verificar se a conta recebida na requisição anterior, é a conta logada atualmente.
                $.ajax({
                    type: 'POST',
                    url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Professor',
                    dataType: 'json',
                    data: JSON.stringify({
                        "email": Email,
                        "senha": Senha
                    }),
                    success: function (msg) {

                        if (localStorage.getItem('IDProfessor') == msg[0]._id.$oid) {
                            $('#AutenticacaoModal').modal('hide');
                            $('#PerfilModal').modal('show');

                            txtNome.value = msg[0].nome;
                            txtSenha.value = msg[0].senha;

                            txtDataNascimento.value = msg[0].dataNascimento;

                            sessionStorage.setItem('Instituicao', msg[0].instituicao);
                            sessionStorage.setItem('Curso', msg[0].curso);
                            AtualizarCampos();

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

//Função de Editar as informações do Professor
function EditarProfessor() {
    $.ajax({
        type: 'PUT',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/put_Professor?email=' + Email,
        data: JSON.stringify({
            "email": Email,
            "nome": txtNome.value,
            "senha": txtSenha.value,
            "curso": txtCurso.value,
            "instituicao": txtInstituicao.value,
            "dataNascimento": txtDataNascimento.value
        }),
        dataType: 'json',
        success: function (msg) {

            if (msg == 'Os Dados do Professor foram alterados com sucesso!') {
                alert('As alterações foram concluídas com sucesso !');
                Logout();
            } else {
                alert(msg);
            }

        }, error: function (msg) {
            alert(msg);
        },
        contentType: "application/json"
    });
}
// PROFESSOR --------------------------------------



// QUESTÕES --------------------------------------
// Função de Cadastro de Questões
function Cadastrar_Questao() {

    document.getElementById('txtInfo').innerHTML = '';

    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/post_Questao',
        dataType: 'json',
        data: JSON.stringify({
            "pergunta": pergunta.value,
            "dificuldade": txtDificuldade.value,
            "materia": txtMateria.value,
            "respostaCorreta": respostaCorreta.value,
            "resposta1": resposta1.value,
            "resposta2": resposta2.value,
            "resposta3": resposta3.value,
            "resposta4": resposta4.value
        }),
        success: function (msg) {

            if (msg == 'Questão cadastrada com sucesso!') {
                document.getElementById('txtInfo').innerHTML = '';
                alert(msg);
                location.replace('Principal.html');
            } else {
                document.getElementById('txtInfo').innerHTML = msg;
                document.getElementById("pergunta").focus();
            }

        }, error: function (msg) {
            document.getElementById('txtInfo').innerHTML = msg;
            document.getElementById("pergunta").focus();
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

// Função de deletar Questões
function DeletarQuestao() {

    var confimacao = confirm("Tem certeza que quer excluir essa pergunta?");

    if (confimacao) {
        $.ajax({
            type: 'DELETE',
            url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/delete_Questao?pergunta=' + txtPergunta.value,
            dataType: 'json',
            success: function (msg) {

                if (msg == 'Questao excluida com sucesso!') {
                    $('#QuestaoModal').modal('hide');
                    ResetarTabelaQuestoes();
                } else {
                    alert(msg);
                }

            }, error: function (msg) {
                alert(msg);
            },
            contentType: "application/json"
        });
    } else {

    }

}

// Função de deletar Questões
function EditarQuestao() {

    var confimacao = confirm("Tem certeza que quer salvar as alteções?");

    if (confimacao) {

        $.ajax({
            type: 'PUT',
            url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/put_Questao?pergunta=' + sessionStorage.getItem('Pergunta'),
            data: JSON.stringify({
                "pergunta": txtPergunta.value,
                "dificuldade": txtDificuldade.value,
                "materia": txtMateria.value,
                "respostaCorreta": txtResposta.value,
                "resposta1": txtResposta1.value,
                "resposta2": txtResposta2.value,
                "resposta3": txtResposta3.value,
                "resposta4": txtResposta4.value
            }),
            dataType: 'json',
            success: function (msg) {

                if (msg == 'Questão alterada com sucesso!') {
                    $('#QuestaoModal').modal('hide');
                    ResetarTabelaQuestoes();
                } else {
                    alert(msg);
                }

                sessionStorage.removeItem('Pergunta');

            }, error: function (msg) {
                alert(msg);
            },
            contentType: "application/json"
        });

        $('#QuestaoModal').modal('hide');
        ResetarTabelaQuestoes();

    } else {

    }

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

                        sessionStorage.setItem('Pergunta', item.pergunta);

                        txtResposta.value = item.respostaCorreta;
                        txtResposta1.value = item.resposta1;
                        txtResposta2.value = item.resposta2;
                        txtResposta3.value = item.resposta3;
                        txtResposta4.value = item.resposta4;

                        sessionStorage.setItem('Materia', item.materia);
                        sessionStorage.setItem('Dificuldade', item.dificuldade);

                        PreecherDificuldades();
                        PreecherMaterias();

                    });
                });

                $(".resizable").css({ 'resize': 'both', 'max-width': '100%', 'width': '100%', 'height': '8vh' });
                $('#QuestaoModal').modal('show');

            }
        }, error: function () {

        }
    });
}

// Limpa a tabela, e busca os dados novamente de maneira assincrona
function ResetarTabelaQuestoes() {

    var tabela = document.getElementById('tabela-questoes');
    tabela.innerHTML = '';
    Buscar_Questoes();

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
// QUESTÕES --------------------------------------



// CURSOS --------------------------------------
// Preenche a tabela de Cursos
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
                            $('<td>').text(item._id.$oid),
                            $('<td class="text-primary pergunta">').text(item.nome)
                        ).appendTo('#tabela-curso');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
            ConfigurarTabelaItemParaAceitarClicks('curso');
        }
    });
}

// Cadastro de Cursos
function Cadastrar_Curso() {
    Cadastrar_Auxiliar('Cursos');
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

            if (sessionStorage.getItem('Curso') != null) {
                var opts = txtCurso.options;
                for (var opt, j = 0; opt = opts[j]; j++) {
                    if (opt.value == sessionStorage.getItem('Curso')) {
                        txtCurso.selectedIndex = j;
                        sessionStorage.removeItem('Curso');
                        break;
                    }
                }
            }

        }
    });
}
// CURSOS --------------------------------------



// DIFICULDADES --------------------------------------
// Preenche a tabela de Dificuldades
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
                            $('<td>').text(item._id.$oid),
                            $('<td class="text-primary pergunta">').text(item.nome)
                        ).appendTo('#tabela-dificuldade');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
            ConfigurarTabelaItemParaAceitarClicks('dificuldade');
        }
    });

}

// Cadastro de Dificuldades
function Cadastrar_Dificuldade() {
    Cadastrar_Auxiliar('Dificuldades');
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
            txtDificuldade.selectedIndex = 0;

            if (sessionStorage.getItem('Dificuldade') != null) {
                var opts = txtDificuldade.options;
                for (var opt, j = 0; opt = opts[j]; j++) {
                    if (opt.value == sessionStorage.getItem('Dificuldade')) {
                        txtDificuldade.selectedIndex = j;
                        sessionStorage.removeItem('Dificuldade');
                        break;
                    }
                }
            }

        }
    });
}
// DIFICULDADES --------------------------------------



// INSTITUICOES --------------------------------------
// Preenche a tabela de Instituicoes
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
                            $('<td>').text(item._id.$oid),
                            $('<td class="text-primary pergunta">').text(item.nome)
                        ).appendTo('#tabela-instituicao');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
            ConfigurarTabelaItemParaAceitarClicks('instituicao');
        }
    });
}

// Cadastro de Instituicoes
function Cadastrar_Instituicao() {
    Cadastrar_Auxiliar('Instituicoes');
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

            if (sessionStorage.getItem('Instituicao') != null) {
                var opts = txtInstituicao.options;
                for (var opt, j = 0; opt = opts[j]; j++) {
                    if (opt.value == sessionStorage.getItem('Instituicao')) {
                        txtInstituicao.selectedIndex = j;
                        sessionStorage.removeItem('Instituicao');
                        break;
                    }
                }
            }

        }
    });
}
// INSTITUICOES --------------------------------------



// MATERIAS --------------------------------------
// Preenche a tabela de Materias
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
                            $('<td>').text(item._id.$oid),
                            $('<td class="text-primary pergunta">').text(item.nome)
                        ).appendTo('#tabela-materia');
                    });
                });

            } else {
                txtSemRegistro.innerHTML = 'SEM REGISTROS';
            }
            ConfigurarTabelaItemParaAceitarClicks('materia');
        }
    });
}

// Cadastro de Materias
function Cadastrar_Materia() {
    Cadastrar_Auxiliar('Materias');
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
            txtMateria.selectedIndex = 0;

            if (sessionStorage.getItem('Materia') != null) {
                var opts = txtMateria.options;
                for (var opt, j = 0; opt = opts[j]; j++) {
                    if (opt.value == sessionStorage.getItem('Materia')) {
                        txtMateria.selectedIndex = j;
                        sessionStorage.removeItem('Materia');
                        break;
                    }
                }
            }

        }
    });
}
// MATERIAS --------------------------------------



// GENERICO - CURSO, MATERIA, INSTITUICAO E DIFICULDADE --------------------------------------
// Alimenta os campos "select" com o banco
function AtualizarCampos() {
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

// Verifica se o item existe (faz a busca do item pelo obj Nome)
function VerificarItem() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Auxiliares?_collection=' + _collection + '&nome=' + _nome,
        data: null,
        dataType: 'json',
        success: function (msg) {

            if (msg != null) {
                sessionStorage.setItem('Nome', _nome);
                txtNomeGenerico.value = _nome;
                $('#OpcoesModal').modal('show');
            }

        }, error: function () {

        }
    });
}

// Serve para deletar informações em collections de forma generica
function DeletarItem(collection) {

    var confimacao = confirm("Tem certeza que quer excluir esse item?");

    if (confimacao) {
        $.ajax({
            type: 'DELETE',
            url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/delete_Auxiliar?_collection=' + collection + '&nome=' + sessionStorage.getItem('Nome'),
            dataType: 'json',
            success: function (msg) {

                sessionStorage.removeItem('Nome');
                location.reload();

            }, error: function (msg) {
                alert(msg);
                sessionStorage.removeItem('Nome');
                location.reload();
            },
            contentType: "application/json"
        });
    } else {

    }

}

// Serve para editar informações em collections de forma generica
function EditarItem(collection) {

    var confimacao = confirm("Tem certeza que quer salvar as alteções?");

    if (confimacao) {

        $.ajax({
            type: 'PUT',
            url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/put_Auxiliar?_collection=' + collection + '&nome=' + sessionStorage.getItem('Nome'),
            data: JSON.stringify({
                "nome": txtNomeGenerico.value
            }),
            dataType: 'json',
            success: function (msg) {

                sessionStorage.removeItem('Nome');
                location.reload();

            }, error: function (msg) {
                alert(msg);
                sessionStorage.removeItem('Nome');
                location.reload();
            },
            contentType: "application/json"
        });

    } else {

    }
}

// Serve para cadastrar informações em collections de forma generica
function Cadastrar_Auxiliar() {

    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/post_Auxiliares?_collection=' + arguments[0],
        dataType: 'json',
        data: JSON.stringify({
            "nome": txtNome.value
        }),
        success: function (msg) {

            if (msg) {
                location.reload();
            } else {
                document.getElementById('txtInfo').innerHTML = 'Ocorreu um erro, por favor tente novamente.';
                document.getElementById("txtNome").value = '';
                document.getElementById("txtNome").focus();
            }

        }, error: function (msg) {
            document.getElementById('txtInfo').innerHTML = 'Ocorreu um erro, por favor tente novamente: ' + msg;
            document.getElementById("txtNome").value = '';
            document.getElementById("txtNome").focus();
        },
        contentType: "application/json"
    });

}

// Serve para criar o clique nas tabelas de forma genérica
function ConfigurarTabelaItemParaAceitarClicks(tabela) {
    // Serve para identificar o click nas questões da tabela
    if (typeof ($('#tabela-' + tabela)) != 'undefined' && $('#tabela-' + tabela) != null) {
        $('#tabela-' + tabela).ready(function () {
            var tbl = document.getElementById('tabela-' + tabela);
            for (var i = 0; i < tbl.rows.length; i++) {
                for (var j = 0; j < tbl.rows[i].cells.length; j++) {
                    tbl.rows[i].cells[j].onclick = function () {

                        txtNomeGenerico.value = this.innerHTML;

                        if (tabela == 'curso') {
                            _collection = 'Cursos';
                            _nome = this.innerHTML;
                        } else if (tabela == 'materia') {
                            _collection = 'Materias';
                            _nome = this.innerHTML;
                        } else if (tabela == 'instituicao') {
                            _collection = 'Instituicoes';
                            _nome = this.innerHTML;
                        } else if (tabela == 'dificuldade') {
                            _collection = 'Dificuldades';
                            _nome = this.innerHTML;
                        }

                        VerificarItem();

                    };
                }
            }
        });
    }
}
// GENERICO - CURSO, MATERIA, INSTITUICAO E DIFICULDADE --------------------------------------