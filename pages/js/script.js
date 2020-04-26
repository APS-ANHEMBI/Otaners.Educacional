function get_all_docs() {

    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas',
        data: null,
        dataType: 'json',
        success: function (msg) {

            var response = JSON.stringify(msg);
            response = $.parseJSON(response);

            $(function () {
                $.each(response, function (i, item) {
                    var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                        $('<div class="list-group-item list-group-item-action flex-column align-items-center">').append(
                            $('<h6>').text('Pergunta: ' + item.pergunta),
                            $('<h6>').text('Semestre: ' + item.semestre),
                            $('<h6>').text('Matéria: ' + item.materia),
                            $('<h6>').text('Resposta Correta: ' + item.resposta_correta),
                            $('<h6>').text('Resposta Incorreta 1: ' + item.resposta_incorreta1),
                            $('<h6>').text('Resposta Incorreta 2: ' + item.resposta_incorreta2),
                            $('<h6>').text('Resposta Incorreta 3: ' + item.resposta_incorreta3),
                            $('<h6>').text('Resposta Incorreta 4: ' + item.resposta_incorreta4)
                        )).appendTo('#container');

                });
            });



        }
    });

}

function get_Pergunta() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas_Pergunta?pergunta=' + document.getElementById("search_Pergunta").value,
        data: null,
        dataType: 'json',
        success: function (msg) {

            document.getElementById('container').innerHTML = '';
            document.getElementById('search_Semestre').value = '';
            document.getElementById('search_Materia').value = '';

            if (msg.length == 0) {
                var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                    $('<h3>Nenhuma pergunta encontrada</h3>')
                ).appendTo('#container');
            } else {

                var response = JSON.stringify(msg);
                response = $.parseJSON(response);

                $(function () {
                    $.each(response, function (i, item) {
                        var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                            $('<div class="list-group-item list-group-item-action flex-column align-items-center">').append(
                                $('<h6>').text('Pergunta: ' + item.pergunta),
                                $('<h6>').text('Semestre: ' + item.semestre),
                                $('<h6>').text('Matéria: ' + item.materia),
                                $('<h6>').text('Resposta Correta: ' + item.resposta_correta),
                                $('<h6>').text('Resposta Incorreta 1: ' + item.resposta_incorreta1),
                                $('<h6>').text('Resposta Incorreta 2: ' + item.resposta_incorreta2),
                                $('<h6>').text('Resposta Incorreta 3: ' + item.resposta_incorreta3),
                                $('<h6>').text('Resposta Incorreta 4: ' + item.resposta_incorreta4)
                            )).appendTo('#container');

                    });
                });
            }
        }
    });
}

function get_Semestre() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas_Semestre?semestre=' + document.getElementById("search_Semestre").value,
        data: null,
        dataType: 'json',
        success: function (msg) {

            document.getElementById('container').innerHTML = '';
            document.getElementById('search_Pergunta').value = '';
            document.getElementById('search_Materia').value = '';

            if (msg.length == 0) {
                var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                    $('<h3>Nenhuma pergunta encontrada</h3>')
                ).appendTo('#container');
            } else {

                var response = JSON.stringify(msg);
                response = $.parseJSON(response);

                $(function () {
                    $.each(response, function (i, item) {
                        var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                            $('<div class="list-group-item list-group-item-action flex-column align-items-center">').append(
                                $('<h6>').text('Pergunta: ' + item.pergunta),
                                $('<h6>').text('Semestre: ' + item.semestre),
                                $('<h6>').text('Matéria: ' + item.materia),
                                $('<h6>').text('Resposta Correta: ' + item.resposta_correta),
                                $('<h6>').text('Resposta Incorreta 1: ' + item.resposta_incorreta1),
                                $('<h6>').text('Resposta Incorreta 2: ' + item.resposta_incorreta2),
                                $('<h6>').text('Resposta Incorreta 3: ' + item.resposta_incorreta3),
                                $('<h6>').text('Resposta Incorreta 4: ' + item.resposta_incorreta4)
                            )).appendTo('#container');

                    });
                });
            }
        }
    });
}

