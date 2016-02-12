(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.noticias', ['ngRoute'])
        .controller('NoticiaController', NoticiaController);

    NoticiaController.$inject = ['$scope', '$location', 'NoticiasService'];

    function NoticiaController($scope, $location, NoticiasService) {
        var vm = this;
        vm.noticias = [];
        vm.noticia = {};
        vm.titulo = '';

        vm.goToNoticia = goToNoticia;
        vm.showNoticia = showNoticia;

        NoticiasService.getNoticias(function (data) {
            //vm.noticias = data;
            //console.log(data);

            vm.noticias = [
                {noticia_id: 1,
                    titulo: 'GOOGLE REGALA 2GB A QUIENES CHEQUEEN SU SEGURIDAD DIGITAL:',
                    detalles: 'La empresa del buscador regala almacenamiento en Drive a aquellos que verifiquen su configuración. Es una campaña por el "Día de Internet más seguro". Hay tiempo hasta el 11 de febrero.'},
                {noticia_id: 2,
                    titulo: 'Titulo 2:',
                    detalles: 'Siendo un empresa de sistemas forjandose en los últimos años, nuestra visión del mercado es muy diferente de las empresas tradicionales Argentinas. Nuestro objetivo es el servicio y servicio solo lo entendemos por entregar el producto, lo entedemos por entregar el producto y establecer una relación con el cliente de soporte y crecimiento.'},
                {noticia_id: 3,
                    titulo: 'Titulo 3:',
                    detalles: 'Siendo un empresa de sistemas forjandose en los últimos años, nuestra visión del mercado es muy diferente de las empresas tradicionales Argentinas. Nuestro objetivo es el servicio y servicio solo lo entendemos por entregar el producto, lo entedemos por entregar el producto y establecer una relación con el cliente de soporte y crecimiento.'}]

        });

        function goToNoticia(noticia_id) {
            console.log(noticia_id);
            vm.noticia = vm.noticias[noticia_id - 1];

            vm.titulo = vm.noticia.titulo;

            console.log(vm.titulo);
            console.log(vm.noticia);

            $location.path('/noticia');
        }

        function showNoticia(noticia) {
            console.log(noticia);
        }

    };

})();

