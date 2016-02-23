(function () {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.cotizador', ['ngRoute', ['mailer/mailer.js']])
        .controller('CotizadorController', CotizadorController);

    CotizadorController.$inject = ['$scope', '$location', 'MailerService'];

    function CotizadorController($scope, $location, MailerService) {
        var vm = this;

        vm.slider_fijo = {};
        vm.slider_administrable = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.contactos = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.empresa_info = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.producto_info = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.multipaginas = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.noticias = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.usuarios = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.ecommerce = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.caja = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.cobros_online = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.imagenes_admin = [{id:1, name:'SI'}, {id:2, name:'NO'}];
        vm.comentarios = [{id:1, name:'SI'}, {id:2, name:'NO'}];

        vm.nombre = '';
        vm.email = '';
        vm.message = '';

        vm.sendMail = sendMail;


        vm.slider_fijo.id = 1;

        function sendMail() {
            MailerService.sendCotizacion( vm.email, vm.nombre, vm.message, function(data){
                console.log(data);
                vm.email = '';
                vm.nombre = '';
                vm.message = '';
            });
        }

    };

})();

