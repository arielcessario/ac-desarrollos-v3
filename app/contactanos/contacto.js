(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.contacto', ['ngRoute'])
        .controller('ContactoController', ContactoController);

    ContactoController.$inject = ['$scope', '$location', 'ContactsService'];

    function ContactoController($scope, $location, ContactsService) {
        var vm = this;

        vm.email = '';
        vm.nombre = '';
        vm.mensaje = '';
        vm.asunto = '';
        vm.enviado = false;
        vm.enviando = false;


        // FUNCTIONS
        vm.sendMail = sendMail;

        function sendMail() {
            console.log(vm.nombre);

            /*
            if(vm.enviando){
                return;
            }
            vm.enviando = true;

            ContactsService.sendMail(vm.email,
                [{mail: 'arielcessario@gmail.com'}],
                vm.nombre,
                vm.mensaje,
                vm.asunto,
                function (data, result) {
                    vm.enviando = false;
                    console.log(data);
                    console.log(result);

                    vm.email = '';
                    vm.nombre = '';
                    vm.asunto = '';
                    vm.mensaje = '';

                });
                */
        }

    };

})();