function get_Materia() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas_Materia?materia=' + document.getElementById("search_Materia").value,
        data: null,
        dataType: 'json',
        success: function (msg) {

            document.getElementById('container').innerHTML = '';
            document.getElementById('search_Pergunta').value = '';
            document.getElementById('search_Semestre').value = '';

            if (msg.length == 0) {
                var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                    $('<h3>Nenhuma pergunta encontrada</h3>')
                ).appendTo('#container');
            } else {

                var response = JSON.stringify(msg);
                response = $.parseJSON(response);

                $(function () {
                    $.each(response, function (i, item) {
                        var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                            $('<div class="list-group-item list-group-item-action flex-column align-items-center">').append(
                                $('<h6>').text('Pergunta: ' + item.pergunta),
                                $('<h6>').text('Semestre: ' + item.semestre),
                                $('<h6>').text('Matéria: ' + item.materia),
                                $('<h6>').text('Resposta Correta: ' + item.resposta_correta),
                                $('<h6>').text('Resposta Incorreta 1: ' + item.resposta_incorreta1),
                                $('<h6>').text('Resposta Incorreta 2: ' + item.resposta_incorreta2),
                                $('<h6>').text('Resposta Incorreta 3: ' + item.resposta_incorreta3),
                                $('<h6>').text('Resposta Incorreta 4: ' + item.resposta_incorreta4)
                            )).appendTo('#container');

                    });
                });
            }
        }
    });
}

function get_to_delete_Pergunta() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas_Pergunta?pergunta=' + document.getElementById("search_Pergunta").value,
        data: null,
        dataType: 'json',
        success: function (msg) {

            document.getElementById('container').innerHTML = '';

            if (msg.length == 0) {
                document.getElementById("btnDelete").disabled = true;
                var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                    $('<h3>Nenhuma pergunta encontrada</h3>')
                ).appendTo('#container');
            } else {

                document.getElementById("btnDelete").disabled = false;

                var response = JSON.stringify(msg);
                response = $.parseJSON(response);

                $(function () {
                    $.each(response, function (i, item) {
                        var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                            $('<div class="list-group-item list-group-item-action flex-column align-items-center">').append(
                                $('<h6>').text('Pergunta: ' + item.pergunta),
                                $('<h6>').text('Semestre: ' + item.semestre),
                                $('<h6>').text('Matéria: ' + item.materia),
                                $('<h6>').text('Resposta Correta: ' + item.resposta_correta),
                                $('<h6>').text('Resposta Incorreta 1: ' + item.resposta_incorreta1),
                                $('<h6>').text('Resposta Incorreta 2: ' + item.resposta_incorreta2),
                                $('<h6>').text('Resposta Incorreta 3: ' + item.resposta_incorreta3),
                                $('<h6>').text('Resposta Incorreta 4: ' + item.resposta_incorreta4)
                            )).appendTo('#container');

                    });
                });
            }
        }
    });
}

function delete_Pergunta() {
    $.ajax({
        type: 'DELETE',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/delete_Pergunta?pergunta=' + document.getElementById("search_Pergunta").value,
        data: null,
        dataType: 'json',
        success: function (msg) {
            document.getElementById('container').innerHTML = '';
            document.getElementById("search_Pergunta").value = '';
            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            alert(response);
            location.reload();
        }, error: function (msg) {
            document.getElementById('container').innerHTML = '';
            document.getElementById("search_Pergunta").value = '';
            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            alert(response);
        }
    });
}

