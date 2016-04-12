(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('acdesarrollos.contacto', ['ngRoute'])
        .controller('ContactoController', ContactoController);
    /*
        .constant('googleAdsContact', {
            google_conversion_id: 956728168,
            google_conversion_label: "_8PjCNaT810Q6IaayAM",
            google_conversion_format: "3",
            google_remarketing_only: false
        });
*/
    //ContactoController.$inject = ['$scope', 'ContactsService', '$location', '$window', 'googleAdsContact'];
    ContactoController.$inject = ['$scope', 'ContactsService', '$location'];

    //function ContactoController($scope, ContactsService, $location, $window, googleAdsContact) {
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

            //$window.google_trackConversion(googleAdsContact);

            ContactsService.sendMail(vm.email,
                [{mail: 'arielcessario@gmail.com'}, {mail: 'mmaneff@gmail.com'}, {mail: 'diegoyankelevich@gmail.com'}],
                vm.nombre,
                vm.mensaje,
                vm.asunto,
                function (data, result) {
                    vm.enviando = false;

                    vm.email = '';
                    vm.nombre = '';
                    vm.asunto = '';
                    vm.mensaje = '';
                });
        }

    };

})();
