var campoFiltro = document.querySelector("#filtrar-tabela-materia");

campoFiltro.addEventListener("input", function(){
    var questoes = document.querySelectorAll(".questao");

    if (this.value.length > 0){
        for (var i = 0; i < questoes.length; i++){
            var questao = questoes[i];
            var tdMateria = questao.querySelector(".info-materia");
            var materia = tdMateria.textContent;
            var expressao = RegExp(this.value, "i");// Expressão Regular

            if (!expressao.test(materia)){
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

campoFiltro.addEventListener("input", function(){
    var questoes = document.querySelectorAll(".questao");

    if (this.value.length > 0){
        for (var i = 0; i < questoes.length; i++){
            var questao = questoes[i];
            var tdDificuldade = questao.querySelector(".info-nivelDificuldade");
            var dificuldade = tdDificuldade.textContent;
            var expressao = RegExp(this.value, "i");// Expressão Regular

            if (!expressao.test(dificuldade)){
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


