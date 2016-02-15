(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.noticia', ['ngRoute'])
        .controller('NoticiaController', NoticiaController);

    NoticiaController.$inject = ['$scope', '$location', '$routeParams', 'NoticiasService'];

    function NoticiaController($scope, $location, $routeParams, NoticiasService) {
        var vm = this;

        vm.titulo = '';

        vm.noticia = {};

        vm.id = $routeParams.id;

        vm.showNoticia = showNoticia;
        vm.comentar = comentar;

        if (vm.id > 0) {
            NoticiasService.getNoticiaByID(vm.id, function (data) {
                console.log(data);
                vm.noticia = data;
                var comentario1 = {fecha:'12/02/2016',detalles:'sfsdfsdfsdfsdfsdf'};
                var comentario2 = {fecha:'01/02/2016',detalles:'xxxxxxxxxxxxxxxx'};

                vm.noticia.comentarios.push(comentario1);
                vm.noticia.comentarios.push(comentario2);
            });
        }

        function comentar() {
            console.log('enviar comentario');
        }

        function showNoticia(noticia) {
            console.log(noticia);
        }

    };

})();