function post_Pergunta() {
    $.ajax({
        type: 'POST',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/post_Pergunta',
        data: JSON.stringify({
            "pergunta": document.getElementById("pergunta").value,
            "semestre": document.getElementById("semestre").value,
            "materia": document.getElementById("materia").value,
            "resposta_correta": document.getElementById("resposta_correta").value,
            "resposta_incorreta1": document.getElementById("resposta_incorreta1").value,
            "resposta_incorreta2": document.getElementById("resposta_incorreta2").value,
            "resposta_incorreta3": document.getElementById("resposta_incorreta3").value,
            "resposta_incorreta4": document.getElementById("resposta_incorreta4").value
        }),
        success: function (msg) {
            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            alert(response);
            location.reload();
        }, error: function (msg) {
            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            alert(response);
        },
        dataType: "json",
        contentType: "application/json"
    });
}

function get_to_put_Pergunta() {
    $.ajax({
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/get_Perguntas_Pergunta?pergunta=' + document.getElementById("search_Pergunta").value,
        data: null,
        dataType: 'json',
        success: function (msg) {

            document.getElementById('container').innerHTML = '';

            if (msg.length == 0) {
                document.getElementById("btnDelete").disabled = true;
                var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                    $('<h3>Nenhuma pergunta encontrada</h3>')
                ).appendTo('#container');
            } else {

                document.getElementById("btnDelete").disabled = false;

                var response = JSON.stringify(msg);
                response = $.parseJSON(response);

                $(function () {
                    $.each(response, function (i, item) {
                        var $tr = $('<div class="col-md-8" style="margin-left:15%;">').append(
                            $('<div class="list-group-item list-group-item-action flex-column align-items-center">').append(
                                $('<h5>Pergunta:</h5> <input id="pergunta" value="' + (item.pergunta) + '">'), $('<br><br>'),
                                $('<h5>Semestre:</h5>  <input id="semestre" value="' + ( item.semestre) + '">'), $('<br><br>'),
                                $('<h5>Materia:</h5>  <input id="materia" value="' + (item.materia) + '">'), $('<br><br>'),
                                $('<h5>Resposta Correta:</h5>  <input id="resposta_correta" value="' + (item.resposta_correta) + '">'), $('<br><br>'),
                                $('<h5>Resposta Incorreta 1:</h5>  <input id="resposta_incorreta1" value="' + (item.resposta_incorreta1) + '">'), $('<br><br>'),
                                $('<h5>Resposta Incorreta 2:</h5>  <input id="resposta_incorreta2" value="' + (item.resposta_incorreta2) + '">'), $('<br><br>'),
                                $('<h5>Resposta Incorreta 3:</h5>  <input id="resposta_incorreta3" value="' + (item.resposta_incorreta3) + '">'), $('<br><br>'),
                                $('<h5>Resposta Incorreta 4:</h5>  <input id="resposta_incorreta4" value="' + (item.resposta_incorreta4) + '">')
                            )).appendTo('#container');

                    });
                });
            }
        }
    });
}

function put_Pergunta() {
    $.ajax({
        type: 'PUT',
        url: 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/otaners-educational-bxfnw/service/API/incoming_webhook/put_Pergunta?pergunta='+document.getElementById("search_Pergunta").value,
        data: JSON.stringify({
            "pergunta": document.getElementById("pergunta").value,
            "semestre": document.getElementById("semestre").value,
            "materia": document.getElementById("materia").value,
            "resposta_correta": document.getElementById("resposta_correta").value,
            "resposta_incorreta1": document.getElementById("resposta_incorreta1").value,
            "resposta_incorreta2": document.getElementById("resposta_incorreta2").value,
            "resposta_incorreta3": document.getElementById("resposta_incorreta3").value,
            "resposta_incorreta4": document.getElementById("resposta_incorreta4").value
        }),
        success: function (msg) {
            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            alert(response);
            location.reload();
        }, error: function (msg) {
            var response = JSON.stringify(msg);
            response = $.parseJSON(response);
            alert(response);
        },
        dataType: "json",
        contentType: "application/json"
    });
}


$(document).ready(function () {
    if (document.title == "get all") {
        get_all_docs();
    }
});