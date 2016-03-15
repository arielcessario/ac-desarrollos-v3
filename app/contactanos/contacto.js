(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.contacto', ['ngRoute'])
        .controller('ContactoController', ContactoController);

    ContactoController.$inject = ['$scope', 'ContactsService', '$location'];

    function ContactoController($scope, ContactsService, $location) {
        var vm = this;

        vm.email = '';
        vm.nombre = '';
        vm.mensaje = '';
        vm.asunto = '';
        //vm.enviado = false;
        vm.enviando = false;


        // FUNCTIONS
        vm.sendMail = sendMail;

        function sendMail() {
            if(vm.enviando){
                return;
            }
            vm.enviando = true;

            ContactsService.sendMail(vm.email,
                [{mail: 'arielcessario@gmail.com'}, {mail: 'mmaneff@gmail.com'}, {mail: 'diegoyankelevich@gmail.com'}],
                vm.nombre,
                vm.mensaje,
                vm.asunto,
                function (data, result) {
                    //console.log($location);
                    //console.log($location.absUrl());
                    vm.enviando = false;
                    goog_report_conversion($location.absUrl());
                    //console.log(data);
                    //console.log(result);

                    vm.email = '';
                    vm.nombre = '';
                    vm.asunto = '';
                    vm.mensaje = '';

                    vm.enviando = false;

                });

        }

    };

})();
