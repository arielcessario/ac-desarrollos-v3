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

        vm.goToNoticia = goToNoticia;
        vm.showNoticia = showNoticia;

        if (vm.id > 0) {
            NoticiasService.getNoticiaByID(vm.id, function (data) {
                console.log(data);
                vm.noticia = data;
            });
        }


        function goToNoticia(noticia_id) {
            console.log(noticia_id);

            for(var i=0; i < vm.noticias.length; i++) {
                if(vm.noticias[i].noticia_id == noticia_id){
                    vm.noticia = vm.noticias[i];
                }
            }

            console.log(vm.noticia);
            $location.path('/noticia');
        }

        function showNoticia(noticia) {
            console.log(noticia);
        }

    };

})();

