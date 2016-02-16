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
        vm.comentario = '';

        vm.noticia = {};
        vm.user = {data: {rol: 0}};

        vm.id = $routeParams.id;

        vm.showNoticia = showNoticia;
        vm.saveComentario = saveComentario;

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

        function saveComentario() {

            /*
             if (vm.user.data.userId == undefined) {
             alert('Debe estar registrado para poder realizar comentarios');
             return;
             }
             */
            var comentario = {
                noticia_id: vm.noticia.noticia_id,
                noticia_comentario_id: -1,
                titulo: '',
                detalles: vm.comentario,
                parent_id: 0,
                //creador_id: vm.user.data.userId,
                //creador: [{mail: vm.user.data.userName}],
                creador_id: 1,
                creador: 'mmaneff',
                votos_up: 0,
                votos_down: 0,
                fecha: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
            };

            NoticiasService.saveComentario(comentario, 'saveComentario', function (data) {
                comentario.noticia_comentario_id = data;

                comentario.fecha = (new Date(comentario.fecha)).format('dd-mm-yy');
                vm.noticia.comentarios.unshift(comentario);
                vm.comentario = '';
            });
        }

        function showNoticia(noticia) {
            console.log(noticia);
        }

    };

})();

