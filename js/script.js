$(document).ready(function () {

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
                window.location.href = ('Principal.html');
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
                        $('<td class="info-materia">').text(item.materia),
                        $('<td class="info-questao">').text(item.pergunta),
                        $('<td class="info-alterCorreta">').text(item.resposta_correta),
                        $('<td class="info-nivelDificuldade">').text(item.semestre)
                    ).appendTo('#tabela-questoes');

                });
            });



        }
    });

}